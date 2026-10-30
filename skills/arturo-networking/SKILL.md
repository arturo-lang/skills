---

name: arturo-networking
description: Implement Arturo HTTP clients and services, JSON interchange, downloads, mail, TCP, and UDP integrations.
---

# Arturo HTTP, JSON, and networking

Read only the module reference relevant to the task:

- [Net](references/net-library.md): 5 functions, predicates, or constants.
- [Sockets](references/sockets-library.md): 7 functions, predicates, or constants.

Establish protocol, addresses, payloads, framing, timeout units, and shutdown behavior. Inspect the runtime before choosing attributes. Socket receive/accept may block; close listeners and accepted peers. HTTP status and JSON parsing are separate from transport success. Use offline metadata checks by default, then bounded local peers or services when the task warrants network execution. Mail delivery and external mutations need the actual task context, never a smoke test.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks.

## HTTP and JSON

Read [HTTP and JSON patterns](references/http-json.md) for client requests and serialization. Confirm method, payload, headers, and response shape. Keep credentials configurable; distinguish transport errors, HTTP status, and application data. Preserve missing keys, null, false, and empty collections. Use offline fixtures before live calls; avoid live mutations just to test serialization.

[Offline checks](examples/json.art).
