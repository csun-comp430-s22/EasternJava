const Stmt = require("./Stmt");

module.exports = class BlockStmt extends Stmt {
    constructor(stmts){
        super();
        this.stmts = stmts;
    }
}