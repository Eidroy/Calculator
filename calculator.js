const calculator = document.querySelector("main");

function createElement(type, content, className) {
  const element = document.createElement(type);
  if (content) element.textContent = content;
  if (className) element.classList.add(className);
  calculator.appendChild(element);
  return element;
}

const display = createElement("input", "", "display");
display.setAttribute("readonly", true);

function updateDisplay(value) {
  if (value !== "." || !display.value.includes(".")) {
    let currentValue = display.value.replace(",", "");
    currentValue += value;
    const parts = currentValue.split(".");
    const formattedNumber = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    display.value = formattedNumber + (parts.length > 1 ? "." + parts[1] : "");
  }
}

let firstValue = null;
let operator = null;
let secondValue = null;

function handleClick(event) {
  const value = event.target.textContent;

  if (!isNaN(value) || value === ".") {
    updateDisplay(value);
  } else if (value === "AC") {
    clearCalculator();
  } else if (value === "=") {
    calculateResult();
  } else {
    operator = value;
    firstValue = parseFloat(display.value);
    display.value = "";
  }
}

function clearCalculator() {
  display.value = "";
  firstValue = null;
  operator = null;
  secondValue = null;
}

function calculateResult() {
  if (firstValue !== null && operator !== null) {
    secondValue = parseFloat(display.value);
    let result;
    switch (operator) {
      case "+":
        result = firstValue + secondValue;
        break;
      case "-":
        result = firstValue - secondValue;
        break;
      case "X":
        result = firstValue * secondValue;
        break;
      case "/":
        if (secondValue === 0) {
          result = "Error: Division by zero";
        } else {
          result = firstValue / secondValue;
        }
        break;
    }
    display.value = result;
  }
}

createElement("button", "(", "operator").addEventListener("click", handleClick);
createElement("button", ")", "operator").addEventListener("click", handleClick);
createElement("button", "%", "operator").addEventListener("click", handleClick);

createElement("button", "AC", "clear").addEventListener("click", handleClick);

createElement("button", "7", "number").addEventListener("click", handleClick);
createElement("button", "8", "number").addEventListener("click", handleClick);
createElement("button", "9", "number").addEventListener("click", handleClick);

createElement("button", "/", "operator").addEventListener("click", handleClick);

createElement("button", "4", "number").addEventListener("click", handleClick);
createElement("button", "5", "number").addEventListener("click", handleClick);
createElement("button", "6", "number").addEventListener("click", handleClick);

createElement("button", "X", "operator").addEventListener("click", handleClick);

createElement("button", "1", "number").addEventListener("click", handleClick);
createElement("button", "2", "number").addEventListener("click", handleClick);
createElement("button", "3", "number").addEventListener("click", handleClick);

createElement("button", "-", "operator").addEventListener("click", handleClick);

createElement("button", "0", "number").addEventListener("click", handleClick);

createElement("button", ".", "number").addEventListener("click", handleClick);

createElement("button", "=", "equals").addEventListener("click", handleClick);
createElement("button", "+", "operator").addEventListener("click", handleClick);

document.addEventListener("keydown", (event) => {
  if (!isNaN(event.key) || event.key === ".") {
    const button = document.querySelector(`button[textContent="${event.key}"]`);
    if (button) button.click();
  } else if (event.key === "Enter") {
    const equalsButton = document.querySelector(".equals");
    if (equalsButton) equalsButton.click();
  }
});
