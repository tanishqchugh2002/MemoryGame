
var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(".start").on("click",function() {
    if(!started){
        $("#level-title").text("level "+level);
        nextsequence();
        started=true;
    }
});



$(document).keypress(function() {
    if(!started){
        $("#level-title").text("level "+level);
        nextsequence();
        started=true;
    }
});

$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    console.log("success");

    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextsequence();
        },1000);
    }
}
    else{

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over Press any key to restart");

        startOver();
    }
}



function nextsequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var a=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[a];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
   
}



function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}


function animatePress(clr){
    $("."+clr).addClass("pressed");
    setTimeout(function(){$("#"+clr).removeClass("pressed"),100});

}



function startOver(){
    level=0;
    gamePattern=[];
 
    started=false;
    
}