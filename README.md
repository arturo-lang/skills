# Arturo agent skills

A portable skill library for writing, understanding, and fixing [Arturo](https://arturo-lang.io) programs. Built from the [official reference](https://arturo-lang.io/llms.txt) and [Arturo examples](https://github.com/arturo-lang/examples).

| Skill                | Use it for                                                      |
| -------------------- | --------------------------------------------------------------- |
| `arturo-language`    | Syntax, evaluation, functions, scope, and mutation              |
| `arturo-collections` | Blocks, dictionaries, iterators, and text transformations       |
| `arturo-scripting`   | CLI, files, dates, encodings, databases, and desktop automation |
| `arturo-debugging`   | Error diagnosis, assertions, and regression checks              |
| `arturo-math`        | Arithmetic, statistics, bit operations, units, and colors       |
| `arturo-networking`  | HTTP/JSON clients, services, network utilities, TCP, and UDP    |
| `arturo-testing`     | Unitt project tests and command benchmarks                      |
| `arturo-validation`  | Structured schemas, coercion, and string validation             |
| `arturo-web`         | Static serving, HTML, MediaWiki, equations, and diagrams        |
| `arturo-packages`    | pkgr.art discovery, installation, imports, and publishing       |

The [standard-library coverage map](STDLIB.md) assigns all 26 modules and 521 entries to their owning skills. Related modules share a skill: Collections, Iterators, Strings, and Sets live in `arturo-collections`; Arithmetic, Bitwise, Numbers, Statistics, Quantities, and Colors live in `arturo-math`. HTTP/JSON recipes live with Net and Sockets in `arturo-networking`; local integration guides live in `arturo-scripting`. Comparison, Logic, and Types extend `arturo-language`. Each module reference gives purpose, when to use, examples, and official links. Signatures come from the installed runtime using `inspect info.get 'functionName`.

The former `arturo-http-json` skill is now part of `arturo-networking`; `arturo-quantities` and `arturo-colors` are part of `arturo-math`; `arturo-crypto`, `arturo-databases`, `arturo-dates`, and `arturo-ui` are part of `arturo-scripting`. Select the owning skill when installing.

## External packages

External libraries share skills by task. Each skill remains independently installable, with package guidance, examples, and source links in its own references.

| Skill                | External packages and uses                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `arturo-testing`     | Unitt, the primary official unit testing tool; Peregrino command benchmarks                                                               |
| `arturo-validation`  | schema for structured values, coercion, defaults, and faults; validator for string formats                                                |
| `arturo-scripting`   | Climax CLI building, Progressive progress bars, Tabular terminal tables, Tasks automation, MIMEtypes recognition, Grafito graph databases |
| `arturo-language`    | optionally for typed attributes and DSL building, States finite state machines, ArtSembly bytecode experiments                            |
| `arturo-collections` | Recase case conversion, Unidecode transliteration, RSV row data                                                                           |
| `arturo-networking`  | Claude API client                                                                                                                         |
| `arturo-web`         | Lanx static serving, HTML DSL, mwiki MediaWiki API client, MathJax equations, Mermaid diagrams                                            |

The former individual `arturo-<package>` skills are merged into the owning skills above; select the owner when installing. Unitt has its own dedicated reference within testing. The mwiki package targets MediaWiki, rather than MDWiki.

Package imports can download and evaluate code. The default smoke suite stays offline and does not install these dependencies, call remote APIs, or launch servers or webviews.

## Install with the skills CLI

From this checkout, choose skills and agents interactively:

```sh
bunx skills add .
```

Or select agents explicitly (run from the project that should receive the skills, replacing the path with this checkout):

```sh
bunx skills add /absolute/path/to/this/repository --skill arturo-language arturo-collections -a codex claude-code cursor
```

Use `--list` to preview, `-g` for a user-wide installation, or `--skill '*' -a '*'` to target every skill and every supported agent. The [skills CLI](https://github.com/vercel-labs/skills) manages each agent's installation paths. This library does not require a particular agent, MCP server, or Bun runtime to use its instructions. Agents without CLI integration can load an individual `SKILL.md` and its relative references directly.

## Develop

```sh
bun install
bun run skills:list
bun run check
bun test
bun run smoke
bun run stdlib:inspect
bun run format
```

Bun powers repository tooling; Biome formats supported code, configuration, and Markdown files. Format `.art` files manually. Arturo runs the programs: `arturo file.art` or `arturo -e 'print 2 + 3'`. Smoke checks require `arturo` on PATH and explicitly fail when it is unavailable.

The references are curated guidance, not a bundled copy of the upstream manual. Each skill includes source links and a bounded example. GUI and networking examples inspect metadata without performing interactive or network operations. The SQL smoke example uses an in-memory database. See [SOURCES.md](SOURCES.md) for provenance and refresh guidance.
