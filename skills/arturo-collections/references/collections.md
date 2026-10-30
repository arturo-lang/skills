# Collection patterns

## Choosing an iterator

| Intent                    | Arturo form                              |
| ------------------------- | ---------------------------------------- |
| Double every value        | `map [1 2 3] 'x [x * 2]`                 |
| Keep even values          | `select [1 2 3 4] 'x [even? x]`          |
| Remove even values        | `filter [1 2 3 4] 'x [even? x]`          |
| Sum with an initial value | `fold.seed: 0 [1 2 3] [acc x] [acc + x]` |
| Print values              | `loop [1 2 3] 'x [print x]`              |

Some iterators support multiple parameters, index injection with `.with: 'i`, and specialized attributes. Verify those signatures rather than assuming the parameter order used by JavaScript or Python.

Ranges use `1..10` and include endpoints. Many iterators accept ranges directly; materialize them with `array` / `@` only when a block is needed. `[]` stores values/code; `@[...]` evaluates contained expressions. Use explicit string values instead of bare words when representing textual data.

## Iterator scope and empty inputs

Iterator arguments and injected indices temporarily shadow existing bindings, then restore them. Other assignments in the body persist. For example, `loop [2 3] 'item [total: total + item]` can accumulate into an existing `total`, while an outer `item` retains its previous value. Use distinct names when that distinction would obscure intent.

`map`, `select`, and `filter` return `[]` for empty blocks. A seeded fold returns its seed without calling the body. `first []` returns `null` on the verified runtime; an absent dictionary key accessed with `get` raises an error. Check `empty?` or `key?` before access when absence needs a separate outcome. Do not substitute `filter` for `select`: their predicates have opposite retention behavior.

## Dictionaries and strings

Construct a dictionary with `#[name: "Ada" count: 2]`. Access members with paths such as `record\name` or `get record 'name`. Check `key? record 'name` when absence is meaningful. `loop record [key value] [body]` iterates pairs; `keys record` and `values record` expose each side. Avoid depending on an ordering unless the operation establishes one.

`split "abc"` splits into character strings; `split.words "a b"` splits words. `split.lines text` is useful for line processing. Confirm delimiter-specific attributes in Collections/split. `join parts` combines strings; verify `.with:` for separators. `strip`, `replace`, `match?`, and `match` address different text operations; regex syntax is not interchangeable with ordinary string syntax.

`sort values` returns a sorted result; `sort 'values` intentionally changes the variable. `unique`, `tally`, `size`, `first`, `last`, and `slice` cover common operations. Check bounds and empty input before assuming an element exists.

When porting an algorithm, preserve its indexing and grouping explicitly. Parentheses are especially useful in calculations embedded in iterator bodies. Do not optimize into compact anonymous syntax until output matches a small worked example.

## Unicode and regex patterns

Text size counts Unicode code points, not UTF-8 bytes or user-perceived characters: `size "é猫"` is `2`, while `size to :binary "é猫"` is `5`. Precomposed `"é"` and decomposed `"é"` have sizes `1` and `2` and compare unequal. Splitting text into characters does not normalize it. Grapheme-aware slicing and normalization remain outside these recipes.

A regex literal preserves its backslashes: `{/\d+/}` matches digits. Constructing the same regex from a quoted string requires `to :regex "\\d+"`, because the string parser consumes one escaping layer. Do not add that extra layer inside the regex literal.

When a pattern must treat supplied text literally, construct it with `to :regex escape.regex needle`. For `needle: "a.b"`, this matches `"a.b"` but not `"axb"`; the unescaped `{/a.b/}` matches both. `match` returns `[]` when nothing matches. Invalid dynamic patterns such as `to :regex "["` raise an error; catch or reject them at the input boundary.

## Verification

[The runnable checks](../examples/collections.art) assert retained versus removed values, seeded and empty iteration, restored iterator bindings, persistent body assignments, absent-key failure, Unicode code points versus bytes, and literal versus escaped dynamic regexes. Run `arturo --no-color examples/collections.art` from this skill directory; success prints `collections ok`. Verified offline on Arturo 0.10.0 Arizona Bark, amd64/Linux, 2026-10-30. These assertions do not establish locale-specific case behavior, grapheme segmentation, or arbitrary regex compatibility.

## Sources

- [Official reference](https://arturo-lang.io/llms.txt): Collections; Iterators/select, filter, map, fold, loop; Strings.
- [Filter task implemented with select](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Filter.art).
- [Dictionary iteration](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Associative%20array%252FIteration.art).

Reviewed 2026-10-30: [language scope rules](https://arturo-lang.io/documentation/language/#scope-and-rules), [match](https://arturo-lang.io/documentation/library/strings/match/), and [escape](https://arturo-lang.io/documentation/library/strings/escape/). Adapted and condensed from documentation by Yanis Zafirópulos and the Arturo project, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); examples and boundary checks are original additions.
