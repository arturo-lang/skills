# Mermaid webviews

Use `mermaid` to display diagram text in an Arturo webview. Guidance follows release 0.0.1. This wrapper injects Mermaid JavaScript; it does not document an Arturo data-to-diagram DSL or a headless SVG export API.

```arturo
import "mermaid"!

webview.inject: mermaidJs
.title: "A small flow"
---------------
<pre class="mermaid">
graph LR
  A[Start] --> B[Finish]
</pre>
```

This adapts the upstream example for a registry import; the upstream `import ./"mermaid"!` assumes a local checkout. The example opens a GUI and is not executed by offline smoke checks. Import may download and evaluate package code.

Preserve the `mermaid` class on the container. Check diagram syntax, resulting HTML, script injection, and resource loading separately when rendering fails. Confirm webview support in the installed Arturo build and use a desktop session. Upstream lists offline support as future work; inspect the selected release's browser dependencies before promising offline operation or assuming support for newer Mermaid syntax. Treat injected markup/scripts as executable content and keep diagram inputs appropriate for the intended renderer.

Sources: [package documentation](https://mermaid.pkgr.art/), [release 0.0.1](https://codeberg.org/Eloitor/mermaid.art/src/tag/v0.0.1), [Arturo webview](https://arturo-lang.io/documentation/library/ui/webview/).

See [third-party notices](../THIRD-PARTY-NOTICES.md#mermaid) for attribution, licenses, and reviewed revisions.
