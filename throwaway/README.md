# jssmartcheck
---
jssmartcheck is a JavaScript property-based testing tool inspired by Haskell's [QuickCheck](https://wiki.haskell.org/Introduction_to_QuickCheck1) and Clojure's [test.check](https://github.com/clojure/test.check).

Property based testing is also known generator based testing or generative testing. The principle behind property based testing is that it's really hard to create random testing data which covers all edge cases. But if we let the machine do the generation of test data for us, we could catch many more errors than otherwise. The generation of data by machine also lets us run our test on much more data than using manual methods.

Another difference from traditional unit testing is that instead of giving the tests an 'expected output', we need to specify a property of the function which holds true for a given 'set' of input. This makes us think harder about the way we write functions, a welcome side effect.

# How to Use
---
```
$ npm install jssmartcheck
```

In your test file - 

```
var jsc = require('jssmartcheck');
var gen = jsc.gen;

// sort is idempotent
var property = function(l) {
	return l.sort() === l.sort().sort();
}

// for all array of integers 'l', sorting l once is equal to sorting l twice
jsc.forAll(gen.arrayOf(gen.int)).check(property);
```

# Documentation
---
## Example Usages
// TODO - add relevant and varied examples


## Generators
jssmartcheck provides a number of generators to get you started. You can also compose your own generators using the existing ones. Or roll up your own. They are just functions.

### Number generators
---
**integers** - gen.int

```
var gen = require('jssmartcheck').gen;

gen.sample(gen.int); // 
```

### String generators
---
