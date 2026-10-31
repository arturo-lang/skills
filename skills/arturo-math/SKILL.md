---
name: arturo-math
description: Implement Arturo arithmetic, statistics, bit operations, unit-aware measurements, conversions, and color transformations.
metadata:
  arturo-version: "0.10.0"
---

# Arturo math, quantities, and colors

Read the relevant module:

- [Arithmetic](references/arithmetic-library.md).
- [Bitwise](references/bitwise-library.md).
- [Numbers](references/numbers-library.md).
- [Statistics](references/statistics-library.md).

Choose integer division, floating division, or rational arithmetic deliberately. Parenthesize mixed operations: Arturo has no conventional arithmetic precedence. Inspect accepted types, numeric domains, mutation forms, angle units, and population versus sample estimators.

Keep factorization, combinatorics, and random checks bounded; test invariants and tolerances instead of exact floating strings.

Query runtime signatures with `inspect info.get 'functionName`; see [runtime guidance](references/runtime.md) for metadata and evaluation rules.

[Numeric recipes](references/numeric-recipes.md) contrast grouping, explicit conversions, mutation, empty reducers, and failed numeric operations. [examples/checks.art](examples/checks.art) supplies bounded offline assertions for these cases.

## units and dimensional quantities

Preserve units through computation and validate dimensions before extracting scalar values. Inspect convert versus in argument order. Keep custom type/unit names lower camelCase. Check precision and unit compatibility with bounded examples; currency conversions may require external data.

- [Quantities](references/quantities-library.md).

[Offline checks](examples/quantities.art).

## color transformations

Use native color values and documented fractional adjustments. Inspect hue rotation and palette attributes rather than importing color-space assumptions. Check actual values and accepted ranges; prefer deterministic offline transforms to GUI-based checks.

- [Colors](references/colors-library.md).
- [Named colors](references/color-names.md): the 578 native `#name` literals in the source catalog.

[Offline checks](examples/colors.art).
