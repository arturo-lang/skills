---
name: arturo-collections
description: Implement Arturo collection and text transformations using Collections, Iterators, Strings, and Sets. Use for blocks, dictionaries, ranges, data pipelines, sorting, regex matching, text processing, set operations, Recase case conversion, Unidecode transliteration.
metadata:
  arturo-version: 0.10.0
---

### Arturo Collection

- Operations: 
  - Use `map` to transform
  - `select` to retain matches
  - `filter` to remove matches
  - `fold` to accumulate
  - `loop` for side effects
- Mutation: Prefer returning transformed values. Mutate only intentionally using supported literal arguments; use `new` for independent copies.
- Evaluation: Parenthesize conversions and calculations when right-to-left evaluation affects results.
- Edge cases: Test empty and single-element collections, duplicates, missing keys, and relevant element types. Seed folds explicitly when necessary.
- Validation: Use [examples/collections.art](examples/collections.art) for offline tests. Consult official documentation for specialized operations rather than assuming APIs exist.

## Module references

- [Collections](references/collections-library.md).
- [Iterators](references/iterators-library.md).
- [Sets](references/sets-library.md).
- [Strings](references/strings-library.md).

Query signatures with `inspect info.get 'functionName`; see [runtime guidance](references/runtime.md) when interpreting metadata.

## External text and data packages

- [Recase](references/recase.md): naming and case conversion.
- [Unidecode](references/unidecode.md): ASCII transliteration.
