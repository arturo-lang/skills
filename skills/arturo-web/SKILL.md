---
name: arturo-web
description: Use lanx (Lanx) to serve static files or preview a local site with Arturo. Build web content with HTML, integrate MediaWiki through mwiki, and render MathJax equations or Mermaid diagrams in webviews.
---

# Arturo web packages

Additional relevant examples are available in the [official Arturo examples repository](https://github.com/arturo-lang/examples).

For static file serving or a local site preview, start with [lanx](references/lanx.md), including its CLI and embedded server guidance.

Use this skill for HTML generation, static file serving, MediaWiki integration, and browser-backed equation or diagram rendering. Read the package reference for the task; each preserves its documented release, evaluation behavior, side effects, examples, and upstream sources.

| Task                                                                | Reference                        |
| ------------------------------------------------------------------- | -------------------------------- |
| Generate HTML with the experimental element and attribute DSL       | [HTML](references/html.md)       |
| Serve a static directory through the Lanx CLI or an embedded server | [Lanx](references/lanx.md)       |
| Read, search, authenticate, or edit a MediaWiki site                | [mwiki](references/mwiki.md)     |
| Display TeX equations in a desktop webview                          | [MathJax](references/mathjax.md) |
| Display Mermaid diagrams in a desktop webview                       | [Mermaid](references/mermaid.md) |

Package imports may download and evaluate code. Keep local generation and configuration checks separate from starting listeners, making wiki requests, or launching webviews. The package examples are source-checked and are not executed by the repository's offline smoke suite.

HTML blocks evaluate Arturo code, and the HTML package does not escape content or attribute values. Preserve the context-specific escaping described in its reference. Lanx serves the selected document root; inspect that root before starting it. For MediaWiki edits, prepare the full replacement text and use the intended endpoint and title. MathJax and Mermaid require webview support and may load browser resources; do not assume offline rendering.

For a small static-site workflow, keep data validation and HTML generation in separate functions, then let the entry script write into a dedicated output directory. Check ordinary text, empty content, and text containing `<`, `&`, and quotes before writing. Reject malformed data before rendering; package loading or generation failure must stop before starting Lanx. Verify the generated files before previewing, and keep temporary output separate from source files so cleanup can remove only artifacts created by that run. Start and stop the preview explicitly; writing HTML alone does not establish that a server or browser workflow works.
