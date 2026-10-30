---

name: arturo-validation
description: Use schema for Arturo structured data validation, nested schemas, coercion, defaults, and fault diagnostics. Use validator for string validation, email, URL, IP, dates, and password rules.
---

# Arturo validation and schemas

Start with [schema](references/schema.md) for structured inputs or [validator](references/validator.md) for string formats, including when the request names only the validation task.

Choose validation by the input and required result:

- [Schema](references/schema.md): whole values, nested dictionaries, required and optional fields, unknown keys, structured faults, coercion, defaults, and fixture generation.
- [Validator](references/validator.md): string formats such as email, URL, IP, dates, encodings, and password rules.

Keep validation distinct from transformation: schema's `check` leaves input unchanged, `coerce` returns a transformed copy without validating it, and `conform` coerces and validates. Preserve fault paths and codes when callers need structured diagnostics. Validator returns a logical rather than field-level errors.

Test valid, invalid, omitted, and unexpected inputs against the installed release. Format validity does not establish existence or ownership. Package imports may download and evaluate code; the examples are documentation-derived and excluded from the offline smoke suite.
