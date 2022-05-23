const Exp = require("./Exp");

module.exports = class IntegerLiteralExp extends Exp {
    constructor(value) {
        super();
        this.value = value;
    }

    equals(other) {
        return (other instanceof IntegerLiteralExp &&
            this.value == other.value
        )
    }

    toString() {
        return ("IntegerLiteralExp(" + this.value.toString() + ")")
    }
}