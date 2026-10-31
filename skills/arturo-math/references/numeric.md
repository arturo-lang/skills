---
metadata:
  arturo-version: 0.10.0
  sources:
    - https://arturo-lang.io/documentation/library/reflection/inspect
    - https://arturo-lang.io/documentation/library/reflection/info
    - https://arturo-lang.io/documentation/language
    - https://arturo-lang.io/llms.txt
    - https://arturo-lang.io/documentation/library/arithmetic
    - https://arturo-lang.io/documentation/library/bitwise
    - https://arturo-lang.io/documentation/library/numbers
    - https://arturo-lang.io/documentation/library/statistics
---

# Numeric reference

## Runtime

Source review: 2026-10-29.

Check `arturo --version` / `--help`. Inspect metadata without invoking the target:

```sh
arturo --no-color -e "inspect info.get 'sort"
```

- `info.get` returns metadata; `inspect 'sort` shows a literal, while `inspect var 'sort` only shows a built-in marker on 0.10.0. `info 'sort` gives a compact display.
- `args`: positional order; each argument consumes one value, listed types are alternatives. `attrs`: flags (`.descending`) or labeled values (`.by: 'name`), not positional arguments. `returns`: possible types; `:nothing` means no result.
- Expressions group right to left; arity determines boundaries, including infix aliases. Blocks are data until evaluated; ordinary evaluated blocks do not imply scope.
- Supported literal/path-literal arguments permit mutation; value arguments return results. `sort` takes one collection; `sort samples` returns a sorted value. Use `new` for independent copies.
- Control flow is callable: `if` takes condition/action; `switch` takes condition/two blocks.
- Prefer lower camelCase (`:someObject`), `_` for private helpers; preserve existing/user conventions. Underscores mainly serve external formats.
- Resolve documentation/runtime conflicts with minimal reproducers. Use bounded offline `ensure [condition]` checks, temporary directories for disk effects, and project tooling; report limitations.

## Numeric Recipes

Source review: 2026-10-30.

Offline assertions: [checks.art](../examples/checks.art).

- **Grouping:** `2 * 3 + 4` and `mul 2 add 3 4` yield 14; `(2 * 3) + 4` yields 10. Use parentheses or intermediates.
- **Division:** `div 5 2` → integer 2; `fdiv 5 2` → floating 2.5; `/` aliases `div`. Guard divisors or catch errors; integer division by zero raises.
- **Mutation:** `increased: add amount 2` preserves `amount`; `add 'amount 2` mutates it. Mutation need not return the value form's result.
- **Conversion:** `to :integer "42"`, `to :floating 4`. Integer conversion truncates toward zero: 4.9 → 4, -4.9 → -4 on 0.10.0. Malformed strings raise; inspect `try` errors, never silently substitute zero. Failed conversion preserves input and previous destination; that destination is not a successful parse.
- **Mixed types:** `(to :string 4) ++ " units"` converts before concatenation; omitting parentheses attempts concatenation first. `convert` handles units, not general types.
- **Empty input:** `sum []` → 0; `product []` → 1; `average []` raises without mutation. Choose an explicit empty-data policy; do not invent a zero mean.
- **Statistics:** `average`, `variance`, and `median sort samples` preserve the original unsorted input. Singleton average equals its element; population variance is zero. `variance` defaults to population; `variance.sample [1 3]` → 2.0. Require ≥2 sample values: 0.10.0 returns 0.0 for singleton sample variance, although mathematically undefined.
- Check overflow, non-finite results, mixed types, and floating tolerances for intended inputs.

More conversion examples: [upstream tests](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/types/to.test.art).

## Arithmetic

Source review: 2026-10-29.

Use for arithmetic across supported numeric types. Integer `div` differs from floating `fdiv`; select deliberately. Expressions group right to left without conventional operator precedence. A supported literal argument mutates its binding; a value argument returns a result.

