# MathJax webviews

Use `mathjax` for rendering equations in an Arturo desktop webview. The package supplies JavaScript injection, rather than a symbolic mathematics API or a command-line image exporter. Guidance follows release 0.0.2.

The documented integration imports the package, passes `mathjaxJs` to `webview.inject:`, and supplies content containing inline `$...$` or display `$$...$$` math:

```arturo
import "mathjax"!

webview.inject: mathjaxJs
.title: "An equation"
---------------
$$a^2 + b^2 = c^2$$
```

This adapts the upstream example. It opens a GUI and is not run by offline smoke checks. Import may download and execute the package. Check that the Arturo build supports webviews and a desktop session is available before launch.

Keep TeX in Arturo strings intact: do not introduce escaping rules from another language. Diagnose the generated content, injection, and browser resource loading separately. The upstream documentation lists offline support as future work; do not promise an offline renderer. Inspect the selected release's JavaScript dependencies before choosing an offline deployment strategy or assuming a MathJax version/configuration.

Sources: [package documentation](https://mathjax.pkgr.art/), [release 0.0.2](https://codeberg.org/Eloitor/mathjax.art/src/tag/v0.0.2), [Arturo webview](https://arturo-lang.io/documentation/library/ui/webview/).

See [third-party notices](../THIRD-PARTY-NOTICES.md#mathjax) for attribution, licenses, and reviewed revisions.
