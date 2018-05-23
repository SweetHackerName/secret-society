
/*var http = require('http')*/
/*import good from './JSExFiles'*/
import Promise from 'bluebird';

let centurionEl, consoleEl;
let promptMSg = "Welcome Centurion. You've demonstrated yourself to be clever enough to uncover the first mystery. Would you like to go deeper?"
window.onload = function()
{

    /*document.getElementById("test").innerHTML = "does it have to be under";*/
}
/*
let testmessage = "okay, lets see how this works."
*/

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
  speed = 120
  await Promise.delay(speed*3)
  for (var index = 0; index < msg.length; index++) {
      chars = msg.slice(index,index+1)
      writeMsg(chars, element)

      await Promise.delay(speed)

  }

}

function  getControlEls()
{
  centurionEl = document.getElementById("centurionDiv");
  consoleEl = document.getElementById("work-text")
}
function createEventHandlers()
{
  console.log("creating Event Handlers");
  centurionEl.addEventListener("click", function() {
    writeAnimate(promptMSg, consoleEl);
  });
  centurionEl.addEventListener("mouseover", simpleLog("over"));
  centurionEl.addEventListener("mouseout", function() {
    simpleLog("out");
  }
)

}
function simpleLog (callerType){
  console.log("simpleLog" + callerType);
}

function writeMsg(msg, element) {
    element.innerHTML += msg

}
