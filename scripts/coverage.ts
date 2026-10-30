import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

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
  for (const entry of catalog.entries) {
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
    for (const path of entry.evidence ?? []) {
      if (path.startsWith("/") || path.split("/").includes("..")) {
        errors.push(`Invalid evidence ${path}`);
        continue;
      }
      try {
        await access(resolve(root, path));
      } catch {
        errors.push(`Missing evidence ${path}`);
      }
    }
  }
  for (const path of skills)
    if (!ids.has(path.split("/")[1])) errors.push(`Missing skill ${path}`);
  for (const module of inventory.modules)
    if (!ids.has(`module-${module.name}`))
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
