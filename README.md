<h1 align="center">Arturo agent skills</h1>

<p align="center">
  <i>A little Arturo knowledge for your coding assistant.</i>
  <br><br>
  <img alt="Arturo logo" width="20" src="https://github.com/arturo-lang/arturo/raw/master/docs/images/logo.png#gh-light-mode-only">
  <img alt="Arturo logo" width="20" src="https://github.com/arturo-lang/arturo/raw/master/docs/images/logo-lightgray.png#gh-dark-mode-only">
  <br>
  <b>~ CODE IS ART ~</b>
</p>

Writing your first [Arturo](https://arturo-lang.io) script? Working through an error? Bringing an existing program to Arturo? These skills give your coding assistant language guidance, practical examples, and links to the official documentation to help you along the way.

A **skill** is a small collection of instructions and references that an assistant can read while working on a task. You can browse them yourself, too. Each one lives in its own folder and can be installed independently.

[Get started](#get-started) · [Choose your skills](#choose-your-skills) · [Try it out](#try-it-out) · [Contribute](#contribute)

## Get started

From the project where you want to use the skills, run:

```sh
bunx skills add arturo-lang/skills
```

Follow the prompts to choose skills and your coding assistant. Start with **arturo-language** for the language basics, then add the skills that fit your work.

You’ll need [Bun](https://bun.sh) to run these commands and Node.js 22.20 or later for the [skills CLI](https://github.com/vercel-labs/skills). To run Arturo programs, [install Arturo](https://arturo-lang.io/#download) and make sure `arturo` is on your PATH.

Want to look around first?

```sh
bunx skills add arturo-lang/skills --list
```

Or choose exactly what to install and which assistants should receive it:

```sh
bunx skills add arturo-lang/skills --skill arturo-language arturo-collections -a codex claude-code cursor
```

Add `-g` for a user-wide installation. The CLI manages each assistant’s installation paths. The skills themselves follow the portable Agent Skills format and require no particular assistant, MCP server, or Bun runtime to read. If your assistant does not support the CLI, point it to a skill’s `SKILL.md` and the references inside that folder.

## Try it out

Once installed, open your coding assistant in the project and ask for something you need. For example:

- “Help me write an Arturo script that groups these records by category.”
- “Explain how scope and mutation work in this function.”
- “Find the cause of this Arturo error and add a regression check.”
- “Help me test this package with Unitt.”
- “Set up GitHub Actions to test and bundle my Arturo app.”

Include your code, the result you expected, and any error output when you have them. You can also name a skill explicitly if you want the assistant to consult it.

Prefer to explore on your own? Start with the [language skill](skills/arturo-language/SKILL.md) or its [small runnable example](skills/arturo-language/examples/basics.art).

## Choose your skills

| Skill                                                    | When you might want it                                                                  |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [arturo-language](skills/arturo-language/SKILL.md)       | Learn syntax, evaluation, functions, scope, and mutation                                |
| [arturo-collections](skills/arturo-collections/SKILL.md) | Work with blocks, dictionaries, iterators, and text                                     |
| [arturo-scripting](skills/arturo-scripting/SKILL.md)     | Build CLI tools and work with files, dates, encodings, databases, or desktop automation |
| [arturo-debugging](skills/arturo-debugging/SKILL.md)     | Diagnose errors, use assertions, and check fixes                                        |
| [arturo-math](skills/arturo-math/SKILL.md)               | Work with arithmetic, statistics, bits, units, and colors                               |
| [arturo-networking](skills/arturo-networking/SKILL.md)   | Use HTTP/JSON, network utilities, TCP, and UDP                                          |
| [arturo-testing](skills/arturo-testing/SKILL.md)         | Write Unitt tests and benchmark commands with Peregrino                                 |
| [arturo-ci](skills/arturo-ci/SKILL.md)                   | Set up GitHub Actions with setup-arturo, Unitt, and bundler                             |
| [arturo-validation](skills/arturo-validation/SKILL.md)   | Validate structured data and strings, or coerce values                                  |
| [arturo-web](skills/arturo-web/SKILL.md)                 | Serve static files and work with HTML, MediaWiki, equations, or diagrams                |
| [arturo-packages](skills/arturo-packages/SKILL.md)       | Find, install, import, and publish packages through pkgr.art                            |

### Package guidance included

Skills also cover external packages alongside the tasks they help with:

| Skill              | Packages                                                |
| ------------------ | ------------------------------------------------------- |
| arturo-testing     | Unitt, Peregrino                                        |
| arturo-ci          | Unitt (with setup-arturo and bundler GitHub Actions)    |
| arturo-validation  | schema, validator                                       |
| arturo-scripting   | Climax, Progressive, Tabular, Tasks, MIMEtypes, Grafito |
| arturo-language    | optionally, States, ArtSembly                           |
| arturo-collections | Recase, Unidecode, RSV                                  |
| arturo-networking  | Claude API client                                       |
| arturo-web         | Lanx, HTML, mwiki (MediaWiki), MathJax, Mermaid         |

Each skill keeps its package references, examples, and source links together. Importing a package can download and evaluate code; installing these skills does not install those Arturo packages.

## Where the guidance comes from

The library draws on the [official Arturo reference](https://arturo-lang.io/llms.txt) and [Arturo examples](https://github.com/arturo-lang/examples). References explain what functions do, when to use them, and how to try them, with links back to the source documentation.

For the full inventory, the [standard-library coverage map](STDLIB.md) maps 26 modules and 521 entries to their skills. Function signatures are checked against the installed runtime using `inspect info.get 'functionName`. See [SOURCES.md](SOURCES.md) for provenance and how to refresh the guidance.

These are curated working notes and examples. Keep the [Arturo documentation](https://arturo-lang.io/documentation/) handy as you explore, and run the code your assistant suggests.

## More ways to work with Arturo

- [Arturo](https://github.com/arturo-lang/arturo): the language, installation options, documentation, and community.
- [Arturo for VS Code](https://github.com/arturo-lang/vscode-extension): editor support for writing and running your programs.
- [Arturo’s mise plugin](https://github.com/arturo-lang/mise-plugin): install and manage Arturo versions with mise.
- [Arturo Reach Lab](https://github.com/arturo-lang/reach-lab): explore editor, package manager, and other ecosystem support.

## Contribute

Found a confusing explanation, a missing example, or guidance that does not match your runtime? [Open an issue](https://github.com/arturo-lang/skills/issues) or send a pull request. Small improvements are welcome. For runtime-specific problems, include your Arturo version and a short example that reproduces the issue.

Follow [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow for adding or modifying skills, copyright and licensing requirements, and validation. All new skills and all modifications require a pull request and investigation and approval by a [code owner](.github/CODEOWNERS) before merging: @RickBarretto or @drkameleon (Yanis Zafirópulos).

To work on the library locally, clone this repository and run:

```sh
bun install
bun run skills:list
bun run check
bun test
bun run smoke
```

`skills:list` previews this checkout’s skills without installing them into an assistant. CI runs validation, tests, and discovery with the locked CLI dependency. Smoke checks require `arturo` on PATH and fail if it is missing. They stay offline: no package downloads, remote API calls, servers, or webviews. The SQL example uses an in-memory database.

Use `bun run format` for Biome-supported code, configuration, and Markdown; format `.art` files manually. Use `bun run stdlib:inspect` to inspect standard-library coverage against your runtime. See [AGENTS.md](AGENTS.md) for contribution guidelines.

To try your local changes in an assistant, run `bunx skills add .` from this checkout, or run the following from the project that should receive them, replacing the example path:

```sh
bunx skills add /path/to/your/checkout --skill arturo-language arturo-collections -a codex claude-code cursor
```

The CLI discovers `skills/<name>/SKILL.md` directly; no custom manifest or npm publication is needed. See its [skill discovery documentation](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md) for details.

## License

Documentation is licensed under [CC BY 4.0](LICENSE-CC-BY-4.0.txt). Original standalone code examples, scripts, tests, and configuration are licensed under [MIT](LICENSE-MIT.txt). Upstream material retains its own notices; see [third-party notices](THIRD-PARTY-NOTICES.md) for external package credits and licenses. See [LICENSING.md](LICENSING.md) for scope and attribution; each skill includes its own license texts and notice for independent installation.
