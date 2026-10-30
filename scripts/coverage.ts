import { readFile, realpath, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";

export async function validateCoverage(root: string): Promise<string[]> {
  const errors: string[] = [];
  const catalog = JSON.parse(
    await readFile(resolve(root, "coverage.json"), "utf8"),
  );
  const inventory = JSON.parse(
    await readFile(resolve(root, "stdlib.json"), "utf8"),
  );
  const ids = new Set<string>();
  const skills = new Set(
    new Bun.Glob("skills/*/SKILL.md").scanSync({ cwd: root }),
  );
  const modules = new Set(
    inventory.modules.map(
      (module: { name: string }) => `module-${module.name}`,
    ),
  );
  const skillIds = new Set([...skills].map((path) => path.split("/")[1]));
  const typedIds = new Set<string>();
  const realRoot = await realpath(root);
  for (const entry of catalog.entries) {
    const expectedKind = skillIds.has(entry.id)
      ? "skill"
      : modules.has(entry.id)
        ? "module"
        : null;
    if (expectedKind && entry.kind !== expectedKind)
      errors.push(`Incorrect kind ${entry.id}: expected ${expectedKind}`);
    if (entry.kind === "skill" && !skillIds.has(entry.id))
      errors.push(`Unknown skill ${entry.id}`);
    if (entry.kind === "module" && !modules.has(entry.id))
      errors.push(`Unknown module ${entry.id}`);
    if (expectedKind === entry.kind) typedIds.add(entry.id);
    if (["skill", "module"].includes(entry.kind) && !entry.owner)
      errors.push(`Missing owner ${entry.id}`);
    if (ids.has(entry.id)) errors.push(`Duplicate coverage ${entry.id}`);
    ids.add(entry.id);
    if (
      !["skill", "module", "task"].includes(entry.kind) ||
      !["partial", "backlog"].includes(entry.status) ||
      !Array.isArray(entry.evidence) ||
      !entry.evidence.length
    )
      errors.push(`Invalid coverage ${entry.id}`);
    if (entry.owner && !skills.has(`skills/${entry.owner}/SKILL.md`))
      errors.push(`Unknown owner ${entry.owner}`);
    for (const path of Array.isArray(entry.evidence) ? entry.evidence : []) {
      if (
        typeof path !== "string" ||
        !path ||
        isAbsolute(path) ||
        path.includes("\\") ||
        path.split("/").includes("..")
      ) {
        errors.push(`Invalid evidence ${path}`);
        continue;
      }
      try {
        const target = await realpath(resolve(root, path));
        const within = relative(realRoot, target);
        if (
          within === ".." ||
          within.startsWith("../") ||
          isAbsolute(within) ||
          !(await stat(target)).isFile()
        )
          errors.push(`Invalid evidence ${path}`);
      } catch {
        errors.push(`Missing evidence ${path}`);
      }
    }
  }
  for (const path of skills)
    if (!typedIds.has(path.split("/")[1])) errors.push(`Missing skill ${path}`);
  for (const module of inventory.modules)
    if (!typedIds.has(`module-${module.name}`))
      errors.push(`Missing module ${module.name}`);
  for (const path of new Bun.Glob("skills/**/*.md").scanSync({ cwd: root })) {
    if (
      (await readFile(resolve(root, path), "utf8")).includes(
        "CC BY 4. Updated:",
      )
    )
      errors.push(`Malformed attribution ${path}`);
  }
  return errors;
}
if (import.meta.main) {
  const errors = await validateCoverage(resolve(import.meta.dir, ".."));
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  }
}
