const Stmt = require("./Stmt");

module.exports = class ReturnStmt extends Stmt {
    constructor(input) {
        super();
        this.input = input;
    }

    equals(other) {
        return (other instanceof ReturnStmt &&
            this.input == other.input
        )
    }

    toString() {
        return ("ReturnStmt(" + this.input.toString() + ")")
    }
}