const Token = require("./Token")
module.exports = class PlusToken extends Token {

   equals(other){
       return other instanceof PlusToken
   }
   
   hashCode(){
       return 0;
   }

   toString(){
    return "PlusToken";
   }
}