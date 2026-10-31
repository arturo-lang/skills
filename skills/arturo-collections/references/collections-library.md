---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/language/#scope-and-rules
    - https://arturo-lang.io/documentation/library/collections
---

# Collections: function selection

- Supported types: `:block`, `:dictionary`, `:range`, and collection-like `:string`s.
- Operation selection: Choose functions based on the desired result and supported collection type.
- Membership: `contains? collection value` and `in? value collection` use reversed argument order.
- Mutation: Prefer non-mutating operations unless intentional. Direct `set` may modify shared storage.
- Performance: Bound ranges, combinations, and permutations to avoid excessive computation.

## Values and access

`[]` stores code or data; `@[...]` evaluates expressions. Use quoted strings for text. Ranges such as `1..10` include both endpoints; materialize with `array`/`@` only when needed.

Create dictionaries with `#[key: value]`; access through paths or `get`. `key?` distinguishes missing keys from `null`; missing-key `get` raises an error. In Arturo 0.10.0, `first []` returns `null`. Use `empty?` and bounds checks for access. Do not assume dictionary order; iterate key/value pairs with `loop`, or use `keys`/`values`.

`sort values` returns a result; `sort 'values` mutates the binding. Numeric transformations preserve the input; mixed numeric/string operations do not automatically parse strings. Parenthesize ambiguous calculations when porting algorithms.

Patterns reviewed 2026-10-30; [upstream collection tests](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/collections).

