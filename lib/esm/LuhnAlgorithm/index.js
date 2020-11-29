// taken from: https://gist.github.com/ShirtlessKirk/2134376
// the bitwise operator just flips the boolean (for even / odd)
const LuhnAlgorithm = (taxNumber) => {
    taxNumber = taxNumber.trim();
    const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
    let len = taxNumber.length;
    let bit = 1;
    let sum = 0;
    let val;
    while (len) {
        val = parseInt(taxNumber.charAt(--len), 10);
        sum += (bit ^= 1) ? arr[val] : val;
    }
    return sum && sum % 10 === 0;
};
export default LuhnAlgorithm;
