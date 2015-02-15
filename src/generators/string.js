var _ = require('lodash');
var assert = require('assert');
var ret = require('ret');
var types = ret.types;
var DRange = require('discontinuous-range');

var basicGen = require('./basic.js');
var arrayGen = require('./array.js');
var generator = require('./index');

var stringGens = {
    ignoreCase: false,
    multiline: false,
    regexRepetitionMax: 100 // max number of characters to generate for '*' like expressions
};

stringGens.byte = () => Math.floor(Math.random() * 256);
stringGens.char = () => String.fromCharCode(basicGen.byte());
stringGens.string = (size) => {
    return arrayGen.arrayOf(basicGen.char)(size).join('');
};

var getTokenRange = (token) => {
    var defaultRange = new DRange(32, 126);
    switch(token.type) {
        case types.CHAR:
            return new DRange(token.value);
        case types.SET:
            var drange = token.set.reduce((acc, tokenItem) => {
                return acc.add(getTokenRange(tokenItem));
            }, new DRange());

            // case like /ab\D/ , which means all not digits
            if(token.not) {
                drange = defaultRange.clone().subtract(drange);
            }

            return drange;
        case types.RANGE:
            return new DRange(token.from, token.to);
        default:
            return new Error('Can expand token: ', token);
    }

};

var generateRandomValFromRange = (drange) => {
    var randomRange = _.random(0, drange.ranges.length - 1);
    return String.fromCharCode(_.random(drange.ranges[randomRange].low, drange.ranges[randomRange].high));
};

var generateMatchingString = (token, groups) => {
    var str = '';

    switch(token.type) {
        case types.ROOT:
        case types.GROUP:
        // TODO - have to handle types.GROUP special cases and pipes. Current code is just for ROOT
            let stack = token.stack ? token.stack : token.option;
            str = _.reduce(stack, (acc, stackItem) => {
                return acc + generateMatchingString(stackItem, groups);
            }, '');

            if (token.remember) {
                groups[token.groupNumber] = str;
            }

            return str;
        case types.SET:
            var tokenRange = getTokenRange(token);
            return generateRandomValFromRange(tokenRange) || '';
        case types.RANGE:
            // don't know when this happens
            break;
        case types.REPETITION:
            var stringRandomLength = _.random(token.min, token.max === Infinity ? token.min + stringGens.regexRepetitionMax : token.max);

            str = '';
            for(let i in _.range(0, stringRandomLength)) {
                str += generateMatchingString(token.value, groups);
            }

            return str;
        case types.REFERENCE:
            return groups[token.value-1] || '';
        case types.CHAR:
            return String.fromCharCode(token.value);
        default:
    }
};

stringGens.string.matches = (pattern, options) => {
    assert(_.isString(pattern) || pattern instanceof RegExp, 'Expect a RegExp object or regular expression string as input');

    var regexSource = pattern;
    if(_.isString(pattern)) {
        if(_.contains(options, 'i')) stringGens.string.ignoreCase = true;
        if(_.contains(options, 'm')) stringGens.string.multiline = true;
    } else {
        stringGens.string.ignoreCase = pattern.ignoreCase;
        stringGens.string.multiline = pattern.multiline;
        regexSource = pattern.source;
    }

    var tokens = ret(regexSource);
    return () => {
        return generateMatchingString(tokens, []);
    }
};

generator.extend(stringGens);
module.exports = stringGens;