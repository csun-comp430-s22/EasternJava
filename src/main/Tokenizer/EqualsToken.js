const Token = require("./Token")
module.exports = class EqualsToken extends Token {

   equals(other){
       return other instanceof EqualsToken
   }
   
   hashCode(){
       return 3;
   }

   toString(){
    return "EqualsToken";
   }
}