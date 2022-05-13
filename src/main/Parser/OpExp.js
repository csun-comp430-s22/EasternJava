const Exp = require("./Exp");

module.exports = class OpExp extends Exp {
    constructor(left, op, right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }

    equals(other) {
        if (other instanceof OpExp) {
            const otherExp = other;
            return (this.left === otherExp.left &&
                this.op === otherExp.op &&
                this.right === otherExp.right
            )
        } else {
            return false;
        }
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