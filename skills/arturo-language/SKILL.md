---
name: arturo-language
description: Write, explain, or port Arturo (.art) code using its evaluation rules, values, functions, scope, and mutation semantics. Use for language-level implementation, syntax questions, typed attribute DSLs with optionally, States machines, and experimental ArtSembly bytecode.
---

# Arturo language

Examples: [official repository](https://github.com/arturo-lang/examples).

## Task defaults

- Check `arturo --version` and `arturo --help` before relying on version-sensitive behavior. Read [language rules](references/language.md) for the constructs involved and [CLI verification](references/cli.md) for execution commands and their limits.
- Use the [official language guide](https://arturo-lang.io/documentation/language) for evaluation and syntax, and the [official reference](https://arturo-lang.io/llms.txt) for unfamiliar function arity, accepted types, attributes, and literal support. Do not translate another language's APIs by name.
- Query runtime signatures with `inspect info.get 'functionName`. Read [runtime inspection](references/inspection.md) to interpret the output. Use [Core functions](references/core.md) for Core APIs and examples.
- Prefer built-ins and bounded offline examples. For multi-file programs, read [project organization](references/projects.md) and separate reusable functions from entry-point effects; verify loading and scope before splitting files.
- Prefer symbolic aliases: `$` (`function`), `./` (`relative`), `??` (`coalesce`), `?` (`switch`), `->` (single-expression block), `@` (`array`), `#` (`dictionary`). Check position and lookalikes in the [symbol reference](references/symbols.md).
- Use `#[...]` for dictionaries and `[...]` for bodies or unevaluated data. `#red` and hexadecimal color literals are colors.
- Annotate parameters when their types define the function contract. Use `ensure`, optionally with `.that:` for a message, to reject invalid state before dependent operations or effects. Type annotations do not replace field, range, or resource checks.
- Write readable `.art` manually: separate statements onto lines, indent nested blocks consistently, and use `;` comments to explain surprising grouping or mutation. Use explicit function and iterator parameters before introducing shorthand.

## Naming defaults

Default to lower camelCase for variables, labels, functions, and object/type names (`:someObject`). Prefix private helpers with `_` (`_parseItem`); this does not enforce access control.

Preserve external field names and project/user conventions; `snake_case` is supported, especially for interoperability.

## Language essentials

Arturo code consists of values and callable words; there are no reserved keywords. `name:` assigns a value, `'name` denotes a literal identifier, `:integer` is a type, `.flag` is an attribute, and `.option: value` uses an attribute-label (`.option:`) to pass a value. Blocks are data until evaluated.

Expressions evaluate right to left; successive statements still execute in source order. Function arity determines argument boundaries. Use parentheses or intermediate bindings to make intended grouping explicit. Do not apply conventional arithmetic precedence.

Distinguish returned values from in-place operations. A supported literal argument such as `sort 'items` changes the binding; `sort items` returns a result. Use `new` when an independent copy is required. Functions have scope; ordinary evaluated blocks do not.

Control flow (`if`, `unless`, `switch`, `case`, `when`, `while`) and `function` are callable Core words with defined arity and types. Use `if` or `unless` for a conditional action, `switch` for two alternatives, `case` for value matching, and `when` for condition chains.

Read the [control-flow forms](references/language.md#functions-and-control-flow) before choosing or combining them.

Use `=` for equality; do not assume `==` or another language's `if/else` syntax. Review function bodies for unintended extra stack results. When porting code, verify grouping, scope, copying, and mutation independently of surface syntax.

## Function attributes, DSLs, and VM packages

- [optionally](references/optionally.md): build typed function attributes and DSL command interfaces using generated attribute bindings. Required operands remain positional; the package returns a function body block and is not a standalone DSL parser or closure mechanism.
- [States](references/states.md): model finite state machines with explicit initial states, event transitions, and mutable current-state inspection.
- [ArtSembly](references/artsembly.md): explore experimental VM bytecode assembly, stack operations, labels, and jumps. Check compatibility with the installed VM before execution.

Read the relevant package guide for evaluation rules and documented releases. Package imports may download and evaluate code.

## Verification defaults

Run the smallest relevant program, checking expected results and relevant empty or invalid inputs. For scope or mutation changes, assert both the returned value and the affected outer bindings or collections. Prefer `ensure [condition]` checks that fail on incorrect behavior over printed output alone.

Run `arturo --no-color examples/basics.art` from this skill directory for offline assertions of evaluation, scope, copying, and mutation.

Report checks and relevant limitations. If Arturo is unavailable, mark behavior unverified. If local behavior differs from the reference, isolate a minimal reproduction before recommending a form.

## Module references

- [Comparison](references/comparison-library.md).
- [Logic](references/logic-library.md).
- [Types](references/types-library.md).
