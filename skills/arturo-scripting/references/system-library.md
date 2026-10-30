# System: function selection

Use for CLI arguments, environment/process information, and local automation. `arg` preserves raw strings; `args` parses values. Do not dump environment variables while debugging. Inspect `execute` behavior and quote externally supplied arguments deliberately. `config` may use persistent global storage; process termination and exit are effects, not harmless probes.

For signatures, ask the installed runtime with `inspect info.get 'arg`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

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

Reviewed 2026-10-29 against the [official System module](https://arturo-lang.io/documentation/library/system), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 14 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.
