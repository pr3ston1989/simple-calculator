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
    } else if (operator == "√x") {
        result = squareRoot(one);
    } else if (operator == "x²") {
        result = square(one);
    } else if (operator == "1/x") {
        result = fraction(one);
    } else if (operator == "%") {
        result = percent(one);
    } else if (operator == "+/-") {
        result = changeSign(one);
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
            return parseFloat(result.toFixed(10 - resultBaseLength));
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

function squareRoot(numOne) {
    return Math.pow(numOne, 0.5);
}

function square(numOne) {
    return Math.pow(numOne, 2);
}

function fraction(numOne) {
    return 1/numOne;
}

function percent(numOne) {
    return numOne * 0.01;
}

function changeSign(numOne) {
    return -1 * numOne;
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
    } else if (button.textContent == "CE") {
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
            if (mainLabel.textContent == '' && button.textContent == '-') {
                mainLabel.textContent = "-";
                actionFlag = false;
            } else {
                firstNumber = mainLabel.textContent;
                operator = button.textContent;
            }
        } else if (actionFlag == true && firstNumber != '') {
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
    } else if (button.id == 'Backspace' && actionFlag == false) {
        if (mainLabel.textContent.length > 1) {
            mainLabel.textContent = mainLabel.textContent.slice(0, -1);
        } else {
            mainLabel.textContent = '0';
            actionFlag = true;
        }
    } else if (button.className == 'instant-action') {
        commaButton.disabled = false;
        operator = button.textContent;
        firstNumber = mainLabel.textContent;
        mainLabel.textContent = operate(firstNumber, firstNumber, operator);
        firstNumber = '';
        secondNumber = '';
        operator = '';
        actionFlag = true;
    }
}

allButtons.forEach(button => button.addEventListener('click', () => {
    calculate(button);
    clearScreen(button);
}));

const allowedKeys = {"1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six",
    "7": "seven", "8": "eight", "9": "nine", "0": "zero", "-": "minus", "=": "equals", "/": "divide",
    "*": "multiply", "%": "percent", "Backspace": "Backspace", ".": "comma", "+": "plus", }

document.addEventListener("keydown", (e) => {
    if (e.key in allowedKeys) {
        e.preventDefault();
        document.getElementById(allowedKeys[e.key]).click();
    }
});