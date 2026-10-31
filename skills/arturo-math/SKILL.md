---
name: arturo-math
description: Implement Arturo arithmetic, statistics, bit operations, unit-aware measurements, conversions, and color transformations.
metadata:
  arturo-version: 0.10.0
---

# Arturo math

Read relevant references: [arithmetic](references/numeric.md#arithmetic), [bitwise](references/numeric.md#bitwise), [numbers](references/numeric.md#numbers), [statistics](references/numeric.md#statistics), [quantities](references/quantities.md#quantities), [colors](references/colors.md#colors), [578 named colors](references/colors.md#named-colors).

- Parenthesize mixed operations; Arturo has no conventional arithmetic precedence. Choose integer/floating division or rational arithmetic explicitly. Check accepted types, domains, mutation forms, angle units, and population/sample estimators.
- Inspect signatures with `inspect info.get 'functionName`; follow [runtime evaluation rules](references/numeric.md#runtime). Use [numeric recipes](references/numeric.md#numeric-recipes) for grouping, conversions, mutation, empty reducers, and failures.
- Preserve units; validate dimensions before extracting scalars. Check `convert`/`in` argument order, precision, and compatibility. Use lower camelCase custom type/unit names. Currency conversion may need external data.
- Use native colors and documented fractional adjustments; verify ranges, hue rotation, and palette attributes without assuming color-space conventions.
- Keep factorization, combinatorics, and random checks bounded. Prefer deterministic offline checks and invariants/tolerances over exact floating strings or GUI checks: [numeric](examples/checks.art), [quantities](examples/quantities.art), [colors](examples/colors.art).
