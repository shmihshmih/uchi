window.onload = function() {
  this.initilize();
}

/**
 * Переменные и константы
 */
let fmin = 6;
let fmax = 9;
let answerMin = 11;
let answerMax = 14;
let isFirstTermCorrect = false;
let isSecondTermCorrect = false;
let summOfTwoTerms;
let numberLineMap = {
  1: '40', 2: '79', 3: '118', 4: '157',
  5: '195', 6: '235', 7: '274', 8: '313',
  9: '352', 10: '391',11: '430',12: '469',
  13:'508', 14: '547',15: '586',16: '625',
  17:'664', 18: '703',19: '742',20: '781',
};

/**
 * Селекторы
 */
let numberLine = document.getElementById('number-line');
let firstTerm = document.getElementById('first-term');
let firstTermInput = document.getElementById('first-term-input');
let secondTerm = document.getElementById('second-term');
let secondTermInput = document.getElementById('second-term-input');
let summOfTwoTermsEl = document.getElementById('summ-of-two-terms');
let firstTermPath = document.getElementById('first-term-path');
let secondTermPath = document.getElementById('second-term-path');
let secondInputBlock = document.getElementById('second-input-block');
let firstArrowSpan = document.getElementById('first-arrow-span');
let secondArrowSpan = document.getElementById('second-arrow-span');

/**
 * Данные и функции при формировании документа
 */
function initilize() {
  summOfTwoTermsEl.value = '?';
  summOfTwoTerms = this.randomiser(answerMin, answerMax);
  firstTerm.innerHTML = this.randomiser(fmin, fmax);
  secondTerm.innerHTML = +summOfTwoTerms - +firstTerm.innerHTML;
  spriteHeight = document.getElementById('number-line').offsetWidth;
  firstTermPath.setAttribute('d', 'M0,70 C' + 0 + ',5 ' + numberLineMap[+firstTerm.innerHTML] + ',5 ' + numberLineMap[+firstTerm.innerHTML] + ',70');
  firstTermInput.style.left = (+numberLineMap[+firstTerm.innerHTML]/2 - +firstTermInput.offsetWidth/2) + 'px';
  secondTermPath.setAttribute('d', 'M' + (numberLineMap[+firstTerm.innerHTML]) + ',70 C' + numberLineMap[+firstTerm.innerHTML] + ',5 ' + numberLineMap[summOfTwoTerms] + ',5 ' + numberLineMap[summOfTwoTerms] + ',70');
  secondTermInput.style.left = +numberLineMap[+firstTerm.innerHTML] + +numberLineMap[+secondTerm.innerHTML]/2 - +firstTermInput.offsetWidth/2 +'px';
  firstArrowSpan.style.left = +numberLineMap[+firstTerm.innerHTML] - 8 + 'px';
}

/**
 * Получение случайного значения "от min до max"
 * @param {number} min 
 * @param {number} max 
 */
function randomiser(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * При изменении инпута с первым слагаемым
 * @param {*} val 
 */
function firstTermKeyUp(val) {
  if(+val === +firstTerm.innerHTML) {
    firstTermBackground  = 'transparent';
    firstTermInputColor  = 'black';
    firstTermInputRead   = true;
    firstTermInputBorder = 0;
    isFirstTermCorrect = true;
    secondInputBlock.style.display = 'block';
    secondArrowSpan.style.left = +numberLineMap[+summOfTwoTerms] - 8 + 'px';
    firstTermInput.style.left = (+numberLineMap[+firstTerm.innerHTML]/2) + 'px';
  } else {
    firstTermBackground  = 'yellow';
    firstTermInputColor  = 'red';
    firstTermInputRead   = false;
    firstTermInputBorder = 1;
  }
  firstTerm.style.background  = firstTermBackground;
  firstTermInput.style.color  = firstTermInputColor;
  firstTermInput.readOnly     = firstTermInputRead;
  firstTermInput.style.border = firstTermInputBorder;
}

/**
 * При изменении инпута со вторым слагаемым
 * @param {*} val 
 */
function secondTermKeyUp(val) {
  if(+val === +secondTerm.innerHTML) {
    secondTermBackground  = 'transparent';
    secondTermInputColor  = 'black';
    secondTermInputRead   = true;
    secondTermInputBorder = 0;
    isSecondTermCorrect = true;
    secondTermInput.style.left = +numberLineMap[+firstTerm.innerHTML] + +numberLineMap[+secondTerm.innerHTML]/2 +'px';
    this.summInputChanger();
  } else {
    secondTermBackground  = 'yellow';
    secondTermInputColor  = 'red';
    secondTermInputRead   = false;
    secondTermInputBorder = 1;
  }
  secondTerm.style.background  = secondTermBackground;
  secondTermInput.style.color  = secondTermInputColor;
  secondTermInput.readOnly     = secondTermInputRead;
  secondTermInput.style.border = secondTermInputBorder;
}

/**
 * Доступность поля суммы
 */
function summInputChanger() {
  if(isFirstTermCorrect && isSecondTermCorrect) {
    summOfTwoTermsEl.readOnly = false;
    summOfTwoTermsEl.style.border = '1px solid grey';
    summOfTwoTermsEl.value = '';
  }
}

/**
 * Действия при изменении значения поля суммы
 */
function summInputValChange() {
  if(+summOfTwoTermsEl.value === summOfTwoTerms) {
    summOfTwoTermsEl.readOnly = true;
    summOfTwoTermsEl.style.border = 0;
    summOfTwoTermsEl.style.color = 'black';
    setTimeout( function () {
       alert('It was great, my dear friend!'); 
       res = confirm('Maybe one more time? Go-go-go!');
       if(res === true) {
        location.reload();
       }
      }, 1000);
  } else {
    summOfTwoTermsEl.style.color = 'red';
  }
}