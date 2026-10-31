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

`map`, `select`, and `filter` return `[]` for empty blocks. A seeded fold returns its seed without calling the body; the executable check uses seed `17` and a body that would throw if evaluated.

Numeric transforms leave the source block unchanged; a mixed-type numeric map fails rather than parsing its string element. On Arturo 0.10.0, `first []` returns `null`; an absent dictionary key accessed with `get` raises an error.

Check `empty?` or `key?` before access when absence needs a separate outcome. Do not substitute `filter` for `select`: their predicates have opposite retention behavior.

## Dictionaries and strings

Construct a dictionary with `#[name: "Ada" count: 2]`. Access members with paths such as `record\name` or `get record 'name`. Check `key? record 'name` when absence is meaningful. `loop record [key value] [body]` iterates pairs; `keys record` and `values record` expose each side.

Avoid depending on an ordering unless the operation establishes one. The worked dictionary loop sums counts without changing the source dictionary; an empty dictionary runs no body. A present key holding `null` still satisfies `key?`, unlike an absent key.

`split "abc"` splits into character strings; `split.words "a b"` splits words. `split.lines text` is useful for line processing. Both `split ""` and `split.words ""` return `[]`; `join.with: "," []` returns `""`. Confirm delimiter-specific attributes in Collections/split.

`join parts` combines strings; verify `.with:` for separators. `strip`, `replace`, `match?`, and `match` address different text operations; regex syntax is not interchangeable with ordinary string syntax.

`sort values` returns a sorted result; `sort 'values` intentionally changes the variable. `unique`, `tally`, `size`, `first`, `last`, and `slice` cover common operations. Check bounds and empty input before assuming an element exists.

When porting an algorithm, preserve its indexing and grouping explicitly. Parentheses are especially useful in calculations embedded in iterator bodies. Do not optimize into compact anonymous syntax until output matches a small worked example.

## Unicode and regex patterns

Text size counts Unicode code points, not UTF-8 bytes or user-perceived characters: `size "é猫"` is `2`, while `size to :binary "é猫"` is `5`. Precomposed `"é"` and decomposed `"é"` have sizes `1` and `2` and compare unequal. Splitting text into characters does not normalize it. Grapheme-aware slicing and normalization remain outside these recipes.

A regex literal preserves its backslashes: `{/\d+/}` matches digits. Constructing the same regex from a quoted string requires `to :regex "\\d+"`, because the string parser consumes one escaping layer. Do not add that extra layer inside the regex literal.

When a pattern must treat supplied text literally, construct it with `to :regex escape.regex needle`. For `needle: "a.b"`, this matches `"a.b"` but not `"axb"`; the unescaped `{/a.b/}` matches both. `match` returns `[]` when nothing matches. Invalid dynamic patterns such as `to :regex "["` raise an error; catch or reject them at the input boundary.

## Verification

## Sources

- [Official reference](https://arturo-lang.io/llms.txt): Collections; Iterators/select, filter, map, fold, loop; Strings.
- [Filter task implemented with select](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Filter.art).
- [Dictionary iteration](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Associative%20array%252FIteration.art).

Sources: [language scope rules](https://arturo-lang.io/documentation/language/#scope-and-rules), [match](https://arturo-lang.io/documentation/library/strings/match/), and [escape](https://arturo-lang.io/documentation/library/strings/escape/).

Upstream tests by topic:

- Dictionaries: [lookup](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/collections/get.test.art), [keys](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/collections/keys.test.art), [values](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/collections/values.test.art).
- Collections: [empty inputs](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/collections/empty.test.art), [indexing](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/collections/get.test.art), [mutation](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/collections/set.test.art).
- Iterators: [map](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/iterators/map.test.art), [fold](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/iterators/fold.test.art), [loop](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/iterators/loop.test.art).
