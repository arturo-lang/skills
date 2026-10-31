# CLI verification

Use the installed runtime's `arturo --help` and `arturo --version` to check available options. Arturo executes `.art` files directly; no build step is needed for ordinary verification.

| Task                               | Command                               |
| ---------------------------------- | ------------------------------------- |
| Execute a file                     | `arturo path.art`                     |
| Evaluate a small expression        | `arturo -e 'ensure [14 = 2 * 3 + 4]'` |
| Capture output without ANSI colors | `arturo --no-color path.art`          |
| Experiment interactively           | `arturo --repl`                       |

Use a file for code containing literal identifiers such as `'items`; embedding these inside shell single quotes breaks shell quoting. Check exit status and stderr as well as output. Run examples that create files in a temporary directory.

Package imports can install missing packages automatically. Keep routine language checks free of remote package imports. Prefer the standard library unless dependencies serve the task.

Bytecode (`--compile`, `--execute`) and bundling (`--bundle`, `--as`) are documented as experimental; consult the installed help before using them for a requested deliverable.

## Sources

Sources: [official CLI guide](https://arturo-lang.io/documentation/command-line).
