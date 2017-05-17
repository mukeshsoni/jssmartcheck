- [X] function generator
    - [] The all but last parameters actually need to be type of argument. e.g. - fngen.fn(Integer, String, gen.number)
- [X] object generator
- [X] date generator
- [X] generator.suchThat -> applying filters on generators to get all kinds of customized generators
    - One implementation idea
    ```
    gen.suchThat = (filterFn, gen) => {
        return (size) => {
            var generatedValue = gen(size)
            while(filterFn(generatedValue) !== true) {
                generatedValue = gen(size);
            }
            return generatedValue;
        }
    }
    ```
- [X] browserify on prepublish will give error because 'dist' is not there
- [X] need to include an 'exclude' list for browserify. or else the output lib is 12k+ lines of code!
- [X] write proper implementation of gen.any
- [X] write gen.any.simple
- [X] write implementation for gen.object
- [ ] Documentation
    - [ ] example tests
    - [X] README
- [ ] pass/generate seed for random number generation. Can be used to regenerate same tests again.
- [ ] shrink
- [ ] generator.fmap --> nothing but a map but for generators. e.g. mySpecialGen = generator.fmap((rval)=>rval.toString(), generator.int)