var holochron = [{
    question: "What was the name of Grand Admiral Thrawn's Flagship?",
    choices: {
      a: "Manticore",
      b: "Chimaera",
      c: "Basilisk",
      d: "Gorgon"
    },
    correctAnswer: "b",
    correctAnswerName: "Chimaera",
    answerDetail: "Gorgon, Basilisk, and Manticore were all ships commanded by Admiral Daala.",
  },
  {
    question: "On which planet can Ysalimiri be found?",
    choices: {
      a: "Commenor",
      b: "Coruscant",
      c: "Ylesia",
      d: "Myrkr"
    },
    correctAnswer: "b",
    correctAnswerName: "Myrkr",
    answerDetail: "Native to Myrkr, Ysalamiri create bubbles where the force is not present - perhaps as an evolutionary adaptation to the predatory cats of Myrkr who are force-sensitive.",
  },
  {
    question: "What is the group of black holes near Kessel called?",
    choices: {
      a: "The Redoubt",
      b: "Kessellian Cluster",
      c: "The Maw",
      d: "Eadu"
    },
    correctAnswer: "c",
    correctAnswerName: "The Maw",
    answerDetail: "Grand Moff Tarkin had placed a secret military research base inside the Maw.  The base, commanded by Admiral Daala, and staffed by hundreds of scientists were credited with the concept and design of the Deathstar and Sun Crusher.",
  },
  {
    question: "Where was the Hand of Thrawn Complex?",
    choices: {
      a: "Csilla",
      b: "Bastion",
      c: "Yaga Minor",
      d: "Nirauan"
    },
    correctAnswer: "d",
    correctAnswerName: "Nirauan",
    answerDetail: "The Hand of Thrawn Complex housed an incubating clone of Thrawn.",
  },
  {
    question: "What TIE squadron did Baron Soontir Fel mold into the Empire's group of premier pilots?",
    choices: {
      a: "180th",
      b: "181st",
      c: "182nd",
      d: "184th"
    },
    correctAnswer: "b",
    correctAnswerName: "181st",
    answerDetail: "Baron Fell later defected from the Empire.  He flew with Luke and Wedge in Rogue Squadron and is credited with making Rogue the most formidable fighter-group in the galaxy.  Eventually Fell left the Alliance and ended up leading the Chiss military after Thrawn's death.",
  },
  {
    question: "The ______________ began in 25 ABY.",
    choices: {
      a: "Republic Collapse",
      b: "Swarm War",
      c: "Imperial Civil War",
      d: "Yuuzhan Vong War"
    },
    correctAnswer: "d",
    correctAnswerName: "Yuuzhan Vong War",
    answerDetail: "The Yuuzhan Vong invaded from outside the known galaxy in 25 ABY, after travelling for centuries across the void aboard organic, living generation ships.",
  },

];

//global variables
var currentIndex = 0; // start on first question
// var currentQuest = holochron[currentIndex]; // current question
var qTime = 30; // 30 seconds per question
var intervalID; // placeholder for timer interval
var answeredCorrectly = 0; //scoreboard value
var answerRevealed = "The correct answer is " + holochron[currentIndex].correctAnswerName;
var addInfo = holochron[currentIndex].answerDetail;

// click event for the start button
$(document).on("click", "#start", runGame);
console.log(holochron[1].question);


// runGame function starts the game logic
function runGame() {
  
  // var currentQuest = holochron[currentIndex];
  console.log(currentIndex);

  //check to see if round is finished
  if (currentIndex === holochron.length) {

    // if so, go to game over screen
    gameOver();
  }


  // insert player instructions into greeting area
  $("#greeting-area").html("<h2 id='instructions'>Click on the Best Answer!</h2>");



  // ...and the current question
  var questionText = holochron[currentIndex].question;

  // replace contents of game-area with a new 
  // <h3> element id="questions"...
  $("#game-area").html("<h3 id='questions'></h3>");

  // ...and append the question to our new h3 element
  $("#questions").append(questionText);


  // append a new <ol> element to game area with 
  // each of the possible answers as a <li>

  //variable that creates the ol element
  var answerList = $("<ol id='answers'></ol>");



  // pull values from the choices object
  var answerValues = Object.values(holochron[currentIndex].choices);
  console.log(answerValues);


  //create an empty string
  var str = '';

  // loop through the answer list and...
  for (var j = 0; j < answerValues.length; j++) {

    //add the object values to a li element for each iteration through the answerValues array
    //give each item a class to be used on the click event
    str += "<li class='answerChoices'>" + answerValues[j] + "</li>";
  }
  //append the list items to the ol element
  answerList.append(str);

  //append the entire list to the game area
  $("#game-area").append(answerList);

  //activate timer
  qTime = 30;
  runTimer();

}

//add event listener for clicks on any element with the "choice" class
$(document).on("click", ".answerChoices", questionReview);


//questionReview function
function questionReview() {

  //stop the countdown timer
  stopTimer();

  var answerChoice = $(this).text();
  var correctChoice = holochron[currentIndex].correctAnswerName;
  var showAnsDetail = holochron[currentIndex].answerDetail;
  

  //if player answers correctly with time left...
      //...give them an attaboy
          //... and increment correct answers
  if ((answerChoice === correctChoice) && (qTime !== 0)) {
    $("#greeting-area").html("<h2 id='Yinstructions'>Well Done!</h2>");
    answeredCorrectly++
  } 
  else {
    // otherwise, tell em they are wrong
    $("#greeting-area").html("<h2 id='Ninstructions'>XXX INCORRECT XXX</h2>");
  }


  // regardless, reveal the correct answer...
  $("#answer-area").html("<h2 id='revealed'></h2><br>");
  var answerRevealed = "The correct answer is " + correctChoice;
  $("#revealed").append(answerRevealed);

  // ...and provide a little color-commentary
  $("#answer-area").append("<p id='colorComment'></p><br>");
  $("#colorComment").append(showAnsDetail);

  //update index to move on to next question
  incrementIndex();

  //start the transition timer
  //  gives player 5 seconds to read the answer/commentary...
  //  ...then calls runGame to load the next question
  setTimeout(runGame, 1000 * 5);


  console.log(answerChoice);
  console.log(correctChoice);
  console.log(answerRevealed);
  console.log(addInfo);

}








// timer function to set interval and and call decrement for the clock
function runTimer() {
  clearInterval(intervalID);
  intervalID = setInterval(decrement, 1000);
}

// timer function to decrement clock
function decrement() {
  qTime--
  //display in the div with timer-area ID
  $("#timer-area").html("<h1>" + qTime + "</h1>");

  //if time expires...
  if (qTime === 0) {

    //stop timer
    stopTimer();

    //say "Time Expired"
    $("#greeting-area").html("<h2 id='instructions'>Time Expired</h2>");

    //run the question review
    questionReview();
  }
}

// stop timer once question is answered
function stopTimer() {
  clearInterval(intervalID);
}

function incrementIndex() {
  currentIndex++;
  }

function gameOver() {
  alert("Game Over");
}

// append a new <h3> element id="answer-detail" to the gameArea div
// append a new <h3> element id="answer-reveal" to the gameArea div
// append a new <h3> element id="answer-result" to the gameArea div
// loop through all of the questions and,
// at each iteration:
//    activate and display a fresh countdown timer
//    display question and multiple answer choices

// correctAnswerValue = holochron[0].correctAnswer;
// console.log (correctAnswerValue);
