'use strict';

// gets all generators together into a single module
var utils = require('../utils');
var stringGen = require('./string.js');
var numberGen = require('./number.js');
var arrayGen = require('./array.js');
var basicGen = require('./basic.js');
var functionGen = require('./function.js');
var objectGen = require('./object.js');
var miscGen = require('./misc.js');

var sample = (gen, times=100) => {
    var results = [];
    for(var i = 0; i < times; i++) {
        results.push(gen(i));
    }

    return results;
};

var generators = {
    sample: sample
};

generators.extend = function(...obj) {
    if(typeof obj.join !== 'function') {
        obj = [obj];
    }
    utils.extend.apply(utils, [generators].concat(obj));
};

generators.extend(stringGen, numberGen, arrayGen, basicGen, functionGen, objectGen, miscGen);
module.exports = generators;
