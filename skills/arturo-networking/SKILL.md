---
name: arturo-networking
description: Implement Arturo HTTP clients and services, JSON interchange, downloads, mail, TCP, UDP, and Claude API integrations.
metadata:
  arturo-version: 0.10.0
---

# Arturo networking

Read the reference for the task:

- [HTTP, JSON, and Net helpers](references/http-json.md): requests, response validation, serialization, downloads, mail, browser launch, and serving.
- [Sockets](references/sockets-library.md): TCP/UDP connections, framing, timeouts, and cleanup.
- [Claude](references/claude.md): the Anthropic wrapper, messages, responses, and mutable client defaults.

Establish protocol, addresses, payloads, timeout units, and shutdown behavior. Keep credentials configurable. Distinguish transport failure, HTTP status, and application data. For untrusted JSON bodies, stage text in a private scratch file and parse with `read.file.json`; `read.json` can load a path or URL. The HTTP guide covers validation and cleanup.

Start with offline fixtures and metadata checks. Use bounded peers or services when network execution is needed; send mail, mutate external data, or make paid API calls only as required by the task.

## Runtime and evaluation

Check `arturo --version` and inspect signatures without invoking network operations: `inspect info.get 'request`. `info.get` returns metadata; inspecting a literal identifier alone does not retrieve a function signature. Read positional `args` in order, alternative types per argument, optional `attrs`, and possible `returns` (`:nothing` means no result). Attributes do not add positional arguments. Verify uncertain behavior on the target runtime.

Expressions group right to left and function arity determines argument boundaries; an infix alias does not establish conventional precedence. Blocks remain data until evaluated, and evaluated blocks do not necessarily create scope. Supported literal arguments enable mutation; use `new` for an independent copy.

Runtime guidance reviewed 2026-10-29: [inspect](https://arturo-lang.io/documentation/library/reflection/inspect), [info](https://arturo-lang.io/documentation/library/reflection/info), and the [language guide](https://arturo-lang.io/documentation/language).

## Offline examples

- [checks.art](examples/checks.art): bounded signature checks.
- [json.art](examples/json.art): serialization assertions.
- [response.art](examples/response.art): response validation, malformed inputs, failed staging, and scratch-file cleanup; run in a fresh temporary working directory.
