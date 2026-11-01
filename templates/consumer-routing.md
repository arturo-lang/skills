# Optional consuming-repository routing

Copyright © RickBarretto, Arturo programming language.

Adapt the block below into your application's `AGENTS.md` if your assistant does not reliably select installed Arturo skills. Replace the placeholders with the installed locations; install only what the project needs. This is optional application guidance, not a dependency between distributed skills.

```markdown
For Arturo work, select installed guidance by the task. Read its SKILL.md, then only the references needed for the operation. Do not load the entire suite.

- Language/evaluation/scope/mutation: <arturo-language>/SKILL.md.
- Collections/text: <arturo-collections>/SKILL.md; numeric/units/colors: <arturo-math>/SKILL.md.
- CLI/files/processes/storage: <arturo-scripting>/SKILL.md.
- HTTP/JSON/sockets or built-in serve: <arturo-networking>/SKILL.md.
- HTML/Lanx/MediaWiki/webviews: <arturo-web>/SKILL.md. Read the HTML reference matching the selected release before changing its DSL.
- Observed failures: <arturo-debugging>/SKILL.md.
- Project tests/native Unitt/CI/benchmarks: <arturo-testing>/SKILL.md. Read the runner reference before modifying test discovery/reporting.
- Application data schemas/formats: <arturo-validation>/SKILL.md.
- Package discovery/acquisition/versioning/metadata/publication: <arturo-packages>/SKILL.md.

Routine introspection does not require debugging; a small ensure probe does not require a project runner; importing a known domain package does not require package-management guidance. Combine skills when the requested work spans responsibilities.
```

Check the substituted paths and try selection scenarios from [the evaluation suite](../evals/README.md). Installing a skill does not prove that the host loaded it or followed its instructions.
