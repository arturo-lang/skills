// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import { expect, test } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import {
  type Catalog,
  compareCheckout,
  revision,
  validateInventory,
} from "./upstream";

const entry = {
  path: "sample.art",
  blob: "a".repeat(40),
  kind: "program",
  owner: "arturo-language",
  dependencies: ["unknown"],
  effects: ["unknown"],
  cost: "unknown",
  expectedResult: null,
  disposition: "queued-for-adaptation",
  reason: "Review needed",
  review: "source-review-needed",
};
const skills = new Set(["arturo-language"]);
test("inventory validates classification without treating review queue as verified", () => {
  expect(
    validateInventory(
      { repository: "fixture", revision, entries: [entry] },
      skills,
    ),
  ).toEqual([]);
});
test("rejects duplicates, missing classifications, revision and disposition errors", () => {
  const catalog = {
    repository: "fixture",
    revision: "wrong",
    entries: [
      entry,
      { ...entry, owner: null, dependencies: [], disposition: "executed" },
    ],
  };
  const errors = validateInventory(catalog, skills).join("\n");
  expect(errors).toContain("Duplicate");
  expect(errors).toContain("revision mismatch");
  expect(errors).toContain("Invalid disposition");
  expect(errors).toContain("Missing program classification");
});
async function git(root: string, args: string[]) {
  const result = Bun.spawnSync(["git", "-C", root, ...args]);
  if (result.exitCode) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
}
test("checkout comparison detects revision, missing, stale and changed files", async () => {
  const root = await mkdtemp(resolve(tmpdir(), "upstream-test-"));
  try {
    await git(root, ["init"]);
    await writeFile(resolve(root, "sample.art"), "print 1\n");
    await git(root, ["add", "sample.art"]);
    await git(root, [
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.invalid",
      "commit",
      "-m",
      "fixture",
    ]);
    const hash = await git(root, ["rev-parse", "HEAD"]);
    const blob = await git(root, ["rev-parse", "HEAD:sample.art"]);
    const catalog: Catalog = {
      repository: "fixture",
      revision: hash,
      entries: [{ ...entry, blob }],
    };
    expect(await compareCheckout(catalog, root)).toEqual([]);
    expect(await compareCheckout({ ...catalog, revision }, root)).toEqual([
      "Checkout revision mismatch",
    ]);
    expect(
      (await compareCheckout({ ...catalog, entries: [] }, root)).join(),
    ).toContain("Missing catalog path");
    expect(
      (
        await compareCheckout(
          { ...catalog, entries: [{ ...entry, path: "old.art" }] },
          root,
        )
      ).join(),
    ).toContain("Stale catalog path");
    expect(
      (await compareCheckout({ ...catalog, entries: [entry] }, root)).join(),
    ).toContain("Changed upstream blob");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
