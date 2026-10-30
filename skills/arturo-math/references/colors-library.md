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

## Sources and verification

Sources: the [official Colors module](https://arturo-lang.io/documentation/library/colors); [official text reference](https://arturo-lang.io/llms.txt). Reviewed: 2026-10-29. License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Reference version: Arturo 0.10.0 Arizona Bark (amd64/Linux). Metadata: 9 names resolved.

Checks: 9 fragments passed (exit 0, no stderr); outputs and edge cases unasserted. Null supplied for unbound predicate inputs.

Additional checks reviewed and asserted 2026-10-30: [colors.art](../examples/colors.art) verifies the exact red/blue blend, `.balance:` endpoints 0.0 and 1.0, and darkening red by 0.2 to `#CC0000`. Darkening by 0.0 preserves the color and by 1.0 produces black. A value argument leaves the source unchanged; a literal argument changes the binding. These original bounded adaptations follow the official `blend` and `darken` reference entries above. Executed on Arturo 0.10.0 amd64/Linux; stdout `colors ok`, no stderr. Out-of-range adjustment amounts and perceptual color-space assumptions remain unverified; keep fractional amounts within the documented range.
