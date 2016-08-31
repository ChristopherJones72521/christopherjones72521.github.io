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

var totalScore = 0.0;
var turn = 1;
var totalChance = 0.0;

// This function compares the selection to the current card
function compareSelection(selectedCardClass, currentCardClass){
	if(selectedCardClass == currentCardClass){
			totalScore += 1;
			var percentageCorrect = Math.floor((totalScore / turn) * 100);
			$('#scoretotal').html(totalScore + "/25");
			$('#percentage').html(percentageCorrect +'%');
		}
}

// Draws card at random: Changes background property of .back class each click
function randomCard(){
	function randomizer(){
		var cards = ['url("starCard.svg")', 'url("squareCard.svg")', 'url("circleCard.svg")', 'url("waveCard.svg")', 'url("crossCard.svg")'];
		var cardImage = cards[Math.floor(Math.random() * 5)];
		return cardImage;
	}
	$('.back').css({'background': randomizer, "backgroundSize": "200px 300px",
	"backgroundRepeat" : "no-repeat"})
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

// When a card is selected, this runs all necessary functions
	$('.tinyCard').click(function(){
		if(turn<25){
			randomCard();
			var currentCard = $('.back').css('background');
			var cardClicked = $(this).attr('class');
			var regex = /(star|circle|square|waves|cross)/;
			var thisCard = String(cardClicked.match(regex));
			var psychicCard = String(currentCard.match(regex));
			compareSelection(thisCard, psychicCard);
			calcProbability();
			cardFlip();
			// After final turn, display result and scroll down
			} else {
				$('html, body').delay(100).animate({
					scrollTop: $("#results").offset().top
				},1000);
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

// Calculates the probability of the user guessing correctly
function calcProbability(){
	var combinatoric = (factorial(turn)/(factorial(totalScore) * factorial(turn - totalScore)));
	var probOccur = Math.pow(0.20, turn);
	var notOccur = Math.pow(0.80, (turn - totalScore));
	var numberOfPossibleOutcomes = Math.pow(5, turn);
	var probability = (combinatoric * probOccur * notOccur);
	var prob = "The probability of this event occuring by chance is " + String((probability * 100).toFixed(6)) + "%";
	var altProb = "The alternative calculation is " + String((combinatoric/numberOfPossibleOutcomes) * 100) + "%";
	// totalChance += ((combinatoric/numberOfPossibleOutcomes) * 100);
	totalChance += probability * 100;
	// console.log(probability * 100);
	// console.log(totalChance);
	createDistribution();
}

function createDistribution(){
	var numberOfPossibleOutcomes = Math.pow(5, turn);

	function choose(score) {
		return factorial(25) / (factorial(score) * factorial(25 - score));
	}

	function exactChance(score) {
		return Math.pow(0.20, score) * Math.pow(0.80, 25 - score) * choose(score);
		// return choose(score) / numberOfPossibleOutcomes;
	}

	function calcScores(){
		for(var i=0;i<=25;i++){
			console.log(String(i) + ": " + String(Math.round(exactChance(i)*100)));
		}
	}
	calcScores();
}