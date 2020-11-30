/*

  Type: Tax Number.
  Description: 
    1. This is not the same as a VAT number. 
    2. You could use one regex formula to check it only contains numbers, is 10 digits long and starts with 0, 1, 2, 3, 9. But then you lose out on errors. It also seemed a bit slower in a basic test.
  Info: https://web.archive.org/web/20200228072949/http://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/South-Africa-TIN.pdf

  REGEX: (if you wants one check: /^(?:0|1|2|3|9)\d{9}$/)
  -----
  (?:0|1|2|3|9).......# starts with 0, 1, 2, 3, 9 within a non-capturing groups
  \d{9}...............# followed by nine numbers
    
 */
import LuhnAlgorithm from "../LuhnAlgorithm/index";

function isValidTaxNumber(taxNumber: string) {
  taxNumber = taxNumber.trim();
  // check the input only contains digits

  const numbersRegex = /^\d+$/;

  const isNumbers = numbersRegex.test(taxNumber);
  if (!isNumbers) {
    return { error: true, msg: "Must only contain numbers" };
  }

  // ensure 10 digits long

  if (taxNumber.length !== 10) {
    return { error: true, msg: "Must be 10 digits long" };
  }

  // ensure it starts with 0, 1, 2, 3, 9

  const firstDigit = taxNumber.slice(0, 1);

  if (!["0", "1", "2", "3", "9"].includes(firstDigit)) {
    return { error: true, msg: "Must begin with one of 0, 1, 2, 3, 9" };
  }

  const isValid = LuhnAlgorithm(taxNumber);
  if (isValid) {
    return {
      error: false,
      msg: "",
    };
  }

  return {
    error: true,
    msg: "Not a valid tax number",
  };
}

export default isValidTaxNumber;
