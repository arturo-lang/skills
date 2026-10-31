---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/sets
    - https://arturo-lang.io/llms.txt
---

# Sets: function selection

Use for mathematical membership and set relationships over blocks. Check duplicate handling and result order instead of relying on sequence semantics. Bound `powerset`: its output grows exponentially.

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
