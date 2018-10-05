#!/usr/bin/env node
"use strict";
const meow = require("meow");
const globby = require("globby");
const { fileToASTHex } = require("../lib/js-ast-hash.js");

const cli = meow(
    `
    Usage
      $ js-ast-hash file.js ["src/**/*.js"]

    Options
      --format -f output format: json, csv (default: csv)

    Examples
      $ js-ast-hash file.js
      $ js-ast-hash "src/**/*.js" -f json
`,
    {
        flags: {
            format: {
                alias: "f",
                type: "string"
            }
        },
        autoVersion: true,
        autoHelp: true
    }
);

const targetFiles = globby.sync(cli.input);
const hashMap = targetFiles.map(filePath => {
    return {
        filePath,
        hash: fileToASTHex(filePath)
    }
});
if (cli.flags.format === "json") {
    console.log(JSON.stringify(hashMap));
} else {
    const json2csv = require('json2csv').parse;
    try {
        const csv = json2csv(hashMap, {
            fields: [
                {
                    label: 'filePath',
                    value: 'filePath',
                },
                {
                    label: 'hash',
                    value: 'hash',
                }
            ]
        });
        console.log(csv);
    } catch (err) {
        console.error(err);
    }
}
