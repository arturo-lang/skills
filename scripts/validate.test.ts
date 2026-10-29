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
    `---\nname: arturo-fixture\ndescription: A fixture skill.\n---\n${body}\n`,
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
