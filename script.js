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
var cards = ["star card", "square card", "circle card", "wave card", "cross card"];

// This function compares the selection to the current card
function compareSelection(selectedCardClass, currentCardClass){
	if(selectedCardClass == currentCardClass){
			totalScore += 1;
			var percentageCorrect = Math.floor((totalScore / 25) * 100);
			$('#scoretotal').html(totalScore + "/25");
			$('#percentage').html(percentageCorrect +'%');
		}
}

// Randomly selects new card (find flip or fade transition)
function randomCard(){
	$("#focusCard").attr("class", function(){
		var cardClass = cards[Math.floor(Math.random() * 5)];
		return cardClass;
	});
}

// tracks progress in test
if(turn < 25){
	// Select star card
	$('.star.tinyCard').click(function(){
		var currentCard = $('#focusCard').attr('class');
		var regex = /star/;
		var psychicCard = currentCard.match(regex);
		compareSelection("star", psychicCard)
		randomCard();
		++turn
		$('#countTurn').html(turn + "/25");
	})

	// Select square card
	$('.square.tinyCard').click(function(){
		var currentCard = $('#focusCard').attr('class');
		var regex = /square/;
		var psychicCard = currentCard.match(regex);
		compareSelection("square", psychicCard)
		randomCard();
		++turn
		$('#countTurn').html(turn + "/25");
	})

	// Select circle card
	$('.circle.tinyCard').click(function(){
		var currentCard = $('#focusCard').attr('class');
		var regex = /circle/;
		var psychicCard = currentCard.match(regex);
		compareSelection("circle", psychicCard)
		randomCard();
		++turn
		$('#countTurn').html(turn + "/25");
	})

	// Select wave card
	$('.wave.tinyCard').click(function(){
		var currentCard = $('#focusCard').attr('class');
		var regex = /wave/;
		var psychicCard = currentCard.match(regex);
		compareSelection("wave", psychicCard)
		randomCard();
		++turn
		$('#countTurn').html(turn + "/25");
	})

	// Select cross card
	$('.cross.tinyCard').click(function(){
		var currentCard = $('#focusCard').attr('class');
		var regex = /cross/;
		var psychicCard = currentCard.match(regex);
		compareSelection("cross", psychicCard)
		randomCard();
		++turn
		$('#countTurn').html(turn + "/25");
	})
} else {
	alert("Your score is " + totalScore + "/25")
}