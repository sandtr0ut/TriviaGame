var holochron = [
  {
    question: "What was the name of Grand Admiral Thrawn's Flagship?",
    choices: {
      a: 'Manticore',
      b: 'Chimaera',
      c: 'Basilisk',
      d: 'Gorgon'
    },
    correctAnswer: 'b',
    correctAnswerName: 'Chimaera',
    answerDetail:
      'Gorgon, Basilisk, and Manticore were all ships commanded by Admiral Daala.',
    readSeconds: 3
  },
  {
    question: 'On which planet can Ysalimiri be found?',
    choices: {
      a: 'Commenor',
      b: 'Coruscant',
      c: 'Ylesia',
      d: 'Myrkr'
    },
    correctAnswer: 'b',
    correctAnswerName: 'Myrkr',
    answerDetail:
      'Native to Myrkr, Ysalamiri create bubbles where the force is not present - perhaps as an evolutionary adaptation to the predatory cats of Myrkr who are force-sensitive.',
    readSeconds: 6
  },
  {
    question: 'What is the group of black holes near Kessel called?',
    choices: {
      a: 'The Redoubt',
      b: 'Kessellian Cluster',
      c: 'The Maw',
      d: 'Eadu'
    },
    correctAnswer: 'c',
    correctAnswerName: 'The Maw',
    answerDetail:
      'Grand Moff Tarkin had placed a secret military research base inside the Maw.  The base, commanded by Admiral Daala, and staffed by hundreds of scientists were credited with the concept and design of the Deathstar and Sun Crusher.',
    readSeconds: 8
  },
  {
    question: 'Where was the Hand of Thrawn Complex?',
    choices: {
      a: 'Csilla',
      b: 'Bastion',
      c: 'Yaga Minor',
      d: 'Nirauan'
    },
    correctAnswer: 'd',
    correctAnswerName: 'Nirauan',
    answerDetail:
      'The Hand of Thrawn Complex housed an incubating clone of Thrawn.',
    readSeconds: 3
  },
  {
    question:
      "What TIE squadron did Baron Soontir Fel mold into the Empire's group of premier pilots?",
    choices: {
      a: '180th',
      b: '181st',
      c: '182nd',
      d: '184th'
    },
    correctAnswer: 'b',
    correctAnswerName: '181st',
    answerDetail:
      "Baron Fell later defected from the Empire.  He flew with Luke and Wedge in Rogue Squadron and is credited with making Rogue the most formidable fighter-group in the galaxy.  Eventually Fell left the Alliance and ended up leading the Chiss military after Thrawn's death.",
    readSeconds: 7
  },
  {
    question: 'The ______________ began in 25 ABY.',
    choices: {
      a: 'Republic Collapse',
      b: 'Swarm War',
      c: 'Imperial Civil War',
      d: 'Yuuzhan Vong War'
    },
    correctAnswer: 'd',
    correctAnswerName: 'Yuuzhan Vong War',
    answerDetail:
      'The Yuuzhan Vong invaded from outside the known galaxy in 25 ABY, after travelling for centuries across the void aboard organic, living generation ships.',
    readSeconds: 5
  }
];

//global variables
var currentIndex = 0; // start on first question
var qTime = 20; // 20 seconds per question
var intervalID; // placeholder for timer interval
var answeredCorrectly = 0; //scoreboard +value
var answeredWrong = 0; //scoreboard -value
var answerRevealed =
  'The correct answer is ' + holochron[currentIndex].correctAnswerName;
var addInfo = holochron[currentIndex].answerDetail;

// click event for the start button
$(document).on('click', '#start', runGame);
console.log(holochron[0].question);

// runGame function starts the game logic
function runGame() {
  console.log(currentIndex);

  // insert player instructions into greeting area
  $('#greeting-area').html(
    "<h2 id='instructions'>Click on the Best Answer!</h2>"
  );
  // ...and the current question
  var questionText = holochron[currentIndex].question;

  $('#game-area').html("<h3 id='questions'></h3>");

  $('#questions').append(questionText);

  var answerList = $("<ol id='answers'></ol>");

  // pull values from the choices object
  var answerValues = Object.values(holochron[currentIndex].choices);

  var str = '';
  for (var j = 0; j < answerValues.length; j++) {
    str += "<li class='answerChoices'>" + answerValues[j] + '</li>';
  }
  answerList.append(str);
  $('#game-area').append(answerList);

  //activate timer
  qTime = 20;
  runTimer();
}

//add event listener for clicks on any element with the "choice" class
$(document).on('click', '.answerChoices', questionReview);

