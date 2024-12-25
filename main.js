const $ = ele => ele.includes('*') ?
  document.querySelectorAll(ele.replace('*', '')) :
  document.querySelector(ele);
  
  
const maxDigit = 20;
const decimalPlaces = 2;
let inputLength = 0;
let inputtedValue = "";
let result = "";
let status = "good"

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
  if(inputLength < maxDigit){
    inputtedValue += key
  }else{
    status = "medium"
  }
}

setInterval(e => {
  inputDisplay.textContent = inputtedValue.replaceAll('/','รท').replaceAll('*','ร—');
  inputLength = inputtedValue.length;
  outputDisplay.textContent = result;
  statusDisplay.style.background = statusColors[status]
})

const compute = e => {
  if(inputtedValue){
    try{
      result = Number(eval(inputtedValue)).toFixed(decimalPlaces)
      status = "good"
    }catch(er){
      result = "Syntax Error"
      status = "bad"
    }
  }else{
    status = "good"
    result = "Empty"
  }
}


const clear = e => {
  inputtedValue = "";
  result = "";
  status = "good"
}

clearBtn.onclick = e => {
  inputtedValue = inputtedValue.slice(0,-1)
  status = "good"
  result = ""
}

let clearTimer;
let clearActionDuration = .3;
clearBtn.addEventListener("touchstart",e => {
  clearTimer = setTimeout(clear,clearActionDuration * 1000)
  clearBtn.addEventListener("touchend",e => clearTimeout(clearTimer))
})


navigator.serviceWorker.register('/sw.js')
