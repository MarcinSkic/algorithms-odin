function calculate_noModify(array) {
    if (Number.isInteger(array)) {
        return 1;
    }

    if (!Array.isArray(array)) {
        return 0;
    }

    let sum = 0;
    for (arr of array) {
        sum += calculate_noModify(arr);
    }
    return sum;
}

function calculate_noLoop(array) {
    if (array.length === 0) return 0;

    let total = 0;
    let first = array.shift();

    if (Array.isArray(first)) {
        total += calculate_noLoop(first);
    } else if (Number.isInteger(first)) {
        total += 1;
    }

    return total + calculate_noLoop(array);
}

const array = [[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]];
console.log(calculate_noModify(array));
console.log(calculate_noLoop(array));
