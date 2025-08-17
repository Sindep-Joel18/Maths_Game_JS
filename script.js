document.addEventListener("DOMContentLoaded", function () {
	let playing = false;
	let score = 0;
	let timeremaining = 60;
	let action;
	let currentQuestionIndex = 0;

	const quizQuestions = [
		{ text: "5 x 3", options: [15, 12, 18, 10], answer: 15 },
		{ text: "7 x 8", options: [54, 56, 64, 49], answer: 56 },
		{ text: "9 x 6", options: [54, 48, 45, 60], answer: 54 },
		{ text: "4 x 4", options: [8, 12, 16, 14], answer: 16 },
		{ text: "10 x 5", options: [55, 60, 50, 45], answer: 50 },
		{ text: "3 x 7", options: [21, 27, 18, 24], answer: 21 },
		{ text: "8 x 8", options: [64, 72, 56, 48], answer: 64 },
	];

	document.getElementById("startreset").onclick = function () {
		if (playing) {
			location.reload();
		} else {
			playing = true;
			score = 0;
			document.getElementById("scorevalue").innerHTML = score;
			currentQuestionIndex = 0;

			show("timeremaining");
			timeremaining = 60;
			document.getElementById("timeremainingvalue").innerHTML = timeremaining;

			hide("gameOver");
			// changes the Start Game to Reset Game once the game has started
			this.innerHTML = "Reset Game";

			startCountdown();
			displayQuestion();
		}
	};

	for (let i = 1; i <= 4; i++) {
		document.getElementById("box" + i).onclick = function () {
			if (playing) {
				let selectedAnswer = Number(this.innerHTML);
				let correctAnswer = quizQuestions[currentQuestionIndex].answer;

				if (selectedAnswer === correctAnswer) {
					score++;
					document.getElementById("scorevalue").innerHTML = score;
					hide("wrong");
					document.getElementById("correct").innerHTML = "✅ Correct!";
					show("correct");
					nextQuestion();
				} else {
					hide("correct");
					document.getElementById("wrong").innerHTML = "❌ Wrong Answer!";
					show("wrong");
					highlightCorrectAnswer(correctAnswer);
				}
			}
		};
	}

	function startCountdown() {
		action = setInterval(function () {
			timeremaining--;
			document.getElementById("timeremainingvalue").innerHTML = timeremaining;
			if (timeremaining === 0) {
				stopCountdown();
				endGame();
			}
		}, 1000);
	}

	function stopCountdown() {
		clearInterval(action);
	}

	function hide(id) {
		document.getElementById(id).classList.add("hidden");
	}

	function show(id) {
		document.getElementById(id).classList.remove("hidden");
	}

	function displayQuestion() {
		let q = quizQuestions[currentQuestionIndex];
		document.getElementById("question").innerHTML = q.text;

		for (let i = 0; i < 4; i++) {
			let box = document.getElementById("box" + (i + 1));
			box.innerHTML = q.options[i];
			box.classList.remove("bg-green-400", "text-white");
		}
	}

	function nextQuestion() {
		currentQuestionIndex++;
		if (currentQuestionIndex < quizQuestions.length) {
			displayQuestion();
		} else {
			endGame();
		}
	}

	// loops through the options and highlights the correct answer if the wrong answer is clicked
	function highlightCorrectAnswer(correctAnswer) {
		for (let i = 1; i <= 4; i++) {
			let box = document.getElementById("box" + i);
			if (Number(box.innerHTML) === correctAnswer) {
				box.classList.add("bg-green-400", "text-white");
			}
		}
	}

	function endGame() {
		stopCountdown();
		show("gameOver");
		document.getElementById(
			"gameOver"
		).innerHTML = `<p>Game over!</p><p>Your score is ${score}.</p>`;
		hide("timeremaining");
		hide("correct");
		hide("wrong");
		playing = false;
		document.getElementById("startreset").innerHTML = "Start Game";
	}
});
