import LuhnAlgorithm from "../LuhnAlgorithm/index";

function isValidTaxNumber(taxNumber: string) {
  taxNumber = taxNumber.trim();

  const numbersRegex = /^\d+$/;

  const isNumbers = numbersRegex.test(taxNumber);
  if (!isNumbers) {
    return { error: true, msg: "Must only contain numbers" };
  }

  if (taxNumber.length !== 10) {
    return { error: true, msg: "Must be 10 digits long" };
  }

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
