/*

  Type: Geographic numbers such as a home telephone (aka not a cellphone).
  Description: As opposed to non-geographic numbers, the 2nd digit can only be one of 1, 2, 3, 4, 5.
  Info: see: https://www.icasa.org.za/uploads/files/NumberingPlanReg.pdf at page 21.
  
  REGEX:
  -----
  (?:\+27|0).......# calling code or international code without capture group
  [1-5]............# 2nd digit (which can be 1,2,3,4,5 for geographic numbers)
  \d{8}............# 8 normal digits

*/
const isValidGeographicNumber = (telNumber: string) => {
  telNumber = telNumber.trim();

  const regCallingCode = /^(?:\+27|0)[1-5]\d{8}$/;
  const isValid = regCallingCode.test(telNumber);
  if (isValid) {
    return {
      error: false,
      msg: "",
    };
  } else {
    return {
      error: true,
      msg: "Not a valid geographic number",
    };
  }
};

export default isValidGeographicNumber;
