---
name: arturo-language
description: "Write, explain, or port Arturo syntax, evaluation, functions, scope, mutation, and custom types; use optionally, States, or ArtSembly for language-oriented DSLs."
metadata:
  arturo-version: 0.10.0
---

# Arturo language

Expressions group right to left; arity determines boundaries, not arithmetic precedence. `name:` binds, `'name` is literal, `:integer` is a type, `.flag` and `.option: value` are call attributes. `[...]` preserves code/data; `@[...]` evaluates it; `#[...]` constructs a dictionary. Equality is `=`.

Ordinary evaluated blocks share scope; functions normally isolate assignments. A supported literal argument enables mutation; `set` can change shared storage even inside functions. Use `new` for independent copies. Functions may leave several stack results: bind intermediates when returning one value.

For an uncertain built-in, query `arturo --no-color -e "inspect info.get 'name"`; read positional `args`, optional `attrs`, and possible `returns`. For an unknown name, search the relevant official module below. Run a small probe for semantics metadata cannot establish; reuse established results. Without Arturo, mark execution unverified.

Load only the detail needed:

- [Evaluation and scope](references/language.md): control flow, typing, stack results, copying, iterator bindings.
- [Inspection](references/inspection.md): metadata interpretation or CLI uncertainty.
- [Core](references/core.md), [Comparison](references/comparison-library.md), [Logic](references/logic-library.md), [Types](references/types-library.md): module discovery and caveats.
- [Symbols](references/symbols.md): aliases and lookalikes; [projects](references/projects.md): local loading, parser visibility, namespaces.
- [optionally](references/optionally.md): typed attributes; [States](references/states.md): state machines; [ArtSembly](references/artsembly.md): experimental bytecode. These are external packages, not built-ins.

Prefer `$` for functions and type parameters when they express the contract; preserve polymorphism and project style. Default to lowerCamelCase and readable indentation. Use [basics.art](examples/basics.art) for bounded semantic checks. An ordinary local import does not require package-management guidance; imports evaluate code and may acquire missing packages.
