---
name: arturo-math
description: "Implement Arturo numeric algorithms, statistics, bitwise operations, dimensional quantities, conversions, and color transformations."
metadata:
  arturo-version: 0.10.0
---

# Arturo math

For uncertain built-ins, use `inspect info.get 'name`: positional `args`, optional `attrs`, possible `returns`. Probe relevant behavior; metadata is not proof of edge cases. Unknown names are discoverable through the official modules in these guides.

Load only the relevant section: [numeric recipes](references/numeric.md#numeric-recipes), [arithmetic](references/numeric.md#arithmetic), [bitwise](references/numeric.md#bitwise), [numbers](references/numeric.md#numbers), [statistics](references/numeric.md#statistics), [quantities](references/quantities.md), or [colors](references/colors.md). Look up [named spellings](references/color-names.md) only when needed.

Parenthesize mixed expressions; `/` is integer division and `fdiv` is floating division. Check empty/sample statistics and accepted types. Preserve units until dimension checks pass; `convert value unit` and `in unit value` reverse argument order. Color adjustments use documented fractions.

Bound expensive computations. Verify with tolerances/invariants where appropriate: [numeric](examples/checks.art), [quantities](examples/quantities.art), [colors](examples/colors.art). Runtime interpretation is covered [here](references/numeric.md#runtime).
