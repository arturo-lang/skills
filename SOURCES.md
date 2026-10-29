# Sources and maintenance

Reviewed on 2026-10-28:

- Language and standard library: https://arturo-lang.io/llms.txt
- Example repository: https://github.com/arturo-lang/examples
- Example revision: `60e7b92242e39fccdb764c505bb289e3a1e3d391`
- Smoke verification: Arturo 0.10.0 Arizona Bark (amd64/linux).
- Portable discovery and CLI: https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md
- Installation options: https://github.com/vercel-labs/skills/blob/main/docs/commands.md

The library's prose and smoke examples are original summaries and adaptations. Upstream examples are linked rather than vendored. Paths containing `%2F` are literal upstream filenames; encode `%` as `%25` when constructing browser URLs. Do not treat `src/.drafts` as verified examples. A `.res` companion provides useful expected output but does not establish compatibility with every interpreter version.

To refresh, read the live reference sections used by the affected skill, inspect relevant examples at a recorded commit, update that skill's guidance and source links, and run repository validation and smoke checks. Record the interpreter version used for verification. Do not execute the whole upstream collection: some examples use network access, files, interactive input, or expensive computations.
