import '../css/styles.css';

const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('calculator-theme') || 'light';
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggleCheckbox.checked = false;
  }
});

themeToggleCheckbox.addEventListener('change', () => {
  if (themeToggleCheckbox.checked) {
    body.classList.remove('light-theme');
    localStorage.setItem('calculator-theme', 'dark');
  } else {
    body.classList.add('light-theme');
    localStorage.setItem('calculator-theme', 'light');
  }
});

const screen = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('.btn');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let shouldResetScreen = false;

function resetScreen() {
  screen.textContent = '0';
  shouldResetScreen = false;
}

function updateScreen(value) {
  if (shouldResetScreen) {
    resetScreen();
  }
  screen.textContent =
    screen.textContent === '0' ? value : screen.textContent + value;
}

function clearAll() {
  firstOperand = '';
  secondOperand = '';
  operator = '';
  screen.textContent = '0';
}

function handleOperator(op) {
  if (operator !== '') calculate();
  firstOperand = screen.textContent;
  operator = op;
  shouldResetScreen = true;
}

function calculate() {
  if (operator === '' || shouldResetScreen) return;
  secondOperand = screen.textContent;

  const result = performOperation(
    parseFloat(firstOperand),
    parseFloat(secondOperand),
    operator,
  );
  screen.textContent = result;
  operator = '';
  shouldResetScreen = true;
}

function performOperation(a, b, operator) {
  switch (operator) {
    case '+':
      return (a + b).toFixed(2).replace(/\.00$/, '');
    case '-':
      return (a - b).toFixed(2).replace(/\.00$/, '');
    case '×':
      return (a * b).toFixed(2).replace(/\.00$/, '');
    case '÷':
      return b === 0 ? 'Error' : (a / b).toFixed(2).replace(/\.00$/, '');
    case '%':
      return (a % b).toFixed(2).replace(/\.00$/, '');
    default:
      return 'Error';
  }
}

function toggleSign() {
  screen.textContent = screen.textContent.startsWith('-')
    ? screen.textContent.slice(1)
    : '-' + screen.textContent;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('gray')) {
      if (value === 'AC') {
        clearAll();
      } else if (value === '+/-') {
        toggleSign();
      } else if (value === '%') {
        screen.textContent = (parseFloat(screen.textContent) / 100).toString();
      } else {
        updateScreen(value);
      }
    } else if (button.classList.contains('orange')) {
      if (value === '=') {
        calculate();
      } else {
        handleOperator(value);
      }
    }
  });
});
