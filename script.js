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

// // Randomly assigns class to focus card
// function randomCard(){
// 	// $("#focusCard").attr("class", function(){ 
// 	$('.back').attr("class", function(){	
// 		var cards = ["star card", "square card", "circle card", "wave card", "cross card"];
// 		var cardClass = cards[Math.floor(Math.random() * 5)];
// 		return cardClass;
// 	});
// }

function randomCard2(){
	function randomizer(){
		var cards = ['url("starCard.svg")', 'url("squareCard.svg")', 'url("circleCard.svg")', 'url("waveCard.svg")', 'url("crossCard.svg")'];
		var cardImage = cards[Math.floor(Math.random() * 5)];
		return cardImage;
	}
	$('.back').css({'background': randomizer, "backgroundSize": "200px 300px",
	"backgroundRepeat" : "no-repeat"})
}

// tracks progress in test
if(turn < 25){
	// Select star card
	$('.star.tinyCard').click(function(){
		randomCard2();
		var currentCard = $('.back').css('background');
		var regex = /star/;
		var psychicCard = currentCard.match(regex);
		compareSelection("star", psychicCard)
		$('.flip-container').toggleClass('flip');
		$('.flip-container').delay(2000).queue(function(){
			$(this).toggleClass('flip', randomCard2);
			// randomCard2(); // You need this to work
			$(this).dequeue()
		})
		++turn
		$('#countTurn').html(turn + "/25");
	})

	// Select square card
	$('.square.tinyCard').click(function(){
		randomCard2();
		var currentCard = $('.back').css('background');
		var regex = /square/;
		var psychicCard = currentCard.match(regex);
		compareSelection("square", psychicCard)
		$('.flip-container').toggleClass('flip');
		$('.flip-container').delay(2000).queue(function(){
			$(this).toggleClass('flip', randomCard2);
			// randomCard2(); // You need this to work
			$(this).dequeue()
		})
		++turn
		$('#countTurn').html(turn + "/25");
	})

	// Select circle card
	$('.circle.tinyCard').click(function(){
		randomCard2();
		var currentCard = $('.back').css('background');
		var regex = /circle/;
		var psychicCard = currentCard.match(regex);
		compareSelection("circle", psychicCard)
		$('.flip-container').toggleClass('flip');
		$('.flip-container').delay(2000).queue(function(){
			$(this).toggleClass('flip', randomCard2);
			// randomCard2(); // You need this to work
			$(this).dequeue()
		})
		++turn
		$('#countTurn').html(turn + "/25");
	})

	// Select wave card
	$('.wave.tinyCard').click(function(){
		randomCard2();
		var currentCard = $('.back').css('background');
		var regex = /wave/;
		var psychicCard = currentCard.match(regex);
		compareSelection("wave", psychicCard)
		
		$('.flip-container').toggleClass('flip');
		$('.flip-container').delay(2000).queue(function(){
			$(this).toggleClass('flip', randomCard2);
			// randomCard2(); // You need this to work
			$(this).dequeue()
		})
		++turn
		$('#countTurn').html(turn + "/25");
	})

	// Select cross card
	$('.cross.tinyCard').click(function(){
		randomCard2();
		var currentCard = $('.back').css('background');
		var regex = /cross/;
		var psychicCard = currentCard.match(regex);
		compareSelection("cross", psychicCard)
		$('.flip-container').toggleClass('flip');
		$('.flip-container').delay(2000).queue(function(){
			$(this).toggleClass('flip', randomCard2);
			// randomCard2(); // You need this to work
			$(this).dequeue()
		})
		++turn
		$('#countTurn').html(turn + "/25");
	})
} else {
	alert("Your score is " + totalScore + "/25")
}