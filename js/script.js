//  _____ _          _     _              _                   ___                       
// /  __ \ |        (_)   | |            | |                 |_  |                      
// | /  \/ |__  _ __ _ ___| |_ ___  _ __ | |__   ___ _ __      | | ___  _ __   ___  ___ 
// | |   | '_ \| '__| / __| __/ _ \| '_ \| '_ \ / _ \ '__|     | |/ _ \| '_ \ / _ \/ __|
// | \__/\ | | | |  | \__ \ || (_) | |_) | | | |  __/ |    /\__/ / (_) | | | |  __/\__ \
//  \____/_| |_|_|  |_|___/\__\___/| .__/|_| |_|\___|_|    \____/ \___/|_| |_|\___||___/
//                                 | |                                                  
//                                 |_|                                                  
//
// The NSA has not reviewed this document

var totalScore = 0;
var turn = 1;
var totalChance = 0.0;

// This function compares the selection to the current card
function compareSelection(selectedCardClass, currentCardClass){
	if(selectedCardClass == currentCardClass){
			totalScore += 1;
			var percentageCorrect = Math.floor((totalScore / 25) * 100);
			$('#scoretotal').html(totalScore + "/25");
			$('#percentage').html(percentageCorrect +'%');
		}
}

// Draws card at random: Changes background property of .back class each click
function randomCard(){
	function randomizer(){
		var cards = ['url("./images/starCard.svg")', 'url("./images/squareCard.svg")', 'url("./images/circleCard.svg")', 'url("./images/waveCard.svg")', 'url("./images/crossCard.svg")'];
		var cardImage = cards[Math.floor(Math.random() * 5)];
		return cardImage;
	}
	// Resize cards according to viewer window width (broken figure out)
	if($(window).width() > 1000){
		$('.back').css({'background': randomizer, "backgroundSize": "200px 300px",
		"backgroundRepeat" : "no-repeat"})
	} else {
		$('.back').css({'background': randomizer, "backgroundSize": "400px 600px",
		"backgroundRepeat" : "no-repeat"})
	}
	// alert("The window is " + $(window).width() + "pixels in width.");
}

// Triggers card flip and increments turn
// Credit: Dave Walsh (https://davidwalsh.name/css-flip)
function cardFlip(){
	$('.flip-container').toggleClass('flip');
	$('.flip-container').delay(2000).queue(function(){
		$(this).toggleClass('flip', randomCard);
		$(this).dequeue()
	})
	++turn
	$('#countTurn').html(turn + "/25");
}

function endOfRound(){
	turn = "end"; // Bad code, but it works...
	createDistribution();
	$('html, body').delay(2000).animate({
		scrollTop: $("#results").offset().top
	},1000);
	$('#finalScore').html(totalScore);
	$('#Percentile').html(String(Math.round(totalChance*100)) + "% of other people!");
	// create a switch to add the appropriate suffix to the number 
	resultDescription();
}

// Begin game when clicked
$("#play").click(function() {
    $('html, body').animate({
        scrollTop: $("#mainbody").offset().top
    }, 2000);
});


function check(){
	if(turn === 25){
		endOfRound();
	}
}

// When a card is selected, this runs all necessary functions
$('.tinyCard').click(function(){
	if(turn<=25){
		randomCard();
		var currentCard = $('.back').css('background');
		var cardClicked = $(this).attr('class');
		var regex = /(star|circle|square|waves|cross)/;
		var thisCard = String(cardClicked.match(regex));
		var psychicCard = String(currentCard.match(regex));
		compareSelection(thisCard, psychicCard);
		cardFlip();
		check();
	}
})

// calculates n!
function factorial(n) {
  if (n < 0) {
    return;
  }
  if (n === 0) {
    return 1;
  }
  return n * factorial(n -1);
}

