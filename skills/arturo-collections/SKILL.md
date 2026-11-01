---
name: arturo-collections
description: "Transform Arturo collections and text: blocks, dictionaries, iterators, sets, sorting, regex, Recase case conversion, and Unidecode transliteration."
metadata:
  arturo-version: 0.10.0
---

# Arturo collections and text

`map` transforms, `select` retains matches, `filter` removes matches, `fold` accumulates, and `loop` performs effects. Iterator arguments are temporary bindings; other assignments can persist. Literal arguments mutate only where supported; use `new` for independent copies.

For an uncertain built-in, use `inspect info.get 'name`; inspect positional `args`, optional `attrs`, and `returns`, then probe relevant behavior. For unknown names, use the official module links in the relevant guide. [Runtime detail](references/runtime.md) is for metadata/evaluation uncertainty, not a prerequisite read.

Load only the needed guide: [collections](references/collections-library.md) for access/copying, [iterators](references/iterators-library.md) for scope/empty inputs, [strings](references/strings-library.md) for Unicode/regex/interpolation, or [sets](references/sets-library.md) for duplicate/order behavior. [Offline assertions](examples/collections.art) cover these pitfalls.

For external packages, load [Recase](references/recase.md) for identifier case conversion or [Unidecode](references/unidecode.md) for transliteration. Imports may download and evaluate code; neither operation guarantees unique identifiers.
