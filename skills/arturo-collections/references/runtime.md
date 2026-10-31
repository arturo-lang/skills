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

### Arturo Introspection and Coding Conventions

- Introspection: Use `info.get` for symbol metadata, `inspect` for structure and types, and `info 'sort` for compact documentation. Built-in functions may expose limited details.
- Arguments: Read `args` positionally. Multiple types represent alternatives, while `attrs` defines optional flags or valued attributes.
- Return types: `returns` lists possible types; `:nothing` indicates no result.
- Semantics: Function arity determines argument boundaries. Expressions evaluate right to left, and infix operators do not guarantee conventional precedence.
- Control flow: `if` and `switch` are callable functions, not reserved syntax.
- Mutation: Literal arguments may enable in-place changes. Use `new` for independent copies; blocks do not automatically create scopes.
- Naming: Prefer `lowerCamelCase` and `_` prefixes for private helpers. Respect existing project conventions.
- Verification: Treat documentation as guidance, not definitive runtime proof. Test conflicting behavior with minimal examples.
- Testing: Run bounded offline `.art` examples using `ensure`, isolate filesystem changes in temporary directories, and report results and limitations.