| Name                                                                              | Purpose / when to use                                                                   | Example                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [append](https://arturo-lang.io/documentation/library/collections/append)         | Append value to collection.                                                             | `append "hell" "o"`                               |
| [array](https://arturo-lang.io/documentation/library/collections/array)           | Create array from block, by reducing/calculating all internal values.                   | `base: 2 array [base base + 1]`                   |
| [chop](https://arturo-lang.io/documentation/library/collections/chop)             | Remove last item from collection.                                                       | `chop "hellox"`                                   |
| [combine](https://arturo-lang.io/documentation/library/collections/combine)       | Obtain all possible combinations of the elements in collection.                         | `combine [1 2 3]`                                 |
| [contains?](https://arturo-lang.io/documentation/library/collections/contains-)   | Test whether collection contains value.                                                 | `contains? [1 2 3] 2`                             |
| [couple](https://arturo-lang.io/documentation/library/collections/couple)         | Combine elements of collections into an array of tuples.                                | `couple ["a" "b"] [1 2]`                          |
| [decouple](https://arturo-lang.io/documentation/library/collections/decouple)     | Separate a collection of tuples into a tuple of collections.                            | `decouple [[1 "a"] [2 "b"]]`                      |
| [dictionary](https://arturo-lang.io/documentation/library/collections/dictionary) | Create dictionary from block or file, by evaluating and retrieving all defined symbols. | `dictionary [name: "Ada" age: 36]`                |
| [drop](https://arturo-lang.io/documentation/library/collections/drop)             | Remove first item from collection.                                                      | `drop "xhello"`                                   |
| [empty](https://arturo-lang.io/documentation/library/collections/empty)           | Remove all elements from collection.                                                    | `items: [1 2] empty 'items`                       |
| [empty?](https://arturo-lang.io/documentation/library/collections/empty-)         | Test whether collection is empty.                                                       | `empty? ""`                                       |
| [extend](https://arturo-lang.io/documentation/library/collections/extend)         | Merge dictionary into parent.                                                           | `extend #[name: "Ada"] #[age: 36]`                |
| [first](https://arturo-lang.io/documentation/library/collections/first)           | Return the first item of the collection.                                                | `print first "this is some text"`                 |
| [flatten](https://arturo-lang.io/documentation/library/collections/flatten)       | Flatten collection by recursively eliminating nested blocks.                            | `flatten [[1 2] [3]]`                             |
| [get](https://arturo-lang.io/documentation/library/collections/get)               | Obtain collection's item by index.                                                      | `get #[name: "Ada"] 'name`                        |
| [in?](https://arturo-lang.io/documentation/library/collections/in-)               | Test whether value exists in collection.                                                | `in? 2 [1 2 3]`                                   |
| [index](https://arturo-lang.io/documentation/library/collections/index)           | Return first index of value in collection.                                              | `index "hello" "e"`                               |
| [insert](https://arturo-lang.io/documentation/library/collections/insert)         | Insert value in collection at index.                                                    | `insert [1 2 3 4] 0 "zero"`                       |
| [key?](https://arturo-lang.io/documentation/library/collections/key-)             | Test whether collection contains key.                                                   | `key? #[name: "Ada"] 'name`                       |
| [keys](https://arturo-lang.io/documentation/library/collections/keys)             | Obtain list of keys for collection.                                                     | `keys #[name: "Ada"]`                             |
| [last](https://arturo-lang.io/documentation/library/collections/last)             | Return the last item of the collection.                                                 | `print last "this is some text"`                  |
| [max](https://arturo-lang.io/documentation/library/collections/max)               | Obtain maximum element in collection.                                                   | `print max [4 2 8 5 1 9]`                         |
| [min](https://arturo-lang.io/documentation/library/collections/min)               | Obtain minimum element in collection.                                                   | `print min [4 2 8 5 1 9]`                         |
| [one?](https://arturo-lang.io/documentation/library/collections/one-)             | Test whether number or collection size is one.                                          | `one? 5`                                          |
| [permutate](https://arturo-lang.io/documentation/library/collections/permutate)   | Obtain all possible permutations of the elements in collection.                         | `permutate [1 2 3]`                               |
| [pop](https://arturo-lang.io/documentation/library/collections/pop)               | Remove and return the last item from collection.                                        | `items: [1 2 3] lastItem: pop 'items`             |
| [prepend](https://arturo-lang.io/documentation/library/collections/prepend)       | Prepend value to collection.                                                            | `prepend "uro" "Art"`                             |
| [range](https://arturo-lang.io/documentation/library/collections/range)           | Obtain list of values in range (inclusive).                                             | `range 0 3`                                       |
| [remove](https://arturo-lang.io/documentation/library/collections/remove)         | Remove value from collection.                                                           | `remove "hello" "l"`                              |
| [repeat](https://arturo-lang.io/documentation/library/collections/repeat)         | Repeat value the number of times and return new one.                                    | `print repeat "hello" 3`                          |
| [reverse](https://arturo-lang.io/documentation/library/collections/reverse)       | Reverse collection.                                                                     | `print reverse [1 2 3 4]`                         |
| [rotate](https://arturo-lang.io/documentation/library/collections/rotate)         | Rotate collection elements by offset.                                                   | `rotate [1 2 3] 1`                                |
| [sample](https://arturo-lang.io/documentation/library/collections/sample)         | Obtain a random element from collection.                                                | `sample [1 2 3]`                                  |
| [set](https://arturo-lang.io/documentation/library/collections/set)               | Set collection's item at index to value.                                                | `person: #[name: "Ada"] set person 'name "Grace"` |
| [shuffle](https://arturo-lang.io/documentation/library/collections/shuffle)       | Randomize the order of elements in collection.                                          | `shuffle [1 2 3 4 5 6]`                           |
| [size](https://arturo-lang.io/documentation/library/collections/size)             | Obtain size/length of collection.                                                       | `size [1 2 3]`                                    |
| [slice](https://arturo-lang.io/documentation/library/collections/slice)           | Extract a sub-collection between indices.                                               | `slice "Hello" 0 3`                               |
| [sort](https://arturo-lang.io/documentation/library/collections/sort)             | Sort collection in ascending order.                                                     | `sort [3 1 2]`                                    |
| [sorted?](https://arturo-lang.io/documentation/library/collections/sorted-)       | Test whether collection is already sorted.                                              | `sorted? [1 2 3 4 5]`                             |
| [split](https://arturo-lang.io/documentation/library/collections/split)           | Split collection into parts based on criteria.                                          | `split "hello"`                                   |
| [squeeze](https://arturo-lang.io/documentation/library/collections/squeeze)       | Reduce adjacent duplicate elements in collection.                                       | `print squeeze [1 1 2 3 4 2 3 4 4 5 5 6 7]`       |
| [take](https://arturo-lang.io/documentation/library/collections/take)             | Keep first N elements from collection.                                                  | `take "hello" 2`                                  |
| [tally](https://arturo-lang.io/documentation/library/collections/tally)           | Find number of occurrences of each value within block and return as dictionary.         | `tally "helloWorld"`                              |
| [unique](https://arturo-lang.io/documentation/library/collections/unique)         | Obtain collection without duplicates.                                                   | `unique [1 2 1]`                                  |
| [values](https://arturo-lang.io/documentation/library/collections/values)         | Obtain list of values for collection.                                                   | `values #[name: "Ada"]`                           |
| [zero?](https://arturo-lang.io/documentation/library/collections/zero-)           | Test whether number or collection size is zero.                                         | `zero? 5-5`                                       |
