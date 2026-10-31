---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-30
  sources:
    - https://arturo-lang.io/documentation/language/#scope-and-rules
    - https://arturo-lang.io/documentation/library/strings/match/
    - https://arturo-lang.io/documentation/library/strings/escape/
---

# Collection patterns

## Choosing an iterator

| Intent                    | Arturo form                              |
| ------------------------- | ---------------------------------------- |
| Double every value        | `map [1 2 3] 'x [x * 2]`                 |
| Keep even values          | `select [1 2 3 4] 'x [even? x]`          |
| Remove even values        | `filter [1 2 3 4] 'x [even? x]`          |
| Sum with an initial value | `fold.seed: 0 [1 2 3] [acc x] [acc + x]` |
| Print values              | `loop [1 2 3] 'x [print x]`              |

### Arturo Iterators and Ranges

- Iterators: Support multiple parameters, index injection (`.with: 'i`), and specialized attributes. Verify signatures rather than assuming Python or JavaScript conventions.
- Ranges: `1..10` includes both endpoints. Many iterators accept ranges directly; use `array` or `@` when materialization is necessary.
- Blocks: `[]` stores values or code, while `@[...]` evaluates contained expressions.
- Strings: Use quoted strings instead of bare words for textual data.

### Iterator Scope and Empty Inputs

- Scope: Iterator arguments and indices temporarily shadow existing bindings, which are restored afterward. Other assignments persist.
- Empty collections: `map`, `select`, and `filter` return `[]`. Seeded `fold` returns its seed without executing the body.
- Immutability: Numeric transformations preserve the source collection. Mixed-type numeric operations fail rather than automatically parsing strings.
- Missing values: In Arturo 0.10.0, `first []` returns `null`, while `get` on a missing dictionary key raises an error.
- Safe access: Use `empty?` and `key?` to handle absent elements or keys.
- Filtering: `select` retains matching elements; `filter` removes them. Their predicate behavior is opposite.

### Dictionaries

- Dictionaries: Create with `#[key: value]`, access via paths or `get`, and use `key?` to distinguish missing keys from `null` values.
- Iteration: Use `loop` for key-value pairs, or `keys` and `values` separately. Do not assume dictionary ordering.
- Collections: `sort` returns a new result; `sort 'values` mutates. Use `unique`, `tally`, `size`, `first`, `last`, and `slice` with appropriate bounds checks.
- Correctness: Preserve indexing and grouping when porting algorithms. Parenthesize ambiguous calculations and verify results before simplifying expressions.

### Strings

- Splitting: Use `split` for characters, `.words` for words, and `.lines` for lines. Empty strings produce empty collections.
- Joining: Use `join` to combine strings and `.with:` for separators. Joining an empty collection returns `""`.
- Text operations: Use `strip`, `replace`, `match?`, and `match` according to the intended transformation or matching behavior.

### Unicode and Regex

- Unicode: `size` counts code points, not UTF-8 bytes or grapheme clusters. Precomposed and decomposed characters may differ in size and equality.
- Normalization: Splitting strings does not normalize Unicode. Grapheme-aware slicing and normalization require separate handling.
- Regex escaping: Literals like `{/\\d+/}` preserve backslashes. Quoted strings require an additional escaping layer, such as `to :regex "\\\\d+"`.
- Literal matching: Use `to :regex escape.regex needle` to prevent supplied text from being interpreted as regex syntax.
- Error handling: `match` returns `[]` for no matches. Invalid dynamic regex patterns raise errors and should be validated or caught.


## Reference

Testing reference that covers behavior and edge cases: https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/collections