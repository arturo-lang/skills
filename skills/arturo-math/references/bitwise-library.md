# Bitwise: function selection

Use for integer or binary bit operations. These functions differ from the logical predicates ending in `?`. Check integer width, signed values, and shift limits before using a bit pattern as an external representation.

For signatures, ask the installed runtime with `inspect info.get 'and`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

| Name                                                              | Purpose / when to use                         | Example          |
| ----------------------------------------------------------------- | --------------------------------------------- | ---------------- |
| [and](https://arturo-lang.io/documentation/library/bitwise/and)   | Compute the binary AND for the values.        | `print and 2 3`  |
| [nand](https://arturo-lang.io/documentation/library/bitwise/nand) | Compute the binary NAND for the values.       | `print nand 2 3` |
| [nor](https://arturo-lang.io/documentation/library/bitwise/nor)   | Compute the binary NOR for the values.        | `print nor 2 3`  |
| [not](https://arturo-lang.io/documentation/library/bitwise/not)   | Compute the binary complement of the value.   | `print not 123`  |
| [or](https://arturo-lang.io/documentation/library/bitwise/or)     | Compute the binary OR for the values.         | `print or 2 3`   |
| [shl](https://arturo-lang.io/documentation/library/bitwise/shl)   | Shift-left first value bits by second value.  | `print shl 2 3`  |
| [shr](https://arturo-lang.io/documentation/library/bitwise/shr)   | Shift-right first value bits by second value. | `print shr 16 3` |
| [xnor](https://arturo-lang.io/documentation/library/bitwise/xnor) | Compute the binary XNOR for the values.       | `print xnor 2 3` |
| [xor](https://arturo-lang.io/documentation/library/bitwise/xor)   | Compute the binary XOR for the values.        | `print xor 2 3`  |

## Sources and verification

Reviewed 2026-10-29 against the [official Bitwise module](https://arturo-lang.io/documentation/library/bitwise), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 9 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 9 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
