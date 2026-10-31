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

Query signatures with `inspect info.get 'add`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                     | Purpose / when to use                                                                 | Example             |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------- |
| [add](https://arturo-lang.io/documentation/library/arithmetic/add)       | Add values.                                                                           | `print add 1 2`     |
| [dec](https://arturo-lang.io/documentation/library/arithmetic/dec)       | Decrease value by 1.                                                                  | `print dec 5`       |
| [div](https://arturo-lang.io/documentation/library/arithmetic/div)       | Perform integer division between values.                                              | `print div 5 2`     |
| [divmod](https://arturo-lang.io/documentation/library/arithmetic/divmod) | Perform integer division between values and return tuple with quotient and remainder. | `print divmod 15 5` |
| [fdiv](https://arturo-lang.io/documentation/library/arithmetic/fdiv)     | Divide values.                                                                        | `print fdiv 5 2`    |
| [inc](https://arturo-lang.io/documentation/library/arithmetic/inc)       | Increase value by 1.                                                                  | `print inc 5`       |
| [mod](https://arturo-lang.io/documentation/library/arithmetic/mod)       | Compute the modulo of values.                                                         | `print mod 5 2`     |
| [mul](https://arturo-lang.io/documentation/library/arithmetic/mul)       | Compute the product of values.                                                        | `print mul 1 2`     |
| [neg](https://arturo-lang.io/documentation/library/arithmetic/neg)       | Reverse sign of value and return it.                                                  | `print neg 1`       |
| [pow](https://arturo-lang.io/documentation/library/arithmetic/pow)       | Compute the power of values.                                                          | `print pow 2 3`     |
| [sub](https://arturo-lang.io/documentation/library/arithmetic/sub)       | Subtract values.                                                                      | `print sub 2 1`     |
