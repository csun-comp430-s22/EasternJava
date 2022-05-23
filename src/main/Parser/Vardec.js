
module.exports = class Vardec {
    constructor(type, variable) {
        this.type = type;
        this.variable = variable;

    }

    equals(other) {
        let othervar = other;
        if (other instanceof Vardec) {
            return (this.type === othervar.type &&
                this.variable === othervar.variable)
        } else {
            return false;
        }
    }

    toString() {
        return "Vardec(" + this.type.toString() + ", " +
            this.variable.toString() + ")"
    }
}