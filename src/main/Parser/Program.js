const Node = require("./Node")
module.exports = class Program extends Node {
    constructor(stmt) {
        super();
        this.stmt = stmt;
    }
}