---
name: arturo-web
description: "Generate Arturo HTML, preview static files with Lanx, use MediaWiki/mwiki, or render MathJax/Mermaid webviews. HTTP transport and built-in serve belong to networking."
metadata:
  arturo-version: 0.10.0
---

# Arturo web workflows

Read only the selected package guide; confirm the release before using its API:

- HTML: [legacy 0.0.4](references/html.md) versus [1.0.0-rc.1](references/html-current.md). Their return values, escaping and scoped helpers differ.
- [Lanx](references/lanx.md): static directory preview, root/working directory, startup and shutdown. In an Arturo preview request, investigate “lynx” as a possible Lanx typo and clarify before choosing a package.
- [mwiki](references/mwiki.md): MediaWiki reads/authentication/full-page edits.
- [MathJax](references/mathjax.md) or [Mermaid](references/mermaid.md): desktop webviews; offline rendering is not established.

Imports may download/evaluate code. For built-in uncertainty use `inspect info.get 'name`; package DSLs need versioned source/examples and bounded execution.

Separate validation, rendering, output writing and preview startup. Verify ordinary/empty text and `<`, `&`, quotes before writing; generation failure stops before serving. Preview only the intended output root, check HTML/binary/missing paths, and stop the server explicitly. Writing files does not establish a working preview.
