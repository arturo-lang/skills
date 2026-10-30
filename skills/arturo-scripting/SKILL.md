---

name: arturo-scripting
description: Build Arturo automation with CLI arguments, files, paths, processes, dates, encodings, databases, persistent stores, and desktop integration.
---

# Arturo scripting

Read [CLI and file patterns](references/scripting.md). Establish inputs, output destinations, current-directory assumptions, and exit behavior before implementing the script.

Use `arturo script.art` to execute Arturo; Bun may orchestrate repository tooling but does not interpret `.art`. Check `arturo --help` and `arturo --version` for the installed CLI. Use `arg` for raw arguments and `args` for parsed options, preserving strings when automatic conversion would lose information.

Prefer built-in file and path operations to shell commands. `write` takes content first and destination second. Resolve paths deliberately; use a temporary directory for verification and do not overwrite user files as a test. Check existence and handle conversion/read errors according to the requested behavior.

Keep reusable logic in functions and CLI effects at the entry point. Consult the official Core/do and Core/function entries before splitting programs across files or exporting names; do not invent JavaScript-style imports.

Run an ordinary input and relevant invalid/empty input. Verify resulting file contents and exit behavior, not just whether the interpreter starts. [examples/arguments.art](examples/arguments.art) demonstrates raw argument iteration.

## Standard-library selection guides

- [Files](references/files-library.md): 17 functions, predicates, or constants.
- [Io](references/io-library.md): 8 functions, predicates, or constants.
- [Paths](references/paths-library.md): 6 functions, predicates, or constants.
- [System](references/system-library.md): 14 functions, predicates, or constants.

Ask Arturo for signatures with `inspect info.get 'functionName`; see [runtime inspection and defaults](references/runtime.md) before reading argument types, attributes, and results.

## encodings, checksums, and hashes

Separate reversible encodings from checksums and digests. Inspect defaults and supported algorithms; digest uses MD5 by default and supports SHA1 through .sha. Do not present these compatibility primitives as modern password hashing or authenticated encryption. Check round trips, malformed input, and byte/string assumptions.

- [Crypto](references/crypto-library.md).

[Offline checks](examples/crypto.art).

## databases and persistent stores

Establish the backend, database location, schema, and lifecycle first. Use query.with: for SQL parameters and close connections on success and failure. Keep store persistence destinations and deferred writes explicit. Verify in-memory SQL or disposable files before touching persistent user data; do not assume transaction or driver APIs.

- [Databases](references/databases-library.md).

[Offline checks](examples/databases.art).

## dates and calendar arithmetic

Capture a shared now value once when comparing related dates. Establish timezone, daylight-saving, and month-boundary behavior. Use fixed calendar checks where possible, and test relationships rather than exact current-time strings. Distinguish calendar intervals from elapsed durations.

- [Dates](references/dates-library.md).

[Offline checks](examples/dates.art).

## desktop dialogs and clipboard

Inspect the installed runtime and GUI support before choosing a function. Treat clipboard reads/writes, browser windows, and dialogs as real effects. Handle cancellation and returned selection values explicitly. Verify signatures headlessly; exercise interactive behavior only in a suitable desktop session within the requested task.

- [Ui](references/ui-library.md).

[Offline checks](examples/ui.art).
