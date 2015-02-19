var _ = require('lodash');
var utils = require('../utils');
var generator = require('./index');
var constants = require('../constants');

var basicGens = {};
var alphaNums = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var getAlphaChars = () => alphaNums.substr(0, 51);

/*Generate a random byte*/
basicGens.byte = () => Math.floor(Math.random() * 256);

/*Generate a random character*/
basicGens.char = () => String.fromCharCode(basicGens.byte());

/*Generate a alpha char*/
basicGens.char.alpha = () => generator.elements(getAlphaChars())();

/*Generate a alpha numeric character*/
basicGens.char.alphaNum = () => generator.elements(alphaNums)();

/*Generate a random ascii character*/
basicGens.char.ascii = () => String.fromCharCode(generator.elements(utils.range(32,126))());

/*Generate a random boolean (true or false)*/
basicGens.bool = () => generator.elements([true, false])();

/*Generate one of the falsy values*/
basicGens.falsy = () => generator.elements([false, null, undefined, 0, "", NaN])();

/*Generate a random number between min and max (both inclusive)*/
basicGens.random = (min=constants.MAX_INT * -1, max=constants.MAX_INT) => utils.random(min, max, true);

/*Returns a generators which always generates the given val*/
basicGens.value = val => () => val;

generator.extend(basicGens);

module.exports = basicGens;