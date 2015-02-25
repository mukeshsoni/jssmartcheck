"use strict";

require("babel/polyfill");
var basic = require("./basic");
var utils = require("../utils");

var numberGen = {};

/*Generate an integer upto size. Non negative*/
numberGen.intUpto = function () {
    var size = arguments[0] === undefined ? 100 : arguments[0];
    return Math.floor(Math.random() * size);
};

/*Generate an integer bounded by [-size, size]*/
numberGen.int = function () {
    var size = arguments[0] === undefined ? 100 : arguments[0];
    return basic.elements([-1, 1])() * numberGen.intUpto(size);
};

numberGen.int.shrink = regeneratorRuntime.mark(function callee$0$0(val) {
    var limit, shrinkedVal;
    return regeneratorRuntime.wrap(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                limit = Math.abs(val);
                shrinkedVal = limit - 1;
            case 2:
                if (!(Math.abs(shrinkedVal) !== 0)) {
                    context$1$0.next = 8;
                    break;
                }
                context$1$0.next = 5;
                return shrinkedVal;
            case 5:


                if (shrinkedVal >= 0) {
                    shrinkedVal = -shrinkedVal;
                } else {
                    shrinkedVal = -(shrinkedVal + 1);
                }
                context$1$0.next = 2;
                break;
            case 8:
                context$1$0.next = 10;
                return shrinkedVal;
            case 10:
            case "end":
                return context$1$0.stop();
        }
    }, callee$0$0, this);
});

/*Generate a positive Integer*/
numberGen.int.positive = function () {
    var size = arguments[0] === undefined ? 100 : arguments[0];
    return numberGen.intUpto(size) + 1;
};

/*Choose an integer in the range [min, max], both inclusive in search*/
numberGen.int.choose = numberGen.int.between = function (min, max) {
    return basic.elements(utils.range(min, max + 1));
};

/*Generate a float bounded by [-size, size]*/
numberGen.float = function () {
    var size = arguments[0] === undefined ? 100 : arguments[0];
    return basic.random() * size;
};

/*Generate a large integer*/
numberGen.int.large = function () {
    return Math.floor(Math.random() * Number.MAX_VALUE);
};

/*Generate an unsigned integer*/
// TODO - no idea why it has to be upto size*size
numberGen.uint = function () {
    var size = arguments[0] === undefined ? 100 : arguments[0];
    return numberGen.intUpto(size * size);
};

/*Generate a large unsigned integer*/
numberGen.uint.large = function () {
    return Math.floor(Math.random() * Number.MAX_VALUE);
};


module.exports = numberGen;
// for zero case