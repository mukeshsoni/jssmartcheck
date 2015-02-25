# jssmartcheck
jssmartcheck is a JavaScript property-based testing tool inspired by Haskell's [QuickCheck](https://wiki.haskell.org/Introduction_to_QuickCheck1) and Clojure's [test.check](https://github.com/clojure/test.check).

Property based testing is also known as generator based testing or generative testing. The principle behind property based testing is that it's really hard to create random testing data which covers all edge cases. But if we let the machine do the generation of test data for us, we could catch many more errors than otherwise. The generation of data by machine also lets us run our test on much more data than using manual methods.

Another difference from traditional unit testing is that instead of giving the tests an 'expected output', we need to specify a property of the function which holds true for a given 'set' of input. This makes us think harder about the way we write functions, a welcome side effect.

# How to Use
```
$ npm install git+https://git@github.com/mukeshsoni/jssmartcheck.git
```

In your test file - 

```
var jsc = require('jssmartcheck');
var gen = jsc.gen;

// sort is idempotent
var property = function(x) {
    return x.sort() === x.sort().sort();
}

// for all array of integers 'l', sorting l once is equal to sorting l twice
jsc.forAll(gen.arrayOf(gen.int)).check(property);
// { result: true, numTests: 100, seed: 14.77343332953751 }

```

Example of a failing test case - 

```
// the first element of a sorted array of integers is less than the last element
var propFn = (x) => {
    x.sort();
    return x[0] < x[x.length - 1];
}

var nonEmptyGen = gen.suchThat((n) => n.length > 0, gen.arrayOf(gen.int));
jsc.forAll(nonEmptyGen).check(propFn)
// {"result":false,"numTests":0,"fail":[[0,0]]} 
```

jssmartcheck will throw an AssertionError if the property function fails for any of the generated input. The printed output will show `result` key as false for a failing test case.

Also as seen in the failing test case, one can easily compose new generators out of the existing ones. jssmartcheck even provides a few helper functions to make the process of writing custom generators easy.

# Integration with testing frameworks
jssmartcheck works out of the box for [mochajs](http://mochajs.org/). Should also work with jasmine and qunit but have not been tested yet.

# Documentation

## Generators
Generators help you generate random values of a specific type against which the property function is run. *jssmartcheck* provides a number of generators to get you started. You can also compose your own generators using the existing ones. Or roll up your own. They are just functions.

You can use the gen.sample function to quickly check what a generator might produce.

### Simple Generators
```
var gen = require('jssmartcheck').gen;

// generate 10 random integers
gen.sample(gen.int, 10); // [ 0, 0, -1, 1, -2, 4, 1, 0, -6, 0 ]

// generate 10 random positive integers
gen.sample(gen.int.positive); // [ 0, 0, -1, 1, -2, 4, 1, 0, -6, 0 ]

// generate 5 random strings
gen.sample(gen.string, 5); // [ '', '', '\u0012', 'tû¨', 'è' 

```

### Slightly complex Generators
```
// generate 10 random ascii strings
gen.sample(gen.string.ascii, 10); // [ '', '', '9', '', 'rNq', '6b#Ph', 'J', 'r', '.K', '\'qwq DcZ' ]

// generate 10 random alpha numeric strings
gen.sample(gen.string.alphaNum, 10); // [ '', '', '', 'Ti', 'A', 'vInl', 'Wi', 'puniD', 'q3z', 'RuZZ3Rsh' ]

// generate 5 strings matching the given pattern
gen.sample(gen.string.matches(/boo{1,3}m/)); // [ 'boom', 'boom', 'boooom', 'booom', 'boom' ]

// generate numeric strings of length 3-6 characters and numeric only
gen.sample(gen.string.matches(/\d{3,6}/), 5); // [ '3404', '3685', '4451', '137513', '75258' ]

// generate an object of given shape
gen.sample(gen.object.ofShape({
    name: gen.string.matches(/\w{3,5}(\s\w{5,8})?/),
    age: gen.suchThat((age) => age > 4, gen.int.positive),
    sex: gen.elements(['M', 'F', 'Neither'])
}), 10)

/*
    [ 
        { name: 'vWo4 _7ivwS', age: 10, sex: 'M' },
        { name: 'T9uZe', age: 9, sex: 'F' },
        { name: '53f O_JBi1u', age: 6, sex: 'M' },
        { name: '0n1', age: 6, sex: 'Neither' },
        { name: '49yW MQzJyHBR', age: 5, sex: 'F' },
        { name: 'm24　XbC68G', age: 6, sex: 'M' },
        { name: 'iON i_7u5_V', age: 7, sex: 'F' },
        { name: '_3yc', age: 7, sex: 'Neither' },
        { name: 'StH_\fJE3_fJX', age: 10, sex: 'M' },
        { name: '7bo8\fwt73_H', age: 7, sex: 'F' } 
    ]
*/
```

### Detailed Documentation of all Generators
> This section is still being worked upon. In the meanwhile, please check the files or the tests to get an idea of the supported generators