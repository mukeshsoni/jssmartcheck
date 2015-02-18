- [X] function generator
    - [] The all but last parameters actually need to be type of argument. e.g. - fngen.fn(Integer, String, gen.number)
- [X] object generator
- [X] date generator
- [ ] For size=100, if we use a suchThat fn which says number > 1000, this fellow would be stuck in infinite loop
- [ ] generator.fmap --> nothing but a map but for generators. e.g. mySpecialGen = generator.fmap((rval)=>rval.toString(), generator.int)
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
- [ ] shrink
- [ ] Documentation
- [ ] browserify on prepublish will give error because 'dist' is not there
- [ ] need to include an 'exclude' list for browserify. or else the output lib is 12k+ lines of code!