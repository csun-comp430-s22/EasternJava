const Stmt = require("./Stmt");

module.exports = class PrintlnStmt extends Stmt {
    constructor(exp) {
        this.exp = exp;
    }

    equals(other) {
        return (other instanceof PrintlnStmt &&
            this.exp === (other.exp)
        )
    }

    toString() {
        return "Println(" + this.exp.toString() + ")"
    }
}