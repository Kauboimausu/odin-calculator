// The global variables we'll use for evaluating expressions

let left = 0;
let right = 0
let operand = null;

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, leftVariable, rightVariable){
    switch (operator) {
        case "+":
            return add(leftVariable, rightVariable);
        case "-":
            return subtract(leftVariable, rightVariable);
        case "x":
            return multiply(leftVariable, rightVariable);
        case "/":
            return divide(leftVariable, rightVariable);
    }
}

// We'll add even listeners to the buttons so that they respond accordingly when theyre clicked
