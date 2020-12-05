"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isValidGeographicNumber = (telNumber) => {
    telNumber = telNumber.trim();
    const regCallingCode = /^(?:\+27|0)[1-5]\d{8}$/;
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
            msg: "Not a valid geographic number",
        };
    }
};
exports.default = isValidGeographicNumber;
