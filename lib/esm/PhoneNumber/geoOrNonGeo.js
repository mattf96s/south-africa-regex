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
export default isValidNumber;
