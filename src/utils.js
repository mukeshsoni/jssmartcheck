var _ = require('lodash');

function choose(elements) {
    return elements[random(0, elements.length-1)];
}

function isAscii(str) {
    return /^[\x00-\x7F]*$/.test(str);
}


// generate a random number between min and max.
function _getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function random(min, max, isFloat) {
	return isFloat ? _getRandomNumber(min, max) : Math.round(_getRandomNumber(min, max));
}

// generate a range of values (array)
function range(min, max) {
	var lowLimit = max ? min : 0,
		upLimit = max ? max : min;
	return Array.apply(0, Array(upLimit - lowLimit)).map(function (x, y) { return y + lowLimit; });
}

function isObject(value) {
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

var utils = {
    choose: choose,
    isAscii: isAscii,
    random : random,
    range : range,
    isObject : isObject
};

module.exports = utils;