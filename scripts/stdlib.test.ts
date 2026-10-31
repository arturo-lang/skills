import { afterEach, expect, test } from "bun:test";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { validateStdlib } from "./stdlib";

const temporary: string[] = [];
afterEach(async () => {
  await Promise.all(
    temporary.splice(0).map((path) => rm(path, { recursive: true })),
  );
});

async function fixture(entries: string): Promise<string> {
  const root = await mkdtemp(resolve(tmpdir(), "arturo-stdlib-validation-"));
  temporary.push(root);
  const directory = resolve(root, "skills", "arturo-fixture", "references");
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "module.md"), entries);
  await writeFile(
    resolve(root, "stdlib.json"),
    JSON.stringify({
      modules: [
        {
          name: "Fixture",
          skill: "arturo-fixture",
          reference: "references/module.md",
          symbols: ["first", "last"],
        },
      ],
    }),
  );
  return root;
}

test("every recorded standard-library symbol has a guide entry", async () => {
  expect(await validateStdlib(resolve(import.meta.dir, ".."))).toEqual([]);
});

test("a source symbol cannot disappear from a selection guide", async () => {
  const root = await fixture("| `first` | First item | `first [1 2]` |\n");
  expect((await validateStdlib(root)).join("\n")).toContain("last: missing");
});

test("unrecorded APIs are caught instead of silently expanding the catalogue", async () => {
  const root = await fixture(
    "| `first` | First | `first [1]` |\n| `last` | Last | `last [1]` |\n| `invented` | Fake | `invented` |\n",
  );
  expect((await validateStdlib(root)).join("\n")).toContain("invented: absent");
});

test("modules can share a reference while retaining inventory checks", async () => {
  const root = await fixture("| `first` | First |\n| `last` | Last |\n");
  await writeFile(
    resolve(root, "stdlib.json"),
    JSON.stringify({
      modules: [
        {
          name: "First",
          skill: "arturo-fixture",
          reference: "references/module.md",
          symbols: ["first"],
        },
        {
          name: "Last",
          skill: "arturo-fixture",
          reference: "references/module.md",
          symbols: ["last"],
        },
      ],
    }),
  );
  expect(await validateStdlib(root)).toEqual([]);
  await writeFile(
    resolve(root, "skills/arturo-fixture/references/module.md"),
    "| `first` | First |\n| `invented` | Fake |\n",
  );
  const errors = (await validateStdlib(root)).join("\n");
  expect(errors).toContain("last: missing");
  expect(errors).toContain("invented: absent");
});
