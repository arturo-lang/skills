# HTTP and JSON patterns

## JSON

Decode text with `data: read.json jsonText` and a local JSON file with `data: read.json "data.json"`. Use fixture content or a known path deliberately because `read` accepts several input forms.

Encode to a file with `write.json data "data.json"`. The official examples use `write.json data null` to obtain serialized text without a destination. Verify that behavior on the target interpreter when using the result in another call. Dictionaries become objects; blocks become arrays. Check application field types after parsing.

## Requests

Basic forms (illustrative; these contact a remote service):

```arturo
response: request.timeout: 5000 "https://httpbin.org/get" null
response: request.post.json "https://httpbin.org/post" #[name: "Ada"]
```

`request` defaults to GET. It also supports `.post`, `.put`, `.patch`, `.delete`, `.json`, `.headers:`, and `.timeout:`. Do not infer timeout units solely from the attribute name; confirm them for the installed runtime before choosing a production value. The numeric value above is illustrative.

For a returned dictionary, inspect `response\status`, `response\headers`, and `response\body`. A successful transport can still return an unsuccessful HTTP status. Validate an acceptable status before `read.json response\body`; a body can be empty or non-JSON even when the service usually returns JSON.

Wrap transport or parsing operations in `try` when the caller should recover. The wrapper yields null/error; assign a desired response inside its action. Handle a null response separately before accessing members. Avoid unlimited retries, and do not automatically retry non-idempotent writes.

`read "https://..."` is a short way to fetch content when metadata is unnecessary, as demonstrated upstream. Prefer `request` when status, headers, a method, or a timeout matters. Server implementation with `serve` is a separate API: inspect Net/serve rather than adapting the client interface.

## Sources

- [Official reference](https://arturo-lang.io/llms.txt): Net/request; Files/read, write; Exceptions/try; Collections/key?.
- [JSON example](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/JSON.art).
- [HTTP example](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/HTTP.art).
