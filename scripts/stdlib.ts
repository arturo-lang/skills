import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

type Module = {
  name: string;
  skill: string;
  reference: string;
  symbols: string[];
};

type Inventory = {
  reviewed: string;
  source: string;
  sha256: string;
  runtime: string;
  modules: Module[];
};

export async function validateStdlib(root: string): Promise<string[]> {
  const inventory: Inventory = JSON.parse(
    await readFile(resolve(root, "stdlib.json"), "utf8"),
  );
  const errors: string[] = [];
  const modules = new Set<string>();
  const symbols = new Set<string>();
  for (const module of inventory.modules) {
    if (modules.has(module.name))
      errors.push(`Duplicate module ${module.name}`);
    modules.add(module.name);
    const path = resolve(root, "skills", module.skill, module.reference);
    const content = await readFile(path, "utf8");
    const documented = [
      ...content.matchAll(/^\| (?:`([^`]+)`|\[([^\]]+)\]\([^)]*\))\s+\|/gm),
    ].map((match) => match[1] ?? match[2]);
    for (const symbol of module.symbols) {
      if (symbols.has(symbol)) errors.push(`Duplicate symbol ${symbol}`);
      symbols.add(symbol);
      if (!documented.includes(symbol))
        errors.push(`${module.name}/${symbol}: missing selection-guide entry`);
    }
    for (const symbol of documented) {
      if (!module.symbols.includes(symbol))
        errors.push(`${module.name}/${symbol}: absent from source inventory`);
      if (documented.filter((name) => name === symbol).length > 1)
        errors.push(
          `${module.name}/${symbol}: duplicate selection-guide entry`,
        );
    }
  }
  return errors;
}

async function inspectModules(root: string): Promise<void> {
  const executable = Bun.which("arturo");
  if (!executable)
    throw new Error("Put arturo on PATH before inspecting metadata.");
  const inventory: Inventory = await Bun.file(
    resolve(root, "stdlib.json"),
  ).json();
  for (const module of inventory.modules) {
    // Names come from the checked-in official inventory, never shell interpolation.
    if (module.symbols.some((name) => !/^[a-zA-Z][a-zA-Z0-9?]*$/.test(name)))
      throw new Error(`Unexpected symbol spelling in ${module.name}`);
    const code = module.symbols
      .map(
        (name) =>
          `ensure [dictionary? info.get '${name}]\ninspect info.get '${name}`,
      )
      .join("\n");
    const child = Bun.spawn([executable, "--no-color", "-e", code], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const timeout = setTimeout(() => child.kill(), 10_000);
    try {
      const [status, _output, errors] = await Promise.all([
        child.exited,
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
      ]);
      if (status !== 0 || errors.trim())
        throw new Error(
          `${module.name}: metadata inspection failed (${status})\n${errors}`,
        );
      console.log(
        `PASS ${module.name}: ${module.symbols.length} metadata entries`,
      );
    } finally {
      clearTimeout(timeout);
    }
  }
}

if (import.meta.main) {
  const root = resolve(import.meta.dir, "..");
  const errors = await validateStdlib(root);
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else if (Bun.argv.includes("--inspect")) {
    await inspectModules(root);
  } else {
    console.log("Standard-library inventory and selection guides agree.");
  }
}
