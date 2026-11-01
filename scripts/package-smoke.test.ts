import { expect, test } from "bun:test";
import { verifyNativeResult, verifyPackageResult } from "./package-smoke";

const assertionFailure =
  "PINNED-CASE-READY\nFAILED: 1 assertion\nSome tests failed!\n";

test("native lane requires executed summaries, not just exit zero", () => {
  verifyNativeResult(
    false,
    0,
    "TOTAL: 4 assertions\nPASSED: 4 assertions\nFAILED: 0 assertions",
    "",
  );
  verifyNativeResult(
    true,
    1,
    "TOTAL: 4 assertions\nPASSED: 3 assertions\nFAILED: 1 assertion\nSome tests failed!",
    "",
  );
  for (const output of [
    "Uncaught error in checks/arithmetic.check.art: reporter failed",
    "TOTAL: 0 assertions\nPASSED: 0 assertions\nFAILED: 0 assertions",
    "TOTAL: 4 assertions\nPASSED: 3 assertions\nFAILED: 1 assertion",
  ]) {
    expect(() => verifyNativeResult(false, 0, output, "")).toThrow();
  }
});

test("package lane accepts completed pass and intentional failure", () => {
  verifyPackageResult("pass", false, 0, "PINNED-CASE-READY", "");
  verifyPackageResult("fail", true, 1, assertionFailure, "");
});

test("download/import failures cannot count as expected test failures", () => {
  expect(() =>
    verifyPackageResult("fail", true, 1, "", "download failed"),
  ).toThrow();
  expect(() =>
    verifyPackageResult("fail", true, 0, "PINNED-CASE-READY", ""),
  ).toThrow();
  expect(() =>
    verifyPackageResult("pass", false, 1, "PINNED-CASE-READY", "report failed"),
  ).toThrow();
});

test("reporter crashes and unrelated failures cannot pass the negative case", () => {
  for (const [code, output, errors] of [
    [139, assertionFailure, ""],
    [1, "PINNED-CASE-READY\n", "Segmentation fault"],
    [1, "PINNED-CASE-READY\nSome tests failed!\n", ""],
    [1, assertionFailure, "unexpected runtime error"],
    [1, `${assertionFailure}another failure\n`, ""],
  ] as const) {
    expect(() =>
      verifyPackageResult("fail", true, code, output, errors),
    ).toThrow();
  }
  expect(() =>
    verifyPackageResult(
      "pass",
      false,
      0,
      "PINNED-CASE-READY",
      "runtime warning",
    ),
  ).toThrow();
});

test("package lane refuses to run without explicit network opt-in", async () => {
  const child = Bun.spawn(
    [process.execPath, "run", `${import.meta.dir}/package-smoke.ts`],
    {
      stdout: "pipe",
      stderr: "pipe",
    },
  );
  const errors = await new Response(child.stderr).text();
  expect(await child.exited).not.toBe(0);
  expect(errors).toContain("--allow-network");
});

test("runner diagnostic probes cannot count as assertion success", async () => {
  const { verifyNativeDiagnostic } = await import("./package-smoke");
  expect(() =>
    verifyNativeDiagnostic(
      "uncaught",
      0,
      "Uncaught error in checks/arithmetic.check.art:\nPINNED-UNCAUGHT-FIXTURE",
      "",
    ),
  ).not.toThrow();
  expect(() =>
    verifyNativeDiagnostic("empty", 1, "", "No test found!"),
  ).not.toThrow();
  expect(() => verifyNativeDiagnostic("empty", 0, "", "")).toThrow();
  expect(() =>
    verifyNativeDiagnostic("uncaught", 0, "TOTAL: 4 assertions", ""),
  ).toThrow();
});
