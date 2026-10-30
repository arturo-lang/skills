# Exceptions: function selection

Use for explicit errors, guarded evaluation, and error detection. Error-kind constants are not exception-catching syntax. Preserve useful errors rather than swallowing them. Check the result of `try` and verify whether a block leaves additional stack values.

For signatures, ask the installed runtime with `inspect info.get 'arithmeticError`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

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

Reviewed 2026-10-29 against the [official Exceptions module](https://arturo-lang.io/documentation/library/exceptions), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 17 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 16 bounded table fragments other than the intentionally raising throw example also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
