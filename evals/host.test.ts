import { afterEach, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import type { Scenario } from "./host";
import {
  boundedRun,
  callTool,
  inside,
  safeRead,
  safeWrite,
  sandboxCommand,
  selection,
} from "./host";
import { scenarioForLayout } from "./layout";
import { scenarios } from "./scenarios";
import { percentile } from "./summary";

const selectionFixture: Scenario = {
  id: "selection-fixture",
  prompt: "Offline selection test.",
  required: ["arturo-testing"],
  allowed: ["arturo-testing", "arturo-language"],
  references: ["arturo-testing/references/unitt.md"],
};
const roots: string[] = [];
afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((p) => rm(p, { recursive: true, force: true })),
  );
});
async function temporary() {
  const path = await mkdtemp(resolve(tmpdir(), "arturo-eval-test-"));
  roots.push(path);
  return path;
}

test("agent file tools refuse traversal and symlink escapes", async () => {
  const root = await temporary();
  const outside = await temporary();
  await writeFile(resolve(outside, "secret"), "held out");
  expect(() => inside(root, "../secret")).toThrow();
  expect(() => inside(root, "/etc/passwd")).toThrow();
  await symlink(outside, resolve(root, "link"));
  await expect(safeRead(root, "link/secret")).rejects.toThrow();
  await expect(safeWrite(root, "link/secret", "changed")).rejects.toThrow();
  expect(await Bun.file(resolve(outside, "secret")).text()).toBe("held out");
  await safeWrite(root, "sub/solution.art", "print 1");
  expect(await safeRead(root, "sub/solution.art")).toBe("print 1");
});

test("no-skill condition cannot access installed guidance", async () => {
  const workspace = await temporary();
  await expect(
    callTool(
      "read_skill",
      { path: "arturo-language/SKILL.md" },
      {
        root: resolve(import.meta.dir, ".."),
        workspace,
        mode: "none",
        executable: "arturo",
      },
    ),
  ).rejects.toThrow("No skills installed");
});

test("targeted reads return bounded matching lines", async () => {
  const workspace = await temporary();
  const result = await callTool(
    "read_skill",
    {
      path: "arturo/references/inspection.md",
      start: 1,
      lines: 2,
      query: "info.get",
    },
    {
      root: resolve(import.meta.dir, ".."),
      workspace,
      mode: "automatic",
      executable: "arturo",
    },
  );
  expect(result.text.split("\n")).toHaveLength(2);
  expect(result.text).toContain("info.get");
  expect(result.category).toBe("reference");
});

test("selection distinguishes missing, irrelevant, and failed reads", () => {
  const scenario = selectionFixture;
  const result = selection(scenario, [
    {
      kind: "tool",
      name: "read_skill",
      ok: false,
      args: { path: "arturo-testing/SKILL.md" },
    },
    {
      kind: "tool",
      name: "read_skill",
      ok: true,
      args: { path: "arturo-validation/references/schema.md" },
    },
  ]);
  expect(result.missing).toEqual(["arturo-testing"]);
  expect(result.irrelevant).toEqual(["arturo-validation"]);
  expect(result.references).toBe(1);
});

test("runtime host has no home/credentials/network mount and enforces process limits", () => {
  const cmd = sandboxCommand("/runtime", "/task", [".probe.art"]);
  expect(cmd).toContain("--unshare-all");
  expect(cmd).toContain("--cpu=5");
  expect(cmd).not.toContain("/home/rickd");
  expect(cmd.at(-1)).toBe(".probe.art");
});

test("host bounds process output and deadlines", async () => {
  const root = await temporary();
  const result = await boundedRun(
    [process.execPath, "-e", "process.stdout.write('x'.repeat(300000))"],
    root,
  );
  expect(result.reason).toBe("output-limit");
  const stalled = await boundedRun(
    [process.execPath, "-e", "setInterval(()=>{},1000)"],
    root,
    0.05,
  );
  expect(stalled.reason).toBe("deadline");
});

test("report percentiles include failed attempts and handle no evidence", () => {
  expect(percentile([], 0.5)).toBeNull();
  expect(percentile([90, 10, 20], 0.5)).toBe(20);
  expect(percentile([90, 10, 20], 0.9)).toBe(90);
});

test("release matrix has unique tasks and explicit conditions resolve local references", async () => {
  expect(new Set(scenarios.map((s) => s.id)).size).toBe(scenarios.length);
  for (const scenario of scenarios) {
    for (const name of scenario.required)
      expect(scenario.allowed).toContain(name);
    for (const path of scenarioForLayout(scenario, ["arturo"]).references)
      expect(
        await safeRead(resolve(import.meta.dir, "../skills"), path),
      ).not.toBeEmpty();
  }
});

