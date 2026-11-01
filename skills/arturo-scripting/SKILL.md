---
name: arturo-scripting
description: "Build Arturo CLI tools and local automation using files, processes, dates, storage, terminal/desktop APIs, Climax, Tasks, Progressive, Tabular, MIMEtypes, or Grafito."
metadata:
  arturo-version: 0.10.0
---

# Arturo scripting

For uncertain built-ins, use `inspect info.get 'name`: positional `args`, optional `attrs`, possible `returns`. Search the relevant official module below for unknown names; probe behavior rather than guessing. [Runtime detail](references/runtime.md) covers evaluation and metadata interpretation.

Load only the guide needed:

- [CLI/files](references/scripting.md): raw `arg` versus parsed `args`, script-relative paths, `write content destination`, error results. [Workflows](references/workflows.md): input validation and separate action/cleanup errors; deletion can silently leave paths behind.
- [Files](references/files-library.md), [Paths](references/paths-library.md), [System](references/system-library.md), [Io](references/io-library.md): local API discovery and limitations.
- [Databases](references/databases-library.md): parameterized SQL and connection/store lifecycle; [Grafito](references/grafito.md): graph DSL.
- [Dates](references/dates-library.md): calendar/timezone boundaries; [Crypto](references/crypto-library.md): encodings and legacy digest limitations; [Ui](references/ui-library.md): GUI/clipboard requirements.
- [Climax](references/climax.md): typed options/subcommands; built-in arguments suffice for small scripts.
- [Tasks](references/tasks.md): routines and dependencies; [Progressive](references/progressive.md): progress; [Tabular](references/tabular.md): tables; [MIMEtypes](references/mimetypes.md): extension lookup.

Package imports may download/evaluate code. Keep reusable computations separate from entry effects. Verify I/O in disposable directories; SQL values use `.with:`, and connections close on success/failure. For checks, choose the relevant worked example from the loaded guide rather than running all examples.
