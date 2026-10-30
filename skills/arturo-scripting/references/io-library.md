# Io: function selection

Use for terminal output, input, cursor control, and styling. Keep prompts and styling away from machine-readable stdout. Input can block; cursor operations require a terminal. Prefer `--no-color` during captured-output checks.

For signatures, ask the installed runtime with `inspect info.get 'clear`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

| Name                                                                 | Purpose / when to use                                                        | Example                |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------- |
| [clear](https://arturo-lang.io/documentation/library/io/clear)       | Clear terminal.                                                              | `inspect clear`        |
| [color](https://arturo-lang.io/documentation/library/io/color)       | Obtain colored version of string.                                            | `color #green "hello"` |
| [cursor](https://arturo-lang.io/documentation/library/io/cursor)     | Turn cursor visibility on/off.                                               | `cursor false`         |
| [goto](https://arturo-lang.io/documentation/library/io/goto)         | Move cursor to coordinates.                                                  | `goto 10 15`           |
| [input](https://arturo-lang.io/documentation/library/io/input)       | Print prompt and get user input. If the prompt is ø, get a single character. | `input "Your name? "`  |
| [print](https://arturo-lang.io/documentation/library/io/print)       | Print value to screen with newline.                                          | `print "hello"`        |
| [prints](https://arturo-lang.io/documentation/library/io/prints)     | Print value to screen.                                                       | `prints "hello"`       |
| [terminal](https://arturo-lang.io/documentation/library/io/terminal) | Obtain info about terminal.                                                  | `inspect terminal`     |

## Sources and verification

Reviewed 2026-10-29 against the [official Io module](https://arturo-lang.io/documentation/library/io), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 8 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.
