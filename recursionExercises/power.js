function power(base, exponent) {
    if (exponent === 0) {
        return 1;
    }
    //Extra base case for reducing stack cost in most often case
    if (exponent === 2) {
        return base * base;
    }

    return base * power(base, exponent - 1);
}

console.log(power(3, 1));
