# Numeric grouping, conversion, and boundaries

Use these patterns when porting arithmetic or accepting numeric input. [checks.art](../examples/checks.art) asserts the contrasts below without network or filesystem effects.

## Group before calculating

`2 * 3 + 4` yields 14: the addition supplies the second operand of multiplication. `(2 * 3) + 4` yields 10. Prefix form `mul 2 add 3 4` also yields 14. Choose parentheses or named intermediate results to express the intended calculation.

`div 5 2` returns integer 2; `fdiv 5 2` returns floating 2.5. Neither choice is implicit in `/`, which aliases `div`. Check a divisor before division or catch the operation's error; the example asserts that integer division by zero fails.

`increased: add amount 2` leaves `amount` unchanged. `add 'amount 2` mutates that binding. Do not expect the mutation form to provide the same returned value as the value form.

## Convert inputs explicitly

Use `to :integer "42"` for a numeric string and `to :floating 4` for floating representation. `to :integer 4.9` yields 4 and `to :integer neg 4.9` yields -4 on the checked runtime: this truncates toward zero rather than rounding to the nearest integer. Malformed input such as `"not-a-number"` raises an error; use `try` and inspect its error result before continuing. Do not silently replace invalid input with zero.

Convert before combining unlike types: `(to :string 4) ++ " units"`. Without parentheses, the concatenation is attempted before conversion. Native `convert` instead converts quantities to units; it is not the general type converter.

## Decide what an empty dataset means

`sum []` returns 0 and `product []` returns 1. These are useful identities, not evidence that every statistical function accepts an empty dataset. `average []` raises an error on the checked runtime. Guard emptiness and choose an application policy (for example, no result) rather than assigning an invented mean of zero.

A singleton has an average equal to its element and population variance zero. `variance` uses population variance by default; `.sample` changes the estimator: `[1 3]` has sample variance 2.0. Require at least two elements when your task calls for sample variance. The checked runtime returns 0.0 for a singleton sample instead of raising an error; that returned number does not make the estimator mathematically defined. Non-finite numbers, overflow, arbitrary precision, and mixed numeric-type combinations remain outside these assertions.

## Sources and verification

Reviewed 2026-10-30 against the [official language guide](https://arturo-lang.io/documentation/language), and `to`, `convert`, `div`, `fdiv`, `sum`, `product`, `average`, and `variance` in the [official text reference](https://arturo-lang.io/llms.txt). Guidance condenses and adapts documentation by Yanis Zafirópulos and the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); the bounded checks are original examples.

Executed with assertions using `arturo --no-color examples/checks.art` from this skill directory on Arturo 0.10.0 Arizona Bark, amd64/Linux (2026-10-30). Expected stdout: `math ok`; no stderr. This verifies only the cases stated here, not every numeric API or platform.

Additional behavioral examples are available in the [official Arturo unit tests](https://github.com/arturo-lang/arturo/tree/master/tests/unitt).
