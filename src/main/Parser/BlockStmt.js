const Stmt = require("./Stmt");

module.exports = class BlockStmt extends Stmt {
    constructor(stmt){
        this.stmt = stmt;
    }
}