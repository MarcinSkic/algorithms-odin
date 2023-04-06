function calculate_topDown(number) {
    console.log(number);
    if (number === 1) {
        return 0;
    }

    return (
        1 + calculate_topDown(number % 2 === 0 ? number / 2 : 3 * number + 1)
    );
}

//This is kinda bottomUp, not quite
function calculate_bottomUp(number, steps = 0) {
    console.log(number);
    if (number === 1) {
        return steps;
    }

    return calculate_bottomUp(
        number % 2 === 0 ? number / 2 : 3 * number + 1,
        (steps += 1)
    );
}

console.log(`Steps: ${calculate_topDown(15)}`);
