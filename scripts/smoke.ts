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
  ["arturo/examples/packages/local-package.art", [], "packages ok"],
  ["arturo/examples/language/basics.art", [], "language ok"],
  ["arturo/examples/language/project/main.art", [], "project ok"],
  ["arturo/examples/collections/collections.art", [], "collections ok"],
  ["arturo/examples/scripting/arguments.art", [], ""],
  [
    "arturo/examples/scripting/arguments.art",
    ["001", "two words"],
    "001\ntwo words",
  ],
  ["arturo/examples/scripting/cli-count.art", ["003"], "3"],
  [
    "arturo/examples/scripting/cli-count.art",
    ["invalid"],
    "usage: cli-count.art NONNEGATIVE_INTEGER",
    1,
  ],
  ["arturo/examples/scripting/files.art", [], "files ok"],
  ["arturo/examples/scripting/file-cleanup.art", [], "file cleanup ok"],
  ["arturo/examples/scripting/input-count.art", [], "input count ok"],
  ["arturo/examples/networking/json.art", [], "json ok"],
  ["arturo/examples/networking/response.art", [], "response workflow ok"],
  ["arturo/examples/debugging/errors.art", [], "debugging ok"],
  ["arturo/examples/math/checks.art", [], "math ok"],
  ["arturo/examples/math/colors.art", [], "colors ok"],
  ["arturo/examples/scripting/crypto.art", [], "crypto ok"],
  ["arturo/examples/scripting/databases.art", [], "databases ok"],
  ["arturo/examples/scripting/dates.art", [], "dates ok"],
  ["arturo/examples/math/quantities.art", [], "quantities ok"],
  ["arturo/examples/networking/checks.art", [], "networking metadata ok"],
  ["arturo/examples/scripting/ui.art", [], "ui metadata ok"],
] as const;

try {
  for (const [path, args, expected, expectedCode = 0] of cases) {
    const child = Bun.spawn(
      [executable, "--no-color", resolve(root, "skills", path), ...args],
      {
        cwd: path.startsWith("arturo/examples/packages/")
          ? resolve(root, "skills", "arturo")
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
