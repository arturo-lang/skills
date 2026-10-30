---

name: arturo-math
description: Implement Arturo arithmetic, statistics, bit operations, unit-aware measurements, conversions, and color transformations.
---

# Arturo math, quantities, and colors

Read only the module reference relevant to the task:

- [Arithmetic](references/arithmetic-library.md): 11 functions, predicates, or constants.
- [Bitwise](references/bitwise-library.md): 9 functions, predicates, or constants.
- [Numbers](references/numbers-library.md): 60 functions, predicates, or constants.
- [Statistics](references/statistics-library.md): 6 functions, predicates, or constants.

Choose integer division, floating division, or rational arithmetic deliberately. Parenthesize mixed operations: Arturo has no conventional arithmetic precedence. Inspect accepted types, numeric domains, mutation forms, angle units, and population versus sample estimators. Keep factorization, combinatorics, and random checks bounded; test invariants and tolerances instead of exact floating strings.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks.

## units and dimensional quantities

Preserve units through computation and validate dimensions before extracting scalar values. Inspect convert versus in argument order. Keep custom type/unit names lower camelCase. Check precision and unit compatibility with bounded examples; currency conversions may require external data and are outside offline smoke checks.

- [Quantities](references/quantities-library.md).

[Offline checks](examples/quantities.art).

## color transformations

Use native color values and documented fractional adjustments. Inspect hue rotation and palette attributes rather than importing color-space assumptions. Check actual values and accepted ranges; prefer deterministic offline transforms to GUI-based checks.

- [Colors](references/colors-library.md).

[Offline checks](examples/colors.art).
