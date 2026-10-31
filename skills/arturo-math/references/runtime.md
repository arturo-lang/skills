---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/reflection/inspect
    - https://arturo-lang.io/documentation/library/reflection/info
    - https://arturo-lang.io/documentation/language
---

# Runtime signatures and evaluation

Check `arturo --version` / `--help`. Inspect metadata without invoking the target:

```sh
arturo --no-color -e "inspect info.get 'sort"
```

- `info.get` returns metadata; `inspect 'sort` shows a literal, while `inspect var 'sort` only shows a built-in marker on 0.10.0. `info 'sort` gives a compact display.
- `args`: positional order; each argument consumes one value, listed types are alternatives. `attrs`: flags (`.descending`) or labeled values (`.by: 'name`), not positional arguments. `returns`: possible types; `:nothing` means no result.
- Expressions group right to left; arity determines boundaries, including infix aliases. Blocks are data until evaluated; ordinary evaluated blocks do not imply scope.
- Supported literal/path-literal arguments permit mutation; value arguments return results. `sort` takes one collection; `sort samples` returns a sorted value. Use `new` for independent copies.
- Control flow is callable: `if` takes condition/action; `switch` takes condition/two blocks.
- Prefer lower camelCase (`:someObject`), `_` for private helpers; preserve existing/user conventions. Underscores mainly serve external formats.
- Resolve documentation/runtime conflicts with minimal reproducers. Use bounded offline `ensure [condition]` checks, temporary directories for disk effects, and project tooling; report limitations.
