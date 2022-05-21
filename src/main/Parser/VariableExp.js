const Exp = require("./Exp");

module.exports = class VariableExp extends Exp {
    constructor(variable) {
        super();
        this.variable = variable;
    }

    equals(other) {
        return (other instanceof VariableExp &&
            value == other.variable
        )
    }

    toString() {
        return ("OpExp(" +
            "VariableExp(" + this.variable.toString() + ")"
        )
    }
}