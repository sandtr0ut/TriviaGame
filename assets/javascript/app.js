var holochron = [{
    question: "What was the name ofGrand Admiral Thrawn's Flagship?",
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
    answerDetail: "Grand Moff Tarkin had placed a secret military research base inside the Maw.  The base, commanded by Admiral Daala, and staffed by hundreds of scientists were credited with the concept and design of the Deathstar and Sun Crusher",
  },

];


// click event for the start button
$(document).on("click", "#start", run);

// Need a countdown timer

// run function starts the game logic
function run() {

  // replace #greeting with new, <h2> element instructing player to click on their answer of choice
  $("#greeting-area").html("<h2 id='instructions'>Click on the Best Answer!</h2>");

  // for each item in the holochron array...
  for (let i = 0; i < holochron.length; i++) {

    // create variable for the current iteration
    var current = holochron[i];
    // replace contents of game-area with a new <h3> element id="questions"
    var questionText = current.question;
    $("#game-area").html("<h3 id='questions'></h3>");
    $("#questions").append(questionText);

    // append a new <ol> element to game area with list items holding each of the possible answers to the question above

    //create a variable (and an array) of possible answers by pulling values from the choices object
    var values = Object.values(current.choices);
    // console.log(values);

    //create an empty string
    var str = '';

    //variable that creates the ol element
    var answerList = $("<ol id='answers'></ol>");

    // loop through the answer list and...
    for (var j = 0; j < values.length; j++) {

      //add the object values to a li element for each iteration through the values array
      //give each item a class to be used on the click event
      str += "<li class='choice'>" + values[j] + "</li>";
    }
    //append the list items to the ol element
    answerList.append(str);

    //append the entire list to the game area
    $("#game-area").append(answerList);


    //add event listener for clicks on any element with the "choice" class
    $(document).on("click", ".choice", checkAnswer);

    //checkAnswer function
    function checkAnswer() {
      var answerChoice = $(this).text();
      var correctChoice = current.correctAnswerName;

      console.log(answerChoice);
      console.log(correctChoice);

    }



    // Need a timneout/delay before next question
  }



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