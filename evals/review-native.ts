import {
  cp,
  mkdtemp,
  readdir,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import { relative, resolve } from "node:path";
import { verifyNativeResult } from "../scripts/package-smoke";
import {
  boundedRun,
  inside,
  safeRead,
  safeWrite,
  sandboxCommand,
} from "./host";

const root = resolve(Bun.argv[2] ?? ".");
const packages = Bun.argv[3];
if (!packages)
  throw new Error(
    "Usage: bun run evals/review-native.ts RESULTS_ROOT PACKAGES_DIR",
  );
const executable = await realpath(Bun.which("arturo") ?? "arturo");
for (const group of (await readdir(root)).filter(
  (n) => n.startsWith("stage1-") && !n.endsWith(".log"),
)) {
  if (!(await Bun.file(resolve(root, `${group}.log`)).exists())) continue;
  for (const name of await readdir(resolve(root, group))) {
    const directory = resolve(root, group, name);
    if (
      !(await Bun.file(`${directory}/report.json`).exists()) ||
      (await Bun.file(`${directory}/review-execution.json`).exists())
    )
      continue;
    const workspace = await mkdtemp("/tmp/arturo-native-review-");
    const results = [];
    try {
      await cp(`${directory}/artifacts`, workspace, {
        recursive: true,
        filter: (s) => !s.includes("/.unitt"),
      });
      inside(
        workspace,
        relative(workspace, await realpath(resolve(workspace, "checks"))),
      );
      const names = (await readdir(`${workspace}/checks`)).filter((n) =>
        n.endsWith(".check.art"),
      );
      if (names.length !== 1)
        throw new Error("Manual discovery review required");
      const original = await safeRead(workspace, `checks/${names[0]}`);
      let mutated = original.replace(
        /@\[(\d+)(?=\s)/,
        (_, n) => `@[${Number(n) + 1}`,
      );
      if (mutated === original)
        mutated = original.replace(/expected:\s*3\b/, "expected: 4");
      if (mutated === original)
        mutated = original.replace(
          /(expects\s+\[equal\?\s+)(\d+)/,
          (_, prefix, n) => `${prefix}${Number(n) + 1}`,
        );
      if (mutated === original)
        mutated = original.replace(
          /(expects\s+\[\([^)]*\)\s*=\s*)(\d+)/,
          (_, prefix, n) => `${prefix}${Number(n) + 1}`,
        );
      if (mutated === original)
        mutated = original.replace(
          /(expects\s+\[)(\d+)(?=\s*=)/,
          (_, prefix, n) => `${prefix}${Number(n) + 1}`,
        );
      if (mutated === original)
        throw new Error("Manual failure mutation required");
      for (const phase of ["passing", "failing", "restored"]) {
        await safeWrite(
          workspace,
          `checks/${names[0]}`,
          phase === "failing" ? mutated : original,
        );
        for (const target of [
          "/home/eval/.arturo/packages/cache/unitt/3.1.1/src/app.art",
          `checks/${names[0]}`,
        ]) {
          const result = await boundedRun(
            sandboxCommand(executable, workspace, [target], packages),
            workspace,
          );
          results.push({ phase, target, ...result });
          verifyNativeResult(
            phase === "failing",
            result.code,
            result.stdout,
            result.stderr,
          );
        }
      }
      await writeFile(
        `${directory}/review-execution.json`,
        `${JSON.stringify(
          { status: "passed", mutation: mutated, results },
          null,
          2,
        )}\n`,
      );
      console.log(group, name, "verified native/direct pass-fail-restore");
    } catch (error) {
      await writeFile(
        `${directory}/review-execution.json`,
        `${JSON.stringify(
          { status: "needs-review", error: String(error), results },
          null,
          2,
        )}\n`,
      );
      console.log(group, name, String(error));
    } finally {
      await rm(workspace, { recursive: true, force: true });
    }
  }
}
