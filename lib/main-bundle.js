/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions.ts":
/*!**************************!*\
  !*** ./src/functions.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isTrigonoCal = exports.inputToDeg = exports.degToDms = exports.changeTheValue = exports.toExponentialConvert = exports.changeInUnitOfAngle = exports.secondBtnShow = exports.changeButtonColor = exports.removeNumbers = exports.showStoredNumbers = exports.drawerClose = exports.drawerShow = exports.dynamicStyleDrawerWithDebounce = exports.dynamicStyleDrawer = exports.recallTheValueFromMemory = exports.removeTheValueFromMemory = exports.addTheValueToMemory = exports.stringPreAdder = exports.celiNumberCal = exports.floorNumberCal = exports.randomNumberGenerator = exports.absCal = exports.powerAndRootCal = exports.setCharAtInputField = exports.removeCharFromCal = exports.calculationOfSimpleCal = exports.simpleCalculation = exports.isOperationPresent = exports.buttonVisibilityHandler = exports.getValueFromLocal = exports.setValueInLocal = exports.inputField = void 0;
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
    var string = getValueFromLocal("calString");
    if (string.charAt(0) === "0" && string.charAt(1) !== "0")
        string = string.substring(1);
    string += value;
    setCharAtInputField(string);
}
exports.simpleCalculation = simpleCalculation;
//going to fire on = click
function calculationOfSimpleCal(stringFromLocalStorage) {
    stringCalHandler(stringFromLocalStorage);
}
exports.calculationOfSimpleCal = calculationOfSimpleCal;
//main fn to handle the all cal logics
function stringCalHandler(str) {
    try {
        str = str === null || str === void 0 ? void 0 : str.replaceAll("!", '["factorial"]()');
        str = str === null || str === void 0 ? void 0 : str.replaceAll("e", "2.7182");
        str = str === null || str === void 0 ? void 0 : str.replaceAll("π", "3.14");
        if (str === null || str === void 0 ? void 0 : str.includes("rt")) {
            customRootCal(str);
            return;
        }
        else if (str.includes("log")) {
            logCal(str, 10);
            return;
        }
        else if (str.includes("ln")) {
            logCal(str, 2.7182);
            return;
        }
        str = eval(str);
        setCharAtInputField(str);
    }
    catch (err) {
        showErrForSomeTime("Invalid Input!");
    }
}
//custom root fn logic
function customRootCal(str) {
    var firstNumber = str.slice(0, str.indexOf("rt"));
    var secondNumber = str.slice(str.indexOf("rt") + 2, str.length);
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
function logCal(str, base) {
    var result = 0;
    if (str.indexOf("g") !== -1 && !str.includes("(")) {
        result =
            Math.log(Number(str.slice(str.indexOf("g") + 1, str.length))) /
                Math.log(base);
    }
    else if (str.includes("(") && str.includes(")")) {
        var customBase = str.slice(str.indexOf("(") + 1, str.indexOf(")"));
        var value = str.slice(str.indexOf("g") + 1, str.indexOf("("));
        result = Math.log(Number(value)) / Math.log(Number(customBase));
    }
    else {
        result =
            Math.log(Number(str.slice(str.indexOf("n") + 1, str.length))) /
                Math.log(base);
    }
    if (isNaN(result)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(result));
}
//backspace btn logic to remove last char
function removeCharFromCal(string) {
    string = string === null || string === void 0 ? void 0 : string.substring(0, string.length - 1);
    setCharAtInputField(string);
}
exports.removeCharFromCal = removeCharFromCal;
//fn to set the string in the input field
function setCharAtInputField(string) {
    if (exports.inputField == undefined)
        return;
    setValueInLocal("calString", string);
    exports.inputField.value = string;
}
exports.setCharAtInputField = setCharAtInputField;
//diff. square and root combination fn logic
function powerAndRootCal(string, power, factor) {
    if (power === void 0) { power = "1"; }
    if (factor === void 0) { factor = "1"; }
    var output = Number(factor) / Number(power);
    var result = Math.pow(Number(string), output);
    if (isNaN(result)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(result));
}
exports.powerAndRootCal = powerAndRootCal;
//abs cal logic
function absCal(string) {
    var output = Math.abs(Number(string));
    if (isNaN(output)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(output));
}
exports.absCal = absCal;
//random number gen with below input value
function randomNumberGenerator(string) {
    var randomNumber = Math.floor(Math.random() * Number(string));
    if (isNaN(randomNumber)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(randomNumber));
}
exports.randomNumberGenerator = randomNumberGenerator;
//cal floorN from input
function floorNumberCal(string) {
    var newRoundOfNumber = Math.floor(Number(string));
    if (isNaN(newRoundOfNumber)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(newRoundOfNumber));
}
exports.floorNumberCal = floorNumberCal;
//cal celiN from input
function celiNumberCal(string) {
    var newCeliNumber = Math.ceil(Number(string));
    if (isNaN(newCeliNumber)) {
        showErrForSomeTime();
        return;
    }
    setCharAtInputField(String(newCeliNumber));
}
exports.celiNumberCal = celiNumberCal;
//append the string at start
function stringPreAdder(string, addString) {
    string = addString + string;
    setCharAtInputField(string);
}
exports.stringPreAdder = stringPreAdder;
//=== stored memory cal fn ===
function addTheValueToMemory() {
    var string = getValueFromLocal("calString");
    var storedNum = getValueFromLocal("storedNum");
    var value = Number(string) + Number(storedNum);
    if (isNaN(value)) {
        showErrForSomeTime("Invalid Input!");
        return;
    }
    setValueInLocal("storedNum", String(value));
}
exports.addTheValueToMemory = addTheValueToMemory;
//minus the value from the stored
function removeTheValueFromMemory() {
    var string = getValueFromLocal("calString");
    var storedNum = getValueFromLocal("storedNum");
    var value = Number(storedNum) - Number(string);
    if (isNaN(value)) {
        showErrForSomeTime("Invalid Input!");
        return;
    }
    setValueInLocal("storedNum", String(value));
}
exports.removeTheValueFromMemory = removeTheValueFromMemory;
//show the output of cal (stored num)
function recallTheValueFromMemory() {
    var string = getValueFromLocal("storedNum");
    setCharAtInputField(string);
}
exports.recallTheValueFromMemory = recallTheValueFromMemory;
//error handling function
function showErrForSomeTime(string) {
    if (string === void 0) { string = "Invalid Input !"; }
    var errorDiv = document.getElementById("error-div");
    if (errorDiv == undefined)
        return;
    errorDiv.innerHTML = string;
    setTimeout(function () {
        errorDiv.innerHTML = "";
    }, 5000);
}
// === drawer and related to that fns ===
function dynamicStyleDrawer(drawerContent, rect) {
    if (drawerContent == undefined || rect == undefined)
        return;
    drawerContent.style.bottom = "calc(100% - ".concat(rect.bottom, "px)");
    drawerContent.style.height = "".concat(rect.height * 0.65, "px");
    drawerContent.style.width = "".concat(rect.width, "px");
}
exports.dynamicStyleDrawer = dynamicStyleDrawer;
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
function changeTheUnitInHtml(string) {
    var unitOfAngleBtn = document.getElementById("unit-of-angle");
    if (unitOfAngleBtn == undefined)
        return;
    unitOfAngleBtn.innerHTML = string;
}
function toExponentialConvert() {
    var string = getValueFromLocal("calString");
    var expoNum = Number.parseFloat(string).toExponential();
    if (isNaN(Number(expoNum))) {
        showErrForSomeTime("Invalid Input!");
        return;
    }
    setCharAtInputField(expoNum);
}
exports.toExponentialConvert = toExponentialConvert;
//change the value plus to minus or minus to plus
function changeTheValue() {
    var value = getValueFromLocal("calString");
    if (value.charAt(0) === "-") {
        value = value.substring(1, value.length);
    }
    else {
        value = "-" + value;
    }
    setCharAtInputField(value);
}
exports.changeTheValue = changeTheValue;
//degree to dms
function degToDms() {
    var string = getValueFromLocal("calString");
    var deg = Number(string);
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
    var value = Number(stringFromLocal);
    if (unitOfAngle === "DEG") {
        return;
    }
    else if (unitOfAngle === "RAD") {
        value = value * (180 / Math.PI);
    }
    else if (unitOfAngle === "GRAD") {
        value = value / 0.0157;
    }
    if (isNaN(value)) {
        showErrForSomeTime("Please enter Numbers!");
        return;
    }
    setCharAtInputField(String(value));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzlyQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FsY3VsYXRvci8uL3NyYy9mdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vY2FsY3VsYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYWxjdWxhdG9yLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc1RyaWdvbm9DYWwgPSBleHBvcnRzLmlucHV0VG9EZWcgPSBleHBvcnRzLmRlZ1RvRG1zID0gZXhwb3J0cy5jaGFuZ2VUaGVWYWx1ZSA9IGV4cG9ydHMudG9FeHBvbmVudGlhbENvbnZlcnQgPSBleHBvcnRzLmNoYW5nZUluVW5pdE9mQW5nbGUgPSBleHBvcnRzLnNlY29uZEJ0blNob3cgPSBleHBvcnRzLmNoYW5nZUJ1dHRvbkNvbG9yID0gZXhwb3J0cy5yZW1vdmVOdW1iZXJzID0gZXhwb3J0cy5zaG93U3RvcmVkTnVtYmVycyA9IGV4cG9ydHMuZHJhd2VyQ2xvc2UgPSBleHBvcnRzLmRyYXdlclNob3cgPSBleHBvcnRzLmR5bmFtaWNTdHlsZURyYXdlcldpdGhEZWJvdW5jZSA9IGV4cG9ydHMuZHluYW1pY1N0eWxlRHJhd2VyID0gZXhwb3J0cy5yZWNhbGxUaGVWYWx1ZUZyb21NZW1vcnkgPSBleHBvcnRzLnJlbW92ZVRoZVZhbHVlRnJvbU1lbW9yeSA9IGV4cG9ydHMuYWRkVGhlVmFsdWVUb01lbW9yeSA9IGV4cG9ydHMuc3RyaW5nUHJlQWRkZXIgPSBleHBvcnRzLmNlbGlOdW1iZXJDYWwgPSBleHBvcnRzLmZsb29yTnVtYmVyQ2FsID0gZXhwb3J0cy5yYW5kb21OdW1iZXJHZW5lcmF0b3IgPSBleHBvcnRzLmFic0NhbCA9IGV4cG9ydHMucG93ZXJBbmRSb290Q2FsID0gZXhwb3J0cy5zZXRDaGFyQXRJbnB1dEZpZWxkID0gZXhwb3J0cy5yZW1vdmVDaGFyRnJvbUNhbCA9IGV4cG9ydHMuY2FsY3VsYXRpb25PZlNpbXBsZUNhbCA9IGV4cG9ydHMuc2ltcGxlQ2FsY3VsYXRpb24gPSBleHBvcnRzLmlzT3BlcmF0aW9uUHJlc2VudCA9IGV4cG9ydHMuYnV0dG9uVmlzaWJpbGl0eUhhbmRsZXIgPSBleHBvcnRzLmdldFZhbHVlRnJvbUxvY2FsID0gZXhwb3J0cy5zZXRWYWx1ZUluTG9jYWwgPSBleHBvcnRzLmlucHV0RmllbGQgPSB2b2lkIDA7XG4vL2FycmF5IHRvIGNoZWNrIHRoZSBvcGVyYXRpb25zXG52YXIgYXJyYXlPZk9wZXJhdGlvbnMgPSBbXG4gICAgXCIxXCIsXG4gICAgXCIyXCIsXG4gICAgXCIzXCIsXG4gICAgXCI0XCIsXG4gICAgXCI1XCIsXG4gICAgXCI2XCIsXG4gICAgXCI3XCIsXG4gICAgXCI4XCIsXG4gICAgXCI5XCIsXG4gICAgXCIwXCIsXG4gICAgXCIuXCIsXG4gICAgXCIrXCIsXG4gICAgXCItXCIsXG4gICAgXCIvXCIsXG4gICAgXCIqXCIsXG4gICAgXCIqKlwiLFxuICAgIFwiIVwiLFxuICAgIFwiKioyXCIsXG4gICAgXCIqKjNcIixcbiAgICBcIiVcIixcbiAgICBcInJ0XCIsXG4gICAgXCIoXCIsXG4gICAgXCIpXCIsXG4gICAgXCJlXCIsXG4gICAgXCLPgFwiLFxuICAgIFwibG9nMVwiLFxuICAgIFwibG9nMlwiLFxuICAgIFwibG5cIixcbiAgICBcImUqKlwiLFxuXTtcbi8vYWxsIHRyaWdvbm9tZXRyeSBvcGVyYXRpb24ncyBhcnJheVxudmFyIHRyaWdvbm9PcGVyYXRpb25zID0gW1xuICAgIFwic2luXCIsXG4gICAgXCJzaW4taFwiLFxuICAgIFwic2luLWluXCIsXG4gICAgXCJzaW4taC1pblwiLFxuICAgIFwiY29zXCIsXG4gICAgXCJjb3MtaFwiLFxuICAgIFwiY29zLWluXCIsXG4gICAgXCJjb3MtaC1pblwiLFxuICAgIFwidGFuXCIsXG4gICAgXCJ0YW4taFwiLFxuICAgIFwidGFuLWluXCIsXG4gICAgXCJ0YW4taC1pblwiLFxuICAgIFwic2VjXCIsXG4gICAgXCJzZWMtaFwiLFxuICAgIFwic2VjLWluXCIsXG4gICAgXCJzZWMtaC1pblwiLFxuICAgIFwiY3NjXCIsXG4gICAgXCJjc2MtaFwiLFxuICAgIFwiY3NjLWluXCIsXG4gICAgXCJjc2MtaC1pblwiLFxuICAgIFwiY290XCIsXG4gICAgXCJjb3QtaFwiLFxuICAgIFwiY290LWluXCIsXG4gICAgXCJjb3QtaC1pblwiLFxuXTtcbnZhciB1bml0T2ZBbmdsZSA9IFwiREVHXCI7XG5leHBvcnRzLmlucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIik7XG4vLz09PT0gbG9jYWwgc3RvcmFnZSByZWxhdGVkIGZuID09PT0gLy9cbi8vc2V0IGFuZCBnZXQgdGhlIGRhdGEgZnJvbSB0aGUgbG9jYWwgc3RvcmFnZVxuZnVuY3Rpb24gc2V0VmFsdWVJbkxvY2FsKGtleSwgdmFsdWUpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbn1cbmV4cG9ydHMuc2V0VmFsdWVJbkxvY2FsID0gc2V0VmFsdWVJbkxvY2FsO1xuLy9nZXQgdGhlIHZhbHVlcyBmcm9tIHRoZSBsb2NhbCBzdG9yYWdlXG5mdW5jdGlvbiBnZXRWYWx1ZUZyb21Mb2NhbChrZXkpIHtcbiAgICB2YXIgcmVzdWx0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICBzZXRWYWx1ZUluTG9jYWwoa2V5LCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmdldFZhbHVlRnJvbUxvY2FsID0gZ2V0VmFsdWVGcm9tTG9jYWw7XG4vL3Zpc2liaWxpdHkgb2YgYnRuIGJhc2VkIG9uIHRoZSBtZW1vcnlcbmZ1bmN0aW9uIGJ1dHRvblZpc2liaWxpdHlIYW5kbGVyKG1SZWNhbGxCdG4sIG1DbGVhckJ0bikge1xuICAgIGlmIChtUmVjYWxsQnRuID09IHVuZGVmaW5lZCB8fCBtQ2xlYXJCdG4gPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKGdldFZhbHVlRnJvbUxvY2FsKFwic3RvcmVkTnVtXCIpID09PSBcIjBcIiAmJlxuICAgICAgICBnZXRWYWx1ZUZyb21Mb2NhbChcInN0b3JlZE51bXNcIikgPT09IFwiXCIpIHtcbiAgICAgICAgbVJlY2FsbEJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIG1DbGVhckJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtUmVjYWxsQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIG1DbGVhckJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydHMuYnV0dG9uVmlzaWJpbGl0eUhhbmRsZXIgPSBidXR0b25WaXNpYmlsaXR5SGFuZGxlcjtcbi8vYmFzaWMgb3BlcmF0aW9uIGlzIHByZXNlbnQgb2Ygbm90XG5mdW5jdGlvbiBpc09wZXJhdGlvblByZXNlbnQoY2xpY2tlZEl0ZW0pIHtcbiAgICByZXR1cm4gYXJyYXlPZk9wZXJhdGlvbnMuaW5jbHVkZXMoY2xpY2tlZEl0ZW0pID8gY2xpY2tlZEl0ZW0gOiBcIiNcIjtcbn1cbmV4cG9ydHMuaXNPcGVyYXRpb25QcmVzZW50ID0gaXNPcGVyYXRpb25QcmVzZW50O1xuLy9mbiB0aGF0IGlzIGdvaW5nIHRvIGp1c3QgYWRkIHRoZSBvcGVyYXRpb24gaW4gdGhlIHN0cmluZ1xuZnVuY3Rpb24gc2ltcGxlQ2FsY3VsYXRpb24odmFsdWUpIHtcbiAgICB2YXIgc3RyaW5nID0gZ2V0VmFsdWVGcm9tTG9jYWwoXCJjYWxTdHJpbmdcIik7XG4gICAgaWYgKHN0cmluZy5jaGFyQXQoMCkgPT09IFwiMFwiICYmIHN0cmluZy5jaGFyQXQoMSkgIT09IFwiMFwiKVxuICAgICAgICBzdHJpbmcgPSBzdHJpbmcuc3Vic3RyaW5nKDEpO1xuICAgIHN0cmluZyArPSB2YWx1ZTtcbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKHN0cmluZyk7XG59XG5leHBvcnRzLnNpbXBsZUNhbGN1bGF0aW9uID0gc2ltcGxlQ2FsY3VsYXRpb247XG4vL2dvaW5nIHRvIGZpcmUgb24gPSBjbGlja1xuZnVuY3Rpb24gY2FsY3VsYXRpb25PZlNpbXBsZUNhbChzdHJpbmdGcm9tTG9jYWxTdG9yYWdlKSB7XG4gICAgc3RyaW5nQ2FsSGFuZGxlcihzdHJpbmdGcm9tTG9jYWxTdG9yYWdlKTtcbn1cbmV4cG9ydHMuY2FsY3VsYXRpb25PZlNpbXBsZUNhbCA9IGNhbGN1bGF0aW9uT2ZTaW1wbGVDYWw7XG4vL21haW4gZm4gdG8gaGFuZGxlIHRoZSBhbGwgY2FsIGxvZ2ljc1xuZnVuY3Rpb24gc3RyaW5nQ2FsSGFuZGxlcihzdHIpIHtcbiAgICB0cnkge1xuICAgICAgICBzdHIgPSBzdHIgPT09IG51bGwgfHwgc3RyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdHIucmVwbGFjZUFsbChcIiFcIiwgJ1tcImZhY3RvcmlhbFwiXSgpJyk7XG4gICAgICAgIHN0ciA9IHN0ciA9PT0gbnVsbCB8fCBzdHIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0ci5yZXBsYWNlQWxsKFwiZVwiLCBcIjIuNzE4MlwiKTtcbiAgICAgICAgc3RyID0gc3RyID09PSBudWxsIHx8IHN0ciA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RyLnJlcGxhY2VBbGwoXCLPgFwiLCBcIjMuMTRcIik7XG4gICAgICAgIGlmIChzdHIgPT09IG51bGwgfHwgc3RyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzdHIuaW5jbHVkZXMoXCJydFwiKSkge1xuICAgICAgICAgICAgY3VzdG9tUm9vdENhbChzdHIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0ci5pbmNsdWRlcyhcImxvZ1wiKSkge1xuICAgICAgICAgICAgbG9nQ2FsKHN0ciwgMTApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0ci5pbmNsdWRlcyhcImxuXCIpKSB7XG4gICAgICAgICAgICBsb2dDYWwoc3RyLCAyLjcxODIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN0ciA9IGV2YWwoc3RyKTtcbiAgICAgICAgc2V0Q2hhckF0SW5wdXRGaWVsZChzdHIpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZShcIkludmFsaWQgSW5wdXQhXCIpO1xuICAgIH1cbn1cbi8vY3VzdG9tIHJvb3QgZm4gbG9naWNcbmZ1bmN0aW9uIGN1c3RvbVJvb3RDYWwoc3RyKSB7XG4gICAgdmFyIGZpcnN0TnVtYmVyID0gc3RyLnNsaWNlKDAsIHN0ci5pbmRleE9mKFwicnRcIikpO1xuICAgIHZhciBzZWNvbmROdW1iZXIgPSBzdHIuc2xpY2Uoc3RyLmluZGV4T2YoXCJydFwiKSArIDIsIHN0ci5sZW5ndGgpO1xuICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGV2YWwoXCJcIi5jb25jYXQoTWF0aC5wb3coTnVtYmVyKHNlY29uZE51bWJlciksICgxIC8gTnVtYmVyKGZpcnN0TnVtYmVyKSkpKSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKCk7XG4gICAgfVxuICAgIGlmIChpc05hTihOdW1iZXIocmVzdWx0KSkpXG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZShcIkludmFsaWQgSW5wdXQhXCIpO1xuICAgIHNldENoYXJBdElucHV0RmllbGQocmVzdWx0KTtcbn1cbi8vbG9nIGNhbCBmbiB3aXRoIGRpZmYuIGJhc2VzIGxvZ2ljXG5mdW5jdGlvbiBsb2dDYWwoc3RyLCBiYXNlKSB7XG4gICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgaWYgKHN0ci5pbmRleE9mKFwiZ1wiKSAhPT0gLTEgJiYgIXN0ci5pbmNsdWRlcyhcIihcIikpIHtcbiAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgIE1hdGgubG9nKE51bWJlcihzdHIuc2xpY2Uoc3RyLmluZGV4T2YoXCJnXCIpICsgMSwgc3RyLmxlbmd0aCkpKSAvXG4gICAgICAgICAgICAgICAgTWF0aC5sb2coYmFzZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0ci5pbmNsdWRlcyhcIihcIikgJiYgc3RyLmluY2x1ZGVzKFwiKVwiKSkge1xuICAgICAgICB2YXIgY3VzdG9tQmFzZSA9IHN0ci5zbGljZShzdHIuaW5kZXhPZihcIihcIikgKyAxLCBzdHIuaW5kZXhPZihcIilcIikpO1xuICAgICAgICB2YXIgdmFsdWUgPSBzdHIuc2xpY2Uoc3RyLmluZGV4T2YoXCJnXCIpICsgMSwgc3RyLmluZGV4T2YoXCIoXCIpKTtcbiAgICAgICAgcmVzdWx0ID0gTWF0aC5sb2coTnVtYmVyKHZhbHVlKSkgLyBNYXRoLmxvZyhOdW1iZXIoY3VzdG9tQmFzZSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgIE1hdGgubG9nKE51bWJlcihzdHIuc2xpY2Uoc3RyLmluZGV4T2YoXCJuXCIpICsgMSwgc3RyLmxlbmd0aCkpKSAvXG4gICAgICAgICAgICAgICAgTWF0aC5sb2coYmFzZSk7XG4gICAgfVxuICAgIGlmIChpc05hTihyZXN1bHQpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHJlc3VsdCkpO1xufVxuLy9iYWNrc3BhY2UgYnRuIGxvZ2ljIHRvIHJlbW92ZSBsYXN0IGNoYXJcbmZ1bmN0aW9uIHJlbW92ZUNoYXJGcm9tQ2FsKHN0cmluZykge1xuICAgIHN0cmluZyA9IHN0cmluZyA9PT0gbnVsbCB8fCBzdHJpbmcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0cmluZy5zdWJzdHJpbmcoMCwgc3RyaW5nLmxlbmd0aCAtIDEpO1xuICAgIHNldENoYXJBdElucHV0RmllbGQoc3RyaW5nKTtcbn1cbmV4cG9ydHMucmVtb3ZlQ2hhckZyb21DYWwgPSByZW1vdmVDaGFyRnJvbUNhbDtcbi8vZm4gdG8gc2V0IHRoZSBzdHJpbmcgaW4gdGhlIGlucHV0IGZpZWxkXG5mdW5jdGlvbiBzZXRDaGFyQXRJbnB1dEZpZWxkKHN0cmluZykge1xuICAgIGlmIChleHBvcnRzLmlucHV0RmllbGQgPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgc2V0VmFsdWVJbkxvY2FsKFwiY2FsU3RyaW5nXCIsIHN0cmluZyk7XG4gICAgZXhwb3J0cy5pbnB1dEZpZWxkLnZhbHVlID0gc3RyaW5nO1xufVxuZXhwb3J0cy5zZXRDaGFyQXRJbnB1dEZpZWxkID0gc2V0Q2hhckF0SW5wdXRGaWVsZDtcbi8vZGlmZi4gc3F1YXJlIGFuZCByb290IGNvbWJpbmF0aW9uIGZuIGxvZ2ljXG5mdW5jdGlvbiBwb3dlckFuZFJvb3RDYWwoc3RyaW5nLCBwb3dlciwgZmFjdG9yKSB7XG4gICAgaWYgKHBvd2VyID09PSB2b2lkIDApIHsgcG93ZXIgPSBcIjFcIjsgfVxuICAgIGlmIChmYWN0b3IgPT09IHZvaWQgMCkgeyBmYWN0b3IgPSBcIjFcIjsgfVxuICAgIHZhciBvdXRwdXQgPSBOdW1iZXIoZmFjdG9yKSAvIE51bWJlcihwb3dlcik7XG4gICAgdmFyIHJlc3VsdCA9IE1hdGgucG93KE51bWJlcihzdHJpbmcpLCBvdXRwdXQpO1xuICAgIGlmIChpc05hTihyZXN1bHQpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHJlc3VsdCkpO1xufVxuZXhwb3J0cy5wb3dlckFuZFJvb3RDYWwgPSBwb3dlckFuZFJvb3RDYWw7XG4vL2FicyBjYWwgbG9naWNcbmZ1bmN0aW9uIGFic0NhbChzdHJpbmcpIHtcbiAgICB2YXIgb3V0cHV0ID0gTWF0aC5hYnMoTnVtYmVyKHN0cmluZykpO1xuICAgIGlmIChpc05hTihvdXRwdXQpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKG91dHB1dCkpO1xufVxuZXhwb3J0cy5hYnNDYWwgPSBhYnNDYWw7XG4vL3JhbmRvbSBudW1iZXIgZ2VuIHdpdGggYmVsb3cgaW5wdXQgdmFsdWVcbmZ1bmN0aW9uIHJhbmRvbU51bWJlckdlbmVyYXRvcihzdHJpbmcpIHtcbiAgICB2YXIgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTnVtYmVyKHN0cmluZykpO1xuICAgIGlmIChpc05hTihyYW5kb21OdW1iZXIpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHJhbmRvbU51bWJlcikpO1xufVxuZXhwb3J0cy5yYW5kb21OdW1iZXJHZW5lcmF0b3IgPSByYW5kb21OdW1iZXJHZW5lcmF0b3I7XG4vL2NhbCBmbG9vck4gZnJvbSBpbnB1dFxuZnVuY3Rpb24gZmxvb3JOdW1iZXJDYWwoc3RyaW5nKSB7XG4gICAgdmFyIG5ld1JvdW5kT2ZOdW1iZXIgPSBNYXRoLmZsb29yKE51bWJlcihzdHJpbmcpKTtcbiAgICBpZiAoaXNOYU4obmV3Um91bmRPZk51bWJlcikpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0Q2hhckF0SW5wdXRGaWVsZChTdHJpbmcobmV3Um91bmRPZk51bWJlcikpO1xufVxuZXhwb3J0cy5mbG9vck51bWJlckNhbCA9IGZsb29yTnVtYmVyQ2FsO1xuLy9jYWwgY2VsaU4gZnJvbSBpbnB1dFxuZnVuY3Rpb24gY2VsaU51bWJlckNhbChzdHJpbmcpIHtcbiAgICB2YXIgbmV3Q2VsaU51bWJlciA9IE1hdGguY2VpbChOdW1iZXIoc3RyaW5nKSk7XG4gICAgaWYgKGlzTmFOKG5ld0NlbGlOdW1iZXIpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKG5ld0NlbGlOdW1iZXIpKTtcbn1cbmV4cG9ydHMuY2VsaU51bWJlckNhbCA9IGNlbGlOdW1iZXJDYWw7XG4vL2FwcGVuZCB0aGUgc3RyaW5nIGF0IHN0YXJ0XG5mdW5jdGlvbiBzdHJpbmdQcmVBZGRlcihzdHJpbmcsIGFkZFN0cmluZykge1xuICAgIHN0cmluZyA9IGFkZFN0cmluZyArIHN0cmluZztcbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKHN0cmluZyk7XG59XG5leHBvcnRzLnN0cmluZ1ByZUFkZGVyID0gc3RyaW5nUHJlQWRkZXI7XG4vLz09PSBzdG9yZWQgbWVtb3J5IGNhbCBmbiA9PT1cbmZ1bmN0aW9uIGFkZFRoZVZhbHVlVG9NZW1vcnkoKSB7XG4gICAgdmFyIHN0cmluZyA9IGdldFZhbHVlRnJvbUxvY2FsKFwiY2FsU3RyaW5nXCIpO1xuICAgIHZhciBzdG9yZWROdW0gPSBnZXRWYWx1ZUZyb21Mb2NhbChcInN0b3JlZE51bVwiKTtcbiAgICB2YXIgdmFsdWUgPSBOdW1iZXIoc3RyaW5nKSArIE51bWJlcihzdG9yZWROdW0pO1xuICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKFwiSW52YWxpZCBJbnB1dCFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0VmFsdWVJbkxvY2FsKFwic3RvcmVkTnVtXCIsIFN0cmluZyh2YWx1ZSkpO1xufVxuZXhwb3J0cy5hZGRUaGVWYWx1ZVRvTWVtb3J5ID0gYWRkVGhlVmFsdWVUb01lbW9yeTtcbi8vbWludXMgdGhlIHZhbHVlIGZyb20gdGhlIHN0b3JlZFxuZnVuY3Rpb24gcmVtb3ZlVGhlVmFsdWVGcm9tTWVtb3J5KCkge1xuICAgIHZhciBzdHJpbmcgPSBnZXRWYWx1ZUZyb21Mb2NhbChcImNhbFN0cmluZ1wiKTtcbiAgICB2YXIgc3RvcmVkTnVtID0gZ2V0VmFsdWVGcm9tTG9jYWwoXCJzdG9yZWROdW1cIik7XG4gICAgdmFyIHZhbHVlID0gTnVtYmVyKHN0b3JlZE51bSkgLSBOdW1iZXIoc3RyaW5nKTtcbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZShcIkludmFsaWQgSW5wdXQhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFZhbHVlSW5Mb2NhbChcInN0b3JlZE51bVwiLCBTdHJpbmcodmFsdWUpKTtcbn1cbmV4cG9ydHMucmVtb3ZlVGhlVmFsdWVGcm9tTWVtb3J5ID0gcmVtb3ZlVGhlVmFsdWVGcm9tTWVtb3J5O1xuLy9zaG93IHRoZSBvdXRwdXQgb2YgY2FsIChzdG9yZWQgbnVtKVxuZnVuY3Rpb24gcmVjYWxsVGhlVmFsdWVGcm9tTWVtb3J5KCkge1xuICAgIHZhciBzdHJpbmcgPSBnZXRWYWx1ZUZyb21Mb2NhbChcInN0b3JlZE51bVwiKTtcbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKHN0cmluZyk7XG59XG5leHBvcnRzLnJlY2FsbFRoZVZhbHVlRnJvbU1lbW9yeSA9IHJlY2FsbFRoZVZhbHVlRnJvbU1lbW9yeTtcbi8vZXJyb3IgaGFuZGxpbmcgZnVuY3Rpb25cbmZ1bmN0aW9uIHNob3dFcnJGb3JTb21lVGltZShzdHJpbmcpIHtcbiAgICBpZiAoc3RyaW5nID09PSB2b2lkIDApIHsgc3RyaW5nID0gXCJJbnZhbGlkIElucHV0ICFcIjsgfVxuICAgIHZhciBlcnJvckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3ItZGl2XCIpO1xuICAgIGlmIChlcnJvckRpdiA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBlcnJvckRpdi5pbm5lckhUTUwgPSBzdHJpbmc7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVycm9yRGl2LmlubmVySFRNTCA9IFwiXCI7XG4gICAgfSwgNTAwMCk7XG59XG4vLyA9PT0gZHJhd2VyIGFuZCByZWxhdGVkIHRvIHRoYXQgZm5zID09PVxuZnVuY3Rpb24gZHluYW1pY1N0eWxlRHJhd2VyKGRyYXdlckNvbnRlbnQsIHJlY3QpIHtcbiAgICBpZiAoZHJhd2VyQ29udGVudCA9PSB1bmRlZmluZWQgfHwgcmVjdCA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBkcmF3ZXJDb250ZW50LnN0eWxlLmJvdHRvbSA9IFwiY2FsYygxMDAlIC0gXCIuY29uY2F0KHJlY3QuYm90dG9tLCBcInB4KVwiKTtcbiAgICBkcmF3ZXJDb250ZW50LnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KHJlY3QuaGVpZ2h0ICogMC42NSwgXCJweFwiKTtcbiAgICBkcmF3ZXJDb250ZW50LnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQocmVjdC53aWR0aCwgXCJweFwiKTtcbn1cbmV4cG9ydHMuZHluYW1pY1N0eWxlRHJhd2VyID0gZHluYW1pY1N0eWxlRHJhd2VyO1xuLy9kZWJvdW5jZSBwb2x5ZmlsbFxuZnVuY3Rpb24gbXlEZWJvdW5jZShjYiwgZCkge1xuICAgIHZhciB0aW1lcjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lcilcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYi5hcHBseSh2b2lkIDAsIGFyZ3MpO1xuICAgICAgICB9LCBkKTtcbiAgICB9O1xufVxuZXhwb3J0cy5keW5hbWljU3R5bGVEcmF3ZXJXaXRoRGVib3VuY2UgPSBteURlYm91bmNlKGZ1bmN0aW9uIChkcmF3ZXJDb250ZW50LCByZWN0KSB7XG4gICAgZHluYW1pY1N0eWxlRHJhd2VyKGRyYXdlckNvbnRlbnQsIHJlY3QpO1xufSwgMTAwMCk7XG5mdW5jdGlvbiBkcmF3ZXJTaG93KGRyYXdlckNvbnRlbnQpIHtcbiAgICBpZiAoZHJhd2VyQ29udGVudCA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBkcmF3ZXJDb250ZW50LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xufVxuZXhwb3J0cy5kcmF3ZXJTaG93ID0gZHJhd2VyU2hvdztcbmZ1bmN0aW9uIGRyYXdlckNsb3NlKGRyYXdlckNvbnRlbnQpIHtcbiAgICBpZiAoZHJhd2VyQ29udGVudCA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBkcmF3ZXJDb250ZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cbmV4cG9ydHMuZHJhd2VyQ2xvc2UgPSBkcmF3ZXJDbG9zZTtcbi8vc2hvdyB0aGUgc3RvcmVkIG51bXMgd2l0aCBjaGlsZCBhcHBlbmRcbmZ1bmN0aW9uIHNob3dTdG9yZWROdW1iZXJzKCkge1xuICAgIHZhciBfYTtcbiAgICB2YXIgYXJyYXlPZk51bWJlcnMgPSAoX2EgPSBnZXRWYWx1ZUZyb21Mb2NhbChcInN0b3JlZE51bXNcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zcGxpdChcIixcIik7XG4gICAgdmFyIGVyck1zZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1wdHktbXNnXCIpO1xuICAgIHZhciBmbGFnRm9yTXNnID0gZmFsc2U7XG4gICAgaWYgKGFycmF5T2ZOdW1iZXJzWzBdID09IFwiXCIpXG4gICAgICAgIGZsYWdGb3JNc2cgPSB0cnVlO1xuICAgIGlmIChlcnJNc2cgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZsYWdGb3JNc2dcbiAgICAgICAgICAgID8gKGVyck1zZy5pbm5lclRleHQgPSBcIlRoZXJlJ3MgaXMgbm90aGluZyBzYXZlZCBpbiB5b3VyIG1lbW9yeVwiKVxuICAgICAgICAgICAgOiAoZXJyTXNnLmlubmVyVGV4dCA9IFwiXCIpO1xuICAgIH1cbiAgICB2YXIgc3RvcmVkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYWxEaXZfX251bXNEaXZcIik7XG4gICAgaWYgKHN0b3JlZERpdiA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoc3RvcmVkRGl2LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgc3RvcmVkRGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9XG4gICAgdmFyIGNoaWxkID0gYXJyYXlPZk51bWJlcnMgPT09IG51bGwgfHwgYXJyYXlPZk51bWJlcnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFycmF5T2ZOdW1iZXJzLm1hcChmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBcIjxwIGNsYXNzPVxcXCJtZS0zIGg1XFxcIiA+IFwiLmNvbmNhdChudW1iZXIsIFwiIDwvcD5cIik7XG4gICAgfSk7XG4gICAgaWYgKGNoaWxkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGNoaWxkXzEgPSBjaGlsZDsgX2kgPCBjaGlsZF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGkgPSBjaGlsZF8xW19pXTtcbiAgICAgICAgICAgIHN0b3JlZERpdi5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnNob3dTdG9yZWROdW1iZXJzID0gc2hvd1N0b3JlZE51bWJlcnM7XG4vL3JlbW92ZSBudW1iZXIgZnJvbSB0aGUgdWkgYW5kIG1lbW9yeVxuZnVuY3Rpb24gcmVtb3ZlTnVtYmVycygpIHtcbiAgICB2YXIgc3RvcmVkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYWxEaXZfX251bXNEaXZcIik7XG4gICAgdmFyIGVyck1zZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1wdHktbXNnXCIpO1xuICAgIGlmIChlcnJNc2cgPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHN0b3JlZERpdiA9PT0gbnVsbCB8fCBzdG9yZWREaXYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN0b3JlZERpdi5maXJzdENoaWxkKSB7XG4gICAgICAgIHN0b3JlZERpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfVxuICAgIGVyck1zZy5pbm5lclRleHQgPSBcIlRoZXJlJ3MgaXMgbm90aGluZyBzYXZlZCBpbiB5b3VyIG1lbW9yeVwiO1xuICAgIHNldFZhbHVlSW5Mb2NhbChcInN0b3JlZE51bXNcIiwgXCJcIik7XG59XG5leHBvcnRzLnJlbW92ZU51bWJlcnMgPSByZW1vdmVOdW1iZXJzO1xuLy89PSBjaGFuZ2UgaW4gYnRuIFVJIGZ1bmN0aW9ucyA9PS8vXG4vL2ZuIHRoYXQgY2hhbmdlcyBjb2xvclxuZnVuY3Rpb24gY2hhbmdlQnV0dG9uQ29sb3IoYnRuKSB7XG4gICAgaWYgKGJ0biA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoYnRuIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoXCJjYWxEaXZfX2J0bi0tYmx1ZVwiKTtcbiAgICB9XG59XG5leHBvcnRzLmNoYW5nZUJ1dHRvbkNvbG9yID0gY2hhbmdlQnV0dG9uQ29sb3I7XG4vL2ZuIHRoYXQgc2hvdyBzZWNvbmQgYnRuIHRoYXQgYXJlIGhpZGRlbiBvbiBjbGljayBldmVudFxuZnVuY3Rpb24gc2Vjb25kQnRuU2hvdyhhbGxCdG5Gb3JUb2dnbGUsIGNsYXNzT25lLCBjbGFzc1R3bykge1xuICAgIGlmIChjbGFzc09uZSA9PT0gdm9pZCAwKSB7IGNsYXNzT25lID0gXCJkLWlubGluZVwiOyB9XG4gICAgaWYgKGNsYXNzVHdvID09PSB2b2lkIDApIHsgY2xhc3NUd28gPSBcImQtbm9uZVwiOyB9XG4gICAgQXJyYXkuZnJvbShhbGxCdG5Gb3JUb2dnbGUpLm1hcChmdW5jdGlvbiAodmlzaWJsZUJ0bikge1xuICAgICAgICAvL3Zpc2libGVCdG4gPT0+IGVsZW1lbnQgZnJvbSBET01Ub2tlbkxpc3RcbiAgICAgICAgaWYgKHZpc2libGVCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzT25lKSkge1xuICAgICAgICAgICAgdmlzaWJsZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzVHdvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZpc2libGVCdG4uY2xhc3NMaXN0LnRvZ2dsZShjbGFzc1R3byk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuc2Vjb25kQnRuU2hvdyA9IHNlY29uZEJ0blNob3c7XG4vL3VuaXQgY2hhbmdpbmcgaW4gdGhlIGNhbCB3aXRoIGNsaWNrcyBsb2dpY1xuZnVuY3Rpb24gY2hhbmdlSW5Vbml0T2ZBbmdsZSgpIHtcbiAgICBpZiAodW5pdE9mQW5nbGUgPT09IFwiREVHXCIpIHtcbiAgICAgICAgdW5pdE9mQW5nbGUgPSBcIlJBRFwiO1xuICAgICAgICBjaGFuZ2VUaGVVbml0SW5IdG1sKFwiUkFEXCIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh1bml0T2ZBbmdsZSA9PT0gXCJSQURcIikge1xuICAgICAgICB1bml0T2ZBbmdsZSA9IFwiR1JBRFwiO1xuICAgICAgICBjaGFuZ2VUaGVVbml0SW5IdG1sKFwiR1JBRFwiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodW5pdE9mQW5nbGUgPT09IFwiR1JBRFwiKSB7XG4gICAgICAgIHVuaXRPZkFuZ2xlID0gXCJERUdcIjtcbiAgICAgICAgY2hhbmdlVGhlVW5pdEluSHRtbChcIkRFR1wiKTtcbiAgICB9XG59XG5leHBvcnRzLmNoYW5nZUluVW5pdE9mQW5nbGUgPSBjaGFuZ2VJblVuaXRPZkFuZ2xlO1xuLy9iYXNlZCBvbiB0aGUgc3RyaW5nIGNoYW5naW5nIGh0bWwgdmFsdWVcbmZ1bmN0aW9uIGNoYW5nZVRoZVVuaXRJbkh0bWwoc3RyaW5nKSB7XG4gICAgdmFyIHVuaXRPZkFuZ2xlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1bml0LW9mLWFuZ2xlXCIpO1xuICAgIGlmICh1bml0T2ZBbmdsZUJ0biA9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICB1bml0T2ZBbmdsZUJ0bi5pbm5lckhUTUwgPSBzdHJpbmc7XG59XG5mdW5jdGlvbiB0b0V4cG9uZW50aWFsQ29udmVydCgpIHtcbiAgICB2YXIgc3RyaW5nID0gZ2V0VmFsdWVGcm9tTG9jYWwoXCJjYWxTdHJpbmdcIik7XG4gICAgdmFyIGV4cG9OdW0gPSBOdW1iZXIucGFyc2VGbG9hdChzdHJpbmcpLnRvRXhwb25lbnRpYWwoKTtcbiAgICBpZiAoaXNOYU4oTnVtYmVyKGV4cG9OdW0pKSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJJbnZhbGlkIElucHV0IVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKGV4cG9OdW0pO1xufVxuZXhwb3J0cy50b0V4cG9uZW50aWFsQ29udmVydCA9IHRvRXhwb25lbnRpYWxDb252ZXJ0O1xuLy9jaGFuZ2UgdGhlIHZhbHVlIHBsdXMgdG8gbWludXMgb3IgbWludXMgdG8gcGx1c1xuZnVuY3Rpb24gY2hhbmdlVGhlVmFsdWUoKSB7XG4gICAgdmFyIHZhbHVlID0gZ2V0VmFsdWVGcm9tTG9jYWwoXCJjYWxTdHJpbmdcIik7XG4gICAgaWYgKHZhbHVlLmNoYXJBdCgwKSA9PT0gXCItXCIpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHJpbmcoMSwgdmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhbHVlID0gXCItXCIgKyB2YWx1ZTtcbiAgICB9XG4gICAgc2V0Q2hhckF0SW5wdXRGaWVsZCh2YWx1ZSk7XG59XG5leHBvcnRzLmNoYW5nZVRoZVZhbHVlID0gY2hhbmdlVGhlVmFsdWU7XG4vL2RlZ3JlZSB0byBkbXNcbmZ1bmN0aW9uIGRlZ1RvRG1zKCkge1xuICAgIHZhciBzdHJpbmcgPSBnZXRWYWx1ZUZyb21Mb2NhbChcImNhbFN0cmluZ1wiKTtcbiAgICB2YXIgZGVnID0gTnVtYmVyKHN0cmluZyk7XG4gICAgaWYgKHVuaXRPZkFuZ2xlID09PSBcIkRFR1wiIHx8IGlzTmFOKE51bWJlcihkZWcpKSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJQbGVhc2UgZW50ZXIgdGhlIGlucHV0IGluIERFRyB3aXRoIG51bWJlcnMhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBkID0gTWF0aC5mbG9vcihkZWcpO1xuICAgIHZhciBtaW5mbG9hdCA9IChkZWcgLSBkKSAqIDYwO1xuICAgIHZhciBtID0gTWF0aC5mbG9vcihtaW5mbG9hdCk7XG4gICAgdmFyIHNlY2Zsb2F0ID0gKG1pbmZsb2F0IC0gbSkgKiA2MDtcbiAgICB2YXIgcyA9IE1hdGgucm91bmQoc2VjZmxvYXQpO1xuICAgIC8vIEFmdGVyIHJvdW5kaW5nLCB0aGUgc2Vjb25kcyBtaWdodCBiZWNvbWUgNjAuXG4gICAgaWYgKHMgPT09IDYwKSB7XG4gICAgICAgIG0rKztcbiAgICAgICAgcyA9IDA7XG4gICAgfVxuICAgIGlmIChtID09PSA2MCkge1xuICAgICAgICBkKys7XG4gICAgICAgIG0gPSAwO1xuICAgIH1cbiAgICB2YXIgb3V0cHV0ID0gXCJcIiArIGQgKyBcIjpcIiArIG0gKyBcIjpcIiArIHM7XG4gICAgc2V0Q2hhckF0SW5wdXRGaWVsZChvdXRwdXQpO1xufVxuZXhwb3J0cy5kZWdUb0RtcyA9IGRlZ1RvRG1zO1xuLy9yYWRpYW4sIGdyYWRlIHRvIGRlZ1xuZnVuY3Rpb24gaW5wdXRUb0RlZygpIHtcbiAgICB2YXIgc3RyaW5nRnJvbUxvY2FsID0gZ2V0VmFsdWVGcm9tTG9jYWwoXCJjYWxTdHJpbmdcIik7XG4gICAgdmFyIHZhbHVlID0gTnVtYmVyKHN0cmluZ0Zyb21Mb2NhbCk7XG4gICAgaWYgKHVuaXRPZkFuZ2xlID09PSBcIkRFR1wiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAodW5pdE9mQW5nbGUgPT09IFwiUkFEXCIpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSAqICgxODAgLyBNYXRoLlBJKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodW5pdE9mQW5nbGUgPT09IFwiR1JBRFwiKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUgLyAwLjAxNTc7XG4gICAgfVxuICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKFwiUGxlYXNlIGVudGVyIE51bWJlcnMhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG59XG5leHBvcnRzLmlucHV0VG9EZWcgPSBpbnB1dFRvRGVnO1xuLy9vcGVyYXRpb24gaXMgVHJpZ29ubyBvciBub3RcbmZ1bmN0aW9uIGlzVHJpZ29ub0NhbChjbGlja2VkSXRlbSkge1xuICAgIHRyaWdvbm9PcGVyYXRpb25zLmluY2x1ZGVzKGNsaWNrZWRJdGVtKVxuICAgICAgICA/IHRyaWdvbm9PcGVyYXRpb25IYW5kbGVyKGNsaWNrZWRJdGVtKVxuICAgICAgICA6IFwiXCI7XG59XG5leHBvcnRzLmlzVHJpZ29ub0NhbCA9IGlzVHJpZ29ub0NhbDtcbi8vdG8gaGFuZGxlIGFsbCB0aGUgdHJpZ29ub21ldHJ5IG9wZXJhdGlvbnNcbmZ1bmN0aW9uIHRyaWdvbm9PcGVyYXRpb25IYW5kbGVyKGNsaWNrZWRJdGVtKSB7XG4gICAgdmFyIHN0cmluZ0Zyb21Mb2NhbCA9IGdldFZhbHVlRnJvbUxvY2FsKFwiY2FsU3RyaW5nXCIpO1xuICAgIHZhciB2YWx1ZSA9IE51bWJlcihzdHJpbmdGcm9tTG9jYWwpO1xuICAgIGlmICh1bml0T2ZBbmdsZSA9PT0gXCJERUdcIikge1xuICAgICAgICAvL2NvbnZlcnRpbmcgZGVncmVlIHRvIHJhZGlhblxuICAgICAgICB2YWx1ZSA9IHZhbHVlICogKE1hdGguUEkgLyAxODApO1xuICAgIH1cbiAgICBlbHNlIGlmICh1bml0T2ZBbmdsZSA9PT0gXCJHUkFEXCIpIHtcbiAgICAgICAgLy8xIEdyYWRpYW5zIHRvIFJhZGlhbnMgPSAwLjAxNTdcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSAqIDAuMDE1NztcbiAgICB9XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2xpY2tlZEl0ZW0uaW5jbHVkZXMoXCJzaW5cIikpIHtcbiAgICAgICAgc2luVHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2xpY2tlZEl0ZW0uaW5jbHVkZXMoXCJjb3NcIikpIHtcbiAgICAgICAgY29zVHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2xpY2tlZEl0ZW0uaW5jbHVkZXMoXCJ0YW5cIikpIHtcbiAgICAgICAgdGFuVHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2xpY2tlZEl0ZW0uaW5jbHVkZXMoXCJjc2NcIikpIHtcbiAgICAgICAgY3NjVHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2xpY2tlZEl0ZW0uaW5jbHVkZXMoXCJzZWNcIikpIHtcbiAgICAgICAgc2VjVHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY2xpY2tlZEl0ZW0uaW5jbHVkZXMoXCJjb3RcIikpIHtcbiAgICAgICAgY290VHJpZ29ub09wZXJhdGlvbnMoY2xpY2tlZEl0ZW0sIHZhbHVlKTtcbiAgICB9XG59XG4vL3RvIGhhbmRsZSBhbGwgdGhlIHNpbiBvcGVyYXRpb25zXG5mdW5jdGlvbiBzaW5Ucmlnb25vT3BlcmF0aW9ucyhjbGlja2VkSXRlbSwgdmFsdWUpIHtcbiAgICBzd2l0Y2ggKGNsaWNrZWRJdGVtKSB7XG4gICAgICAgIGNhc2UgXCJzaW5cIjpcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC5zaW4odmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzaW4taW5cIjpcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8PSAxICYmIHZhbHVlID49IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmFzaW4odmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJQbGVhc2UgZW50ZXIgdGhlIGlucHV0IGZyb20gLTEgdG8gMSAoUkFEKVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJzaW4taFwiOlxuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLnNpbmgodmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzaW4taC1pblwiOlxuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmFzaW5oKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG59XG4vL3RvIGhhbmRsZSBhbGwgdGhlIGNvcyBvcGVyYXRpb25zXG5mdW5jdGlvbiBjb3NUcmlnb25vT3BlcmF0aW9ucyhjbGlja2VkSXRlbSwgdmFsdWUpIHtcbiAgICBzd2l0Y2ggKGNsaWNrZWRJdGVtKSB7XG4gICAgICAgIGNhc2UgXCJjb3NcIjpcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC5jb3ModmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjb3MtaW5cIjpcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8PSAxICYmIHZhbHVlID49IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmFjb3ModmFsdWUpO1xuICAgICAgICAgICAgICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJQbGVhc2UgZW50ZXIgdGhlIGlucHV0IGZyb20gLTEgdG8gMSAoUkFEKVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNvcy1oXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IE1hdGguY29zaCh2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNvcy1oLWluXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IE1hdGguYWNvc2godmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0Q2hhckF0SW5wdXRGaWVsZChTdHJpbmcodmFsdWUpKTtcbn1cbi8vdG8gaGFuZGxlIGFsbCB0aGUgdGFuIG9wZXJhdGlvbnNcbmZ1bmN0aW9uIHRhblRyaWdvbm9PcGVyYXRpb25zKGNsaWNrZWRJdGVtLCB2YWx1ZSkge1xuICAgIHN3aXRjaCAoY2xpY2tlZEl0ZW0pIHtcbiAgICAgICAgY2FzZSBcInRhblwiOlxuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLnRhbih2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRhbi1pblwiOlxuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmF0YW4odmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0YW4taFwiOlxuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLnRhbmgodmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0YW4taC1pblwiOlxuICAgICAgICAgICAgaWYgKHZhbHVlIDw9IDEgJiYgdmFsdWUgPj0gLTEpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGguYXRhbmgodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKFwiUGxlYXNlIGVudGVyIHRoZSBpbnB1dCBmcm9tIC0xIHRvIDEgKFJBRClcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgc2hvd0VyckZvclNvbWVUaW1lKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0Q2hhckF0SW5wdXRGaWVsZChTdHJpbmcodmFsdWUpKTtcbn1cbi8vdG8gaGFuZGxlIGFsbCB0aGUgY29zZWMgb3BlcmF0aW9uXG5mdW5jdGlvbiBjc2NUcmlnb25vT3BlcmF0aW9ucyhjbGlja2VkSXRlbSwgdmFsdWUpIHtcbiAgICBzd2l0Y2ggKGNsaWNrZWRJdGVtKSB7XG4gICAgICAgIGNhc2UgXCJjc2NcIjpcbiAgICAgICAgICAgIHZhbHVlID0gMSAvIE1hdGguc2luKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY3NjLWluXCI6XG4gICAgICAgICAgICBpZiAodmFsdWUgPD0gMSAmJiB2YWx1ZSA+PSAtMSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gMSAvIE1hdGguYXNpbih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0Q2hhckF0SW5wdXRGaWVsZChTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dFcnJGb3JTb21lVGltZShcIlBsZWFzZSBlbnRlciB0aGUgaW5wdXQgZnJvbSAtMSB0byAxIChSQUQpXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY3NjLWhcIjpcbiAgICAgICAgICAgIHZhbHVlID0gMSAvIE1hdGguc2luaCh2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNzYy1oLWluXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLmFzaW5oKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG59XG4vL3RvIGhhbmRsZSBhbGwgdGhlIHNlYyBvcGVyYXRpb25zXG5mdW5jdGlvbiBzZWNUcmlnb25vT3BlcmF0aW9ucyhjbGlja2VkSXRlbSwgdmFsdWUpIHtcbiAgICBzd2l0Y2ggKGNsaWNrZWRJdGVtKSB7XG4gICAgICAgIGNhc2UgXCJzZWNcIjpcbiAgICAgICAgICAgIHZhbHVlID0gMSAvIE1hdGguY29zKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2VjLWluXCI6XG4gICAgICAgICAgICBpZiAodmFsdWUgPD0gMSAmJiB2YWx1ZSA+PSAtMSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gMSAvIE1hdGguYWNvcyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2V0Q2hhckF0SW5wdXRGaWVsZChTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dFcnJGb3JTb21lVGltZShcIlBsZWFzZSBlbnRlciB0aGUgaW5wdXQgZnJvbSAtMSB0byAxIChSQUQpXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2VjLWhcIjpcbiAgICAgICAgICAgIHZhbHVlID0gMSAvIE1hdGguY29zaCh2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInNlYy1oLWluXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLmFjb3NoKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHNob3dFcnJGb3JTb21lVGltZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldENoYXJBdElucHV0RmllbGQoU3RyaW5nKHZhbHVlKSk7XG59XG4vL3RvIGhhbmRsZSBhbGwgdGhlIGNvdCBvcGVyYXRpb25zXG5mdW5jdGlvbiBjb3RUcmlnb25vT3BlcmF0aW9ucyhjbGlja2VkSXRlbSwgdmFsdWUpIHtcbiAgICBzd2l0Y2ggKGNsaWNrZWRJdGVtKSB7XG4gICAgICAgIGNhc2UgXCJjb3RcIjpcbiAgICAgICAgICAgIHZhbHVlID0gMSAvIE1hdGgudGFuKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY290LWluXCI6XG4gICAgICAgICAgICB2YWx1ZSA9IDEgLyBNYXRoLmF0YW4odmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjb3QtaFwiOlxuICAgICAgICAgICAgdmFsdWUgPSAxIC8gTWF0aC50YW5oKHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY290LWgtaW5cIjpcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8PSAxICYmIHZhbHVlID49IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAxIC8gTWF0aC5hdGFuaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoXCJQbGVhc2UgZW50ZXIgdGhlIGlucHV0IGZyb20gLTEgdG8gMSAoUkFEKVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICBzaG93RXJyRm9yU29tZVRpbWUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRDaGFyQXRJbnB1dEZpZWxkKFN0cmluZyh2YWx1ZSkpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGZ1bmN0aW9uc18xID0gcmVxdWlyZShcIi4vZnVuY3Rpb25zXCIpO1xudmFyIGZsYWdGb3JUb2dnbGVCdG4gPSBmYWxzZTtcbnZhciBmbGFnRm9ySHlwQnRuID0gZmFsc2U7XG52YXIgbWVtb3J5U3RvcmVWYWx1ZXMgPSBbXTtcbnZhciBtYWluRGl2T2ZDYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbGN1bGF0b3ItZGl2XCIpO1xudmFyIHJlY3QgPSBtYWluRGl2T2ZDYWwgPT09IG51bGwgfHwgbWFpbkRpdk9mQ2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtYWluRGl2T2ZDYWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG52YXIgZHJhd2VyQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FsRGl2X2RyYXdlclwiKTtcbi8vdG8gYWRqdXN0IHRoZSBkcmF3ZXIgcG9zaXRpb24sIGlmIHJlc2l6ZSB3aW5kb3dcbmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJlY3QgPSBtYWluRGl2T2ZDYWwgPT09IG51bGwgfHwgbWFpbkRpdk9mQ2FsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtYWluRGl2T2ZDYWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgKDAsIGZ1bmN0aW9uc18xLmR5bmFtaWNTdHlsZURyYXdlcldpdGhEZWJvdW5jZSkoZHJhd2VyQ29udGVudCwgcmVjdCk7XG59KTtcbnZhciBtUmVjYWxsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtLXJlY2FsbFwiKTtcbnZhciBtQ2xlYXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm0tY2xlYXJcIik7XG4vL2VuYWJsZSBvciBkaXNhYmxlIHRoZSBidG5cbigwLCBmdW5jdGlvbnNfMS5idXR0b25WaXNpYmlsaXR5SGFuZGxlcikobVJlY2FsbEJ0biwgbUNsZWFyQnRuKTtcbi8vZmFjdG9yaWFsIG1ldGhvZCBvbiBOdW1iZXJcbk51bWJlci5wcm90b3R5cGUuZmFjdG9yaWFsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzID4gMCA/IHRoaXMgKiAodGhpcyAtIDEpLmZhY3RvcmlhbCh0aGlzKSA6IDE7IC8vZmFjdG9yaWFsIGxvZ2ljXG59O1xuLy9zZXQgaW5pdGlhbCB2YWx1ZSBpbiB0aGUgaW5wdXQgZmllbGQgZW1wdHkgb3IgZXhpc3RpbmdcbmlmIChmdW5jdGlvbnNfMS5pbnB1dEZpZWxkICE9IHVuZGVmaW5lZCkge1xuICAgIGZ1bmN0aW9uc18xLmlucHV0RmllbGQudmFsdWUgPSAoMCwgZnVuY3Rpb25zXzEuZ2V0VmFsdWVGcm9tTG9jYWwpKFwiY2FsU3RyaW5nXCIpO1xufVxuLy9vbmx5IG9uZSBtYWluIGV2ZW50IGxpc3RlbmVyIGZvciBhbGwgdGhlIGJ0biAoZXZlbnQgZGVsZWdhdGlvbilcbm1haW5EaXZPZkNhbCA9PT0gbnVsbCB8fCBtYWluRGl2T2ZDYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG1haW5EaXZPZkNhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgX2E7XG4gICAgLy9jdXJyZW50VGFyZ2V0IC0tPiBlbGVtZW50IHRoYXQgdGhlIGxpc3RlbmVyIHdhcyBib3VuZCB0by5cbiAgICAvL3RhcmdldCAtLT4gb24gd2UgZG8gYWN0dWFsbHkgY2xpY2tcbiAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldClcbiAgICAgICAgcmV0dXJuO1xuICAgIC8vZ2V0dGluZyBzdG9yZWQgdmFsdWVzXG4gICAgdmFyIHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UgPSAoMCwgZnVuY3Rpb25zXzEuZ2V0VmFsdWVGcm9tTG9jYWwpKFwiY2FsU3RyaW5nXCIpO1xuICAgIHZhciBzdG9yZWROdW1iZXJPdXRwdXQgPSAoMCwgZnVuY3Rpb25zXzEuZ2V0VmFsdWVGcm9tTG9jYWwpKFwic3RvcmVkTnVtXCIpO1xuICAgIGlmIChzdG9yZWROdW1iZXJPdXRwdXQgPT09IFwiXCIpXG4gICAgICAgICgwLCBmdW5jdGlvbnNfMS5zZXRWYWx1ZUluTG9jYWwpKFwic3RvcmVkTnVtXCIsIFwiMFwiKTtcbiAgICAvL2dldHRpbmcgdGhlIGlkIG9mIGNsaWNrZWQgZWxlXG4gICAgdmFyIGNsaWNrZWRJdGVtID0gKF9hID0gZS50YXJnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZDtcbiAgICBpZiAoY2xpY2tlZEl0ZW0gPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgc3dpdGNoIChjbGlja2VkSXRlbSkge1xuICAgICAgICBjYXNlICgwLCBmdW5jdGlvbnNfMS5pc09wZXJhdGlvblByZXNlbnQpKGNsaWNrZWRJdGVtKTpcbiAgICAgICAgICAgIGlmIChjbGlja2VkSXRlbSA9PT0gXCJsb2cxXCIgfHwgY2xpY2tlZEl0ZW0gPT09IFwibG9nMlwiKSB7XG4gICAgICAgICAgICAgICAgY2xpY2tlZEl0ZW0gPSBcImxvZ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnNpbXBsZUNhbGN1bGF0aW9uKShjbGlja2VkSXRlbSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm0tcGx1c1wiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmFkZFRoZVZhbHVlVG9NZW1vcnkpKCk7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuYnV0dG9uVmlzaWJpbGl0eUhhbmRsZXIpKG1SZWNhbGxCdG4sIG1DbGVhckJ0bik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm0tbWludXNcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5yZW1vdmVUaGVWYWx1ZUZyb21NZW1vcnkpKCk7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuYnV0dG9uVmlzaWJpbGl0eUhhbmRsZXIpKG1SZWNhbGxCdG4sIG1DbGVhckJ0bik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm0tY2xlYXJcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5zZXRWYWx1ZUluTG9jYWwpKFwic3RvcmVkTnVtXCIsIFN0cmluZygwKSk7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc2V0VmFsdWVJbkxvY2FsKShcInN0b3JlZE51bXNcIiwgXCJcIik7XG4gICAgICAgICAgICBtZW1vcnlTdG9yZVZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmJ1dHRvblZpc2liaWxpdHlIYW5kbGVyKShtUmVjYWxsQnRuLCBtQ2xlYXJCdG4pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtLXJlY2FsbFwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnJlY2FsbFRoZVZhbHVlRnJvbU1lbW9yeSkoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibS1zdG9yZVwiOlxuICAgICAgICAgICAgbWVtb3J5U3RvcmVWYWx1ZXMucHVzaCgoMCwgZnVuY3Rpb25zXzEuZ2V0VmFsdWVGcm9tTG9jYWwpKFwiY2FsU3RyaW5nXCIpKTtcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5zZXRWYWx1ZUluTG9jYWwpKFwic3RvcmVkTnVtc1wiLCBTdHJpbmcobWVtb3J5U3RvcmVWYWx1ZXMpKTtcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5idXR0b25WaXNpYmlsaXR5SGFuZGxlcikobVJlY2FsbEJ0biwgbUNsZWFyQnRuKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibS1zaG93XCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuZHluYW1pY1N0eWxlRHJhd2VyKShkcmF3ZXJDb250ZW50LCByZWN0KTtcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5kcmF3ZXJTaG93KShkcmF3ZXJDb250ZW50KTtcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5zaG93U3RvcmVkTnVtYmVycykoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZHJhd2VyLWNsb3NlXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuZHJhd2VyQ2xvc2UpKGRyYXdlckNvbnRlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmUtbnVtc1wiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnJlbW92ZU51bWJlcnMpKCk7XG4gICAgICAgICAgICBtZW1vcnlTdG9yZVZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmJ1dHRvblZpc2liaWxpdHlIYW5kbGVyKShtUmVjYWxsQnRuLCBtQ2xlYXJCdG4pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCI9XCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuY2FsY3VsYXRpb25PZlNpbXBsZUNhbCkoc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlbW92ZS1jaGFyXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEucmVtb3ZlQ2hhckZyb21DYWwpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZXNldC1jaGFyXCI6XG4gICAgICAgICAgICBzdHJpbmdGcm9tTG9jYWxTdG9yYWdlID0gXCIwXCI7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc2V0Q2hhckF0SW5wdXRGaWVsZCkoc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIjEwc3FcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5wb3dlckFuZFJvb3RDYWwpKFwiMTBcIiwgXCIxXCIsIHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzcXJ0XCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEucG93ZXJBbmRSb290Q2FsKShzdHJpbmdGcm9tTG9jYWxTdG9yYWdlLCBcIjJcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNicnRcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5wb3dlckFuZFJvb3RDYWwpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UsIFwiM1wiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiMS94XCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc3RyaW5nUHJlQWRkZXIpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UsIFwiMS9cIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIjIqKlwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnN0cmluZ1ByZUFkZGVyKShzdHJpbmdGcm9tTG9jYWxTdG9yYWdlLCBcIjIqKlwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWJzMVwiOlxuICAgICAgICBjYXNlIFwiYWJzMlwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmFic0NhbCkoc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJhbmRvbS1udW1cIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5yYW5kb21OdW1iZXJHZW5lcmF0b3IpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJmbG9vclwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmZsb29yTnVtYmVyQ2FsKShzdHJpbmdGcm9tTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY2VsaVwiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmNlbGlOdW1iZXJDYWwpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ1bml0LW9mLWFuZ2xlXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuY2hhbmdlSW5Vbml0T2ZBbmdsZSkoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZS1zcS14XCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc3RyaW5nUHJlQWRkZXIpKHN0cmluZ0Zyb21Mb2NhbFN0b3JhZ2UsIFwiZSoqXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlKipcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5zdHJpbmdQcmVBZGRlcikoc3RyaW5nRnJvbUxvY2FsU3RvcmFnZSwgXCJlKipcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRvLWV4cG9cIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS50b0V4cG9uZW50aWFsQ29udmVydCkoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicGx1cy1taW51c1wiOlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmNoYW5nZVRoZVZhbHVlKSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkbXNcIjpcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5kZWdUb0RtcykoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZGVnXCI6XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuaW5wdXRUb0RlZykoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2Vjb25kLWZuLVRyaWdvbm9cIjpcbiAgICAgICAgICAgIGlmIChmbGFnRm9ySHlwQnRuKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYnRuc09mVHJpZ29ubyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0cmlnb25vLWJ0blwiKTtcbiAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5jaGFuZ2VCdXR0b25Db2xvcikoZS50YXJnZXQpO1xuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLnNlY29uZEJ0blNob3cpKGJ0bnNPZlRyaWdvbm8pO1xuICAgICAgICAgICAgZmxhZ0ZvclRvZ2dsZUJ0biA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICA/IChmbGFnRm9yVG9nZ2xlQnRuID0gdHJ1ZSlcbiAgICAgICAgICAgICAgICA6IChmbGFnRm9yVG9nZ2xlQnRuID0gZmFsc2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzZWNvbmQtZm4tVHJpZ29uby1oXCI6XG4gICAgICAgICAgICBpZiAoZmxhZ0ZvclRvZ2dsZUJ0bikge1xuICAgICAgICAgICAgICAgIHZhciBidG5PZkhUcmlnb25vSW52ZXJzZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0cmlnb25vLWgtaW52XCIpO1xuICAgICAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5jaGFuZ2VCdXR0b25Db2xvcikoZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5zZWNvbmRCdG5TaG93KShidG5PZkhUcmlnb25vSW52ZXJzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYnRuT2ZIVHJpZ29ubyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0cmlnb25vLWgtYnRuXCIpO1xuICAgICAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5jaGFuZ2VCdXR0b25Db2xvcikoZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICgwLCBmdW5jdGlvbnNfMS5zZWNvbmRCdG5TaG93KShidG5PZkhUcmlnb25vKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZsYWdGb3JIeXBCdG4gPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgPyAoZmxhZ0Zvckh5cEJ0biA9IHRydWUpXG4gICAgICAgICAgICAgICAgOiAoZmxhZ0Zvckh5cEJ0biA9IGZhbHNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic2Vjb25kLWZuXCI6XG4gICAgICAgICAgICB2YXIgYWxsQnRuRm9yVG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIjJuZC10b2dnbGUtYnRuXCIpO1xuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmNoYW5nZUJ1dHRvbkNvbG9yKShlLnRhcmdldCk7XG4gICAgICAgICAgICAoMCwgZnVuY3Rpb25zXzEuc2Vjb25kQnRuU2hvdykoYWxsQnRuRm9yVG9nZ2xlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgKDAsIGZ1bmN0aW9uc18xLmlzVHJpZ29ub0NhbCkoY2xpY2tlZEl0ZW0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=