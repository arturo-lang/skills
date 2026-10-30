# Crypto: function selection

Use for encodings, checksums, and hashes exposed by this runtime. Base64 and URL encoding are representations, not encryption. CRC and generic hashes are not authenticity checks. `digest` defaults to MD5 and `.sha` selects SHA1; these are compatibility functions, not a password-storage or modern security design. Avoid assuming unsupported algorithms.

For signatures, ask the installed runtime with `inspect info.get 'crc`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

| Name                                                                 | Purpose / when to use                   | Example                                                   |
| -------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------- |
| [crc](https://arturo-lang.io/documentation/library/crypto/crc)       | Compute the CRC32 polynomial of string. | `print crc "The quick brown fox jumps over the lazy dog"` |
| [decode](https://arturo-lang.io/documentation/library/crypto/decode) | Decode value (default: base-64).        | `print decode "TnVtcXVhbSBmdWdpZW5zIHJlc3BleGVyaXM="`     |
| [digest](https://arturo-lang.io/documentation/library/crypto/digest) | Obtain digest for value (default: MD5). | `print digest "Hello world"`                              |
| [encode](https://arturo-lang.io/documentation/library/crypto/encode) | Encode value (default: base-64).        | `print encode "Numquam fugiens respexeris"`               |
| [hash](https://arturo-lang.io/documentation/library/crypto/hash)     | Obtain hash for value.                  | `print hash "hello"`                                      |

## Sources and verification

Reviewed 2026-10-29 against the [official Crypto module](https://arturo-lang.io/documentation/library/crypto), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 5 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 5 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
