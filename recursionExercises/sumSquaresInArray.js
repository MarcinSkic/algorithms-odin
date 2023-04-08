function sumSquares(array) {
    if (array.length === 0) {
        return 0;
    }

    let first = array.shift();
    let total = 0;

    if (Array.isArray(first)) {
        total += sumSquares(first);
    } else {
        total += Math.pow(first, 2);
    }

    return total + sumSquares(array);
}

var l = [1, 2, 3];
console.log(sumSquares(l)); // 1 + 4 + 9 = 14

l = [[1, 2], 3];
console.log(sumSquares(l)); // 1 + 4 + 9 = 14

l = [[[[[[[[[1]]]]]]]]];
console.log(sumSquares(l)); // 1 = 1

l = [10, [[10], 10], [10]];
console.log(sumSquares(l)); // 100 + 100 + 100 + 100 = 400
