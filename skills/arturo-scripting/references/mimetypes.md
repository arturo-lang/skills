# MIME lookup

Use [mimetypes](https://mimetypes.pkgr.art/) for extension-based MIME lookup. The interface below is verified against 0.0.4. Importing can download a missing package and execute its entrypoint.

```arturo
import "mimetypes"!

mimetype "somefile.jpg" ; ["image/jpeg"]
mimetype "boom"         ; []
mimetype.extensions "image/jpeg"
; ["jpe" "jpeg" "jpg"]
```

`mimetype location :string` accepts an extension or filepath and normally returns a block of possible MIME strings. `.extensions` reverses the lookup and returns sorted extensions. Unknown inputs return an empty block; choose an application fallback explicitly.

`.best` changes the return shape: the 0.0.4 implementation returns a single string on a match and an empty block on a miss, despite the reference's blanket `:block` return description. Handle both cases before setting a header. Do not assume a list's first entry is the same as `.best`; the implementation chooses the last match.

Lookup uses a bundled database derived from mime-db. It does not inspect file bytes, prove the content matches the extension, or validate an upload. Normalize input casing deliberately when the application requires it; do not assume the implementation normalizes extensions.

These documentation-based examples are excluded from offline smoke checks. Once installed, test known, unknown, ambiguous, and uppercase extensions relevant to the application.

Sources: [package reference](https://mimetypes.pkgr.art/), [0.0.4 implementation](https://github.com/drkameleon/mimetypes.art/blob/v0.0.4/src/mimetypes.art), [official import reference](https://arturo-lang.io/documentation/library/core/import/).

See [third-party notices](../THIRD-PARTY-NOTICES.md#mimetypes) for attribution, licenses, and reviewed revisions.
