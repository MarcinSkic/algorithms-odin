// DISCLAIMER: Yes I know it is super inefficient,
// (array.shift for almost every element, yikes!)
// but I just wanted to capture idea with readability in mind

export default function mergeSort(array) {
    if (array.length === 0) {
        return [];
    }
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
