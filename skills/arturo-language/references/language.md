# Evaluation, values, and scope

## Expressions

Use the [symbol reference](symbols.md) to look up the official aliases and their prefix/infix positions.

`print add 2 3` calls `add` with two inputs, then prints the result. Infix symbols alias functions. `2 * 3 + 4` means `2 * (3 + 4)` and yields 14; `(2 * 3) + 4` yields 10. Parenthesize a conversion before concatenation: `(to :string 3) ++ " items"`.

Square brackets preserve code/data without evaluation. `@[expression ...]` evaluates a block into an array; `#[key: value ...]` creates a dictionary. Parentheses evaluate inline. A block containing words does not automatically resolve them into values.

`;` introduces a line comment. Strings use double quotes; brace strings are useful for embedded JSON. Paths use backslashes, such as `person\name`; path labels assign members, such as `person\name: "Ada"`.

Arity also determines where a call ends: `add` requires two arguments; `do [add 1]` fails rather than inventing a second argument. Typed function parameters reject incompatible values; they do not implicitly parse strings. The [executable checks](../examples/basics.art) contrast successful calls with these failures.

## Functions and control flow

Define `double: $[x :integer] -> x * 2`, then call `double 4`. Prefer `$`, the alias for `function`. A function can leave its result on the stack or use `return`; avoid unintended extra results. Parameter blocks can include types, e.g. `[x :integer]`.

A final `return` does not erase earlier unconsumed results. For example:

```arturo
extraResult: function [x][
    x + 1
    return x * 2
]
ensure [@[extraResult 3] = [4 6]]
oneResult: function [x][
    intermediate: x + 1
    return intermediate * 2
]
ensure [@[oneResult 3] = [8]]
```

Use bindings for intermediate computations when the caller expects one result. `@[...]` collects all results, so it can reveal an accidental extra value that a single assignment or print might miss.

