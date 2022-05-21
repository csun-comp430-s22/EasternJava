module.exports = class ParseResult {
    constructor(result, position) {
        this.result = result;
        this.position = position;
    }
 

    equals(other) {
        if (other instanceof ParseResult) {
            const result = other;
            return (this.result === result.result && this.position === result.position
            )
        } else {
            return false;
        }
    }
}