# Sets: function selection

Use for mathematical membership and set relationships over blocks. Check duplicate handling and result order instead of relying on sequence semantics. Bound `powerset`: its output grows exponentially.

For signatures, ask the installed runtime with `inspect info.get 'difference`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

| Name                                                                           | Purpose / when to use                                                | Example                                  |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------- |
| [difference](https://arturo-lang.io/documentation/library/sets/difference)     | Return the difference of sets.                                       | `print difference [1 2 3 4] [3 4 5 6]`   |
| [disjoint?](https://arturo-lang.io/documentation/library/sets/disjoint-)       | Test whether sets are disjoint (they have no common elements).       | `disjoint? [1 2 3 4] [3 4 5 6]`          |
| [intersect?](https://arturo-lang.io/documentation/library/sets/intersect-)     | Test whether sets intersect (they have at least one common element). | `intersect? @1..10 @8..12`               |
| [intersection](https://arturo-lang.io/documentation/library/sets/intersection) | Return the intersection of sets.                                     | `print intersection [1 2 3 4] [3 4 5 6]` |
| [powerset](https://arturo-lang.io/documentation/library/sets/powerset)         | Return the powerset of set.                                          | `powerset [1 2 3]`                       |
| [subset?](https://arturo-lang.io/documentation/library/sets/subset-)           | Test whether set is a subset of second set.                          | `subset? [1 3] [1 2 3 4]`                |
| [superset?](https://arturo-lang.io/documentation/library/sets/superset-)       | Test whether set is a superset of second set.                        | `superset? [1 2 3 4] [1 3]`              |
| [union](https://arturo-lang.io/documentation/library/sets/union)               | Return the union of sets.                                            | `print union [1 2 3 4] [3 4 5 6]`        |

## Sources and verification

Reviewed 2026-10-29 against the [official Sets module](https://arturo-lang.io/documentation/library/sets), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 8 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 8 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
