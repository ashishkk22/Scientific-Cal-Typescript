type ConstantArr<TOperator> = Readonly<TOperator[]>;
type Angle = "DEG" | "RAD" | "GRAD";
type debounceInput = HTMLDivElement[] | DOMRect[];
//array to check the operations
const arrayOfOperations: ConstantArr<string> = [
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
const trigonoOperations: ConstantArr<string> = [
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

let unitOfAngle: Angle = "DEG";

export const inputField = document.querySelector("textarea") as
  | HTMLTextAreaElement
  | undefined;

//==== local storage related fn ==== //

//set and get the data from the local storage
export function setValueInLocal(key: string, value: string): void {
  localStorage.setItem(key, value);
}

//get the values from the local storage
export function getValueFromLocal(key: string): string {
  const result = localStorage.getItem(key);
  if (!result) {
    setValueInLocal(key, "");
    return "";
  }
  return result;
}

//visibility of btn based on the memory
export function buttonVisibilityHandler(
  mRecallBtn: HTMLButtonElement | undefined,
  mClearBtn: HTMLButtonElement | undefined
): void {
  if (mRecallBtn == undefined || mClearBtn == undefined) return;
  if (
    getValueFromLocal("storedNum") === "0" &&
    getValueFromLocal("storedNums") === ""
  ) {
    mRecallBtn.disabled = true;
    mClearBtn.disabled = true;
  } else {
    mRecallBtn.disabled = false;
    mClearBtn.disabled = false;
  }
}

//basic operation is present of not
export function isOperationPresent(clickedItem: string): string {
  return arrayOfOperations.includes(clickedItem) ? clickedItem : "#";
}

//fn that is going to just add the operation in the string
export function simpleCalculation(value: string): void {
  let valueFromLocal = getValueFromLocal("calString");
  if (valueFromLocal.charAt(0) === "0" && valueFromLocal.charAt(1) !== "0")
    valueFromLocal = valueFromLocal.substring(1);
  valueFromLocal += value;
  setCharAtInputField(valueFromLocal);
}

//going to fire on = click
export function calculationOfSimpleCal(stringFromLocalStorage: string): void {
  stringCalHandler(stringFromLocalStorage);
}

//main fn to handle the all cal logics
function stringCalHandler(inputStr: string): void {
  try {
    inputStr = inputStr?.replaceAll("!", '["factorial"]()');
    inputStr = inputStr?.replaceAll("e", "2.7182");
    inputStr = inputStr?.replaceAll("π", "3.14");
    if (inputStr?.includes("rt")) {
      customRootCal(inputStr);
      return;
    } else if (inputStr.includes("log")) {
      logCal(inputStr, 10);
      return;
    } else if (inputStr.includes("ln")) {
      logCal(inputStr, 2.7182);
      return;
    }
    inputStr = eval(inputStr);
    setCharAtInputField(inputStr);
  } catch (err) {
    showErrForSomeTime("Invalid Input!");
  }
}

//custom root fn logic
function customRootCal(inputStr: string): void {
  const firstNumber = inputStr.slice(0, inputStr.indexOf("rt"));
  const secondNumber = inputStr.slice(
    inputStr.indexOf("rt") + 2,
    inputStr.length
  );
  let result = "";
  try {
    result = eval(`${Number(secondNumber) ** (1 / Number(firstNumber))}`);
  } catch (err) {
    showErrForSomeTime();
  }
  if (isNaN(Number(result))) showErrForSomeTime("Invalid Input!");
  setCharAtInputField(result);
}

//log cal fn with diff. bases logic
function logCal(inputStr: string, base: number): void {
  let result = 0;
  if (inputStr.indexOf("g") !== -1 && !inputStr.includes("(")) {
    result =
      Math.log(
        Number(inputStr.slice(inputStr.indexOf("g") + 1, inputStr.length))
      ) / Math.log(base);
  } else if (inputStr.includes("(") && inputStr.includes(")")) {
    const customBase = inputStr.slice(
      inputStr.indexOf("(") + 1,
      inputStr.indexOf(")")
    );
    const value = inputStr.slice(
      inputStr.indexOf("g") + 1,
      inputStr.indexOf("(")
    );
    result = Math.log(Number(value)) / Math.log(Number(customBase));
  } else {
    result =
      Math.log(
        Number(inputStr.slice(inputStr.indexOf("n") + 1, inputStr.length))
      ) / Math.log(base);
  }
  if (isNaN(result)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(result));
}

//backspace btn logic to remove last char
export function removeCharFromCal(inputStr: string): void {
  inputStr = inputStr?.substring(0, inputStr.length - 1);
  setCharAtInputField(inputStr);
}

//fn to set the string in the input field
export function setCharAtInputField(inputVal: string): void {
  if (inputField == undefined) return;
  setValueInLocal("calString", inputVal);
  inputField.value = inputVal;
}

//diff. square and root combination fn logic
export function powerAndRootCal(
  inputStr: string,
  power = "1",
  factor = "1"
): void {
  const output = Number(factor) / Number(power);
  const result = Math.pow(Number(inputStr), output);
  if (isNaN(result)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(result));
}

//abs cal logic
export function absCal(inputStr: string): void {
  const output = Math.abs(Number(inputStr));
  if (isNaN(output)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(output));
}

//random number gen with below input value
export function randomNumberGenerator(rangeStr: string): void {
  const randomNumber = Math.floor(Math.random() * Number(rangeStr));
  if (isNaN(randomNumber)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(randomNumber));
}

//cal floorN from input
export function floorNumberCal(inputStr: string): void {
  const newRoundOfNumber = Math.floor(Number(inputStr));
  if (isNaN(newRoundOfNumber)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(newRoundOfNumber));
}

//cal celiN from input
export function celiNumberCal(inputStr: string): void {
  const newCeliNumber: number = Math.ceil(Number(inputStr));
  if (isNaN(newCeliNumber)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(newCeliNumber));
}

//append the string at start
export function stringPreAdder(inputStr: string, addString: string): void {
  inputStr = addString + inputStr;
  setCharAtInputField(inputStr);
}

//=== stored memory cal fn ===
export function addTheValueToMemory(): void {
  const valueFromLocal = getValueFromLocal("calString");
  const storedNum = getValueFromLocal("storedNum");
  const value = Number(valueFromLocal) + Number(storedNum);
  if (isNaN(value)) {
    showErrForSomeTime("Invalid Input!");
    return;
  }
  setValueInLocal("storedNum", String(value));
}

//minus the value from the stored
export function removeTheValueFromMemory(): void {
  const valFromLocal = getValueFromLocal("calString");
  const storedNum = getValueFromLocal("storedNum");
  const value = Number(storedNum) - Number(valFromLocal);
  if (isNaN(value)) {
    showErrForSomeTime("Invalid Input!");
    return;
  }
  setValueInLocal("storedNum", String(value));
}

//show the output of cal (stored num)
export function recallTheValueFromMemory(): void {
  const valFromLocal = getValueFromLocal("storedNum");
  setCharAtInputField(valFromLocal);
}

//error handling function
function showErrForSomeTime(inputErrStr = "Invalid Input !"): void {
  const errorDiv = document.getElementById("error-div");
  if (errorDiv == undefined) return;
  errorDiv.innerHTML = inputErrStr;
  setTimeout(() => {
    errorDiv.innerHTML = "";
  }, 5000);
}

// === drawer and related to that fns ===

//debounce polyfill
function myDebounce(cb: Function, d: number): Function {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: debounceInput) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, d);
  };
}
export const dynamicStyleDrawerWithDebounce: Function = myDebounce(
  (drawerContent: HTMLDivElement | undefined, rect: DOMRect | undefined) => {
    dynamicStyleDrawer(drawerContent, rect);
  },
  1000
);

