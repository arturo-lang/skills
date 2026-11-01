---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/logic
    - https://arturo-lang.io/llms.txt
---

# Logic: function selection

Use for logical predicates and the three logical values `true`, `false`, and `maybe`. Functions ending in `?` differ from Bitwise names without it. Blocks and already-evaluated logical values have different evaluation consequences; verify short-circuit behavior for the chosen form.

Query signatures with `inspect info.get 'all?`; see [inspection guidance](inspection.md) for metadata interpretation.

For unknown function names, use [the logic module](https://arturo-lang.io/documentation/library/logic). Query the selected built-in with `inspect info.get 'name`; use a bounded probe for behavior absent from metadata.
