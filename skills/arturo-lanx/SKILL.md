---

name: arturo-lanx
description: Serve static folders from Arturo with the lanx package or CLI, configuring the document root and port and checking index files, listings, and MIME responses.
---

# Lanx static file server

Use [Lanx](https://lanx.pkgr.art/) to serve a static directory. The registry version checked is 0.2.0. The upstream [README](https://github.com/drkameleon/lanx/blob/0d539d467f17671a7f2b873bbaff6492629d7cfd/README.md) documents CLI usage: `lanx` serves the current directory; `lanx ./public` serves a selected folder. Verify package installation and executable discovery before relying on the command. Do not infer flags from another static server.

## Embedded server

This prepares configuration without starting a listener; import may download and execute the package and its `mimetypes` dependency:

```arturo
import 'lanx!
server: to :lanx []!
server\root: "./public"
server\port: 8080
print server\port
```

Call `server\start` separately to begin serving. Object field assignments mutate this server instance. The default root is the current directory and default port is 18966. `start` resolves a relative root against the current working directory and mutates it to an absolute normalized path. An invalid root prints an error and exits the process; validate it before embedding in a larger application.

## Response behavior

An existing directory redirects to a trailing slash, then serves `index.html` if present, otherwise a generated listing. Missing paths return 404. Files are read as binary; the implementation uses the `mimetypes` package to choose the first MIME match and falls back to `application/octet-stream`. Binary handling differs across Arturo versions in the reviewed source; include an image or other binary fixture when verifying the user's runtime.

Choose a document root containing only the intended public assets. Directory listings hide hidden entries, but this is not an access-control guarantee for direct file requests. The reviewed public interface configures root and port, with no documented host-binding, authentication, or TLS option. Do not claim it binds exclusively to loopback.

For a bounded manual integration check, use a disposable folder containing one HTML and one binary fixture, request those paths plus a missing path, then stop the server. Keep ordinary checks offline by inspecting configuration without calling `start`. These examples were checked against upstream source, not executed with downloaded packages.

Sources: [server implementation](https://github.com/drkameleon/lanx/blob/0d539d467f17671a7f2b873bbaff6492629d7cfd/src/lanx.art), [CLI implementation](https://github.com/drkameleon/lanx/blob/0d539d467f17671a7f2b873bbaff6492629d7cfd/src/cli.art), and [Arturo import reference](https://arturo-lang.io/documentation/library/core/import/).
