"use strict";
/*

    Type: Cellphone numbers which a normal person can own.
    Description: cellphone numbers are non-geographic and have the following beginning 3 digits: 060 to 084 but excluding 075 and 080
    Info: see: // see: https://www.icasa.org.za/uploads/files/NumberingPlanReg.pdf at page 21 onwards.

    REGEX:
    -----
    (?:\+27|0).....................# calling code or international code without capture group
    (?:6\d|7[0-4]|7[6-9]|8[1-4])...# 2nd and 3rd digits (which can be (60-74), (76-79), (81-84), for cellphone numbers) in non-capture group
    \d{7}..........................# 7 normal digits

*/
Object.defineProperty(exports, "__esModule", { value: true });
const isValidCellphoneNumber = (celNumber) => {
    celNumber = celNumber.trim();
    const regCallingCode = /^(?:\+27|0)(?:6\d|7[0-4]|7[6-9]|8[1-4])\d{7}$/;
    const isValid = regCallingCode.test(celNumber);
    if (isValid) {
        return {
            error: false,
            msg: "",
        };
    }
    else {
        return {
            error: true,
            msg: "Not a valid cellphone number",
        };
    }
};
exports.default = isValidCellphoneNumber;
