const Token = require("./Token")
module.exports = class VariableToken extends Token {
    constructor(name) {
        super();
        this.name = name;
    }

    hashCode() {
        //set variable hash as 0
        var hash = 0,
        ch;
        if (this.name == 0) {
            return hash;
        }
        for (let i = 0; i < this.name.length; i++) {
            ch = this.name.charCodeAt(i);
            hash = ((hash << 5) - hash) + ch;
            hash = hash & hash;
        }
        return hash;
    }

    toString() {
        return "Variable(" + this.name + ")";
    }

    equals(other) {
        if (other instanceof VariableToken) {
            let asVar = other
            if (this.name === asVar.name) {
                return true;
            }
        } else {
            return false;
        }
    }
}