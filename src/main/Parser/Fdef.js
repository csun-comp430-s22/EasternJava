
module.exports = class Fdef {
    constructor(returnType, fname, args) {
        this.returnType = returnType;
        this.fname = fname;
        this.arguments = args;
        this.body = body;

    }

    equals(other) {
        let othervar = other;
        if (other instanceof Fdef) {
            return (this.returnType === othervar.returnType &&
                this.fname === othervar.fname &&
                this.arguments === othervar.arguments &&
                this.body === othervar.body)
        } else {
            return false;
        }
    }

    toString() {
        return "Fdef(" + this.returnType.toString() + ", " +
            this.fname.toString() +
            this.arguments.toString() + ", " +
            this.body.toString() + ")"  
    }
}