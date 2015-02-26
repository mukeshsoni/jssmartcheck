"use strict";

var utils = require("../utils");
var constants = require("../constants");
var basicGens = {};
var alphaNums = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var getAlphaChars = function () {
    return alphaNums.substr(0, 51);
};

/*creates a Generator which returns a random element from a list (array in our case)*/
var elements = function (items) {
    return function () {
        return items[utils.random(0, items.length - 1)];
    };
};

basicGens.elements = elements;

/*Generate a random byte*/
basicGens.byte = function () {
    return Math.floor(Math.random() * 256);
};

/*Generate a random character*/
basicGens.char = function () {
    return String.fromCharCode(basicGens.byte());
};

/*Generate a alpha char*/
basicGens.char.alpha = function () {
    return basicGens.elements(getAlphaChars())();
};

/*Generate a alpha numeric character*/
basicGens.char.alphaNum = function () {
    return basicGens.elements(alphaNums)();
};

/*Generate a random ascii character*/
basicGens.char.ascii = function () {
    return String.fromCharCode(basicGens.elements(utils.range(32, 126))());
};

/*Generate a random boolean (true or false)*/
basicGens.bool = function () {
    return basicGens.elements([true, false])();
};

/*Generate one of the falsy values*/
basicGens.falsy = function () {
    return basicGens.elements([false, null, undefined, 0, "", NaN])();
};

/*Generate a random number between min and max (both inclusive)*/
basicGens.random = function () {
    var min = arguments[0] === undefined ? constants.MAX_INT * -1 : arguments[0];
    var max = arguments[1] === undefined ? constants.MAX_INT : arguments[1];
    return utils.random(min, max, true);
};

/*Returns a generators which always generates the given val*/
basicGens.value = function (val) {
    return function () {
        return val;
    };
};

module.exports = basicGens;