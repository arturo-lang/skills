---
name: arturo-validation
description: "Validate Arturo application data using Schema for structured values/coercion/defaults/faults, or Validator for string formats. Project test runners belong to testing."
metadata:
  arturo-version: 0.10.0
---

# Arturo application data validation

Read only the selected package guide:

- [Schema](references/schema.md): nested values, required/unknown fields, defaults, coercion and fault diagnostics. `check` returns faults without mutation; `coerce` transforms a copy without validating; `conform` returns a coerced valid copy or `null`. Diagnose failure with `check schema (coerce schema value)`.
- [Validator](references/validator.md): string formats; results are logical, not per-field diagnostics.

Check the selected release and minimum runtime; imports may download/evaluate code. Package DSLs may not expose complete `info.get` metadata: use the relevant release source and small fixtures for uncertain behavior. Built-in metadata remains available through `inspect info.get 'name`.

A format check does not establish reachability or identity. Ordinary tests/assertions do not require application-validation packages.
