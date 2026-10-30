# System: function selection

Use for CLI arguments, environment/process information, and local automation. `arg` preserves raw strings; `args` parses values. Do not dump environment variables while debugging. Inspect `execute` behavior and quote externally supplied arguments deliberately. `config` may use persistent global storage; process termination and exit are effects, not harmless probes.

Query signatures with `inspect info.get 'arg`; see [runtime inspection](runtime.md) for metadata interpretation.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Examples can access persistent configuration, launch processes, or exit the program.

| Name                                                                         | Purpose / when to use                                                                     | Example                          |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------- |
| [arg](https://arturo-lang.io/documentation/library/system/arg)               | Obtain command-line arguments as a list.                                                  | `inspect arg`                    |
| [args](https://arturo-lang.io/documentation/library/system/args)             | Obtain all command-line arguments parsed as a dictionary.                                 | `inspect args`                   |
| [config](https://arturo-lang.io/documentation/library/system/config)         | Obtain local or global configuration.                                                     | `settings: config`               |
| [env](https://arturo-lang.io/documentation/library/system/env)               | Read selected environment values; use for external configuration without dumping secrets. | `key? env "PATH"`                |
| [execute](https://arturo-lang.io/documentation/library/system/execute)       | Execute shell command.                                                                    | `execute "pwd"`                  |
| [exit](https://arturo-lang.io/documentation/library/system/exit)             | Exit program.                                                                             | `exit`                           |
| [panic](https://arturo-lang.io/documentation/library/system/panic)           | Exit program with error message.                                                          | `panic.unstyled "invalid input"` |
| [path](https://arturo-lang.io/documentation/library/system/path)             | Obtain path information.                                                                  | `inspect path`                   |
| [pause](https://arturo-lang.io/documentation/library/system/pause)           | Pause program's execution for the amount of time.                                         | `pause 1`                        |
| [process](https://arturo-lang.io/documentation/library/system/process)       | Obtain information on current process/program.                                            | `inspect process`                |
| [script](https://arturo-lang.io/documentation/library/system/script)         | Obtain embedded information about the current script.                                     | `inspect script`                 |
| [superuser?](https://arturo-lang.io/documentation/library/system/superuser-) | Test whether current user has administrator/root privileges.                              | `superuser?`                     |
| [sys](https://arturo-lang.io/documentation/library/system/sys)               | Obtain current system information.                                                        | `inspect sys`                    |
| [terminate](https://arturo-lang.io/documentation/library/system/terminate)   | Kill process with id.                                                                     | `terminate childPid`             |

## Sources and verification

Sources: the [official System module](https://arturo-lang.io/documentation/library/system); [official text reference](https://arturo-lang.io/llms.txt). Reviewed: 2026-10-29. License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Reference version: Arturo 0.10.0 Arizona Bark (amd64/Linux). Metadata: 14 names resolved.
