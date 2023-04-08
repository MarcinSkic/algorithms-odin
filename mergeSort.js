let array1 = [
    5, 43, 21, 6, 3, 45, 2, 3, 6, 12, 5, 21, 3, 1, 334, 123, 12, 5, 4323, 657,
    34,
];

let array2 = [5, 2, 1, 3, 6, 4];

// DISCLAIMER: Yes I know it is super inefficient,
// (array.shift for almost every element, yikes!)
// but I just wanted to capture idea with readability in mind

function mergeSort(array) {
    console.log(array);
    if (array.length === 1) {
        return array;
    }

    let left = mergeSort(array.slice(0, array.length / 2));
    let right = mergeSort(array.slice(array.length / 2));

    let resultArray = [];

    while (left.length !== 0 && right.length !== 0) {
        if (left[0] < right[0]) {
            resultArray.push(left.shift());
        } else {
            resultArray.push(right.shift());
        }
    }
    return [...resultArray, ...left, ...right];
}

console.log(mergeSort(array1));
