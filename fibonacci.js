function fibs(number) {
    let array = [0, 1];

    while (array.length !== number) {
        array.push(array[array.length - 1] + array[array.length - 2]);
    }

    return array;
}

function fibsRec(number) {
    if (number === 1) {
        return 0;
    }
    if (number === 2) {
        return 1;
    }

    return fibsRec(number - 1) + fibsRec(number - 2);
}

function fibsRec_list(number) {
    if (number <= 2) {
        return [0, 1];
    }

    let array = fibsRec_list(number - 1);
    return [...array, array[array.length - 1] + array[array.length - 2]];
}

console.log(fibs(8));
console.log(fibsRec(8));
console.log(fibsRec_list(8));
