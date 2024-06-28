function operate(numOne, numTwo, operator) {
    const one = parseFloat(numOne);
    const two = parseFloat(numTwo);
    if (operator == "+") {
        return sum(one, two);
    } else if (operator == "-") {
        return substract(one,two);
    } else if (operator == "x") {
        return multiply(one, two);
    } else if (operator == "÷") {
        return divide(one, two);
    }
}

function sum(numOne, numTwo) {
    return numOne + numTwo;
}

function substract(numOne, numTwo) {
    return numOne - numTwo;
}

function multiply(numOne, numTwo) {
    return numOne * numTwo;
}

function divide(numOne, numTwo) {
    return numOne / numTwo;
}

const secondaryLabel = document.querySelector("#equation");
const mainLabel = document.querySelector("#result");
const allButtons = document.querySelectorAll("button");

let firstNumber = '';
let secondNumber = '';
let operator = '';


function clearScreen() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    mainLabel.textContent = '';
    secondaryLabel.textContent = '';
}

allButtons.forEach(button => button.addEventListener('click', () => {
    if (button.className == 'digits') {
        mainLabel.textContent += button.textContent;
        secondNumber += button.textContent;
    } else if (button.className == 'action') {
        firstNumber = secondNumber;
        secondNumber = '';
        operator = button.textContent;
        secondaryLabel.textContent = `${firstNumber} ${operator}`;
        mainLabel.textContent = '';
    } else if (button.className == 'equals') {
        mainLabel.textContent = operate(firstNumber, secondNumber, operator);
        secondaryLabel.textContent += ` ${secondNumber} =`;
        secondNumber = mainLabel.textContent;
    } else if (button.textContent == "C") {
        clearScreen();
    }
    console.log(firstNumber);
    console.log(secondNumber);
    console.log(operator);
}));