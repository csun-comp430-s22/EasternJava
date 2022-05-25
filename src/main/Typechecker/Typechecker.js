const AndOp = require("../Parser/AndOp")
const BlockStmt = require("../Parser/BlockStmt")
const BooleanLiteralExp = require("../Parser/BooleanLiteralExp")
const BoolType = require("../Parser/BoolType")
const FunctionCallExp = require("../Parser/FunctionCallExp")
const IfStmt = require("../Parser/IfStmt")
const IntegerLiteralExp = require("../Parser/IntegerLiteralExp")
const IntType = require("../Parser/IntType")
const LessThanOp = require("../Parser/LessThanOp")
const OpExp = require("../Parser/OpExp")
const ReturnStmt = require("../Parser/ReturnStmt")
const VardecStmt = require("../Parser/Vardecstmt")
const VariableExp = require("../Parser/VariableExp")
const WhileStmt = require("../Parser/WhileStmt")
const Type = require("./Type")
const TypeErrorException = require("./TypeErrorException")

module.exports = class Typechecker {

    constructor(program) {
        this.program = program
        let functions = []
        for (fdef in program.funcitons) {
            let objExp = functions[fdef]
            if (!functions.some(obj => obj.fname == objExp.fdef)) {
                functions.push({ fname: fdef.name, fdef: functions[fdef].fdef})
            } else {
                throw new TypeErrorException("Function with duplicate name: " + fdef.fname)
            }
        }
    }

    getFunctionByName(fname) {
        const fdef = functions.find(func => func.fname == fname).fdef;
        if (fdef == null) {
            throw new TypeErrorException("No such function with name: " + fname);
        } else {
            return fdef
        }
    }

    // int foo(int x, bool y) { ... }
    //
    // int x = foo(1, true);
    //
    // 1. Is foo a function?
    // 2. Does foo take an integer and a boolean? - (int, bool)
    // 3. Does foo return an integer?

    typeofFunctionCall(exp, typeEnvironment) {
        const fdef = this.getFunctionByName(exp.fname)
        if (exp.param.length != fdef.arguments.length) {
            throw new TypeErrorException("Wrong number of arguments for function: " + fdef.fname)
        }
        for (i = 0; i < exp.params.length; i++) {
            const recievedArgumentType = this.typeof(exp.params[index], typeEnvironment)
            const expectedArgumentType = fdef.arguments[i].type
            if (!recievedArgumentType == expectedArgumentType) {
                throw new TypeErrorException("Type mismatch on function call argument")
            }
        }
        return fdef.returnType
    }

    typeofOp(exp, typeEnvironment) {
        const leftType = this.typeof(exp.left, typeEnvironment)
        const rightType = this.typeof(exp.left, typeEnvironment)
        if (exp.op instanceof PlusOp) {
            if (leftType instanceof IntType && rightType instanceof IntType) {
                return new IntType;
            } else {
                throw new TypeErrorException("Incorrect types for +")
            }
        } else if (exp.op instanceof LessThanOp) {
            if (leftType instanceof IntType && rightType instanceof IntType) {
                return new BoolType
            } else {
                throw new TypeErrorException("Incorrect types for <")
            }
        } else if (exp.op instanceof AndOp) {
            if (leftType instanceof BoolType && rightType instanceof BoolType) {
                return new BoolType
            } else {
                throw new TypeErrorException("Incorrect types for &&")
            }
        }

    }

    typeof(exp, typeEnvironment) {
        if (exp instanceof BooleanLiteralExp) {
            return new BoolType
        } else if (exp instanceof IntegerLiteralExp) {
            return new IntType
        } else if (exp instanceof VariableExp) {
            const variable = exp.variable
            const variableType = typeEnvironment[variable]
            if (variableType == null) {
                throw new TypeErrorException("variable not in scope: " + variable)
            } else {
                return variableType
            }
        } else if (exp instanceof OpExp) {
            return this.typeofOp(exp, typeEnvironment)
        } else if (exp instanceof FunctionCallExp) {
            return this.typeofFunctionCall(exp, typeEnvironment)
        } else {
            throw new TypeErrorException("Unsupported Expression: " + exp)
        }

    }

    addType(typeEnvironment, key, value) {
        let env = typeEnvironment
        env.push({ variable: key, type: value })
        return env
    }

    typecheckVardec(asDec, typeEnvironment, returnType) {
        const expectedType = asDec.vardec.type;
        const recievedType = this.typeof(asDec.exp, typeEnvironment)

        if (recievedType == expecteType) {
            return this.addType(typeEnvironment, asDec.vardec.variable, expectedType)
        } else {
            throw new TypeErrorException("expected: " + expectedType + ", recieved: " + recievedType)
        }
    }

    typecheckIf(asIf, typeEnvironment, returnType) {
        const recievedType = this.typeof(asIf.guard, typeEnvironment)
        if (recievedType instanceof BoolType) {
            // if (...) {
            //   int x = 17;
            // } else {
            //   int y = true;
            // }
            this.typecheckStmt(asIf.trueBranch, typeEnvironment, returnType)
            this.typecheckStmt(asIf.trueBranch, typeEnvironment, returnType)
            return typeEnvironment;
        } else {
            throw new TypeErrorException("guard should be bool; recieved: " + recievedType)
        }
    }

    typecheckWhile(asWhile, typeEnvironment, returnType) {
        const recievedType = this.typeof(asWhile.guard, typeEnvironment)
        if (recievedType instanceof new BoolType) {
            this.typecheckStmt(asWhile.body, typeEnvironment, returnType)
            return typeEnvironment
        } else {
            throw new TypeErrorException("guard should be bool; recieved: " + recievedType)
        }
    }

    typecheckReturn(asReturn, typeEnvironment, returnType) {
        const recievedType = this.typeof(asReturn.exp, typeEnvironment);
        if (returnType == recievedType) {
            return typeEnvironment
        } else {
            throw new TypeErrorException("expected return type: " + returnType + ", recieved: " + recievedType)
        }
    }

    typecheckBlock(asBlock, originalTypeEnvironment, returnType) {
        const typeEnvironment = originalTypeEnvironment;

        for (stmt in asBlock.body) {
            typeEnvironment = this.typecheckStmt(stmt, typeEnvironment, returnType)
        }

        return originalTypeEnvironment
    }

    typecheckStmt(stmt, typeEnvironment, returnType) {
        if (stmt instanceof VardecStmt) {
            return this.typecheckVardec(stmt, typeEnvironment, returnType)
        } else if (stmt instanceof IfStmt) {
            return this.typecheckIf(stmt, typeEnvironment, returnType)
        } else if (stmt instanceof WhileStmt) {
            return this.typecheckWhile(stmt, typeEnvironment, returnType)
        } else if (stmt instanceof ReturnStmt) {
            return this.typecheckReturn(stmt, typeEnvironment, returnType)
        } else if (stmt instanceof BlockStmt) {
            return this.typecheckBlock(stmt, typeEnvironment, returnType)
        } else {
            throw new TypeErrorException("Unsupported statement: " + stmt)
        }
    }

    typecheckFunction(fdef) {
        const typeEnvironment = []

        for (vardec in fdef.arguments) {
            let currentArg = fdef.arguments[vardec]
            if (!typeEnvironment.some(obj => obj.variable == currentArg.variable)) {
                typeEnvironment.push({variable: currentArg.variable, type: currentArg.type})
            } else {
                throw new TypeErrorException("Duplicate variable name: " + vardec.variable)
            }
        }

        this.typecheckStmt(fdef.body, typeEnvironment, returnType)
    }

    typecheckWholeProgram(){
        for (fdef in this.program.functions){
            this.typecheckFunction(fdef)
        }
    }


}