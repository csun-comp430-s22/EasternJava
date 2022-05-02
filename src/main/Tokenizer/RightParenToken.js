const Token = require("./Token")
module.exports = class RightParenToken extends Token {
    equals(other){
        return other instanceof RightParenToken
    }
    
    hashCode(){
        return 4;
    }
 
    toString(){
     return ")";
    }
 }