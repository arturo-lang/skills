import { expect, test } from "bun:test";
import { verifyPackageResult } from "./package-smoke";

const assertionFailure =
  "PINNED-CASE-READY\nFAILED: 1 assertion\nSome tests failed!\n";

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
