var _ = require('lodash');
var utils = require('../utils');
var constants = require('../constants');
var basicGens = {};
var alphaNums = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var getAlphaChars = () => alphaNums.substr(0, 51);


/*creates a Generator which returns a random element from a list (array in our case)*/
var elements = (items) => {
    return () => items[utils.random(0, items.length-1)];
}

basicGens.elements = elements;

/*Generate a random byte*/
basicGens.byte = () => Math.floor(Math.random() * 256);

/*Generate a random character*/
basicGens.char = () => String.fromCharCode(basicGens.byte());

/*Generate a alpha char*/
basicGens.char.alpha = () => basicGens.elements(getAlphaChars())();

/*Generate a alpha numeric character*/
basicGens.char.alphaNum = () => basicGens.elements(alphaNums)();

/*Generate a random ascii character*/
basicGens.char.ascii = () => String.fromCharCode(basicGens.elements(utils.range(32,126))());

/*Generate a random boolean (true or false)*/
basicGens.bool = () => basicGens.elements([true, false])();

/*Generate one of the falsy values*/
basicGens.falsy = () => basicGens.elements([false, null, undefined, 0, "", NaN])();

/*Generate a random number between min and max (both inclusive)*/
basicGens.random = (min=constants.MAX_INT * -1, max=constants.MAX_INT) => utils.random(min, max, true);

/*Returns a generators which always generates the given val*/
basicGens.value = val => () => val;


module.exports = basicGens;