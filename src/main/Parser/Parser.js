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
const OpExp = require("./OpExp");
const PlusOp = require("./PlusOp");
const MinusOp = require("./MinusOp");
const LessThanOp = require("./LessThanOp");
const LessThanToken = require("../Tokenizer/LessThanToken");
const EqualsToken = require("../Tokenizer/EqualsToken");
const EqualsOp = require("./EqualsOp");
const LeftParenToken = require("../Tokenizer/LeftParenToken");
const ElseToken = require("../Tokenizer/ElseToken");
const IfStmt = require("./IfStmt");
const BlockStmt = require("./BlockStmt");
const SemicolonToken = require("../Tokenizer/SemicolonToken");
const PrintlnStmt = require("./PrintlnStmt");
const Program = require("./Program");
const PlusToken = require("../Tokenizer/PlusToken");
const MinusToken = require("../Tokenizer/MinusToken");
const IfToken = require("../Tokenizer/IfToken");
const BooleanLiteralExp = require("./BooleanLiteralExp");
const ReturnToken = require("../Tokenizer/ReturnToken");
const ReturnStmt = require("./ReturnStmt");
const LeftCurlyToken = require("../Tokenizer/LeftCurlyToken");
const PrintlnToken = require("./PrintlnToken");
const RightCurlyToken = require("../Tokenizer/RightCurlyToken");


module.exports = class Parser {

    constructor(tokens) {
        this.tokens = tokens;
    }

    getToken(pos) {
        if (pos >= 0 && pos < this.tokens.length) {
            return this.tokens[pos]
        } else {
            throw new ParseException("invalid token position: " + pos);
        }
    }

    assertTokenHereIs(pos, expected) {
        const recieved = this.getToken(pos);
        if (!expected === recieved) {
            throw new ParseException("expected: " + expected + "; recieved: " + recieved)
        }
    }

    parsePrimaryExp(position) {
        const token = this.getToken(position)
        if (token instanceof VariableToken) {
            const name = token.name;
            return new ParseResult(new VariableExp(new Variable(name)),
                position + 1)
        } else if (token instanceof IntegerToken) {
            const value = token.value
            return new ParseResult(new IntegerExp(value),
                position + 1)
        }
        else if (token instanceof TrueToken) {
            const input = token.input
            return new ParseResult(new BooleanLiteralExp(true),
                position + 1)
        }
        if (token instanceof FalseToken) {
            const input = token.input
            return new ParseResult(new BooleanLiteralExp(false),
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
    parseAdditiveOp(position) {
        let token = this.getToken(position);
        if (token instanceof PlusToken) {
            return new ParseResult(new PlusOp(), position + 1)
        } else if (token instanceof MinusToken) {
            return new ParseResult(new MinusOp(), position + 1)
        } else {
            throw new ParseException("expected + or -; recieved: " + token);
        }
    }

    // parseAdditiveExp
    parseAdditiveExp(position) {
        let current = this.parsePrimaryExp(position);
        let shouldRun = true;

        while (shouldRun) {
            try {
                let additiveOp = this.parseAdditiveOp(current.position);
                let anotherPrimary = this.parsePrimaryExp(additiveOp.position)
                current = new ParseResult(new
                    OpExp(current.result,
                        additiveOp.result,
                        anotherPrimary.result),
                    anotherPrimary.position)
            } catch (e) {
                shouldRun = false;
            }
        }
        return current;
    }

    // parseLessThanExp
    parseLessThanExp(position) {
        let current = this.parseAdditiveExp(position);
        let shouldRun = true;

        while (shouldRun) {
            try {
                this.assertTokenHereIs(current.position, new LessThanToken());
                let other = this.parseAdditiveExp(current.position + 1)
                current = new ParseResult(new
                    OpExp(current.result,
                        new LessThanOp(),
                        other.result),
                    other.position)
            } catch (e) {
                shouldRun = false;
            }
        }
        return current;
    }

    // parseEqualsExp
    parseEqualsExp(position) {
        let current = this.parseLessThanExp(position);
        let shouldRun = true;

        while (shouldRun) {
            try {
                this.assertTokenHereIs(current.position, new EqualsToken());
                let other = this.parseLessThanExp(additiveOp.position)
                current = new ParseResult(new
                    OpExp(current.result,
                        new EqualsOp(),
                        other.result),
                    other.position)
            } catch (e) {
                shouldRun = false;
            }
        }
        return current;
    }

    // parseExp
    parseExp(position) {
        return this.parseEqualsExp(position)
    }

    // parseStmt
    parseStmt(position) {
        let token = this.getToken(position);
        if (token instanceof IfToken) {
            this.assertTokenHereIs(position + 1, new LeftParenToken());
            const guard = this.parseExp(position + 2);
            this.assertTokenHereIs(guard.position, new RightParenToken());
            const trueBranch = this.parseStmt(guard.position + 1);
            this.assertTokenHereIs(trueBranch.position, new ElseToken());
            const falseBranch = this.parseStmt(trueBranch.position + 1);
            return new ParseResult(
                new IfStmt(guard.result,
                    trueBranch.result,
                    falseBranch.result),
                falseBranch.position)
        } else if (token instanceof LeftCurlyToken) {
            let stmts = [];
            let currPosition = position + 1;
            let shouldRun = true;
            while (shouldRun) {
                try {
                    let stmt = this.parseStmt(currPosition)
                    stmts.push(stmt.result);
                    currPosition = stmt.position;
                } catch (e) {
                    shouldRun = false;
                }

            }
            this.assertTokenHereIs(currPosition, new RightCurlyToken);
            return new ParseResult(new BlockStmt(stmts), currPosition + 1);
        } else if (token instanceof PrintlnToken) {
            this.assertTokenHereIs(position + 1, new LeftParenToken());
            let exp = this.parseExp(position + 2);
            this.assertTokenHereIs(exp.position, new RightParenToken());
            this.assertTokenHereIs(exp.position + 1, new SemicolonToken());
            return new ParseResult(new PrintlnStmt(exp.result), exp.position + 2)
        }
        else if (token instanceof ReturnToken) {
            let exp = this.parseExp(position + 1);
            this.assertTokenHereIs(exp.position, new SemicolonToken());
            return new ParseResult(new ReturnStmt(exp.result), exp.position + 1)
        } else {
            throw new ParseException("expected statement; recived: " + token)
        }
    }

    // parseProgram
    parseProgram(position) {
        let stmt = this.parseStmt(position);
        return new ParseResult(new Program(stmt.result), stmt.position);
    }

    // topLevelParseProgram()
    topLevelParseProgram() {
        let program = parseProgram(0);
        if (program.position == this.tokens.length) {
            return program.result;
        } else {
            throw new ParseException("Remaining tokens at end");
        }
    }
}