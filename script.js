		var start = new Date().getTime();

		var bestScore = 2;

		var bestTime = function(current, best) {

			if (current < best) {

				bestScore = current;

			};
		
		}

		function shapeType() {

			if (Math.random() > 0.5) {

				document.getElementById('shape').style.borderRadius = "50%";

			} else {

				document.getElementById('shape').style.borderRadius = "0";

			}
		}

		function randomColor() {

			var letters = "1234567890abcdef".split('');

			var color = '#';

			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}

			return color;

		}

		function makeShapeAppear() {

			shapeType();

			var top = Math.random() * 400;

			var left = Math.random() * 400;

			var width = (Math.random() * 200) + 100;

			document.getElementById('shape').style.top = top + "px";

			document.getElementById('shape').style.left = left + "px";

			document.getElementById('shape').style.width = width + "px"

			document.getElementById('shape').style.height = width + "px"

			document.getElementById('shape').style.backgroundColor = randomColor();

			document.getElementById('shape').style.display = 'block';


			start = new Date().getTime();

		}

		function appearAfterDelay() {

			setTimeout(makeShapeAppear, Math.random() * 2000);

		}

		appearAfterDelay();

		document.getElementById('shape').onclick = function () {

			document.getElementById('shape').style.display = "none";

			var end = new Date().getTime();

			var timeTaken = (end - start) / 1000;

			bestTime(timeTaken, bestScore);

			document.getElementById('time').innerHTML = timeTaken + " Seconds";

			document.getElementById('best').innerHTML = bestScore + " Seconds";

			appearAfterDelay();
		}