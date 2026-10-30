---
name: arturo-networking
description: Implement Arturo HTTP clients and services, JSON interchange, downloads, mail, TCP, UDP, and Claude API integrations.
---

# Arturo HTTP, JSON, and networking

Additional relevant examples are available in the [official Arturo examples repository](https://github.com/arturo-lang/examples).

Read only the module reference relevant to the task:

- [Net](references/net-library.md).
- [Sockets](references/sockets-library.md).

Establish protocol, addresses, payloads, framing, timeout units, and shutdown behavior. Inspect the runtime before choosing attributes. Socket receive/accept may block; close listeners and accepted peers. HTTP status and JSON parsing are separate from transport success. Use offline metadata checks by default, then bounded local peers or services when the task warrants network execution. Mail delivery and external mutations need the actual task context, never a smoke test.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; see [runtime guidance](references/runtime.md) for metadata and evaluation rules; verify unfamiliar behavior against official sources.

[examples/checks.art](examples/checks.art) supplies bounded offline checks.

## HTTP and JSON

Read [HTTP and JSON patterns](references/http-json.md) for client requests and serialization. Confirm method, payload, headers, and response shape. Keep credentials configurable; distinguish transport errors, HTTP status, and application data. Preserve missing keys, null, false, and empty collections. Use offline fixtures before live calls; avoid live mutations just to test serialization.

[Offline checks](examples/json.art).

## External API clients

Read [Claude](references/claude.md) for the Arturo Anthropic API wrapper, message construction, responses, and mutable client defaults. Verify response handling with fixtures before live requests. Package examples are source-derived; offline smoke checks do not install the package or call the API.
