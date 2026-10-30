# Net: function selection

Use for HTTP, downloading, web serving, mail, or opening a browser. Examples here are effectful and documentation-only. Keep destinations and credentials configurable. `request` requires a data argument even for GET (`null` is suitable). Check transport errors, HTTP status, and response shape independently. Verify server routes and lifecycle against the installed runtime.

For signatures, ask the installed runtime with `inspect info.get 'browse`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Requires network access, a configured destination, or a server lifecycle.

| Name                                                                  | Purpose / when to use                                      | Example                                                            |
| --------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| [browse](https://arturo-lang.io/documentation/library/net/browse)     | Open URL with default browser.                             | `browse "https://example.com"`                                     |
| [download](https://arturo-lang.io/documentation/library/net/download) | Download file from url to disk.                            | `download "https://example.com/file.txt"`                          |
| [mail](https://arturo-lang.io/documentation/library/net/mail)         | Send mail using subject and message to selected recipient. | `mail.using: settings "recipient@example.com" "Subject" "Message"` |
| [request](https://arturo-lang.io/documentation/library/net/request)   | Perform HTTP request to url with data and get response.    | `request "https://example.com" null`                               |
| [serve](https://arturo-lang.io/documentation/library/net/serve)       | Start web server using routes.                             | `serve.port: 18966 [GET "/" ["hello"]]`                            |

## Sources and verification

Reviewed 2026-10-29 against the [official Net module](https://arturo-lang.io/documentation/library/net), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 5 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.
