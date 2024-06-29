function operate(numOne, numTwo, operator) {
    const one = parseFloat(numOne);
    const two = parseFloat(numTwo);
    let result = 0;
    if (operator == "+") {
        result = sum(one, two);
    } else if (operator == "-") {
        result = substract(one,two);
    } else if (operator == "x") {
        result = multiply(one, two);
    } else if (operator == "÷") {
        result = divide(one, two);
    }
    if (result == Math.floor(result)) {
        if (String(result).length > 11) {
            return result.toExponential(5);
        }
        return result;
    } else {
        let resultBaseLength = String(Math.round(result)).length;
        if (result.toFixed(6).length > 11) {
            return result.toExponential(5);
        } else {
            return result.toFixed(10 - resultBaseLength);
        }
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
    if (numTwo == 0) {
        return "ERROR";
    }
    return numOne / numTwo;
}

const mainLabel = document.querySelector("#result");
const allButtons = document.querySelectorAll("button");
const commaButton = document.querySelector("#comma");

let firstNumber = '';
let secondNumber = '';
let operator = '';
let actionFlag = true;


function clearScreen(button) {
    if (button.textContent == "C") {
        firstNumber = '';
        secondNumber = '';
        operator = '';
        mainLabel.textContent = '0';
        actionFlag = true;
    }
}

function calculate(button) {
    if (button.className == 'digits') {
        if (actionFlag == true && button.id == 'comma') {
            mainLabel.textContent = "0.";
            button.disabled = true;
            actionFlag = false;
        } else if (actionFlag == true) {
            mainLabel.textContent = button.textContent;
            actionFlag = false;
        } else {
            if (mainLabel.textContent.length < 11) {
                if (button.id == 'comma') {
                    button.disabled = true;
                }
                mainLabel.textContent += button.textContent;
            }
        }
    } else if (button.className == 'action') {
        commaButton.disabled = false;
        if (actionFlag == false && firstNumber == '') {
            operator = button.textContent;
            firstNumber = mainLabel.textContent;
            actionFlag = true;
        } else if (actionFlag == false && firstNumber != '' && secondNumber == '') {
            if (operator == '') {
                operator = button.textContent;
            }
            secondNumber = mainLabel.textContent;
            mainLabel.textContent = operate(firstNumber, secondNumber, operator);
            operator = button.textContent;
            firstNumber = mainLabel.textContent;
            secondNumber = '';
            actionFlag = true;  
        } else if (actionFlag == true && firstNumber == '') {
            firstNumber = mainLabel.textContent;
            operator = button.textContent;
        }
    } else if (button.className == 'equals') {
        commaButton.disabled = false;
        if (firstNumber != '' && secondNumber != '' && operator != '') {
            mainLabel.textContent = operate(firstNumber, secondNumber, operator);
            firstNumber = '';
            secondNumber = '';
            operator = '';
            actionFlag = true;
        } else if (firstNumber != '' && secondNumber == '' && operator != '') {
            if (mainLabel.textContent != firstNumber) {
                secondNumber = mainLabel.textContent;
            } else {
                secondNumber = firstNumber;
            }
            mainLabel.textContent = operate(firstNumber, secondNumber, operator);
            firstNumber = '';
            secondNumber = '';
            operator = '';
            actionFlag = true;
        }
    } else if (button.id == 'erase' && actionFlag == false) {
        if (mainLabel.textContent.length > 1) {
            mainLabel.textContent = mainLabel.textContent.slice(0, -1);
        } else {
            mainLabel.textContent = '0';
            actionFlag = true;
        }
    }
}

allButtons.forEach(button => button.addEventListener('click', () => {
    calculate(button);
    clearScreen(button);
}));