// Copyright © RickBarretto, Arturo programming language. MIT licensed.

import { createHash } from "node:crypto";
import {
  cp,
  mkdir,
  mkdtemp,
  readdir,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import {
  boundedRun,
  callTool,
  type Event,
  type Message,
  type Mode,
  response,
  safeRead,
  sandboxCommand,
  selection,
} from "./host";
import { scenarios } from "./scenarios";

const argv = Bun.argv.slice(2);
const value = (flag: string, fallback: string) => {
  const i = argv.indexOf(flag);
  return i < 0 ? fallback : argv[i + 1];
};
if (argv.includes("--list")) {
  console.log(
    scenarios
      .map(
        ({ id, packages }) =>
          `${id}${packages ? " [preprovisioned packages]" : ""}`,
      )
      .join("\n"),
  );
} else if (!argv.includes("--run")) {
  console.log(
    "List: bun run evals --list\nRun (paid API): bun run evals --run --root CHECKOUT --mode automatic --repeat 3 [--scenario ID] [--packages-dir PATH] [--out PATH]",
  );
} else {
  if (!process.env.OPENAI_API_KEY)
    throw new Error("OPENAI_API_KEY required; no model evaluations performed");
  const root = await realpath(value("--root", resolve(import.meta.dir, "..")));
  const mode = value("--mode", "automatic") as Mode;
  if (!["none", "automatic", "explicit"].includes(mode))
    throw new Error("Unknown condition");
  const repeat = Number(value("--repeat", "3"));
  if (!Number.isInteger(repeat) || repeat < 1 || repeat > 10)
    throw new Error("Repeat must be 1..10");
  const requested = value("--scenario", "all");
  const chosen = scenarios.filter(
    (s) => requested === "all" || s.id === requested,
  );
  if (!chosen.length) throw new Error("Unknown scenario");
  const executable = await realpath(Bun.which("arturo") ?? "arturo");
  const packages = argv.includes("--packages-dir")
    ? await realpath(value("--packages-dir", ""))
    : undefined;
  const out = resolve(
    value("--out", await mkdtemp(resolve(tmpdir(), "arturo-evals-"))),
  );
  await mkdir(out, { recursive: true });
  const revision = await boundedRun(["git", "rev-parse", "HEAD"], root);
  const revisionLabel = value("--revision", revision.stdout.trim());
  if (!revisionLabel)
    throw new Error("Use --revision COMMIT for an archived skill tree");
  const dirty = await boundedRun(["git", "status", "--porcelain"], root);
  const skillSnapshot = resolve(out, "skills");
  await cp(resolve(root, "skills"), skillSnapshot, {
    recursive: true,
    errorOnExist: true,
    force: false,
  });
  async function fingerprint(directory: string): Promise<string> {
    const hash = createHash("sha256");
    for (const entry of (
      await readdir(directory, { withFileTypes: true })
    ).sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.isSymbolicLink())
        throw new Error("Snapshots must not contain symlinks");
      const path = resolve(directory, entry.name);
      hash.update(entry.name);
      hash.update(
        entry.isDirectory()
          ? await fingerprint(path)
          : Buffer.from(await Bun.file(path).arrayBuffer()),
      );
    }
    return hash.digest("hex");
  }
  const skillHash = await fingerprint(skillSnapshot);
  const packageHash = packages ? await fingerprint(packages) : null;
  const inventory: {
    name: string;
    description: string;
    path: string;
    content: string;
  }[] = [];
  for (const name of (await readdir(resolve(root, "skills"))).sort()) {
    const path = `${name}/SKILL.md`;
    const content = await safeRead(resolve(skillSnapshot), path);
    const header = /^---\n([\s\S]*?)\n---/.exec(content);
    const fields = Bun.YAML.parse(header?.[1] ?? "") as { description: string };
    inventory.push({ name, description: fields.description, path, content });
  }
  const preflight = await mkdtemp(resolve(tmpdir(), "arturo-eval-preflight-"));
  const runtime = await boundedRun(
    sandboxCommand(executable, preflight, ["--version"], packages),
    preflight,
  );
  if (runtime.code !== 0 || runtime.reason)
    throw new Error(
      `Sandbox unavailable: ${runtime.stderr}; no model evaluations performed`,
    );
  await rm(preflight, { recursive: true, force: true });
  for (const scenario of chosen) {
    for (let attempt = 1; attempt <= repeat; attempt++) {
      const runId = `${scenario.id}-${mode}-${attempt}`;
      const directory = resolve(out, runId);
      // A new output directory prevents accidental overwriting of prior evidence.
      await mkdir(directory);
      const workspace = await mkdtemp(resolve(tmpdir(), "arturo-eval-task-"));
      const events: Event[] = [];
      const metadata = {
        skillHash,
        packageHash,
        runId,
        scenario: scenario.id,
        mode,
        attempt,
        revision: revisionLabel,
        dirty: dirty.stdout,
        model: "gpt-6.1-sol",
        effort: "low",
        runtime,
        packages: packages
          ? { path: packages, required: scenario.packages ?? [] }
          : null,
        started: new Date().toISOString(),
      };
      await writeFile(
        resolve(directory, "metadata.json"),
        JSON.stringify(metadata, null, 2),
      );
      let guidance = "";
      if (mode === "automatic")
        guidance = `Available skills (read only relevant ones):\n${inventory.map((s) => `${s.path}: ${s.description}`).join("\n")}`;
      if (mode === "explicit") {
        for (const path of [
          ...scenario.required.map((n) => `${n}/SKILL.md`),
          ...scenario.references,
        ]) {
          let text: string;
          try {
            text = await safeRead(skillSnapshot, path);
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
            events.push({ kind: "missing-guidance", path });
            guidance += `\nRequested guidance is unavailable in this revision: ${path}`;
            continue;
          }
          guidance += `\n${path}\n${text}`;
          events.push({
            kind: "tool",
            name: "read_skill",
            args: { path },
            ok: true,
            category: path.endsWith("SKILL.md") ? "entry" : "reference",
            bytes: Buffer.byteLength(text),
            injected: true,
          });
        }
      }
      const input: Message[] = [
        {
          role: "developer",
          content: `Complete the user task using the workspace tools. Write implementation artifacts to files. Use read_skill only for relevant guidance; there are no other installed skills. Runtime execution is bounded and offline; no GUI or package acquisition. ${packages ? "A read-only preprovisioned Arturo package cache is available; verify actual releases before use." : "No external packages are available; explain limits rather than invent execution results."}\n${guidance}`,
        },
        { role: "user", content: scenario.prompt },
      ];
      await writeFile(
        resolve(directory, "prompt.json"),
        JSON.stringify(input, null, 2),
      );
      let finished = false;
      let infrastructureError = "";
      const started = Date.now();
      try {
        for (let turn = 0; turn < 16; turn++) {
          const result = await response(input, process.env.OPENAI_API_KEY);
          events.push({ kind: "response", ...result });
          input.push(...result.output);
          const calls = result.output.filter(
            (item) => item.type === "function_call",
          );
          if (!calls.length) {
            finished = true;
            break;
          }
          for (const call of calls) {
            let text: string;
            try {
              const args = JSON.parse(String(call.arguments)) as Record<
                string,
                unknown
              >;
              const output = await callTool(String(call.name), args, {
                root: out,
                workspace,
                mode,
                executable,
                packages,
              });
              text = output.text;
              events.push({
                kind: "tool",
                name: call.name,
                args,
                ok: true,
                category: output.category,
                bytes: Buffer.byteLength(text),
                text,
              });
            } catch (error) {
              text = String(error);
              events.push({
                kind: "tool",
                name: call.name,
                arguments: call.arguments,
                ok: false,
                text,
              });
            }
            input.push({
              type: "function_call_output",
              call_id: call.call_id,
              output: text,
            });
          }
        }
      } catch (error) {
        infrastructureError = String(error);
      }
      let correctness: unknown = null;
      // Grading starts after the agent is finished, in a separate, unexposed workspace.
      if (finished && scenario.check) {
        const grading = await mkdtemp(resolve(tmpdir(), "arturo-eval-grade-"));
        try {
          await cp(workspace, grading, { recursive: true, dereference: false });
          const candidate = await safeRead(grading, "solution.art");
          await writeFile(
            resolve(grading, ".grade.art"),
            `${candidate}\n${scenario.check}\nprint "EVAL-PASS"\n`,
          );
          const result = await boundedRun(
            sandboxCommand(executable, grading, [".grade.art"], packages),
            grading,
          );
          correctness = {
            ...result,
            passed:
              result.code === 0 &&
              !result.reason &&
              result.stdout.trimEnd().endsWith("EVAL-PASS") &&
              !result.stderr.trim(),
          };
        } catch (error) {
          correctness = { passed: false, error: String(error) };
        } finally {
          await rm(grading, { recursive: true, force: true });
        }
      }
      const usage = events
        .filter((e) => e.kind === "response")
        .map(
          (e) =>
            e.usage as {
              input_tokens: number;
              output_tokens: number;
              input_tokens_details?: { cached_tokens: number };
              output_tokens_details?: { reasoning_tokens: number };
            },
        );
      const report = {
        ...metadata,
        elapsedMs: Date.now() - started,
        finished,
        infrastructureError,
        selection: mode === "none" ? null : selection(scenario, events),
        correctness,
        manualReview: scenario.rubric ?? [],
        manualReviewStatus: scenario.rubric?.length
          ? "pending"
          : "not-required",
        provisioningReview: scenario.packages
          ? "Verify the supplied cache/revisions; unavailable dependencies are infrastructure failures, not skill failures"
          : null,
        usage: {
          requests: usage.length,
          cumulativeInputTokens: usage.reduce((n, u) => n + u.input_tokens, 0),
          outputTokens: usage.reduce((n, u) => n + u.output_tokens, 0),
          cachedInputTokens: usage.reduce(
            (n, u) => n + (u.input_tokens_details?.cached_tokens ?? 0),
            0,
          ),
          reasoningTokens: usage.reduce(
            (n, u) => n + (u.output_tokens_details?.reasoning_tokens ?? 0),
            0,
          ),
        },
        contextBytes: Object.fromEntries(
          ["entry", "reference", "runtime", "artifact"].map((category) => [
            category,
            events
              .filter((e) => e.kind === "tool" && e.category === category)
              .reduce((n, e) => n + Number(e.bytes ?? 0), 0),
          ]),
        ),
      };
      await writeFile(
        resolve(directory, "events.jsonl"),
        events.map((e) => JSON.stringify(e)).join("\n"),
      );
      await writeFile(
        resolve(directory, "report.json"),
        JSON.stringify(report, null, 2),
      );
      await cp(workspace, resolve(directory, "artifacts"), {
        recursive: true,
        dereference: false,
      });
      await rm(workspace, { recursive: true, force: true });
      console.log(
        `${runId}: finished=${finished}; review=${report.manualReviewStatus}; evidence=${directory}`,
      );
      if (
        !finished ||
        infrastructureError ||
        (correctness as { passed?: boolean } | null)?.passed === false
      )
        process.exitCode = 1;
    }
  }
}
