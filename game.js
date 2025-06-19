var gamePattern = []; 
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level=0;
var started = false;




$(document).keydown(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
   
    var userChosenColour = $(this).attr("id");
    //pushing the user chosen colour to the userClickedPattern array
    userClickedPattern.push(userChosenColour);

    //play sound corresponding to the button clicked by the user
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    //check the answer after the user has clicked the button.
    checkAnswer(userClickedPattern.length - 1);
    
});


function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
                
            },1000);
        }
    }
    else{
        
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        $("h1").text("Game Over, press any key to restart");

        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];
    
    level++;
    $("h1").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
   
    // Animate the button
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    // Play the sound
    playSound(randomChosenColour);
 
    
}



 
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");

    audio.play();

}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}

function startOver() {
    level=0;
    gamePattern = [];
    started = false;
}










   
