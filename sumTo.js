function sumTo_for(number) {
    let sum = 0;

    for (let i = 0; i <= number; i++) {
        sum += i;
    }

    return sum;
}

function sumTo_recursiveTopDown(number) {
    return number === 1 ? 1 : number + sumTo_recursiveTopDown(number - 1);
}

function sumTo_recursiveBottomUp(number, acc = 0, sum = 0) {
    acc += 1;
    sum += acc;
    return number === acc ? sum : sumTo_recursiveBottomUp(number, acc, sum);
}

function sumTo_arithmeticProgression(number) {
    return (number * (1 + number)) / 2;
}

const value = 100;

if (value < 1) {
    console.warn("What are you doing mister?");
    return;
}

console.log(`For loop: ${sumTo_for(value)}`);
console.log(`Recursion top-down: ${sumTo_recursiveTopDown(value)}`);
console.log(`Recursion bottom-up: ${sumTo_recursiveBottomUp(value)}`);
console.log(`Arithmetic progression: ${sumTo_arithmeticProgression(value)}`);
