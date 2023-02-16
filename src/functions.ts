type constantArr<T> = Readonly<T[]>;
//array to check the operations
const arrayOfOperations: constantArr<string> = [
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
const trigonoOperations: constantArr<string> = [
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

let unitOfAngle: string = "DEG";

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
  const result: string | null = localStorage.getItem(key);
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
  let string: string = getValueFromLocal("calString");
  if (string.charAt(0) === "0" && string.charAt(1) !== "0")
    string = string.substring(1);
  string += value;
  setCharAtInputField(string);
}

//going to fire on = click
export function calculationOfSimpleCal(stringFromLocalStorage: string): void {
  stringCalHandler(stringFromLocalStorage);
}

//main fn to handle the all cal logics
function stringCalHandler(str: string): void {
  try {
    str = str?.replaceAll("!", '["factorial"]()');
    str = str?.replaceAll("e", "2.7182");
    str = str?.replaceAll("π", "3.14");
    if (str?.includes("rt")) {
      customRootCal(str);
      return;
    } else if (str.includes("log")) {
      logCal(str, 10);
      return;
    } else if (str.includes("ln")) {
      logCal(str, 2.7182);
      return;
    }
    str = eval(str);
    setCharAtInputField(str);
  } catch (err) {
    showErrForSomeTime("Invalid Input!");
  }
}

//custom root fn logic
function customRootCal(str: string): void {
  const firstNumber: string = str.slice(0, str.indexOf("rt"));
  const secondNumber: string = str.slice(str.indexOf("rt") + 2, str.length);
  let result: string = "";
  try {
    result = eval(`${Number(secondNumber) ** (1 / Number(firstNumber))}`);
  } catch (err) {
    showErrForSomeTime();
  }
  if (isNaN(Number(result))) showErrForSomeTime("Invalid Input!");
  setCharAtInputField(result);
}

//log cal fn with diff. bases logic
function logCal(str: string, base: number): void {
  let result: number = 0;
  if (str.indexOf("g") !== -1 && !str.includes("(")) {
    result =
      Math.log(Number(str.slice(str.indexOf("g") + 1, str.length))) /
      Math.log(base);
  } else if (str.includes("(") && str.includes(")")) {
    const customBase: string = str.slice(
      str.indexOf("(") + 1,
      str.indexOf(")")
    );
    const value: string = str.slice(str.indexOf("g") + 1, str.indexOf("("));
    result = Math.log(Number(value)) / Math.log(Number(customBase));
  } else {
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
export function removeCharFromCal(string: string): void {
  string = string?.substring(0, string.length - 1);
  setCharAtInputField(string);
}

//fn to set the string in the input field
export function setCharAtInputField(string: string): void {
  if (inputField == undefined) return;
  setValueInLocal("calString", string);
  inputField.value = string;
}

//diff. square and root combination fn logic
export function powerAndRootCal(
  string: string,
  power: string = "1",
  factor: string = "1"
): void {
  const output: number = Number(factor) / Number(power);
  const result: number = Math.pow(Number(string), output);
  if (isNaN(result)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(result));
}

//abs cal logic
export function absCal(string: string): void {
  const output: number = Math.abs(Number(string));
  if (isNaN(output)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(output));
}

//random number gen with below input value
export function randomNumberGenerator(string: string): void {
  const randomNumber: number = Math.floor(Math.random() * Number(string));
  if (isNaN(randomNumber)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(randomNumber));
}

//cal floorN from input
export function floorNumberCal(string: string): void {
  const newRoundOfNumber: number = Math.floor(Number(string));
  if (isNaN(newRoundOfNumber)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(newRoundOfNumber));
}

//cal celiN from input
export function celiNumberCal(string: string): void {
  const newCeliNumber: number = Math.ceil(Number(string));
  if (isNaN(newCeliNumber)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(String(newCeliNumber));
}

//append the string at start
export function stringPreAdder(string: string, addString: string): void {
  string = addString + string;
  setCharAtInputField(string);
}

//=== stored memory cal fn ===
export function addTheValueToMemory(): void {
  const string: string = getValueFromLocal("calString");
  const storedNum: string = getValueFromLocal("storedNum");
  const value: number = Number(string) + Number(storedNum);
  if (isNaN(value)) {
    showErrForSomeTime("Invalid Input!");
    return;
  }
  setValueInLocal("storedNum", String(value));
}

//minus the value from the stored
export function removeTheValueFromMemory(): void {
  const string: string = getValueFromLocal("calString");
  const storedNum: string = getValueFromLocal("storedNum");
  const value: number = Number(storedNum) - Number(string);
  if (isNaN(value)) {
    showErrForSomeTime("Invalid Input!");
    return;
  }
  setValueInLocal("storedNum", String(value));
}

//show the output of cal (stored num)
export function recallTheValueFromMemory(): void {
  const string: string = getValueFromLocal("storedNum");
  setCharAtInputField(string);
}

//error handling function
function showErrForSomeTime(string: string = "Invalid Input !"): void {
  const errorDiv: HTMLElement | null = document.getElementById("error-div");
  if (errorDiv == undefined) return;
  errorDiv.innerHTML = string;
  setTimeout(() => {
    errorDiv.innerHTML = "";
  }, 5000);
}

// === drawer and related to that fns ===
export function dynamicStyleDrawer(
  drawerContent: HTMLDivElement | undefined,
  rect: DOMRect | undefined
): void {
  if (drawerContent == undefined || rect == undefined) return;
  drawerContent.style.bottom = `calc(100% - ${rect.bottom}px)`;
  drawerContent.style.height = `${rect.height * 0.65}px`;
  drawerContent.style.width = `${rect.width}px`;
}

//debounce polyfill
function myDebounce(cb: Function, d: number): Function {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: HTMLDivElement[] | DOMRect[]) {
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
  const arrayOfNumbers: string[] = getValueFromLocal("storedNums")?.split(",");
  const errMsg: HTMLElement | null = document.getElementById("empty-msg");
  let flagForMsg: Boolean = false;
  if (arrayOfNumbers[0] == "") flagForMsg = true;
  if (errMsg != undefined) {
    flagForMsg
      ? (errMsg.innerText = "There's is nothing saved in your memory")
      : (errMsg.innerText = "");
  }
  const storedDiv: Element | null = document.querySelector(".calDiv__numsDiv");
  if (storedDiv == undefined) return;
  if (storedDiv.firstChild) {
    storedDiv.textContent = "";
  }
  const child: string[] = arrayOfNumbers?.map(number => {
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
  const storedDiv: Element | null = document.querySelector(".calDiv__numsDiv");
  const errMsg: HTMLElement | null = document.getElementById("empty-msg");
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
function changeTheUnitInHtml(string: string): void {
  const unitOfAngleBtn = document.getElementById("unit-of-angle") as
    | HTMLButtonElement
    | undefined;
  if (unitOfAngleBtn == undefined) return;
  unitOfAngleBtn.innerHTML = string;
}

export function toExponentialConvert(): void {
  const string: string = getValueFromLocal("calString");
  const expoNum: string = Number.parseFloat(string).toExponential();
  if (isNaN(Number(expoNum))) {
    showErrForSomeTime("Invalid Input!");
    return;
  }
  setCharAtInputField(expoNum);
}

//change the value plus to minus or minus to plus
export function changeTheValue(): void {
  let value: string = getValueFromLocal("calString");
  if (value.charAt(0) === "-") {
    value = value.substring(1, value.length);
  } else {
    value = "-" + value;
  }
  setCharAtInputField(value);
}

//degree to dms
export function degToDms(): void {
  const string: string = getValueFromLocal("calString");
  const deg: number = Number(string);
  if (unitOfAngle === "DEG" || isNaN(Number(deg))) {
    showErrForSomeTime("Please enter the input in DEG with numbers!");
    return;
  }
  let d: number = Math.floor(deg);
  const minfloat: number = (deg - d) * 60;
  let m: number = Math.floor(minfloat);
  const secfloat: number = (minfloat - m) * 60;
  let s: number = Math.round(secfloat);
  // After rounding, the seconds might become 60.
  if (s === 60) {
    m++;
    s = 0;
  }
  if (m === 60) {
    d++;
    m = 0;
  }
  const output: string = "" + d + ":" + m + ":" + s;
  setCharAtInputField(output);
}

//radian, grade to deg
export function inputToDeg(): void {
  const stringFromLocal: string = getValueFromLocal("calString");
  let value: number = Number(stringFromLocal);
  if (unitOfAngle === "DEG") {
    return;
  } else if (unitOfAngle === "RAD") {
    value = value * (180 / Math.PI);
  } else if (unitOfAngle === "GRAD") {
    value = value / 0.0157;
  }
  if (isNaN(value)) {
    showErrForSomeTime("Please enter Numbers!");
    return;
  }
  setCharAtInputField(String(value));
}

//operation is Trigono or not
export function isTrigonoCal(clickedItem: string): void {
  trigonoOperations.includes(clickedItem)
    ? trigonoOperationHandler(clickedItem)
    : "";
}

//to handle all the trigonometry operations
function trigonoOperationHandler(clickedItem: string): void {
  const stringFromLocal: string = getValueFromLocal("calString");
  let value: number = Number(stringFromLocal);
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
