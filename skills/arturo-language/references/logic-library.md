# Logic: function selection

Use for logical predicates and the three logical values `true`, `false`, and `maybe`. Functions ending in `?` differ from Bitwise names without it. Blocks and already-evaluated logical values have different evaluation consequences; verify short-circuit behavior for the chosen form.

For signatures, ask the installed runtime with `inspect info.get 'all?`. Read [inspection guidance](inspection.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

| Name                                                                | Purpose / when to use                                        | Example               |
| ------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------- |
| [all?](https://arturo-lang.io/documentation/library/logic/all-)     | Test whether all values in block are true.                   | `all? @[2 > 1 true]`  |
| [and?](https://arturo-lang.io/documentation/library/logic/and-)     | Return the logical AND for the values.                       | `and? true false`     |
| [any?](https://arturo-lang.io/documentation/library/logic/any-)     | Test whether any of the values in block is true.             | `any? @[false 2 > 1]` |
| [false](https://arturo-lang.io/documentation/library/logic/false)   | The FALSE logical constant.                                  | `inspect false`       |
| [false?](https://arturo-lang.io/documentation/library/logic/false-) | Returns true if value is false; otherwise, it returns false. | `false? false`        |
| [maybe](https://arturo-lang.io/documentation/library/logic/maybe)   | The MAYBE logical constant.                                  | `inspect maybe`       |
| [nand?](https://arturo-lang.io/documentation/library/logic/nand-)   | Return the logical NAND for the values.                      | `nand? true false`    |
| [nor?](https://arturo-lang.io/documentation/library/logic/nor-)     | Return the logical NOR for the values.                       | `nor? false false`    |
| [not?](https://arturo-lang.io/documentation/library/logic/not-)     | Return the logical complement of the value.                  | `not? true`           |
| [or?](https://arturo-lang.io/documentation/library/logic/or-)       | Return the logical OR for the values.                        | `or? true false`      |
| [true](https://arturo-lang.io/documentation/library/logic/true)     | The TRUE logical constant.                                   | `inspect true`        |
| [true?](https://arturo-lang.io/documentation/library/logic/true-)   | Returns true if value is true; otherwise, it returns false.  | `true? true`          |
| [xnor?](https://arturo-lang.io/documentation/library/logic/xnor-)   | Return the logical XNOR for the values.                      | `xnor? true true`     |
| [xor?](https://arturo-lang.io/documentation/library/logic/xor-)     | Return the logical XOR for the values.                       | `xor? true false`     |

## Sources and verification

Reviewed 2026-10-29 against the [official Logic module](https://arturo-lang.io/documentation/library/logic), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 14 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 14 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
