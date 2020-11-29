import LuhnAlgorithm from "../LuhnAlgorithm/index";
/*

    Type: Valid South African ID number.
    Description: Note: someone can still pass in an impossible date of birth such as 31 February
    Info: https://www.refworld.org/docid/52a8458d4.html & https://www.westerncape.gov.za/general-publication/decoding-your-south-african-id-number-0
    WARNING: will incorrectly determine 1900 and 2100 as leap years. So will incorrectly allow 29 Feb as a valid date in these years
   
 */
const isValidIdNumber = (idNumber) => {
    idNumber = idNumber.trim();
    const numbersRegex = /^\d+$/;
    const isNumbers = numbersRegex.test(idNumber);
    if (!isNumbers) {
        return { error: true, msg: "Must only contain numbers" };
    }
    const leapYears = /(?:([02468][048])|(?:[13579][26]))/;
    const normalYears = /(?:([02468][1235679])|(?:[123569][01345789]))/;
    const month31 = /(?:(?:0[13578]|1[02])(?:0[1-9]|[12]\d|3[01]))/;
    const month30 = /(?:(?:0[469]|11)(?:0[1-9]|[12]\d|30))/;
    const month29 = /(?:02(?:0[1-9]|1\d|2[0-9]))/;
    const month28 = /(?:02(?:0[1-9]|1\d|2[0-8]))/;
    const leapYearDate = new RegExp(`${leapYears.source}(${month31.source}|${month30.source}|${month29.source})`);
    const normalYearsDate = new RegExp(`${normalYears.source}(${month31.source}|${month30.source}|${month28.source})`);
    const fullDate = new RegExp(`${leapYearDate.source}|${normalYearsDate.source}`);
    const sex = /\d{4}/;
    const citizen = /[012]/;
    const oldRaceIdentifier = /8/;
    const checkDigit = /\d/;
    const rest = new RegExp(`${sex.source}${citizen.source}${oldRaceIdentifier.source}${checkDigit.source}`);
    let fullRegex = new RegExp(`^((${fullDate.source})(${rest.source}))\$`);
    const isFine = fullRegex.test(idNumber);
    if (!isFine) {
        return {
            error: true,
            msg: "Not a valid ID",
        };
    }
    // check sum calculation
    const isValidId = LuhnAlgorithm(idNumber);
    if (isValidId) {
        return {
            error: false,
            msg: "",
        };
    }
    return {
        error: true,
        msg: "Not a valid ID",
    };
};
export default isValidIdNumber;
