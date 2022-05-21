const Exp = require("./Exp");

module.exports = class OpExp extends Exp {
    constructor(left, op, right) {
        super();
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

    toString() {
        return ("OpExp(" +
            this.left.toString() + ", " +
            this.op.toString() + ", " +
            this.right.toString() + ")"
        )
    }
}