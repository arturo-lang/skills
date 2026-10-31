# GitHub Actions for Arturo

## Install and test

Place project workflows in `.github/workflows/`. This Linux example assumes tests under `specs/` with suffix `.spec.art` and a root `config.art` containing:

```art
path: "specs"
suffix: ".spec.art"
binary: "arturo"
```

`binary` must resolve to the installed Arturo executable. Preserve existing project configuration where possible. Use [Unitt test files](unitt.md) with assertions inside cases and a guarded standalone report.

```yaml
name: Arturo CI
on: [push, pull_request, workflow_dispatch]
permissions:
  contents: read
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: arturo-lang/setup-arturo@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      - name: Install Unitt
        run: arturo -p install unitt
      - name: Run tests
        run: unitt
```

The installer uses the registry's available Unitt release; this guide covers `v3.1.1`. Follow the project's version strategy and inspect the installed release before relying on these APIs. Package executables must be on PATH.

If `unitt` is missing, check installation output and the package executable directory rather than assuming a global path. For a single standalone test file, `arturo --no-color specs/example.spec.art` is an alternative; it must end with a guarded `unitt\report 'full` or `'minimal` without `.keep`.

Do not suppress failures with `continue-on-error`, `|| true`, or Unitt's `--silent` option. Confirm discovery matches actual test files; a passing empty suite proves little. When verifying a new integration, check that an intentional failing assertion makes the job fail, then restore it.

## setup-arturo choices

The action requires `token`; `${{ secrets.GITHUB_TOKEN }}` is the upstream pattern. Ordinary test jobs can use `contents: read`. Preserve suitable existing action pins; the examples use upstream documented major tags. Pin reviewed commit SHAs when the project requires immutable action references.

- `do: fetch` is the default; `from: stable` fetches the stable release, while `from: latest` selects nightly builds. These channels move.
- To select an Arturo source revision, use `do: compile` and `src: <branch, tag, or commit>`. There is no documented generic `version` input for setup-arturo. A source commit pins the interpreter source, not every compiler or system dependency.
- `mode: full` is the default; choose `mini` only when the program and tests support it.
- OS/architecture detection normally follows the runner. Inputs include `os` (`linux`, `windows`, `macos`, `freebsd`, `web`) and `arch` (`amd64`, `arm64`, `js`). Web is a separate runtime target; do not assume it runs the native test command.
- `create_artifact: true` uploads the Arturo runtime build, rather than a bundled application. `artifacts_only: true` skips environment setup in fetch mode and is unsuitable for a job that needs to run Arturo.

For a native test matrix, use matching runners such as Ubuntu amd64, `ubuntu-24.04-arm` for Linux arm64, and `windows-latest` for Windows amd64; verify current runner availability. Windows commands use `shell: msys2 {0}` after setup. FreeBSD uses an Ubuntu host with `os: freebsd`, `arch: amd64`, and `shell: freebsd {0}`.

Checkout must precede setup so the VM receives project files, and FreeBSD run blocks should start with `cd $GITHUB_WORKSPACE`. Do not assume changing directories in one step persists into another.

## Bundle an application

Bundler installs Arturo and Nim itself. A build-only job does not need an extra setup-arturo step. Add a dependency on the test job when assembling a combined workflow:

```yaml
bundle:
  needs: test
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: arturo-lang/bundler@v2
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        entry: main.art
        target: myapp
        release: "true"
```

Replace `main.art` and `myapp` with the real entry and binary name. `entry` is required and may also be a package directory with an `info.art` declaring `executable:`. Use simple repository-controlled paths and names: the action interpolates these inputs into shell commands without consistent quoting.

Check imports and runtime assets, and smoke-test the resulting executable on its target platform.

Bundler's `from` accepts `stable` (default), `latest` (nightly), or `master` (compile Arturo from source). These are channel selectors; bundler's `version` input labels archives and does not pin Arturo. `target: auto` derives the binary name from the entry script. For package-directory entries, prefer an explicit target and verify the produced filename.

`release: "true"` creates and uploads a ZIP workflow artifact; it does not create a GitHub release. The implementation names the archive `<target>[-<version>]-<os>-<arch>.zip` and exports `FILENAME` and `EXEFILE` through the job environment. Windows archives contain the `.exe`.

Without `release: "true"`, bundler builds the executable but does not upload it. The ZIP contains the binary; include additional required assets or libraries separately after verifying deployment requirements.

For multiple platforms, match native runners to each OS/architecture; bundler supports Linux and macOS amd64/arm64, Windows amd64, and FreeBSD amd64. It does not make arbitrary cross-compilation work by setting `arch`. FreeBSD builds use an Ubuntu host and the VM configured by the nested setup action.

## Publishing releases

Use the upstream [release workflow](https://github.com/arturo-lang/bundler/blob/856568f0f4c5baf6ee61e9a963abacda3dd4e2d9/.github/workflows/testrelease.yml) as a reference when release publishing is requested. Adapt app name, entry, notes, tag trigger, test dependencies, and artifact collection.

Pass a version explicitly if archive names should include it; the bundler action reads `inputs.version` and does not itself extract a release tag.

Give `contents: write` to the release publishing job when needed, keeping ordinary CI read-only. A `Resource not accessible by integration` error calls for inspecting that job's token permissions and event context. Verify that every matrix artifact exists before publishing; preserve failed build and test status.

## Sources

- [setup-arturo README](https://github.com/arturo-lang/setup-arturo/blob/59c9867a8c8564f0ad1cd4d1960e9fddd623c5b7/README.md) and [action metadata](https://github.com/arturo-lang/setup-arturo/blob/59c9867a8c8564f0ad1cd4d1960e9fddd623c5b7/action.yml).
- [bundler README](https://github.com/arturo-lang/bundler/blob/856568f0f4c5baf6ee61e9a963abacda3dd4e2d9/README.md) and [action implementation](https://github.com/arturo-lang/bundler/blob/856568f0f4c5baf6ee61e9a963abacda3dd4e2d9/action.yml). Implementation takes precedence for archive naming and publication behavior.
- [Unitt README](https://github.com/RickBarretto/unitt/blob/v3.1.1/readme.md), [runner](https://github.com/RickBarretto/unitt/blob/v3.1.1/src/app.art), and [official CI example](https://github.com/RickBarretto/unitt/blob/v3.1.1/.github/workflows/test.yml).
- [Arturo CLI](https://arturo-lang.io/documentation/command-line/) and [official examples](https://github.com/arturo-lang/examples).
