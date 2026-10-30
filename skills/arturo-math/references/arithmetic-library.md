# Arithmetic: function selection

Use for arithmetic across supported numeric types. Integer `div` differs from floating `fdiv`; select deliberately. Expressions group right to left without conventional operator precedence. A supported literal argument mutates its binding; a value argument returns a result.

For signatures, ask the installed runtime with `inspect info.get 'add`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

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

## Sources and verification

Reviewed 2026-10-29 against the [official Arithmetic module](https://arturo-lang.io/documentation/library/arithmetic), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 11 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 11 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
