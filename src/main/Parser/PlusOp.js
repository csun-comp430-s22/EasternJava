const Op = require("./Op");
module.exports = class PlusOp extends Op{
    equals(other) {
        return (other instanceof PlusOp);
    }

    hashCode() {
        return 0;
    }

    toString() {
        return "PlusOp";
    }
}