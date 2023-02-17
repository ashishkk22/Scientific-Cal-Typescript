/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions.ts":
/*!**************************!*\
  !*** ./src/functions.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isTrigonoCal = exports.inputToDeg = exports.degToDms = exports.changeTheValue = exports.toExponentialConvert = exports.changeInUnitOfAngle = exports.secondBtnShow = exports.changeButtonColor = exports.removeNumbers = exports.showStoredNumbers = exports.drawerClose = exports.drawerShow = exports.dynamicStyleDrawer = exports.dynamicStyleDrawerWithDebounce = exports.recallTheValueFromMemory = exports.removeTheValueFromMemory = exports.addTheValueToMemory = exports.stringPreAdder = exports.celiNumberCal = exports.floorNumberCal = exports.randomNumberGenerator = exports.absCal = exports.powerAndRootCal = exports.setCharAtInputField = exports.removeCharFromCal = exports.calculationOfSimpleCal = exports.simpleCalculation = exports.isOperationPresent = exports.buttonVisibilityHandler = exports.getValueFromLocal = exports.setValueInLocal = exports.inputField = void 0;
//array to check the operations
var arrayOfOperations = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
    "+",
    "-",
    "/",
    "*",
    "**",
    "!",
    "**2",
    "**3",
    "%",
    "rt",
    "(",
    ")",
    "e",
    "π",
    "log1",
    "log2",
    "ln",
    "e**",
];
//all trigonometry operation's array
var trigonoOperations = [
    "sin",
    "sin-h",
    "sin-in",
    "sin-h-in",
    "cos",
    "cos-h",
    "cos-in",
    "cos-h-in",
    "tan",
    "tan-h",
    "tan-in",
    "tan-h-in",
    "sec",
    "sec-h",
    "sec-in",
    "sec-h-in",
    "csc",
    "csc-h",
    "csc-in",
    "csc-h-in",
    "cot",
    "cot-h",
    "cot-in",
    "cot-h-in",
];
var unitOfAngle = "DEG";
exports.inputField = document.querySelector("textarea");
//==== local storage related fn ==== //
//set and get the data from the local storage
function setValueInLocal(key, value) {
    localStorage.setItem(key, value);
}
exports.setValueInLocal = setValueInLocal;
//get the values from the local storage
function getValueFromLocal(key) {
    var result = localStorage.getItem(key);
    if (!result) {
        setValueInLocal(key, "");
        return "";
    }
    return result;
}
exports.getValueFromLocal = getValueFromLocal;
//visibility of btn based on the memory
function buttonVisibilityHandler(mRecallBtn, mClearBtn) {
    if (mRecallBtn == undefined || mClearBtn == undefined)
        return;
    if (getValueFromLocal("storedNum") === "0" &&
        getValueFromLocal("storedNums") === "") {
        mRecallBtn.disabled = true;
        mClearBtn.disabled = true;
    }
    else {
        mRecallBtn.disabled = false;
        mClearBtn.disabled = false;
    }
}
exports.buttonVisibilityHandler = buttonVisibilityHandler;
//basic operation is present of not
function isOperationPresent(clickedItem) {
    return arrayOfOperations.includes(clickedItem) ? clickedItem : "#";
}
exports.isOperationPresent = isOperationPresent;
//fn that is going to just add the operation in the string
function simpleCalculation(value) {
    var valueFromLocal = getValueFromLocal("calString");
    if (valueFromLocal.charAt(0) === "0" && valueFromLocal.charAt(1) !== "0")
        valueFromLocal = valueFromLocal.substring(1);
    valueFromLocal += value;
    setCharAtInputField(valueFromLocal);
}
exports.simpleCalculation = simpleCalculation;
//going to fire on = click
function calculationOfSimpleCal(stringFromLocalStorage) {
    stringCalHandler(stringFromLocalStorage);
}
exports.calculationOfSimpleCal = calculationOfSimpleCal;
//main fn to handle the all cal logics
function stringCalHandler(inputStr) {
    try {
        inputStr = inputStr === null || inputStr === void 0 ? void 0 : inputStr.replaceAll("!", '["factorial"]()');
        inputStr = inputStr === null || inputStr === void 0 ? void 0 : inputStr.replaceAll("e", "2.7182");
        inputStr = inputStr === null || inputStr === void 0 ? void 0 : inputStr.replaceAll("π", "3.14");
        if (inputStr === null || inputStr === void 0 ? void 0 : inputStr.includes("rt")) {
            customRootCal(inputStr);
            return;
        }
        else if (inputStr.includes("log")) {
            logCal(inputStr, 10);
            return;
        }
        else if (inputStr.includes("ln")) {
            logCal(inputStr, 2.7182);
            return;
        }
        inputStr = eval(inputStr);
        setCharAtInputField(inputStr);
    }
    catch (err) {
        showErrForSomeTime("Invalid Input!");
    }
}
//custom root fn logic
function customRootCal(inputStr) {
    var firstNumber = inputStr.slice(0, inputStr.indexOf("rt"));
    var secondNumber = inputStr.slice(inputStr.indexOf("rt") + 2, inputStr.length);
    var result = "";
    try {
        result = eval("".concat(Math.pow(Number(secondNumber), (1 / Number(firstNumber)))));
    }
    catch (err) {
        showErrForSomeTime();
    }
    if (isNaN(Number(result)))
        showErrForSomeTime("Invalid Input!");
    setCharAtInputField(result);
}
//log cal fn with diff. bases logic
function logCal(inputStr, base) {
    var result = 0;
    if (inputStr.indexOf("g") !== -1 && !inputStr.includes("(")) {
        result =
            Math.log(Number(inputStr.slice(inputStr.indexOf("g") + 1, inputStr.length))) / Math.log(base);
    }
    else if (inputStr.includes("(") && inputStr.includes(")")) {
        var customBase = inputStr.slice(inputStr.indexOf("(") + 1, inputStr.indexOf(")"));
        var value = inputStr.slice(inputStr.indexOf("g") + 1, inputStr.indexOf("("));
        result = Math.log(Number(value)) / Math.log(Number(customBase));
    }
    else {
        result =
            Math.log(Number(inputStr.slice(inputStr.indexOf("n") + 1, inputStr.length))) / Math.log(base);
    }
    if (isNaN(result)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(result));
}
//backspace btn logic to remove last char
function removeCharFromCal(inputStr) {
    inputStr = inputStr === null || inputStr === void 0 ? void 0 : inputStr.substring(0, inputStr.length - 1);
    setCharAtInputField(inputStr);
}
exports.removeCharFromCal = removeCharFromCal;
//fn to set the string in the input field
function setCharAtInputField(inputVal) {
    if (exports.inputField == undefined)
        return;
    setValueInLocal("calString", inputVal);
    exports.inputField.value = inputVal;
}
exports.setCharAtInputField = setCharAtInputField;
//diff. square and root combination fn logic
function powerAndRootCal(inputStr, power, factor) {
    if (power === void 0) { power = "1"; }
    if (factor === void 0) { factor = "1"; }
    var output = Number(factor) / Number(power);
    var result = Math.pow(Number(inputStr), output);
    if (isNaN(result)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(result));
}
exports.powerAndRootCal = powerAndRootCal;
//abs cal logic
function absCal(inputStr) {
    var output = Math.abs(Number(inputStr));
    if (isNaN(output)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(output));
}
exports.absCal = absCal;
//random number gen with below input value
function randomNumberGenerator(rangeStr) {
    var randomNumber = Math.floor(Math.random() * Number(rangeStr));
    if (isNaN(randomNumber)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(randomNumber));
}
exports.randomNumberGenerator = randomNumberGenerator;
//cal floorN from input
function floorNumberCal(inputStr) {
    var newRoundOfNumber = Math.floor(Number(inputStr));
    if (isNaN(newRoundOfNumber)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(newRoundOfNumber));
}
exports.floorNumberCal = floorNumberCal;
//cal celiN from input
function celiNumberCal(inputStr) {
    var newCeliNumber = Math.ceil(Number(inputStr));
    if (isNaN(newCeliNumber)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(newCeliNumber));
}
exports.celiNumberCal = celiNumberCal;
//append the string at start
function stringPreAdder(inputStr, addString) {
    inputStr = addString + inputStr;
    setCharAtInputField(inputStr);
}
exports.stringPreAdder = stringPreAdder;
//=== stored memory cal fn ===
function addTheValueToMemory() {
    var valueFromLocal = getValueFromLocal("calString");
    var storedNum = getValueFromLocal("storedNum");
    var value = Number(valueFromLocal) + Number(storedNum);
    if (isNaN(value)) {
        showErrForSomeTime("Invalid Input!");
        return;
    }
    setValueInLocal("storedNum", String(value));
}
exports.addTheValueToMemory = addTheValueToMemory;
//minus the value from the stored
function removeTheValueFromMemory() {
    var valFromLocal = getValueFromLocal("calString");
    var storedNum = getValueFromLocal("storedNum");
    var value = Number(storedNum) - Number(valFromLocal);
    if (isNaN(value)) {
        showErrForSomeTime("Invalid Input!");
        return;
    }
    setValueInLocal("storedNum", String(value));
}
exports.removeTheValueFromMemory = removeTheValueFromMemory;
//show the output of cal (stored num)
function recallTheValueFromMemory() {
    var valFromLocal = getValueFromLocal("storedNum");
    setCharAtInputField(valFromLocal);
}
exports.recallTheValueFromMemory = recallTheValueFromMemory;
//error handling function
function showErrForSomeTime(inputErrStr) {
    if (inputErrStr === void 0) { inputErrStr = "Invalid Input !"; }
    var errorDiv = document.getElementById("error-div");
    if (errorDiv == undefined)
        return;
    errorDiv.innerHTML = inputErrStr;
    setTimeout(function () {
        errorDiv.innerHTML = "";
    }, 5000);
}
// === drawer and related to that fns ===
//debounce polyfill
function myDebounce(cb, d) {
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(function () {
            cb.apply(void 0, args);
        }, d);
    };
}
exports.dynamicStyleDrawerWithDebounce = myDebounce(function (drawerContent, rect) {
    dynamicStyleDrawer(drawerContent, rect);
}, 1000);
function dynamicStyleDrawer(drawerContent, rect) {
    if (drawerContent == undefined || rect == undefined)
        return;
    drawerContent.style.bottom = "calc(100% - ".concat(rect.bottom, "px)");
    drawerContent.style.height = "".concat(rect.height * 0.65, "px");
    drawerContent.style.width = "".concat(rect.width, "px");
}
exports.dynamicStyleDrawer = dynamicStyleDrawer;
function drawerShow(drawerContent) {
    if (drawerContent == undefined)
        return;
    drawerContent.style.display = "inline";
}
exports.drawerShow = drawerShow;
function drawerClose(drawerContent) {
    if (drawerContent == undefined)
        return;
    drawerContent.style.display = "none";
}
exports.drawerClose = drawerClose;
//show the stored nums with child append
function showStoredNumbers() {
    var _a;
    var arrayOfNumbers = (_a = getValueFromLocal("storedNums")) === null || _a === void 0 ? void 0 : _a.split(",");
    var errMsg = document.getElementById("empty-msg");
    var flagForMsg = false;
    if (arrayOfNumbers[0] == "")
        flagForMsg = true;
    if (errMsg != undefined) {
        flagForMsg
            ? (errMsg.innerText = "There's is nothing saved in your memory")
            : (errMsg.innerText = "");
    }
    var storedDiv = document.querySelector(".calDiv__numsDiv");
    if (storedDiv == undefined)
        return;
    if (storedDiv.firstChild) {
        storedDiv.textContent = "";
    }
    var child = arrayOfNumbers === null || arrayOfNumbers === void 0 ? void 0 : arrayOfNumbers.map(function (number) {
        return "<p class=\"me-3 h5\" > ".concat(number, " </p>");
    });
    if (child != undefined) {
        for (var _i = 0, child_1 = child; _i < child_1.length; _i++) {
            var i = child_1[_i];
            storedDiv.insertAdjacentHTML("beforeend", i);
        }
    }
}
exports.showStoredNumbers = showStoredNumbers;
//remove number from the ui and memory
function removeNumbers() {
    var storedDiv = document.querySelector(".calDiv__numsDiv");
    var errMsg = document.getElementById("empty-msg");
    if (errMsg == undefined)
        return;
    if (storedDiv === null || storedDiv === void 0 ? void 0 : storedDiv.firstChild) {
        storedDiv.textContent = "";
    }
    errMsg.innerText = "There's is nothing saved in your memory";
    setValueInLocal("storedNums", "");
}
exports.removeNumbers = removeNumbers;
//== change in btn UI functions ==//
//fn that changes color
function changeButtonColor(btn) {
    if (btn == undefined)
        return;
    if (btn instanceof HTMLButtonElement) {
        btn.classList.toggle("calDiv__btn--blue");
    }
}
exports.changeButtonColor = changeButtonColor;
//fn that show second btn that are hidden on click event
function secondBtnShow(allBtnForToggle, classOne, classTwo) {
    if (classOne === void 0) { classOne = "d-inline"; }
    if (classTwo === void 0) { classTwo = "d-none"; }
    Array.from(allBtnForToggle).map(function (visibleBtn) {
        //visibleBtn ==> element from DOMTokenList
        if (visibleBtn.classList.contains(classOne)) {
            visibleBtn.classList.toggle(classTwo);
        }
        else {
            visibleBtn.classList.toggle(classTwo);
        }
    });
}
exports.secondBtnShow = secondBtnShow;
//unit changing in the cal with clicks logic
function changeInUnitOfAngle() {
    if (unitOfAngle === "DEG") {
        unitOfAngle = "RAD";
        changeTheUnitInHtml("RAD");
    }
    else if (unitOfAngle === "RAD") {
        unitOfAngle = "GRAD";
        changeTheUnitInHtml("GRAD");
    }
    else if (unitOfAngle === "GRAD") {
        unitOfAngle = "DEG";
        changeTheUnitInHtml("DEG");
    }
}
exports.changeInUnitOfAngle = changeInUnitOfAngle;
//based on the string changing html value
function changeTheUnitInHtml(unitStr) {
    var unitOfAngleBtn = document.getElementById("unit-of-angle");
    if (unitOfAngleBtn == undefined)
        return;
    unitOfAngleBtn.innerHTML = unitStr;
}
function toExponentialConvert() {
    var valFromLocal = getValueFromLocal("calString");
    var expoNum = Number.parseFloat(valFromLocal).toExponential();
    if (isNaN(Number(expoNum))) {
        showErrForSomeTime("Invalid Input!");
        return;
    }
    setCharAtInputField(expoNum);
}
exports.toExponentialConvert = toExponentialConvert;
//change the value plus to minus or minus to plus
function changeTheValue() {
    var valueFromLocal = getValueFromLocal("calString");
    if (valueFromLocal.charAt(0) === "-") {
        valueFromLocal = valueFromLocal.substring(1, valueFromLocal.length);
    }
    else {
        valueFromLocal = "-" + valueFromLocal;
    }
    setCharAtInputField(valueFromLocal);
}
exports.changeTheValue = changeTheValue;
//degree to dms
function degToDms() {
    var valueFromLocal = getValueFromLocal("calString");
    var deg = Number(valueFromLocal);
    if (unitOfAngle === "DEG" || isNaN(Number(deg))) {
        showErrForSomeTime("Please enter the input in DEG with numbers!");
        return;
    }
    var d = Math.floor(deg);
    var minfloat = (deg - d) * 60;
    var m = Math.floor(minfloat);
    var secfloat = (minfloat - m) * 60;
    var s = Math.round(secfloat);
    // After rounding, the seconds might become 60.
    if (s === 60) {
        m++;
        s = 0;
    }
    if (m === 60) {
        d++;
        m = 0;
    }
    var output = "" + d + ":" + m + ":" + s;
    setCharAtInputField(output);
}
exports.degToDms = degToDms;
//radian, grade to deg
function inputToDeg() {
    var stringFromLocal = getValueFromLocal("calString");
    var valueFromLocal = Number(stringFromLocal);
    if (unitOfAngle === "DEG") {
        return;
    }
    else if (unitOfAngle === "RAD") {
        valueFromLocal = valueFromLocal * (180 / Math.PI);
    }
    else if (unitOfAngle === "GRAD") {
        valueFromLocal = valueFromLocal / 0.0157;
    }
    if (isNaN(valueFromLocal)) {
        showErrForSomeTime("Please enter Numbers!");
        return;
    }
    setCharAtInputField(String(valueFromLocal));
}
exports.inputToDeg = inputToDeg;
//operation is Trigono or not
function isTrigonoCal(clickedItem) {
    trigonoOperations.includes(clickedItem)
        ? trigonoOperationHandler(clickedItem)
        : "";
}
exports.isTrigonoCal = isTrigonoCal;
//to handle all the trigonometry operations
function trigonoOperationHandler(clickedItem) {
    var stringFromLocal = getValueFromLocal("calString");
    var value = Number(stringFromLocal);
    if (unitOfAngle === "DEG") {
        //converting degree to radian
        value = value * (Math.PI / 180);
    }
    else if (unitOfAngle === "GRAD") {
        //1 Gradians to Radians = 0.0157
        value = value * 0.0157;
    }
    if (isNaN(value)) {
        showErrForSomeTime();
        return;
    }
    if (clickedItem.includes("sin")) {
        sinTrigonoOperations(clickedItem, value);
    }
    else if (clickedItem.includes("cos")) {
        cosTrigonoOperations(clickedItem, value);
    }
    else if (clickedItem.includes("tan")) {
        tanTrigonoOperations(clickedItem, value);
    }
    else if (clickedItem.includes("csc")) {
        cscTrigonoOperations(clickedItem, value);
    }
    else if (clickedItem.includes("sec")) {
        secTrigonoOperations(clickedItem, value);
    }
    else if (clickedItem.includes("cot")) {
        cotTrigonoOperations(clickedItem, value);
    }
}
//to handle all the sin operations
function sinTrigonoOperations(clickedItem, value) {
    switch (clickedItem) {
        case "sin":
            value = Math.sin(value);
            break;
        case "sin-in":
            if (value <= 1 && value >= -1) {
                value = Math.asin(value);
                setCharAtInputField(String(value));
            }
            else {
                showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
                return;
            }
        case "sin-h":
            value = Math.sinh(value);
            break;
        case "sin-h-in":
            value = Math.asinh(value);
            break;
    }
    if (isNaN(value)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(value));
}
//to handle all the cos operations
function cosTrigonoOperations(clickedItem, value) {
    switch (clickedItem) {
        case "cos":
            value = Math.cos(value);
            break;
        case "cos-in":
            if (value <= 1 && value >= -1) {
                value = Math.acos(value);
                setCharAtInputField(String(value));
            }
            else {
                showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
                return;
            }
            break;
        case "cos-h":
            value = Math.cosh(value);
            break;
        case "cos-h-in":
            value = Math.acosh(value);
            break;
    }
    if (isNaN(value)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(value));
}
//to handle all the tan operations
function tanTrigonoOperations(clickedItem, value) {
    switch (clickedItem) {
        case "tan":
            value = Math.tan(value);
            break;
        case "tan-in":
            value = Math.atan(value);
            break;
        case "tan-h":
            value = Math.tanh(value);
            break;
        case "tan-h-in":
            if (value <= 1 && value >= -1) {
                value = Math.atanh(value);
            }
            else {
                showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
                return;
            }
            break;
    }
    if (isNaN(value)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(value));
}
//to handle all the cosec operation
function cscTrigonoOperations(clickedItem, value) {
    switch (clickedItem) {
        case "csc":
            value = 1 / Math.sin(value);
            break;
        case "csc-in":
            if (value <= 1 && value >= -1) {
                value = 1 / Math.asin(value);
                setCharAtInputField(String(value));
            }
            else {
                showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
                return;
            }
            break;
        case "csc-h":
            value = 1 / Math.sinh(value);
            break;
        case "csc-h-in":
            value = 1 / Math.asinh(value);
            break;
    }
    if (isNaN(value)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(value));
}
//to handle all the sec operations
function secTrigonoOperations(clickedItem, value) {
    switch (clickedItem) {
        case "sec":
            value = 1 / Math.cos(value);
            break;
        case "sec-in":
            if (value <= 1 && value >= -1) {
                value = 1 / Math.acos(value);
                setCharAtInputField(String(value));
            }
            else {
                showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
                return;
            }
            break;
        case "sec-h":
            value = 1 / Math.cosh(value);
            break;
        case "sec-h-in":
            value = 1 / Math.acosh(value);
            break;
    }
    if (isNaN(value)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(value));
}
//to handle all the cot operations
function cotTrigonoOperations(clickedItem, value) {
    switch (clickedItem) {
        case "cot":
            value = 1 / Math.tan(value);
            break;
        case "cot-in":
            value = 1 / Math.atan(value);
            break;
        case "cot-h":
            value = 1 / Math.tanh(value);
            break;
        case "cot-h-in":
            if (value <= 1 && value >= -1) {
                value = 1 / Math.atanh(value);
            }
            else {
                showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
                return;
            }
            break;
    }
    if (isNaN(value)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(value));
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var functions_1 = __webpack_require__(/*! ./functions */ "./src/functions.ts");
var flagForToggleBtn = false;
var flagForHypBtn = false;
var memoryStoreValues = [];
var mainDivOfCal = document.getElementById("calculator-div");
var rect = mainDivOfCal === null || mainDivOfCal === void 0 ? void 0 : mainDivOfCal.getBoundingClientRect();
var drawerContent = document.querySelector(".calDiv_drawer");
//to adjust the drawer position, if resize window
addEventListener("resize", function () {
    rect = mainDivOfCal === null || mainDivOfCal === void 0 ? void 0 : mainDivOfCal.getBoundingClientRect();
    (0, functions_1.dynamicStyleDrawerWithDebounce)(drawerContent, rect);
});
var mRecallBtn = document.getElementById("m-recall");
var mClearBtn = document.getElementById("m-clear");
//enable or disable the btn
(0, functions_1.buttonVisibilityHandler)(mRecallBtn, mClearBtn);
//factorial method on Number
Number.prototype.factorial = function () {
    return this > 0 ? this * (this - 1).factorial(this) : 1; //factorial logic
};
//set initial value in the input field empty or existing
if (functions_1.inputField != undefined) {
    functions_1.inputField.value = (0, functions_1.getValueFromLocal)("calString");
}
//only one main event listener for all the btn (event delegation)
mainDivOfCal === null || mainDivOfCal === void 0 ? void 0 : mainDivOfCal.addEventListener("click", function (e) {
    var _a;
    //currentTarget --> element that the listener was bound to.
    //target --> on we do actually click
    if (e.target === e.currentTarget)
        return;
    //getting stored values
    var stringFromLocalStorage = (0, functions_1.getValueFromLocal)("calString");
    var storedNumberOutput = (0, functions_1.getValueFromLocal)("storedNum");
    if (storedNumberOutput === "")
        (0, functions_1.setValueInLocal)("storedNum", "0");
    //getting the id of clicked ele
    var clickedItem = (_a = e.target) === null || _a === void 0 ? void 0 : _a.id;
    if (clickedItem == undefined)
        return;
    switch (clickedItem) {
        case (0, functions_1.isOperationPresent)(clickedItem):
            if (clickedItem === "log1" || clickedItem === "log2") {
                clickedItem = "log";
            }
            (0, functions_1.simpleCalculation)(clickedItem);
            break;
        case "m-plus":
            (0, functions_1.addTheValueToMemory)();
            (0, functions_1.buttonVisibilityHandler)(mRecallBtn, mClearBtn);
            break;
        case "m-minus":
            (0, functions_1.removeTheValueFromMemory)();
            (0, functions_1.buttonVisibilityHandler)(mRecallBtn, mClearBtn);
            break;
        case "m-clear":
            (0, functions_1.setValueInLocal)("storedNum", String(0));
            (0, functions_1.setValueInLocal)("storedNums", "");
            memoryStoreValues = [];
            (0, functions_1.buttonVisibilityHandler)(mRecallBtn, mClearBtn);
            break;
        case "m-recall":
            (0, functions_1.recallTheValueFromMemory)();
            break;
        case "m-store":
            memoryStoreValues.push((0, functions_1.getValueFromLocal)("calString"));
            (0, functions_1.setValueInLocal)("storedNums", String(memoryStoreValues));
            (0, functions_1.buttonVisibilityHandler)(mRecallBtn, mClearBtn);
            break;
        case "m-show":
            (0, functions_1.dynamicStyleDrawer)(drawerContent, rect);
            (0, functions_1.drawerShow)(drawerContent);
            (0, functions_1.showStoredNumbers)();
            break;
        case "drawer-close":
            (0, functions_1.drawerClose)(drawerContent);
            break;
        case "remove-nums":
            (0, functions_1.removeNumbers)();
            memoryStoreValues = [];
            (0, functions_1.buttonVisibilityHandler)(mRecallBtn, mClearBtn);
            break;
        case "=":
            (0, functions_1.calculationOfSimpleCal)(stringFromLocalStorage);
            break;
        case "remove-char":
            (0, functions_1.removeCharFromCal)(stringFromLocalStorage);
            break;
        case "reset-char":
            stringFromLocalStorage = "0";
            (0, functions_1.setCharAtInputField)(stringFromLocalStorage);
            break;
        case "10sq":
            (0, functions_1.powerAndRootCal)("10", "1", stringFromLocalStorage);
            break;
        case "sqrt":
            (0, functions_1.powerAndRootCal)(stringFromLocalStorage, "2");
            break;
        case "cbrt":
            (0, functions_1.powerAndRootCal)(stringFromLocalStorage, "3");
            break;
        case "1/x":
            (0, functions_1.stringPreAdder)(stringFromLocalStorage, "1/");
            break;
        case "2**":
            (0, functions_1.stringPreAdder)(stringFromLocalStorage, "2**");
            break;
        case "abs1":
        case "abs2":
            (0, functions_1.absCal)(stringFromLocalStorage);
            break;
        case "random-num":
            (0, functions_1.randomNumberGenerator)(stringFromLocalStorage);
            break;
        case "floor":
            (0, functions_1.floorNumberCal)(stringFromLocalStorage);
            break;
        case "celi":
            (0, functions_1.celiNumberCal)(stringFromLocalStorage);
            break;
        case "unit-of-angle":
            (0, functions_1.changeInUnitOfAngle)();
            break;
        case "e-sq-x":
            (0, functions_1.stringPreAdder)(stringFromLocalStorage, "e**");
            break;
        case "e**":
            (0, functions_1.stringPreAdder)(stringFromLocalStorage, "e**");
            break;
        case "to-expo":
            (0, functions_1.toExponentialConvert)();
            break;
        case "plus-minus":
            (0, functions_1.changeTheValue)();
            break;
        case "dms":
            (0, functions_1.degToDms)();
            break;
        case "deg":
            (0, functions_1.inputToDeg)();
            break;
        case "second-fn-Trigono":
            if (flagForHypBtn) {
                break;
            }
            var btnsOfTrigono = document.getElementsByClassName("trigono-btn");
            (0, functions_1.changeButtonColor)(e.target);
            (0, functions_1.secondBtnShow)(btnsOfTrigono);
            flagForToggleBtn === false
                ? (flagForToggleBtn = true)
                : (flagForToggleBtn = false);
            break;
        case "second-fn-Trigono-h":
            if (flagForToggleBtn) {
                var btnOfHTrigonoInverse = document.getElementsByClassName("trigono-h-inv");
                (0, functions_1.changeButtonColor)(e.target);
                (0, functions_1.secondBtnShow)(btnOfHTrigonoInverse);
            }
            else {
                var btnOfHTrigono = document.getElementsByClassName("trigono-h-btn");
                (0, functions_1.changeButtonColor)(e.target);
                (0, functions_1.secondBtnShow)(btnOfHTrigono);
            }
            flagForHypBtn === false
                ? (flagForHypBtn = true)
                : (flagForHypBtn = false);
            break;
        case "second-fn":
            var allBtnForToggle = document.getElementsByClassName("2nd-toggle-btn");
            (0, functions_1.changeButtonColor)(e.target);
            (0, functions_1.secondBtnShow)(allBtnForToggle);
            break;
        default:
            (0, functions_1.isTrigonoCal)(clickedItem);
            break;
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDNXJCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYWxjdWxhdG9yLy4vc3JjL2Z1bmN0aW9ucy50cyIsIndlYnBhY2s6Ly9jYWxjdWxhdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhbGN1bGF0b3IvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzVHJpZ29ub0NhbCA9IGV4cG9ydHMuaW5wdXRUb0RlZyA9IGV4cG9ydHMuZGVnVG9EbXMgPSBleHBvcnRzLmNoYW5nZVRoZVZhbHVlID0gZXhwb3J0cy50b0V4cG9uZW50aWFsQ29udmVydCA9IGV4cG9ydHMuY2hhbmdlSW5Vbml0T2ZBbmdsZSA9IGV4cG9ydHMuc2Vjb25kQnRuU2hvdyA9IGV4cG9ydHMuY2hhbmdlQnV0dG9uQ29sb3IgPSBleHBvcnRzLnJlbW92ZU51bWJlcnMgPSBleHBvcnRzLnNob3dTdG9yZWROdW1iZXJzID0gZXhwb3J0cy5kcmF3ZXJDbG9zZSA9IGV4cG9ydHMuZHJhd2VyU2hvdyA9IGV4cG9ydHMuZHluYW1pY1N0eWxlRHJhd2VyID0gZXhwb3J0cy5keW5hbWljU3R5bGVEcmF3ZXJXaXRoRGVib3VuY2UgPSBleHBvcnRzLnJlY2FsbFRoZVZhbHVlRnJvbU1lbW9yeSA9IGV4cG9ydHMucmVtb3ZlVGhlVmFsdWVGcm9tTWVtb3J5ID0gZXhwb3J0cy5hZGRUaGVWYWx1ZVRvTWVtb3J5ID0gZXhwb3J0cy5zdHJpbmdQcmVBZGRlciA9IGV4cG9ydHMuY2VsaU51bWJlckNhbCA9IGV4cG9ydHMuZmxvb3JOdW1iZXJDYWwgPSBleHBvcnRzLnJhbmRvbU51bWJlckdlbmVyYXRvciA9IGV4cG9ydHMuYWJzQ2FsID0gZXhwb3J0cy5wb3dlckFuZFJvb3RDYWwgPSBleHBvcnRzLnNldENoYXJBdElucHV0RmllbGQgPSBleHBvcnRzLnJlbW92ZUNoYXJGcm9tQ2FsID0gZXhwb3J0cy5jYWxjdWxhdGlvbk9mU2ltcGxlQ2FsID0gZXhwb3J0cy5zaW1wbGVDYWxjdWxhdGlvbiA9IGV4cG9ydHMuaXNPcGVyYXRpb25QcmVzZW50ID0gZXhwb3J0cy5idXR0b25WaXNpYmlsaXR5SGFuZGxlciA9IGV4cG9ydHMuZ2V0VmFsdWVGcm9tTG9jYWwgPSBleHBvcnRzLnNldFZhbHVlSW5Mb2NhbCA9IGV4cG9ydHMuaW5wdXRGaWVsZCA9IHZvaWQgMDtcbi8vYXJyYXkgdG8gY2hlY2sgdGhlIG9wZXJhdGlvbnNcbnZhciBhcnJheU9mT3BlcmF0aW9ucyA9IFtcbiAgICBcIjFcIixcbiAgICBcIjJcIixcbiAgICBcIjNcIixcbiAgICBcIjRcIixcbiAgICBcIjVcIixcbiAgICBcIjZcIixcbiAgICBcIjdcIixcbiAgICBcIjhcIixcbiAgICBcIjlcIixcbiAgICBcIjBcIixcbiAgICBcIi5cIixcbiAgICBcIitcIixcbiAgICBcIi1cIixcbiAgICBcIi9cIixcbiAgICBcIipcIixcbiAgICBcIioqXCIsXG4gICAgXCIhXCIsXG4gICAgXCIqKjJcIixcbiAgICBcIioqM1wiLFxuICAgIFwiJVwiLFxuICAgIFwicnRcIixcbiAgICBcIihcIixcbiAgICBcIilcIixcbiAgICBcImVcIixcbiAgICBcIs+AXCIsXG4gICAgXCJsb2cxXCIsXG4gICAgXCJsb2cyXCIsXG4gICAgXCJsblwiLFxuICAgIFwiZSoqXCIsXG5dO1xuLy9hbGwgdHJpZ29ub21ldHJ5IG9wZXJhdGlvbidzIGFycmF5XG52YXIgdHJpZ29ub09wZXJhdGlvbnMgPSBbXG4gICAgXCJzaW5cIixcbiAgICBcInNpbi1oXCIsXG4gICAgXCJzaW4taW5cIixcbiAgICBcInNpbi1oLWluXCIsXG4gICAgXCJjb3NcIixcbiAgICBcImNvcy1oXCIsXG4gICAgXCJjb3MtaW5cIixcbiAgICBcImNvcy1oLWluXCIsXG4gICAgXCJ0YW5cIixcbiAgICBcInRhbi1oXCIsXG4gICAgXCJ0YW4taW5cIixcbiAgICBcInRhbi1oLWluXCIsXG4gICAgXCJzZWNcIixcbiAgICBcInNlYy1oXCIsXG4gICAgXCJzZWMtaW5cIixcbiAgICBcInNlYy1oLWluXCIsXG4gICAgXCJjc2NcIixcbiAgICBcImNzYy1oXCIsXG4gICAgXCJjc2MtaW5cIixcbiAgICBcImNzYy1oLWluXCIsXG4gICAgXCJjb3RcIixcbiAgICBcImNvdC1oXCIsXG4gICAgXCJjb3QtaW5cIixcbiAgICBcImNvdC1oLWluXCIsXG5dO1xudmFyIHVuaXRPZkFuZ2xlID0gXCJERUdcIjtcbmV4cG9ydHMuaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKTtcbi8vPT09PSBsb2NhbCBzdG9yYWdlIHJlbGF0ZWQgZm4gPT09PSAvL1xuLy9zZXQgYW5kIGdldCB0aGUgZGF0YSBmcm9tIHRoZSBsb2NhbCBzdG9yYWdlXG5mdW5jdGlvbiBzZXRWYWx1ZUluTG9jYWwoa2V5LCB2YWx1ZSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xufVxuZXhwb3J0cy5zZXRWYWx1ZUluTG9jYWwgPSBzZXRWYWx1ZUluTG9jYWw7XG4vL2dldCB0aGUgdmFsdWVzIGZyb20gdGhlIGxvY2FsIHN0b3JhZ2VcbmZ1bmN0aW9uIGdldFZhbHVlRnJvbUxvY2FsKGtleSkge1xuICAgIHZhciByZXN1bHQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIHNldFZhbHVlSW5Mb2NhbChrZXksIFwiXCIpO1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuZ2V0VmFsdWVGcm9tTG9jYWwgPSBnZXRWYWx1ZUZyb21Mb2NhbDtcbi8vdmlzaWJpbGl0eSBvZiBidG4gYmFzZWQgb24gdGhlIG1lbW9yeVxuZnVuY3Rpb24gYnV0dG9uVmlzaWJpbGl0eUhhbmRsZXIobVJlY2FsbEJ0biwgbUNsZWFyQnRuKSB7XG4gICAgaWYgKG1SZWNhbGxCdG4gPT0gdW5kZWZpbmVkIHx8IG1DbGVhckJ0biA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoZ2V0VmFsdWVGcm9tTG9jYWwoXCJzdG9yZWROdW1cIikgPT09IFwiMFwiICYmXG4gICAgICAgIGdldFZhbHVlRnJvbUxvY2FsKFwic3RvcmVkTnVtc1wiKSA9PT0gXCJcIikge1xuICAgICAgICBtUmVjYWxsQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgbUNsZWFyQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1SZWNhbGxCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgbUNsZWFyQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0cy5idXR0b25WaXNpYmlsaXR5SGFuZGxlciA9IGJ1dHRvblZpc2liaWxpdHlIYW5kbGVyO1xuLy9iYXNpYyBvcGVyYXRpb24gaXMgcHJlc2VudCBvZiBub3RcbmZ1bmN0aW9uIGlzT3BlcmF0aW9uUHJlc2VudChjbGlja2VkSXRlbSkge1xuICAgIHJldHVybiBhcnJheU9mT3BlcmF0aW9ucy5pbmNsdWRlcyhjbGlja2VkSXRlbSkgPyBjbGlja2VkSXRlbSA6IFwiI1wiO1xufVxuZXhwb3J0cy5pc09wZXJhdGlvblByZXNlbnQgPSBpc09wZXJhdGlvblByZXNlbnQ7XG4vL2ZuIHRoYXQgaXMgZ29pbmcgdG8ganVzdCBhZGQgdGhlIG9wZXJhdGlvbiBpbiB0aGUgc3RyaW5nXG5mdW5jdGlvbiBzaW1wbGVDYWxjdWxhdGlvbih2YWx1ZSkge1xuICAgIHZhciB2YWx1ZUZyb21Mb2NhbCA9IGdldFZhbHVlRnJvbUxvY2FsKFwiY2FsU3RyaW5nXCIpO1xuICAgIGlmICh2YWx1ZUZyb21Mb2NhbC5jaGFyQXQoMCkgPT09IFwiMFwiICYmIHZhbHVlRnJvbUxvY2FsLmNoYXJBdCgxKSAhPT0gXCIwXCIpXG4gICAgICAgIHZhbHVlRnJvbUxvY2FsID0gdmFsdWVGcm9tTG9jYWwuc3Vic3RyaW5nKDEpO1xuICAgIHZhbHVlRnJvbUxvY2FsICs9IHZhbHVlO1xuICAgIHNldENoYXJBdElucHV0RmllbGQodmFsdWVGcm9tTG9jYWwpO1xufVxuZXhwb3J0cy5zaW1wbGVDYWxjdWxhdGlvbiA9IHNpbXBsZUNhbGN1bGF0aW9uO1xuLy9nb2luZyB0byBmaXJlIG9uID0gY2xpY2tcbmZ1bmN0aW9uIGNhbGN1bGF0aW9uT2ZTaW1wbGVDYWwoc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSkge1xuICAgIHN0cmluZ0NhbEhhbmRsZXIoc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSk7XG59XG5leHBvcnRzLmNhbGN1bGF0aW9uT2ZTaW1wbGVDYWwgPSBjYWxjdWxhdGlvbk9mU2ltcGxlQ2FsO1xuLy9tYWluIGZuIHRvIGhhbmRsZSB0aGUgYWxsIGNhbCBsb2dpY3NcbmZ1bmN0aW9uIHN0cmluZ0NhbEhhbmRsZXIoaW5wdXRTdHIpIHtcbiAgICB0cnkge1xuICAgICAgICBpbnB1dFN0ciA9IGlucHV0U3RyID09PSBudWxsIHx8IGlucHV0U3RyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbnB1dFN0ci5yZXBsYWNlQWxsKFwiIVwiLCAnW1wiZmFjdG9yaWFsXCJdKCknKTtcbiAgICAgICAgaW5wdXRTdHIgPSBpbnB1dFN0ciA9PT0gbnVsbCB8fCBpbnB1dFN0ciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5wdXRTdHIucmVwbGFjZUFsbChcImVcIiwgXCIyLjcxODJcIik7XG4gICAgICAgIGlucHV0U3RyID0gaW5wdXRTdHIgPT09IG51bGwgfHwgaW5wdXRTdHIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGlucHV0U3RyLnJlcGxhY2VBbGwoXCLPgFwiLCBcIjMuMTRcIik7XG4gICAgICAgIGlmIChpbnB1dFN0ciA9PT0gbnVsbCB8fCBpbnB1dFN0ciA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5wdXRTdHIuaW5jbHVkZXMoXCJydFwiKSkge1xuICAgICAgICAgICAgY3VzdG9tUm9vdENhbChpbnB1dFN0cik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXRTdHIuaW5jbHVkZXMoXCJsb2dcIikpIHtcbiAgICAgICAgICAgIGxvZ0NhbChpbnB1dFN0ciwgMTApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0U3RyLmluY2x1ZGVzKFwibG5cIikpIHtcbiAgICAgICAgICAgIGxvZ0NhbChpbnB1dFN0ciwgMi43MTgyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dFN0ciA9IGV2YWwoaW5wdXRTdHIpO1xuICAgICAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKGlucHV0U3RyKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJJbnZhbGlkIElucHV0IVwiKTtcbiAgICB9XG59XG4vL2N1c3RvbSByb290IGZuIGxvZ2ljXG5mdW5jdGlvbiBjdXN0b21Sb290Q2FsKGlucHV0U3RyKSB7XG4gICAgdmFyIGZpcnN0TnVtYmVyID0gaW5wdXRTdHIuc2xpY2UoMCwgaW5wdXRTdHIuaW5kZXhPZihcInJ0XCIpKTtcbiAgICB2YXIgc2Vjb25kTnVtYmVyID0gaW5wdXRTdHIuc2xpY2UoaW5wdXRTdHIuaW5kZXhPZihcInJ0XCIpICsgMiwgaW5wdXRTdHIubGVuZ3RoKTtcbiAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBldmFsKFwiXCIuY29uY2F0KE1hdGgucG93KE51bWJlcihzZWNvbmROdW1iZXIpLCAoMSAvIE51bWJlcihmaXJzdE51bWJlcikpKSkpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgIH1cbiAgICBpZiAoaXNOYU4oTnVtYmVyKHJlc3VsdCkpKVxuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJJbnZhbGlkIElucHV0IVwiKTtcbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKHJlc3VsdCk7XG59XG4vL2xvZyBjYWwgZm4gd2l0aCBkaWZmLiBiYXNlcyBsb2dpY1xuZnVuY3Rpb24gbG9nQ2FsKGlucHV0U3RyLCBiYXNlKSB7XG4gICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgaWYgKGlucHV0U3RyLmluZGV4T2YoXCJnXCIpICE9PSAtMSAmJiAhaW5wdXRTdHIuaW5jbHVkZXMoXCIoXCIpKSB7XG4gICAgICAgIHJlc3VsdCA9XG4gICAgICAgICAgICBNYXRoLmxvZyhOdW1iZXIoaW5wdXRTdHIuc2xpY2UoaW5wdXRTdHIuaW5kZXhPZihcImdcIikgKyAxLCBpbnB1dFN0ci5sZW5ndGgpKSkgLyBNYXRoLmxvZyhiYXNlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaW5wdXRTdHIuaW5jbHVkZXMoXCIoXCIpICYmIGlucHV0U3RyLmluY2x1ZGVzKFwiKVwiKSkge1xuICAgICAgICB2YXIgY3VzdG9tQmFzZSA9IGlucHV0U3RyLnNsaWNlKGlucHV0U3RyLmluZGV4T2YoXCIoXCIpICsgMSwgaW5wdXRTdHIuaW5kZXhPZihcIilcIikpO1xuICAgICAgICB2YXIgdmFsdWUgPSBpbnB1dFN0ci5zbGljZShpbnB1dFN0ci5pbmRleE9mKFwiZ1wiKSArIDEsIGlucHV0U3RyLmluZGV4T2YoXCIoXCIpKTtcbiAgICAgICAgcmVzdWx0ID0gTWF0aC5sb2coTnVtYmVyKHZhbHVlKSkgLyBNYXRoLmxvZyhOdW1iZXIoY3VzdG9tQmFzZSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgIE1hdGgubG9nKE51bWJlcihpbnB1dFN0ci5zbGljZShpbnB1dFN0ci5pbmRleE9mKFwiblwiKSArIDEsIGlucHV0U3RyLmxlbmd0aCkpKSAvIE1hdGgubG9nKGJhc2UpO1xuICAgIH1cbiAgICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKFN0cmluZyhyZXN1bHQpKTtcbn1cbi8vYmFja3NwYWNlIGJ0biBsb2dpYyB0byByZW1vdmUgbGFzdCBjaGFyXG5mdW5jdGlvbiByZW1vdmVDaGFyRnJvbUNhbChpbnB1dFN0cikge1xuICAgIGlucHV0U3RyID0gaW5wdXRTdHIgPT09IG51bGwgfHwgaW5wdXRTdHIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGlucHV0U3RyLnN1YnN0cmluZygwLCBpbnB1dFN0ci5sZW5ndGggLSAxKTtcbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKGlucHV0U3RyKTtcbn1cbmV4cG9ydHMucmVtb3ZlQ2hhckZyb21DYWwgPSByZW1vdmVDaGFyRnJvbUNhbDtcbi8vZm4gdG8gc2V0IHRoZSBzdHJpbmcgaW4gdGhlIGlucHV0IGZpZWxkXG5mdW5jdGlvbiBzZXRDaGFyQXRJbnB1dEZpZWxkKGlucHV0VmFsKSB7XG4gICAgaWYgKGV4cG9ydHMuaW5wdXRGaWVsZCA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBzZXRWYWx1ZUluTG9jYWwoXCJjYWxTdHJpbmdcIiwgaW5wdXRWYWwpO1xuICAgIGV4cG9ydHMuaW5wdXRGaWVsZC52YWx1ZSA9IGlucHV0VmFsO1xufVxuZXhwb3J0cy5zZXRDaGFyQXRJbnB1dEZpZWxkID0gc2V0Q2hhckF0SW5wdXRGaWVsZDtcbi8vZGlmZi4gc3F1YXJlIGFuZCByb290IGNvbWJpbmF0aW9uIGZuIGxvZ2ljXG5mdW5jdGlvbiBwb3dlckFuZFJvb3RDYWwoaW5wdXRTdHIsIHBvd2VyLCBmYWN0b3IpIHtcbiAgICBpZiAocG93ZXIgPT09IHZvaWQgMCkgeyBwb3dlciA9IFwiMVwiOyB9XG4gICAgaWYgKGZhY3RvciA9PT0gdm9pZCAwKSB7IGZhY3RvciA9IFwiMVwiOyB9XG4gICAgdmFyIG91dHB1dCA9IE51bWJlcihmYWN0b3IpIC8gTnVtYmVyKHBvd2VyKTtcbiAgICB2YXIgcmVzdWx0ID0gTWF0aC5wb3coTnVtYmVyKGlucHV0U3RyKSwgb3V0cHV0KTtcbiAgICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKFN0cmluZyhyZXN1bHQpKTtcbn1cbmV4cG9ydHMucG93ZXJBbmRSb290Q2FsID0gcG93ZXJBbmRSb290Q2FsO1xuLy9hYnMgY2FsIGxvZ2ljXG5mdW5jdGlvbiBhYnNDYWwoaW5wdXRTdHIpIHtcbiAgICB2YXIgb3V0cHV0ID0gTWF0aC5hYnMoTnVtYmVyKGlucHV0U3RyKSk7XG4gICAgaWYgKGlzTmFOKG91dHB1dCkpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0Q2hhckF0SW5wdXRGaWVsZChTdHJpbmcob3V0cHV0KSk7XG59XG5leHBvcnRzLmFic0NhbCA9IGFic0NhbDtcbi8vcmFuZG9tIG51bWJlciBnZW4gd2l0aCBiZWxvdyBpbnB1dCB2YWx1ZVxuZnVuY3Rpb24gcmFuZG9tTnVtYmVyR2VuZXJhdG9yKHJhbmdlU3RyKSB7XG4gICAgdmFyIHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE51bWJlcihyYW5nZVN0cikpO1xuICAgIGlmIChpc05hTihyYW5kb21OdW1iZXIpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHJhbmRvbU51bWJlcikpO1xufVxuZXhwb3J0cy5yYW5kb21OdW1iZXJHZW5lcmF0b3IgPSByYW5kb21OdW1iZXJHZW5lcmF0b3I7XG4vL2NhbCBmbG9vck4gZnJvbSBpbnB1dFxuZnVuY3Rpb24gZmxvb3JOdW1iZXJDYWwoaW5wdXRTdHIpIHtcbiAgICB2YXIgbmV3Um91bmRPZk51bWJlciA9IE1hdGguZmxvb3IoTnVtYmVyKGlucHV0U3RyKSk7XG4gICAgaWYgKGlzTmFOKG5ld1JvdW5kT2ZOdW1iZXIpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKG5ld1JvdW5kT2ZOdW1iZXIpKTtcbn1cbmV4cG9ydHMuZmxvb3JOdW1iZXJDYWwgPSBmbG9vck51bWJlckNhbDtcbi8vY2FsIGNlbGlOIGZyb20gaW5wdXRcbmZ1bmN0aW9uIGNlbGlOdW1iZXJDYWwoaW5wdXRTdHIpIHtcbiAgICB2YXIgbmV3Q2VsaU51bWJlciA9IE1hdGguY2VpbChOdW1iZXIoaW5wdXRTdHIpKTtcbiAgICBpZiAoaXNOYU4obmV3Q2VsaU51bWJlcikpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0Q2hhckF0SW5wdXRGaWVsZChTdHJpbmcobmV3Q2VsaU51bWJlcikpO1xufVxuZXhwb3J0cy5jZWxpTnVtYmVyQ2FsID0gY2VsaU51bWJlckNhbDtcbi8vYXBwZW5kIHRoZSBzdHJpbmcgYXQgc3RhcnRcbmZ1bmN0aW9uIHN0cmluZ1ByZUFkZGVyKGlucHV0U3RyLCBhZGRTdHJpbmcpIHtcbiAgICBpbnB1dFN0ciA9IGFkZFN0cmluZyArIGlucHV0U3RyO1xuICAgIHNldENoYXJBdElucHV0RmllbGQoaW5wdXRTdHIpO1xufVxuZXhwb3J0cy5zdHJpbmdQcmVBZGRlciA9IHN0cmluZ1ByZUFkZGVyO1xuLy89PT0gc3RvcmVkIG1lbW9yeSBjYWwgZm4gPT09XG5mdW5jdGlvbiBhZGRUaGVWYWx1ZVRvTWVtb3J5KCkge1xuICAgIHZhciB2YWx1ZUZyb21Mb2NhbCA9IGdldFZhbHVlRnJvbUxvY2FsKFwiY2FsU3RyaW5nXCIpO1xuICAgIHZhciBzdG9yZWROdW0gPSBnZXRWYWx1ZUZyb21Mb2NhbChcInN0b3JlZE51bVwiKTtcbiAgICB2YXIgdmFsdWUgPSBOdW1iZXIodmFsdWVGcm9tTG9jYWwpICsgTnVtYmVyKHN0b3JlZE51bSk7XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJJbnZhbGlkIElucHV0IVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRWYWx1ZUluTG9jYWwoXCJzdG9yZWROdW1cIiwgU3RyaW5nKHZhbHVlKSk7XG59XG5leHBvcnRzLmFkZFRoZVZhbHVlVG9NZW1vcnkgPSBhZGRUaGVWYWx1ZVRvTWVtb3J5O1xuLy9taW51cyB0aGUgdmFsdWUgZnJvbSB0aGUgc3RvcmVkXG5mdW5jdGlvbiByZW1vdmVUaGVWYWx1ZUZyb21NZW1vcnkoKSB7XG4gICAgdmFyIHZhbEZyb21Mb2NhbCA9IGdldFZhbHVlRnJvbUxvY2FsKFwiY2FsU3RyaW5nXCIpO1xuICAgIHZhciBzdG9yZWROdW0gPSBnZXRWYWx1ZUZyb21Mb2NhbChcInN0b3JlZE51bVwiKTtcbiAgICB2YXIgdmFsdWUgPSBOdW1iZXIoc3RvcmVkTnVtKSAtIE51bWJlcih2YWxGcm9tTG9jYWwpO1xuICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKFwiSW52YWxpZCBJbnB1dCFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0VmFsdWVJbkxvY2FsKFwic3RvcmVkTnVtXCIsIFN0cmluZyh2YWx1ZSkpO1xufVxuZXhwb3J0cy5yZW1vdmVUaGVWYWx1ZUZyb21NZW1vcnkgPSByZW1vdmVUaGVWYWx1ZUZyb21NZW1vcnk7XG4vL3Nob3cgdGhlIG91dHB1dCBvZiBjYWwgKHN0b3JlZCBudW0pXG5mdW5jdGlvbiByZWNhbGxUaGVWYWx1ZUZyb21NZW1vcnkoKSB7XG4gICAgdmFyIHZhbEZyb21Mb2NhbCA9IGdldFZhbHVlRnJvbUxvY2FsKFwic3RvcmVkTnVtXCIpO1xuICAgIHNldENoYXJBdElucHV0RmllbGQodmFsRnJvbUxvY2FsKTtcbn1cbmV4cG9ydHMucmVjYWxsVGhlVmFsdWVGcm9tTWVtb3J5ID0gcmVjYWxsVGhlVmFsdWVGcm9tTWVtb3J5O1xuLy9lcnJvciBoYW5kbGluZyBmdW5jdGlvblxuZnVuY3Rpb24gc2hvd0VyckZvclNvbWVUaW1lKGlucHV0RXJyU3RyKSB7XG4gICAgaWYgKGlucHV0RXJyU3RyID09PSB2b2lkIDApIHsgaW5wdXRFcnJTdHIgPSBcIkludmFsaWQgSW5wdXQgIVwiOyB9XG4gICAgdmFyIGVycm9yRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvci1kaXZcIik7XG4gICAgaWYgKGVycm9yRGl2ID09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGVycm9yRGl2LmlubmVySFRNTCA9IGlucHV0RXJyU3RyO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBlcnJvckRpdi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH0sIDUwMDApO1xufVxuLy8gPT09IGRyYXdlciBhbmQgcmVsYXRlZCB0byB0aGF0IGZucyA9PT1cbi8vZGVib3VuY2UgcG9seWZpbGxcbmZ1bmN0aW9uIG15RGVib3VuY2UoY2IsIGQpIHtcbiAgICB2YXIgdGltZXI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZXIpXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2IuYXBwbHkodm9pZCAwLCBhcmdzKTtcbiAgICAgICAgfSwgZCk7XG4gICAgfTtcbn1cbmV4cG9ydHMuZHluYW1pY1N0eWxlRHJhd2VyV2l0aERlYm91bmNlID0gbXlEZWJvdW5jZShmdW5jdGlvbiAoZHJhd2VyQ29udGVudCwgcmVjdCkge1xuICAgIGR5bmFtaWNTdHlsZURyYXdlcihkcmF3ZXJDb250ZW50LCByZWN0KTtcbn0sIDEwMDApO1xuZnVuY3Rpb24gZHluYW1pY1N0eWxlRHJhd2VyKGRyYXdlckNvbnRlbnQsIHJlY3QpIHtcbiAgICBpZiAoZHJhd2VyQ29udGVudCA9PSB1bmRlZmluZWQgfHwgcmVjdCA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBkcmF3ZXJDb250ZW50LnN0eWxlLmJvdHRvbSA9IFwiY2FsYygxMDAlIC0gXCIuY29uY2F0KHJlY3QuYm90dG9tLCBcInB4KVwiKTtcbiAgICBkcmF3ZXJDb250ZW50LnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KHJlY3QuaGVpZ2h0ICogMC42NSwgXCJweFwiKTtcbiAgICBkcmF3ZXJDb250ZW50LnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQocmVjdC53aWR0aCwgXCJweFwiKTtcbn1cbmV4cG9ydHMuZHluYW1pY1N0eWxlRHJhd2VyID0gZHluYW1pY1N0eWxlRHJhd2VyO1xuZnVuY3Rpb24gZHJhd2VyU2hvdyhkcmF3ZXJDb250ZW50KSB7XG4gICAgaWYgKGRyYXdlckNvbnRlbnQgPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgZHJhd2VyQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbn1cbmV4cG9ydHMuZHJhd2VyU2hvdyA9IGRyYXdlclNob3c7XG5mdW5jdGlvbiBkcmF3ZXJDbG9zZShkcmF3ZXJDb250ZW50KSB7XG4gICAgaWYgKGRyYXdlckNvbnRlbnQgPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgZHJhd2VyQ29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5leHBvcnRzLmRyYXdlckNsb3NlID0gZHJhd2VyQ2xvc2U7XG4vL3Nob3cgdGhlIHN0b3JlZCBudW1zIHdpdGggY2hpbGQgYXBwZW5kXG5mdW5jdGlvbiBzaG93U3RvcmVkTnVtYmVycygpIHtcbiAgICB2YXIgX2E7XG4gICAgdmFyIGFycmF5T2ZOdW1iZXJzID0gKF9hID0gZ2V0VmFsdWVGcm9tTG9jYWwoXCJzdG9yZWROdW1zXCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3BsaXQoXCIsXCIpO1xuICAgIHZhciBlcnJNc2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtcHR5LW1zZ1wiKTtcbiAgICB2YXIgZmxhZ0Zvck1zZyA9IGZhbHNlO1xuICAgIGlmIChhcnJheU9mTnVtYmVyc1swXSA9PSBcIlwiKVxuICAgICAgICBmbGFnRm9yTXNnID0gdHJ1ZTtcbiAgICBpZiAoZXJyTXNnICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBmbGFnRm9yTXNnXG4gICAgICAgICAgICA/IChlcnJNc2cuaW5uZXJUZXh0ID0gXCJUaGVyZSdzIGlzIG5vdGhpbmcgc2F2ZWQgaW4geW91ciBtZW1vcnlcIilcbiAgICAgICAgICAgIDogKGVyck1zZy5pbm5lclRleHQgPSBcIlwiKTtcbiAgICB9XG4gICAgdmFyIHN0b3JlZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FsRGl2X19udW1zRGl2XCIpO1xuICAgIGlmIChzdG9yZWREaXYgPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHN0b3JlZERpdi5maXJzdENoaWxkKSB7XG4gICAgICAgIHN0b3JlZERpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfVxuICAgIHZhciBjaGlsZCA9IGFycmF5T2ZOdW1iZXJzID09PSBudWxsIHx8IGFycmF5T2ZOdW1iZXJzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhcnJheU9mTnVtYmVycy5tYXAoZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICByZXR1cm4gXCI8cCBjbGFzcz1cXFwibWUtMyBoNVxcXCIgPiBcIi5jb25jYXQobnVtYmVyLCBcIiA8L3A+XCIpO1xuICAgIH0pO1xuICAgIGlmIChjaGlsZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBjaGlsZF8xID0gY2hpbGQ7IF9pIDwgY2hpbGRfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBpID0gY2hpbGRfMVtfaV07XG4gICAgICAgICAgICBzdG9yZWREaXYuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5zaG93U3RvcmVkTnVtYmVycyA9IHNob3dTdG9yZWROdW1iZXJzO1xuLy9yZW1vdmUgbnVtYmVyIGZyb20gdGhlIHVpIGFuZCBtZW1vcnlcbmZ1bmN0aW9uIHJlbW92ZU51bWJlcnMoKSB7XG4gICAgdmFyIHN0b3JlZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FsRGl2X19udW1zRGl2XCIpO1xuICAgIHZhciBlcnJNc2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtcHR5LW1zZ1wiKTtcbiAgICBpZiAoZXJyTXNnID09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChzdG9yZWREaXYgPT09IG51bGwgfHwgc3RvcmVkRGl2ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdG9yZWREaXYuZmlyc3RDaGlsZCkge1xuICAgICAgICBzdG9yZWREaXYudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH1cbiAgICBlcnJNc2cuaW5uZXJUZXh0ID0gXCJUaGVyZSdzIGlzIG5vdGhpbmcgc2F2ZWQgaW4geW91ciBtZW1vcnlcIjtcbiAgICBzZXRWYWx1ZUluTG9jYWwoXCJzdG9yZWROdW1zXCIsIFwiXCIpO1xufVxuZXhwb3J0cy5yZW1vdmVOdW1iZXJzID0gcmVtb3ZlTnVtYmVycztcbi8vPT0gY2hhbmdlIGluIGJ0biBVSSBmdW5jdGlvbnMgPT0vL1xuLy9mbiB0aGF0IGNoYW5nZXMgY29sb3JcbmZ1bmN0aW9uIGNoYW5nZUJ1dHRvbkNvbG9yKGJ0bikge1xuICAgIGlmIChidG4gPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKGJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FsRGl2X19idG4tLWJsdWVcIik7XG4gICAgfVxufVxuZXhwb3J0cy5jaGFuZ2VCdXR0b25Db2xvciA9IGNoYW5nZUJ1dHRvbkNvbG9yO1xuLy9mbiB0aGF0IHNob3cgc2Vjb25kIGJ0biB0aGF0IGFyZSBoaWRkZW4gb24gY2xpY2sgZXZlbnRcbmZ1bmN0aW9uIHNlY29uZEJ0blNob3coYWxsQnRuRm9yVG9nZ2xlLCBjbGFzc09uZSwgY2xhc3NUd28pIHtcbiAgICBpZiAoY2xhc3NPbmUgPT09IHZvaWQgMCkgeyBjbGFzc09uZSA9IFwiZC1pbmxpbmVcIjsgfVxuICAgIGlmIChjbGFzc1R3byA9PT0gdm9pZCAwKSB7IGNsYXNzVHdvID0gXCJkLW5vbmVcIjsgfVxuICAgIEFycmF5LmZyb20oYWxsQnRuRm9yVG9nZ2xlKS5tYXAoZnVuY3Rpb24gKHZpc2libGVCdG4pIHtcbiAgICAgICAgLy92aXNpYmxlQnRuID09PiBlbGVtZW50IGZyb20gRE9NVG9rZW5MaXN0XG4gICAgICAgIGlmICh2aXNpYmxlQnRuLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc09uZSkpIHtcbiAgICAgICAgICAgIHZpc2libGVCdG4uY2xhc3NMaXN0LnRvZ2dsZShjbGFzc1R3byk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2aXNpYmxlQnRuLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NUd28pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLnNlY29uZEJ0blNob3cgPSBzZWNvbmRCdG5TaG93O1xuLy91bml0IGNoYW5naW5nIGluIHRoZSBjYWwgd2l0aCBjbGlja3MgbG9naWNcbmZ1bmN0aW9uIGNoYW5nZUluVW5pdE9mQW5nbGUoKSB7XG4gICAgaWYgKHVuaXRPZkFuZ2xlID09PSBcIkRFR1wiKSB7XG4gICAgICAgIHVuaXRPZkFuZ2xlID0gXCJSQURcIjtcbiAgICAgICAgY2hhbmdlVGhlVW5pdEluSHRtbChcIlJBRFwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodW5pdE9mQW5nbGUgPT09IFwiUkFEXCIpIHtcbiAgICAgICAgdW5pdE9mQW5nbGUgPSBcIkdSQURcIjtcbiAgICAgICAgY2hhbmdlVGhlVW5pdEluSHRtbChcIkdSQURcIik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHVuaXRPZkFuZ2xlID09PSBcIkdSQURcIikge1xuICAgICAgICB1bml0T2ZBbmdsZSA9IFwiREVHXCI7XG4gICAgICAgIGNoYW5nZVRoZVVuaXRJbkh0bWwoXCJERUdcIik7XG4gICAgfVxufVxuZXhwb3J0cy5jaGFuZ2VJblVuaXRPZkFuZ2xlID0gY2hhbmdlSW5Vbml0T2ZBbmdsZTtcbi8vYmFzZWQgb24gdGhlIHN0cmluZyBjaGFuZ2luZyBodG1sIHZhbHVlXG5mdW5jdGlvbiBjaGFuZ2VUaGVVbml0SW5IdG1sKHVuaXRTdHIpIHtcbiAgICB2YXIgdW5pdE9mQW5nbGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVuaXQtb2YtYW5nbGVcIik7XG4gICAgaWYgKHVuaXRPZkFuZ2xlQnRuID09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHVuaXRPZkFuZ2xlQnRuLmlubmVySFRNTCA9IHVuaXRTdHI7XG59XG5mdW5jdGlvbiB0b0V4cG9uZW50aWFsQ29udmVydCgpIHtcbiAgICB2YXIgdmFsRnJvbUxvY2FsID0gZ2V0VmFsdWVGcm9tTG9jYWwoXCJjYWxTdHJpbmdcIik7XG4gICAgdmFyIGV4cG9OdW0gPSBOdW1iZXIucGFyc2VGbG9hdCh2YWxGcm9tTG9jYWwpLnRvRXhwb25lbnRpYWwoKTtcbiAgICBpZiAoaXNOYU4oTnVtYmVyKGV4cG9OdW0pKSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJJbnZhbGlkIElucHV0IVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKGV4cG9OdW0pO1xufVxuZXhwb3J0cy50b0V4cG9uZW50aWFsQ29udmVydCA9IHRvRXhwb25lbnRpYWxDb252ZXJ0O1xuLy9jaGFuZ2UgdGhlIHZhbHVlIHBsdXMgdG8gbWludXMgb3IgbWludXMgdG8gcGx1c1xuZnVuY3Rpb24gY2hhbmdlVGhlVmFsdWUoKSB7XG4gICAgdmFyIHZhbHVlRnJvbUxvY2FsID0gZ2V0VmFsdWVGcm9tTG9jYWwoXCJjYWxTdHJpbmdcIik7XG4gICAgaWYgKHZhbHVlRnJvbUxvY2FsLmNoYXJBdCgwKSA9PT0gXCItXCIpIHtcbiAgICAgICAgdmFsdWVGcm9tTG9jYWwgPSB2YWx1ZUZyb21Mb2NhbC5zdWJzdHJpbmcoMSwgdmFsdWVGcm9tTG9jYWwubGVuZ3RoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhbHVlRnJvbUxvY2FsID0gXCItXCIgKyB2YWx1ZUZyb21Mb2NhbDtcbiAgICB9XG4gICAgc2V0Q2hhckF0SW5wdXRGaWVsZCh2YWx1ZUZyb21Mb2NhbCk7XG59XG5leHBvcnRzLmNoYW5nZVRoZVZhbHVlID0gY2hhbmdlVGhlVmFsdWU7XG4vL2RlZ3JlZSB0byBkbXNcbmZ1bmN0aW9uIGRlZ1RvRG1zKCkge1xuICAgIHZhciB2YWx1ZUZyb21Mb2NhbCA9IGdldFZhbHVlRnJvbUxvY2FsKFwiY2FsU3RyaW5nXCIpO1xuICAgIHZhciBkZWcgPSBOdW1iZXIodmFsdWVGcm9tTG9jYWwpO1xuICAgIGlmICh1bml0T2ZBbmdsZSA9PT0gXCJERUdcIiB8fCBpc05hTihOdW1iZXIoZGVnKSkpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKFwiUGxlYXNlIGVudGVyIHRoZSBpbnB1dCBpbiBERUcgd2l0aCBudW1iZXJzIVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZCA9IE1hdGguZmxvb3IoZGVnKTtcbiAgICB2YXIgbWluZmxvYXQgPSAoZGVnIC0gZCkgKiA2MDtcbiAgICB2YXIgbSA9IE1hdGguZmxvb3IobWluZmxvYXQpO1xuICAgIHZhciBzZWNmbG9hdCA9IChtaW5mbG9hdCAtIG0pICogNjA7XG4gICAgdmFyIHMgPSBNYXRoLnJvdW5kKHNlY2Zsb2F0KTtcbiAgICAvLyBBZnRlciByb3VuZGluZywgdGhlIHNlY29uZHMgbWlnaHQgYmVjb21lIDYwLlxuICAgIGlmIChzID09PSA2MCkge1xuICAgICAgICBtKys7XG4gICAgICAgIHMgPSAwO1xuICAgIH1cbiAgICBpZiAobSA9PT0gNjApIHtcbiAgICAgICAgZCsrO1xuICAgICAgICBtID0gMDtcbiAgICB9XG4gICAgdmFyIG91dHB1dCA9IFwiXCIgKyBkICsgXCI6XCIgKyBtICsgXCI6XCIgKyBzO1xuICAgIHNldENoYXJBdElucHV0RmllbGQob3V0cHV0KTtcbn1cbmV4cG9ydHMuZGVnVG9EbXMgPSBkZWdUb0Rtcztcbi8vcmFkaWFuLCBncmFkZSB0byBkZWdcbmZ1bmN0aW9uIGlucHV0VG9EZWcoKSB7XG4gICAgdmFyIHN0cmluZ0Zyb21Mb2NhbCA9IGdldFZhbHVlRnJvbUxvY2FsKFwiY2FsU3RyaW5nXCIpO1xuICAgIHZhciB2YWx1ZUZyb21Mb2NhbCA9IE51bWJlcihzdHJpbmdGcm9tTG9jYWwpO1xuICAgIGlmICh1bml0T2ZBbmdsZSA9PT0gXCJERUdcIikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKHVuaXRPZkFuZ2xlID09PSBcIlJBRFwiKSB7XG4gICAgICAgIHZhbHVlRnJvbUxvY2FsID0gdmFsdWVGcm9tTG9jYWwgKiAoMTgwIC8gTWF0aC5QSSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHVuaXRPZkFuZ2xlID09PSBcIkdSQURcIikge1xuICAgICAgICB2YWx1ZUZyb21Mb2NhbCA9IHZhbHVlRnJvbUxvY2FsIC8gMC4wMTU3O1xuICAgIH1cbiAgICBpZiAoaXNOYU4odmFsdWVGcm9tTG9jYWwpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZShcIlBsZWFzZSBlbnRlciBOdW1iZXJzIVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKFN0cmluZyh2YWx1ZUZyb21Mb2NhbCkpO1xufVxuZXhwb3J0cy5pbnB1dFRvRGVnID0gaW5wdXRUb0RlZztcbi8vb3BlcmF0aW9uIGlzIFRyaWdvbm8gb3Igbm90XG5mdW5jdGlvbiBpc1RyaWdvbm9DYWwoY2xpY2tlZEl0ZW0pIHtcbiAgICB0cmlnb25vT3BlcmF0aW9ucy5pbmNsdWRlcyhjbGlja2VkSXRlbSlcbiAgICAgICAgPyB0cmlnb25vT3BlcmF0aW9uSGFuZGxlcihjbGlja2VkSXRlbSlcbiAgICAgICAgOiBcIlwiO1xufVxuZXhwb3J0cy5pc1RyaWdvbm9DYWwgPSBpc1RyaWdvbm9DYWw7XG4vL3RvIGhhbmRsZSBhbGwgdGhlIHRyaWdvbm9tZXRyeSBvcGVyYXRpb25zXG5mdW5jdGlvbiB0cmlnb25vT3BlcmF0aW9uSGFuZGxlcihjbGlja2VkSXRlbSkge1xuICAgIHZhciBzdHJpbmdGcm9tTG9jYWwgPSBnZXRWYWx1ZUZyb21Mb2NhbChcImNhbFN0cmluZ1wiKTtcbiAgICB2YXIgdmFsdWUgPSBOdW1iZXIoc3RyaW5nRnJvbUxvY2FsKTtcbiAgICBpZiAodW5pdE9mQW5nbGUgPT09IFwiREVHXCIpIHtcbiAgICAgICAgLy9jb252ZXJ0aW5nIGRlZ3JlZSB0byByYWRpYW5cbiAgICAgICAgdmFsdWUgPSB2YWx1ZSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodW5pdE9mQW5nbGUgPT09IFwiR1JBRFwiKSB7XG4gICAgICAgIC8vMSBHcmFkaWFucyB0byBSYWRpYW5zID0gMC4wMTU3XG4gICAgICAgIHZhbHVlID0gdmFsdWUgKiAwLjAxNTc7XG4gICAgfVxuICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNsaWNrZWRJdGVtLmluY2x1ZGVzKFwic2luXCIpKSB7XG4gICAgICAgIHNpblRyaWdvbm9PcGVyYXRpb25zKGNsaWNrZWRJdGVtLCB2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNsaWNrZWRJdGVtLmluY2x1ZGVzKFwiY29zXCIpKSB7XG4gICAgICAgIGNvc1RyaWdvbm9PcGVyYXRpb25zKGNsaWNrZWRJdGVtLCB2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNsaWNrZWRJdGVtLmluY2x1ZGVzKFwidGFuXCIpKSB7XG4gICAgICAgIHRhblRyaWdvbm9PcGVyYXRpb25zKGNsaWNrZWRJdGVtLCB2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNsaWNrZWRJdGVtLmluY2x1ZGVzKFwiY3NjXCIpKSB7XG4gICAgICAgIGNzY1RyaWdvbm9PcGVyYXRpb25zKGNsaWNrZWRJdGVtLCB2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNsaWNrZWRJdGVtLmluY2x1ZGVzKFwic2VjXCIpKSB7XG4gICAgICAgIHNlY1RyaWdvbm9PcGVyYXRpb25zKGNsaWNrZWRJdGVtLCB2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNsaWNrZWRJdGVtLmluY2x1ZGVzKFwiY290XCIpKSB7XG4gICAgICAgIGNvdFRyaWdvbm9PcGVyYXRpb25zKGNsaWNrZWRJdGVtLCB2YWx1ZSk7XG4gICAgfVxufVxuLy90byBoYW5kbGUgYWxsIHRoZSBzaW4gb3BlcmF0aW9uc1xuZnVuY3Rpb24gc2luVHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKSB7XG4gICAgc3dpdGNoIChjbGlja2VkSXRlbSkge1xuICAgICAgICBjYXNlIFwic2luXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IE1hdGguc2luKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2luLWluXCI6XG4gICAgICAgICAgICBpZiAodmFsdWUgPD0gMSAmJiB2YWx1ZSA+PSAtMSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5hc2luKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKFN0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKFwiUGxlYXNlIGVudGVyIHRoZSBpbnB1dCBmcm9tIC0xIHRvIDEgKFJBRClcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIFwic2luLWhcIjpcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC5zaW5oKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2luLWgtaW5cIjpcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC5hc2luaCh2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKFN0cmluZyh2YWx1ZSkpO1xufVxuLy90byBoYW5kbGUgYWxsIHRoZSBjb3Mgb3BlcmF0aW9uc1xuZnVuY3Rpb24gY29zVHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKSB7XG4gICAgc3dpdGNoIChjbGlja2VkSXRlbSkge1xuICAgICAgICBjYXNlIFwiY29zXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IE1hdGguY29zKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY29zLWluXCI6XG4gICAgICAgICAgICBpZiAodmFsdWUgPD0gMSAmJiB2YWx1ZSA+PSAtMSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5hY29zKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKFN0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKFwiUGxlYXNlIGVudGVyIHRoZSBpbnB1dCBmcm9tIC0xIHRvIDEgKFJBRClcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjb3MtaFwiOlxuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmNvc2godmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjb3MtaC1pblwiOlxuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmFjb3NoKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG59XG4vL3RvIGhhbmRsZSBhbGwgdGhlIHRhbiBvcGVyYXRpb25zXG5mdW5jdGlvbiB0YW5Ucmlnb25vT3BlcmF0aW9ucyhjbGlja2VkSXRlbSwgdmFsdWUpIHtcbiAgICBzd2l0Y2ggKGNsaWNrZWRJdGVtKSB7XG4gICAgICAgIGNhc2UgXCJ0YW5cIjpcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC50YW4odmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0YW4taW5cIjpcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC5hdGFuKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGFuLWhcIjpcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC50YW5oKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGFuLWgtaW5cIjpcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8PSAxICYmIHZhbHVlID49IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmF0YW5oKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dFcnJGb3JTb21lVGltZShcIlBsZWFzZSBlbnRlciB0aGUgaW5wdXQgZnJvbSAtMSB0byAxIChSQUQpXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG59XG4vL3RvIGhhbmRsZSBhbGwgdGhlIGNvc2VjIG9wZXJhdGlvblxuZnVuY3Rpb24gY3NjVHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKSB7XG4gICAgc3dpdGNoIChjbGlja2VkSXRlbSkge1xuICAgICAgICBjYXNlIFwiY3NjXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLnNpbih2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNzYy1pblwiOlxuICAgICAgICAgICAgaWYgKHZhbHVlIDw9IDEgJiYgdmFsdWUgPj0gLTEpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLmFzaW4odmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJQbGVhc2UgZW50ZXIgdGhlIGlucHV0IGZyb20gLTEgdG8gMSAoUkFEKVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNzYy1oXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLnNpbmgodmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjc2MtaC1pblwiOlxuICAgICAgICAgICAgdmFsdWUgPSAxIC8gTWF0aC5hc2luaCh2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKFN0cmluZyh2YWx1ZSkpO1xufVxuLy90byBoYW5kbGUgYWxsIHRoZSBzZWMgb3BlcmF0aW9uc1xuZnVuY3Rpb24gc2VjVHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKSB7XG4gICAgc3dpdGNoIChjbGlja2VkSXRlbSkge1xuICAgICAgICBjYXNlIFwic2VjXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLmNvcyh2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlYy1pblwiOlxuICAgICAgICAgICAgaWYgKHZhbHVlIDw9IDEgJiYgdmFsdWUgPj0gLTEpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLmFjb3ModmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJQbGVhc2UgZW50ZXIgdGhlIGlucHV0IGZyb20gLTEgdG8gMSAoUkFEKVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlYy1oXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLmNvc2godmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzZWMtaC1pblwiOlxuICAgICAgICAgICAgdmFsdWUgPSAxIC8gTWF0aC5hY29zaCh2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKFN0cmluZyh2YWx1ZSkpO1xufVxuLy90byBoYW5kbGUgYWxsIHRoZSBjb3Qgb3BlcmF0aW9uc1xuZnVuY3Rpb24gY290VHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKSB7XG4gICAgc3dpdGNoIChjbGlja2VkSXRlbSkge1xuICAgICAgICBjYXNlIFwiY290XCI6XG4gICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLnRhbih2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNvdC1pblwiOlxuICAgICAgICAgICAgdmFsdWUgPSAxIC8gTWF0aC5hdGFuKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY290LWhcIjpcbiAgICAgICAgICAgIHZhbHVlID0gMSAvIE1hdGgudGFuaCh2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNvdC1oLWluXCI6XG4gICAgICAgICAgICBpZiAodmFsdWUgPD0gMSAmJiB2YWx1ZSA+PSAtMSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gMSAvIE1hdGguYXRhbmgodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKFwiUGxlYXNlIGVudGVyIHRoZSBpbnB1dCBmcm9tIC0xIHRvIDEgKFJBRClcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0Q2hhckF0SW5wdXRGaWVsZChTdHJpbmcodmFsdWUpKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBmdW5jdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2Z1bmN0aW9uc1wiKTtcbnZhciBmbGFnRm9yVG9nZ2xlQnRuID0gZmFsc2U7XG52YXIgZmxhZ0Zvckh5cEJ0biA9IGZhbHNlO1xudmFyIG1lbW9yeVN0b3JlVmFsdWVzID0gW107XG52YXIgbWFpbkRpdk9mQ2FsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYWxjdWxhdG9yLWRpdlwiKTtcbnZhciByZWN0ID0gbWFpbkRpdk9mQ2FsID09PSBudWxsIHx8IG1haW5EaXZPZkNhbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWFpbkRpdk9mQ2FsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xudmFyIGRyYXdlckNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhbERpdl9kcmF3ZXJcIik7XG4vL3RvIGFkanVzdCB0aGUgZHJhd2VyIHBvc2l0aW9uLCBpZiByZXNpemUgd2luZG93XG5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZWN0ID0gbWFpbkRpdk9mQ2FsID09PSBudWxsIHx8IG1haW5EaXZPZkNhbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbWFpbkRpdk9mQ2FsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICgwLCBmdW5jdGlvbnNfMS5keW5hbWljU3R5bGVEcmF3ZXJXaXRoRGVib3VuY2UpKGRyYXdlckNvbnRlbnQsIHJlY3QpO1xufSk7XG52YXIgbVJlY2FsbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibS1yZWNhbGxcIik7XG52YXIgbUNsZWFyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtLWNsZWFyXCIpO1xuLy9lbmFibGUgb3IgZGlzYWJsZSB0aGUgYnRuXG4oMCwgZnVuY3Rpb25zXzEuYnV0dG9uVmlzaWJpbGl0eUhhbmRsZXIpKG1SZWNhbGxCdG4sIG1DbGVhckJ0bik7XG4vL2ZhY3RvcmlhbCBtZXRob2Qgb24gTnVtYmVyXG5OdW1iZXIucHJvdG90eXBlLmZhY3RvcmlhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcyA+IDAgPyB0aGlzICogKHRoaXMgLSAxKS5mYWN0b3JpYWwodGhpcykgOiAxOyAvL2ZhY3RvcmlhbCBsb2dpY1xufTtcbi8vc2V0IGluaXRpYWwgdmFsdWUgaW4gdGhlIGlucHV0IGZpZWxkIGVtcHR5IG9yIGV4aXN0aW5nXG5pZiAoZnVuY3Rpb25zXzEuaW5wdXRGaWVsZCAhPSB1bmRlZmluZWQpIHtcbiAgICBmdW5jdGlvbnNfMS5pbnB1dEZpZWxkLnZhbHVlID0gKDAsIGZ1bmN0aW9uc18xLmdldFZhbHVlRnJvbUxvY2FsKShcImNhbFN0cmluZ1wiKTtcbn1cbi8vb25seSBvbmUgbWFpbiBldmVudCBsaXN0ZW5lciBmb3IgYWxsIHRoZSBidG4gKGV2ZW50IGRlbGVnYXRpb24pXG5tYWluRGl2T2ZDYWwgPT09IG51bGwgfHwgbWFpbkRpdk9mQ2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtYWluRGl2T2ZDYWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIF9hO1xuICAgIC8vY3VycmVudFRhcmdldCAtLT4gZWxlbWVudCB0aGF0IHRoZSBsaXN0ZW5lciB3YXMgYm91bmQgdG8uXG4gICAgLy90YXJnZXQgLS0+IG9uIHdlIGRvIGFjdHVhbGx5IGNsaWNrXG4gICAgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQpXG4gICAgICAgIHJldHVybjtcbiAgICAvL2dldHRpbmcgc3RvcmVkIHZhbHVlc1xuICAgIHZhciBzdHJpbmdGcm9tTG9jYWxTdG9yYWdlID0gKDAsIGZ1bmN0aW9uc18xLmdldFZhbHVlRnJvbUxvY2FsKShcImNhbFN0cmluZ1wiKTtcbiAgICB2YXIgc3RvcmVkTnVtYmVyT3V0cHV0ID0gKDAsIGZ1bmN0aW9uc18xLmdldFZhbHVlRnJvbUxvY2FsKShcInN0b3JlZE51bVwiKTtcbiAgICBpZiAoc3RvcmVkTnVtYmVyT3V0cHV0ID09PSBcIlwiKVxuICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc2V0VmFsdWVJbkxvY2FsKShcInN0b3JlZE51bVwiLCBcIjBcIik7XG4gICAgLy9nZXR0aW5nIHRoZSBpZCBvZiBjbGlja2VkIGVsZVxuICAgIHZhciBjbGlja2VkSXRlbSA9IChfYSA9IGUudGFyZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQ7XG4gICAgaWYgKGNsaWNrZWRJdGVtID09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHN3aXRjaCAoY2xpY2tlZEl0ZW0pIHtcbiAgICAgICAgY2FzZSAoMCwgZnVuY3Rpb25zXzEuaXNPcGVyYXRpb25QcmVzZW50KShjbGlja2VkSXRlbSk6XG4gICAgICAgICAgICBpZiAoY2xpY2tlZEl0ZW0gPT09IFwibG9nMVwiIHx8IGNsaWNrZWRJdGVtID09PSBcImxvZzJcIikge1xuICAgICAgICAgICAgICAgIGNsaWNrZWRJdGVtID0gXCJsb2dcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5zaW1wbGVDYWxjdWxhdGlvbikoY2xpY2tlZEl0ZW0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtLXBsdXNcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5hZGRUaGVWYWx1ZVRvTWVtb3J5KSgpO1xuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmJ1dHRvblZpc2liaWxpdHlIYW5kbGVyKShtUmVjYWxsQnRuLCBtQ2xlYXJCdG4pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtLW1pbnVzXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEucmVtb3ZlVGhlVmFsdWVGcm9tTWVtb3J5KSgpO1xuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmJ1dHRvblZpc2liaWxpdHlIYW5kbGVyKShtUmVjYWxsQnRuLCBtQ2xlYXJCdG4pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtLWNsZWFyXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc2V0VmFsdWVJbkxvY2FsKShcInN0b3JlZE51bVwiLCBTdHJpbmcoMCkpO1xuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnNldFZhbHVlSW5Mb2NhbCkoXCJzdG9yZWROdW1zXCIsIFwiXCIpO1xuICAgICAgICAgICAgbWVtb3J5U3RvcmVWYWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5idXR0b25WaXNpYmlsaXR5SGFuZGxlcikobVJlY2FsbEJ0biwgbUNsZWFyQnRuKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibS1yZWNhbGxcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5yZWNhbGxUaGVWYWx1ZUZyb21NZW1vcnkpKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm0tc3RvcmVcIjpcbiAgICAgICAgICAgIG1lbW9yeVN0b3JlVmFsdWVzLnB1c2goKDAsIGZ1bmN0aW9uc18xLmdldFZhbHVlRnJvbUxvY2FsKShcImNhbFN0cmluZ1wiKSk7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc2V0VmFsdWVJbkxvY2FsKShcInN0b3JlZE51bXNcIiwgU3RyaW5nKG1lbW9yeVN0b3JlVmFsdWVzKSk7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuYnV0dG9uVmlzaWJpbGl0eUhhbmRsZXIpKG1SZWNhbGxCdG4sIG1DbGVhckJ0bik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm0tc2hvd1wiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmR5bmFtaWNTdHlsZURyYXdlcikoZHJhd2VyQ29udGVudCwgcmVjdCk7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuZHJhd2VyU2hvdykoZHJhd2VyQ29udGVudCk7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc2hvd1N0b3JlZE51bWJlcnMpKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRyYXdlci1jbG9zZVwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmRyYXdlckNsb3NlKShkcmF3ZXJDb250ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVtb3ZlLW51bXNcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5yZW1vdmVOdW1iZXJzKSgpO1xuICAgICAgICAgICAgbWVtb3J5U3RvcmVWYWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5idXR0b25WaXNpYmlsaXR5SGFuZGxlcikobVJlY2FsbEJ0biwgbUNsZWFyQnRuKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiPVwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmNhbGN1bGF0aW9uT2ZTaW1wbGVDYWwpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmUtY2hhclwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnJlbW92ZUNoYXJGcm9tQ2FsKShzdHJpbmdGcm9tTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVzZXQtY2hhclwiOlxuICAgICAgICAgICAgc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSA9IFwiMFwiO1xuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnNldENoYXJBdElucHV0RmllbGQpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIxMHNxXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEucG93ZXJBbmRSb290Q2FsKShcIjEwXCIsIFwiMVwiLCBzdHJpbmdGcm9tTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3FydFwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnBvd2VyQW5kUm9vdENhbCkoc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSwgXCIyXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjYnJ0XCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEucG93ZXJBbmRSb290Q2FsKShzdHJpbmdGcm9tTG9jYWxTdG9yYWdlLCBcIjNcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIjEveFwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnN0cmluZ1ByZUFkZGVyKShzdHJpbmdGcm9tTG9jYWxTdG9yYWdlLCBcIjEvXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCIyKipcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5zdHJpbmdQcmVBZGRlcikoc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSwgXCIyKipcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFiczFcIjpcbiAgICAgICAgY2FzZSBcImFiczJcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5hYnNDYWwpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyYW5kb20tbnVtXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEucmFuZG9tTnVtYmVyR2VuZXJhdG9yKShzdHJpbmdGcm9tTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZmxvb3JcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5mbG9vck51bWJlckNhbCkoc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNlbGlcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5jZWxpTnVtYmVyQ2FsKShzdHJpbmdGcm9tTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidW5pdC1vZi1hbmdsZVwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmNoYW5nZUluVW5pdE9mQW5nbGUpKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImUtc3EteFwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnN0cmluZ1ByZUFkZGVyKShzdHJpbmdGcm9tTG9jYWxTdG9yYWdlLCBcImUqKlwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZSoqXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc3RyaW5nUHJlQWRkZXIpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UsIFwiZSoqXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0by1leHBvXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEudG9FeHBvbmVudGlhbENvbnZlcnQpKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBsdXMtbWludXNcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5jaGFuZ2VUaGVWYWx1ZSkoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG1zXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuZGVnVG9EbXMpKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRlZ1wiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmlucHV0VG9EZWcpKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlY29uZC1mbi1Ucmlnb25vXCI6XG4gICAgICAgICAgICBpZiAoZmxhZ0Zvckh5cEJ0bikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJ0bnNPZlRyaWdvbm8gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidHJpZ29uby1idG5cIik7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuY2hhbmdlQnV0dG9uQ29sb3IpKGUudGFyZ2V0KTtcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5zZWNvbmRCdG5TaG93KShidG5zT2ZUcmlnb25vKTtcbiAgICAgICAgICAgIGZsYWdGb3JUb2dnbGVCdG4gPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgPyAoZmxhZ0ZvclRvZ2dsZUJ0biA9IHRydWUpXG4gICAgICAgICAgICAgICAgOiAoZmxhZ0ZvclRvZ2dsZUJ0biA9IGZhbHNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2Vjb25kLWZuLVRyaWdvbm8taFwiOlxuICAgICAgICAgICAgaWYgKGZsYWdGb3JUb2dnbGVCdG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgYnRuT2ZIVHJpZ29ub0ludmVyc2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidHJpZ29uby1oLWludlwiKTtcbiAgICAgICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuY2hhbmdlQnV0dG9uQ29sb3IpKGUudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc2Vjb25kQnRuU2hvdykoYnRuT2ZIVHJpZ29ub0ludmVyc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ0bk9mSFRyaWdvbm8gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidHJpZ29uby1oLWJ0blwiKTtcbiAgICAgICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuY2hhbmdlQnV0dG9uQ29sb3IpKGUudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc2Vjb25kQnRuU2hvdykoYnRuT2ZIVHJpZ29ubyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmbGFnRm9ySHlwQnRuID09PSBmYWxzZVxuICAgICAgICAgICAgICAgID8gKGZsYWdGb3JIeXBCdG4gPSB0cnVlKVxuICAgICAgICAgICAgICAgIDogKGZsYWdGb3JIeXBCdG4gPSBmYWxzZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlY29uZC1mblwiOlxuICAgICAgICAgICAgdmFyIGFsbEJ0bkZvclRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCIybmQtdG9nZ2xlLWJ0blwiKTtcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5jaGFuZ2VCdXR0b25Db2xvcikoZS50YXJnZXQpO1xuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnNlY29uZEJ0blNob3cpKGFsbEJ0bkZvclRvZ2dsZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5pc1RyaWdvbm9DYWwpKGNsaWNrZWRJdGVtKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9