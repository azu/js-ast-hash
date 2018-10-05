// MIT © 2018 azu
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const parser = require("@babel/parser");
const md5hex = str => {
    const md5 = crypto.createHash("md5");
    return md5.update(str, "binary").digest("hex");
};
const parse = (text, plugins = []) => {
    return parser.parse(text, {
        sourceType: "module",
        plugins: plugins.concat([
            'doExpressions',
            'objectRestSpread',
            'classProperties',
            'classPrivateProperties',
            'classPrivateMethods',
            'exportDefaultFrom',
            'exportNamespaceFrom',
            'asyncGenerators',
            'functionBind',
            'functionSent',
            'dynamicImport',
            'numericSeparator',
            'optionalChaining',
            'importMeta',
            'bigInt',
            'optionalCatchBinding',
            'throwExpressions'
        ]),
        ranges: false
    });
};

function stripReplacer(key, value) {
    switch (key) {
        case "start":
        case "end":
        case "loc":
        case "extra":
        case "comments":
        case "leadingComments":
        case "trailingComments":
            return undefined;
        default:
            return value
    }
}

const codeToASTHex = (text, plugins) => {
    const string = JSON.stringify(parse(text, plugins), stripReplacer);
    return md5hex(string);
};

const fileToASTHex = (filePath) => {
    const text = fs.readFileSync(filePath, "utf-8");
    const ext = path.extname(filePath);
    if (ext === ".ts" || ext === ".tsx") {
        return codeToASTHex(text, [
            "jsx",
            "typescript",
        ]);
    } else {
        return codeToASTHex(text, [
            "flow",
            "flowComments",
            "jsx",
        ]);
    }
};
module.exports.codeToASTHex = codeToASTHex;
module.exports.fileToASTHex = fileToASTHex;
