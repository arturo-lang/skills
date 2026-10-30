---

name: arturo-schema
description: Validate and coerce structured Arturo values with the schema package, including nested fields, faults, defaults, and generated fixtures.
---

# Schema validation

Use [schema](https://schema.pkgr.art/) for whole-value validation. The documented interface here is 0.3.0 and requires Arturo 0.10.0 or newer. Check the project's installed release before changing existing schemas. Importing a missing package can download it and executes its entrypoint.

```arturo
import "schema"!

settings: #[
    port: [:integer between: 1024..65535]
    role: [:string default: "viewer"]
]

conform settings #[port: "8080"]
; => #[port: 8080 role: "viewer"]
conform settings #[port: "80"]
; => null
```

This is a documentation-based example, not part of the offline smoke suite. With the package already available, check valid, invalid, missing-field, and unexpected-field cases locally.

- `check schema value` returns a block of fault dictionaries; an empty block means valid. `check?` returns a logical. `explain faults` renders those faults for people. Preserve `path` and `code` for programmatic error handling.
- Fields are required and unknown keys are rejected by default. `opt` or `optional` permits omission. `.open` on `check`, `check?`, or `conform` permits unknown keys recursively.
- Constraint blocks are inert data, not executable predicates. Use bare type literals and the documented labels `min:`, `max:`, `between:`, `in:`, `size:`, `matches:`, and `of:`. The package resolves supported named schemas, ranges, and dictionary forms inside these blocks.
- Numeric bounds compare values; other bounds compare lengths. `of:` accepts a nested dictionary schema or an element constraint block. Regex matching covers the entire string, unlike a substring search.
- `check` changes nothing. `coerce` returns a transformed copy without judging validity; `conform` coerces, checks, and returns the copy or `null`. Defaults apply only during coercion. Text parses into supported scalars; arbitrary values do not coerce into strings. To diagnose failed conformance, check the coerced value.
- `example schema` is deterministic; `.random` varies fixtures. Regex and unsupported-type generation need an explicit `example:` value. Validate generated fixtures before relying on them.

Sources: [tagged README and examples](https://github.com/Lulzx/schema.art/tree/v0.3.0), [official import reference](https://arturo-lang.io/documentation/library/core/import/).
