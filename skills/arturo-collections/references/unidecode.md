---
metadata:
  author: Yanis Zafirópulos (drkameleon)
  license: MIT
  package-version: 0.0.3
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://unidecode.pkgr.art/
    - https://github.com/drkameleon/unidecode.art/tree/v0.0.3
    - https://arturo-lang.io/documentation/library/core/import/
---

# Unicode transliteration

Use unidecode for approximate Unicode-to-ASCII conversion. Importing can download a missing package and execute its entrypoint.

```art
import "unidecode"!

print unidecode "доброе утро!"
; dobroe utro!
```

`unidecode` takes the input string and returns transliterated text. The conversion is approximate and language-independent; do not describe it as translation, reversible encoding, or guaranteed correct spelling. Preserve the original for display or identity-sensitive data.

If generating filenames or slugs, apply the application's separator and collision rules separately.

With the package installed, verify representative scripts and punctuation from the intended data, including cases where multiple source strings collapse into one result.
