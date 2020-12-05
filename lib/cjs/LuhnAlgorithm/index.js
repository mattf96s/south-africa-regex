"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// taken from: https://gist.github.com/ShirtlessKirk/2134376
// the bitwise operator just flips the boolean (for even / odd)
const LuhnAlgorithm = (inputNumber) => {
    inputNumber = inputNumber.trim();
    const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
    let len = inputNumber.length;
    let bit = 1;
    let sum = 0;
    let val;
    while (len) {
        val = parseInt(inputNumber.charAt(--len), 10);
        bit = bit ^ 1;
        sum += bit === 1 ? arr[val] : val;
    }
    return sum && sum % 10 === 0;
};
exports.default = LuhnAlgorithm;
