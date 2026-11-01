import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { resolve } from "node:path";

export function verifyPackageResult(
  name: string,
  expectFailure: boolean,
  code: number,
  output: string,
  errors: string,
): void {
  if (
    !output.split(/\r?\n/).includes("PINNED-CASE-READY") ||
    errors.trim() !== "" ||
    (expectFailure
      ? code !== 1 ||
        !/FAILED:\s+1 assertion\r?\n/u.test(output) ||
        !output.trimEnd().endsWith("\nSome tests failed!")
      : code !== 0)
  ) {
    throw new Error(`${name}: exit ${code}\n${output}\n${errors}`);
  }
}

export function verifyNativeResult(
  expectFailure: boolean,
  code: number,
  output: string,
  errors: string,
): void {
  const passed = expectFailure ? 3 : 4;
  const failed = expectFailure ? 1 : 0;
  if (
    code !== (expectFailure ? 1 : 0) ||
    errors.trim() !== "" ||
    output.includes("Uncaught error") ||
    !/TOTAL:\s+4 assertions/u.test(output) ||
    !new RegExp(`PASSED:\\s+${passed} assertions?\\b`, "u").test(output) ||
    !new RegExp(`FAILED:\\s+${failed} assertions?\\b`, "u").test(output) ||
    (expectFailure && !output.trimEnd().endsWith("Some tests failed!"))
  ) {
    throw new Error(`native Unitt: exit ${code}\n${output}\n${errors}`);
  }
}

export function verifyNativeDiagnostic(
  kind: "uncaught" | "empty",
  code: number,
  output: string,
  errors: string,
): void {
  const valid =
    kind === "uncaught"
      ? code === 0 &&
        output.includes("Uncaught error in checks/arithmetic.check.art:") &&
        output.includes("PINNED-UNCAUGHT-FIXTURE") &&
        errors.trim() === ""
      : code === 1 && output.trim() === "" && errors.includes("No test found!");
  if (!valid || /TOTAL:\s*\d+ assertions/u.test(output))
    throw new Error(
      `${kind}: unexpected runner diagnostic exit=${code}\n${output}\n${errors}`,
    );
}

async function run(command: string[], cwd: string) {
  const child = Bun.spawn(command, { cwd, stdout: "pipe", stderr: "pipe" });
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
    if (timedOut) throw new Error(`${command[0]}: timed out after 120 seconds`);
    return { output, errors, code };
  } finally {
    clearTimeout(timeout);
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
      const { output, errors, code } = await run(
        [
          executable,
          "--no-color",
          resolve(import.meta.dir, "fixtures/packages", name),
        ],
        workspace,
      );
      verifyPackageResult(name, expectFailure, code, output, errors);
      console.log(`PASS unitt 3.1.1 ${name}`);
    }
    const project = resolve(workspace, "native");
    await cp(resolve(import.meta.dir, "fixtures/packages/native"), project, {
      recursive: true,
    });
    // The exact-version import above populates this standard Arturo cache path.
    const cli = resolve(
      homedir(),
      ".arturo/packages/cache/unitt/3.1.1/src/app.art",
    );
    const spec = resolve(project, "checks/arithmetic.check.art");
    const passing = await readFile(spec, "utf8");
    for (const expectFailure of [false, true, false]) {
      await writeFile(
        spec,
        expectFailure ? passing.replace("[4 5]", "[4 6]") : passing,
      );
      for (const target of [cli, spec]) {
        const result = await run([executable, "--no-color", target], project);
        verifyNativeResult(
          expectFailure,
          result.code,
          result.output,
          result.errors,
        );
      }
      console.log(`PASS unitt 3.1.1 native/direct failure=${expectFailure}`);
    }
    await writeFile(spec, 'throw "PINNED-UNCAUGHT-FIXTURE"\n');
    const uncaught = await run([executable, "--no-color", cli], project);
    verifyNativeDiagnostic(
      "uncaught",
      uncaught.code,
      uncaught.output,
      uncaught.errors,
    );
    console.log(
      "PASS unitt 3.1.1 uncaught diagnostic (upstream exit-zero limitation)",
    );
    await rm(spec);
    const empty = await run([executable, "--no-color", cli], project);
    verifyNativeDiagnostic("empty", empty.code, empty.output, empty.errors);
    console.log("PASS unitt 3.1.1 empty discovery diagnostic");
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}
