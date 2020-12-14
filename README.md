# webpack-files-archive-plugin
Webpack 5 plugin to create archives of emitted files

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]

## Installation

`npm install --save-dev webpack-files-archive-plugin`

> This is a fork of original plugin https://github.com/autochthe/webpack-archive-plugin.
> The current plugin only support **Webpack 5**. For **Webpack 4** use original [plugin](https://www.npmjs.com/package/webpack-archive-plugin).

## Usage

webpack.config.js:

```js
let FilesArchivePlugin = require('webpack-files-archive-plugin');

module.exports = {
	// configuration
	output: {
		path: __dirname + '/dist',
	},
	plugins: [
		new FilesArchivePlugin({
			format: ['zip','tar.gz']
		}),
	],
}
```

Will create two archives in the same directory as output.path (`__dirname` in the example),
`${output.path}.tar.gz` and `${output.path}.zip` containing all compiled assets.

## Options

You can pass options when constructing a new plugin, for example `new WebpackFilesArchivePlugin(options)`.

The options object supports the following properties:

#### `output`
 
Type: `String`
Default: `output.path`

Directory location of files to be archived.

#### `format`

Type: `String|Array`
Default: `zip|tar.gz`

Archive formats to use, can be `'tar'` or `'zip'`

#### `ext`

Type: `String`
Default: `zip|tar.gz`

A different extension to use instead of `tar.gz` or `zip` (without leading `.`)



[npm-image]: https://img.shields.io/npm/v/webpack-files-archive-plugin.svg
[npm-url]: https://npmjs.org/package/webpack-files-archive-plugin
[downloads-image]: https://img.shields.io/npm/dm/webpack-files-archive-plugin.svg