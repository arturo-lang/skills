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

## Dictionaries and strings

Construct a dictionary with `#[name: "Ada" count: 2]`. Access members with paths such as `record\name` or `get record 'name`. Check `key? record 'name` when absence is meaningful. `loop record [key value] [body]` iterates pairs; `keys record` and `values record` expose each side. Avoid depending on an ordering unless the operation establishes one.

`split "abc"` splits into character strings; `split.words "a b"` splits words. `split.lines text` is useful for line processing. Confirm delimiter-specific attributes in Collections/split. `join parts` combines strings; verify `.with:` for separators. `strip`, `replace`, `match?`, and `match` address different text operations; regex syntax is not interchangeable with ordinary string syntax.

`sort values` returns a sorted result; `sort 'values` intentionally changes the variable. `unique`, `tally`, `size`, `first`, `last`, and `slice` cover common operations. Check bounds and empty input before assuming an element exists.

When porting an algorithm, preserve its indexing and grouping explicitly. Parentheses are especially useful in calculations embedded in iterator bodies. Do not optimize into compact anonymous syntax until output matches a small worked example.

## Sources

- [Official reference](https://arturo-lang.io/llms.txt): Collections; Iterators/select, filter, map, fold, loop; Strings.
- [Filter task implemented with select](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Filter.art).
- [Dictionary iteration](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Associative%20array%252FIteration.art).
