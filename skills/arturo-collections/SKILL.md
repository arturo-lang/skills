---
name: arturo-collections
description: Implement Arturo collection and text transformations using Collections, Iterators, Strings, and Sets. Use for blocks, dictionaries, ranges, data pipelines, sorting, regex matching, text processing, set operations, Recase case conversion, Unidecode transliteration, and RSV data.
metadata:
  arturo-version: "0.10.0"
---

# Arturo collections

For iterator, dictionary, or text recipes, read [collection patterns](references/collections.md). Confirm signatures in the [official reference](https://arturo-lang.io/llms.txt) for the collection type being processed.

Choose the operation by its result: `map` transforms, `select` retains matches, `filter` removes matches, `fold` accumulates, and `loop` performs effects.

Decide whether the input may change. Return a transformed value for ordinary pipelines; use supported literal-argument forms only for intentional mutation. Use `new` when preserving an independent copy matters. Parenthesize conversions or intermediate calculations where right-to-left evaluation would change the transformation.

Check empty input, a single element, duplicates, absent dictionary keys, and element types relevant to the request. Give folds an explicit seed when the empty-input result matters. Keep iterator variables separate from accumulated output.

[examples/collections.art](examples/collections.art) demonstrates bounded offline checks. For specialized operations, consult Collections, Iterators, Strings, Sets, Numbers, or Statistics in the official reference instead of implementing an assumed API.

## Module references

- [Collections](references/collections-library.md).
- [Iterators](references/iterators-library.md).
- [Sets](references/sets-library.md).
- [Strings](references/strings-library.md).

Query signatures with `inspect info.get 'functionName`; see [runtime guidance](references/runtime.md) when interpreting metadata.

## External text and data packages

- [Recase](references/recase.md): naming and case conversion.
- [Unidecode](references/unidecode.md): ASCII transliteration.
- [RSV](references/rsv.md): binary row data encoding and decoding.

Read only the package needed; imports can download and evaluate code.
