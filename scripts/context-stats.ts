// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function contextStats(root: string) {
  const result = [];
  for (const name of (await readdir(resolve(root, "skills"))).sort()) {
    const base = resolve(root, "skills", name);
    const entry = await readFile(resolve(base, "SKILL.md"), "utf8");
    const header = /^---\n([\s\S]*?)\n---/.exec(entry);
    const { description } = Bun.YAML.parse(header?.[1] ?? "") as {
      description: string;
    };
    const references = await Promise.all(
      (await readdir(resolve(base, "references")))
        .filter((p) => p.endsWith(".md"))
        .map((p) => readFile(resolve(base, "references", p), "utf8")),
    );
    const words = (s: string) => s.trim().split(/\s+/u).length;
    result.push({
      name,
      descriptionBytes: Buffer.byteLength(description),
      entryWords: words(entry),
      entryBytes: Buffer.byteLength(entry),
      referenceFiles: references.length,
      referenceWords: references.reduce((n, t) => n + words(t), 0),
      referenceBytes: references.reduce((n, t) => n + Buffer.byteLength(t), 0),
    });
  }
  return result;
}
if (import.meta.main)
  console.log(
    JSON.stringify(
      await contextStats(
        resolve(Bun.argv[2] ?? resolve(import.meta.dir, "..")),
      ),
      null,
      2,
    ),
  );
