const TrueToken = require("./TrueToken")
const FalseToken = require("./FalseToken")
const ElseToken = require("./ElseToken")
const IfToken = require("./IfToken")
const IntegerToken = require("./IntegerToken")
const VariableToken = require("./VariableToken")
const LeftParenToken = require("./LeftParenToken")
const RightParenToken = require("./RightParenToken")
const LeftCurlyToken = require("./LeftCurlyToken")
const RightCurlyToken = require("./RightCurlyToken")
const TokenizerException = require("./TokenizerException")



module.exports = class Tokenizer {
    constructor(input) {
        this.input = input;
        this.offset = 0;
    }

    skipWhiteSpace() {
        while ((this.offset < this.input.length) &&
            (this.input.charAt(this.offset) == ' ')) {
            this.offset++
        }
    }

    isLetter(input) {
        let letter = RegExp("[A-Za-z]");
        input = input.toString()
        if (input.match(letter)) {
            return true
        } else {
            return false
        }
    }

    tryTokenizeInteger() {
        this.skipWhiteSpace();

        let number = ""

        while (this.offset < this.input.length &&
                Number.isInteger(parseInt(this.input.charAt(this.offset)))) {
            console.log(this.input.charAt(this.offset));
            number += this.input.charAt(this.offset);
            this.offset++;
        }

        if (number.length > 0) {
            return new IntegerToken(number);
        } else {
            return null;
        }

    }

    //Add tryTokenizeVariableOrKeyword() function 
    tryTokenizeVariableOrKeyword() {
        this.skipWhiteSpace();

        let name = "";


        if ((this.offset < this.input.length) &&
            this.isLetter(this.input.charAt(this.offset))) {

            while (this.offset < this.input.length &&
                this.isLetter(this.input.charAt(this.offset)) ||
                Number.isInteger(this.input.charAt(this.offset))
                ) {
                name += this.input.charAt(this.offset);
                this.offset++;
            }

            if (name == "true") {
                return new TrueToken()
            } else if (name == "false") {
                return new FalseToken();
            } else if (name == "if") {
                return new IfToken();
            } else if (name == "else") {
                return new ElseToken();
            } else {
                return new VariableToken(name)
            }
        } else {
            return null;
        }
    }

    //Add tryTokenizeSymbol() function
    tryTokenizeSymbol() {
        this.skipWhiteSpace();

        let retval = null

        if (this.input.startsWith("(", this.offset)) {
            this.offset++;
            retval = new LeftParenToken();
        } else if (this.input.startsWith(")", this.offset)) {
            this.offset++;
            retval = new RightParenToken();
        } else if (this.input.startsWith("{", this.offset)) {
            this.offset++;
            retval = new LeftCurlyToken();
        } else if (this.input.startsWith("}", this.offset)) {
            this.offset++;
            retval = new RightCurlyToken();
        }

        return retval;
    }

    //Add tokenizeSingle() function
    tokenizeSingle() {

        let retval = null;

        this.skipWhiteSpace();

        if (this.offset < this.input.length &&
            (retval = this.tryTokenizeVariableOrKeyword()) == null &&
            (retval = this.tryTokenizeInteger()) == null &&
            (retval = this.tryTokenizeSymbol()) == null) {
            throw new TokenizerException();
        }

        return retval;
    }

    //Add tokenize()
    tokenize() {
        let tokens = []
        try {
            let token = this.tokenizeSingle();
            while (token != null) {
                tokens.push(token);
                token = this.tokenizeSingle();
            }
        } catch (e) {
            console.error(e)
        }

        return tokens;
    }

}
