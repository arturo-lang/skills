import { expect, test } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { validateVerification } from "./verification";

test("recorded verification evidence is valid", async () => {
  expect(await validateVerification(resolve(import.meta.dir, ".."))).toEqual(
    [],
  );
});

test("rejects unsupported dimensions, incomplete runtime claims and unsafe evidence", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "verification-test-"));
  try {
    const record = {
      id: "sample",
      dimensions: ["executed", "assumed-correct"],
      evidence: ["../outside.md"],
    };
    await writeFile(
      resolve(root, "verification.json"),
      JSON.stringify({ records: [record, record] }),
    );
    const errors = (await validateVerification(root)).join("\n");
    expect(errors).toContain("Duplicate verification sample");
    expect(errors).toContain("Invalid verification dimensions");
    expect(errors).toContain("Missing verification runtime");
    expect(errors).toContain("Missing verification command");
    expect(errors).toContain("Missing verification result");
    expect(errors).toContain("Invalid verification evidence");
  } finally {
    await rm(root, { recursive: true });
  }
});
