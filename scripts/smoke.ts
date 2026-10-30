import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const executable = Bun.which("arturo");
if (!executable)
  throw new Error("Install Arturo and put arturo on PATH first.");

const root = resolve(import.meta.dir, "..");
const workspace = await mkdtemp(resolve(tmpdir(), "arturo-skills-smoke-"));
const cases: readonly (readonly [
  string,
  readonly string[],
  string,
  number?,
])[] = [
  ["arturo-packages/examples/local-package.art", [], "packages ok"],
  ["arturo-language/examples/basics.art", [], "language ok"],
  ["arturo-language/examples/project/main.art", [], "project ok"],
  ["arturo-collections/examples/collections.art", [], "collections ok"],
  ["arturo-scripting/examples/arguments.art", [], ""],
  [
    "arturo-scripting/examples/arguments.art",
    ["001", "two words"],
    "001\ntwo words",
  ],
  ["arturo-scripting/examples/cli-count.art", ["003"], "3"],
  [
    "arturo-scripting/examples/cli-count.art",
    ["invalid"],
    "usage: cli-count.art NONNEGATIVE_INTEGER",
    1,
  ],
  ["arturo-scripting/examples/files.art", [], "files ok"],
  ["arturo-scripting/examples/input-count.art", [], "input count ok"],
  ["arturo-networking/examples/json.art", [], "json ok"],
  ["arturo-networking/examples/response.art", [], "response workflow ok"],
  ["arturo-debugging/examples/errors.art", [], "debugging ok"],
  ["arturo-math/examples/checks.art", [], "math ok"],
  ["arturo-math/examples/colors.art", [], "colors ok"],
  ["arturo-scripting/examples/crypto.art", [], "crypto ok"],
  ["arturo-scripting/examples/databases.art", [], "databases ok"],
  ["arturo-scripting/examples/dates.art", [], "dates ok"],
  ["arturo-math/examples/quantities.art", [], "quantities ok"],
  ["arturo-networking/examples/checks.art", [], "networking metadata ok"],
  ["arturo-scripting/examples/ui.art", [], "ui metadata ok"],
] as const;

try {
  for (const [path, args, expected, expectedCode = 0] of cases) {
    const child = Bun.spawn(
      [executable, "--no-color", resolve(root, "skills", path), ...args],
      {
        cwd: path.startsWith("arturo-packages/")
          ? resolve(root, "skills", "arturo-packages")
          : workspace,
        stdout: "pipe",
        stderr: "pipe",
      },
    );
    const timeout = setTimeout(() => child.kill(), 10_000);
    try {
      const [output, errors, code] = await Promise.all([
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
        child.exited,
      ]);
      if (
        code !== expectedCode ||
        output.trim() !== expected ||
        errors.trim()
      ) {
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
