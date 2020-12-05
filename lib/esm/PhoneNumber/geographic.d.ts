declare const isValidGeographicNumber: (telNumber: string) => {
    error: boolean;
    msg: string;
};
export default isValidGeographicNumber;
