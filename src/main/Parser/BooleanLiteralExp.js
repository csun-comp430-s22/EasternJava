const Exp = require("./Exp");

module.exports = class BooleanLiteralExp extends Exp {
    constructor(input) {
        super();
        this.input = input;
    }

    equals(other) {
        return (other instanceof BooleanLiteralExp &&
            this.input == other.input
        )
    }

    toString() {
        return ("BooleanLiteralExp(" + this.input.toString() + ")")
    }
}