const BooleanLiteralExp = require("../../main/Parser/BooleanLiteralExp");
const EqualsOp = require("../../main/Parser/EqualsOp");
const IfStmt = require("../../main/Parser/IfStmt");
const IntegerExp = require("../../main/Parser/IntegerExp");
const LessThanOp = require("../../main/Parser/LessThanOp");
const MinusOp = require("../../main/Parser/MinusOp");
const OpExp = require("../../main/Parser/OpExp");
const Parser = require("../../main/Parser/Parser");
const ParseResult = require("../../main/Parser/ParseResult");
const PlusOp = require("../../main/Parser/PlusOp");
const ReturnStmt = require("../../main/Parser/ReturnStmt");
const Variable = require("../../main/Parser/Variable");
const VariableExp = require("../../main/Parser/VariableExp");
const ElseToken = require("../../main/Tokenizer/ElseToken");
const EqualsToken = require("../../main/Tokenizer/EqualsToken");
const FalseToken = require("../../main/Tokenizer/FalseToken");
const IfToken = require("../../main/Tokenizer/IfToken");
const IntegerToken = require("../../main/Tokenizer/IntegerToken");
const LeftCurlyToken = require("../../main/Tokenizer/LeftCurlyToken");
const LeftParenToken = require("../../main/Tokenizer/LeftParenToken");
const LessThanToken = require("../../main/Tokenizer/LessThanToken");
const MinusToken = require("../../main/Tokenizer/MinusToken");
const PlusToken = require("../../main/Tokenizer/PlusToken");
const ReturnToken = require("../../main/Tokenizer/ReturnToken");
const RightCurlyToken = require("../../main/Tokenizer/RightCurlyToken");
const RightParenToken = require("../../main/Tokenizer/RightParenToken");
const SemicolonToken = require("../../main/Tokenizer/SemicolonToken");
const TrueToken = require("../../main/Tokenizer/TrueToken");
const VariableToken = require("../../main/Tokenizer/VariableToken");

test('Test Equals Op ', () => {
    let first = new OpExp(
        new IntegerExp(1),
        new PlusOp(),
        new IntegerExp(1)
    );

    let second = new OpExp(
        new IntegerExp(1),
        new PlusOp(),
        new IntegerExp(1)
    );

    expect(first).toEqual(second);
})

test('Test Primary Variable ', () => {
    let parser = new Parser([new VariableToken("x")])
    expect(new ParseResult(new VariableExp(new Variable("x")), 1))
        .toEqual(parser.parsePrimaryExp(0));
})

test('Test Primary Integer ', () => {
    let array = [new IntegerToken(123)]
    let parser = new Parser(array)
    expect(new ParseResult(new IntegerExp(123), 1))
        .toEqual(parser.parsePrimaryExp(0));
})

test('Test Primary Parens ', () => {
    let array = [new LeftParenToken(), new IntegerToken(123), new RightParenToken()]
    let parser = new Parser(array)
    expect(new ParseResult(new IntegerExp(123), 3))
        .toEqual(parser.parsePrimaryExp(0));
})

test('Test Additive Op Plus ', () => {
    let array = [new PlusToken()]
    let parser = new Parser(array)
    expect(new ParseResult(new PlusOp(), 1))
        .toEqual(parser.parseAdditiveOp(0));
})

test('Test Additive Op Minus ', () => {
    let array = [new MinusToken()]
    let parser = new Parser(array)
    expect(new ParseResult(new MinusOp(), 1))
        .toEqual(parser.parseAdditiveOp(0));
})

test('Test Additive Exp Only Primary ', () => {
    let array = [new IntegerToken(123)]
    let parser = new Parser(array)
    expect(new ParseResult(new IntegerExp(123), 1))
        .toEqual(parser.parseAdditiveExp(0));
})

test('Test Additive Exp Single Operator ', () => {
    let array = [new IntegerToken(1), new PlusToken(), new IntegerToken(2)]
    let parser = new Parser(array)
    expect(new ParseResult(new OpExp(new IntegerExp(1),
        new PlusOp(),
        new IntegerExp(2)),
        3))
        .toEqual(parser.parseAdditiveExp(0));
})

test('Test Additive Exp Multi Operator ', () => {
    let array = [new IntegerToken(1), new PlusToken(), new IntegerToken(2), new MinusToken(), new IntegerToken(3)]
    let parser = new Parser(array)
    expect(new ParseResult(new OpExp(new OpExp(new IntegerExp(1),
        new PlusOp(),
        new IntegerExp(2)), new MinusOp(), new IntegerExp(3)),
        5))
        .toEqual(parser.parseAdditiveExp(0));
})

test('Test Less Than Exp Only Additive ', () => {
    let array = [new IntegerToken(123)]
    let parser = new Parser(array)
    expect(new ParseResult(new IntegerExp(123), 1))
        .toEqual(parser.parseLessThanExp(0));
})

test('Test Less Than Single Operator ', () => {
    let array = [new IntegerToken(1), new LessThanToken(), new IntegerToken(2)]
    let parser = new Parser(array)
    let expected = new OpExp(new IntegerExp(1), new LessThanOp(), new IntegerExp(2))
    expect(new ParseResult(expected, 3))
        .toEqual(parser.parseLessThanExp(0));
})

