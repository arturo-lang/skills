---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/crypto
    - https://arturo-lang.io/llms.txt
---

# Crypto: function selection

Use for encodings, checksums, and hashes exposed by this runtime. Base64 and URL encoding are representations, not encryption. CRC and generic hashes are not authenticity checks. `digest` defaults to MD5 and `.sha` selects SHA1; these are compatibility functions, not a password-storage or modern security design. Avoid assuming unsupported algorithms.

Query signatures with `inspect info.get 'crc`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                 | Purpose / when to use                   | Example                                                   |
| -------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------- |
| [crc](https://arturo-lang.io/documentation/library/crypto/crc)       | Compute the CRC32 polynomial of string. | `print crc "The quick brown fox jumps over the lazy dog"` |
| [decode](https://arturo-lang.io/documentation/library/crypto/decode) | Decode value (default: base-64).        | `print decode "TnVtcXVhbSBmdWdpZW5zIHJlc3BleGVyaXM="`     |
| [digest](https://arturo-lang.io/documentation/library/crypto/digest) | Obtain digest for value (default: MD5). | `print digest "Hello world"`                              |
| [encode](https://arturo-lang.io/documentation/library/crypto/encode) | Encode value (default: base-64).        | `print encode "Numquam fugiens respexeris"`               |
| [hash](https://arturo-lang.io/documentation/library/crypto/hash)     | Obtain hash for value.                  | `print hash "hello"`                                      |
