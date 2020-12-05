import LuhnAlgorithm from "../LuhnAlgorithm/index";
function isValidVatNumber(vatNumber) {
    vatNumber = vatNumber.trim();
    const numbersRegex = /^\d+$/;
    const isNumbers = numbersRegex.test(vatNumber);
    if (!isNumbers) {
        return { error: true, msg: "Must only contain numbers" };
    }
    const startWithReg = /^[4]/;
    const startsWithFour = startWithReg.test(vatNumber);
    if (!startsWithFour) {
        return { error: true, msg: "Must start with a 4" };
    }
    if (vatNumber.length !== 10) {
        return { error: true, msg: "Must be 10 digits long" };
    }
    const isValid = LuhnAlgorithm(vatNumber);
    if (isValid) {
        return {
            error: false,
            msg: "",
        };
    }
    return { error: true, msg: "Not a valid VAT number" };
}
export default isValidVatNumber;
