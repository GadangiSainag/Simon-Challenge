var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

var gameStarted = false;


//to reset the game ---works only when indicated
$(document).keypress(function() {
  if (!gameStarted) {
    gamePattern.length = 0;
    userClickedPattern = [];
    $("#level-title").text("Level 0");
    level = 0;
    nextSequence();

    gameStarted = true;

  }
});

//addind an eventListener for mouse click
$(".btn").click(function() {
  if (gameStarted) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    answerChecker(userClickedPattern.length - 1);
    animatePress(userChosenColor);
  }
});


function nextSequence() {
  //picks a random color for the user
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


  level += 1;
  $("#level-title").text("Level " + level);
}

//this guy is responsible for all the sound system
function playSound(name) {
  var playThis = new Audio("sounds/" + name + ".mp3");
  playThis.play();

}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  //delay
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}


function answerChecker(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //correct color
    if (userClickedPattern.length === gamePattern.length) {
      console.log("correct");
      setTimeout(nextSequence, 1000);
    }
  } else {
    //when the color is wrong
    wrongPress();

  }

}

function wrongPress() {

  gameStarted = false;
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key To Restart");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}
