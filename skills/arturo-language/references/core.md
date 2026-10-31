---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/core
    - https://arturo-lang.io/llms.txt
---

# Core functions: purpose and examples

Use this as a selection guide, then ask Arturo for the installed signature using [runtime inspection](inspection.md). These are actual callable functions, not reserved control-flow or declaration syntax. `any`, `null`, and `window` are constants, listed separately below.

Examples are independent fragments; bindings such as `items`, `ready`, and `score` represent the surrounding program's inputs. Package, file, and external-library operations require the corresponding resources; routine checks should remain offline.

## Conditions and iteration

| Function   | Purpose and when to use                                                                                     | Example                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `if`       | Perform an action unless the condition is `false` or `null`. Use for one conditional action.                | `if ready [print "ready"]`                              |
| `unless`   | Perform an action when the condition is `false` or `null`. Use for a guard with a negative condition.       | `unless ready [print "waiting"]`                        |
| `switch`   | Choose between two action blocks. Use when both alternatives matter or a selected result is needed.         | `label: switch ready ["ready"] ["waiting"]`             |
| `case`     | Match a value against candidates. Use for value-based dispatch; `any` provides a fallback.                  | `case code [200 [print "ok"] any [print "other"]]`      |
| `when`     | Test a chain of conditions. Use `.any` to check all conditions rather than stopping at the first match.     | `when [[score > 10] [print "high"] true [print "low"]]` |
| `while`    | Repeat while a condition block is neither `false` nor `null`. Use when the condition comes before the body. | `i: 0 while [i < 3] [i: i + 1]`                         |
| `until`    | Run the action, then check the condition. Use when the body must run at least once; action comes first.     | `i: 0 until [i: i + 1] [i = 3]`                         |
| `break`    | Exit the current block or loop. Use to stop a search or bounded loop early.                                 | `loop 1..5 'i [if i = 3 [break]]`                       |
| `continue` | Skip the remainder of the current iteration. Use to bypass unwanted items.                                  | `loop 1..5 'i [if i = 3 [continue] print i]`            |
| `coalesce` | Choose a fallback for `false` or `null`; alias `??`. Use for default values, not lazy branch execution.     | `name: coalesce null "anonymous"`                       |
| `ensure`   | Assert a condition block. Use for executable preconditions and checks; `.that:` adds a failure message.     | `ensure.that: "positive count required" [count > 0]`    |

`case` and `when` evaluate their outer blocks. Wrap actions and deferred conditions deliberately; see [control-flow evaluation](language.md#functions-and-control-flow).

## Functions, modules, and evaluation

| Function   | Purpose and when to use                                                                                                           | Example                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `function` | Construct a function from parameters and a body; alias `$`. Use for reusable computation with normal function scope.              | `double: function [x] [x * 2]`                               |
| `call`     | Invoke a function with a parameter block. Use for dynamic calls; `.external:` supports external libraries when explicitly needed. | `call 'double [4]`                                           |
| `return`   | Exit the current function with a value. Use for early results.                                                                    | `double: function [x] [return x * 2]`                        |
| `method`   | Construct a type or module method. Use `.public` for methods that a module should expose.                                         | `greet: method.public [name] [print name]`                   |
| `module`   | Group state and methods in an isolated container. Use for an interface with selected public methods.                              | `greeter: module [greet: method.public [name] [print name]]` |
| `export`   | Bring a container's members into the current scope. Use for module public methods; `.all` also exposes private members.           | `export greeter`                                             |
| `import`   | Load a package or local file. Use when consuming reusable external code; missing packages may be installed automatically.         | `import "helpers.art"`                                       |
| `do`       | Evaluate a block, code string, bytecode, or script source. Use for deliberate evaluation in the surrounding scope.                | `do [count: 3]`                                              |
| `with`     | Embed selected current bindings in a block. Use to construct a block for later evaluation.                                        | `x: 3 saved: with [x] [x * 2]`                               |
| `using`    | Evaluate a body with a supplied `this`. Use for relative member access and updates.                                               | `using #[name: "Ada"] [print \name]`                         |

Loading code can introduce callable words after the enclosing code was parsed. The official `do` and `import` examples wrap later calls in `do [...]`; follow that pattern when invoking newly loaded functions. Module export visibility is distinct from the `_` naming convention for private helpers.

## Bindings, representation, and the stack

| Function  | Purpose and when to use                                                                                                   | Example                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `alias`   | Assign a symbol to a function. Use for an intentional DSL or operator; `.infix` selects infix use.                        | `alias.infix "<=>" 'multiplyThem`     |
| `let`     | Bind a name to a value; alias `:`. Use literal or computed names for dynamic assignment.                                  | `let 'itemCount 3`                    |
| `var`     | Retrieve a value by its name. Use when the symbol name is data, including retrieving a function without invoking it.      | `itemCount: 3 value: var 'itemCount`  |
| `set?`    | Check whether a symbol is bound. Use before accessing an optional binding.                                                | `set? 'itemCount`                     |
| `unset`   | Remove a binding if present. Use when a symbol should cease to be defined.                                                | `unset 'itemCount`                    |
| `new`     | Clone a value. Use when later mutation must not affect the original.                                                      | `copy: new items`                     |
| `parse`   | Parse Arturo text into a value. Use for Arturo-formatted values, not as a JSON parser; `.data` is documented as unstable. | `parsed: parse "[1 2 3]"`             |
| `express` | Produce Arturo source text representing a value. Use for code/data rendering; `.pretty` formats it.                       | `text: express.pretty #[name: "Ada"]` |
| `discard` | Consume a result without leaving it on the stack. Use when only an operation's effects matter.                            | `discard to :integer "123"`           |
| `dup`     | Duplicate a stack value; alias `<=`. Use when assignment must retain a value for another consumer.                        | `a: b: dup 3`                         |
| `unstack` | Pop a requested number of values. Use only when explicitly managing stack results.                                        | `1 2 3 top: unstack 1`                |

## Core constants

| Name     | Purpose and when to use                                                                                                                                      | Example                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `any`    | Wildcard constant used by `case` for a default match. It is distinct from the `:any` argument type.                                                          | `case 9 [1 [print "one"] any [print "other"]]` |
| `null`   | Absence of a value. Use when a value is missing; condition functions and `coalesce` also treat it as false.                                                  | `value: null`                                  |
| `window` | Listed as a null constant in the official text reference and observed as `null` on this runtime. No portable window-management behavior is established here. | `inspect var 'window`                          |

The local-file `import` example is documentation-only; package installation and external-library calls were not exercised.

Do not treat metadata as proof of all runtime edge cases: the documented `case` return annotation, for example, is narrower than its own selected-value examples.
