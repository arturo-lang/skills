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

## Errors and assertions

Use `ensure [actual = expected]`; `ensure` expects a block, not an already evaluated boolean. Its `.that:` option supplies a message. Place assertions around observable behavior rather than copies of implementation logic.

`throws? [action]` asks whether an action throws. `err: try [action]` captures null/error. It does not return the action's ordinary result; bind that result inside the action if needed. `throw "message"` raises an error; `.as:` selects an error kind such as `valueError`.

When expected failure is part of the test, assert `error? err` or `throws? [...]` explicitly. A successful process that prints an error message does not prove the error path is correct. Verify exit status and output where a CLI contract depends on them.

## Version-sensitive work

Run `arturo --version` and consult `arturo --help`. Check Reflection/info and arity for builtin details before relying on a remembered signature. Preserve a minimal reproduction when documentation and the installed interpreter disagree, and describe the observed version-specific behavior.

For performance issues, establish correct output first. Reflection/benchmark can time a bounded action. Memoization and in-place updates change resource use or aliasing; verify semantics before adopting them as fixes.

## Sources

- [Official reference](https://arturo-lang.io/llms.txt): Exceptions; Core/ensure; Reflection; Precedence and Evaluation; Scope and rules; In-place variable modification.
- [Function definition](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Function%20definition.art) provides a small comparison of explicit return and expression result.
