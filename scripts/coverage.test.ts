import { expect, test } from "bun:test";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { validateCoverage } from "./coverage";

test("coverage baseline is valid", async () => {
  expect(await validateCoverage(resolve(import.meta.dir, ".."))).toEqual([]);
});

test("detects missing modules, duplicate IDs and missing evidence", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "coverage-test-"));
  try {
    await writeFile(
      resolve(root, "stdlib.json"),
      await readFile(resolve(import.meta.dir, "../stdlib.json")),
    );
    const entry = {
      id: "duplicate",
      kind: "task",
      status: "backlog",
      evidence: ["missing.md"],
    };
    await writeFile(
      resolve(root, "coverage.json"),
      JSON.stringify({ entries: [entry, entry] }),
    );
    const errors = (await validateCoverage(root)).join("\n");
    expect(errors).toContain("Duplicate coverage");
    expect(errors).toContain("Missing evidence");
    expect(errors).toContain("Missing module");
  } finally {
    await rm(root, { recursive: true });
  }
});
