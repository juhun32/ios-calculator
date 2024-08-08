document.addEventListener('DOMContentLoaded', function() {
    let display = document.querySelector('.result');
    let AC = document.querySelector('#reset')
    let currentInput = '0';
    let operator = null;
    let operand1 = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = currentInput;
        console.log(currentInput);
    }

    document.querySelectorAll('.btn_number').forEach(button => {
        button.addEventListener('click', function() {
            if (shouldResetDisplay) {
                currentInput = this.textContent;
                shouldResetDisplay = false;
            } else {
                AC.textContent = 'C';
                currentInput = currentInput === '0' ? this.textContent : currentInput + this.textContent;
            }
            console.log(currentInput);
            updateDisplay();
        });
    });

    document.querySelectorAll('.btn_operator').forEach(button => {
        button.addEventListener('click', function() {
            if (operator !== null) {
                calculate();
            }

            operand1 = parseFloat(currentInput);
            operator = this.textContent;
            console.log(operator);
            shouldResetDisplay = true;
        });
    });

    document.getElementById('equal').addEventListener('click', function() {
        calculate();
    });

    document.getElementById('reset').addEventListener('click', function() {
        AC.textContent = 'AC';
        currentInput = '0';
        operator = null;
        operand1 = null;
        shouldResetDisplay = false;
        updateDisplay();
    });

    document.getElementById('point').addEventListener('click', function() {
        if (shouldResetDisplay) {
            currentInput = '0.';
            shouldResetDisplay = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    });

    document.getElementById('sign').addEventListener('click', function() {
        currentInput = currentInput.charAt(0) === '-' ? currentInput.slice(1) : '-' + currentInput;
        updateDisplay();
    });

    document.getElementById('percentage').addEventListener('click', function() {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    });

    function calculate() {
        if (operator === null) return;
        let operand2 = parseFloat(currentInput);
        let result;

        switch(operator) {
            case '÷':
                result = operand1 / operand2;
                break;
            case '×':
                result = operand1 * operand2;
                break;
            case '−':
                result = operand1 - operand2;
                break;
            case '+':
                result = operand1 + operand2;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        console.log(currentInput);
        updateDisplay();
        operand1 = result;
        shouldResetDisplay = true;
    }
});
