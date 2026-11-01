---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/paths
    - https://arturo-lang.io/llms.txt
---

# Paths: function selection

Use for path resolution, components, listing, and normalization. `absolute` and `relative` refer to the script’s location as documented; test from a different working directory before assuming resolution behavior. `extract` also supports URLs and colors through attributes. Keep platform-specific separators and home expansion explicit.

Query signatures with `inspect info.get 'absolute`; see [runtime inspection](runtime.md) for metadata interpretation.

For unknown function names, use [the paths module](https://arturo-lang.io/documentation/library/paths). Query the selected built-in with `inspect info.get 'name`; use a bounded probe for behavior absent from metadata.
