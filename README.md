[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/ChFlick.firecode.svg)](https://marketplace.visualstudio.com/items?itemName=ChFlick.firecode)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/version/ChFlick.firecode.svg)](https://marketplace.visualstudio.com/items?itemName=ChFlick.firecode)
[![Build Status](https://travis-ci.org/ChFlick/firecode.svg?branch=master)](https://travis-ci.org/ChFlick/firecode)
[![Maintainability](https://api.codeclimate.com/v1/badges/a06d165d57630120c00d/maintainability)](https://codeclimate.com/github/ChFlick/firecode/maintainability)
[![Dependencies](https://david-dm.org/ChFlick/firecode.svg)](https://david-dm.org/ChFlick/firecode)
[![devDependencies Status](https://david-dm.org/ChFlick/firecode/dev-status.svg)](https://david-dm.org/ChFlick/firecode?type=dev)

# Firestore

Firestore security rule support for Visual Studio Code.

Works for `.rule` and `.rules` files.

## Features

### Syntax Highlighting
![Syntax Highlighting](./resources/syntax-highlighting.png)

### Mouseover Information
![Mouseover Information](./resources/mouseover-info.gif)

### Autocomplete Suggestions
![Autocompletion](./resources/autocomplete.gif)

### Autoformatting
![Autoformatting](./resources/autoformat.gif)

Only works for valid rules and currently only formats the indentation.

**Experimental:**
Version 1.3.0 intoduced a new formatter option which can be enabled in the configuration, `firestorerules.usePrettierFormatter`.
When the option is enabled, the project uses [prettier](https://prettier.io/) and the [prettier-plugin-firestore-rules](https://github.com/ChFlick/prettier-plugin-firestore-rules) to format the firestore rules.

## Known Issues

* The documentation of the get(/path/) function is currently not correct

This extension is still very fresh and under development, so if you have any issues, please [report them on GitHub](https://github.com/ChFlick/firecode/issues).

## Development

I'm working on improving the prettier-plugin-firestore-rules formatter as well as the corresponding [firestore rules parser (WIP)](https://github.com/ChFlick/prettier-plugin-firestore-rules).

When the parser is in a proper shape, it will be included to provide validation of the firestore rules.
