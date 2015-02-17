var _ = require('lodash');

function choose(elements) {
    return elements[_.random(0, elements.length-1)];
}

function isAscii(str) {
    return /^[\x00-\x7F]*$/.test(str);
}

var utils = {
    choose: choose,
    isAscii: isAscii
};

module.exports = utils;