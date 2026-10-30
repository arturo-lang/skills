---

name: arturo-recase
description: Convert Arturo strings between identifier case styles using recase, including Unicode, acronyms, and custom separators.
---

# Identifier case conversion

Use [recase](https://recase.pkgr.art/) when converting names between case conventions. Check the project's package release before depending on acronym or Unicode edge cases. Importing can download a missing package and execute its entrypoint.

```arturo
import "recase"!

recase.snake "This is an example"
; => "this_is_an_example"
recase.camel "Print SQL"
; => "printSQL"
```

The documented API is `recase str :string`, returning a string. Choose one target attribute: `.title`, `.camel`, `.snake`, `.kebab`, `.dot`, `.train`, or `.plain`. `.custom:` accepts a character or string separator. Do not assume `.title` means natural-language title capitalization; the package documents it as `TitleCase`.

Whitespace is stripped during word separation. This transformation is useful for identifiers and labels but does not preserve prose layout. It supports Unicode; converting to ASCII is a separate operation. Keep the source value when reversibility matters, and account for different inputs producing the same converted identifier.

The examples are documentation-based and excluded from offline smoke checks. With the package installed, exercise acronyms, existing separators, whitespace, non-ASCII names, and collisions relevant to the application.

Sources: [package API and examples](https://recase.pkgr.art/), [upstream repository](https://github.com/drkameleon/recase.art), [official import reference](https://arturo-lang.io/documentation/library/core/import/).
