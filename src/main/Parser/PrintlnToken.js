const Token = require("../Tokenizer/Token")
module.exports = class PrintlnToken extends Token {
    equals(other){
        return other instanceof PrintlnToken
    }
    
 
    toString(){
     return "PrintlnToken";
    }
 }