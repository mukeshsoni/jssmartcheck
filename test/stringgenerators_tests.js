var gen = require('../src/generators/string');
var _ = require('lodash');
var utils = require('../src/utils');
var expect = require('chai').expect;

describe('string generators', () => {
	// describe('byte', function () {
	// 	it('should generate byte between 0 and 255', () => {
	// 		_.times(300, () => expect(gen.byte()).to.be.within(0, 255));
	// 	});
	// });
	describe('generate random strings', function () {
		it('should not generate random string greater than size', () => {
			_.times(10, () => {
				var size = Math.round(Math.random()*1000);
				expect(gen.string(size)).to.have.length.of.at.most(size);
			});
		});

		// this test can actually fail some times (once in a million or so)
		it('should generate some strings of length less than size in 100 iterations', () => {
			var size = Math.round(Math.random()*1000);
			var generatedStrings = _.map(_.range(100), () => {
				return gen.string(size);
			});

			// atleast one generated string has size less than size
			expect(_.some(generatedStrings, (string) => (string.length < size))).to.be.true;
		});

		it('should generate random ascii string', () => {
			_.times(30, () => {
				expect(utils.isAscii(gen.string.ascii(20))).to.be.true;
			});
		});

		it('should generate random alpha string', () => {
			var alphaNums = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			var getAlphaChars = () => alphaNums.substr(0, 51);

			_.times(30, () => {
				let randomAlphaString = gen.string.alpha(20);
				_.each(randomAlphaString, char => expect(getAlphaChars()).to.contain(char));
			});
		});

		it('should generate random alpha numeric string', () => {
			var alphaNums = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

			_.times(30, () => {
				let randomAlphaString = gen.string.alphaNum(20);
				_.each(randomAlphaString, char => expect(alphaNums).to.contain(char));
			});
		});
	});

	describe('generating random strings matching a pattern', function () {
		function runTests(regexes, iterations=10) {
			_.times(iterations, () => {
				regexes.forEach((regex) => {
					expect(gen.string.matches(regex)()).to.have.match(regex);
				});
			});
		}

		it('should only accept regex string or regex as input', () => {
			expect(() => gen.string.matches(123)).to.throw(Error);
			expect(() => gen.string.matches("abc")).to.not.throw();
			expect(() => gen.string.matches("ab.c?d*")).to.not.throw();
			expect(() => gen.string.matches(/ab./)).to.not.throw(Error);
			expect(() => gen.string.matches(/ab./ig)).to.not.throw(Error);
		});

		it('should throw if the regex is invalid', function() {
			var regexes = [/[^\W\w]/, /[^\D\d]/, /[^\S\s]/, /[]/];
			// console.log(gen.string.matches(regexes[0])());
			// expect(() => gen.string.matches(/a^/)).to.throw(Error);
			// console.log(gen.string.matches(/ab/)());
		});

		it('should work for simple pattern. No repetition, nothing fancy', () => {
			var regexes = [/ab/, /abcd/, /random/, /morerandomtext/];
			runTests(regexes);
		});

		it('should work for \d, \w, \W, \D category generators', () => {
			var regexes = [/ab\d/, /ab\d\w/, /ab\D\w/, /ab\d\W/, /ab\D\W/, /ab\sc/, /ab\Sc/];
			runTests(regexes);
		});

		it('should take care of range expressions', () => {
			var regexes = [/ab[0-5]/, /[0-5]cd/, /ab[a-e][2-9]/];
			runTests(regexes);
		});

		it('should take care of repetition patterns', () => {
			var regexes = [/ab*/, /ab[0-5]*/, /fe+d/, /\s{2,}/, /\d{2,4}/];
			runTests(regexes, 2);
		});

		it('should take care of position patterns (^, $)', () => {
			var regexes = [/^ab$/];
			runTests(regexes);
		});

		it('should take care of pipes', () => {
			var regexes = [/ab|cd/, /(ab|cd)/, /[0-5]|[a-f]/];
			runTests(regexes);
		});

		it('should do negative lookahead. match x iff not followed by y', () => {
			var regexes = [/^\d(?! years)/];
			runTests(regexes);
		});

		it('should do positive lookahead. match x iff followed by y', () => {
			var regexes = [/mukesh(?= soni)/];
			runTests(regexes);
		});

		it('should match but not capture a group', () => {
			var regexes = [/(?:.d){2}/];
			runTests(regexes);
		});
	});
});