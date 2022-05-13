const Exp = require("./Exp");

module.exports = class IntegerExp extends Exp {
    constructor(value) {
        this.value = value;
    }

    equals(other) {
        return (other instanceof IntegerExp &&
            value == other.value
        )
    }

    hashCode() {
        return (this.left.hashCode() + this.op.hashCode() + this.right.hashCode())
    }

    toString() {
        return ("OpExp(" +
            this.left.toString() + ", " +
            this.op.toString() + ", " +
            this.right.toString() + ")"
        )
    }
}