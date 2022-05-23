const Token = require("./Token")
module.exports = class MinusToken extends Token {

   equals(other){
       return other instanceof MinusToken
   }
   
   hashCode(){
       return 1;
   }

   toString(){
    return "MinusToken";
   }
}