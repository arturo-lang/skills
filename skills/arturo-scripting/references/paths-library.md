---
metadata:
  arturo-version: "0.10.0"
  review-date: "2026-10-29"
  sources:
    - https://arturo-lang.io/documentation/library/paths
    - https://arturo-lang.io/llms.txt
---

# Paths: function selection

Use for path resolution, components, listing, and normalization. `absolute` and `relative` refer to the script’s location as documented; test from a different working directory before assuming resolution behavior. `extract` also supports URLs and colors through attributes. Keep platform-specific separators and home expansion explicit.

Query signatures with `inspect info.get 'absolute`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                      | Purpose / when to use                                              | Example                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------- |
| [absolute](https://arturo-lang.io/documentation/library/paths/absolute)   | Obtain absolute path for path, based on current script's location. | `absolute "input.txt"`                |
| [absolute?](https://arturo-lang.io/documentation/library/paths/absolute-) | Test whether path is an absolute path.                             | `absolute? "/usr/bin"`                |
| [extract](https://arturo-lang.io/documentation/library/paths/extract)     | Extract components from path, url, or color.                       | `extract.extension "folder/file.art"` |
| [list](https://arturo-lang.io/documentation/library/paths/list)           | Obtain files in path.                                              | `list "."`                            |
| [normalize](https://arturo-lang.io/documentation/library/paths/normalize) | Obtain normalized version of path.                                 | `normalize "one/../two"`              |
| [relative](https://arturo-lang.io/documentation/library/paths/relative)   | Obtain relative path for path, based on current script's location. | `relative "helpers.art"`              |
