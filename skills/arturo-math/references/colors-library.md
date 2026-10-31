---
metadata:
  arturo-version: "0.10.0"
  review-date: "2026-10-29"
  sources:
    - https://arturo-lang.io/documentation/library/colors
    - https://arturo-lang.io/llms.txt
---

# Colors: function selection

Use for color values, hue/saturation transformations, and palettes. Amounts for darkening, lightening, and saturation changes are documented as fractions from 0.0 to 1.0; `spin` uses a hue-wheel amount. Do not infer perceptual color-space behavior from another library.

For literal spellings, use the [named-color catalog](color-names.md). `#aliceBlue` is a color; `#[name: "Ada"]` is a dictionary.

Query signatures with `inspect info.get 'blend`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                         | Purpose / when to use                      | Example                   |
| ---------------------------------------------------------------------------- | ------------------------------------------ | ------------------------- |
| [blend](https://arturo-lang.io/documentation/library/colors/blend)           | Blend colors.                              | `blend #red #CCCCCC`      |
| [darken](https://arturo-lang.io/documentation/library/colors/darken)         | Darken color by percentage (0.0-1.0).      | `darken #red 0.2`         |
| [desaturate](https://arturo-lang.io/documentation/library/colors/desaturate) | Desaturate color by percentage (0.0-1.0).  | `desaturate #red 0.2`     |
| [grayscale](https://arturo-lang.io/documentation/library/colors/grayscale)   | Convert color to grayscale.                | `grayscale #red`          |
| [invert](https://arturo-lang.io/documentation/library/colors/invert)         | Obtain complement for color.               | `invert #orange`          |
| [lighten](https://arturo-lang.io/documentation/library/colors/lighten)       | Lighten color by percentage (0.0-1.0).     | `lighten #lightblue 0.2`  |
| [palette](https://arturo-lang.io/documentation/library/colors/palette)       | Create palette using base color.           | `palette.triad #red`      |
| [saturate](https://arturo-lang.io/documentation/library/colors/saturate)     | Saturate color by percentage (0.0-1.0).    | `saturate #lightblue 0.2` |
| [spin](https://arturo-lang.io/documentation/library/colors/spin)             | Spin color around the hue wheel by amount. | `spin #red 90`            |

Darkening by 0.0 preserves the color; 1.0 produces black. A value argument returns a result; a literal argument changes the binding. Keep fractional adjustments within the documented range.
