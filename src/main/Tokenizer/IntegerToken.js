const Token = require("./Token")
module.exports = class IntegerToken extends Token{
    constructor(value){
        super();
        this.value = value;
    }

    hashCode(){
        return this.value;
    }

    toString(){
        return "IntegerToken(" + this.value + ")" ;
    }

    equals(other){
        if(other instanceof IntegerToken){
            let asInt = other
            if (this.value === asInt.value){
                return true;
            }
        } else {
            return false;
        }
    }
}