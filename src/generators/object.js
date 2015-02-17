var _ = require('lodash');
var generator = require('./index');
var assert = require('assert');

var objectGens = {};
objectGens.object = {};

function generateObjectOfShape(shape) {
    var result = {};
    var size = 10;
    for (var prop in shape) {
        if (shape.hasOwnProperty(prop)) {
            if(typeof shape[prop] === 'function') {
                result[prop] = shape[prop](size);
            } else if(_.isObject(shape[prop])) {
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
    assert(_.isObject(shape), 'Need an argument of Object type');

    return generateObjectOfShape.bind(this, shape);
};

generator.extend(objectGens);
module.exports = objectGens;