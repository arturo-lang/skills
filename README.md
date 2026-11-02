<h1 align="center">Arturo agent skills</h1>

<p align="center">
  <i>A little Arturo knowledge for your coding assistant.</i>
  <br><br>
  <img alt="Arturo logo" width="20" src="https://github.com/arturo-lang/arturo/raw/master/docs/images/logo.png#gh-light-mode-only">
  <img alt="Arturo logo" width="20" src="https://github.com/arturo-lang/arturo/raw/master/docs/images/logo-lightgray.png#gh-dark-mode-only">
  <br>
  <b>~ CODE IS ART ~</b>
</p>

Writing your first [Arturo](https://arturo-lang.io) script? Working through an error? Bringing an existing program to Arturo? The Arturo skill gives your coding assistant language guidance, practical examples, and links to the official documentation to help you along the way.

A **skill** is a small collection of instructions and references that an assistant can read while working on a task. You can browse them yourself, too. The skill installs as one self-contained folder, with detailed references loaded only as needed.

[Get started](#get-started) · [Included guidance](#included-guidance) · [Try it out](#try-it-out) · [Contribute](#contribute)

## Get started

From the project where you want to use the skills, run:

```sh
bunx skills add arturo-lang/skills
```

Choose **arturo** and your coding assistant. One entry point covers the language and its ecosystem; package and domain details remain separate references.

You’ll need [Bun](https://bun.sh) to run these commands and Node.js 22.20 or later for the [skills CLI](https://github.com/vercel-labs/skills). To run Arturo programs, [install Arturo](https://arturo-lang.io/#download) and make sure `arturo` is on your PATH.

Want to look around first?

```sh
bunx skills add arturo-lang/skills --list
```

Or choose exactly what to install and which assistants should receive it:

```sh
bunx skills add arturo-lang/skills --skill arturo -a codex claude-code cursor
```

Add `-g` for a user-wide installation. The CLI manages each assistant’s installation paths. The skill follows the portable Agent Skills format and requires no particular assistant, MCP server, or Bun runtime to read. If your assistant does not support the CLI, point it to the Arturo `SKILL.md` and the references inside that folder.

## Try it out

Once installed, open your coding assistant in the project and ask for something you need. For example:

- “Help me write an Arturo script that groups these records by category.”
- “Explain how scope and mutation work in this function.”
- “Find the cause of this Arturo error and add a regression check.”
- “Help me test this package with Unitt.”
- “Set up GitHub Actions to test and bundle my Arturo app.”

Include your code, the result you expected, and any error output when you have them. You can also name a skill explicitly if you want the assistant to consult it.

Prefer to explore on your own? Start with the [Arturo skill](skills/arturo/SKILL.md) or its [small runnable example](skills/arturo/examples/language/basics.art).

## Included guidance

[arturo](skills/arturo/SKILL.md) covers language semantics, collections/text, math/units/colors, scripting/files/storage, networking, debugging, testing/CI, validation, packages and web workflows. It starts with runtime discovery using `info.get`, then routes to task-specific references rather than loading the full library.

- [Language and scope](skills/arturo/references/language.md), [symbols](skills/arturo/references/symbols.md), [project loading](skills/arturo/references/projects.md).
- [Standard-library map](skills/arturo/references/library.md): domain caveats and bounded examples.
- [Package index](skills/arturo/references/package-index.md): each external package has its own versioned file, including Unitt, Schema/Validator, HTML/Lanx, CLI/terminal packages, text packages, DSLs and service wrappers.
- [Package management](skills/arturo/references/packages.md): registry discovery, acquisition, versions, local isolation and publication.

Importing a package can download and evaluate code; installing this skill does not install Arturo packages. The single skill includes its own license texts and consolidated upstream notices.

## Where the guidance comes from

The library draws on the [official Arturo reference](https://arturo-lang.io/llms.txt) and [Arturo examples](https://github.com/arturo-lang/examples). References explain what functions do, when to use them, and how to try them, with links back to the source documentation.


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

Use `bun run format` for Biome-supported code, configuration, and Markdown; format `.art` files manually. See [AGENTS.md](AGENTS.md) for contribution guidelines.

To try your local changes in an assistant, run `bunx skills add .` from this checkout, or run the following from the project that should receive them, replacing the example path:

```sh
bunx skills add /path/to/your/checkout --skill arturo -a codex claude-code cursor
```

The CLI discovers `skills/<name>/SKILL.md` directly; no custom manifest or npm publication is needed. See its [skill discovery documentation](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md) for details.

## License

Documentation is licensed under [CC BY 4.0](LICENSE-CC-BY-4.0.txt). Original standalone code examples, scripts, tests, and configuration are licensed under [MIT](LICENSE-MIT.txt). Upstream material retains its own notices; see [third-party notices](THIRD-PARTY-NOTICES.md) for external package credits and licenses. See [LICENSING.md](LICENSING.md) for scope and attribution; each skill includes its own license texts and notice for independent installation.

## Maintenance

Track planned and active work in [GitHub issues](https://github.com/arturo-lang/skills/issues). See [contribution requirements](CONTRIBUTING.md#maintenance) and the [dated decision log](DECISIONS.md).

## Context and behavioral evaluation

The Arturo skill keeps semantic pitfalls locally and uses `inspect info.get 'name` for installed built-in signatures. Read only the references needed for the current task; package APIs stay with their domain guides. An optional [consuming-repository routing example](templates/consumer-routing.md) helps hosts that miss relevant guidance.

Run `bun run context:stats` for document sizes and `bun run evals --list` for the Sol Low scenario matrix. See [evaluation instructions](evals/README.md) for isolated execution, automatic versus explicit selection, paid API opt-in, and evidence limits. Smaller files alone do not prove better task completion.

See [evaluation transparency](TRANSPARENCY.md) for observed results, costs, and unfinished evaluation work. Package AI scenarios have been retired; local package verification remains available.
