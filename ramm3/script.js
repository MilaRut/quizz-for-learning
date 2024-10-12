const questions = [
  {
    question: `"Erst wenn die Wolken schlafengehen". Выбери правильный вариант перевода:`,
    options: ["Лишь когда облака ложатся спать", "После того, как облака ложатся спать"],
    rightAnswer: 0
  },
  {
    question: `"Kann man uns am Himmel sehen". Выбери исходную форму  местоимения "uns":`,
    options: ["Wir", "Sie"],
    rightAnswer: 0
  },
  {
    question: `"...Ich will kein Engel sein". Выбери правильный вариант перевода:`,
    options: ["Я не могу быть ангелом", "Я не хочу быть ангелом"],
    rightAnswer: 1
  },
  {
    question: `"Sie müssen sich an Sterne krallen".Выбери правильный вариант перевода:`,
    options: ["Им можно цепляться за звезды", "Они вынуждены цепляться за звёзды."],
    rightAnswer: 1
  },
  {
    question: `"Sie leben hinterm Sonnenschein". Определи падеж и задай правильный вопрос:`,
    options: ["Wo? Dativ", "Wen? Akkusativ"],
    rightAnswer: 0
  },
  {
    question: `"Warum man sie nicht sehen kann". Вспомни форму множественного числа от "kann".`,
    options: ["Konnen", "Können"],
    rightAnswer: 1
  },
  {
    question: `"Warum man sie nicht sehen kann". Вспомни форму на "du"`,
    options: ["Du siehst", "Du sehst"],
    rightAnswer: 0
  }
];

function startQuizz() {
  document.querySelector('.start').addEventListener('click', () => {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.start-audio').play();
  });
}

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
    document.querySelector('.end-audio').play();
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
  startQuizz();
  randomQuestion();
  answerTracker();
});
