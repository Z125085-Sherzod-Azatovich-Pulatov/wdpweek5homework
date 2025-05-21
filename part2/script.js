let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let countdown = 20;

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");
const questionCount = document.getElementById("question-count");
const timerBox = document.getElementById("timer");

fetch("quizquestion.json")
  .then(res => res.json())
  .then(data => {
    questions = shuffleArray(data);
    showQuestion();
  });

function showQuestion() {
  clearOptions();
  resetTimer();

  questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.question;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => {
      clearInterval(timer);
      checkAnswer(index);
    };
    optionsContainer.appendChild(btn);
  });

  startTimer();
}

function checkAnswer(selectedIndex) {
  const correct = questions[currentQuestionIndex].answer;
  if (selectedIndex === correct) {
    score++;
  }
  nextBtn.disabled = false;
  Array.from(optionsContainer.children).forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.style.backgroundColor = "#a4edba";
    if (i === selectedIndex && i !== correct) btn.style.backgroundColor = "#f5a3a3";
  });
}

function clearOptions() {
  optionsContainer.innerHTML = "";
  nextBtn.disabled = true;
  timerBox.textContent = "";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelector(".quiz-box").innerHTML = `<h2>Your score: ${score} / ${questions.length}</h2>`;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
  countdown = 20;
  timerBox.textContent = `Time left: ${countdown}s`;
  timer = setInterval(() => {
    countdown--;
    timerBox.textContent = `Time left: ${countdown}s`;
    if (countdown <= 0) {
      clearInterval(timer);
      checkAnswer(-1);
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
}
