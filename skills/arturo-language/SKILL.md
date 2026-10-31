---
name: arturo-language
description: Write, explain, or port Arturo (.art) code using its evaluation rules, values, functions, scope, and mutation semantics. Use for language-level implementation, syntax questions, typed attribute DSLs with optionally, States machines, and experimental ArtSembly bytecode.
metadata:
  arturo-version: 0.10.0
---

# Arturo language

## Essential rules

Arturo has values and callable words, not reserved keywords. `name:` assigns, `'name` is a literal identifier, `:integer` is a type, `.flag` is an attribute, and `.option: value` passes an attribute value. `[...]` holds unevaluated data or code; `#[...]` creates a dictionary. `#red` and hexadecimal color literals are colors.

Expressions evaluate right to left; statements execute in source order. Arity determines argument boundaries. Use parentheses or intermediate bindings instead of assuming arithmetic precedence. Equality is `=`.

Supported literal arguments enable mutation: `sort 'items` changes the binding; `sort items` returns a result. Use `new` for independent copies. Functions have scope; ordinary evaluated blocks do not. Check function bodies for unintended extra stack results.

Read [evaluation, functions, control flow, scope, and copying](references/language.md) for the constructs involved. Use `if`/`unless` for conditional actions, `switch` for two alternatives, `case` for value matching, and `when` for condition chains; these are callable words with defined arity.

Annotate parameters when types define the contract. Use `ensure`, optionally `.that:` for a message, before dependent operations; types do not replace field, range, or resource checks.

## Find the relevant detail

- [Runtime inspection and CLI verification](references/inspection.md): check installed version/options and interpret `inspect info.get 'functionName` without invoking the target.
- [Core APIs](references/core.md), [Comparison](references/comparison-library.md), [Logic](references/logic-library.md), [Types](references/types-library.md): function selection and examples.
- [Symbols](references/symbols.md): preferred aliases `$`, `./`, `??`, `?`, `->`, `@`, `#`; positions and lookalikes.
- [Project organization](references/projects.md): multi-file loading, scope, reusable functions, and entry-point effects.
- [optionally](references/optionally.md): typed function attributes and DSL interfaces; operands remain positional; returns a body block, not a parser or closure mechanism.
- [States](references/states.md): initial states, event transitions, and mutable state inspection.
- [ArtSembly](references/artsembly.md): experimental bytecode, labels, jumps, and VM compatibility.

For unfamiliar APIs, consult the [official reference](https://arturo-lang.io/llms.txt) and [language guide](https://arturo-lang.io/documentation/language); do not infer APIs from other languages. Package imports may download and evaluate code.

## Conventions and verification

Default to lowerCamelCase, including object/type names (`:someObject`); `_` marks private helpers without enforcing access control. Preserve project conventions and external field names. Format Arturo manually with consistent indentation, separate statements, and `;` comments for surprising semantics. Start with explicit function/iterator parameters.

Prefer built-ins and bounded offline checks using `ensure`. Assert returned values and affected bindings for scope/mutation changes, including relevant empty/invalid inputs. Run `arturo --no-color examples/basics.art` from this skill directory. Report results and limitations; mark behavior unverified without Arturo and isolate reference/runtime discrepancies with a minimal reproducer.
