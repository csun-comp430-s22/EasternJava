const Type = require("../Typechecker/Type");

module.exports = class BoolType extends Type {
    constructor() {
        super();
    }

    equals(other) {
        return (other instanceof BoolType)
    }

    toString() {
        return "BoolType";
    }
}