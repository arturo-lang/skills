---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/numbers
    - https://arturo-lang.io/llms.txt
---

# Numbers: function selection

Use for numerical functions, constants, aggregates, and numeric predicates. Check domains, angle units, floating error, and non-finite results. `epsilon` denotes Euler’s number here, not machine precision. Keep factorials, factorization, and primality inputs bounded.

Signatures and mutation: [runtime](runtime.md). Examples are fragments; bound inputs.

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
