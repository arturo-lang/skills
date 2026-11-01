---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/comparison
    - https://arturo-lang.io/llms.txt
---

# Comparison: function selection

Use for ordering, equality, and identity. `same?` is stricter than value equality. `between?` includes its endpoints. Confirm behavior for mixed types and custom objects instead of assuming another language’s coercion rules.

Query signatures with `inspect info.get 'between?`; see [inspection guidance](inspection.md) for metadata interpretation.

For unknown function names, use [the comparison module](https://arturo-lang.io/documentation/library/comparison). Query the selected built-in with `inspect info.get 'name`; use a bounded probe for behavior absent from metadata.
