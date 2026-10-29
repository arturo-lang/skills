# Arturo agent skills

A portable skill library for writing, understanding, and fixing [Arturo](https://arturo-lang.io) programs. Built from the [official reference](https://arturo-lang.io/llms.txt) and [Arturo examples](https://github.com/arturo-lang/examples).

| Skill                | Use it for                                                |
| -------------------- | --------------------------------------------------------- |
| `arturo-language`    | Syntax, evaluation, functions, scope, and mutation        |
| `arturo-collections` | Blocks, dictionaries, iterators, and text transformations |
| `arturo-scripting`   | CLI arguments, local files, paths, and automation         |
| `arturo-http-json`   | HTTP clients and JSON serialization                       |
| `arturo-debugging`   | Error diagnosis, assertions, and regression checks        |

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
bun run format
```

Bun powers repository tooling; Biome formats supported code, configuration, and Markdown files. Format `.art` files manually. Arturo runs the programs: `arturo file.art` or `arturo -e 'print 2 + 3'`. Smoke checks require `arturo` on PATH and explicitly fail when it is unavailable.

The references are curated guidance, not a bundled copy of the upstream manual. Each skill includes source links and a bounded example. See [SOURCES.md](SOURCES.md) for provenance and refresh guidance.
