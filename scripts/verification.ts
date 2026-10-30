import { readFile, realpath, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";

const dimensions = [
  "documented",
  "metadata-inspected",
  "executed",
  "results-asserted",
  "edge-cases-tested",
];

export async function validateVerification(root: string): Promise<string[]> {
  const errors: string[] = [];
  const base = await realpath(root);
  const catalog = JSON.parse(
    await readFile(resolve(root, "verification.json"), "utf8"),
  );
  if (!Array.isArray(catalog.records)) return ["Missing verification records"];
  const ids = new Set<string>();
  for (const record of catalog.records) {
    if (!record || typeof record.id !== "string" || !record.id.trim()) {
      errors.push("Invalid verification record");
      continue;
    }
    if (ids.has(record.id)) errors.push(`Duplicate verification ${record.id}`);
    ids.add(record.id);
    if (
      !Array.isArray(record.dimensions) ||
      !record.dimensions.length ||
      record.dimensions.some((value: string) => !dimensions.includes(value))
    )
      errors.push(`Invalid verification dimensions ${record.id}`);
    for (const field of ["date", "scope", "result", "limitations"])
      if (typeof record[field] !== "string" || !record[field].trim())
        errors.push(`Missing verification ${field} ${record.id}`);
    if (
      Array.isArray(record.dimensions) &&
      record.dimensions.some((value: string) => value !== "documented")
    )
      for (const field of ["runtime", "platform", "command"])
        if (typeof record[field] !== "string" || !record[field].trim())
          errors.push(`Missing verification ${field} ${record.id}`);
    if (!Array.isArray(record.evidence) || !record.evidence.length)
      errors.push(`Missing verification evidence ${record.id}`);
    for (const path of Array.isArray(record.evidence) ? record.evidence : []) {
      try {
        if (
          typeof path !== "string" ||
          isAbsolute(path) ||
          path.split(/[\\/]/).includes("..")
        )
          throw new Error("Invalid path");
        const destination = await realpath(resolve(base, path));
        const local = relative(base, destination);
        if (
          isAbsolute(local) ||
          local.startsWith("..") ||
          !(await stat(destination)).isFile()
        )
          throw new Error("Outside repository or not file");
      } catch {
        errors.push(`Invalid verification evidence ${record.id}: ${path}`);
      }
    }
  }
  return errors;
}

if (import.meta.main) {
  const errors = await validateVerification(resolve(import.meta.dir, ".."));
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  }
}
