import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

if (!Bun.argv.includes("--allow-network"))
  throw new Error(
    "Opt in: bun run smoke:preview --allow-network. May acquire Lanx 0.2.0/dependencies and starts a temporary listener.",
  );
const executable = Bun.which("arturo");
if (!executable) throw new Error("Arturo required");
const workspace = await mkdtemp(resolve(tmpdir(), "arturo-preview-smoke-"));
const reservation = Bun.serve({ port: 0, fetch: () => new Response("") });
const port = reservation.port;
reservation.stop(true);
let child: ReturnType<typeof Bun.spawn> | undefined;
try {
  await mkdir(resolve(workspace, "public"));
  await writeFile(
    resolve(workspace, "public/index.html"),
    "<!DOCTYPE html><p>preview fixture</p>",
  );
  const binary = new Uint8Array([0, 1, 128, 255]);
  await writeFile(resolve(workspace, "public/fixture.bin"), binary);
  await writeFile(
    resolve(workspace, "serve.art"),
    `import.version:0.2.0 "lanx"!\nserver: to :lanx []!\nserver\\root: "public"\nserver\\port: ${port}\nserver\\start\n`,
  );
  child = Bun.spawn([executable, "--no-color", "serve.art"], {
    cwd: workspace,
    stdout: "ignore",
    stderr: "pipe",
  });
  const errors = new Response(child.stderr).text();
  const deadline = setTimeout(() => child?.kill(9), 120000);
  try {
    const url = `http://127.0.0.1:${port}`;
    let ready = false;
    for (let i = 0; i < 100; i++) {
      if (child.exitCode !== null)
        throw new Error(`Lanx exited early: ${await errors}`);
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(500) });
        ready =
          response.status === 200 &&
          (await response.text()).includes("preview fixture");
        if (ready) break;
      } catch {
        /* Wait for package acquisition/startup within the process deadline. */
      }
      await Bun.sleep(100);
    }
    if (!ready)
      throw new Error(
        "Lanx did not serve the intended HTML root within the startup bound",
      );
    const asset = await fetch(`${url}/fixture.bin`, {
      signal: AbortSignal.timeout(2000),
    });
    if (
      asset.status !== 200 ||
      !Buffer.from(await asset.arrayBuffer()).equals(Buffer.from(binary))
    )
      throw new Error("Binary asset response differs");
    const missing = await fetch(`${url}/missing`, {
      signal: AbortSignal.timeout(2000),
    });
    if (missing.status !== 404)
      throw new Error("Missing path did not return 404");
    child.kill("SIGINT");
    await child.exited;
    const shutdownErrors = (await errors).trim();
    if (shutdownErrors && shutdownErrors !== "SIGINT: Interrupted by Ctrl-C.")
      throw new Error(`Lanx stderr: ${shutdownErrors}`);
    try {
      await fetch(url, { signal: AbortSignal.timeout(500) });
      throw new Error("Listener remained available after shutdown");
    } catch (error) {
      if (String(error).includes("remained available")) throw error;
    }
    console.log(
      "PASS Lanx 0.2.0 HTML/binary/404/shutdown (loopback client; binding scope not asserted)",
    );
  } finally {
    clearTimeout(deadline);
  }
} finally {
  if (child && child.exitCode === null) {
    child.kill(9);
    await child.exited;
  }
  await rm(workspace, { recursive: true, force: true });
}
