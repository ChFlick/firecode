# Change Log

All notable changes to the "firecode" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [Unreleased] - 2020-19-04
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