test("API adapter pins Sol Low, preserves reasoning context, and rejects incomplete results", async () => {
  const { response } = await import("./host");
  let payload: Record<string, unknown> = {};
  const input = [{ role: "user", content: "fixture" }];
  const result = await response(input, "fixture-key", async (url, init) => {
    expect(url).toBe("https://api.openai.com/v1/responses");
    payload = JSON.parse(String(init.body));
    return Response.json({
      id: "fixture",
      model: "gpt-6.1-sol",
      status: "completed",
      output: [
        {
          type: "function_call",
          name: "run_arturo",
          call_id: "fixture-call",
          arguments: '{"code":"print 1"}',
        },
      ],
      usage: { input_tokens: 12, output_tokens: 3 },
    });
  });
  expect(payload.model).toBe("gpt-6.1-sol");
  expect(payload.reasoning).toEqual({ effort: "low" });
  expect(payload.include).toEqual(["reasoning.encrypted_content"]);
  expect(result.output[0].call_id).toBe("fixture-call");
  await expect(
    response(input, "fixture-key", async () =>
      Response.json({ status: "incomplete", output: [], usage: {} }),
    ),
  ).rejects.toThrow("Incomplete");
  await expect(
    response(
      input,
      "fixture-key",
      async () => new Response("private detail", { status: 401 }),
    ),
  ).rejects.toThrow("HTTP 401");
});

test("coverage ledger retains independently shipped references and examples", async () => {
  const ledger = (await Bun.file(
    resolve(import.meta.dir, "coverage.json"),
  ).json()) as {
    references: string[];
    examples: string[];
  };
  const root = resolve(import.meta.dir, "..");
  for (const reference of ledger.references)
    expect(await Bun.file(resolve(root, reference)).exists()).toBe(true);
  for (const example of ledger.examples)
    expect(await Bun.file(resolve(root, example)).exists()).toBe(true);
});

test("one-skill layout keeps historical prompts and detects unrelated reference loads", () => {
  const original = selectionFixture;
  expect(scenarioForLayout(original, ["arturo-testing"])).toBe(original);
  const merged = scenarioForLayout(original, ["arturo"]);
  expect(merged.prompt).toBe(original.prompt);
  expect(merged.required).toEqual(["arturo"]);
  expect(merged.references).toEqual(["arturo/references/unitt.md"]);
  const result = selection(merged, [
    {
      kind: "tool",
      name: "read_skill",
      ok: true,
      args: { path: "arturo/SKILL.md" },
    },
    {
      kind: "tool",
      name: "read_skill",
      ok: true,
      args: { path: "arturo/references/schema.md" },
    },
    {
      kind: "tool",
      name: "read_skill",
      ok: true,
      args: { path: "arturo/references/inspection.md" },
    },
  ]);
  expect(result.missing).toEqual([]);
  expect(result.irrelevantReferences).toEqual(["arturo/references/schema.md"]);
  const negative = scenarios.find((s) => s.id === "non-arturo");
  if (!negative) throw new Error("Missing negative scenario");
  expect(
    selection(scenarioForLayout(negative, ["arturo"]), [
      {
        kind: "tool",
        name: "read_skill",
        ok: true,
        args: { path: "arturo/SKILL.md" },
      },
    ]).irrelevant,
  ).toEqual(["arturo"]);
});

test("subscription summaries skip preflight files and honor infrastructure reviews", async () => {
  const root = await temporary();
  await mkdir(resolve(root, "attempt"));
  await writeFile(resolve(root, "subscription-preflight.jsonl"), "{}\n");
  await writeFile(
    resolve(root, "attempt/report.json"),
    JSON.stringify({
      revision: "test",
      skillHash: "test",
      transport: "codex-subscription",
      mode: "automatic",
      finished: true,
      infrastructureError: "",
      correctness: null,
      manualReviewStatus: "pending",
      usage: { cumulativeInputTokens: 12, requests: null },
      elapsedMs: 1,
      contextBytes: { entry: 0, reference: 0 },
    }),
  );
  await writeFile(
    resolve(root, "attempt/review.json"),
    JSON.stringify({
      status: "failed",
      reviewer: "test",
      classification: "infrastructure",
      evidence: "Tools unavailable",
    }),
  );
  const result = await boundedRun(
    [process.execPath, resolve(import.meta.dir, "summary.ts"), root],
    root,
  );
  expect(result.code).toBe(0);
  const summary = JSON.parse(result.stdout);
  expect(summary.attempts).toBe(1);
  expect(summary.infrastructureFailures).toBe(1);
  expect(summary.verifiedSuccesses).toBe(0);
  expect(summary.medianRequests).toBeNull();
});

test("live scenarios exclude retired package tasks", () => {
  const retired = new Set([
    "schema-contract",
    "text-packages",
    "native-unitt",
    "ci-repair",
    "preview-ambiguity",
    "html-composition",
    "cross-domain-site",
    "package-management",
    "package-typo",
    "package-unknown",
    "package-clear",
  ]);
  expect(scenarios.some((s) => retired.has(s.id) || s.packages?.length)).toBe(
    false,
  );
});
