# CLI and local automation

## Arguments

`arg` returns raw command-line inputs as a block of strings. `loop arg 'value [print value]` processes them unchanged. `args` parses switches and named values into a dictionary with positional values; inspect its shape for the actual invocation. Parsed numbers are inappropriate for identifiers where leading zeroes matter.

Validate the number of positional arguments before indexing. Use `to :integer` only after establishing expected input and handle conversion errors. Use `exit` for the intended process result after checking the installed function's signature.

`arturo -e 'print 2 + 3'` is convenient for a small reproduction. Prefer a file for multi-line programs and shell-sensitive strings. Do not assume every experimental compile/bundle option is present across interpreter versions.

## Files and paths

| Operation       | Form                                         |
| --------------- | -------------------------------------------- |
| Read text       | `read "input.txt"`                           |
| Read lines      | `read.lines "input.txt"`                     |
| Write text      | `write "hello" "output.txt"`                 |
| Append text     | `write.append "more" "output.txt"`           |
| Check a path    | `exists? "input.txt"`                        |
| Check file kind | `file? "input.txt"` or `directory? "folder"` |

For ambiguous text/path inputs, check the `read.file` attribute. `read` can also accept URLs or format content; do not assume every string is treated as a local filename.

Paths/absolute, relative, normalize, extract, and list provide path operations. Their attributes affect output and resolution; check the current signature before using them. A script's location and the process working directory are distinct concepts. Confirm how System/script and System/path behave when the task depends on that distinction.

For external processes, look up System/execute and System/process and their result/exit semantics. Keep untrusted values out of interpolated shell command strings. Do not replace a built-in operation with an assumed shell utility unless the target environment supports it.

## Error handling

`err: try [ ... ]` captures an error value; `error? err` distinguishes failure. Assign a needed result inside the action because `try` itself reports null/error rather than the action's successful result. Test missing-file and invalid-input cases in an isolated directory.

## Sources

- [Official reference](https://arturo-lang.io/llms.txt): Files; Paths; System/arg, args, script, path, execute, process, exit; Exceptions/try.
- [Command-line arguments](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Command-line%20arguments.art).
- [Read entire file](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Read%20entire%20file.art).
