# Files: function selection

Use for filesystem reads, writes, metadata, and archives. `write` takes content before destination. Establish the intended root and overwrite behavior. Run effectful checks only in disposable directories; inspect archive argument order rather than assuming it. A path string and a filesystem path value are different language concepts.

Query signatures with `inspect info.get 'copy`; see [runtime inspection](runtime.md) for metadata interpretation.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Mutating and archive examples require disposable fixtures.

| Name                                                                          | Purpose / when to use                                    | Example                            |
| ----------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------- |
| [copy](https://arturo-lang.io/documentation/library/files/copy)               | Copy file at path to destination.                        | `copy "input.txt" "copy.txt"`      |
| [delete](https://arturo-lang.io/documentation/library/files/delete)           | Delete file at path.                                     | `delete "disposable.txt"`          |
| [directory?](https://arturo-lang.io/documentation/library/files/directory-)   | Test whether path exists and corresponds to a directory. | `directory? "."`                   |
| [exists?](https://arturo-lang.io/documentation/library/files/exists-)         | Test whether file/directory at path exists.              | `exists? "input.txt"`              |
| [file?](https://arturo-lang.io/documentation/library/files/file-)             | Test whether path exists and corresponds to a file.      | `file? "input.txt"`                |
| [hidden?](https://arturo-lang.io/documentation/library/files/hidden-)         | Test whether file/folder at path is hidden.              | `hidden? ".hidden"`                |
| [move](https://arturo-lang.io/documentation/library/files/move)               | Move file at path to destination.                        | `move "input.txt" "moved.txt"`     |
| [permissions](https://arturo-lang.io/documentation/library/files/permissions) | Check permissions of file.                               | `permissions "input.txt"`          |
| [read](https://arturo-lang.io/documentation/library/files/read)               | Read file from path.                                     | `read "input.txt"`                 |
| [rename](https://arturo-lang.io/documentation/library/files/rename)           | Rename file at path using new path name.                 | `rename "input.txt" "renamed.txt"` |
| [symlink](https://arturo-lang.io/documentation/library/files/symlink)         | Create symbolic link of file to destination.             | `symlink "input.txt" "link.txt"`   |
| [symlink?](https://arturo-lang.io/documentation/library/files/symlink-)       | Test whether path exists and corresponds to a symlink.   | `symlink? "link.txt"`              |
| [timestamp](https://arturo-lang.io/documentation/library/files/timestamp)     | Obtain file timestamps.                                  | `timestamp "input.txt"`            |
| [unzip](https://arturo-lang.io/documentation/library/files/unzip)             | Unzip archive to destination.                            | `unzip "output" "archive.zip"`     |
| [volume](https://arturo-lang.io/documentation/library/files/volume)           | Obtain file size for path.                               | `volume "input.txt"`               |
| [write](https://arturo-lang.io/documentation/library/files/write)             | Write content to file at path.                           | `write "hello" "output.txt"`       |
| [zip](https://arturo-lang.io/documentation/library/files/zip)                 | Zip files to file at destination.                        | `zip "archive.zip" ["input.txt"]`  |

## Sources and verification

Sources: the [official Files module](https://arturo-lang.io/documentation/library/files); [official text reference](https://arturo-lang.io/llms.txt). Reviewed: 2026-10-29. License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Reference version: Arturo 0.10.0 Arizona Bark (amd64/Linux). Metadata: 17 names resolved.
