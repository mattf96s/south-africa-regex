const isValidCellphoneNumber = (celNumber: string) => {
  celNumber = celNumber.trim();

  const regCallingCode = /^(?:\+27|0)(?:6\d|7[0-4]|7[6-9]|8[1-4])\d{7}$/;
  const isValid = regCallingCode.test(celNumber);
  if (isValid) {
    return {
      error: false,
      msg: "",
    };
  } else {
    return {
      error: true,
      msg: "Not a valid cellphone number",
    };
  }
};

export default isValidCellphoneNumber;
