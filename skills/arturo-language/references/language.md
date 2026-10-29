# Evaluation, values, and scope

## Expressions

`print add 2 3` calls `add` with two inputs, then prints the result. Infix symbols alias functions. `2 * 3 + 4` means `2 * (3 + 4)` and yields 14; `(2 * 3) + 4` yields 10. Parenthesize a conversion before concatenation: `(to :string 3) ++ " items"`.

Square brackets preserve code/data without evaluation. `@[expression ...]` evaluates a block into an array; `#[key: value ...]` creates a dictionary. Parentheses evaluate inline. A block containing words does not automatically resolve them into values.

`;` introduces a line comment. Strings use double quotes; brace strings are useful for embedded JSON. Paths use backslashes, such as `person\name`; path labels assign members, such as `person\name: "Ada"`.

## Functions and control flow

Define `double: function [x][x * 2]`, then call `double 4`. `$` aliases `function`. A function can leave its result on the stack or use `return`; avoid unintended extra results. Parameter blocks can include types, e.g. `[x :integer]`.

`if condition [body]` executes one branch. `switch condition [true-body] [false-body]` supplies both branches. `while [condition] [body]` reevaluates the condition. `->` wraps one following terminal expression into a block, not an arbitrary sequence of statements. Prefer explicit blocks for multi-step bodies.

`map collection 'item [expression]` and `loop collection 'item [body]` bind iterator variables temporarily. `=>` offers anonymous-parameter shorthand; consult the reference before changing a named-parameter form into shorthand. A pipe passes an expression's result into a subsequent call; it is not a shell pipe.

## Scope and mutation

- An evaluated ordinary block shares its surrounding scope. Bindings created or reassigned there persist.
- Iterator-injected names are temporary; previous values are restored afterward. Other bindings follow ordinary block behavior.
- Functions can read outer bindings, but local assignments do not normally persist outside. `.export: [names]` exports selected symbols; `.inline` removes the function's normal isolation. `.import: [names]` embeds selected current bindings, useful when constructing functions for later calls.
- Passing a literal identifier enables mutation only for functions whose signature supports it. Do not infer literal support for every function.
- Values can share storage. `b: a` is not a promise of an independent copy; `b: new a` expresses that intent. Also inspect direct collection updates via `set` when tracing shared changes.

Logical values include `true`, `false`, and `maybe`. Equality is `=`; `==` is not its standard alias. Use `to :integer text` for conversion and check invalid input instead of assuming parsing succeeds.

## Sources

- [Official reference](https://arturo-lang.io/llms.txt): Precedence and Evaluation; Scope and rules; In-place variable modification; Core/function; Core/new; Types/to.
- [Function definition example](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Function%20definition.art).
- [Function composition example](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Function%20composition.art).
