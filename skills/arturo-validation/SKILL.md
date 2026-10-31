---
name: arturo-validation
description: Use schema for Arturo structured data validation, nested schemas, coercion, defaults, and fault diagnostics. Use validator for string validation, email, URL, IP, dates, and password rules.
---

# Arturo validation and schemas

Choose validation by the input and required result:

- [Schema](references/schema.md): whole values, nested dictionaries, required and optional fields, unknown keys, structured faults, coercion, defaults, and fixture generation.
- [Validator](references/validator.md): string formats such as email, URL, IP, dates, encodings, and password rules.

Keep data validation distinct from transformation.
- Schema's `check` leaves input unchanged;
- Schema's `coerce` returns a transformed copy without validating it;
- Schema's `conform` coerces and validates, returning a structured fault if the input is invalid.
- Validator returns a `:logical` rather than field-level errors.
