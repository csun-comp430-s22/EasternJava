const Op = require("./Op");
module.exports = class LessThanOp extends Op{
    equals(other) {
        return (other instanceof LessThanOp);
    }

    hashCode() {
        return 2 ;
    }

    toString() {
        return "LessThanOp";
    }
}