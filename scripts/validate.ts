import { readdir, readFile, realpath, stat } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";

export async function validateLibrary(root: string): Promise<string[]> {
  const errors: string[] = [];
  const names = new Set<string>();
  const containers = await readdir(resolve(root, "skills"), {
    withFileTypes: true,
  });
  for (const container of containers.filter((entry) => entry.isDirectory())) {
    const skillRoot = await realpath(resolve(root, "skills", container.name));
    const entrypoint = resolve(skillRoot, "SKILL.md");
    let packageNames = new Set<string>();
    try {
      const notices = await readFile(
        resolve(skillRoot, "THIRD-PARTY-NOTICES.md"),
        "utf8",
      );
      packageNames = new Set(
        [...notices.matchAll(/^## ([a-z0-9-]+)$/gm)].map((match) => match[1]),
      );
    } catch {
      // Skills without external packages need no third-party notices.
    }
    let content: string;
    try {
      content = await readFile(entrypoint, "utf8");
    } catch {
      errors.push(`${container.name}: missing SKILL.md`);
      continue;
    }
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(content);
    let fields: Record<string, unknown> = {};
    try {
      const parsed = Bun.YAML.parse(frontmatter?.[1] ?? "");
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Expected a YAML mapping");
      }
      fields = parsed as Record<string, unknown>;
    } catch {
      errors.push(`${container.name}: invalid YAML frontmatter`);
    }
    const name = typeof fields.name === "string" ? fields.name.trim() : "";
    const description =
      typeof fields.description === "string" ? fields.description.trim() : "";
    if (
      !name ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) ||
      name.length > 64 ||
      name !== container.name
    ) {
      errors.push(`${container.name}: invalid or mismatched name`);
    }
    if (!description || description.length > 1024) {
      errors.push(`${container.name}: missing or oversized description`);
    }
    if (name && names.has(name))
      errors.push(`${container.name}: duplicate name`);
    if (name) names.add(name);

    async function inspect(directory: string): Promise<void> {
      for (const entry of await readdir(directory, { withFileTypes: true })) {
        const path = resolve(directory, entry.name);
        if (entry.isDirectory()) {
          await inspect(path);
          continue;
        }
        if (!entry.name.endsWith(".md")) continue;
        const markdown = await readFile(path, "utf8");
        if (
          path === entrypoint ||
          relative(skillRoot, path).startsWith("references/")
        ) {
          const header = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(
            markdown,
          );
          let metadata: unknown;
          try {
            const parsed = Bun.YAML.parse(header?.[1] ?? "") as {
              metadata?: unknown;
            } | null;
            metadata = parsed?.metadata;
          } catch {
            errors.push(`${relative(root, path)}: invalid YAML frontmatter`);
          }
          const record =
            metadata && typeof metadata === "object" && !Array.isArray(metadata)
              ? (metadata as Record<string, unknown>)
              : {};
          if (
            metadata !== undefined &&
            (!metadata ||
              typeof metadata !== "object" ||
              Array.isArray(metadata))
          ) {
            errors.push(`${relative(root, path)}: metadata must be a mapping`);
          }
          if (
            Object.entries(record).some(
              ([key, value]) =>
                key !== "sources" &&
                (typeof value !== "string" || !value.trim()),
            )
          ) {
            errors.push(
              `${relative(root, path)}: metadata values must be strings`,
            );
          }
          if (
            "sources" in record &&
            (!Array.isArray(record.sources) ||
              record.sources.some(
                (source) => typeof source !== "string" || !source.trim(),
              ))
          ) {
            errors.push(
              `${relative(root, path)}: metadata.sources must be a list of nonempty strings`,
            );
          }
          if (
            ("author" in record || "license" in record) &&
            (!relative(skillRoot, path).startsWith("references/") ||
              !packageNames.has(entry.name.replace(/\.md$/, "")))
          ) {
            errors.push(
              `${relative(root, path)}: author and license belong only on package references`,
            );
          }
          const date = record["review-date"];
          if (
            typeof date === "string" &&
            (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
              Number.isNaN(Date.parse(date)) ||
              new Date(date).toISOString().slice(0, 10) !== date)
          ) {
            errors.push(
              `${relative(root, path)}: invalid metadata.review-date`,
            );
          }
        }
        for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
          const target = match[1];
          if (!target || /^(https?:|mailto:|#)/.test(target)) continue;
          const linkPath = target.split("#")[0];
          if (!linkPath) continue;
          let destination: string;
          try {
            destination = await realpath(
              resolve(dirname(path), decodeURIComponent(linkPath)),
            );
            await stat(destination);
          } catch {
            errors.push(`${relative(root, path)}: missing link ${target}`);
            continue;
          }
          const local = relative(skillRoot, destination);
          if (
            isAbsolute(linkPath) ||
            local.startsWith("..") ||
            isAbsolute(local)
          ) {
            errors.push(`${relative(root, path)}: nonportable link ${target}`);
          }
        }
      }
    }
    await inspect(skillRoot);
  }
  if (names.size === 0) errors.push("No skills discovered");
  return errors;
}

if (import.meta.main) {
  const errors = await validateLibrary(resolve(import.meta.dir, ".."));
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Skill metadata and local references are valid.");
  }
}
