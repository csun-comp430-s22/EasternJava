module.exports = class FunctionName {
    constructor(name) {
        this.name = name;
    }

    equals(other) {
        return (other instanceof FunctionName &&
            this.name == other.name
        )
    }


    toString() {
        return ("FunctionName(" + this.name + ")")
    }
}