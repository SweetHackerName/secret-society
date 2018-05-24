
/*var http = require('http')*/
/*import good from './JSExFiles'*/
import Promise from 'bluebird';

let centurionEl, consoleEl, inputEl;
let promptMSg = "Welcome Centurion. You've demonstrated yourself to be clever enough to uncover the first mystery. Would you like to go deeper?"
var endOfLine= require('os').EOL;

let gameStart = false;

document.addEventListener("DOMContentLoaded", function() {

  /*document.getElementById("demo").innerHTML = "cool medina";*/
  console.log("is this working? Yes.")

  /*
  writeAnimate(testmessage, document.getElementById("work-text"))
  */
  getControlEls();

  /*
  writeAnimate("writeanimate happened", consoleEl)
  */
  createEventHandlers();


});

async function writeAnimate(msg, element)
{
  let chars, speed;
  if (element.innerHTML) {
    element.innerHTML = ''
  }
  console.log(msg.length)
  speed = 50
  await Promise.delay(speed*3)
  for (var index = 0; index < msg.length; index++) {
    chars = msg.slice(index,index+1)
    writeMsg(chars, element)

    await Promise.delay(speed)

  }
  enableInput();
}

function enableInput()
{

  inputEl.innerHTML = "hrmmm yess ";


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
      writeAnimate(promptMSg, consoleEl);
      gameStart=true;
    }
  });
  centurionEl.addEventListener("mouseover", simpleLog("over"));
  centurionEl.addEventListener("mouseout", function() {
    simpleLog("out");
  });
  inputEl.addEventListener("keydown", function(e) {
    getUserInput(e);
  });
}

function getUserInput(e) {
  console.log(e.key);
  let userMsg;
  if(e.key === 'Enter') {
    userMsg = inputEl.innerHTML;
    inputEl.innerHTML = " ";
    consoleEl.innerHTML += "------------------\n";
    consoleEl.innerHTML += userMsg;
  }
}

function simpleLog (callerType){
  console.log("simpleLog" + callerType);
}

function writeMsg(msg, element) {
  element.innerHTML += msg

}
