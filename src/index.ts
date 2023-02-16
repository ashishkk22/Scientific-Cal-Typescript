import {
  absCal,
  addTheValueToMemory,
  buttonVisibilityHandler,
  calculationOfSimpleCal,
  celiNumberCal,
  changeButtonColor,
  changeInUnitOfAngle,
  changeTheValue,
  degToDms,
  drawerClose,
  drawerShow,
  dynamicStyleDrawer,
  dynamicStyleDrawerWithDebounce,
  floorNumberCal,
  getValueFromLocal,
  inputField,
  inputToDeg,
  isOperationPresent,
  isTrigonoCal,
  powerAndRootCal,
  randomNumberGenerator,
  recallTheValueFromMemory,
  removeCharFromCal,
  removeNumbers,
  removeTheValueFromMemory,
  secondBtnShow,
  setCharAtInputField,
  setValueInLocal,
  showStoredNumbers,
  simpleCalculation,
  stringPreAdder,
  toExponentialConvert,
} from "./functions";
let flagForToggleBtn: boolean = false;
let flagForHypBtn: boolean = false;
let memoryStoreValues: string[] = [];

const mainDivOfCal = document.getElementById("calculator-div") as
  | HTMLDivElement
  | undefined;
let rect: DOMRect | undefined = mainDivOfCal?.getBoundingClientRect();
const drawerContent = document.querySelector(".calDiv_drawer") as
  | HTMLDivElement
  | undefined;

//to adjust the drawer position, if resize window
addEventListener("resize", (): void => {
  rect = mainDivOfCal?.getBoundingClientRect();
  dynamicStyleDrawerWithDebounce(drawerContent, rect);
});

const mRecallBtn = document.getElementById("m-recall") as
  | HTMLButtonElement
  | undefined;
const mClearBtn = document.getElementById("m-clear") as
  | HTMLButtonElement
  | undefined;
//enable or disable the btn
buttonVisibilityHandler(mRecallBtn, mClearBtn);

declare global {
  interface Number {
    factorial(param: number): number;
  }
}

//factorial method on Number
Number.prototype.factorial = function (this: number) {
  return this > 0 ? this * (this - 1).factorial(this) : 1; //factorial logic
};

//set initial value in the input field empty or existing
if (inputField != undefined) {
  inputField.value = getValueFromLocal("calString");
}

//only one main event listener for all the btn (event delegation)
mainDivOfCal?.addEventListener("click", (e: MouseEvent): void => {
  //currentTarget --> element that the listener was bound to.
  //target --> on we do actually click
  if (e.target === e.currentTarget) return;

  //getting stored values
  let stringFromLocalStorage: string = getValueFromLocal("calString");
  const storedNumberOutput: string = getValueFromLocal("storedNum");
  if (storedNumberOutput === "") setValueInLocal("storedNum", "0");

  //getting the id of clicked ele
  let clickedItem: string | undefined = (
    e.target as HTMLButtonElement | undefined
  )?.id;
  if (clickedItem == undefined) return;

  switch (clickedItem) {
    case isOperationPresent(clickedItem):
      if (clickedItem === "log1" || clickedItem === "log2") {
        clickedItem = "log";
      }
      simpleCalculation(clickedItem);
      break;
    case "m-plus":
      addTheValueToMemory();
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-minus":
      removeTheValueFromMemory();
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-clear":
      setValueInLocal("storedNum", String(0));
      setValueInLocal("storedNums", "");
      memoryStoreValues = [];
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-recall":
      recallTheValueFromMemory();
      break;
    case "m-store":
      memoryStoreValues.push(getValueFromLocal("calString"));
      setValueInLocal("storedNums", String(memoryStoreValues));
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-show":
      dynamicStyleDrawer(drawerContent, rect);
      drawerShow(drawerContent);
      showStoredNumbers();
      break;
    case "drawer-close":
      drawerClose(drawerContent);
      break;
    case "remove-nums":
      removeNumbers();
      memoryStoreValues = [];
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "=":
      calculationOfSimpleCal(stringFromLocalStorage);
      break;
    case "remove-char":
      removeCharFromCal(stringFromLocalStorage);
      break;
    case "reset-char":
      stringFromLocalStorage = "0";
      setCharAtInputField(stringFromLocalStorage);
      break;
    case "10sq":
      powerAndRootCal("10", "1", stringFromLocalStorage);
      break;
    case "sqrt":
      powerAndRootCal(stringFromLocalStorage, "2");
      break;
    case "cbrt":
      powerAndRootCal(stringFromLocalStorage, "3");
      break;
    case "1/x":
      stringPreAdder(stringFromLocalStorage, "1/");
      break;
    case "2**":
      stringPreAdder(stringFromLocalStorage, "2**");
      break;
    case "abs1":
    case "abs2":
      absCal(stringFromLocalStorage);
      break;
    case "random-num":
      randomNumberGenerator(stringFromLocalStorage);
      break;
    case "floor":
      floorNumberCal(stringFromLocalStorage);
      break;
    case "celi":
      celiNumberCal(stringFromLocalStorage);
      break;
    case "unit-of-angle":
      changeInUnitOfAngle();
      break;
    case "e-sq-x":
      stringPreAdder(stringFromLocalStorage, "e**");
      break;
    case "e**":
      stringPreAdder(stringFromLocalStorage, "e**");
      break;
    case "to-expo":
      toExponentialConvert();
      break;
    case "plus-minus":
      changeTheValue();
      break;
    case "dms":
      degToDms();
      break;
    case "deg":
      inputToDeg();
      break;
    case "second-fn-Trigono":
      if (flagForHypBtn) {
        break;
      }
      const btnsOfTrigono: HTMLCollectionOf<Element> =
        document.getElementsByClassName("trigono-btn");
      changeButtonColor(e.target);
      secondBtnShow(btnsOfTrigono);
      flagForToggleBtn === false
        ? (flagForToggleBtn = true)
        : (flagForToggleBtn = false);
      break;
    case "second-fn-Trigono-h":
      if (flagForToggleBtn) {
        const btnOfHTrigonoInverse: HTMLCollectionOf<Element> =
          document.getElementsByClassName("trigono-h-inv");
        changeButtonColor(e.target);
        secondBtnShow(btnOfHTrigonoInverse);
      } else {
        const btnOfHTrigono: HTMLCollectionOf<Element> =
          document.getElementsByClassName("trigono-h-btn");
        changeButtonColor(e.target);
        secondBtnShow(btnOfHTrigono);
      }
      flagForHypBtn === false
        ? (flagForHypBtn = true)
        : (flagForHypBtn = false);
      break;
    case "second-fn":
      const allBtnForToggle: HTMLCollectionOf<Element> =
        document.getElementsByClassName("2nd-toggle-btn");
      changeButtonColor(e.target);
      secondBtnShow(allBtnForToggle);
      break;
    default:
      isTrigonoCal(clickedItem);
      break;
  }
});
