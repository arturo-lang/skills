import { afterEach, expect, test } from "bun:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
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
    `---\nname: arturo-fixture\ndescription: A fixture skill.\n---\n${body}\n`,
  );
  for (const file of [
    "LICENSING.md",
    "LICENSE-CC-BY-4.0.txt",
    "LICENSE-MIT.txt",
  ])
    await writeFile(
      resolve(directory, file),
      await readFile(resolve(import.meta.dir, "../skills/arturo-math", file)),
    );
  return root;
}

test("the distributed skills have valid metadata and self-contained links", async () => {
  expect(await validateLibrary(resolve(import.meta.dir, ".."))).toEqual([]);
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

test("requires local licenses and meaningful attribution", async () => {
  const root = await fixture("Example.");
  await rm(resolve(root, "skills/arturo-fixture/LICENSE-MIT.txt"));
  await writeFile(
    resolve(root, "skills/arturo-fixture/LICENSING.md"),
    "Copyright Example.",
  );
  const errors = (await validateLibrary(root)).join("\n");
  expect(errors).toContain("LICENSE-MIT.txt");
  expect(errors).toContain("licensing missing source");
  expect(errors).toContain("licensing missing attribution");
  expect(errors).toContain("licensing missing license");
  expect(errors).toContain("licensing missing adaptation notes");
});
