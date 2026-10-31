---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-30
  sources:
    - https://arturo-lang.io/documentation/language
    - https://arturo-lang.io/llms.txt
---

# Numeric recipes

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
