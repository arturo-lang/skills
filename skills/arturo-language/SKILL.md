---

name: arturo-language
description: Write, explain, or port Arturo (.art) code using its evaluation rules, values, functions, scope, and mutation semantics. Use for language-level implementation and syntax questions.
---

# Arturo language

## Task defaults

- Follow existing `.art` style and project instructions; these defaults fill gaps.
- Check `arturo --version` and `arturo --help` before relying on version-sensitive behavior. Read [language rules](references/language.md) for the constructs involved and [CLI verification](references/cli.md) for execution commands and their limits.
- Use the [official language guide](https://arturo-lang.io/documentation/language) for evaluation and syntax, and the [official reference](https://arturo-lang.io/llms.txt) for unfamiliar function arity, accepted types, attributes, and literal support. Do not translate another language's APIs by name.
- Ask the installed Arturo runtime for function signatures with `inspect info.get 'functionName`. Read [runtime inspection](references/inspection.md) to interpret the output. For Core function purposes, when to use them, and short examples, consult [Core functions](references/core.md).
- Prefer built-ins and bounded offline examples. Separate reusable functions from entry-point effects; verify loading and scope before splitting files.
- Write readable `.art` manually: separate statements onto lines, indent nested blocks consistently, and use `;` comments to explain surprising grouping or mutation. Use explicit function and iterator parameters before introducing shorthand.

## Naming defaults

Default to lower camelCase for variables, labels, functions, and object/type names (`:someObject`). Prefix private helpers with `_` (`_parseItem`); this does not enforce access control.

Preserve external field names and project/user conventions; `snake_case` is supported, especially for interoperability.

## Language essentials

Arturo code consists of values and callable words; there are no reserved keywords. `name:` assigns a value, `'name` denotes a literal identifier, `:integer` is a type, `.flag` is an attribute, and `.option: value` uses an attribute-label (`.option:`) to pass a value. Blocks are data until evaluated.

Expressions evaluate right to left; successive statements still execute in source order. Function arity determines argument boundaries. Use parentheses or intermediate bindings to make intended grouping explicit. Do not apply conventional arithmetic precedence.

Distinguish returned values from in-place operations. A supported literal argument such as `sort 'items` changes the binding; `sort items` returns a result. Use `new` when an independent copy is required. Functions have scope; ordinary evaluated blocks do not.

Control flow uses actual Core functions: `if`, `unless`, `switch`, `case`, `when`, and loops such as `while`. They are ordinary callable words with defined arity and argument types, not reserved language syntax; even `function` is a function. Use `if` or `unless` for a conditional action, `switch` for two alternatives, `case` for value matching, and `when` for condition chains. Read the [control-flow forms](references/language.md#functions-and-control-flow) before choosing or combining them.

Use `=` for equality; do not assume `==` or another language's `if/else` syntax. Review function bodies for unintended extra stack results. When porting code, verify grouping, scope, copying, and mutation independently of surface syntax.

## Verification defaults

Run the smallest relevant program, checking expected results and relevant empty or invalid inputs. For scope or mutation changes, assert both the returned value and the affected outer bindings or collections. Prefer `ensure [condition]` checks that fail on incorrect behavior over printed output alone.

[examples/basics.art](examples/basics.art) is an offline executable example covering grouping, function results, block and function scope, sorting, and independent copies. Run it with `arturo --no-color examples/basics.art` from this skill directory. Report checks and relevant limitations. If Arturo is unavailable, mark behavior unverified. If local behavior differs from the reference, isolate a minimal reproduction before recommending a form.

## References: load only the relevant module

- [Comparison](references/comparison-library.md).
- [Logic](references/logic-library.md).
- [Types](references/types-library.md).

Query the runtime as described in [inspection guidance](references/inspection.md).
