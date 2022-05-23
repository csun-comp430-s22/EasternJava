const Node = require("./Node")
module.exports = class Program extends Node {
    constructor(stmt) {
        this.stmt = stmt;
    }
}