const array = [
    1, 2, 3, 3, 3, 5, 5, 5, 6, 6, 12, 12, 21, 21, 34, 43, 45, 123, 334, 657,
    4323,
];

function binarySearch(array = [], searchedValue) {
    if (array.length === 0) {
        console.log(`not found ${searchedValue}`);
        return null;
    }

    const midPoint = Math.floor((array.length - 1) / 2);

    if (array[midPoint] === searchedValue) {
        console.log(`found ${searchedValue}`);
        return array[midPoint];
    }

    if (array[midPoint] > searchedValue) {
        return binarySearch(array.slice(0, midPoint), searchedValue);
    } else {
        return binarySearch(array.slice(midPoint + 1), searchedValue);
    }
}

binarySearch(array, 433);
