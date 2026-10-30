# Colors: function selection

Use for color values, hue/saturation transformations, and palettes. Amounts for darkening, lightening, and saturation changes are documented as fractions from 0.0 to 1.0; `spin` uses a hue-wheel amount. Do not infer perceptual color-space behavior from another library.

For signatures, ask the installed runtime with `inspect info.get 'blend`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

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

Reviewed 2026-10-29 against the [official Colors module](https://arturo-lang.io/documentation/library/colors), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 9 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 9 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