// Discover the odds of each outcome and calculate percentile
function createDistribution(){
	function choose(score) {
		return factorial(25) / (factorial(score) * factorial(25 - score));
	}

	function exactChance(score) {
		return Math.pow(0.20, score) * Math.pow(0.80, 25 - score) * choose(score);
	}

	function calcScores(){ // Create an if statement for percentages less than 0% and over 100%
		for(var i=0;i<=totalScore;i++){
			totalChance += exactChance(i);
		}
	}
	calcScores();
}

// Browser check
if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){
      alert('This application will not run on IE. Use Chrome or Firefox like an adult');
} 

function resultDescription(){
	var cursedDesc = "If you clicked one button the entire time you would have done better. You don't just have bad luck, you're cursed. However, you were able to consistently predict the wrong answers! Just do the opposite of what you think you should do!";
	var unluckyDesc = "Remember that chain letter you broke in the 7th grade? WELL THIS IS WHAT HAPPENS TO PEOPLE WHO DON'T FOLLOW THROUGH! Write those letters and try again.";
	var averageDesc	= "Congratulations, your mediocre! You've achieved the same odds as a cat walking across your keyboard. Just think, being average means there are lots of other people just like you! Think of all the friends you could have!";
	var intuitiveDesc =	"You have good instincts! You tend to understand things you can't explain and have no problem trusting your gut. I can't say you'll win the lottery anytime soon. But you might consider the stock market.";
	var clairvoyantDesc = "Your ability to sense goes beyond empathy. You've enjoyed inexplicable luck all your life and may not have even realized it. Xavier's School for Gifted Youngsters is waiting for you! Dig out that unitard and think of a cool superhero name!";
	var NostradamusDesc = "You know how the world is going to end, surprise parties aren't a 'thing' for you, and you already know who is going to win the 2016 presidential election (which goes back to my original point). Maybe you CAN know too much?";
	var MatrixDesc = "You know Kung Fu and are a snappy dresser. But don't forget, the Matrix has you and all of humanity is depending on you. However, if you neglect your duty to humanity and leave us in this simulation, you get to keep your super powers.";
	var finalPercentile = Math.round(totalChance * 100);
	if((totalChance * 100) <= 25){
		$('#resultHeading').html("You're cursed!");
		$('#resultDescription').html(cursedDesc);
	} 
	else if(25 < finalPercentile && finalPercentile <= 50) {
		$('#resultHeading').html("You're unlucky!");
		$('#resultDescription').html(unluckyDesc);
	} 
	else if(50 < finalPercentile && finalPercentile <= 65) {
		$('#resultHeading').html("You're average!");
		$('#resultDescription').html(averageDesc);
	} 
	else if(65 < finalPercentile && finalPercentile <= 75) {
		$('#resultHeading').html("You're intuitive!");
		$('#resultDescription').html(intuitiveDesc);
	} 
	else if(75 < finalPercentile && finalPercentile <= 85) {
		$('#resultHeading').html("You're clairvoyant!");
		$('#resultDescription').html(clairvoyantDesc);
	} 
	else if(85 < finalPercentile && finalPercentile <= 95) {
		$('#resultHeading').html("You're Nostradamus!");
		$('#resultDescription').html(NostradamusDesc);
	} 
	else if(95 < finalPercentile && finalPercentile <= 100) {
		$('#resultHeading').html("Are you from the Matrix?");
		$('#resultDescription').html(MatrixDesc);
	} 
	else {
		alert("There has been an error");
	}
	
}

// Facebook share code
document.getElementById('shareBtn').onclick = function() {
    FB.ui({
        display: 'popup',
        method: 'share',
        title: "I'm more clairvoyant than " + String(Math.round(totalChance*100)) + " Of other people! How about you?",
        description: 'How clairvoyant are you? Find out now!',
    link: 'http://clairvoyant.wunderkind.us',
    picture: 'http://clairvoyant.wunderkind.us/images/FacebookPreview.png',
    href: 'http://clairvoyant.wunderkind.us',

  }, function(response){});
}