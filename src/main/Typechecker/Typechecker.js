const TypeErrorException = require("./TypeErrorException")

module.exports = class Tokenizer {

    constructor(program) {
        this.program = program
        let functions = new []
        for (fdef in program.funcitons) {
            if (!functions.contains(fdef.fname)) {
                functions.push({fname: fdef.name, fdef: fdef })
            } else {
                throw new TypeErrorException("Function with duplicate name: " + fdef.fname)
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

    typeofFunctionCall(exp, typeEnvironment){
        const fdef = this.getFunctionByName(exp.fname)
        if (exp.param.length != fdef.arguments.length){
            throw new TypeErrorException("Wrong number of arguments for function: " + fdef.fname)
        }
        for (i = 0; i < exp.params.length; i++){
            const recievedArgumentType = typeof(exp.params.get(index), typeEnvironment)
            const expectedArgumentType = fdef.arguments[i].type
            if(!recievedArgumentType == expectedArgumentType){
                throw new TypeErrorException("Type mismatch on function call argument")
            }
        }
        return fdef.returnType
    }


}