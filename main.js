const $ = ele => ele.includes('*') ? 
document.querySelectorAll(ele.replace('*',''))
: document.querySelector(ele);

const maxDigit = 20;
const decimalPlaces = 2
let inputLength = 0;
let inputtedValue = "";
let result = "";
let status = "good";

const display = $('.display');
const statusDisplay = $('.statusDisplay');
const [inputDisplay,outputDisplay] = display.querySelectorAll('*');
const clearBtn = $('.clear');

const statusColors = {
  good: "#59E83E",
  medium: "yellow",
  bad: "red"
}


const addKey = key => {
  result = ""
  if(inputLength < maxDigit){
    inputtedValue += key
  }else{
    status = "medium"
  }
}


const clear = e => {
  inputtedValue = "";
  result = "";
  status = "good"
}

const compute = e => {
  if(inputtedValue){
  try{
    result = Number(eval(inputtedValue)).toFixed(decimalPlaces)
    status = "good"
  }catch(er){
    result = "Syntax Error";
    status = "bad"
  }
  }else{
    result = "Empty"
    status = "good"
  }
}

setInterval(e => {
  inputDisplay.textContent = inputtedValue.replaceAll('/','÷').replaceAll('*','×');
  inputLength = inputtedValue.length;
  outputDisplay.textContent = result;
  statusDisplay.style.background = statusColors[status]
})

clearBtn.onclick = e => {
  result = "";
  status = "good"
  inputtedValue = inputtedValue.slice(0,-1);
}

let clearTimer;
const clearPressDuration = .3; // in seconds
clearBtn.addEventListener('touchstart',e => {
  clearTimer = setTimeout(clear,clearPressDuration * 1000);
  clearBtn.addEventListener('touchend',e => clearInterval(clearTimer))
})