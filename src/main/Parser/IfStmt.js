const Stmt = require("./Stmt");

module.exports = class IfStmt extends Stmt {
    constructor(guard, trueBranch, falseBranch) {
        this.guard = guard;
        this.trueBranch = trueBranch;
        this.falseBranch = falseBranch;
    }

    hashCode() {
        return (this.guard.hashCode() +
            this.trueBranch.hashCode() +
            this.falseBranch.hashCode());
    }

    equals(other) {
        let otherStmt = other;
        if (other instanceof IfStmt) {
            return (this.guard === otherStmt.guard &&
                this.trueBranch === otherStmt.trueBranch &&
                this.falseBranch === otherStmt.falseBranch)
        } else {
            return false;
        }
    }

    toString() {
        return "IfStmt(" + this.guard.toString() + ", " +
            this.trueBranch.toString() + ", " +
            this.falseBranch.toString() + ")"
    }
}