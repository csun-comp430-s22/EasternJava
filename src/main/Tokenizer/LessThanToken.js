const Token = require("./Token")
module.exports = class LessThanToken extends Token {

   equals(other){
       return other instanceof LessThanToken
   }
   
   hashCode(){
       return 2;
   }

   toString(){
    return "LessThanToken";
   }
}