# Paths: function selection

Use for path resolution, components, listing, and normalization. `absolute` and `relative` refer to the script’s location as documented; test from a different working directory before assuming resolution behavior. `extract` also supports URLs and colors through attributes. Keep platform-specific separators and home expansion explicit.

For signatures, ask the installed runtime with `inspect info.get 'absolute`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

| Name                                                                      | Purpose / when to use                                              | Example                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------- |
| [absolute](https://arturo-lang.io/documentation/library/paths/absolute)   | Obtain absolute path for path, based on current script's location. | `absolute "input.txt"`                |
| [absolute?](https://arturo-lang.io/documentation/library/paths/absolute-) | Test whether path is an absolute path.                             | `absolute? "/usr/bin"`                |
| [extract](https://arturo-lang.io/documentation/library/paths/extract)     | Extract components from path, url, or color.                       | `extract.extension "folder/file.art"` |
| [list](https://arturo-lang.io/documentation/library/paths/list)           | Obtain files in path.                                              | `list "."`                            |
| [normalize](https://arturo-lang.io/documentation/library/paths/normalize) | Obtain normalized version of path.                                 | `normalize "one/../two"`              |
| [relative](https://arturo-lang.io/documentation/library/paths/relative)   | Obtain relative path for path, based on current script's location. | `relative "helpers.art"`              |

## Sources and verification

Reviewed 2026-10-29 against the [official Paths module](https://arturo-lang.io/documentation/library/paths), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 6 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.
