var holochron = [
  {
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
    choices: 
    {
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

  // run function starts the game logic
  function run() {
    $("#greeting-area").html("<h2 id='instructions'>Click on the Best Answer!</h2>");
    
  }
  // replace #greeting with new, <h2> element instructing player to click on their answer of choice
  // replace #messaging with a new <h3> element id="questions"
  // replace button with a new <ol> element id="answers" and <li>'s with class="answer-choices"
  // append a new <h3> element id="answer-detail" to the gameArea div
  // append a new <h3> element id="answer-reveal" to the gameArea div
  // append a new <h3> element id="answer-result" to the gameArea div
  // loop through all of the questions and,
  // at each iteration:
  //    activate and display a fresh countdown timer
  //    display question and multiple answer choices

  // correctAnswerValue = holochron[0].correctAnswer;
  // console.log (correctAnswerValue);
