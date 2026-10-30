// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const revision = "60e7b92242e39fccdb764c505bb289e3a1e3d391";
export type Entry = {
  path: string;
  blob: string;
  kind: string;
  owner: string | null;
  dependencies: string[];
  effects: string[];
  cost: string;
  expectedResult: string | null;
  disposition: string;
  reason: string;
  review: string;
};
export type Catalog = {
  revision: string;
  repository: string;
  entries: Entry[];
};
export function validateInventory(
  catalog: Catalog,
  skills: Set<string>,
): string[] {
  const errors: string[] = [];
  if (catalog.revision !== revision) errors.push("Upstream revision mismatch");
  const paths = new Set<string>();
  for (const entry of catalog.entries) {
    if (paths.has(entry.path))
      errors.push(`Duplicate upstream path ${entry.path}`);
    paths.add(entry.path);
    if (
      !entry.path ||
      entry.path.startsWith("/") ||
      entry.path.split("/").some((part) => ["", ".", ".."].includes(part)) ||
      entry.path.includes("\\")
    )
      errors.push(`Invalid upstream path ${entry.path}`);
    if (!/^[a-f0-9]{40}$/.test(entry.blob))
      errors.push(`Invalid blob ${entry.path}`);
    if (
      !["program", "draft", "expected-output", "asset", "support"].includes(
        entry.kind,
      )
    )
      errors.push(`Invalid kind ${entry.path}`);
    if (
      ![
        "represented-locally",
        "queued-for-adaptation",
        "documentation-only",
        "excluded",
      ].includes(entry.disposition) ||
      !entry.reason?.trim()
    )
      errors.push(`Invalid disposition ${entry.path}`);
    if (
      !["source-review-needed", "source-reviewed", "tree-inventoried"].includes(
        entry.review,
      )
    )
      errors.push(`Invalid review ${entry.path}`);
    if (entry.owner !== null && !skills.has(entry.owner))
      errors.push(`Unknown owner ${entry.path}`);
    if (
      ["program", "draft"].includes(entry.kind) &&
      (!entry.owner ||
        !Array.isArray(entry.dependencies) ||
        !entry.dependencies.length ||
        !Array.isArray(entry.effects) ||
        !entry.effects.length ||
        !entry.cost?.trim())
    )
      errors.push(`Missing program classification ${entry.path}`);
    if (
      entry.expectedResult !== null &&
      !catalog.entries.some(
        (candidate) =>
          candidate.path === entry.expectedResult &&
          candidate.kind === "expected-output",
      )
    )
      errors.push(`Missing expected result ${entry.path}`);
  }
  return errors;
}
async function git(checkout: string, args: string[]): Promise<string> {
  const child = Bun.spawn(["git", "-C", checkout, ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const [output, error, code] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  if (code) throw new Error(error.trim());
  return output;
}
export async function compareCheckout(
  catalog: Catalog,
  checkout: string,
): Promise<string[]> {
  if ((await git(checkout, ["rev-parse", "HEAD"])).trim() !== catalog.revision)
    return ["Checkout revision mismatch"];
  const tree = (
    await git(checkout, ["ls-tree", "-rz", "--full-tree", catalog.revision])
  )
    .split("\0")
    .filter(Boolean);
  const actual = new Map(
    tree.map((line) => {
      const tab = line.indexOf("\t");
      return [line.slice(tab + 1), line.slice(0, tab).split(" ")[2]];
    }),
  );
  const errors: string[] = [];
  for (const entry of catalog.entries) {
    if (!actual.has(entry.path))
      errors.push(`Stale catalog path ${entry.path}`);
    else if (actual.get(entry.path) !== entry.blob)
      errors.push(`Changed upstream blob ${entry.path}`);
    actual.delete(entry.path);
  }
  for (const path of actual.keys()) errors.push(`Missing catalog path ${path}`);
  return errors;
}
if (import.meta.main) {
  const root = resolve(import.meta.dir, "..");
  const catalog = JSON.parse(
    await readFile(resolve(root, "upstream-examples.json"), "utf8"),
  );
  const skills = new Set(
    [...new Bun.Glob("skills/*/SKILL.md").scanSync({ cwd: root })].map(
      (path) => path.split("/")[1],
    ),
  );
  const errors = validateInventory(catalog, skills);
  const args = process.argv.slice(2);
  if (args.length) {
    if (args.length !== 2 || args[0] !== "--checkout")
      throw new Error("Usage: bun run upstream:check [--checkout PATH]");
    errors.push(...(await compareCheckout(catalog, args[1])));
  }
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else
    console.log(
      `Upstream inventory valid: ${catalog.entries.length} files; source review remains separately recorded.`,
    );
}
