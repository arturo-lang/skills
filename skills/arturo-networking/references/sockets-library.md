---
metadata:
  arturo-version: "0.10.0"
  review-date: "2026-10-29"
  sources:
    - https://arturo-lang.io/documentation/library/sockets
    - https://arturo-lang.io/llms.txt
---

# Sockets: function selection

Use for TCP or UDP transport rather than HTTP abstractions. Socket examples require a peer and are documentation-only here. Bound receiving and connection waits, define message framing, and close accepted client sockets as well as listeners. `.timeout:` on `receive` is documented in milliseconds; inspect every other timeout separately.

Query signatures with `inspect info.get 'accept`; see [runtime inspection](runtime.md) for metadata interpretation.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Requires prepared sockets and a peer; receive/accept can block.

| Name                                                                    | Purpose / when to use                                          | Example                               |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------- |
| [accept](https://arturo-lang.io/documentation/library/sockets/accept)   | Accept incoming connection and return corresponding socket.    | `client: accept server`               |
| [connect](https://arturo-lang.io/documentation/library/sockets/connect) | Create new socket connection to server port.                   | `peer: connect.to: "127.0.0.1" 18966` |
| [listen](https://arturo-lang.io/documentation/library/sockets/listen)   | Start listening on port and return new socket.                 | `server: listen 18966`                |
| [receive](https://arturo-lang.io/documentation/library/sockets/receive) | Receive line of data from selected socket.                     | `receive.timeout: 100 client`         |
| [send](https://arturo-lang.io/documentation/library/sockets/send)       | Send message to selected socket.                               | `send client "hello"`                 |
| [send?](https://arturo-lang.io/documentation/library/sockets/send-)     | Send message to selected socket and return true if successful. | `send? client "hello"`                |
| [unplug](https://arturo-lang.io/documentation/library/sockets/unplug)   | Close socket.                                                  | `unplug client`                       |