export function dynamicStyleDrawer(
  drawerContent: HTMLDivElement | undefined,
  rect: DOMRect | undefined
): void {
  if (drawerContent == undefined || rect == undefined) return;
  drawerContent.style.bottom = `calc(100% - ${rect.bottom}px)`;
  drawerContent.style.height = `${rect.height * 0.65}px`;
  drawerContent.style.width = `${rect.width}px`;
}

export function drawerShow(drawerContent: HTMLDivElement | undefined): void {
  if (drawerContent == undefined) return;
  drawerContent.style.display = "inline";
}

export function drawerClose(drawerContent: HTMLDivElement | undefined): void {
  if (drawerContent == undefined) return;
  drawerContent.style.display = "none";
}

//show the stored nums with child append
export function showStoredNumbers(): void {
  const arrayOfNumbers = getValueFromLocal("storedNums")?.split(",");
  const errMsg = document.getElementById("empty-msg");
  let flagForMsg: Boolean = false;
  if (arrayOfNumbers[0] == "") flagForMsg = true;
  if (errMsg != undefined) {
    flagForMsg
      ? (errMsg.innerText = "There's is nothing saved in your memory")
      : (errMsg.innerText = "");
  }
  const storedDiv = document.querySelector(".calDiv__numsDiv");
  if (storedDiv == undefined) return;
  if (storedDiv.firstChild) {
    storedDiv.textContent = "";
  }
  const child = arrayOfNumbers?.map(number => {
    return `<p class="me-3 h5" > ${number} </p>`;
  });
  if (child != undefined) {
    for (const i of child) {
      storedDiv.insertAdjacentHTML("beforeend", i);
    }
  }
}