function questionReview() {
  stopTimer();

  var answerChoice = $(this).text();
  var correctChoice = holochron[currentIndex].correctAnswerName;
  var showAnsDetail = holochron[currentIndex].answerDetail;

  //if player answers correctly with time left...
  //...give them an attaboy
  //... and increment correct answers
  if (answerChoice === correctChoice && qTime !== 0) {
    $('#greeting-area').html("<h2 id='Yinstructions'>Well Done!</h2>");
    answeredCorrectly++;
  } else if (qTime !== 0) {
    // ...or shame them and mark the answer wrong
    $('#greeting-area').html("<h2 id='Ninstructions'>XXX INCORRECT XXX</h2>");
    answeredWrong++;
  } else {
    $('#greeting-area').html(
      "<h2 id='Ninstructions'>XXX TIME EXPIRED! XXX</h2>"
    );
    answeredWrong++;
  }

  // regardless, reveal the correct answer...
  $('#game-area').html("<h2 id='revealed'></h2><br>");
  var answerRevealed = 'The correct answer was ' + correctChoice;
  $('#revealed').append(answerRevealed);

  // ...and give some background
  $('#game-area').append("<p id='colorComment'></p><br>");
  $('#colorComment').append(showAnsDetail);

  //start the transition timer
  //  gives player 5 seconds to read the answer/commentary...
  //  ...then calls whatNext to load the next question or end the game
  var delay = holochron[currentIndex].readSeconds;
  console.log(delay);
  setTimeout(whatNext, 1000 * delay);

  if (answerChoice === correctChoice) {
    console.log('answer chosen: ' + answerChoice);
    console.log('answered correctly');
  } else {
    console.log('answer chosen: ' + answerChoice);
    console.log('the answer is incorrect');
  }
}

// timer function to set interval and call decrement for the clock
function runTimer() {
  clearInterval(intervalID);
  intervalID = setInterval(decrement, 1000);
}

// timer function to decrement clock
function decrement() {
  qTime--;
  //display in the div with timer-area ID
  $('#timer-area').html('<h1>' + qTime + '</h1>');

  //if time expires...
  if (qTime === 0) {
    //stop timer
    stopTimer();

    //say "Time Expired"
    $('#greeting-area').html("<h2 id='instructions'>Time Expired</h2>");

    //run the question review
    questionReview();
  }
}

// stop timer once question is answered
function stopTimer() {
  clearInterval(intervalID);
}

function whatNext() {
  if (currentIndex < holochron.length - 1) {
    currentIndex++;
    runGame();
  } else {
    console.log('Game Over');
    currentIndex++;
    clearInterval(intervalID);
    gameOver();
  }
}

function gameOver() {
  console.log('I say again...GAME OVER');
  // create new div for game-over page
  var goDiv = $("<div id='game-over'>");
  $('.wrapper').html(goDiv);

  //create subdiv for game over message and append msg
  var goMsgDiv = $("<div id='gmOvr-message'>");
  goMsgDiv.html('<h1>Game-Over</h1><hr>');
  goDiv.append(goMsgDiv);

  // append a sub-div for the scoreboard
  var scoreboardDiv = $("<div id='scoreboard'>");

  // display number of correct and incorrect answers
  var correctStr = '<h2>' + 'Correct Answers: ' + answeredCorrectly + '</h2>';
  var incorrectStr = '<h2>' + 'Incorrect Answers: ' + answeredWrong + '</h2>';
  $(scoreboardDiv).append(correctStr);
  $(scoreboardDiv).append(incorrectStr);

  $(goDiv).append(scoreboardDiv);

  //display percentage score and skill-level earned
  console.log(answeredCorrectly);
  console.log(holochron.length);
  console.log(typeof answeredCorrectly);
  var percentRight = parseInt((answeredCorrectly / holochron.length) * 100);

  var scoreStr =
    '<h2>' + 'Your Score: ' + percentRight + '&#37' + '</h2>' + '<br>';
  $('#scoreboard').append(scoreStr);

  //determines skill level based on percentage correct
  var skillLevel = 'Peasant';
  if (percentRight > 99) {
    skillLevel = 'Jedi Master';
  } else if (99 >= percentRight && percentRight >= 80) {
    skillLevel = 'Jedi Knight';
  } else if (79 >= percentRight && percentRight >= 50) {
    skillLevel = 'Padawan';
  }

  var skillStr = '<h2>' + 'Your Level Is ...' + '</h2>';
  $('#scoreboard').append(skillStr);

  var skillLevelStr = '<h1>' + skillLevel + '</h1>';
  $('#scoreboard').append(skillLevelStr);
}
