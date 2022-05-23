const Stmt = require("./Stmt");

module.exports = class VardecStmt extends Stmt {
    constructor(vardec, exp) {
        super();
        this.vardec = vardec;
        this.exp = exp;
    }

    equals(other) {
        let otherStmt = other;
        if (other instanceof VardecStmt) {
            return (this.vardec === otherStmt.vardec &&
                this.exp === otherStmt.exp)
        } else {
            return false;
        }
    }

    toString() {
        return "VardecStmt(" + this.vardec.toString() + ", " +
            this.exp.toString() + ")"
    }
}