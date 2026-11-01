// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import { mkdtemp, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { boundedRun, sandboxCommand } from "./host";
import { scenarios } from "./scenarios";

const solutions: Record<string, string> = {
  "expressive-syntax": `doubleValue: $[value :integer :floating] -> value * 2
changedFirst: $[items :block value][
    ensure -> ¬ empty? items
    result: new items
    set result 0 value
    result
]`,

  "typed-function": "doubleValue: $[x :integer :floating][x * 2]",
  "nested-copy":
    "changedFirst: $[items :block value][ensure [not? empty? items] ensure [not? empty? first items] copy: new items set copy\\0 0 value return copy]",
  "retain-matches": "positives: $[items :block][select items 'item [item > 0]]",
  "iterator-scope":
    "sumItems: $[items :block][total: 0 loop items 'item [total: total + item] return total]",
  "on-demand-signature":
    "descendingCopy: $[items :block][sort.descending items]",
  "sample-statistics":
    "sampleVariance: $[items :block][ensure [2 =< size items] variance.sample items]",
  "units-colors":
    "metersToCentimeters: $[value :quantity][ensure [conforms? value `cm] convert value `cm]\nnamedBlue: #aliceBlue",
  "cli-identifiers":
    "summarizeArgs: $[inputs :block][ensure [2 = size inputs] count: to :integer inputs\\1 ensure [count >= 0] return #[id: inputs\\0 count: count]]",
  "debug-stack": "doubleValue: $[x][x * 2]",
};
const executable = await realpath(Bun.which("arturo") ?? "arturo");
for (const scenario of scenarios.filter((s) => s.check)) {
  const workspace = await mkdtemp(resolve(tmpdir(), "arturo-eval-smoke-"));
  try {
    const run = (code: string) =>
      boundedRun(
        sandboxCommand(executable, workspace, [".smoke.art"]),
        workspace,
      ).then((r) => ({ ...r, codeText: code }));
    await writeFile(
      resolve(workspace, ".smoke.art"),
      `${solutions[scenario.id]}\n${scenario.check}\nprint "EVAL-PASS"`,
    );
    const good = await run(solutions[scenario.id]);
    if (
      good.code ||
      good.reason ||
      good.stderr.trim() ||
      good.stdout.trim() !== "EVAL-PASS"
    )
      throw new Error(
        `${scenario.id}: good solution rejected\n${JSON.stringify(good)}`,
      );
    // A failing assertion cannot be mistaken for a completed grading run.
    await writeFile(
      resolve(workspace, ".smoke.art"),
      `${solutions[scenario.id]}\nensure [false]\n${scenario.check}\nprint "EVAL-PASS"`,
    );
    const bad = await run("negative");
    if (bad.code === 0 || bad.stdout.includes("EVAL-PASS"))
      throw new Error(`${scenario.id}: bad solution accepted`);
    console.log(`PASS grading ${scenario.id} (positive/negative)`);
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}
const workspace = await mkdtemp(resolve(tmpdir(), "arturo-isolation-"));
try {
  await writeFile(
    resolve(workspace, ".isolation.art"),
    'ensure [not? exists? "/home/rickd"]\nensure [not? exists? "/workspace/evals/scenarios.ts"]\nensure [not? exists? "/etc/resolv.conf"]\nprint "isolated"',
  );
  const result = await boundedRun(
    sandboxCommand(executable, workspace, [".isolation.art"]),
    workspace,
  );
  if (result.code || result.reason || result.stdout.trim() !== "isolated")
    throw new Error(JSON.stringify(result));
  await writeFile(
    resolve(workspace, ".child.art"),
    'result: execute.code "arturo --version"\nensure [result\\code = 0]\nensure [contains? result\\output "arturo"]\nprint "child ok"',
  );
  const child = await boundedRun(
    sandboxCommand(executable, workspace, [".child.art"]),
    workspace,
  );
  if (child.code || child.reason || child.stdout.trim() !== "child ok")
    throw new Error(JSON.stringify(child));
  console.log(
    "PASS isolated home/repository/resolver and native Arturo child resolution",
  );
} finally {
  await rm(workspace, { recursive: true, force: true });
}
