"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../LuhnAlgorithm/index"));
function isValidTaxNumber(taxNumber) {
    taxNumber = taxNumber.trim();
    const numbersRegex = /^\d+$/;
    const isNumbers = numbersRegex.test(taxNumber);
    if (!isNumbers) {
        return { error: true, msg: "Must only contain numbers" };
    }
    if (taxNumber.length !== 10) {
        return { error: true, msg: "Must be 10 digits long" };
    }
    const firstDigit = taxNumber.slice(0, 1);
    if (!["0", "1", "2", "3", "9"].includes(firstDigit)) {
        return { error: true, msg: "Must begin with one of 0, 1, 2, 3, 9" };
    }
    const isValid = index_1.default(taxNumber);
    if (isValid) {
        return {
            error: false,
            msg: "",
        };
    }
    return {
        error: true,
        msg: "Not a valid tax number",
    };
}
exports.default = isValidTaxNumber;