Control-flow words are actual [Core functions](https://arturo-lang.io/documentation/library/core), not reserved syntax. Their arity determines which values are arguments; action blocks are values supplied to those functions. They can be rebound like other words, so check local definitions when behavior differs from the standard library.

| Function form                         | Behavior                                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `if condition [body]`                 | Runs the body when the condition is neither `false` nor `null`.                                      |
| `unless condition [body]`             | Runs the body when the condition is `false` or `null`.                                               |
| `condition ? [action] [alternative]`  | Chooses the first block when the condition is neither `false` nor `null`, otherwise the second.      |
| `case value [candidate [action] ...]` | Matches a value against candidates; `any` provides a fallback. A dictionary can also supply matches. |
| `when [condition [action] ...]`       | Runs the first matching action; `.any` checks all conditions.                                        |
| `while [condition] [body]`            | Reevaluates the condition block for each iteration.                                                  |

`if` and `unless` return nothing; do not use them as two-way value selectors. `?` (`switch`) can supply a selected result. The outer blocks passed to `case` and `when` are evaluated; use blocks for action bodies and deferred conditions rather than assuming every expression is lazy. In `when`, `[condition]` defers that condition until needed; a final `true [body]` supplies a fallback.

Prefer `->` for a single-expression action or assertion: `ensure -> count >= 0`. It wraps one following terminal expression into a block, not an arbitrary sequence of statements. Keep explicit blocks for multi-step bodies. Use parameter annotations such as `[count :integer]` for a concrete function contract, then `ensure` for range and state invariants before effects.

Prefer `value ?? fallback` for `coalesce`; it substitutes for both `null` and `false`. Both arguments are evaluated, so use `condition ? [action] [alternative]` when only the selected branch should run. `@[...]` evaluates its contents; `[...]` preserves data/code. `#[...]` constructs a dictionary, while `#red` and hexadecimal color literals denote colors. These aliases do not change evaluation, scope, or mutation rules.

`map collection 'item [expression]` and `loop collection 'item [body]` bind iterator variables temporarily. `=>` offers anonymous-parameter shorthand; consult the reference before changing a named-parameter form into shorthand. A pipe passes an expression's result into a subsequent call; it is not a shell pipe.

## Scope and mutation

- An evaluated ordinary block shares its surrounding scope. Bindings created or reassigned there persist.
- Iterator-injected names are temporary; previous values are restored afterward. Other bindings follow ordinary block behavior.
- Functions can read outer bindings, but local assignments do not normally persist outside. `.export: [names]` exports selected symbols; `.inline` removes the function's normal isolation. `.import: [names]` embeds selected current bindings, useful when constructing functions for later calls.
- Passing a literal identifier enables mutation only for functions whose signature supports it. Do not infer literal support for every function.
- Values can share storage. `b: a` is not a promise of an independent copy; `b: new a` expresses that intent. Also inspect direct collection updates via `set` when tracing shared changes.

### Contrasting scope and shared data

The executable checks accumulate `total` in a loop while restoring an existing `item` binding afterward. A previously undefined iterator argument disappears after the loop. An empty collection leaves both outer bindings unchanged. This differs from ordinary function assignment, whose local reassignment is restored on return.

Function isolation does not protect a shared collection from `set`:

```arturo
nested: [[1 2] [3]]
shared: nested
set shared\0 0 9
ensure [nested = [[9 2] [3]]]
independent: new nested
set independent\0 0 7
ensure [nested = [[9 2] [3]]]
changeFirst: function [items][set items\0 0 42]
changeFirst nested
ensure [nested = [[42 2] [3]]]
ensure [independent = [[7 2] [3]]]
```

The runnable example also adapts this helper into `changedFirst items value`: clone with `new`, reject an empty outer or first inner block, set the cloned element, and return the clone. Its assertions check the returned nested value, unchanged caller input, and rejected `[]`/`[[]]` inputs. Bind the clone before updating it so a helper intended to return data does not accidentally mutate its caller.

These checks establish independent copying for nested blocks; they do not establish cloning behavior for resources such as databases or sockets, or every custom object.

Logical values include `true`, `false`, and `maybe`. Equality is `=`; `==` is not its standard alias. Use `to :integer text` for conversion and check invalid input instead of assuming parsing succeeds.

## Sources

Reviewed 2026-10-30 against the [official language guide](https://arturo-lang.io/documentation/language#important-concepts), [Core/function](https://arturo-lang.io/documentation/library/core/function/), and [Core/return](https://arturo-lang.io/documentation/library/core/return/). Guidance condenses and adapts documentation by Yanis Zafirópulos and the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); changes include contrasting examples and explanations of observed stack and mutation behavior.

Verification: `arturo --no-color examples/basics.art` from this skill directory passes on Arturo 0.10.0 Arizona Bark, amd64/Linux, printing `language ok`. It asserts results, rejected calls, iterator restoration including empty input, function assignment isolation and local-name visibility, and shared versus independent nested block mutation including empty-input rejection. Export/inline/import variants and exceptional iterator unwinding are not covered by these checks.

- [Official Core reference](https://arturo-lang.io/documentation/library/core): case, when, if, unless, switch, while, and function; also available in the official text reference below.
- [Official reference](https://arturo-lang.io/llms.txt): Precedence and Evaluation; Scope and rules; In-place variable modification; Core/function; Core/new; Types/to.
- [Function definition example](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Function%20definition.art).
- [Function composition example](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Function%20composition.art).

Upstream tests: [copying](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/core/new.test.art); [nested mutation](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/collections/set.test.art); [iteration](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/iterators/loop.test.art).

Symbol forms and fail-fast contracts reviewed and asserted on Arturo 0.10.0 Linux amd64, 2026-10-30, in [basics.art](../examples/basics.art). Source: official text reference entries for function, relative, coalesce, switch, array, dictionary, and ensure; `->` is terminal-expression block syntax.
