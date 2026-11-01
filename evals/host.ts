// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";

export type Mode = "none" | "automatic" | "explicit";
export type Event = { kind: string; [key: string]: unknown };
export type Message = Record<string, unknown>;
export type Scenario = {
  id: string;
  prompt: string;
  required: string[];
  allowed: string[];
  references: string[];
  check?: string;
  rubric?: string[];
  packages?: string[];
};

export function inside(root: string, path: string): string {
  const target = resolve(root, path);
  const local = relative(root, target);
  if (isAbsolute(path) || local === ".." || local.startsWith("../"))
    throw new Error("Path must remain inside its workspace");
  return target;
}

export async function safeRead(root: string, path: string): Promise<string> {
  const target = await realpath(inside(root, path));
  inside(root, relative(root, target));
  return readFile(target, "utf8");
}

export async function safeWrite(root: string, path: string, text: string) {
  const target = inside(root, path);
  // Do not follow symlinks left by generated programs, including parent links.
  const parts = relative(root, target).split("/");
  let current = root;
  for (const part of parts) {
    current = resolve(current, part);
    try {
      if ((await realpath(current)) !== current)
        throw new Error("Symlink writes are not supported");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, text);
}

export async function boundedRun(command: string[], cwd: string, seconds = 10) {
  const child = Bun.spawn(command, {
    cwd,
    env: { PATH: "/usr/bin:/bin", LANG: "C.UTF-8" },
    stdout: "pipe",
    stderr: "pipe",
  });
  let reason = "";
  const timer = setTimeout(() => {
    reason = "deadline";
    child.kill(9);
  }, seconds * 1000);
  async function capture(stream: ReadableStream<Uint8Array>) {
    const chunks: Uint8Array[] = [];
    let size = 0;
    for await (const chunk of stream) {
      size += chunk.length;
      if (size > 262144) {
        reason = "output-limit";
        child.kill(9);
        break;
      }
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf8");
  }
  try {
    const [stdout, stderr, code] = await Promise.all([
      capture(child.stdout),
      capture(child.stderr),
      child.exited,
    ]);
    return { code, stdout, stderr, reason };
  } finally {
    clearTimeout(timer);
  }
}

// Linux host adapter: no home, repository, credentials, display, or network mounts.
// Package caches, if explicitly supplied, are visible read-only in this namespace.
export function sandboxCommand(
  executable: string,
  workspace: string,
  args: string[],
  packages?: string,
): string[] {
  const command = [
    "bwrap",
    "--unshare-all",
    "--die-with-parent",
    "--new-session",
    "--ro-bind",
    "/usr",
    "/usr",
    "--ro-bind",
    "/lib",
    "/lib",
    "--ro-bind",
    "/lib64",
    "/lib64",
    "--symlink",
    "usr/bin",
    "/bin",
    "--dir",
    "/tools",
    "--symlink",
    "/arturo",
    "/tools/arturo",
    "--setenv",
    "PATH",
    "/tools:/usr/bin:/bin",
    "--proc",
    "/proc",
    "--dev",
    "/dev",
    "--tmpfs",
    "/tmp",
    "--dir",
    "/home/eval",
    "--setenv",
    "HOME",
    "/home/eval",
    "--ro-bind",
    executable,
    "/arturo",
    "--bind",
    workspace,
    "/workspace",
    "--chdir",
    "/workspace",
  ];
  if (packages)
    command.push("--ro-bind", packages, "/home/eval/.arturo/packages");
  command.push(
    "/usr/bin/prlimit",
    "--cpu=5",
    "--as=2147483648",
    "--fsize=16777216",
    "--nproc=32",
    "--",
    "/arturo",
    "--no-color",
    ...args,
  );
  return command;
}

const parameters = (properties: Record<string, unknown>) => ({
  type: "object",
  properties,
  required: Object.keys(properties),
  additionalProperties: false,
});
const string = { type: "string" };
export const toolDefinitions = [
  {
    type: "function",
    name: "read_skill",
    description:
      "Read a relevant installed skill/reference by path relative to skills/. Read only the needed lines; use query to find lines first (empty for no search).",
    strict: true,
    parameters: parameters({
      path: string,
      start: { type: "integer" },
      lines: { type: "integer" },
      query: string,
    }),
  },
  {
    type: "function",
    name: "read_file",
    description: "Read a file relative to the task workspace.",
    strict: true,
    parameters: parameters({ path: string }),
  },
  {
    type: "function",
    name: "write_file",
    description: "Write an artifact relative to the task workspace.",
    strict: true,
    parameters: parameters({ path: string, content: string }),
  },
  {
    type: "function",
    name: "run_arturo",
    description:
      "Run Arturo code in the task workspace, with no network and a disposable home. Use info.get for built-in metadata or run a small experiment. Files you write remain in the task workspace.",
    strict: true,
    parameters: parameters({ code: string }),
  },
];

export async function callTool(
  name: string,
  args: Record<string, unknown>,
  context: {
    root: string;
    workspace: string;
    mode: Mode;
    executable: string;
    packages?: string;
  },
): Promise<{ text: string; category: string }> {
  const path = String(args.path ?? "");
  if (name === "read_skill") {
    if (context.mode === "none")
      throw new Error("No skills installed in this condition");
    if (
      !/^arturo-[a-z-]+\/(SKILL\.md|references\/[\w.-]+\.md|examples\/[\w/.-]+\.art)$/.test(
        path,
      )
    )
      throw new Error(
        "Expected an installed skill or local reference/example path",
      );
    const all = (await safeRead(resolve(context.root, "skills"), path)).split(
      "\n",
    );
    const start = Math.max(1, Number(args.start));
    const count = Math.min(200, Math.max(1, Number(args.lines)));
    const query = String(args.query ?? "");
    const lines = all.map((line, i) => ({ line, number: i + 1 }));
    const selected = query
      ? lines.filter(({ line }) => line.includes(query)).slice(0, count)
      : lines.slice(start - 1, start - 1 + count);
    return {
      text: selected.map(({ line, number }) => `${number}: ${line}`).join("\n"),
      category: path.endsWith("SKILL.md") ? "entry" : "reference",
    };
  }
  if (name === "read_file")
    return {
      text: (await safeRead(context.workspace, path)).slice(0, 48000),
      category: "artifact",
    };
  if (name === "write_file") {
    const content = String(args.content);
    if (Buffer.byteLength(content) > 262144)
      throw new Error("Artifact too large");
    await safeWrite(context.workspace, path, content);
    return { text: "written", category: "artifact" };
  }
  if (name === "run_arturo") {
    await safeWrite(context.workspace, ".probe.art", String(args.code));
    const result = await boundedRun(
      sandboxCommand(
        context.executable,
        context.workspace,
        [".probe.art"],
        context.packages,
      ),
      context.workspace,
    );
    return { text: JSON.stringify(result), category: "runtime" };
  }
  throw new Error(`Unknown tool ${name}`);
}

export type ApiResponse = {
  id: string;
  model: string;
  status: string;
  output: Message[];
  usage: {
    input_tokens: number;
    output_tokens: number;
    input_tokens_details?: { cached_tokens: number };
    output_tokens_details?: { reasoning_tokens: number };
  };
};

export async function response(
  input: Message[],
  key: string,
  send: (url: string, init: RequestInit) => Promise<Response> = fetch,
): Promise<ApiResponse> {
  const result = await send("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-6.1-sol",
      reasoning: { effort: "low" },
      store: false,
      include: ["reasoning.encrypted_content"],
      max_output_tokens: 6000,
      input,
      tools: toolDefinitions,
    }),
    signal: AbortSignal.timeout(120000),
  });
  if (!result.ok) throw new Error(`OpenAI response HTTP ${result.status}`);
  const data = (await result.json()) as ApiResponse;
  if (data.status !== "completed" || !Array.isArray(data.output) || !data.usage)
    throw new Error("Incomplete or malformed API response");
  return data;
}

export function selection(scenario: Scenario, events: Event[]) {
  const reads = events.filter(
    (e) => e.kind === "tool" && e.name === "read_skill" && e.ok,
  );
  const loaded = [
    ...new Set(
      reads.map((e) => String((e.args as { path: string }).path).split("/")[0]),
    ),
  ];
  return {
    loaded,
    missing: scenario.required.filter((name) => !loaded.includes(name)),
    irrelevant: loaded.filter((name) => !scenario.allowed.includes(name)),
    references: reads.filter((e) =>
      String((e.args as { path: string }).path).includes("/references/"),
    ).length,
  };
}
