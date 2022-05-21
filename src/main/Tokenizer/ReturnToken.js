const Token = require("./Token")
module.exports = class ReturnToken extends Token {

   equals(other){
       return other instanceof ReturnToken
   }

   toString(){
    return "return";
   }
}