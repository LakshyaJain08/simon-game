var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var key_press = 0;

var level = 0;


$(document).keypress(function() {

  if (key_press == 0) {

    $("h1").text("Level " + level);
    nextSequence();
    key_press = 1;

  }

});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } 

    else {

      console.log("Fail");

      $("h1").text("Game Over, Press Any Key to Restart");

      playSound("Fail");

      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      } , 200);

      startOver();

    }

}


function nextSequence() {

  userClickedPattern = [];

  level+= 1;
  $("h1").text("level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  } , 100);

}


function startOver() {

  level = 0;
  gamePattern = [];
  key_press = 0;
  
}