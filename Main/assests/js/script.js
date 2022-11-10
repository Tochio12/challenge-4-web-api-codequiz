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
    }

    if (shuffledQuestions.length > currentQuestion + 1) {
        nextButton.classList.remove("hidden")
        answerCheckEl.classList.remove("hidden")
    }else {
        startButton.classList.remove("hidden")
    }
}




