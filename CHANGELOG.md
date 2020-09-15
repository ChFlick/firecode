# Change Log

All notable changes to the "firecode" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [1.3.0] - 2020-09-15
### Added
- Experimental support for formatting using [prettier](https://prettier.io/) and [prettier-plugin-firestore-rules](https://github.com/ChFlick/prettier-plugin-firestore-rules).
- Configuration flag `firestorerules.usePrettierFormatter` to switch between the prettier and default formatter.

## [1.2.11] - 2020-09-15
### Fixed
- Formatting whitespace on empty lines

## [1.2.10] - 2020-07-08
### Fixed
- Formatting when the line contaned the words match, allow, or function not as keywords.

## [1.2.9] - 2020-07-06
### Fixed
- Syntax highlighting for comments in the service scope.
- Syntax highlighting for allow statements without if/condition, like `allow read;`. 

## [1.2.8] - 2020-06-26
### Fixed
- Syntax highlighting for functions outside of the matcher scope.

## [1.2.7] - 2020-06-25
- Not properly published - did not change anything.

## [1.2.6] - 2020-06-02
### Fixed
- Textmate/Oniguruma issues in recent VS Code versions.

## [1.2.5] - 2020-05-12
### Fixed
- The extension possibly not working at all due to rebuild issues.

## [1.2.4] - 2020-05-12
### Added
- Support for firebase storage rules top-level `service firebase.storage`

## [1.2.3] - 2020-04-19
### Fixed
- **let** variable declaration in function bodies.
- Comments in function bodies.
- Indentation in function bodies.

## [1.2.2] - 2020-02-25
### Fixed
- Whitespaces in `rules_version = '2';`.
- The wrong detection of the "is" operator in a word (eg isSomething).
- Comments in allow expressions.
- End of allow-statements colliding with the end of match-statements when not using semicolons.

## [1.2.1] - 2020-02-01
### Fixed
- Basic autoformatting on windows.

## [1.2.0] - 2020-01-26
### Added
- Basic autoformatting option.

## [1.1.4] - 2019-11-30
### Fixed
- Grammar bugfix.

## [1.1.2] - 2019-10-09
### Changed
- Some internal improvements.
- Updated README to show the autocompletion.

## [1.1.1] - 2019-10-05
### Added
- First draft of the completion support.

## [1.0.1] - 2019-08-21
### Added
- Improve hover information support by creating a tree structure to get the correct context information.

## [1.0.0] - 2019-08-17
- Initial release.

### Added
- Syntax Highlighting support.
- Hover Information support.
