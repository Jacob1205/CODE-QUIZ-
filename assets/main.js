const choiceContainer = document.querySelector(".choiceContainer");
const wrongDiv = document.querySelector("#wrongDiv");
const correctDiv = document.querySelector("#correctDiv");
const finalScore = document.querySelector("#finalScore");
const hide = document.querySelector(".hide");
const highScoresScreen = document.querySelector("#highScoresScreen");
const startButton = document.querySelector("#startButton");
const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const endScreen = document.querySelector("#endScreen");

const submitBtn = document.querySelector("#submit");
const initialsInput = document.querySelector("#initialsInput");
const userInitials = document.querySelector("#userInitials");
const userScore = document.querySelector("#userScore");

let timer = document.querySelector("#timer");
let time = questions.length * 15;
let interval = 0;

let questionIdx = 0;

let currentQuestion = questions[questionIdx];

function countdownTimer() {
  interval = setInterval(function () {
    time--;

    timer.textContent = time;

    if (time <= 0) {
      endQuiz();
    }
  }, 1000);
}

function getButtons() {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = currentQuestion.title;

  currentQuestion.choices.forEach(function (choice) {
    const button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary button-display answerButton");

    button.textContent = choice;

    choiceContainer.appendChild(button);
  });
}

function onAnswerBtnClick(e) {
  if (e.target.textContent === currentQuestion.answer) {
    correctDiv.setAttribute("class", "correct");
    if (questionIdx === 2) {
      endQuiz();
    }
  } else {
    time -= 10;
    wrongDiv.setAttribute("class", "wrong");
    if (questionIdx === 2) {
      endQuiz();
    }
  }

  questionIdx++;
  currentQuestion = questions[questionIdx];

  const answerButtonArray = document.querySelectorAll(".answerButton");
  const questionText = document.querySelector(".question-text");

  if (questionIdx < 3) {
    questionText.textContent = questions[questionIdx].title;

    for (let i = 0; i < answerButtonArray.length; i++) {
      answerButtonArray[i].textContent = questions[questionIdx].choices[i];
    }
  }
}

startButton.addEventListener("click", function () {
  startScreen.classList.add("hide");

  gameScreen.classList.remove("hide");

  countdownTimer();

  getButtons();

  document
    .querySelectorAll(".answerButton")
    .forEach((a) => a.addEventListener("click", onAnswerBtnClick));
});

function highScore() {
  startScreen.classList.add("hide");

  gameScreen.classList.add("hide");

  endScreen.classList.add("hide");
}

function endQuiz() {
  gameScreen.classList.add("hide");

  endScreen.classList.remove("hide");

  finalScore.textContent = time;

  clearInterval(interval);
}

submitBtn.addEventListener("click", function () {
  const inputValue = initialsInput.value.trim();
  const scoreValue = timer.textContent;

  endScreen.classList.add("hide");
  highScoresScreen.classList.remove("hide");

  if (inputValue) {
    localStorage.setItem("initials", inputValue);

    localStorage.setItem("score", scoreValue);

    userInitials.textContent = inputValue;

    userScore.textContent = scoreValue;
  }
});
