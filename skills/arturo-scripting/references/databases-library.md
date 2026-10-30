# Databases: function selection

Use for database connections, parameterized SQL, and persistent stores. Inspect the enabled backend and return shapes. Bind SQL data with `.with:` instead of interpolating it. Close connections on success and failure. Stores write to disk; `.global` changes the destination and `.deferred` changes when persistence occurs.

For signatures, ask the installed runtime with `inspect info.get 'close`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Examples require a connection or store and cleanup; use a disposable database.

| Name                                                                  | Purpose / when to use                                                      | Example                                     |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------- |
| [close](https://arturo-lang.io/documentation/library/databases/close) | Close database.                                                            | `close db`                                  |
| [open](https://arturo-lang.io/documentation/library/databases/open)   | Opens a new database connection and returns database.                      | `db: open.sqlite ":memory:"`                |
| [query](https://arturo-lang.io/documentation/library/databases/query) | Execute command or block of commands in database and get returned rows.    | `query.with: ["Ada"] db "SELECT ? AS name"` |
| [store](https://arturo-lang.io/documentation/library/databases/store) | Open a persistent key/value store; use for automatically saved local data. | `data: store "example-store"`               |

## Sources and verification

Reviewed 2026-10-29 against the [official Databases module](https://arturo-lang.io/documentation/library/databases), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 4 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.
