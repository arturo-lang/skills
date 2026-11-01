---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/reflection/inspect
    - https://arturo-lang.io/documentation/library/reflection/info
    - https://arturo-lang.io/documentation/language
---

# Runtime discovery

Use `arturo --version` once per environment; consult `--help` for uncertain CLI options. Query without invoking the target:

```sh
arturo --no-color -e "inspect info.get 'sort"
```

`args` is positional; listed types are alternatives. `attrs` are optional flags/values, not extra positional arguments. `returns` lists possible types; `:nothing` means no result. `inspect 'sort` inspects a literal, not the function; `info 'sort` is a compact alternative. Metadata examples/source links can lag the installed runtime.

Arity and right-to-left grouping determine expression boundaries. Ordinary evaluated blocks share scope; functions normally isolate assignments. Literal/path-literal mutation is supported only by particular functions; direct updates can change shared storage. Use `new` for an independent copy.

Run a small bounded probe for uncertain scope, evaluation, mutation, or edge behavior. Reuse established signatures; avoid reading all references or dumping all symbols. For unknown names, search the relevant official module linked from the task guide. Without Arturo, report behavior as unverified.
