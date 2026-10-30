---

name: arturo-collections
description: Implement Arturo collection and text transformations using Collections, Iterators, Strings, and Sets. Use for blocks, dictionaries, ranges, data pipelines, sorting, regex matching, text processing, and set operations.
---

# Arturo collections

Read [collection patterns](references/collections.md), especially before choosing between `select` and `filter`. Confirm signatures in the [official reference](https://arturo-lang.io/llms.txt) for the collection type being processed.

Choose the operation by its result: `map` transforms, `select` retains matches, `filter` removes matches, `fold` accumulates, and `loop` performs effects. Arturo's `filter` is easy to confuse with other languages' keep-matching operation.

Decide whether the input may change. Return a transformed value for ordinary pipelines; use supported literal-argument forms only for intentional mutation. Use `new` when preserving an independent copy matters. Parenthesize conversions or intermediate calculations where right-to-left evaluation would change the transformation.

Check empty input, a single element, duplicates, absent dictionary keys, and element types relevant to the request. Give folds an explicit seed when the empty-input result matters. Keep iterator variables separate from accumulated output.

[examples/collections.art](examples/collections.art) demonstrates bounded offline checks. For specialized operations, consult Collections, Iterators, Strings, Sets, Numbers, or Statistics in the official reference instead of implementing an assumed API.

## Standard-library selection guides

- [Collections](references/collections-library.md): 46 functions, predicates, or constants.
- [Iterators](references/iterators-library.md): 15 functions, predicates, or constants.
- [Sets](references/sets-library.md): 8 functions, predicates, or constants.
- [Strings](references/strings-library.md): 26 functions, predicates, or constants.

Ask Arturo for signatures with `inspect info.get 'functionName`; see [runtime inspection and defaults](references/runtime.md) before reading argument types, attributes, and results.
