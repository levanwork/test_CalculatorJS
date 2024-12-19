/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/styles.css */ "./src/css/styles.css");


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

})();

/******/ })()
;