const Tokenizer = require("../../main/Tokenizer/Tokenizer")
const TrueToken = require("../../main/Tokenizer/TrueToken")
const FalseToken = require("../../main/Tokenizer/FalseToken")
const ElseToken = require("../../main/Tokenizer/ElseToken")
const IfToken = require("../../main/Tokenizer/IfToken")
const IntegerToken = require("../../main/Tokenizer/IntegerToken")
const VariableToken = require("../../main/Tokenizer/VariableToken")
const LeftParenToken = require("../../main/Tokenizer/LeftParenToken")
const RightParenToken = require("../../main/Tokenizer/RightParenToken")
const LeftCurlyToken = require("../../main/Tokenizer/LeftCurlyToken")
const RightCurlyToken = require("../../main/Tokenizer/RightCurlyToken")


function assertTokenizes(input, expected) {
    let tokenizer = new Tokenizer(input);
    let recieved = tokenizer.tokenize();
    console.log(recieved)
    if (expected.toString() === recieved.toString()) {
        return true
    } else return false
}

test('Test tokenize empty String: ', () => {
    expect(assertTokenizes("", [])).toBe(true)
})

test('Test tokenize only Whitespace: ', () => {
    expect(assertTokenizes("        ", [])).toBe(true)
})

test('Test tokenize False by itself: ', () => {
    expect(assertTokenizes("false", [new FalseToken()])).toBe(true)
})

test('Test tokenize Variable: ', () => {
    expect(assertTokenizes("foo", [new VariableToken("foo")])).toBe(true)
})


test('Test tokenize "truetrue" is Variable: ', () => {
    expect(assertTokenizes("truetrue", [new VariableToken("truetrue")])).toBe(true)
})

test('Test Empty Variable to Hash Code', () => {
    expect(new VariableToken("").hashCode()).toBe(0)
})

test('Test Zero Variable to Hash Code', () => {
    expect(new VariableToken(0).hashCode()).toBe(0)
})

test('Test Variable Equals Variable', () => {
    expect(new VariableToken("").equals(new VariableToken(""))).toBe(true)
})

test('Test Integer Not Equal to Variable', () => {
    expect(new VariableToken("").equals(new IntegerToken(0))).toBe(false)
})

test('Test Variable to Hash Code', () => {
    expect(new VariableToken("foo").hashCode()).toBe(101574)
})

test('Test tokenize "true true" is two True Tokens: ', () => {
    expect(assertTokenizes("true true", [new TrueToken(), new TrueToken()])).toBe(true)
})

test('Test tokenize single-digit Integer: ', () => {
    expect(assertTokenizes("1", [new IntegerToken(1)])).toBe(true)
})

test('Test tokenize multi-digit Integer: ', () => {
    expect(assertTokenizes("123", [new IntegerToken(123)])).toBe(true)
})

test('Test single-digit Integer to String', () => {
    expect(new IntegerToken(1).toString()).toBe("IntegerToken(1)")
})

test('Test multi-digit Integer to String', () => {
    expect(new IntegerToken(123).toString()).toBe("IntegerToken(123)")
})

test('Test single-digit Integer Hash Code', () => {
    expect(new IntegerToken(1).hashCode()).toBe(1)
})

test('Test multi-digit Integer Hash Code', () => {
    expect(new IntegerToken(123).hashCode()).toBe(123)
})

test('Test Integer Equals Integer', () => {
    expect(new IntegerToken(0).equals(new IntegerToken(0))).toBe(true)
})

test('Test Variable Not Equal to Variable', () => {
    expect(new IntegerToken(0).equals(new VariableToken(0))).toBe(false)
})

test('Test False Equals False', () => {
    expect(new FalseToken().equals(new FalseToken())).toBe(true)
})

test('Test False Hash is 1', () => {
    expect(new FalseToken().hashCode()).toBe(1)
})

test('Test True Equals True', () => {
    expect(new TrueToken().equals(new TrueToken())).toBe(true)
})

test('Test True Hash is 0', () => {
    expect(new TrueToken().hashCode()).toBe(0)
})

test('Test Else Hash is 7', () => {
    expect(new ElseToken().hashCode()).toBe(7)
})

test('Test Else Equals Else', () => {
    expect(new ElseToken().equals(new ElseToken())).toBe(true)
})

test('Test If Hash is 2', () => {
    expect(new IfToken().hashCode()).toBe(2)
})

test('Test If Equals If', () => {
    expect(new IfToken().equals(new IfToken())).toBe(true)
})

test('Test RightParenToken Hash is 4', () => {
    expect(new RightParenToken().hashCode()).toBe(4)
})

test('Test RightParen Equals RightParen', () => {
    expect(new RightParenToken().equals(new RightParenToken())).toBe(true)
})

test('Test LeftParenToken Hash is 3', () => {
    expect(new LeftParenToken().hashCode()).toBe(3)
})

test('Test LeftParen Equals LeftParen', () => {
    expect(new LeftParenToken().equals(new LeftParenToken())).toBe(true)
})

test('Test RightCurlyToken Hash is 6', () => {
    expect(new RightCurlyToken().hashCode()).toBe(6)
})

test('Test RightCurly Equals RightCurly', () => {
    expect(new RightCurlyToken().equals(new RightCurlyToken())).toBe(true)
})

test('Test LeftParenToken Hash is 3', () => {
    expect(new LeftParenToken().hashCode()).toBe(3)
})

test('Test LeftParen Equals LeftParen', () => {
    expect(new LeftParenToken().equals(new LeftParenToken())).toBe(true)
})

test('Test LeftCurlyToken Hash is 5', () => {
    expect(new LeftCurlyToken().hashCode()).toBe(5)
})

test('Test LeftCurly Equals LeftCurly', () => {
    expect(new LeftCurlyToken().equals(new LeftCurlyToken())).toBe(true)
})


test('Test all remaining: ', () => {
    expect(assertTokenizes("(){} else if false",
        [new LeftParenToken(),
        new RightParenToken(),
        new LeftCurlyToken(),
        new RightCurlyToken(),
        new ElseToken(),
        new IfToken(),
        new FalseToken()
        ])).toBe(true)
})

test('Test "Invalid": ', () => {
     expect(assertTokenizes("$", [null])).toBe(true)
})

