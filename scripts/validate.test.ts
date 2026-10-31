import { afterEach, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { validateLibrary } from "./validate";

const temporary: string[] = [];
afterEach(async () => {
  await Promise.all(
    temporary.splice(0).map((path) => rm(path, { recursive: true })),
  );
});

async function fixture(body: string): Promise<string> {
  const root = await mkdtemp(resolve(tmpdir(), "arturo-skills-validation-"));
  temporary.push(root);
  const directory = resolve(root, "skills", "arturo-fixture");
  await mkdir(directory, { recursive: true });
  await writeFile(
    resolve(directory, "SKILL.md"),
    `---\nname: arturo-fixture\ndescription: A fixture skill.\nmetadata:\n  arturo-version: "0.10.0"\n  review-date: "2026-10-29"\n---\n${body}\n`,
  );
  return root;
}

test("the distributed skills have valid metadata and self-contained links", async () => {
  expect(await validateLibrary(resolve(import.meta.dir, ".."))).toEqual([]);
});

test("allows references with only relevant metadata or none", async () => {
  const root = await fixture("A fixture skill.");
  const references = resolve(root, "skills/arturo-fixture/references");
  await mkdir(references);
  await writeFile(resolve(references, "plain.md"), "# Plain reference\n");
  await writeFile(
    resolve(references, "source.md"),
    '---\nmetadata:\n  sources:\n    - "https://arturo-lang.io/llms.txt"\n---\n# Reference\n',
  );
  expect(await validateLibrary(root)).toEqual([]);
});

test("rejects invalid review dates and non-string metadata", async () => {
  const root = await fixture("A fixture skill.");
  const path = resolve(root, "skills/arturo-fixture/SKILL.md");
  const content = await Bun.file(path).text();
  await writeFile(
    path,
    content.replace('"2026-10-29"', '"2026-02-30"').replace('"0.10.0"', "10"),
  );
  const errors = (await validateLibrary(root)).join("\n");
  expect(errors).toContain("invalid metadata.review-date");
  expect(errors).toContain("metadata values must be strings");
});

test("rejects scalar sources and lists containing non-strings", async () => {
  const root = await fixture("A fixture skill.");
  const references = resolve(root, "skills/arturo-fixture/references");
  await mkdir(references);
  for (const sources of [
    '"https://arturo-lang.io/llms.txt"',
    '["valid", 42]',
  ]) {
    await writeFile(
      resolve(references, "source.md"),
      `---\nmetadata:\n  sources: ${sources}\n---\n# Reference\n`,
    );
    expect((await validateLibrary(root)).join("\n")).toContain(
      "metadata.sources must be a list of nonempty strings",
    );
  }
});

test("rejects author and license on non-package documents", async () => {
  const root = await fixture("A fixture skill.");
  const references = resolve(root, "skills/arturo-fixture/references");
  await mkdir(references);
  await writeFile(
    resolve(references, "language.md"),
    '---\nmetadata:\n  author: "Example"\n  license: "MIT"\n---\n# Reference\n',
  );
  expect((await validateLibrary(root)).join("\n")).toContain(
    "author and license belong only on package references",
  );
});

test("detects references missing from an installation", async () => {
  const root = await fixture("[Reference](references/missing.md)");
  expect((await validateLibrary(root)).join("\n")).toContain("missing link");
});

test("rejects references outside the independently installed skill", async () => {
  const root = await fixture("[Outside](../../shared.md)");
  await writeFile(resolve(root, "shared.md"), "shared");
  expect((await validateLibrary(root)).join("\n")).toContain(
    "nonportable link",
  );
});

test("rejects metadata that would identify a different skill", async () => {
  const root = await fixture("An independent skill.");
  await writeFile(
    resolve(root, "skills/arturo-fixture/SKILL.md"),
    "---\nname: another-name\ndescription: Example.\n---\n",
  );
  expect((await validateLibrary(root)).join("\n")).toContain("mismatched name");
});
