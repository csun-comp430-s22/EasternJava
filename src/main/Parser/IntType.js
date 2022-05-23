const Type = require("../Typechecker/Type");

module.exports = class IntType extends Type {
    constructor() {
        super();
    }

    equals(other) {
        return (other instanceof IntType)
    }

    toString() {
        return "IntType";
    }
}