"use strict";

var assert = require("assert");
var ret = require("ret");
var types = ret.types;
var DRange = require("discontinuous-range");

var utils = require("../utils");
var basicGen = require("./basic.js");
var arrayGen = require("./array.js");

var stringGens = {};

var regexOptions = {
    ignoreCase: false,
    multiline: false,
    regexRepetitionMax: 100 // max number of characters to generate for '*' like expressions
};

var defaultRange = new DRange(32, 126);

stringGens.string = function (size) {
    return arrayGen.arrayOf(basicGen.char)(size).join("");
};

stringGens.string.ascii = function (size) {
    return arrayGen.arrayOf(basicGen.char.ascii)(size).join("");
};

/*Generate a string of alphabets*/
stringGens.string.alpha = function (size) {
    return arrayGen.arrayOf(basicGen.char.alpha)(size).join("");
};

/*Generate a string of alpha numeric characters*/
stringGens.string.alphaNum = function (size) {
    return arrayGen.arrayOf(basicGen.char.alphaNum)(size).join("");
};

var getTokenRange = function (token) {
    switch (token.type) {
        case types.CHAR:
            return new DRange(token.value);
        case types.SET:
            var drange = token.set.reduce(function (acc, tokenItem) {
                return acc.add(getTokenRange(tokenItem));
            }, new DRange());

            // case like /ab\D/ , which means all not digits
            if (token.not) {
                drange = defaultRange.clone().subtract(drange);
            }

            return drange;
        case types.RANGE:
            return new DRange(token.from, token.to);
        default:
            return new Error("Can expand token: ", token);
    }
};

var generateRandomValFromRange = function (drange) {
    var randomRange = utils.random(0, drange.ranges.length - 1);
    return getChar(utils.random(drange.ranges[randomRange].low, drange.ranges[randomRange].high), regexOptions.ignoreCase);
};

var otherCase = function (charIntVal) {
    if (97 <= charIntVal && charIntVal <= 122) return charIntVal - 32;
    if (65 <= charIntVal && charIntVal <= 90) return charIntVal + 32;
    return charIntVal;
};

var getChar = function (charIntVal) {
    var ignoreCase = arguments[1] === undefined ? false : arguments[1];
    var charCode = ignoreCase && basicGen.bool() ? otherCase(charIntVal) : charIntVal;
    return String.fromCharCode(charCode);
};

var generateMatchingString = function (token, groups) {
    var str = "";

    switch (token.type) {
        case types.ROOT:
        case types.GROUP:
            if (token.notFollowedBy) return "";
            // Insert placeholder until group string is generated.
            if (token.remember && token.groupNumber === undefined) {
                token.groupNumber = groups.push(null) - 1;
            }

            var stack = token.stack;

            if (token.options) {
                var randomIndex = utils.random(0, token.options.length - 1);
                stack = token.options[randomIndex];
            }

            str = stack.reduce(function (acc, stackItem) {
                return acc + generateMatchingString(stackItem, groups);
            }, "");

            if (token.remember) {
                groups[token.groupNumber] = str;
            }

            return str;
        case types.POSITION:
            // ^, $
            // TODO
            return "";
        case types.SET:
            // ., \d, \D, \w, \W, \s, \S
            var tokenRange = getTokenRange(token);
            return generateRandomValFromRange(tokenRange) || "";
        case types.RANGE:
            // don't know when this happens
            return getChar(utils.random(token.from, token.to), regexOptions.ignoreCase);
            break;
        case types.REPETITION:
            // *, {1, }, {2, 6}
            var stringRandomLength = utils.random(token.min, token.max === Infinity ? token.min + regexOptions.regexRepetitionMax : token.max);

            str = "";
            for (var i in utils.range(0, stringRandomLength)) {
                str += generateMatchingString(token.value, groups);
            }

            return str;
        case types.REFERENCE:
            return groups[token.value - 1] || "";
        case types.CHAR:
            return getChar(token.value, regexOptions.ignoreCase);
        default:
    }
};

stringGens.string.matches = function (pattern, options) {
    assert(utils.isString(pattern) || pattern instanceof RegExp, "Expect a RegExp object or regular expression string as input");

    var regexSource = pattern;
    if (utils.isString(pattern)) {
        if (options && options.i) regexOptions.ignoreCase = true;
        if (options && options.m) regexOptions.multiline = true;
    } else {
        stringGens.string.ignoreCase = pattern.ignoreCase;
        stringGens.string.multiline = pattern.multiline;
        regexSource = pattern.source;
    }

    var tokens = ret(regexSource);
    return function () {
        return generateMatchingString(tokens, []);
    };
};

module.exports = stringGens;