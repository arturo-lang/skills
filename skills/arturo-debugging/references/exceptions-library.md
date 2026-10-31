---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/exceptions
    - https://arturo-lang.io/llms.txt
---

### Error Handling

- Purpose: Use for explicit errors, guarded evaluation, and error detection.
- Error kinds: Constants identify error types; they are not exception-catching syntax.
- Error preservation: Propagate meaningful errors instead of silently suppressing them.
- Error capture: `err: try [action]` captures `null` or an error, not the action's return value. Assert `error? err` or use `throws? [action]` for expected failures.
- Assertions: Use `ensure [actual = expected]`, passing a block rather than a boolean. Add custom messages with `.that:`.
- Explicit errors: Use `throw "message"` to raise errors, with `.as:` to specify an error kind.
- CLI validation: Verify exit codes and output. Printing an error message alone does not prove failure handling works.
- Stack safety: Verify whether evaluated blocks leave additional values on the stack.

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
