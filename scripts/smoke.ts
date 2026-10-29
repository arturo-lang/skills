import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const executable = Bun.which("arturo");
if (!executable)
  throw new Error("Install Arturo and put arturo on PATH first.");

const root = resolve(import.meta.dir, "..");
const workspace = await mkdtemp(resolve(tmpdir(), "arturo-skills-smoke-"));
const cases = [
  ["arturo-language/examples/basics.art", [], "language ok"],
  ["arturo-collections/examples/collections.art", [], "collections ok"],
  [
    "arturo-scripting/examples/arguments.art",
    ["001", "two words"],
    "001\ntwo words",
  ],
  ["arturo-scripting/examples/files.art", [], "files ok"],
  ["arturo-http-json/examples/json.art", [], "json ok"],
  ["arturo-debugging/examples/errors.art", [], "debugging ok"],
] as const;

try {
  for (const [path, args, expected] of cases) {
    const child = Bun.spawn(
      [executable, "--no-color", resolve(root, "skills", path), ...args],
      { cwd: workspace, stdout: "pipe", stderr: "pipe" },
    );
    const timeout = setTimeout(() => child.kill(), 10_000);
    try {
      const [output, errors, code] = await Promise.all([
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
        child.exited,
      ]);
      if (code !== 0 || output.trim() !== expected || errors.trim()) {
        throw new Error(`${path}: exit ${code}\n${output}\n${errors}`);
      }
      console.log(`PASS ${path}`);
    } finally {
      clearTimeout(timeout);
    }
  }
} finally {
  await rm(workspace, { recursive: true, force: true });
}
