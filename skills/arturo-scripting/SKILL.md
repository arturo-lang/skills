---

name: arturo-scripting
description: Build Arturo command-line scripts and local automation using arguments, files, directories, paths, and process integration. Use for .art utilities and filesystem workflows.
---

# Arturo scripting

Read [CLI and file patterns](references/scripting.md). Establish inputs, output destinations, current-directory assumptions, and exit behavior before implementing the script.

Use `arturo script.art` to execute Arturo; Bun may orchestrate repository tooling but does not interpret `.art`. Check `arturo --help` and `arturo --version` for the installed CLI. Use `arg` for raw arguments and `args` for parsed options, preserving strings when automatic conversion would lose information.

Prefer built-in file and path operations to shell commands. `write` takes content first and destination second. Resolve paths deliberately; use a temporary directory for verification and do not overwrite user files as a test. Check existence and handle conversion/read errors according to the requested behavior.

Keep reusable logic in functions and CLI effects at the entry point. Consult the official Core/do and Core/function entries before splitting programs across files or exporting names; do not invent JavaScript-style imports.

Run an ordinary input and relevant invalid/empty input. Verify resulting file contents and exit behavior, not just whether the interpreter starts. [examples/arguments.art](examples/arguments.art) demonstrates raw argument iteration.
