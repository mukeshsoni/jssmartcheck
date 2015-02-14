// gets all generators together into a single module
var _ = require('lodash');

var generators = {};
generators.extend = function(obj) {
	_.extend(this, obj);
}

module.exports = generators;