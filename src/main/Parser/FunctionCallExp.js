const Exp = require("./Exp");

module.exports = class FunctionCallExp extends Exp {
    constructor(fname, params) {
        this.value = fname;
        this.params = params;
    }

    equals(other) {
        return (other instanceof FunctionCallExp &&
            this.fname == other.fname &&
            this.params == other.params
        )
    }


    toString() {
        return ("FunctionCallExp(" + this.fname.toString() + ", " + 
        this.params.toString() + ")")
    }
}