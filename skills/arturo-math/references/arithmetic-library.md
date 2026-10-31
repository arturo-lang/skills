---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/arithmetic
    - https://arturo-lang.io/llms.txt
---

# Arithmetic: function selection

Use for arithmetic across supported numeric types. Integer `div` differs from floating `fdiv`; select deliberately. Expressions group right to left without conventional operator precedence. A supported literal argument mutates its binding; a value argument returns a result.

Signatures and mutation: [runtime](runtime.md). Examples are fragments; bound inputs.

| Name                                                                     | Purpose / example                                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| [add](https://arturo-lang.io/documentation/library/arithmetic/add)       | Add values. `add 1 2`                                                                       |
| [dec](https://arturo-lang.io/documentation/library/arithmetic/dec)       | Decrease value by 1. `dec 5`                                                                |
| [div](https://arturo-lang.io/documentation/library/arithmetic/div)       | Integer division. `div 5 2`                                                                 |
| [divmod](https://arturo-lang.io/documentation/library/arithmetic/divmod) | Integer division between values and return tuple with quotient and remainder. `divmod 15 5` |
| [fdiv](https://arturo-lang.io/documentation/library/arithmetic/fdiv)     | Divide values. `fdiv 5 2`                                                                   |
| [inc](https://arturo-lang.io/documentation/library/arithmetic/inc)       | Increase value by 1. `inc 5`                                                                |
| [mod](https://arturo-lang.io/documentation/library/arithmetic/mod)       | Modulo of values. `mod 5 2`                                                                 |
| [mul](https://arturo-lang.io/documentation/library/arithmetic/mul)       | Product of values. `mul 1 2`                                                                |
| [neg](https://arturo-lang.io/documentation/library/arithmetic/neg)       | Reverse sign of value and return it. `neg 1`                                                |
| [pow](https://arturo-lang.io/documentation/library/arithmetic/pow)       | Power of values. `pow 2 3`                                                                  |
| [sub](https://arturo-lang.io/documentation/library/arithmetic/sub)       | Subtract values. `sub 2 1`                                                                  |
