const Exp = require("./Exp");

module.exports = class IntegerExp extends Exp {
    constructor(value) {
        super();
        this.value = value;
    }

    equals(other) {
        return (other instanceof IntegerExp &&
            this.value == other.value
        )
    }

    hashCode() {
        return this.value
    }

    toString() {
        return ("IntegerExp(" + this.value + ")")
    }
}