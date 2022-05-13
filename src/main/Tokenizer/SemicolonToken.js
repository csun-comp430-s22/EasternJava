const Token = require("./Token")
module.exports = class SemicolonToken extends Token {
    equals(other){
        return other instanceof SemicolonToken
    }
    
    hashCode(){
        return 10;
    }
 
    toString(){
     return "SemicolonToken";
    }
 }