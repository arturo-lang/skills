---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/reflection/inspect
    - https://arturo-lang.io/documentation/library/reflection/info
    - https://arturo-lang.io/documentation/language
---

# Runtime signatures and Arturo defaults

Check `arturo --version` and `arturo --help`. Query a signature without invoking the target:

```sh
arturo --no-color -e "inspect info.get 'sort"
```

- Metadata: Use `info.get` for signatures, arguments, attributes, and return types. Use `inspect` for structure and `info` for compact documentation.
- Arguments: Read `args` positionally. Multiple types are alternatives; attributes are optional and do not consume positional arguments.
- Compatibility: Compare installed behavior with the [official reference](https://arturo-lang.io/llms.txt). When they disagree, preserve a minimal reproduction and describe the observed version-specific behavior.
- Semantics: Expressions group right to left, and function arity determines argument boundaries. Infix aliases do not guarantee mathematical precedence.
- Control flow: `if` and `switch` are callable functions, not reserved syntax.
- Mutation: Literal arguments may mutate values; ordinary blocks return results. Use `new` for independent copies.
- Naming: Prefer `lowerCamelCase`, prefix private helpers with `_`, and respect existing project conventions.
- Filesystem diagnostics: Use temporary directories for filesystem operations.
