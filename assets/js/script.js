var timeLeft = 75;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var startSectionEl = document.getElementById("start-section");
var questionSectionEl = document.getElementById("question-section");
var nextButton = document.getElementById("next-button");
var currentQuestion;
var questionEl = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-buttons");
var timerID;
var answerCheckEl = document.getElementById("answer-check")
var shuffledQuestions;
var initialSector = document.getElementById("player-name");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var submitButton = document.getElementById("submit-button");
var viewHighscores = document.getElementById("highscores-link");
var clearScoreButton = document.getElementById("clear-button");
var restartButton = document.getElementById("restart-button");

//getting the start buuton to work and display the next button
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestion++
    nextQuestion();
})

// timer when the game starts
function countdown() {
    timeLeft--;
    timerEl.textContent="Time: " + timeLeft;
    if (timeLeft <= 0) {
        scoreSaver();
    }
}

// start game
function startQuiz() {
    timerID = setInterval(countdown, 1000);
    startSectionEl.classList.add("hidden");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionSectionEl.classList.remove("hidden");

    countdown();
    nextQuestion();
}

// next question
function nextQuestion() {
    stateReset();
    displayQuestion(shuffledQuestions[currentQuestion]);
}

// show question
function displayQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
            var button = document.createElement("button")
            button.innerText = answer.text
            if(answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener("click", answerSelect)
            answerButtonEl.appendChild(button)
        })
}

// resets the function
function stateReset() {
    nextButton.classList.add("hidden")
    answerCheckEl.classList.add("hidden")
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild
            (answerButtonEl.firstChild)
    }
}

// function for the answer
function answerSelect(t) {
    var buttonSelect = t.target;
    var correct = buttonSelect.dataset.correct;
    answerCheckEl.classList.remove("hide")

    if (correct) {
        answerCheckEl.innerHTML = "Correct!";
    }  else {
        answerCheckEl.innerHTML = "Incorrect!";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            timeLeft -= 10;
        }
    } if (shuffledQuestions.length > currentQuestion + 1) {
        nextButton.classList.remove("hidden")
        answerCheckEl.classList.remove("hidden")
    }else {
        startButton.classList.remove("hidden")
        scoreSaver();
    }
}

// save the scores
function scoreSaver() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        questionSectionEl.classList.add("hidden");
        document.getElementById("score-section").classList.remove("hidden");
        document.getElementById("users-score").textContent = "Your final score is " + timeLeft;
    }, 2000)
}

var outputScores = function () {

    if (!scoreSaved) {
        return false;
    }

    scoreSaved = JSON.parse(scoreSaved);
    var initials = document.querySelector("#initial-section").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    scoreSaved.push(newScore);
    console.log(scoreSaver)

    scoreSaved.forEach(score => {
        initialSector.innerText = score.initials
        scoreField.innerText = score.score
    })
}

// function to show highscores
function relayHighScores(initials) {
    document.getElementById("highscores").classList.remove("hidden");
    document.getElementById("score-section").classList.add("hidden");
    startSectionEl.classList.add("hidden");
    questionSectionEl.classList.add("hiddden");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }

var highScoreEl = document.getElementById("highscore");
highScoreEl.innerHTML = "";

for (i = 0; i < scores.length; i++) {
    var div1 = document.createElement("div");
    div1.setAttribute("class", "name-div");
    div1.innerText = scores[i].initials;
    var div2 = document.createElement("div");
    div2.setAttribute("class", "score-div");
    div2.innerText = scores[i].timeLeft;

    highScoreEl.appendChild(div1);
    highScoreEl.appendChild(div2);
}
localStorage.setItem("scores", JSON.stringify(scores));

}

viewHighscores.addEventListener("click", relayHighScores);

submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initial-section").value;
    relayHighScores(initials);
})

// reload page
restartButton.addEventListener("click", function () {
    window.location.reload();
})

clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
})







