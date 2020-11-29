"use strict";
/*

    Type: Any valid number.
    Description: Geographic or non-geographic.
    Info: https://www.icasa.org.za/uploads/files/NumberingPlanReg.pdf at page 21 onwards.

    REGEX:
    ------
    (?:\+27|0)...............# calling code or international code without capture group
    [1-9]....................#
    \d{8}....................#

 */
Object.defineProperty(exports, "__esModule", { value: true });
const isValidNumber = (telNumber) => {
    telNumber = telNumber.trim();
    const regCallingCode = /^(?:\+27|0)[1-9]\d{8}$/;
    const isValid = regCallingCode.test(telNumber);
    if (isValid) {
        return {
            error: false,
            msg: "",
        };
    }
    else {
        return {
            error: true,
            msg: "Not a valid number",
        };
    }
};
exports.default = isValidNumber;
