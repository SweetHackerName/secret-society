
/*var http = require('http')*/
/*import good from './JSExFiles'*/
import Promise from 'bluebird';

let centurionEl, consoleEl, inputEl;
let promptMSg = "Welcome Centurion. You've demonstrated yourself to be clever enough to uncover the first mystery. Would you like to go deeper?"
var endOfLine= require('os').EOL;
let gameStep = 0;
let gameStart = false;

document.addEventListener("DOMContentLoaded", function()
{
  getControlEls();
  createEventHandlers();
});

async function writeAnimate(msg, element)
{
  let chars, speed;
  if (element.innerHTML) {
    element.innerHTML = ''
  }

  speed = 20
  await Promise.delay(speed*3)
  for (var index = 0; index < msg.length; index++) {
    chars = msg.slice(index,index+1)
    writeMsg(chars, element);
    await Promise.delay(speed);
  }
  enableInput();
}

function enableInput()
{
  inputEl.innerHTML = " ";
  inputEl.focus();
}

function  getControlEls()
{
  centurionEl = document.getElementById("centurionDiv");
  consoleEl = document.getElementById("work-text")
  inputEl = document.getElementById('user-input');
}

function createEventHandlers()
{
  console.log("creating Event Handlers");
  centurionEl.addEventListener("click", function() {
    if (!gameStart) {
      consoleEl.style.display = "block";
      inputEl.style.display = "block";
      writeAnimate(promptMSg, consoleEl);
      gameStart=true;
    }
  });
  inputEl.addEventListener("keydown", function(e) {
    getUserInput(e);
  });
}

function getUserInput(e) {
  console.log(e.key);
  let userMsg;
  if(e.key === 'Enter') {
    userMsg = inputEl.innerHTML.trim();
    inputEl.innerHTML = " ";
    console.log(inputEl.hasChildNodes());
    while (inputEl.hasChildNodes())
    {
      inputEl.removeChild(inputEl.childNodes[0]);
    }

    consoleEl.innerHTML += "\n------------------\n";
    consoleEl.innerHTML += userMsg;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/processUserInput", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let responseObj = JSON.parse(this.responseText);
        console.log(responseObj);
        writeAnimate(responseObj["msg"], consoleEl);
        gameStep = responseObj["gameStep"] ? responseObj["gameStep"] : gameStep;
       }
    };

    // send the collected data as JSON
    let stringMsg = JSON.stringify({"msg": userMsg, "gameStep" : gameStep});
    xhr.send(stringMsg);
    xhr.onloadend = function () {};
  }
}


function writeMsg(msg, element) {
  element.innerHTML += msg

}
