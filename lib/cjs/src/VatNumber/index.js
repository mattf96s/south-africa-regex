"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../LuhnAlgorithm/index"));
/*

  Type: VAT Number.
  Description:
    1. This is not the same as a Tax Income number.
    2. Although it doesn't state, it seems like this number follows a checksum algorithm. All the examples on the info website pass.
    3. You can do a single REGEX check for pre-luhncheck although you don't get descriptive error messages: /^4\d{9}$/
  Info: https://secure.sarsefiling.co.za/VATVendorSearch/application/help.html

 
 */
function isValidVatNumber(vatNumber) {
    vatNumber = vatNumber.trim();
    // check the input only contains numbers
    const numbersRegex = /^\d+$/;
    const isNumbers = numbersRegex.test(vatNumber);
    if (!isNumbers) {
        return { error: true, msg: "Must only contain numbers" };
    }
    // check it starts with the digit 4
    const startWithReg = /^[4]/;
    const startsWithFour = startWithReg.test(vatNumber);
    if (!startsWithFour) {
        return { error: true, msg: "Must start with a 4" };
    }
    // check vatNumber  is 10 digits long
    if (vatNumber.length !== 10) {
        return { error: true, msg: "Must be 10 digits long" };
    }
    const isValid = index_1.default(vatNumber);
    if (isValid) {
        return {
            error: false,
            msg: "",
        };
    }
    return { error: true, msg: "Not a valid VAT number" };
}
exports.default = isValidVatNumber;
