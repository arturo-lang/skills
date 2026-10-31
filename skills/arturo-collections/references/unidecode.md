# Unicode transliteration

Use [unidecode](https://unidecode.pkgr.art/) for approximate Unicode-to-ASCII conversion. The documented release is 0.0.3. Importing can download a missing package and execute its entrypoint.

```arturo
import "unidecode"!

print unidecode "доброе утро!"
; dobroe utro!
```

`unidecode` takes the input string and returns transliterated text. The conversion is approximate and language-independent; do not describe it as translation, reversible encoding, or guaranteed correct spelling. Preserve the original for display or identity-sensitive data. If generating filenames or slugs, apply the application's separator and collision rules separately.

The example is from the documentation and is excluded from offline smoke checks. With the package installed, verify representative scripts and punctuation from the intended data, including cases where multiple source strings collapse into one result.

Sources: [package documentation](https://unidecode.pkgr.art/), [0.0.3 repository](https://github.com/drkameleon/unidecode.art/tree/v0.0.3), [official import reference](https://arturo-lang.io/documentation/library/core/import/).

See [third-party notices](../THIRD-PARTY-NOTICES.md#unidecode) for attribution, licenses, and reviewed revisions.
