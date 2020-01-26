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

## Known Issues

* The documentation of the get(/path/) function is currently not correct

This extension is still very fresh and under development, so if you have any issues, please [report them on GitHub](https://github.com/ChFlick/firecode/issues).

## Development

There are still some todos with autocompletion and mouseover information, but currently I'm working on the autoformatter.  
I'm planning to create a [prettier](https://prettier.io/) plugin for this purpose.