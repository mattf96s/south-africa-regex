const isValidNonGeographicNumber = (celNumber: string) => {
  celNumber = celNumber.trim();

  const regCallingCode = /^(?:\+27|0)[6-9]\d{8}$/;
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

export default isValidNonGeographicNumber;
