# Exceptions: function selection

Use for explicit errors, guarded evaluation, and error detection. Error-kind constants are not exception-catching syntax. Preserve useful errors rather than swallowing them. Check the result of `try` and verify whether a block leaves additional stack values.

Query signatures with `inspect info.get 'arithmeticError`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                                       | Purpose / when to use                                  | Example                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------ |
| [arithmeticError](https://arturo-lang.io/documentation/library/exceptions/arithmeticerror) | An arithmetic error.                                   | `inspect arithmeticError`                  |
| [assertionError](https://arturo-lang.io/documentation/library/exceptions/assertionerror)   | An assertion error.                                    | `inspect assertionError`                   |
| [conversionError](https://arturo-lang.io/documentation/library/exceptions/conversionerror) | A conversion error.                                    | `inspect conversionError`                  |
| [indexError](https://arturo-lang.io/documentation/library/exceptions/indexerror)           | An index error.                                        | `inspect indexError`                       |
| [libraryError](https://arturo-lang.io/documentation/library/exceptions/libraryerror)       | A library error.                                       | `inspect libraryError`                     |
| [nameError](https://arturo-lang.io/documentation/library/exceptions/nameerror)             | A name error.                                          | `inspect nameError`                        |
| [packageError](https://arturo-lang.io/documentation/library/exceptions/packageerror)       | A package error.                                       | `inspect packageError`                     |
| [runtimeError](https://arturo-lang.io/documentation/library/exceptions/runtimeerror)       | A generic runtime error.                               | `inspect runtimeError`                     |
| [syntaxError](https://arturo-lang.io/documentation/library/exceptions/syntaxerror)         | A syntax error.                                        | `inspect syntaxError`                      |
| [systemError](https://arturo-lang.io/documentation/library/exceptions/systemerror)         | A system error.                                        | `inspect systemError`                      |
| [throw](https://arturo-lang.io/documentation/library/exceptions/throw)                     | Throw an error with message.                           | `throw "invalid input"`                    |
| [throws?](https://arturo-lang.io/documentation/library/exceptions/throws-)                 | Perform action, and return true if errors were thrown. | `throws? [discard to :integer "invalid"]`  |
| [try](https://arturo-lang.io/documentation/library/exceptions/try)                         | Perform action and catch possible errors.              | `err: try [discard to :integer "invalid"]` |
| [typeError](https://arturo-lang.io/documentation/library/exceptions/typeerror)             | A type error.                                          | `inspect typeError`                        |
| [uiError](https://arturo-lang.io/documentation/library/exceptions/uierror)                 | A UI error.                                            | `inspect uiError`                          |
| [valueError](https://arturo-lang.io/documentation/library/exceptions/valueerror)           | A value error.                                         | `inspect valueError`                       |
| [vmError](https://arturo-lang.io/documentation/library/exceptions/vmerror)                 | A VM error.                                            | `inspect vmError`                          |

## Sources and verification

Sources: the [official Exceptions module](https://arturo-lang.io/documentation/library/exceptions); [official text reference](https://arturo-lang.io/llms.txt). Reviewed: 2026-10-29. License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Reference version: Arturo 0.10.0 Arizona Bark (amd64/Linux). Metadata: 17 names resolved.

Checks: 16 fragments passed (exit 0, no stderr); intentionally raising throw excluded. Outputs and edge cases unasserted; null supplied for unbound predicate inputs.
