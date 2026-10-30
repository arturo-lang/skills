# Net: function selection

Use for HTTP, downloading, web serving, mail, or opening a browser. Examples here are effectful and documentation-only. Keep destinations and credentials configurable. `request` requires a data argument even for GET (`null` is suitable). Check transport errors, HTTP status, and response shape independently. Verify server routes and lifecycle against the installed runtime.

Query signatures with `inspect info.get 'browse`; see [runtime inspection](runtime.md) for metadata interpretation.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Requires network access, a configured destination, or a server lifecycle.

| Name                                                                  | Purpose / when to use                                      | Example                                                            |
| --------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| [browse](https://arturo-lang.io/documentation/library/net/browse)     | Open URL with default browser.                             | `browse "https://example.com"`                                     |
| [download](https://arturo-lang.io/documentation/library/net/download) | Download file from url to disk.                            | `download "https://example.com/file.txt"`                          |
| [mail](https://arturo-lang.io/documentation/library/net/mail)         | Send mail using subject and message to selected recipient. | `mail.using: settings "recipient@example.com" "Subject" "Message"` |
| [request](https://arturo-lang.io/documentation/library/net/request)   | Perform HTTP request to url with data and get response.    | `request "https://example.com" null`                               |
| [serve](https://arturo-lang.io/documentation/library/net/serve)       | Start web server using routes.                             | `serve.port: 18966 [GET "/" ["hello"]]`                            |

## Sources and verification

Sources: the [official Net module](https://arturo-lang.io/documentation/library/net); [official text reference](https://arturo-lang.io/llms.txt). Reviewed: 2026-10-29. License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Reference version: Arturo 0.10.0 Arizona Bark (amd64/Linux). Metadata: 5 names resolved.
