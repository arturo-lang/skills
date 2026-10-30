# Comparison: function selection

Use for ordering, equality, and identity. `same?` is stricter than value equality. `between?` includes its endpoints. Confirm behavior for mixed types and custom objects instead of assuming another language’s coercion rules.

For signatures, ask the installed runtime with `inspect info.get 'between?`. Read [inspection guidance](inspection.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

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

## Sources and verification

Reviewed 2026-10-29 against the [official Comparison module](https://arturo-lang.io/documentation/library/comparison), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 9 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 9 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
