// biome-ignore-all lint/suspicious/noExplicitAny: experimental JSON-RPC wire messages are checked by method before use.
// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import { copyFile, mkdtemp, rm, writeFile } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { resolve } from "node:path";
import { callTool, type Event, type Message, toolDefinitions } from "./host";

// Subscription transport only. Task access remains in the existing bounded host.
export async function subscriptionResponse(
  input: Message[],
  context: Parameters<typeof callTool>[2],
  events: Event[],
) {
  const home = await mkdtemp(resolve(tmpdir(), "arturo-subscription-"));
  await copyFile(
    resolve(
      process.env.CODEX_HOME ?? resolve(homedir(), ".codex"),
      "auth.json",
    ),
    resolve(home, "auth.json"),
  );
  await writeFile(
    resolve(home, "config.toml"),
    `forced_login_method = "chatgpt"
web_search = "disabled"
[features]
shell_tool = false
plugins = false
multi_agent = false
skip_host_skill_discovery = true
code_mode_host = false
`,
  );
  const child = Bun.spawn(["codex", "app-server", "--listen", "stdio://"], {
    cwd: home,
    env: { PATH: process.env.PATH, HOME: home, CODEX_HOME: home },
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
  });
  let seq = 0;
  let calls = 0;
  const pending = new Map<
    number,
    { resolve: (value: any) => void; reject: (error: unknown) => void }
  >();
  const send = (value: unknown) =>
    child.stdin.write(`${JSON.stringify(value)}\n`);
  const rpc = (method: string, params: unknown): Promise<any> =>
    new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, { resolve, reject });
      send({ id, method, params });
    });
  let complete!: (value: any) => void;
  let fail!: (error: unknown) => void;
  const finished = new Promise<any>((resolve, reject) => {
    complete = resolve;
    fail = reject;
  });
  // Initialization may fail before the completion promise is awaited.
  finished.catch(() => {});
  const timer = setTimeout(() => {
    fail(new Error("Subscription turn deadline"));
    child.kill();
  }, 180000);
  const stderr = new Response(child.stderr).text();
  const reader = (async () => {
    let buffer = "";
    for await (const chunk of child.stdout) {
      buffer += new TextDecoder().decode(chunk);
      while (buffer.includes("\n")) {
        const end = buffer.indexOf("\n");
        const msg = JSON.parse(buffer.slice(0, end));
        buffer = buffer.slice(end + 1);
        if (pending.has(msg.id)) {
          const waiter = pending.get(msg.id);
          if (!waiter) throw new Error("Missing RPC waiter");
          pending.delete(msg.id);
          msg.error ? waiter.reject(msg.error) : waiter.resolve(msg.result);
        } else if (msg.method === "item/tool/call" && msg.id !== undefined) {
          const { tool, arguments: args } = msg.params;
          let text: string;
          let ok = true;
          let category = "artifact";
          try {
            if (++calls > 48) throw new Error("Tool call limit");
            const result = await callTool(tool, args, context);
            text = result.text;
            category = result.category;
          } catch (error) {
            text = String(error);
            ok = false;
          }
          events.push({
            kind: "tool",
            name: tool,
            args,
            ok,
            category,
            text,
            bytes: Buffer.byteLength(text),
          });
          send({
            id: msg.id,
            result: {
              success: ok,
              contentItems: [{ type: "inputText", text }],
            },
          });
        } else if (msg.id !== undefined) {
          send({
            id: msg.id,
            error: {
              code: -32601,
              message: "Only bounded evaluation tools are supported",
            },
          });
          fail(new Error(`Unexpected server request: ${msg.method}`));
        } else {
          events.push({ kind: "subscription-event", ...msg });
          if (msg.method === "turn/completed") complete(msg.params.turn);
        }
      }
    }
    const error = new Error("Subscription server exited before completion");
    for (const waiter of pending.values()) waiter.reject(error);
    fail(error);
  })();
  reader.catch(fail);
  try {
    await rpc("initialize", {
      clientInfo: { name: "arturo_evals", version: "0.1" },
      capabilities: { experimentalApi: true },
    });
    send({ method: "initialized" });
    const account = await rpc("account/read", {});
    if (account.account?.type !== "chatgpt")
      throw new Error("ChatGPT subscription authentication required");
    const thread = await rpc("thread/start", {
      cwd: home,
      model: "gpt-6.1-sol",
      ephemeral: true,
      approvalPolicy: "never",
      sandbox: "read-only",
      baseInstructions:
        "Complete the user task using only the supplied bounded evaluation tools.",
      developerInstructions: String(input[0].content),
      dynamicTools: toolDefinitions.map((t) => ({
        type: "function",
        name: t.name,
        description: t.description,
        inputSchema: t.parameters,
      })),
    });
    if (thread.model !== "gpt-6.1-sol")
      throw new Error("Unexpected model substitution");
    await rpc("turn/start", {
      threadId: thread.thread.id,
      input: [
        { type: "text", text: String(input[1].content), text_elements: [] },
      ],
      effort: "low",
    });
    const turn = await finished;
    if (turn.status !== "completed")
      throw new Error(JSON.stringify(turn.error ?? turn.status));
    const updates = events.filter(
      (e) => e.method === "thread/tokenUsage/updated",
    );
    const tokens = (updates.at(-1)?.params as any)?.tokenUsage?.total;
    if (!tokens) throw new Error("Subscription token usage missing");
    return {
      usage: {
        input_tokens: tokens.inputTokens,
        output_tokens: tokens.outputTokens,
        input_tokens_details: { cached_tokens: tokens.cachedInputTokens },
        output_tokens_details: {
          reasoning_tokens: tokens.reasoningOutputTokens,
        },
      },
      output: turn.items
        .filter((i: any) => i.type === "agentMessage")
        .map((i: any) => ({
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: i.text }],
        })),
    };
  } finally {
    clearTimeout(timer);
    child.kill();
    await child.exited;
    await reader;
    await stderr;
    await rm(home, { recursive: true, force: true });
  }
}
