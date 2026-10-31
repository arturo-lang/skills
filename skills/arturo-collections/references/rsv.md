---
metadata:
  author: "Komo (asumbek)"
  license: "MIT"
  package-version: "0.1.1"
  arturo-version: "0.10.0"
  review-date: "2026-10-29"
  sources:
    - https://rsv.pkgr.art/
    - https://github.com/asumbek/art-rsv/blob/v0.1.1/rsv.art
    - https://arturo-lang.io/documentation/library/core/import/
---

# RSV serialization

Use [rsv](https://rsv.pkgr.art/) for RSV row data. The package exposes `_VERSION`, `encode`, and `decode`. Follow its documented namespaced import; importing may download and evaluate the package.

```art
rsv: import.lean "rsv"!

rows: @[@["Ada" ""] @["Lin" null]]
encoded: rsv\encode rows
decoded: rsv\decode encoded
ensure [equal? rows decoded]
```

Run it with an already installed package before adopting it.

`encode rows :block` requires each row to be a block and each cell to be a string or `null`; invalid cell types fail assertions. Convert application numbers explicitly before serialization. Empty strings and `null` are distinct values. `decode data :string` returns row blocks and throws for a nonempty document without the final row marker.

Construct rows with `@[]` when cells contain expressions or `null`: ordinary blocks retain unevaluated words, so a bare `null` inside an inert row is not the null value that `encode` expects.

This release represents the serialized payload as an Arturo string with control markers, rather than exposing a `:binary` API. Preserve the payload exactly; line splitting, whitespace trimming, or ad hoc CSV escaping will corrupt its framing.

Check actual file and transport byte behavior against the consumer's RSV implementation before claiming interoperability. The decoder's end-marker check is not a complete validation guarantee for arbitrary malformed input.
