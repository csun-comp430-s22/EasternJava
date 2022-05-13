
module.exports = class Variable {
    constructor(name) {
        this.name = name;
    }

    hashCode() {
        return this.name.hashCode();
    }

    equals(other) {
        return (other instanceof PrintlnStmt &&
            this.name === other.name
        )
    }

    toString() {
        return "Println(" + exp.toString() + ")"
    }
}