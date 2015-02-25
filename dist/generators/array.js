"use strict";

var utils = require("../utils");

var arrayGens = {};
arrayGens.arrayOf = function (gen) {
    // yeah, unreadble, but fun :)
    return function (size) {
        return utils.range(utils.random(0, size)).map(function (i) {
            return gen(i);
        });
    };
};

module.exports = arrayGens;