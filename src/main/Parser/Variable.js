
module.exports = class Variable {
    constructor(name) {
        this.name = name;
    }


    equals(other) {
        return (other instanceof Variable &&
            this.name === other.name
        )
    }

    toString() {
        return this.name
    }
}