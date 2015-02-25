"use strict";

var assert = require("assert");
var utils = require("../utils");

var objectGens = {};
objectGens.object = {};

function generateObjectOfShape(shape) {
    var result = {};
    var size = 10;
    for (var prop in shape) {
        if (shape.hasOwnProperty(prop)) {
            if (typeof shape[prop] === "function") {
                result[prop] = shape[prop](size);
            } else if (utils.isObject(shape[prop])) {
                result[prop] = generateObjectOfShape(shape[prop]);
            } else {
                result[prop] = shape[prop];
            }
        }
    }

    return result;
}

/*Generateo an object of given shape*/
objectGens.object.ofShape = function (shape) {
    assert(utils.isObject(shape), "Need an argument of Object type");

    return generateObjectOfShape.bind(undefined, shape);
};

module.exports = objectGens;