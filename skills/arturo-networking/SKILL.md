---

name: arturo-networking
description: Build Arturo network integrations using Net and Sockets for HTTP services, downloads, mail, TCP or UDP clients, and listeners. Use for network transport and server lifecycles beyond offline data processing.
---

# Arturo network utilities and sockets

Read only the module reference relevant to the task:

- [Net](references/net-library.md): 5 functions, predicates, or constants.
- [Sockets](references/sockets-library.md): 7 functions, predicates, or constants.

Establish protocol, addresses, payloads, framing, timeout units, and shutdown behavior. Inspect the runtime before choosing attributes. Socket receive/accept may block; close listeners and accepted peers. HTTP status and JSON parsing are separate from transport success. Use offline metadata checks by default, then bounded local peers or services when the task warrants network execution. Mail delivery and external mutations need the actual task context, never a smoke test.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks. These checks do not imply that network, GUI, or persistent operations have been executed.
