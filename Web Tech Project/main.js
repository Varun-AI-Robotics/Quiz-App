document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.querySelector(".start-btn");
  const instructionCard = document.querySelector(".instruction");
  const instructionExit = document.querySelectorAll(".instruction button")[0];
  const startQuizBtn = document.querySelectorAll(".instruction button")[1];
  const wrapper = document.querySelector(".wrapper");
  const nxtBtn = document.querySelector(".btn button");
  const resultCard = document.querySelector(".result-card");
  const time = document.querySelectorAll(".Timer p")[1];
  const progressBar = document.querySelector(".inner");
  const questionEl = document.querySelector(".question-container");
  const answerContainer = document.querySelector(".option-container");
  const currentQuestionNum = document.querySelector(".current-question");
  const totalQuestion = document.querySelector(".total-question");
  const totalScore = document.querySelector(".total-score .value");
  const yourScore = document.querySelector(".user-score .value");
  const unattempted = document.querySelector(".unattempted .value");
  const attempted = document.querySelector(".attempted .value");
  const wrong = document.querySelector(".wrong .value");
  const replayQuiz = document.querySelectorAll(".score-btn button")[0];
  const exitQuiz = document.querySelectorAll(".score-btn button")[1];
  const loginPage = document.querySelector(".login-page");
  const thankYouPage = document.querySelector(".thank-you-page");
  const loginBtn = document.getElementById("loginBtn");
  const returnHomeBtn = document.getElementById("returnHome");

  let currentQuestion = 0;
  let timer, score = 0, attemptQuestion = 0, unattemptedQuestion = 0, wrongQuestion = 0;

  const questions = [
    { question: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2 },
    { question: "Who wrote the Harry Potter book series?", options: ["J.K. Rowling", "George R.R. Martin", "Stephen King", "Dan Brown"], answer: 0 },
    { question: "What is the smallest planet in our solar system?", options: ["Mars", "Venus", "Mercury", "Jupiter"], answer: 2 },
    { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue whale", "Giraffe", "Hippopotamus"], answer: 1 },
    { question: "Who painted the famous artwork 'The Starry Night'?", options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"], answer: 1 }
  ];

  totalQuestion.textContent = questions.length;
  currentQuestionNum.textContent = currentQuestion + 1;

  loginBtn.addEventListener("click", () => {
    const name = document.getElementById("username").value.trim();
    if (name !== "") {
      loginPage.classList.add("hide");
      startBtn.classList.remove("hide");
    }
  });

  returnHomeBtn.addEventListener("click", () => {
    thankYouPage.classList.add("hide");
    loginPage.classList.remove("hide");
    document.getElementById("username").value = "";
  });

  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hide");
    instructionCard.classList.remove("hide");
  });

  instructionExit.addEventListener("click", () => {
    instructionCard.classList.add("hide");
    startBtn.classList.remove("hide");
  });

  startQuizBtn.addEventListener("click", () => {
    instructionCard.classList.add("hide");
    wrapper.classList.remove("hide");
    startQuiz();
  });

  replayQuiz.addEventListener("click", () => {
    resultCard.classList.add("hide");
    wrapper.classList.remove("hide");
    resetQuiz();
    startQuiz();
  });

  exitQuiz.addEventListener("click", () => {
    resultCard.classList.add("hide");
    thankYouPage.classList.remove("hide");
  });

  nxtBtn.addEventListener("click", nextQuestion);

  function startQuiz() {
    currentQuestion = 0;
    currentQuestionNum.textContent = currentQuestion + 1;
    displayQuestion(currentQuestion);
    timer = setInterval(updateTimer, 1000);
    updateProgress();
  }

  function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    attemptQuestion = 0;
    unattemptedQuestion = 0;
    wrongQuestion = 0;
    currentQuestionNum.textContent = 1;
    time.textContent = "15";
    answerContainer.innerHTML = "";
  }

  function displayQuestion(index) {
    answerContainer.innerHTML = "";
    const q = questions[index];
    questionEl.textContent = q.question;
    q.options.forEach((opt, i) => {
      const btn = document.createElement("div");
      btn.className = "option";
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(i);
      answerContainer.appendChild(btn);
    });
  }

  function checkAnswer(selectedIndex) {
    clearInterval(timer);
    attemptQuestion++;
    answerContainer.style.pointerEvents = "none";

    const correctIndex = questions[currentQuestion].answer;
    const options = document.querySelectorAll(".option");

    if (selectedIndex === correctIndex) {
      score++;
      options[selectedIndex].style.backgroundColor = "#37BB1169";
      options[selectedIndex].style.borderColor = "green";
      options[selectedIndex].style.color = "#fff";
    } else {
      wrongQuestion++;
      options[selectedIndex].style.backgroundColor = "#B6141469";
      options[selectedIndex].style.borderColor = "red";
      options[selectedIndex].style.color = "#fff";
      options[correctIndex].style.backgroundColor = "#37BB1169";
      options[correctIndex].style.borderColor = "green";
      options[correctIndex].style.color = "#fff";
    }
  }

  function nextQuestion() {
    answerContainer.style.pointerEvents = "auto";
    clearInterval(timer);
    time.textContent = "15";

    if (currentQuestion === questions.length - 1) {
      showResults();
    } else {
      currentQuestion++;
      currentQuestionNum.textContent = currentQuestion + 1;
      displayQuestion(currentQuestion);
      timer = setInterval(updateTimer, 1000);
      updateProgress();
    }
  }

  function updateTimer() {
    let remainingTime = parseInt(time.textContent) - 1;
    time.textContent = remainingTime > 9 ? remainingTime : "0" + remainingTime;

    if (remainingTime <= 0) {
      clearInterval(timer);
      unattemptedQuestion++;
      const correctIndex = questions[currentQuestion].answer;
      const options = document.querySelectorAll(".option");
      options[correctIndex].style.backgroundColor = "#37BB1169";
      options[correctIndex].style.borderColor = "green";
      options[correctIndex].style.color = "#fff";
      answerContainer.style.pointerEvents = "none";
    }
  }

  function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
  }

  function showResults() {
    wrapper.classList.add("hide");
    resultCard.classList.remove("hide");
    totalScore.textContent = questions.length;
    yourScore.textContent = score;
    attempted.textContent = attemptQuestion;
    unattempted.textContent = unattemptedQuestion;
    wrong.textContent = wrongQuestion;
  }
});