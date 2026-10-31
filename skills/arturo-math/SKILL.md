---
name: arturo-math
description: Implement Arturo arithmetic, statistics, bit operations, unit-aware measurements, conversions, and color transformations.
metadata:
  arturo-version: 0.10.0
---

# Arturo math

Read relevant references: [arithmetic](references/arithmetic-library.md), [bitwise](references/bitwise-library.md), [numbers](references/numbers-library.md), [statistics](references/statistics-library.md), [quantities](references/quantities-library.md), [colors](references/colors-library.md), [578 named colors](references/color-names.md).

- Parenthesize mixed operations; Arturo has no conventional arithmetic precedence. Choose integer/floating division or rational arithmetic explicitly. Check accepted types, domains, mutation forms, angle units, and population/sample estimators.
- Inspect signatures with `inspect info.get 'functionName`; follow [runtime evaluation rules](references/runtime.md). Use [numeric recipes](references/numeric-recipes.md) for grouping, conversions, mutation, empty reducers, and failures.
- Preserve units; validate dimensions before extracting scalars. Check `convert`/`in` argument order, precision, and compatibility. Use lower camelCase custom type/unit names. Currency conversion may need external data.
- Use native colors and documented fractional adjustments; verify ranges, hue rotation, and palette attributes without assuming color-space conventions.
- Keep factorization, combinatorics, and random checks bounded. Prefer deterministic offline checks and invariants/tolerances over exact floating strings or GUI checks: [numeric](examples/checks.art), [quantities](examples/quantities.art), [colors](examples/colors.art).
