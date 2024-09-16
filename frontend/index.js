import { backend } from 'declarations/backend';

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
const display = document.getElementById('display');

function appendToDisplay(value) {
    if (currentOperation === null) {
        firstOperand += value;
        display.value = firstOperand;
    } else {
        secondOperand += value;
        display.value = secondOperand;
    }
}

function setOperation(operation) {
    if (firstOperand !== '') {
        currentOperation = operation;
    }
}

function clearDisplay() {
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    display.value = '';
}

async function calculate() {
    if (firstOperand !== '' && secondOperand !== '' && currentOperation !== null) {
        const x = parseFloat(firstOperand);
        const y = parseFloat(secondOperand);
        let result;

        try {
            switch (currentOperation) {
                case 'add':
                    result = await backend.add(x, y);
                    break;
                case 'subtract':
                    result = await backend.subtract(x, y);
                    break;
                case 'multiply':
                    result = await backend.multiply(x, y);
                    break;
                case 'divide':
                    const divisionResult = await backend.divide(x, y);
                    result = divisionResult[0] !== null ? divisionResult[0] : 'Error';
                    break;
            }

            display.value = result;
            firstOperand = result.toString();
            secondOperand = '';
            currentOperation = null;
        } catch (error) {
            console.error('Error during calculation:', error);
            display.value = 'Error';
        }
    }
}