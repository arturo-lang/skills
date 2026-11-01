---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/ui
    - https://arturo-lang.io/llms.txt
---

# Ui: function selection

Use for native dialogs, notifications, clipboard access, and webviews. These operations need a supported desktop/runtime build and may block or alter user state. Examples are documentation-only here; do not invoke GUI or clipboard functions just to discover their signatures.

Query signatures with `inspect info.get 'alert`; see [runtime inspection](runtime.md) for metadata interpretation.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Requires a supported desktop and explicit interaction.

For unknown function names, use [the ui module](https://arturo-lang.io/documentation/library/ui). Query the selected built-in with `inspect info.get 'name`; use a bounded probe for behavior absent from metadata.
