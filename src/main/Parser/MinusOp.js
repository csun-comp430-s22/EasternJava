const Op = require("./Op");
module.exports = class MinusOp extends Op{
    equals(other) {
        return (other instanceof MinusOp);
    }

    hashCode() {
        return 1;
    }

    toString() {
        return "MinusOp";
    }
}