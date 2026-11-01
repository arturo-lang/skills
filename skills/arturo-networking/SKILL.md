---
name: arturo-networking
description: "Implement Arturo HTTP clients or built-in services, JSON interchange, TCP/UDP, downloads, mail, and the Claude wrapper. Lanx previews and HTML generation belong to web workflows."
metadata:
  arturo-version: 0.10.0
---

# Arturo networking

For uncertain built-ins, use `inspect info.get 'request` (or the chosen name): positional `args`, optional `attrs`, possible `returns`. Inspection does not make a request. Use a bounded probe for behavior absent from metadata; group expressions explicitly and check literal mutation support.

Load only the needed guide:

- [HTTP/JSON](references/http-json.md): requests, built-in `serve`, Net discovery, transport/status/body distinctions. Untrusted body strings can name resources: stage them privately and parse with `read.file.json`.
- [Sockets](references/sockets-library.md): TCP/UDP framing, timeout units, accepted-client and listener cleanup.
- [Claude](references/claude.md): wrapper release, response shape, mutable defaults; import may download/evaluate code.

Use offline fixtures first: [metadata](examples/checks.art), [JSON](examples/json.art), [response validation](examples/response.art). Run the last in an exclusive temporary directory. Confirm timeout units and shutdown behavior before bounded live checks; keep credentials configurable.

Lanx/HTML tasks do not need this guide unless transport or built-in serving is also involved.
