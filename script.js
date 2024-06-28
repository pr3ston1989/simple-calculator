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


function clearScreen(button) {
    if (button.textContent == "C") {
        firstNumber = '';
        secondNumber = '';
        operator = '';
        mainLabel.textContent = '';
        secondaryLabel.textContent = '';
    }
}

function populateScreen(button) {
    mainLabel.textContent += button.textContent;
}

function calculate(button) {
    if (button.className == 'digits') {
        mainLabel.textContent += button.textContent;
    } else if (button.className == 'action') {
        if (operator == '' && button.textContent != '=') {
            firstNumber = mainLabel.textContent;
            operator = button.textContent;
            secondaryLabel.textContent = `${firstNumber} ${operator}`
            mainLabel.textContent = ''
        } else if (button.textContent == '=' && operator != '') {
            secondNumber = mainLabel.textContent;
            let result = operate(firstNumber, secondNumber, operator)
            secondaryLabel.textContent = result;
            firstNumber = result;
            mainLabel.textContent = '';
        } else if (operator != '' && mainLabel.textContent == '') {
            operator = button.textContent;
        } else {
            if (mainLabel.textContent != '') {
                secondNumber = mainLabel.textContent;
                secondaryLabel.textContent = operate(firstNumber, secondNumber, operator);
                firstNumber = secondaryLabel.textContent;
                operator = button.textContent;
                mainLabel.textContent = '';
            }
        }
    }
}


allButtons.forEach(button => button.addEventListener('click', () => {
/*    if (button.className == 'digits') {
        mainLabel.textContent += button.textContent;
    } else if (button.className == 'action' && secondNumber == '' && operator != '') {
        operator = button.textContent;
        let labelText = secondaryLabel.textContent.split(' ');
        secondaryLabel.textContent = `${labelText[0]} ${operator}`;
    } else if (button.className == 'action' && operator == '') {
        firstNumber = mainLabel.textContent;
        operator = button.textContent;
        secondaryLabel.textContent = `${firstNumber} ${operator}`;
        mainLabel.textContent = '';
    } else if (button.className == 'action' && secondNumber == '') {
        secondNumber = mainLabel.textContent;
        let temp = operate(firstNumber, secondNumber, operator);
        secondaryLabel.textContent = `${temp} ${operator}`;
        firstNumber = temp;
        mainLabel.textContent = '';
        operator = button.textContent;
    } else if (button.className == 'action' && secondNumber != '') {
        let temp = operate(firstNumber, secondNumber, operator);
        secondaryLabel.textContent = `${temp} ${operator}`;
        operator = button.textContent;
        firstNumber = temp;
        secondNumber = '';
    } else if (button.className == 'equals') {
        secondNumber = mainLabel.textContent;
        mainLabel.textContent = operate(firstNumber, secondNumber, operator);
        secondaryLabel.textContent += ` ${secondNumber} =`;
        secondNumber = '';
    } else if (button.textContent == "C") {
        clearScreen();
    }
*/

    calculate(button);
    clearScreen(button);
}));