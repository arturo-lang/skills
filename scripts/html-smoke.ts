// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const args = Bun.argv.slice(2);
const source = args[args.indexOf("--source") + 1];
const version = args[args.indexOf("--release") + 1];
if (
  !args.includes("--source") ||
  !source ||
  !["0.0.4", "1.0.0-rc.1"].includes(version)
)
  throw new Error(
    "Opt in to execute a reviewed local source: bun run smoke:html --source FILE --release 0.0.4|1.0.0-rc.1",
  );
const executable = Bun.which("arturo");
if (!executable) throw new Error("Arturo required");
const text = await readFile(source);
console.log(
  `Supplied HTML release label=${version}; source sha256=${new Bun.CryptoHasher("sha256").update(text).digest("hex")}`,
);
const workspace = await mkdtemp(resolve(tmpdir(), "arturo-html-smoke-"));
try {
  await cp(source, resolve(workspace, "html.art"));
  const fixture = version === "0.0.4" ? "legacy" : "current";
  await cp(
    resolve(import.meta.dir, `fixtures/html/${fixture}.art`),
    resolve(workspace, "check.art"),
  );
  const child = Bun.spawn([executable, "--no-color", "check.art"], {
    cwd: workspace,
    stdout: "pipe",
    stderr: "pipe",
  });
  const timer = setTimeout(() => child.kill(9), 10000);
  let result: { code: number; stdout: string; stderr: string };
  try {
    const [code, stdout, stderr] = await Promise.all([
      child.exited,
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
    ]);
    result = { code, stdout, stderr };
  } finally {
    clearTimeout(timer);
  }
  if (
    result.code !== 0 ||
    result.stderr.trim() ||
    result.stdout.trim() !== `html ${fixture} ok`
  )
    throw new Error(JSON.stringify(result));
  console.log(`PASS HTML ${fixture} source checks`);
} finally {
  await rm(workspace, { recursive: true, force: true });
}
