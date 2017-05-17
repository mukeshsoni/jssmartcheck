'use strict';

var gen = require('../src/generators/object');
var stringGen = require('../src/generators/string');
var numberGen = require('../src/generators/number');
var _ = require('lodash');
var expect = require('chai').expect;

describe('object generators', () => {
    describe('object of any shape', () => {
        it('should generate object of random shape', () => {
            _.times(100, () => {
                expect(gen.object()).to.be.an('object');
            });
        });
    });

    describe('object of particular shape', () => {
        it('should throw if not passed an object as argument', () => {
            expect(()=>gen.object.ofShape()).to.throw(Error);
            expect(()=>gen.object.ofShape('hello')).to.throw(Error);
            expect(()=>gen.object.ofShape(1)).to.throw(Error);
            expect(()=>gen.object.ofShape({})).to.not.throw();
        });

        it('should generate object of given shape', () => {
            expect(gen.object.ofShape({name: 'mukesh'})()).to.eql({name: 'mukesh'});

            var regex = /^m(r|s)\. [A-Z][a-z]{3,9}$/;
            var shape = {name: stringGen.string.matches(regex), greeting: 'hello', age: numberGen.int.positive};
            var randomObj = gen.object.ofShape(shape)();
            expect(randomObj).to.include.keys('name', 'greeting', 'age');
            expect(randomObj).to.have.property('age')
                                .that.is.a('number');
            expect(randomObj).to.have.property('greeting')
                                .that.deep.equals('hello');
            expect(randomObj).to.have.property('name')
                                .that.match(regex);
        });

        it('should generated nested objects for nested shapes', () => {
            var regex = /^m(r|s)\. [A-Z][a-z]{3,9}$/;
            var shape = {
                name: stringGen.string.matches(regex),
                details: {
                    age: numberGen.int.positive
                }
            };
            var randomObj = gen.object.ofShape(shape)();
            expect(randomObj).to.have.property('details')
                                .that.is.an('object');
            expect(randomObj).to.have.deep.property('details.age')
                                .that.is.a('number');
        });
    });
});
