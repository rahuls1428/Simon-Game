let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;
let started = false;

//check if key has been pressed to START the GAME
$(document).keypress(function () {
  if (!started) {
    started = true;
    $("#repeat").addClass("btn-repeat-pattern");
    nextSequence();
  }
});

//check if button has been clicked and play sound+animation
$(".btn").click(function () {
  // let userChosenColour = $(this).attr("id");
  let userChosenColor = this.id;
  console.log("You clicked on '" + userChosenColor + "' button.");

  userClickedPattern.push(userChosenColor);
  console.log("userClickedPattern", userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //check if input answer is correct
  checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
});

//animate a button click
function animatePress(currentColor) {
  console.log("Playing animation for button color: " + currentColor);

  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//play corresponding button color's sound
function playSound(name) {
  console.log("Playing sound for button color: " + name);

  let audioColor = new Audio("sounds/" + name + ".mp3");
  audioColor.play();
}

//check if user answer is correct
function checkAnswer(currentColor) {
  if (gamePattern.length <= 0) {
    console.log("You havent pressed a random key Yet!");
    userClickedPattern = [];
    return;
  }

  if (currentColor == gamePattern[userClickedPattern.length - 1]) {
    console.log(
      "The color # " + userClickedPattern.length + " that you clicked is RIGHT!"
    );
    if (userClickedPattern.length == gamePattern.length) {
      console.log("Successfully completed Level: " + gamePattern.length);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log(
      "The color # " + userClickedPattern.length + " that you clicked is WRONG!"
    );
    let wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over! Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  //userClickedPattern is set to empty again;
  userClickedPattern = [];

  //increase level by 1
  level++;
  //change title to correct level number
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  console.log("Random color is: " + randomChosenColour);

  playSound(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

  $("#repeat").removeClass("btn-repeat-pattern");
}

//if user want to see the pattern again
$("#repeat").click(function () {
  //suppose game is over, this button shouldn't be clickable as no pattern is available SO we write
  if (level == 0) return;

  //if level != 0 then we will show pattern
  console.log("Showing the Pattern here: ");
  $("h1").text("Showing the Pattern");

  for (var i = 0; i < gamePattern.length; i++) {
    console.log(gamePattern[i]);
    let patternColor = gamePattern[i];
    setTimeout(function () {
      $("#" + patternColor)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
      playSound(patternColor);
    }, 500 * i);
  }

  setTimeout(function () {
    $("h1").text("Level " + level);
  }, 500 * gamePattern.length);
});
