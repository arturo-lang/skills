---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/strings/escape/
    - https://arturo-lang.io/documentation/library/strings/match/
    - https://arturo-lang.io/documentation/library/strings
    - https://arturo-lang.io/llms.txt
---

# Strings: function selection

Use for text transformations, matching, interpolation, and similarity. Do not equate character count with encoded byte length. Inspect locale and regex attributes for the request; test Unicode, escaping, and empty input. `render` evaluates interpolation expressions, so a template is not merely inert data.

### Strings

- Splitting: Use `split` for characters, `.words` for words, and `.lines` for lines. Empty strings produce empty collections.
- Joining: Use `join` to combine strings and `.with:` for separators. Joining an empty collection returns `""`.
- Text operations: Use `strip`, `replace`, `match?`, and `match` according to the intended transformation or matching behavior.

### Unicode and Regex

- Unicode: `size` counts code points, not UTF-8 bytes or grapheme clusters. Precomposed and decomposed characters may differ in size and equality.
- Normalization: Splitting strings does not normalize Unicode. Grapheme-aware slicing and normalization require separate handling.
- Regex escaping: Literals like `{/\\d+/}` preserve backslashes. Quoted strings require an additional escaping layer, such as `to :regex "\\\\d+"`.
- Literal matching: Use `to :regex escape.regex needle` to prevent supplied text from being interpreted as regex syntax.
- Error handling: `match` returns `[]` for no matches. Invalid dynamic regex patterns raise errors and should be validated or caught.

Text patterns reviewed 2026-10-30.

| Name                                                                            | Purpose / when to use                                                       | Example                                           |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------- |
| [alphabet](https://arturo-lang.io/documentation/library/strings/alphabet)       | Obtain dictionary-index charset for locale.                                 | `alphabet 'es`                                    |
| [ascii?](https://arturo-lang.io/documentation/library/strings/ascii-)           | Test whether character/string is in ASCII.                                  | `ascii? "text"`                                   |
| [capitalize](https://arturo-lang.io/documentation/library/strings/capitalize)   | Convert string to capitalized.                                              | `print capitalize "hello World"`                  |
| [escape](https://arturo-lang.io/documentation/library/strings/escape)           | Escape string.                                                              | `escape.json {say "hello"}`                       |
| [indent](https://arturo-lang.io/documentation/library/strings/indent)           | Indent each line of text.                                                   | `indent "one\ntwo"`                               |
| [jaro](https://arturo-lang.io/documentation/library/strings/jaro)               | Compute Jaro distance/similarity between strings.                           | `jaro "one" "one"`                                |
| [join](https://arturo-lang.io/documentation/library/strings/join)               | Join collection of values into string.                                      | `join.with: "," ["one" "two"]`                    |
| [levenshtein](https://arturo-lang.io/documentation/library/strings/levenshtein) | Compute Levenshtein distance/similarity between strings.                    | `print levenshtein "for" "fur"`                   |
| [lower](https://arturo-lang.io/documentation/library/strings/lower)             | Convert string to lowercase.                                                | `print lower "hello World, 你好!"`                |
| [lower?](https://arturo-lang.io/documentation/library/strings/lower-)           | Test whether string is lowercase.                                           | `lower? "ñ"`                                      |
| [match](https://arturo-lang.io/documentation/library/strings/match)             | Obtain matches within string, using pattern or regular expression.          | `match "hello" "hello"`                           |
| [match?](https://arturo-lang.io/documentation/library/strings/match-)           | Test whether string matches regular expression.                             | `match? "hello" {/l/}`                            |
| [numeric?](https://arturo-lang.io/documentation/library/strings/numeric-)       | Test whether string is numeric.                                             | `numeric? "hello"`                                |
| [outdent](https://arturo-lang.io/documentation/library/strings/outdent)         | Outdent each line of text, by using minimum shared indentation.             | `outdent "    one\n    two"`                      |
| [pad](https://arturo-lang.io/documentation/library/strings/pad)                 | Align string by adding padding.                                             | `pad "good" 10`                                   |
| [prefix?](https://arturo-lang.io/documentation/library/strings/prefix-)         | Test whether string starts with prefix.                                     | `prefix? "hello" "he"`                            |
| [render](https://arturo-lang.io/documentation/library/strings/render)           | Render template with \|string\| interpolation.                              | `name: "Ada" render "Hello, \|name\|"`            |
| [replace](https://arturo-lang.io/documentation/library/strings/replace)         | Replace every matched substring/s with replacement string.                  | `replace "hello" "l" "x"`                         |
| [strip](https://arturo-lang.io/documentation/library/strings/strip)             | Strip whitespace from string.                                               | `strip "  hello  "`                               |
| [suffix?](https://arturo-lang.io/documentation/library/strings/suffix-)         | Test whether string ends with suffix.                                       | `suffix? "hello" "lo"`                            |
| [translate](https://arturo-lang.io/documentation/library/strings/translate)     | Takes a dictionary of translations and replaces each instance sequentially. | `translate "red fox" #[red: "green" fox: "wolf"]` |
| [truncate](https://arturo-lang.io/documentation/library/strings/truncate)       | Truncate string at length.                                                  | `truncate "a moderately long string" 12`          |
| [upper](https://arturo-lang.io/documentation/library/strings/upper)             | Convert string to uppercase.                                                | `print upper "hello World, 你好!"`                |
| [upper?](https://arturo-lang.io/documentation/library/strings/upper-)           | Test whether string is uppercase.                                           | `upper? "Ñ"`                                      |
| [whitespace?](https://arturo-lang.io/documentation/library/strings/whitespace-) | Test whether string consists only of whitespace.                            | `whitespace? "hello"`                             |
| [wordwrap](https://arturo-lang.io/documentation/library/strings/wordwrap)       | Word wrap a string.                                                         | `wordwrap "one two three four"`                   |
