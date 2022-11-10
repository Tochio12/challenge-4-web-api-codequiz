var timeLeft = 75;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var startSectionEl = document.getElementById("start-section");
var questionSectionEl = document.getElementById("question-section");
var nextButton = document.getElementById("next-button");
var currentQuestion, shuffledQuestions;
var questionEl = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-buttons");
var timerID;


//getting the start buuton to work and display the next button
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestion++
    nextQuestion()
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
    startSectionEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionSectionEl.classList.remove("hide");

    countdown();
    nextQuestion();

}

// next question
function nextQuestion() {
    displayQuestion(shuffledQuestions[currentQuestion]);
}

// show question
function displayQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
            var button = document.createElement("button")
            button.innerText = answer.text
            button.classList.add("btn")
            if(answer.correct) {
                button.dataset.correct = answer.correct
            }
        })
}

// resets the function
function stateRest() {
    nextButton.classList.add("hide")

}

