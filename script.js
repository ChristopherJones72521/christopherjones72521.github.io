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
var turn = 0;

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
			cardFlip();
			// After final turn, display result and scroll down
			} else {
				$('html, body').delay(100).animate({
					scrollTop: $("#results").offset().top
				},1000);
			}
	})