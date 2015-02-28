'use strict';

var utils = require('../utils');

var arrayGens = {};
arrayGens.arrayOf = (gen) => {
    // yeah, unreadble, but fun :)
    return (size=10) => utils.range(utils.random(0, size)).map(i => gen(i));
};

module.exports = arrayGens;
