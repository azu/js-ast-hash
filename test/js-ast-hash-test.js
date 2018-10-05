// MIT © 2018 azu
"use strict";
const path = require("path");
const assert = require("assert");
const { codeToASTHex, fileToASTHex } = require("../lib/js-ast-hash.js");

describe('codeToASTHex', function() {
    it("should output md5 value", () => {
        const hex = codeToASTHex(`var a = 1;`);
        assert.strictEqual(hex, "3a5c739d9c4b6284c5790de8b557bd3d");
    });
    it("should handle TypeScript file", () => {
        const hex = fileToASTHex(path.join(__dirname, "fixtures/test.ts"));
        assert.strictEqual(hex, "6da24025cc2d9f99fdc6881bb5e2e5a4");
    });
    it("should ignore space", () => {
        const aHex = codeToASTHex(`var a       = 1;`);
        const bHex = codeToASTHex(`var a =           1;`);
        assert.strictEqual(aHex, bHex);
    });
    it("should ignore fn space", () => {
        const aHex = codeToASTHex(`var fn = function(){}`);
        const bHex = codeToASTHex(`var fn = function (){
};`);
        assert.strictEqual(aHex, bHex);
    });
    it("should ignore comment", () => {
        const aHex = codeToASTHex(`/* comment A */ var a = 1;// a`);
        const bHex = codeToASTHex(`/* comment B */ var a = 1; // b`);
        assert.strictEqual(aHex, bHex);
    });
});
