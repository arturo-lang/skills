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

test("requires owners and correctly typed inventory membership", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "coverage-test-"));
  try {
    await writeFile(
      resolve(root, "stdlib.json"),
      JSON.stringify({ modules: [{ name: "Core" }] }),
    );
    await writeFile(resolve(root, "evidence.md"), "Evidence");
    await writeFile(
      resolve(root, "coverage.json"),
      JSON.stringify({
        entries: [
          {
            id: "module-Core",
            kind: "task",
            status: "partial",
            evidence: ["evidence.md"],
          },
          {
            id: "module-Fiction",
            kind: "module",
            status: "partial",
            evidence: ["evidence.md"],
          },
        ],
      }),
    );
    const errors = (await validateCoverage(root)).join("\n");
    expect(errors).toContain("Incorrect kind module-Core");
    expect(errors).toContain("Missing module Core");
    expect(errors).toContain("Unknown module module-Fiction");
    expect(errors).toContain("Missing owner module-Fiction");
  } finally {
    await rm(root, { recursive: true });
  }
});

test("rejects traversal, directories, and evidence symlinks outside repository", async () => {
  const { mkdir, symlink } = await import("node:fs/promises");
  const root = await mkdtemp(resolve(tmpdir(), "coverage-test-"));
  const outside = await mkdtemp(resolve(tmpdir(), "coverage-outside-"));
  try {
    await writeFile(
      resolve(root, "stdlib.json"),
      JSON.stringify({ modules: [] }),
    );
    await mkdir(resolve(root, "directory"));
    await writeFile(resolve(outside, "evidence.md"), "Outside");
    await symlink(resolve(outside, "evidence.md"), resolve(root, "escape.md"));
    await writeFile(
      resolve(root, "coverage.json"),
      JSON.stringify({
        entries: [
          {
            id: "future",
            kind: "task",
            status: "backlog",
            evidence: ["../escape", "directory", "escape.md", 42],
          },
        ],
      }),
    );
    const errors = (await validateCoverage(root)).join("\n");
    for (const path of ["../escape", "directory", "escape.md", "42"])
      expect(errors).toContain(`Invalid evidence ${path}`);
  } finally {
    await rm(root, { recursive: true });
    await rm(outside, { recursive: true });
  }
});
