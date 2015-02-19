var _ = require('lodash');

function choose(elements) {
    return elements[random(0, elements.length-1)];
}

function isAscii(str) {
    return /^[\x00-\x7F]*$/.test(str);
}


function _getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
// generate a random number between min and max. 
function random(min, max, isFloat) {
	return isFloat ? _getRandomNumber(min, max) : Math.floor(_getRandomNumber(min, max));
}

var utils = {
    choose: choose,
    isAscii: isAscii,
    random : random
};

module.exports = utils;