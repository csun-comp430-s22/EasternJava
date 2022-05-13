const Exp = require("./Exp");

module.exports = class VariableExp extends Exp {
    constructor(variable) {
        this.variable = variable;
    }

    equals(other) {
        return (other instanceof VariableExp &&
            value == other.variable
        )
    }

    hashCode() {
        return (this.variable.hashCode())
    }

    toString() {
        return ("OpExp(" +
            "VariableExp(" + this.variable.toString() + ")"
        )
    }
}