test('Test Less Than Multi Operator ', () => {
    let array = [new IntegerToken(1), new LessThanToken(), new IntegerToken(2), new LessThanToken, new IntegerToken(3)]
    let parser = new Parser(array)
    let expected = new OpExp(new OpExp(new IntegerExp(1), new LessThanOp(), new IntegerExp(2)), new LessThanOp(), new IntegerExp(3))
    expect(new ParseResult(expected, 5))
        .toEqual(parser.parseLessThanExp(0));
})

test('Test Less Than Mixed Operator ', () => {
    let array = [new IntegerToken(1), new LessThanToken(), new IntegerToken(2), new PlusToken, new IntegerToken(3)]
    let parser = new Parser(array)
    let expected = new OpExp(new IntegerExp(1), new LessThanToken, new OpExp(new IntegerExp(2), new PlusOp, new IntegerExp(3)))
    expect(new ParseResult(expected, 5))
        .toEqual(parser.parseLessThanExp(0));
})

test('IntegerExp equals IntegerExp', () => {
    expect(new IntegerExp(4).equals(new IntegerExp(4))).toBe(true);
})

test('IntegerExp single Hash', () => {
    expect(new IntegerExp(1).hashCode(1)).toBe(1)
})

test('IntegerExp to string', () => {
    expect(new IntegerExp(3).toString()).toBe("IntegerExp(3)")
})

test('Less Than Token Equals Less Than Token', () => {
    expect(new LessThanToken().equals(new LessThanToken)).toBe(true);
})

test('Less Than Op Equals Less Than Op', () => {
    expect(new LessThanOp().equals(new LessThanOp)).toBe(true);
})

test('Less Than Token Hash = 2  ', () => {
    expect(new LessThanToken().hashCode()).toBe(2)
})
test('Less Than Op Hash = 2  ', () => {
    expect(new LessThanOp().hashCode()).toBe(2)
})

test('Less Than Op To String  ', () => {
    expect(new LessThanOp().toString()).toBe("LessThanOp")
})

test('EqualsToken equals Equals Token', () => {
    expect(new EqualsToken().equals(new EqualsToken)).toBe(true);
})

test('Equals Op equals Equals Op', () => {
    expect(new EqualsOp().equals(new EqualsOp)).toBe(true);
})

test('Equals Token Hash = 3  ', () => {
    expect(new EqualsToken().hashCode()).toBe(3)
})

test('Equals  Op Hash = 3  ', () => {
    expect(new EqualsOp().hashCode()).toBe(3)
})

test('Equals  Op To String  ', () => {
    expect(new EqualsOp().toString()).toBe("EqualsOp")
})

test('Plus Token equals Plus Token', () => {
    expect(new PlusToken().equals(new PlusToken)).toBe(true);
})

test('Plus Op equals Plus Than Op', () => {
    expect(new PlusOp().equals(new PlusOp)).toBe(true);
})

test('Plus Token Hash = 0  ', () => {
    expect(new PlusToken().hashCode()).toBe(0)
})
test('Plus  Op Hash = 0  ', () => {
    expect(new PlusOp().hashCode()).toBe(0)
})

test('Plus  Op To String  ', () => {
    expect(new PlusOp().toString()).toBe("PlusOp")
})

test('Minus Token equals Minus Token', () => {
    expect(new MinusToken().equals(new MinusToken)).toBe(true);
})

test('Minus Op equals Minus Than Op', () => {
    expect(new MinusOp().equals(new MinusOp)).toBe(true);
})

test('Minus Token Hash = 1  ', () => {
    expect(new MinusToken().hashCode()).toBe(1)
})
test('Minus  Op Hash = 1  ', () => {
    expect(new MinusOp().hashCode()).toBe(1)
})

test('Minus  Op To String  ', () => {
    expect(new MinusOp().toString()).toBe("MinusOp")
})

test('If Stmt Test ', () => {
    let array = [new IfToken,
    //Guard
    new LeftParenToken, new TrueToken, new RightParenToken,
    //Returning true token with semicolon
    new ReturnToken, new TrueToken, new SemicolonToken, 
    //Start of else statement
    new ElseToken,
    //Returning false token with semicolon
    new ReturnToken, new FalseToken, new SemicolonToken,
    ]
    let parser = new Parser(array)
    let expected = new ParseResult(new IfStmt(new BooleanLiteralExp(true), new ReturnStmt(new BooleanLiteralExp(true)), new ReturnStmt(new BooleanLiteralExp(false))), 11)
    expect(expected).toEqual(parser.parseStmt(0))
})

test('Variable expression declaration  ', () => {
    let array = [new VariableToken("foo")]
    let parser = new Parser(array)
    expect(new ParseResult(new VariableExp(new Variable("foo")), 1))
        .toEqual(parser.parseAdditiveExp(0))
})



// IfStmt full Test
// OpExp equals
// Parse Result Equals test
// 



