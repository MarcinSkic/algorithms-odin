function checkArray(array, callback) {
    if (array.length === 0) {
        return true;
    }
    if (!callback(array[0])) {
        return false;
    }

    return checkArray(array.slice(1), callback);
}
const array = [5, 4, -3, 2, 1];
console.log(
    checkArray(array, (value) => {
        return value > 0;
    })
);
