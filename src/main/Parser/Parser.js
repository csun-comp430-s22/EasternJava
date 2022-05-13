const VariableToken = require("../Tokenizer/VariableToken");
const TrueToken = require("../Tokenizer/TrueToken");
const FalseToken = require("../Tokenizer/FalseToken");
const IntegerToken = require("../Tokenizer/IntegerToken");
const ParseResult = require("./ParseResult");
const VariableExp = require("./VariableExp");
const IntegerExp = require("./IntegerExp");
const Variable = require("./Variable");
const ParseException = require("./ParseExecption");
const RightParenToken = require("../Tokenizer/RightParenToken");


module.exports = class Parser {

    constructor(tokens) {
        this.tokens = tokens;
    }

    getToken(pos) {
        if (pos >= 0 && pos < this.tokens.length) {
            return this.tokens.get(pos)
        } else {
            throw new ParseException("invalid token position: " + pos);
        }
    }

    assertTokenHereIs(pos, expected) {
        const recieved = getToken(pos);
        if (!expected === recieved) {
            throw new ParseException("expected: " + expected + "; recieved: " + recieved)
        }
    }

    parsePrimaryExp(pos) {
        const token = getToken(pos)
        if (token instanceof VariableToken) {
            const name = token.name;
            return new ParseResult(new VariableExp(new Variable(name)),
                position + 1)
        } else if (token instanceof IntegerToken) {
            const value = token.value
            return new ParseResult(new IntegerExp(value),
                position + 1)
        } else if (token instanceof LeftParenToken) {
            let inParens = this.parseExp(position + 1);
            this.assertTokenHereIs(inParens.position, new RightParenToken())
            return new ParseResult(inParens.result, inParens.position + 1)
        } else {
            throw new ParseException("Expected primary expression; recieved: " + token)
        }
    }

    // parseAdditiveOp
    // parseAdditiveExp
    // parseLessThanExp
    // parseEqualsExp
    // parseExp
    // parseStmt
    // parseProgram
    // topLevelParseProgram()
}