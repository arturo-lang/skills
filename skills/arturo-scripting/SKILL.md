---
name: arturo-scripting
description: Use climax (Climax) to build Arturo CLI tools with typed options, subcommands, help, and dispatch. Automate terminal output, Tasks routines, files, processes, dates, databases, and desktop integration.
metadata:
  arturo-version: 0.10.0
---

# Arturo scripting

Use `arturo script.art`; check the installed CLI with `arturo --help` and `arturo --version`. Read [runtime guidance](references/runtime.md) for signatures and evaluation.

- [CLI and file patterns](references/scripting.md): raw `arg` versus parsed `args`, identifiers versus counts, paths, and errors. `write` takes content before destination.
- [Bounded workflows](references/workflows.md): validated CLI input, owned files, fixed dates, and SQLite success/failure cleanup. Check deletion postconditions and preserve [action and cleanup failures](references/workflows.md#preserve-action-and-cleanup-failures) separately.
- Offline assertions: [arguments](examples/arguments.art), [count parsing](examples/input-count.art). Check ordinary, invalid, and empty inputs, file contents, and exit status in temporary directories.

Keep reusable functions separate from entry-point effects. Verify Core/do and Core/function loading and scope before splitting files; do not invent JavaScript imports.

## CLI tools and automation packages

Package imports may download and evaluate code. Read only the package guide needed for the task and check its documented release against the installed version.

- [Climax](references/climax.md): typed CLI options, subcommands, help, dispatch, and passthrough; built-in arguments suffice for small scripts.
- [Progressive](references/progressive.md): bounded progress displays for supported iterators or manually tracked work.
- [Tabular](references/tabular.md): terminal table strings with headers, alignment, and padding.
- [MIMEtypes](references/mimetypes.md): look up MIME types by filename or extension.
- [Tasks](references/tasks.md): reusable routines, task dependencies, file actions, and shell execution inside actions.

## Module references

- [Files](references/files-library.md).
- [Io](references/io-library.md).
- [Paths](references/paths-library.md).
- [System](references/system-library.md).

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
