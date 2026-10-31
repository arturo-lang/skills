# Bitwise: function selection

Use for integer or binary bit operations. These functions differ from the logical predicates ending in `?`. Check integer width, signed values, and shift limits before using a bit pattern as an external representation.

Query signatures with `inspect info.get 'and`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

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

## Sources

Sources: the [official Bitwise module](https://arturo-lang.io/documentation/library/bitwise); [official text reference](https://arturo-lang.io/llms.txt).
