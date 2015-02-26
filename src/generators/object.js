var assert = require('assert');
var utils = require('../utils');
var basicGen = require('./basic.js');
var numberGen = require('./number.js');
var stringGen = require('./string.js');
var miscGen = require('./misc.js');

var objectGens = {};

// generate a random object.
objectGens.object = () => {
    var maxProps = 10;
    var numProps = utils.random(1, maxProps);
    var maxKeyLength = 10;
    var keyGenerator = miscGen.suchThat((str) => str.length > 0, stringGen.string);
    var valSizeMax = 20;
    var resultObject = {};

    for(let i = 0; i < numProps; i++) {
        let key = keyGenerator(maxKeyLength);
        let val = miscGen.any(valSizeMax);
        resultObject[key] = val;
    }

    return resultObject;
};

function generateObjectOfShape(shape) {
    var result = {};
    var size = 10;
    for (var prop in shape) {
        if (shape.hasOwnProperty(prop)) {
            if(typeof shape[prop] === 'function') {
                result[prop] = shape[prop](size);
            } else if(utils.isObject(shape[prop])) {
                result[prop] = generateObjectOfShape(shape[prop]);
            } else {
                result[prop] = shape[prop];
            }
        }
    }

    return result;
}

/*Generateo an object of given shape*/
objectGens.object.ofShape = (shape) => {
    assert(utils.isObject(shape), 'Need an argument of Object type');

    return generateObjectOfShape.bind(this, shape);
};

module.exports = objectGens;