---
metadata:
  arturo-version: "0.10.0"
  review-date: "2026-10-30"
  sources:
    - https://arturo-lang.io/documentation/language
    - https://arturo-lang.io/llms.txt
---

# Numeric grouping, conversion, and boundaries

Use these patterns when porting arithmetic or accepting numeric input. [checks.art](../examples/checks.art) asserts the contrasts below without network or filesystem effects.

## Group before calculating

`2 * 3 + 4` yields 14: the addition supplies the second operand of multiplication. `(2 * 3) + 4` yields 10. Prefix form `mul 2 add 3 4` also yields 14. Choose parentheses or named intermediate results to express the intended calculation.

`div 5 2` returns integer 2; `fdiv 5 2` returns floating 2.5. Neither choice is implicit in `/`, which aliases `div`. Check a divisor before division or catch the operation's error; integer division by zero raises an error.

`increased: add amount 2` leaves `amount` unchanged. `add 'amount 2` mutates that binding. Do not expect the mutation form to provide the same returned value as the value form.

## Convert inputs explicitly

Use `to :integer "42"` for a numeric string and `to :floating 4` for floating representation. `to :integer 4.9` yields 4 and `to :integer neg 4.9` yields -4 on Arturo 0.10.0: this truncates toward zero rather than rounding to the nearest integer.

Malformed input such as `"not-a-number"` raises an error; use `try` and inspect its error result before continuing. Do not silently replace invalid input with zero.

The checks assert that a failed conversion leaves both its input string and the previous destination binding unchanged; the preserved destination is not a successful parse result.

Convert before combining unlike types: `(to :string 4) ++ " units"`. Without parentheses, the concatenation is attempted before conversion. Native `convert` instead converts quantities to units; it is not the general type converter.

## Decide what an empty dataset means

`sum []` returns 0 and `product []` returns 1. These are useful identities, not evidence that every statistical function accepts an empty dataset. `average []` raises an error on Arturo 0.10.0 without changing the empty input.

Guard emptiness and choose an application policy (for example, no result) rather than assigning an invented mean of zero.

The normal-case checks also assert that `average`, `variance`, and `median sort samples` leave the original unsorted input unchanged; `sort samples` supplies a sorted result rather than sorting the input binding in place.

A singleton has an average equal to its element and population variance zero. `variance` uses population variance by default; `.sample` changes the estimator: `[1 3]` has sample variance 2.0. Require at least two elements when your task calls for sample variance.

Arturo 0.10.0 returns 0.0 for a singleton sample; the sample estimator is still mathematically undefined. Check overflow, non-finite values, and mixed numeric types for the intended inputs.

Upstream [type-conversion tests](https://github.com/arturo-lang/arturo/blob/master/tests/unitt/lib/types/to.test.art) provide additional conversion examples.
