# Ui: function selection

Use for native dialogs, notifications, clipboard access, and webviews. These operations need a supported desktop/runtime build and may block or alter user state. Examples are documentation-only here; do not invoke GUI or clipboard functions just to discover their signatures.

Query signatures with `inspect info.get 'alert`; see [runtime inspection](runtime.md) for metadata interpretation.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Requires a supported desktop and explicit interaction.

| Name                                                               | Purpose / when to use                              | Example                                     |
| ------------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------------- |
| [alert](https://arturo-lang.io/documentation/library/ui/alert)     | Show notification with title and message.          | `alert "Title" "Message"`                   |
| [clip](https://arturo-lang.io/documentation/library/ui/clip)       | Set clipboard content to text.                     | `clip "example text"`                       |
| [dialog](https://arturo-lang.io/documentation/library/ui/dialog)   | Show a file selection dialog and return selection. | `selected: dialog "Select a file"`          |
| [popup](https://arturo-lang.io/documentation/library/ui/popup)     | Show popup dialog with title and message.          | `popup "Title" "Message"`                   |
| [unclip](https://arturo-lang.io/documentation/library/ui/unclip)   | Obtain clipboard content.                          | `unclip`                                    |
| [webview](https://arturo-lang.io/documentation/library/ui/webview) | Show webview window with url or html source.       | `webview "<html><body>Hello</body></html>"` |

## Sources

Sources: the [official Ui module](https://arturo-lang.io/documentation/library/ui); [official text reference](https://arturo-lang.io/llms.txt).
