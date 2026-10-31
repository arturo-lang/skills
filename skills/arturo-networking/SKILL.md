---
name: arturo-networking
description: Implement Arturo HTTP clients and services, JSON interchange, downloads, mail, TCP, UDP, and Claude API integrations.
metadata:
  arturo-version: "0.10.0"
---

# Arturo HTTP, JSON, and networking

Read the relevant module:

- [Net](references/net-library.md).
- [Sockets](references/sockets-library.md).

Establish protocol, addresses, payloads, framing, timeout units, and shutdown behavior. Inspect the runtime before choosing attributes. Socket receive/accept may block; close listeners and accepted peers. HTTP status and JSON parsing are separate from transport success.

Use offline metadata checks by default, then bounded local peers or services when the task warrants network execution. Send mail or mutate external data only when the task requires it.

Query runtime signatures with `inspect info.get 'functionName`; see [runtime guidance](references/runtime.md) for metadata and evaluation rules.

[examples/checks.art](examples/checks.art) supplies bounded offline checks.

## HTTP and JSON

Read [HTTP and JSON patterns](references/http-json.md) for client requests and serialization. Confirm method, payload, headers, and response shape. Keep credentials configurable; distinguish transport errors, HTTP status, and application data. Preserve missing keys, null, false, and empty collections.

Use offline fixtures before live calls; avoid live mutations just to test serialization.

[Offline serialization checks](examples/json.art). For a complete response-processing workflow with malformed inputs, failed staging, and scratch-file cleanup, use [response.art](examples/response.art) with the [HTTP and JSON guide](references/http-json.md).

Treat `read.json` as a resource loader: stage untrusted body text and parse the known file with `read.file.json` rather than allowing body text to select a resource.

## External API clients

Read [Claude](references/claude.md) for the Arturo Anthropic API wrapper, message construction, responses, and mutable client defaults. Verify response handling with fixtures before live requests.
