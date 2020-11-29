/*

  Type: Non geographic.
  Description: This includes 'normal' cellphone numbers, toll-free services, inbound services, VoIP, Mass calling services, future non-geopgraphic services, premium rated services including adult services, machine related services)
  Info: https://www.icasa.org.za/uploads/files/NumberingPlanReg.pdf at page 21, 24-26.

  REGEX:
    -----
    (?:\+27|0).......# calling code or international code with capture group
    [6-9]............# 2nd digit (which can be 6,7,8,9 for geographic numbers): [6-9]
    \d{8}............# 8 normal digits

 */

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
