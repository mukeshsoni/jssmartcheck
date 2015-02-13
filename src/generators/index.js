// gets all generators together into a single module
var _ = require('lodash');
var basicGens = require('./basic.js');
var arrayGens = require('./array.js');
var stringGens = require('./string.js');
var numberGens = require('./number.js');

var generators = _.extend({}, basicGens, arrayGens, stringGens, numberGens);

module.exports = generators;