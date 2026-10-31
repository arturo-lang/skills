# Comparison: function selection

Use for ordering, equality, and identity. `same?` is stricter than value equality. `between?` includes its endpoints. Confirm behavior for mixed types and custom objects instead of assuming another language’s coercion rules.

Query signatures with `inspect info.get 'between?`; see [inspection guidance](inspection.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                                       | Purpose / when to use                                      | Example               |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | --------------------- |
| [between?](https://arturo-lang.io/documentation/library/comparison/between-)               | Test whether value is between the values (inclusive).      | `between? 1 2 3`      |
| [compare](https://arturo-lang.io/documentation/library/comparison/compare)                 | Compare values and return -1, 0, or 1 based on the result. | `compare 1 2`         |
| [equal?](https://arturo-lang.io/documentation/library/comparison/equal-)                   | Test whether valueA = valueB (equality).                   | `equal? 5 2`          |
| [greater?](https://arturo-lang.io/documentation/library/comparison/greater-)               | Test whether valueA > valueB (greater than).               | `greater? 5 2`        |
| [greaterOrEqual?](https://arturo-lang.io/documentation/library/comparison/greaterorequal-) | Test whether valueA >= valueB (greater than or equal).     | `greaterOrEqual? 5 2` |
| [less?](https://arturo-lang.io/documentation/library/comparison/less-)                     | Test whether valueA < valueB (less than).                  | `less? 5 2`           |
| [lessOrEqual?](https://arturo-lang.io/documentation/library/comparison/lessorequal-)       | Test whether valueA =< valueB (less than or equal).        | `lessOrEqual? 5 2`    |
| [notEqual?](https://arturo-lang.io/documentation/library/comparison/notequal-)             | Test whether valueA <> valueB (not equal).                 | `notEqual? 5 2`       |
| [same?](https://arturo-lang.io/documentation/library/comparison/same-)                     | Test whether values are exactly the same (identity).       | `same? 1 2`           |

## Sources

Sources: the [official Comparison module](https://arturo-lang.io/documentation/library/comparison); [official text reference](https://arturo-lang.io/llms.txt).
