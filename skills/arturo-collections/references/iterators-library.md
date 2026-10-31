---
metadata:
  arturo-version: "0.10.0"
  review-date: "2026-10-29"
  sources:
    - https://arturo-lang.io/documentation/library/iterators
    - https://arturo-lang.io/llms.txt
---

# Iterators: function selection

Use for transformations, grouping, search, and effects over collections. `select` keeps matching items; `filter` removes them, despite the misleading summary in some upstream documentation. Iterator-injected names are temporary. Use explicit parameter blocks; check accumulator order and `.seed:` with `fold`.

Query signatures with `inspect info.get 'arrange`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                          | Purpose / when to use                                                            | Example                                        |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------- |
| [arrange](https://arturo-lang.io/documentation/library/iterators/arrange)     | Sort items in collection using value returned from action, in ascending order.   | `arrange ["aaa" "b" "cc"] 'item [size item]`   |
| [chunk](https://arturo-lang.io/documentation/library/iterators/chunk)         | Chunk together consecutive items in collection that abide by condition.          | `chunk [1 3 2 4 5] 'item [even? item]`         |
| [cluster](https://arturo-lang.io/documentation/library/iterators/cluster)     | Group together items in collection that abide by condition.                      | `cluster 1..6 'item [odd? item]`               |
| [collect](https://arturo-lang.io/documentation/library/iterators/collect)     | Collect items from collection condition while is true.                           | `collect [1 3 4 5] 'item [odd? item]`          |
| [enumerate](https://arturo-lang.io/documentation/library/iterators/enumerate) | Compute the number of collection's items that satisfy condition.                 | `enumerate 1..10 'item [odd? item]`            |
| [every?](https://arturo-lang.io/documentation/library/iterators/every-)       | Test whether every item in collection satisfies condition.                       | `every? [2 4 6] 'item [even? item]`            |
| [filter](https://arturo-lang.io/documentation/library/iterators/filter)       | Remove items whose predicate matches; use for exclusion, not selection.          | `filter 1..6 'item [even? item]`               |
| [fold](https://arturo-lang.io/documentation/library/iterators/fold)           | Reduce collection from the left using action, returning the final accumulator.   | `fold.seed: 0 [1 2 3] [acc item] [acc + item]` |
| [gather](https://arturo-lang.io/documentation/library/iterators/gather)       | Group items in collection by value returned from action, returning a dictionary. | `gather [1 2 3 4] 'item [item % 2]`            |
| [loop](https://arturo-lang.io/documentation/library/iterators/loop)           | Iterate through collection, executing block for each item.                       | `loop [1 2 3] 'item [print item]`              |
| [map](https://arturo-lang.io/documentation/library/iterators/map)             | Map items in collection to values returned from action.                          | `map 1..3 'item [item * 2]`                    |
| [maximum](https://arturo-lang.io/documentation/library/iterators/maximum)     | Obtain item in collection with maximum value returned from action.               | `maximum ["a" "bbb" "cc"] 'item [size item]`   |
| [minimum](https://arturo-lang.io/documentation/library/iterators/minimum)     | Obtain item in collection with minimum value returned from action.               | `minimum ["a" "bbb" "cc"] 'item [size item]`   |
| [select](https://arturo-lang.io/documentation/library/iterators/select)       | Obtain items in collection that satisfy condition.                               | `select 1..6 'item [even? item]`               |
| [some?](https://arturo-lang.io/documentation/library/iterators/some-)         | Test whether any of collection's items satisfy condition.                        | `some? [1 2 3] 'item [even? item]`             |
