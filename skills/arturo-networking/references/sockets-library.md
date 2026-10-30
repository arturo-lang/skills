# Sockets: function selection

Use for TCP or UDP transport rather than HTTP abstractions. Socket examples require a peer and are documentation-only here. Bound receiving and connection waits, define message framing, and close accepted client sockets as well as listeners. `.timeout:` on `receive` is documented in milliseconds; inspect every other timeout separately.

For signatures, ask the installed runtime with `inspect info.get 'accept`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

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

## Sources and verification

Reviewed 2026-10-29 against the [official Sockets module](https://arturo-lang.io/documentation/library/sockets), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 7 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.
