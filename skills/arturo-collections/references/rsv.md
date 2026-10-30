# RSV serialization

Use [rsv](https://rsv.pkgr.art/) for RSV row data. The 0.1.1 package exposes `_VERSION`, `encode`, and `decode`. Follow its documented namespaced import; importing may download and evaluate the package.

```arturo
rsv: import.lean "rsv"!

rows: @[@["Ada" ""] @["Lin" null]]
encoded: rsv\encode rows
decoded: rsv\decode encoded
ensure [equal? rows decoded]
```

This example combines the documented import and signatures; it has not been executed by the offline smoke suite. Run it with an already installed package before adopting it.

`encode rows :block` requires each row to be a block and each cell to be a string or `null`; invalid cell types fail assertions. Convert application numbers explicitly before serialization. Empty strings and `null` are distinct values. `decode data :string` returns row blocks and throws for a nonempty document without the final row marker.

Construct rows with `@[]` when cells contain expressions or `null`: ordinary blocks retain unevaluated words, so a bare `null` inside an inert row is not the null value that `encode` expects.

This release represents the serialized payload as an Arturo string with control markers, rather than exposing a `:binary` API. Preserve the payload exactly; line splitting, whitespace trimming, or ad hoc CSV escaping will corrupt its framing. Check actual file and transport byte behavior against the consumer's RSV implementation before claiming interoperability. The decoder's end-marker check is not a complete validation guarantee for arbitrary malformed input.

Sources: [package signatures](https://rsv.pkgr.art/), [0.1.1 implementation](https://github.com/asumbek/art-rsv/blob/v0.1.1/rsv.art), [official import reference](https://arturo-lang.io/documentation/library/core/import/).
