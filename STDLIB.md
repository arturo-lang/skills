# Standard-library coverage

Reviewed 2026-10-29: all 26 official modules and 521 entries are mapped below. Functions, predicates, and constants are counted together, as in the official index. Load the owning skill and only the relevant local reference. Every skill is independently installable. HTTP/JSON recipes, Net, and Sockets share networking. Math includes quantities and colors; scripting includes dates, encodings, persistence, and desktop integration.

| Module      | Entries | Owning skill and reference                                                        |
| ----------- | ------- | --------------------------------------------------------------------------------- |
| Arithmetic  | 11      | [arturo-math](skills/arturo-math/references/arithmetic-library.md)                |
| Bitwise     | 9       | [arturo-math](skills/arturo-math/references/bitwise-library.md)                   |
| Collections | 46      | [arturo-collections](skills/arturo-collections/references/collections-library.md) |
| Colors      | 9       | [arturo-math](skills/arturo-math/references/colors-library.md)                    |
| Comparison  | 9       | [arturo-language](skills/arturo-language/references/comparison-library.md)        |
| Core        | 35      | [arturo-language](skills/arturo-language/references/core.md)                      |
| Crypto      | 5       | [arturo-scripting](skills/arturo-scripting/references/crypto-library.md)          |
| Databases   | 4       | [arturo-scripting](skills/arturo-scripting/references/databases-library.md)       |
| Dates       | 14      | [arturo-scripting](skills/arturo-scripting/references/dates-library.md)           |
| Exceptions  | 17      | [arturo-debugging](skills/arturo-debugging/references/exceptions-library.md)      |
| Files       | 17      | [arturo-scripting](skills/arturo-scripting/references/files-library.md)           |
| Io          | 8       | [arturo-scripting](skills/arturo-scripting/references/io-library.md)              |
| Iterators   | 15      | [arturo-collections](skills/arturo-collections/references/iterators-library.md)   |
| Logic       | 14      | [arturo-language](skills/arturo-language/references/logic-library.md)             |
| Net         | 5       | [arturo-networking](skills/arturo-networking/references/net-library.md)           |
| Numbers     | 60      | [arturo-math](skills/arturo-math/references/numbers-library.md)                   |
| Paths       | 6       | [arturo-scripting](skills/arturo-scripting/references/paths-library.md)           |
| Quantities  | 112     | [arturo-math](skills/arturo-math/references/quantities-library.md)                |
| Reflection  | 11      | [arturo-debugging](skills/arturo-debugging/references/reflection-library.md)      |
| Sets        | 8       | [arturo-collections](skills/arturo-collections/references/sets-library.md)        |
| Sockets     | 7       | [arturo-networking](skills/arturo-networking/references/sockets-library.md)       |
| Statistics  | 6       | [arturo-math](skills/arturo-math/references/statistics-library.md)                |
| Strings     | 26      | [arturo-collections](skills/arturo-collections/references/strings-library.md)     |
| System      | 14      | [arturo-scripting](skills/arturo-scripting/references/system-library.md)          |
| Types       | 47      | [arturo-language](skills/arturo-language/references/types-library.md)             |
| Ui          | 6       | [arturo-scripting](skills/arturo-scripting/references/ui-library.md)              |

## Verification boundaries

All names were resolved via metadata lookup on the recorded runtime. Examples distinguish executable offline checks from documentation-only effects; metadata lookup does not execute a target function. GUI, external network, process termination, and persistent user-data operations are excluded from default smoke checks.

The snapshot in [stdlib.json](stdlib.json) records source digest, runtime, and per-module symbol coverage. It is a maintenance inventory, not a runtime signature database. Refresh it from the official module index and text reference when upstream changes.

Sources: [official library index](https://arturo-lang.io/documentation/library), [official text reference](https://arturo-lang.io/llms.txt). Upstream documentation by the Arturo project is licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); local tables are condensed adaptations.
