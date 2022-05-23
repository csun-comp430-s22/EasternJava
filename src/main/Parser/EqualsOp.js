const Op = require("./Op");
module.exports = class EqualsOp extends Op{
    equals(other) {
        return (other instanceof EqualsOp);
    }

    toString() {
        return "EqualsOp";
    }
}