
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    // This function return a string with the random color and append the same color to the game pattern //
    userClickedPattern = [];
    
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(80).fadeIn(80);

    playSound(randomChosenColour);

    level++;
    $("h1").text("Level "+level)
}


function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}


function animatePress(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function () {
        $('#'+currentColour).removeClass("pressed");
      }, 100);
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")

        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }

    else{
        var wrong_sound = new Audio('sounds/wrong.mp3');
        wrong_sound.play();
        $("h1").text("Game Over, Press Any Key to Restart")

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        startOver();
        console.log("wrong");
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}


$(document).keypress(function(){
    if(!started){
        $("h1").text("Level 0")
        nextSequence();
        started = true;
    }

});


$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
})










