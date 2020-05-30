alert("記憶遊戲:每階段顏色會疊加，依照顏色選出正確順序");
alert("舉例:Level 1 紅色亮 玩家選取紅色，Level 2 藍色亮 玩家選取紅色、藍色");
alert("顏色依序疊加，挑戰您的記憶力!");


var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// change h1 tag to the level title
$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }

});
// remembering the slelected color and trigger

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  // array counts from 0 ,-1 discount the 0
  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

  // if fit the color answer ,console success otherwise wrong
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    // double check with call next step block
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

  }
} else {

  console.log("wrong");

  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();

}
}

// the next random  color show up
function nextSequence() {

  // once nextSequence is triggered, reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level" +level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // effct fade
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// the color blocks glow (shadow) in a moment

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout (function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}
