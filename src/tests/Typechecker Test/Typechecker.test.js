const BooleanLiteralExp = require("../../main/Parser/BooleanLiteralExp");
const BoolType = require("../../main/Parser/BoolType");
const IntegerLiteralExp = require("../../main/Parser/IntegerLiteralExp");
const IntType = require("../../main/Parser/IntType");
const Parser = require("../../main/Parser/Parser");
const Program = require("../../main/Parser/Program");
const Typechecker = require("../../main/Typechecker/Typechecker");
const emptyTypeEnvironment = []
function typeof1(exp){
    const emptyTypecheker = new Typechecker(new Program([]))
    return emptyTypecheker.typeof(exp, emptyTypeEnvironment)
}

test("Test Type of Boolean", ()=>{
    expect(typeof1(new BooleanLiteralExp(true))).toEqual(new BoolType)
})

test("Test Type of Integer", ()=>{
    expect(typeof1(new IntegerLiteralExp(1))).toEqual(new IntType)
})

test("Test If Statement typcheck", ()=>{
    expect(new Typechecker())
})