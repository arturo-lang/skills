---

name: arturo-scripting
description: Use climax (Climax) to build Arturo CLI tools with typed options, subcommands, help, and dispatch. Automate terminal output, Tasks routines, files, processes, dates, databases, and desktop integration.
---

# Arturo scripting

For CLI tools with typed options, subcommands, or generated help, start with [climax](references/climax.md). Use this guide when asked to build a command-line application, even if the request does not name the package.

For argument parsing or file operations, read [CLI and file patterns](references/scripting.md). Establish inputs, output destinations, current-directory assumptions, and exit behavior before implementing the script.

Use `arturo script.art` to execute Arturo; Bun may orchestrate repository tooling but does not interpret `.art`. Check `arturo --help` and `arturo --version` for the installed CLI. Use `arg` for raw arguments and `args` for parsed options, preserving strings when automatic conversion would lose information.

Prefer built-in file and path operations to shell commands. `write` takes content first and destination second. Resolve paths deliberately; use a temporary directory for verification and do not overwrite user files as a test. Check existence and handle conversion/read errors according to the requested behavior.

Keep reusable logic in functions and CLI effects at the entry point. Consult the official Core/do and Core/function entries before splitting programs across files or exporting names; do not invent JavaScript-style imports.

Run an ordinary input and relevant invalid/empty input. Verify resulting file contents and exit behavior, not just whether the interpreter starts. [examples/arguments.art](examples/arguments.art) demonstrates raw argument iteration.

## CLI tools and automation packages

Use built-in argument handling for small scripts; use Climax when the tool needs typed options, subcommands, generated help, and dispatch. Package imports may download and evaluate code. Read only the package guide needed for the task and check its documented release against the installed version. These package examples are documentation-based; the default smoke suite stays offline and does not install them.

- [Climax](references/climax.md): CLI commands, groups, typed options, help, and passthrough arguments.
- [Progressive](references/progressive.md): bounded progress displays for supported iterators or manually tracked work.
- [Tabular](references/tabular.md): terminal table strings with headers, alignment, and padding.
- [MIMEtypes](references/mimetypes.md): look up MIME types by filename or extension.
- [Tasks](references/tasks.md): reusable routines, task dependencies, file actions, and shell execution inside actions.

## References: load only the relevant module

- [Files](references/files-library.md).
- [Io](references/io-library.md).
- [Paths](references/paths-library.md).
- [System](references/system-library.md).

Query signatures with `inspect info.get 'functionName`; see [runtime guidance](references/runtime.md) when interpreting metadata.

## encodings, checksums, and hashes

Separate reversible encodings from checksums and digests. Inspect defaults and supported algorithms; digest uses MD5 by default and supports SHA1 through .sha. Do not present these compatibility primitives as modern password hashing or authenticated encryption. Check round trips, malformed input, and byte/string assumptions.

- [Crypto](references/crypto-library.md).

[Offline checks](examples/crypto.art).

## databases and persistent stores

Establish the backend, database location, schema, and lifecycle first. Use query.with: for SQL parameters and close connections on success and failure. Keep store persistence destinations and deferred writes explicit. Verify in-memory SQL or disposable files before touching persistent user data; do not assume transaction or driver APIs.

- [Databases](references/databases-library.md).
- [Grafito](references/grafito.md): SQLite-backed graph storage, graph DSL, directed relationships, and in-memory checks.

[Offline checks](examples/databases.art).

## dates and calendar arithmetic

Capture a shared now value once when comparing related dates. Establish timezone, daylight-saving, and month-boundary behavior. Use fixed calendar checks where possible, and test relationships rather than exact current-time strings. Distinguish calendar intervals from elapsed durations.

- [Dates](references/dates-library.md).

[Offline checks](examples/dates.art).

## desktop dialogs and clipboard

Inspect the installed runtime and GUI support before choosing a function. Treat clipboard reads/writes, browser windows, and dialogs as real effects. Handle cancellation and returned selection values explicitly. Verify signatures headlessly; exercise interactive behavior only in a suitable desktop session within the requested task.

- [Ui](references/ui-library.md).

[Offline checks](examples/ui.art).
