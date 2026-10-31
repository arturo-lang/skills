---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/bitwise
    - https://arturo-lang.io/llms.txt
---

# Bitwise: function selection

Use for integer or binary bit operations. These functions differ from the logical predicates ending in `?`. Check integer width, signed values, and shift limits before using a bit pattern as an external representation.

Signatures and mutation: [runtime](runtime.md). Examples are fragments; bound inputs.

| Name                                                              | Purpose / example                                        |
| ----------------------------------------------------------------- | -------------------------------------------------------- |
| [and](https://arturo-lang.io/documentation/library/bitwise/and)   | Binary AND. `and 2 3`                                    |
| [nand](https://arturo-lang.io/documentation/library/bitwise/nand) | Binary NAND. `nand 2 3`                                  |
| [nor](https://arturo-lang.io/documentation/library/bitwise/nor)   | Binary NOR. `nor 2 3`                                    |
| [not](https://arturo-lang.io/documentation/library/bitwise/not)   | Binary complement of the value. `not 123`                |
| [or](https://arturo-lang.io/documentation/library/bitwise/or)     | Binary OR. `or 2 3`                                      |
| [shl](https://arturo-lang.io/documentation/library/bitwise/shl)   | Shift-left first value bits by second value. `shl 2 3`   |
| [shr](https://arturo-lang.io/documentation/library/bitwise/shr)   | Shift-right first value bits by second value. `shr 16 3` |
| [xnor](https://arturo-lang.io/documentation/library/bitwise/xnor) | Binary XNOR. `xnor 2 3`                                  |
| [xor](https://arturo-lang.io/documentation/library/bitwise/xor)   | Binary XOR. `xor 2 3`                                    |
