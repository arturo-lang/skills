import { expect, test } from "bun:test";
import { verifyPackageResult } from "./package-smoke";

test("package lane accepts completed pass and intentional failure", () => {
  verifyPackageResult("pass", false, 0, "PINNED-CASE-READY", "");
  verifyPackageResult("fail", true, 1, "PINNED-CASE-READY", "assertion failed");
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
