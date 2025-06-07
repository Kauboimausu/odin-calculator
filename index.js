// The global variables we'll use for evaluating expressions

let numbers = ["", ""];
let numberIndex = 0;
let operand = "";

// The display element, we'll change the text dynamically to correspond to buttons pressed

let display = document.querySelector(".display-text");

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
        case "*":
            return multiply(leftVariable, rightVariable);
        case "/":
            return divide(leftVariable, rightVariable);
    }
}

function updateDisplay(changeTo = "0."){
    display.textContent = changeTo;
}

// We'll add even listeners to the buttons so that they respond accordingly when theyre clicked
document.querySelectorAll(".button").forEach( button =>
    button.addEventListener("click", () => {
        // The behavior will depend on the type of button pressed

        // For numbers well concatenate the number pressed at the end of the number
        if (button.classList.contains("number")) {
            numbers[numberIndex] += button.textContent;
            updateDisplay(numbers[0] + " " + operand + " " + numbers[1]);
            return;
        }

        // For operations we'll switch out the current operation 
        if (button.classList.contains("operation")){
            // We'll verify that the first part of the operation has been inputted

            // If it hasnt we alert the user and leave
            if (numbers[0] == ""){
                alert("You need to input the first number first");
                return;
            }
            // We also have to make a second number has been inputted
            if (numbers[1] == "" && operand != ""){
                alert("You need to input a second number");
                return;
            }

            // Finally if both numbers have been inputted we evaluate the expression and take the result as the first number
            if (numbers[0] != "" && numbers[1] != "") {
                let result = operate(operand, parseFloat(numbers[0]), parseFloat(numbers[1])).toFixed(3);
                numbers[0] = result;
                numbers[1] = "";
            }

            operand = button.textContent;
            numberIndex = 1;
            updateDisplay(numbers[0] + " " + operand + " " + numbers[1]);
            return;
        }

        // For the clear button well empty out all the variables and reset the display
        if (button.classList.contains("c")) {
            numbers = ["", ""];
            numberIndex = 0;
            operand = "";
            updateDisplay();
            return;
        }

        // If the button is the equals we evaluate the expression
        if (button.classList.contains("eval")) {
            // But first we check all the fields are filled
            if (numbers[0] == "" && operand == "" && numbers[1] == ""){
                alert("You need to input a valid expression first");
                return;
            }
            let result = operate(operand, parseFloat(numbers[0]), parseFloat(numbers[1])).toFixed(3);
            updateDisplay(result);
            return;
        }

        // Case for the backspace button
        if (button.classList.contains("del")) {
            // We will delete the rightmost character inputted
            if (numbers[1] != ""){
                // We'll remove the last character from the string
                numbers[1] = numbers[1].slice(0, -1);
                updateDisplay(numbers[0] + " " + operand + " " + numbers[1]);
                return;
            }
            if (operand != ""){
                operand = "";
                // In this case we'll move the index to 0 since everything else is deleted
                numberIndex = 0;
                updateDisplay(numbers[0] + " " + operand + " " + numbers[1]);
                return;
            }
            if (numbers[0] != ""){
                numbers[0] = numbers[0].slice(0, -1);
                updateDisplay(numbers[0] + " " + operand + " " + numbers[1]);
                return;
            }
            return;
        }

        if (button.classList.contains("dot")) {
            // A number can have on dot at most 
            if (numbers[numberIndex].includes(".")){
                alert("Your number already has one period, it can't have two");
                return;
            }
            numbers[numberIndex] += ".";
            updateDisplay(numbers[0] + " " + operand + " " + numbers[1]);
            return;
        }

    })
);