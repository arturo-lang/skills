import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

export function verifyPackageResult(
  name: string,
  expectFailure: boolean,
  code: number,
  output: string,
  errors: string,
): void {
  if (
    !output.includes("PINNED-CASE-READY") ||
    (expectFailure ? code === 0 : code !== 0)
  ) {
    throw new Error(`${name}: exit ${code}\n${output}\n${errors}`);
  }
}

if (import.meta.main) {
  if (!Bun.argv.slice(2).includes("--allow-network")) {
    throw new Error(
      "Opt in with bun run smoke:packages --allow-network. This downloads and executes unitt 3.1.1 and writes Arturo's package cache.",
    );
  }
  const executable = Bun.which("arturo");
  if (!executable)
    throw new Error("Install Arturo and put arturo on PATH first.");
  const workspace = await mkdtemp(resolve(tmpdir(), "arturo-packages-smoke-"));
  try {
    for (const [name, expectFailure] of [
      ["unitt-pass.art", false],
      ["unitt-fail.art", true],
    ] as const) {
      const child = Bun.spawn(
        [
          executable,
          "--no-color",
          resolve(import.meta.dir, "fixtures/packages", name),
        ],
        { cwd: workspace, stdout: "pipe", stderr: "pipe" },
      );
      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        child.kill();
      }, 120_000);
      try {
        const [output, errors, code] = await Promise.all([
          new Response(child.stdout).text(),
          new Response(child.stderr).text(),
          child.exited,
        ]);
        if (timedOut) throw new Error(`${name}: timed out after 120 seconds`);
        verifyPackageResult(name, expectFailure, code, output, errors);
        console.log(`PASS unitt 3.1.1 ${name}`);
      } finally {
        clearTimeout(timeout);
      }
    }
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}
