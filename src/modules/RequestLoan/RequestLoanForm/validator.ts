export const validateTermLength = (termLength: number) => {
    const maxAmount = 65535;
    let error: string = "";
    if (termLength % 1 !== 0) {
        error = "Term length value cannot have decimals";
    } else if (termLength < 0) {
        error = "Term length value cannot be negative";
    } else if (termLength > maxAmount) {
        error = `Term length value cannot be greater than ${maxAmount}`;
    }
    return error;
};

export const validateInterestRate = (interestRate: number) => {
    const maxAmount = 1677.7216;
    const maxDecimalPlaces = 4;
    let error: string = "";
    if (interestRate < 0) {
        error = "Interest amount cannot be negative";
    } else if (interestRate > maxAmount) {
        error = `Interest amount cannot be greater than ${maxAmount}`;
    } else if (
        interestRate % 1 !== 0 &&
        interestRate.toString().split(".")[1].length > maxDecimalPlaces
    ) {
        error = `Interest amount cannot have more than ${maxDecimalPlaces} decimal places`;
    }
    return error;
};