//remove number from the ui and memory
export function removeNumbers(): void {
  const storedDiv = document.querySelector(".calDiv__numsDiv");
  const errMsg = document.getElementById("empty-msg");
  if (errMsg == undefined) return;
  if (storedDiv?.firstChild) {
    storedDiv.textContent = "";
  }
  errMsg.innerText = "There's is nothing saved in your memory";
  setValueInLocal("storedNums", "");
}

//== change in btn UI functions ==//

//fn that changes color
export function changeButtonColor(btn: EventTarget | null): void {
  if (btn == undefined) return;
  if (btn instanceof HTMLButtonElement) {
    btn.classList.toggle("calDiv__btn--blue");
  }
}

//fn that show second btn that are hidden on click event
export function secondBtnShow(
  allBtnForToggle: HTMLCollectionOf<Element>,
  classOne: string = "d-inline",
  classTwo: string = "d-none"
): void {
  Array.from(allBtnForToggle).map(visibleBtn => {
    //visibleBtn ==> element from DOMTokenList
    if (visibleBtn.classList.contains(classOne)) {
      visibleBtn.classList.toggle(classTwo);
    } else {
      visibleBtn.classList.toggle(classTwo);
    }
  });
}

//unit changing in the cal with clicks logic
export function changeInUnitOfAngle(): void {
  if (unitOfAngle === "DEG") {
    unitOfAngle = "RAD";
    changeTheUnitInHtml("RAD");
  } else if (unitOfAngle === "RAD") {
    unitOfAngle = "GRAD";
    changeTheUnitInHtml("GRAD");
  } else if (unitOfAngle === "GRAD") {
    unitOfAngle = "DEG";
    changeTheUnitInHtml("DEG");
  }
}

//based on the string changing html value
function changeTheUnitInHtml(unitStr: string): void {
  const unitOfAngleBtn = document.getElementById("unit-of-angle") as
    | HTMLButtonElement
    | undefined;
  if (unitOfAngleBtn == undefined) return;
  unitOfAngleBtn.innerHTML = unitStr;
}

export function toExponentialConvert(): void {
  const valFromLocal = getValueFromLocal("calString");
  const expoNum = Number.parseFloat(valFromLocal).toExponential();
  if (isNaN(Number(expoNum))) {
    showErrForSomeTime("Invalid Input!");
    return;
  }
  setCharAtInputField(expoNum);
}

//change the value plus to minus or minus to plus
export function changeTheValue(): void {
  let valueFromLocal = getValueFromLocal("calString");
  if (valueFromLocal.charAt(0) === "-") {
    valueFromLocal = valueFromLocal.substring(1, valueFromLocal.length);
  } else {
    valueFromLocal = "-" + valueFromLocal;
  }
  setCharAtInputField(valueFromLocal);
}

