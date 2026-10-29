---

name: arturo-http-json
description: Implement Arturo HTTP clients and JSON parsing or serialization using request, read.json, and write.json. Use for APIs, response handling, and JSON interchange.
---

# Arturo HTTP and JSON

Read [HTTP and JSON patterns](references/http-json.md). Confirm the endpoint's method, payload, headers, and expected response shape; keep unknown service details explicit.

`request` takes both a URL and data argument; use `null` when there is no payload. Attributes select methods and encodings. A response is not automatically the application object: check null/error, then HTTP status, then parse the body if appropriate.

Use `read.json` for JSON decoding and `write.json` for encoding. Do not use Arturo code evaluation to parse JSON or construct payloads by concatenating unescaped strings. Preserve the difference between missing keys, null, false, and empty collections.

Keep endpoint URLs and credentials configurable. Verify parsing and response handling offline with representative fixtures before performing network requests. Use live calls only within the user's requested scope; avoid live mutation merely to test serialization.

Consult the [official reference](https://arturo-lang.io/llms.txt) for current request attributes and return types. [examples/json.art](examples/json.art) checks JSON interchange without network access.
