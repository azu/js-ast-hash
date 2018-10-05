# js-ast-hash [![Build Status](https://travis-ci.org/azu/js-ast-hash.svg?branch=master)](https://travis-ci.org/azu/js-ast-hash)

Output hash value of JavaScript AST.
This tool help to compare source codes ignoring space, comment.

This tool inspired by following article.

- [20 万行超のコードベースをテストせずにリファクタリングリリースした話 - MonotaRO Tech Blog](https://tech-blog.monotaro.com/entry/2018/09/26/142451)

## Features

- Output JavaScript AST hash(md5) value
- Ignore space, break line, and comment of the source code


**Ignore comments example:**

```
/* comment A */ var a = 1;// a
```

===

```
/* comment B */ var a = 1; // b
```

**Ignore spaces example:**

```
var fn = function(){}
```

===

```
var fn = function (){
};
```


## Install

Install with [npm](https://www.npmjs.com/):

    npm install js-ast-hash

## Usage


    Usage
      $ js-ast-hash file.js ["src/**/*.js"]

    Options
      --format -f output format: json, csv (default: csv)

    Examples
      $ js-ast-hash file.js
      $ js-ast-hash "src/**/*.js" -f json

## Example

`example1.js`:
```js
// this is example 1
var a = 1;
```

`example2.js`:
```js
// this is example 2
var b = 1;
```
`example3.js`:
```js
// this is example 3
var a = 1;
```

CSV results:

```
$ js-ast-hash test/fixtures/example.js
"filePath","hash"
"filePath","hash"
"test/fixtures/example1.js","3a5c739d9c4b6284c5790de8b557bd3d"
"test/fixtures/example2.js","da948b06f3c073a32dc6de72e00dbe8f"
"test/fixtures/example3.js","3a5c739d9c4b6284c5790de8b557bd3d"
```

JSON results:

```
$ js-ast-hash test/fixtures/ -f json
[{"filePath":"test/fixtures/example1.js","hash":"3a5c739d9c4b6284c5790de8b557bd3d"},{"filePath":"test/fixtures/example2.js","hash":"da948b06f3c073a32dc6de72e00dbe8f"},{"filePath":"test/fixtures/example3.js","hash":"3a5c739d9c4b6284c5790de8b557bd3d"},]
```

`example1.js` and `example3.js` should be same hash value.

## Changelog

See [Releases page](https://github.com/azu/js-ast-hash/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/js-ast-hash/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
