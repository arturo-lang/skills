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

Query signatures with `inspect info.get 'abs`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                            | Purpose / when to use                                                                     | Example                   |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------- |
| [abs](https://arturo-lang.io/documentation/library/numbers/abs)                 | Find numeric magnitude; use for supported integer, floating, rational, or complex inputs. | `print abs 6`             |
| [acos](https://arturo-lang.io/documentation/library/numbers/acos)               | Compute the inverse cosine of angle.                                                      | `print acos 0`            |
| [acosh](https://arturo-lang.io/documentation/library/numbers/acosh)             | Compute the inverse hyperbolic cosine of angle.                                           | `print acosh 1.0`         |
| [acsec](https://arturo-lang.io/documentation/library/numbers/acsec)             | Compute the inverse cosecant of angle.                                                    | `print acsec 0`           |
| [acsech](https://arturo-lang.io/documentation/library/numbers/acsech)           | Compute the inverse hyperbolic cosecant of angle.                                         | `print acsech 0`          |
| [actan](https://arturo-lang.io/documentation/library/numbers/actan)             | Compute the inverse cotangent of angle.                                                   | `print actan 0`           |
| [actanh](https://arturo-lang.io/documentation/library/numbers/actanh)           | Compute the inverse hyperbolic cotangent of angle.                                        | `print actanh 0`          |
| [angle](https://arturo-lang.io/documentation/library/numbers/angle)             | Compute the phase angle of number.                                                        | `angle to :complex [1 1]` |
| [asec](https://arturo-lang.io/documentation/library/numbers/asec)               | Compute the inverse secant of angle.                                                      | `print asec 0`            |
| [asech](https://arturo-lang.io/documentation/library/numbers/asech)             | Compute the inverse hyperbolic secant of angle.                                           | `print asech 0`           |
| [asin](https://arturo-lang.io/documentation/library/numbers/asin)               | Compute the inverse sine of angle.                                                        | `print asin 0`            |
| [asinh](https://arturo-lang.io/documentation/library/numbers/asinh)             | Compute the inverse hyperbolic sine of angle.                                             | `print asinh 0`           |
| [atan](https://arturo-lang.io/documentation/library/numbers/atan)               | Compute the inverse tangent of angle.                                                     | `print atan 0`            |
| [atan2](https://arturo-lang.io/documentation/library/numbers/atan2)             | Compute the inverse tangent of y / x.                                                     | `atan2 1 1`               |
| [atanh](https://arturo-lang.io/documentation/library/numbers/atanh)             | Compute the inverse hyperbolic tangent of angle.                                          | `print atanh 0`           |
| [ceil](https://arturo-lang.io/documentation/library/numbers/ceil)               | Compute the smallest integer not smaller than value.                                      | `print ceil 2.1`          |
| [clamp](https://arturo-lang.io/documentation/library/numbers/clamp)             | Force value within range.                                                                 | `clamp 2 1..3`            |
| [conj](https://arturo-lang.io/documentation/library/numbers/conj)               | Compute the complex conjugate of number.                                                  | `conj to :complex [1 2]`  |
| [cos](https://arturo-lang.io/documentation/library/numbers/cos)                 | Compute the cosine of angle.                                                              | `print cos 0`             |
| [cosh](https://arturo-lang.io/documentation/library/numbers/cosh)               | Compute the hyperbolic cosine of angle.                                                   | `print cosh 0`            |
| [csec](https://arturo-lang.io/documentation/library/numbers/csec)               | Compute the cosecant of angle.                                                            | `print csec 0`            |
| [csech](https://arturo-lang.io/documentation/library/numbers/csech)             | Compute the hyperbolic cosecant of angle.                                                 | `print csech 0`           |
| [ctan](https://arturo-lang.io/documentation/library/numbers/ctan)               | Compute the cotangent of angle.                                                           | `print ctan 0`            |
| [ctanh](https://arturo-lang.io/documentation/library/numbers/ctanh)             | Compute the hyperbolic cotangent of angle.                                                | `print ctanh 0`           |
| [denominator](https://arturo-lang.io/documentation/library/numbers/denominator) | Obtain the denominator of number.                                                         | `denominator 3:2`         |
| [digits](https://arturo-lang.io/documentation/library/numbers/digits)           | Convert a number into an array of digits or an array of digits back into a number.        | `digits 123`              |
| [epsilon](https://arturo-lang.io/documentation/library/numbers/epsilon)         | Euler’s number e; use for exponential formulas, not floating tolerances.                  | `inspect epsilon`         |
| [even?](https://arturo-lang.io/documentation/library/numbers/even-)             | Test whether number is even.                                                              | `even? 4`                 |
| [exp](https://arturo-lang.io/documentation/library/numbers/exp)                 | Compute the exponential function for value.                                               | `print exp 1.0`           |
| [factorial](https://arturo-lang.io/documentation/library/numbers/factorial)     | Compute the factorial of value.                                                           | `factorial 1`             |
| [factors](https://arturo-lang.io/documentation/library/numbers/factors)         | Obtain list of factors for integer.                                                       | `factors 16`              |
| [floor](https://arturo-lang.io/documentation/library/numbers/floor)             | Compute the largest integer not greater than value.                                       | `print floor 2.1`         |
| [gamma](https://arturo-lang.io/documentation/library/numbers/gamma)             | Compute the gamma function for value.                                                     | `print gamma 3.0`         |
| [gcd](https://arturo-lang.io/documentation/library/numbers/gcd)                 | Compute greatest common divisor for collection of integers.                               | `print gcd [48 60 120]`   |
| [hypot](https://arturo-lang.io/documentation/library/numbers/hypot)             | Compute the hypotenuse of a right-angle triangle with base and height.                    | `print hypot 3 4`         |
| [infinite](https://arturo-lang.io/documentation/library/numbers/infinite)       | The IEEE floating point value of positive infinity.                                       | `inspect infinite`        |
| [infinite?](https://arturo-lang.io/documentation/library/numbers/infinite-)     | Check whether value is an infinite one.                                                   | `infinite? 4`             |
| [lcm](https://arturo-lang.io/documentation/library/numbers/lcm)                 | Compute least common multiplier for collection of integers.                               | `print lcm [48 60 120]`   |
| [ln](https://arturo-lang.io/documentation/library/numbers/ln)                   | Compute the natural logarithm of value.                                                   | `print ln 1.0`            |
| [log](https://arturo-lang.io/documentation/library/numbers/log)                 | Compute the logarithm of value using base.                                                | `print log 9 3`           |
| [negative?](https://arturo-lang.io/documentation/library/numbers/negative-)     | Test whether number is negative.                                                          | `negative? 5`             |
| [numerator](https://arturo-lang.io/documentation/library/numbers/numerator)     | Obtain the numerator of number.                                                           | `numerator 3:2`           |
| [odd?](https://arturo-lang.io/documentation/library/numbers/odd-)               | Test whether number is odd.                                                               | `odd? 4`                  |
| [pi](https://arturo-lang.io/documentation/library/numbers/pi)                   | The number pi, mathematical constant.                                                     | `inspect pi`              |
| [positive?](https://arturo-lang.io/documentation/library/numbers/positive-)     | Test whether number is positive.                                                          | `positive? 5`             |
| [powmod](https://arturo-lang.io/documentation/library/numbers/powmod)           | Modular exponentiation: calculate the result of (base^exponent) % divider.                | `powmod 1 10 3`           |
| [prime?](https://arturo-lang.io/documentation/library/numbers/prime-)           | Test whether integer is prime.                                                            | `prime? 2`                |
| [product](https://arturo-lang.io/documentation/library/numbers/product)         | Compute the product of all values in list.                                                | `print product [3 4]`     |
| [random](https://arturo-lang.io/documentation/library/numbers/random)           | Obtain a random number between limits.                                                    | `random 1 6`              |
| [reciprocal](https://arturo-lang.io/documentation/library/numbers/reciprocal)   | Compute the reciprocal of number.                                                         | `reciprocal 3:2`          |
| [round](https://arturo-lang.io/documentation/library/numbers/round)             | Round value.                                                                              | `print round 2.1`         |
| [sec](https://arturo-lang.io/documentation/library/numbers/sec)                 | Compute the secant of angle.                                                              | `print sec 0`             |
| [sech](https://arturo-lang.io/documentation/library/numbers/sech)               | Compute the hyperbolic secant of angle.                                                   | `print sech 0`            |
| [sin](https://arturo-lang.io/documentation/library/numbers/sin)                 | Compute the sine of angle.                                                                | `print sin 0`             |
| [sinh](https://arturo-lang.io/documentation/library/numbers/sinh)               | Compute the hyperbolic sine of angle.                                                     | `print sinh 0`            |
| [sqrt](https://arturo-lang.io/documentation/library/numbers/sqrt)               | Obtain square root of value.                                                              | `print sqrt 4`            |
| [sum](https://arturo-lang.io/documentation/library/numbers/sum)                 | Compute the sum of all values in list.                                                    | `print sum [3 4]`         |
| [tan](https://arturo-lang.io/documentation/library/numbers/tan)                 | Compute the tangent of angle.                                                             | `print tan 0`             |
| [tanh](https://arturo-lang.io/documentation/library/numbers/tanh)               | Compute the hyperbolic tangent of angle.                                                  | `print tanh 0`            |
| [tau](https://arturo-lang.io/documentation/library/numbers/tau)                 | The number tau, mathematical constant.                                                    | `inspect tau`             |
