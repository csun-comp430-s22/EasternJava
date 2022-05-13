const Stmt = require("./Stmt");

module.exports = class EqualsOp extends Op{
    equals(other) {
        return (other instanceof EqualsOp);
    }

    hashCode() {
        return 3 ;
    }

    toString() {
        return "EqualsOp";
    }
}