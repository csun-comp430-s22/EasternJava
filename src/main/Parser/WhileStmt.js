const Stmt = require("./Stmt");

module.exports = class WhileStmt extends Stmt {
    constructor(guard, body) {
        super();
        this.guard = guard;
        this.body = body;

    }

    equals(other) {
        let otherStmt = other;
        if (other instanceof WhileStmt) {
            return (this.guard === otherStmt.guard &&
                this.body === otherStmt.body)
        } else {
            return false;
        }
    }

    toString() {
        return "IfStmt(" + this.guard.toString() + ", " +
            this.body.toString() + ")"
    }
}       