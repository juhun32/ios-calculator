document.addEventListener("DOMContentLoaded", function () {
  const display1 = document.querySelector("#result1");
  const display2 = document.querySelector("#result2");
  let AC1 = document.querySelector("#reset1");
  let AC2 = document.querySelector("#reset2");
  let currentInput = "0".substring(0, 21);
  let operator = null;
  let operand1 = null;
  let shouldResetDisplay = false;
  let memory = 0;

  function updateDisplay() {
    if (currentInput.length > 7) {
      display1.style.fontSize = "250%";
    }
    display1.textContent = currentInput;
    display2.textContent = currentInput;
    console.log(currentInput);
  }

  document.querySelectorAll(".btn_number").forEach((button) => {
    button.addEventListener("click", function () {
      if (shouldResetDisplay) {
        currentInput = this.textContent;
        shouldResetDisplay = false;
      } else {
        AC1.textContent = "C";
        AC2.textContent = "C";
        currentInput =
          currentInput === "0"
            ? this.textContent.substring(0, 20)
            : (currentInput + this.textContent).substring(0, 20);
      }
      console.log(currentInput);
      updateDisplay();
    });
  });

  document.querySelectorAll(".btn_operator").forEach((button) => {
    button.addEventListener("click", function () {
      if (operator !== null) {
        calculate();
      }

      operand1 = parseFloat(currentInput);
      operator = this.textContent;
      console.log(operator);
      shouldResetDisplay = true;
    });
  });

  document.getElementById("equal").addEventListener("click", function () {
    calculate();
  });

  document.getElementById("reset1").addEventListener("click", function () {
    AC1.textContent = "AC";
    currentInput = "0";
    display1.style.fontSize = "350%";
    operator = null;
    operand1 = null;
    shouldResetDisplay = false;
    updateDisplay();
  });

  document.getElementById("reset2").addEventListener("click", function () {
    AC2.textContent = "AC";
    currentInput = "0";
    operator = null;
    operand1 = null;
    shouldResetDisplay = false;
    updateDisplay();
  });

  document.getElementById("point").addEventListener("click", function () {
    if (shouldResetDisplay && !currentInput.includes(".")) {
      currentInput = "0.";
      shouldResetDisplay = false;
    } else if (!currentInput.includes(".")) {
      currentInput += ".";
    }
    updateDisplay();
  });

  document.getElementById("sign1").addEventListener("click", function () {
    currentInput =
      currentInput.charAt(0) === "-"
        ? currentInput.slice(1)
        : "-" + currentInput;
    updateDisplay();
  });

  document.getElementById("sign2").addEventListener("click", function () {
    currentInput =
      currentInput.charAt(0) === "-"
        ? currentInput.slice(1)
        : "-" + currentInput;
    updateDisplay();
  });

  document.getElementById("percentage1").addEventListener("click", function () {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  });

  document.getElementById("percentage2").addEventListener("click", function () {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  });

  function calculate() {
    if (operator === null) return;
    let operand2 = parseFloat(currentInput);
    let result;

    switch (operator) {
      case "÷":
        result = operand1 / operand2;
        break;
      case "×":
        result = operand1 * operand2;
        break;
      case "−":
        result = operand1 - operand2;
        break;
      case "+":
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
    console.log(result, value);

    switch (operation) {
      // first row
      case "mc":
        memory = 0;
        break;
      case "mplus":
        memory += parseInt(value);
        break;
      case "mminus":
        memory -= parseInt(value);
        break;
      case "mr":
        result = memory.toString();
        break;

      // second row
      case "square":
        result = Math.pow(value, 2);
        break;
      case "cube":
        result = Math.pow(value, 3);
        break;
      case "exp":
        result = Math.exp(value);
        break;

      // third row
      case "divx":
        result = 1 / value;
      case "sqrt":
        result = Math.sqrt(value);
        break;
      case "cuberoot":
        result = Math.cbrt(value);
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "ln":
        result = Math.log(value);
        break;

      // fourth row
      case "sin":
        result = Math.sin((value * Math.PI) / 180);
        break;
      case "cos":
        result = Math.cos((value * Math.PI) / 180);
        break;
      case "tan":
        result = Math.tan((value * Math.PI) / 180);
        break;

      // last row
      case "rad":
        result = (value * Math.PI) / 180.0;
      default:
        return;
    }

    currentInput = result.toString();
    if (currentInput.length > 21) {
      currentInput = currentInput.slice(0, 21);
    }
    updateDisplay();
  }

  function factorialize(num) {
    if (num < 0) return -1;
    else if (num == 0) return 1;
    else {
      return num * factorialize(num - 1);
    }
  }

  // top row advance calc
  document.getElementById("mc").addEventListener("click", function () {
    advancedCalculate("mc");
  });

  document.getElementById("mplus").addEventListener("click", function () {
    advancedCalculate("mplus");
  });

  document.getElementById("mminus").addEventListener("click", function () {
    advancedCalculate("mminus");
  });

  document.getElementById("mr").addEventListener("click", function () {
    advancedCalculate("mr");
  });

  // second row advance calc
  document.getElementById("square").addEventListener("click", function () {
    advancedCalculate("square");
  });

  document.getElementById("cube").addEventListener("click", function () {
    advancedCalculate("cube");
  });

  document.getElementById("exp").addEventListener("click", function () {
    advancedCalculate("exp");
  });

  // third row advance calc
  document.getElementById("divx").addEventListener("click", function () {
    advancedCalculate("divx");
  });

  document.getElementById("sqrt").addEventListener("click", function () {
    advancedCalculate("sqrt");
  });

  document.getElementById("cuberoot").addEventListener("click", function () {
    advancedCalculate("cuberoot");
  });

  document.getElementById("ln").addEventListener("click", function () {
    advancedCalculate("ln");
  });

  document.getElementById("log").addEventListener("click", function () {
    advancedCalculate("log");
  });

  // fourth row advance calc
  document.getElementById("xfact").addEventListener("click", function () {
    console.log(currentInput);
    currentInput = factorialize(parseInt(currentInput));
    updateDisplay();
  });

  document.getElementById("sin").addEventListener("click", function () {
    advancedCalculate("sin");
  });

  document.getElementById("cos").addEventListener("click", function () {
    advancedCalculate("cos");
  });

  document.getElementById("tan").addEventListener("click", function () {
    advancedCalculate("tan");
  });

  // last row advance calc
  document.getElementById("rad").addEventListener("click", function () {
    advancedCalculate("rad");
  });

  document.getElementById("sinh").addEventListener("click", function () {
    advancedCalculate("sinh");
  });

  document.getElementById("cosh").addEventListener("click", function () {
    advancedCalculate("cosh");
  });

  document.getElementById("tanh").addEventListener("click", function () {
    advancedCalculate("tanh");
  });

  document.getElementById("pi").addEventListener("click", function () {
    advancedCalculate("pi");
  });

  document.getElementById("rand").addEventListener("click", function () {
    advancedCalculate("rand");
  });
});
