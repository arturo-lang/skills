# Ui: function selection

Use for native dialogs, notifications, clipboard access, and webviews. These operations need a supported desktop/runtime build and may block or alter user state. Examples are documentation-only here; do not invoke GUI or clipboard functions just to discover their signatures.

For signatures, ask the installed runtime with `inspect info.get 'alert`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Requires a supported desktop and explicit interaction.

| Name                                                               | Purpose / when to use                              | Example                                     |
| ------------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------------- |
| [alert](https://arturo-lang.io/documentation/library/ui/alert)     | Show notification with title and message.          | `alert "Title" "Message"`                   |
| [clip](https://arturo-lang.io/documentation/library/ui/clip)       | Set clipboard content to text.                     | `clip "example text"`                       |
| [dialog](https://arturo-lang.io/documentation/library/ui/dialog)   | Show a file selection dialog and return selection. | `selected: dialog "Select a file"`          |
| [popup](https://arturo-lang.io/documentation/library/ui/popup)     | Show popup dialog with title and message.          | `popup "Title" "Message"`                   |
| [unclip](https://arturo-lang.io/documentation/library/ui/unclip)   | Obtain clipboard content.                          | `unclip`                                    |
| [webview](https://arturo-lang.io/documentation/library/ui/webview) | Show webview window with url or html source.       | `webview "<html><body>Hello</body></html>"` |

## Sources and verification

Reviewed 2026-10-29 against the [official Ui module](https://arturo-lang.io/documentation/library/ui), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 6 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.
