document.addEventListener('DOMContentLoaded', function() {
    const display1 = document.querySelector('#result1');
    const display2 = document.querySelector('#result2');
    let AC1 = document.querySelector('#reset1')
    let AC2 = document.querySelector('#reset2')
    let currentInput = '0';
    let operator = null;
    let operand1 = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        if (currentInput.length > 7) {
            display1.style.fontSize = '250%';
        }
        display1.textContent = currentInput;
        display2.textContent = currentInput;
        console.log(currentInput);
    }

    document.querySelectorAll('.btn_number').forEach(button => {
        button.addEventListener('click', function() {
            if (shouldResetDisplay) {
                currentInput = this.textContent;
                shouldResetDisplay = false;
            } else {
                AC1.textContent = 'C';
                AC2.textContent = 'C';
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

    document.getElementById('reset1').addEventListener('click', function() {
        AC1.textContent = 'AC';
        currentInput = '0';
        display1.style.fontSize = '350%'
        operator = null;
        operand1 = null;
        shouldResetDisplay = false;
        updateDisplay();
    });
    
    document.getElementById('reset2').addEventListener('click', function() {
        AC2.textContent = 'AC';
        currentInput = '0';
        operator = null;
        operand1 = null;
        shouldResetDisplay = false;
        updateDisplay();
    });

    document.getElementById('point').addEventListener('click', function() {
        if (shouldResetDisplay && (!currentInput.includes('.'))) {
            currentInput = '0.';
            shouldResetDisplay = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        } 
        updateDisplay();
    });

    document.getElementById('sign1').addEventListener('click', function() {
        currentInput = currentInput.charAt(0) === '-' ? currentInput.slice(1) : '-' + currentInput;
        updateDisplay();
    });

    document.getElementById('sign2').addEventListener('click', function() {
        currentInput = currentInput.charAt(0) === '-' ? currentInput.slice(1) : '-' + currentInput;
        updateDisplay();
    });

    document.getElementById('percentage1').addEventListener('click', function() {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    });
    
    document.getElementById('percentage2').addEventListener('click', function() {
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

    // advanced calculation
    function advancedCalculate(operation) {
        let result;
        let value = parseFloat(currentInput);
        
        switch (operation) {
            case 'square':
                result = Math.pow(value, 2);
                break;
            case 'cube':
                result = Math.pow(value, 3);
                break;
            case 'sqrt':
                result = Math.sqrt(value);
                break;
            case 'log':
                result = Math.log10(value);
                break;
            case 'ln':
                result = Math.log(value);
                break;
            case 'exp':
                result = Math.exp(value);
                break;
            case 'sin':
                result = Math.sin(value);
                break;
            case 'cos':
                result = Math.cos(value);
                break;
            case 'tan':
                result = Math.tan(value);
                break;
            default:
                return;
        }

        currentInput = result.toString();
        if (currentInput.length > 9) {
            currentInput = currentInput.slice(0, maxLength);
        }
        updateDisplay();
    }

    document.getElementById('square').addEventListener('click', function() {
        advancedCalculate('square');
    });

    document.getElementById('sqrt').addEventListener('click', function() {
        advancedCalculate('sqrt');
    });

    document.getElementById('log').addEventListener('click', function() {
        advancedCalculate('log');
    });

    document.getElementById('ln').addEventListener('click', function() {
        advancedCalculate('ln');
    });

    document.getElementById('exp').addEventListener('click', function() {
        advancedCalculate('exp');
    });

    document.getElementById('sin').addEventListener('click', function() {
        advancedCalculate('sin');
    });

    document.getElementById('cos').addEventListener('click', function() {
        advancedCalculate('cos');
    });

    document.getElementById('tan').addEventListener('click', function() {
        advancedCalculate('tan');
    });
});
