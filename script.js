const questions = [
  {
    question: `Определи род существительного ein heller Schein`,
    options: ["Мужской", "Средний"],
    rightAnswer: 0
  },
  {
    question: `Und werden unter euer Bettzeug sehen. Определи время.`,
    options: ["Прошедшее ", "Будущее"],
    rightAnswer: 1
  },
  {
    question: `Sie kommen zu euch in der Nacht. А как это будет в Perfekt?`,
    options: ["Sind gekommen ", "Haben gekommen"],
    rightAnswer: 0
  },
  {
    question: `Mein Herz brennt. Вспомни форму прошедшего времени.`,
    options: ["Gebrennt", "Gebrannt"],
    rightAnswer: 1
  },
  {
    question: `Выбери правильный вариант перевода. Ich singe bis der Tag erwacht.`,
    options: ["Я пою, пока день не проснется", "Я пою, когда день проснется"],
    rightAnswer: 0
  }
];

const option1 = document.querySelector(".option1"),
  option2 = document.querySelector(".option2");

const optionElements = document.querySelectorAll(".option");

const question = document.getElementById("question");

const numberOfQuestion = document.getElementById("number-of-question"),
  numberOfAllQuestions = document.getElementById("number-of-all-questions");

let indexOfQuestion,
  indexOfPage = 0;

const answersTracker = document.getElementById("answers-tracker");
const btnNext = document.getElementById("btn-next");

let score = 0;

const correctAnswer = document.getElementById("correct-answer"),
  numberOfAllQuestions2 = document.getElementById("number-of-all-questions-2"),
  btnTryAgain = document.getElementById("btn-try-again"),
  modalTitle = document.querySelector("h1");

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question;

  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];

  numberOfQuestion.innerHTML = indexOfPage + 1;
  indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
  if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add("correct");
    updateAnswerTracker("correct");
    score++;
  } else {
    el.target.classList.add("wrong");
    updateAnswerTracker("wrong");
  }
  disabledOptions();
};

for (option of optionElements) {
  option.addEventListener("click", (e) => checkAnswer(e));
}

const disabledOptions = () => {
  optionElements.forEach((item) => {
    item.classList.add("disabled");
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add("correct");
    }
  });
};

const enableOptions = () => {
  optionElements.forEach((item) => {
    item.classList.remove("disabled", "correct", "wrong");
  });
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement("div");
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = (status) => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if (!optionElements[0].classList.contains("disabled")) {
    alert("Выберите один из вариантов ответа");
  } else {
    randomQuestion();
    enableOptions();
  }
};

const quizOver = () => {
  document.querySelector(".quiz-over-modal").classList.add("active");
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
  if (score == questions.length) {
    document.querySelector("#btn-try-again").style.display = "none";
    document.querySelector('audio').play();
  }

  if (score <= questions.length / 2) {
    modalTitle.textContent = "Ты можешь лучше!";
  }
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener("click", tryAgain);

btnNext.addEventListener("click", () => {
  validate();
});

window.addEventListener("load", () => {
  randomQuestion();
  answerTracker();
});
