const Token = require("./Token")
module.exports = class PrintlnToken extends Token {
    equals(other){
        return other instanceof PrintlnToken
    }
    
    hashCode(){
        return 11;
    }
 
    toString(){
     return "PrintlnToken";
    }
 }