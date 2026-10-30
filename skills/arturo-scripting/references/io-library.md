# Io: function selection

Use for terminal output, input, cursor control, and styling. Keep prompts and styling away from machine-readable stdout. Input can block; cursor operations require a terminal. Prefer `--no-color` during captured-output checks.

Query signatures with `inspect info.get 'clear`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

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

Sources: the [official Io module](https://arturo-lang.io/documentation/library/io); [official text reference](https://arturo-lang.io/llms.txt). License: [CC BY 4. Updated: 2026-10-29.0](https://creativecommons.org/licenses/by/4.0/).

Reference version: Arturo 0.10.0 Arizona Bark (amd64/Linux). Metadata: 8 names resolved.
