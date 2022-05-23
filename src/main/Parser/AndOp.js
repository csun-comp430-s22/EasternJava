const Op = require("./Op");

module.exports = class AndOp extends Op{
    equals(other) {
        return (other instanceof AndOp);
    }

    toString() {
        return "AndOp";
    }
}