---

name: arturo-crypto
description: Use Arturo Crypto functions for Base64 or URL encoding, checksums, digests, and generic hashes. Use for data interchange and compatibility checks, not invented encryption APIs.
---

# Arturo encodings, checksums, and hashes

Read only the module reference relevant to the task:

- [Crypto](references/crypto-library.md): 5 functions, predicates, or constants.

Separate reversible encodings from checksums and digests. Inspect defaults and supported algorithms; digest uses MD5 by default and supports SHA1 through .sha. Do not present these compatibility primitives as modern password hashing or authenticated encryption. Check round trips, malformed input, and byte/string assumptions.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks. These checks do not imply that network, GUI, or persistent operations have been executed.
