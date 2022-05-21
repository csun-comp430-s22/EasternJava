module.exports = class Tokenizer {

    constructor(program) {
        this.program = program
        let functions = new []
        for (fdef in program.funcitons) {
            if (!functions.contains(fdef.fname)) {
                functions.push({fname: fdef.name, fdef: fdef })
            } else {
                throw new TypeErroException("Function with duplicate name: " + fdef.fname)
            }
        }
    }

    getFunctionByName(fname) {
        const fdef = functions[fname];
        if (fdef == null) {
            throw new TypeErrorException("No such function with name: " + fname);
        } else {
            return fdef
        }
    }

    // typeofFunctionCall(exp, typeEnvironment){
    //     const fdef = this.getFunctionByName(exp.fname)
    //     if (exp.param){
    //     }
    // }


}