//degree to dms
export function degToDms(): void {
  const valueFromLocal = getValueFromLocal("calString");
  const deg = Number(valueFromLocal);
  if (unitOfAngle === "DEG" || isNaN(Number(deg))) {
    showErrForSomeTime("Please enter the input in DEG with numbers!");
    return;
  }
  let d = Math.floor(deg);
  const minfloat = (deg - d) * 60;
  let m = Math.floor(minfloat);
  const secfloat = (minfloat - m) * 60;
  let s = Math.round(secfloat);
  // After rounding, the seconds might become 60.
  if (s === 60) {
    m++;
    s = 0;
  }
  if (m === 60) {
    d++;
    m = 0;
  }
  const output = "" + d + ":" + m + ":" + s;
  setCharAtInputField(output);
}

//radian, grade to deg
export function inputToDeg(): void {
  const stringFromLocal = getValueFromLocal("calString");
  let valueFromLocal = Number(stringFromLocal);
  if (unitOfAngle === "DEG") {
    return;
  } else if (unitOfAngle === "RAD") {
    valueFromLocal = valueFromLocal * (180 / Math.PI);
  } else if (unitOfAngle === "GRAD") {
    valueFromLocal = valueFromLocal / 0.0157;
  }
  if (isNaN(valueFromLocal)) {
    showErrForSomeTime("Please enter Numbers!");
    return;
  }
  setCharAtInputField(String(valueFromLocal));
}

//operation is Trigono or not
export function isTrigonoCal(clickedItem: string): void {
  trigonoOperations.includes(clickedItem)
    ? trigonoOperationHandler(clickedItem)
    : "";
}

//to handle all the trigonometry operations
function trigonoOperationHandler(clickedItem: string): void {
  const stringFromLocal = getValueFromLocal("calString");
  let value = Number(stringFromLocal);
  if (unitOfAngle === "DEG") {
    //converting degree to radian
    value = value * (Math.PI / 180);
  } else if (unitOfAngle === "GRAD") {
    //1 Gradians to Radians = 0.0157
    value = value * 0.0157;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  if (clickedItem.includes("sin")) {
    sinTrigonoOperations(clickedItem, value);
  } else if (clickedItem.includes("cos")) {
    cosTrigonoOperations(clickedItem, value);
  } else if (clickedItem.includes("tan")) {
    tanTrigonoOperations(clickedItem, value);
  } else if (clickedItem.includes("csc")) {
    cscTrigonoOperations(clickedItem, value);
  } else if (clickedItem.includes("sec")) {
    secTrigonoOperations(clickedItem, value);
  } else if (clickedItem.includes("cot")) {
    cotTrigonoOperations(clickedItem, value);
  }
}

//to handle all the sin operations
function sinTrigonoOperations(clickedItem: string, value: number): void {
  switch (clickedItem) {
    case "sin":
      value = Math.sin(value);
      break;
    case "sin-in":
      if (value <= 1 && value >= -1) {
        value = Math.asin(value);
        setCharAtInputField(String(value));
      } else {
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
function cosTrigonoOperations(clickedItem: string, value: number): void {
  switch (clickedItem) {
    case "cos":
      value = Math.cos(value);
      break;
    case "cos-in":
      if (value <= 1 && value >= -1) {
        value = Math.acos(value);
        setCharAtInputField(String(value));
      } else {
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
function tanTrigonoOperations(clickedItem: string, value: number): void {
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
      } else {
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
function cscTrigonoOperations(clickedItem: string, value: number): void {
  switch (clickedItem) {
    case "csc":
      value = 1 / Math.sin(value);
      break;
    case "csc-in":
      if (value <= 1 && value >= -1) {
        value = 1 / Math.asin(value);
        setCharAtInputField(String(value));
      } else {
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
function secTrigonoOperations(clickedItem: string, value: number): void {
  switch (clickedItem) {
    case "sec":
      value = 1 / Math.cos(value);
      break;
    case "sec-in":
      if (value <= 1 && value >= -1) {
        value = 1 / Math.acos(value);
        setCharAtInputField(String(value));
      } else {
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
function cotTrigonoOperations(clickedItem: string, value: number): void {
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
      } else {
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
