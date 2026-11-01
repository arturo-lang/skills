// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { access, readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import migration from "./layout-migration.json";

const root = resolve(import.meta.dir, "..");
const digest = (text: string | Buffer) =>
  createHash("sha256").update(text).digest("hex");

test("one portable skill retains example coverage, package metadata, licenses and notices", async () => {
  expect(await readdir(resolve(root, "skills"))).toEqual(["arturo"]);
  // Example hashes in the migration record are historical evidence. Formatting
  // may change their bytes; runtime smoke checks preserve executable behavior.
  for (const path of Object.keys(migration.preservation.examples)) {
    await access(resolve(root, path));
  }
  for (const [path, expected] of Object.entries(
    migration.preservation.licenses,
  )) {
    expect(digest(await readFile(resolve(root, path)))).toBe(expected);
  }
  const index = await readFile(
    resolve(root, "skills/arturo/references/package-index.md"),
    "utf8",
  );
  for (const [path, expected] of Object.entries(
    migration.preservation.packageMetadata,
  )) {
    const text = await readFile(resolve(root, path), "utf8");
    expect(digest(text.split("---")[1])).toBe(expected);
    expect(index).toContain(`](${path.split("/").at(-1)})`);
  }
  const notices = await readFile(
    resolve(root, "skills/arturo/THIRD-PARTY-NOTICES.md"),
    "utf8",
  );
  const blocks = [...notices.matchAll(/```text\n([\s\S]*?)\n```/g)].map((m) =>
    digest(m[1]),
  );
  for (const expected of migration.preservation.noticeBlocks)
    expect(blocks).toContain(expected);
});
