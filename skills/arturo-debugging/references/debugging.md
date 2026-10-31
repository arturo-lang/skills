---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
---

# Diagnostic patterns

| Symptom                              | First check                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| Arithmetic differs from a port       | Right-to-left grouping; parenthesize intended subexpressions                    |
| Function receives an unexpected type | Arity and expression boundaries; a nested call may consume inputs               |
| A block contains unresolved names    | It is data until evaluated; consider `do` or `array` for the intended operation |
| A variable changes unexpectedly      | Literal mutation, `set`, and aliases created without `new`                      |
| Assignment disappears after a call   | Function scope; inspect explicit `.export:` or returned values                  |
| Iterator name disappears or reverts  | Iterator-injected bindings are temporary and restored                           |
| Filtering yields the complement      | `filter` removes matches; `select` keeps them                                   |
| Extra values remain                  | A function/action left unintended values on the stack                           |
| JSON or HTTP member access fails     | Null/error response, HTTP status, body encoding, and missing keys               |

### Errors and Assertions

- Assertions: Use `ensure [actual = expected]`, passing a block rather than a boolean. Add custom messages with `.that:`.
- Error detection: `throws? [action]` checks whether an action throws.
- Error capture: `err: try [action]` captures `null` or an error, not the action's return value.
- Explicit errors: Use `throw "message"` to raise errors, with `.as:` to specify an error kind.
- Expected failures: Assert `error? err` or `throws? [...]` explicitly.
- CLI validation: Verify exit codes and output. Printing an error message alone does not prove failure handling works.
- Testing: Assert observable behavior rather than duplicating implementation logic.

## Version-sensitive work

Run `arturo --version` and consult `arturo --help`. Check Reflection/info and arity for builtin details before relying on a remembered signature. Preserve a minimal reproduction when documentation and the installed interpreter disagree, and describe the observed version-specific behavior.

- [Official reference](https://arturo-lang.io/llms.txt): Exceptions; Core/ensure; Reflection; Precedence and Evaluation; Scope and rules; In-place variable modification.
