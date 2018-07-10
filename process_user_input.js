const express = require('express');
var cors = require('cors');
var app = express()

app.use(cors())
app.use(express.json());
app.post('/api/processUserInput', function (req, res, next) {
  let userInput;
  userInput = parseMessage(req);
  if (userInput) {
    res.json(getResponse(userInput));
  }
  else {
    res.json({msg: 'user input blank'})
  }
});
console.log("after app.get");

app.listen(8080, () => console.log("Listening on port 8080!"));
// NOTE: it was working until you added the express.json,

function parseMessage (req) {
  console.log(req.body);
  return req.body;

};

function getResponse(userInput)
{
  userMsg = userInput["msg"].toLowerCase();
  let step =0;
  if (userInput['gameStep'])
  {
    console.log(userInput['gameStep']);
    step = userInput['gameStep'];
  }


  if (userMsg == "butts") {
    return({'msg': "real funny", 'gameStep': step});
  }
  else if (userMsg == "fuck you")
  {
    return({'msg': "Fuck you too buddy", 'gameStep': step});
  }
  else {
    return(lookupAnswer(userMsg, step));
  }
}

function lookupAnswer (msg, step) {
  let answer = {};
  let responseText = "Error: this shouldn't happen";
  console.log("step is", step);
  if (step == 0)
  {
    if (msg == 'yes')
    {
      responseText = "Excellent. Welcome to the Centurions. \nWe are a secret society that has been running much of the world for many years and we're... looking for new recruits. Are you willing to undergo the testing required to prove yourself?";
      step = 1;
    }
    else if(msg == "no") {
      responseText = "I'm sorry to hear that. Please forget you saw anything.";
    }
    else {
      responseText = "I don't understand. \nWould you like to understand the deeper mysteries?";
    }
  }
  else if (step == 1)
  {
    if (msg == 'yes')
    {
      responseText = "Good, it's going to be really really hard.";
      step = 2;
    }
    else
    {
      responseText = "I don't understand. \nAre you ready to join?"
    }
  }
  else if (step == 2)
  {
    responseText = "User has made it to step 2. \n\nMore content to come.";
  }

  answer = {'msg': responseText, 'gameStep': step};
  console.log(answer);
  return(answer);

}