Signatures and mutation: [runtime](#runtime). Examples are fragments; bound inputs.

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

## Bitwise

Source review: 2026-10-29.

Use for integer or binary bit operations. These functions differ from the logical predicates ending in `?`. Check integer width, signed values, and shift limits before using a bit pattern as an external representation.

Signatures and mutation: [runtime](#runtime). Examples are fragments; bound inputs.

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

## Numbers

Source review: 2026-10-29.

Use for numerical functions, constants, aggregates, and numeric predicates. Check domains, angle units, floating error, and non-finite results. `epsilon` denotes Euler’s number here, not machine precision. Keep factorials, factorization, and primality inputs bounded.

Signatures and mutation: [runtime](#runtime). Examples are fragments; bound inputs.

| Name                                                                            | Purpose / example                                                                               |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [abs](https://arturo-lang.io/documentation/library/numbers/abs)                 | Numeric magnitude; use for supported integer, floating, rational, or complex inputs. `abs 6`    |
| [acos](https://arturo-lang.io/documentation/library/numbers/acos)               | Inverse cosine. `acos 0`                                                                        |
| [acosh](https://arturo-lang.io/documentation/library/numbers/acosh)             | Inverse hyperbolic cosine. `acosh 1.0`                                                          |
| [acsec](https://arturo-lang.io/documentation/library/numbers/acsec)             | Inverse cosecant. `acsec 0`                                                                     |
| [acsech](https://arturo-lang.io/documentation/library/numbers/acsech)           | Inverse hyperbolic cosecant. `acsech 0`                                                         |
| [actan](https://arturo-lang.io/documentation/library/numbers/actan)             | Inverse cotangent. `actan 0`                                                                    |
| [actanh](https://arturo-lang.io/documentation/library/numbers/actanh)           | Inverse hyperbolic cotangent. `actanh 0`                                                        |
| [angle](https://arturo-lang.io/documentation/library/numbers/angle)             | Phase angle. `angle to :complex [1 1]`                                                          |
| [asec](https://arturo-lang.io/documentation/library/numbers/asec)               | Inverse secant. `asec 0`                                                                        |
| [asech](https://arturo-lang.io/documentation/library/numbers/asech)             | Inverse hyperbolic secant. `asech 0`                                                            |
| [asin](https://arturo-lang.io/documentation/library/numbers/asin)               | Inverse sine. `asin 0`                                                                          |
| [asinh](https://arturo-lang.io/documentation/library/numbers/asinh)             | Inverse hyperbolic sine. `asinh 0`                                                              |
| [atan](https://arturo-lang.io/documentation/library/numbers/atan)               | Inverse tangent. `atan 0`                                                                       |
| [atan2](https://arturo-lang.io/documentation/library/numbers/atan2)             | Inverse tangent of y / x. `atan2 1 1`                                                           |
| [atanh](https://arturo-lang.io/documentation/library/numbers/atanh)             | Inverse hyperbolic tangent. `atanh 0`                                                           |
| [ceil](https://arturo-lang.io/documentation/library/numbers/ceil)               | Smallest integer not smaller than value. `ceil 2.1`                                             |
| [clamp](https://arturo-lang.io/documentation/library/numbers/clamp)             | Force value within range. `clamp 2 1..3`                                                        |
| [conj](https://arturo-lang.io/documentation/library/numbers/conj)               | Complex conjugate. `conj to :complex [1 2]`                                                     |
| [cos](https://arturo-lang.io/documentation/library/numbers/cos)                 | Cosine. `cos 0`                                                                                 |
| [cosh](https://arturo-lang.io/documentation/library/numbers/cosh)               | Hyperbolic cosine. `cosh 0`                                                                     |
| [csec](https://arturo-lang.io/documentation/library/numbers/csec)               | Cosecant. `csec 0`                                                                              |
| [csech](https://arturo-lang.io/documentation/library/numbers/csech)             | Hyperbolic cosecant. `csech 0`                                                                  |
| [ctan](https://arturo-lang.io/documentation/library/numbers/ctan)               | Cotangent. `ctan 0`                                                                             |
| [ctanh](https://arturo-lang.io/documentation/library/numbers/ctanh)             | Hyperbolic cotangent. `ctanh 0`                                                                 |
| [denominator](https://arturo-lang.io/documentation/library/numbers/denominator) | Denominator. `denominator 3:2`                                                                  |
| [digits](https://arturo-lang.io/documentation/library/numbers/digits)           | Convert a number into an array of digits or an array of digits back into a number. `digits 123` |
| [epsilon](https://arturo-lang.io/documentation/library/numbers/epsilon)         | Euler’s number e; use for exponential formulas, not floating tolerances.                        |
| [even?](https://arturo-lang.io/documentation/library/numbers/even-)             | Even.                                                                                           |
| [exp](https://arturo-lang.io/documentation/library/numbers/exp)                 | Exponential function. `exp 1.0`                                                                 |
| [factorial](https://arturo-lang.io/documentation/library/numbers/factorial)     | Factorial. `factorial 1`                                                                        |
| [factors](https://arturo-lang.io/documentation/library/numbers/factors)         | List of factors for integer. `factors 16`                                                       |
| [floor](https://arturo-lang.io/documentation/library/numbers/floor)             | Largest integer not greater than value. `floor 2.1`                                             |
| [gamma](https://arturo-lang.io/documentation/library/numbers/gamma)             | Gamma function. `gamma 3.0`                                                                     |
| [gcd](https://arturo-lang.io/documentation/library/numbers/gcd)                 | Greatest common divisor of integers. `gcd [48 60 120]`                                          |
| [hypot](https://arturo-lang.io/documentation/library/numbers/hypot)             | Hypotenuse of a right-angle triangle with base and height. `hypot 3 4`                          |
| [infinite](https://arturo-lang.io/documentation/library/numbers/infinite)       | IEEE floating point value of positive infinity.                                                 |
| [infinite?](https://arturo-lang.io/documentation/library/numbers/infinite-)     | Infinity predicate.                                                                             |
| [lcm](https://arturo-lang.io/documentation/library/numbers/lcm)                 | Least common multiplier of integers. `lcm [48 60 120]`                                          |
| [ln](https://arturo-lang.io/documentation/library/numbers/ln)                   | Natural logarithm. `ln 1.0`                                                                     |
| [log](https://arturo-lang.io/documentation/library/numbers/log)                 | Logarithm of value using base. `log 9 3`                                                        |
| [negative?](https://arturo-lang.io/documentation/library/numbers/negative-)     | Negative.                                                                                       |
| [numerator](https://arturo-lang.io/documentation/library/numbers/numerator)     | Numerator. `numerator 3:2`                                                                      |
| [odd?](https://arturo-lang.io/documentation/library/numbers/odd-)               | Odd.                                                                                            |
| [pi](https://arturo-lang.io/documentation/library/numbers/pi)                   | Number pi, mathematical constant.                                                               |
| [positive?](https://arturo-lang.io/documentation/library/numbers/positive-)     | Positive.                                                                                       |
| [powmod](https://arturo-lang.io/documentation/library/numbers/powmod)           | Modular exponentiation: calculate the result of (base^exponent) % divider. `powmod 1 10 3`      |
| [prime?](https://arturo-lang.io/documentation/library/numbers/prime-)           | Test whether integer is prime.                                                                  |
| [product](https://arturo-lang.io/documentation/library/numbers/product)         | Product of all values in list. `product [3 4]`                                                  |
| [random](https://arturo-lang.io/documentation/library/numbers/random)           | A random number between limits. `random 1 6`                                                    |
| [reciprocal](https://arturo-lang.io/documentation/library/numbers/reciprocal)   | Reciprocal. `reciprocal 3:2`                                                                    |
| [round](https://arturo-lang.io/documentation/library/numbers/round)             | Round value. `round 2.1`                                                                        |
| [sec](https://arturo-lang.io/documentation/library/numbers/sec)                 | Secant. `sec 0`                                                                                 |
| [sech](https://arturo-lang.io/documentation/library/numbers/sech)               | Hyperbolic secant. `sech 0`                                                                     |
| [sin](https://arturo-lang.io/documentation/library/numbers/sin)                 | Sine. `sin 0`                                                                                   |
| [sinh](https://arturo-lang.io/documentation/library/numbers/sinh)               | Hyperbolic sine. `sinh 0`                                                                       |
| [sqrt](https://arturo-lang.io/documentation/library/numbers/sqrt)               | Square root. `sqrt 4`                                                                           |
| [sum](https://arturo-lang.io/documentation/library/numbers/sum)                 | Sum of all values in list. `sum [3 4]`                                                          |
| [tan](https://arturo-lang.io/documentation/library/numbers/tan)                 | Tangent. `tan 0`                                                                                |
| [tanh](https://arturo-lang.io/documentation/library/numbers/tanh)               | Hyperbolic tangent. `tanh 0`                                                                    |
| [tau](https://arturo-lang.io/documentation/library/numbers/tau)                 | Number tau, mathematical constant.                                                              |

## Statistics

Source review: 2026-10-29.

Use for descriptive statistics on numeric collections. Population statistics are the defaults; inspect `.sample` support before choosing sample estimators. Decide how empty input, singleton samples, and non-numeric values should behave. Verify ordering requirements for `median` on the installed runtime.

Signatures and mutation: [runtime](#runtime). Examples are fragments; bound inputs.

| Name                                                                           | Purpose / example                                                              |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [average](https://arturo-lang.io/documentation/library/statistics/average)     | Average. `average [2 4 5 6 7 2 3]`                                             |
| [deviation](https://arturo-lang.io/documentation/library/statistics/deviation) | Population standard deviation. `deviation [1 2 3 4]`                           |
| [kurtosis](https://arturo-lang.io/documentation/library/statistics/kurtosis)   | Population kurtosis. `kurtosis [1 2 3 4]`                                      |
| [median](https://arturo-lang.io/documentation/library/statistics/median)       | Middle value; sort first when ordering behavior matters. `median sort [5 1 3]` |
| [skewness](https://arturo-lang.io/documentation/library/statistics/skewness)   | Population skewness. `skewness [1 2 3 4]`                                      |
| [variance](https://arturo-lang.io/documentation/library/statistics/variance)   | Population variance. `variance [1 2 3 4]`                                      |
