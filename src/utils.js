var _extend = require('extend');

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

function random(min=0, max=Number.MAX_VALUE, isFloat) {
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

function isFunction(value) {
  return typeof value == 'function' || false;
}

function isString(value) {
	return !!(value.substring);
}

function extend(...obj) {
    return _extend.apply(_extend, [true].concat(obj));
}

function last(array) {
	return array[array.length-1];
}

//https://github.com/addyosmani/memoize.js
function memoize(func) {
    var stringifyJson = JSON.stringify,
        cache = {};

    var cachedfun = function() {
        var hash = stringifyJson(arguments);
        return (hash in cache) ? cache[hash] : cache[hash] = func.apply(this, arguments);
    };

    cachedfun.__cache = (function() {
        cache.remove || (cache.remove = function() {
            var hash = stringifyJson(arguments);
            return (delete cache[hash]);
        });
        return cache;
    }).call(this);

    return cachedfun;
}

var utils = {
    choose: choose,
    isAscii: isAscii,
    random : random,
    range : range,
    isObject : isObject,
    isFunction : isFunction,
    isString : isString,
    extend : extend,
    last : last,
    memoize : memoize
};

module.exports = utils;