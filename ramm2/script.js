const questions = [
  {
    question: `Какой падеж отвечает на вопрос "wem? и какой в нем определенный артикль мужского и среднего рода?`,
    options: ["Dativ, dem ", "Akkusativ, den/das"],
    rightAnswer: 0
  },
  {
    question: `"Hinter dieser Tür" Wo? Какой это падеж?`,
    options: ["Dativ", "Akkusativ"],
    rightAnswer: 0
  },
  {
    question: `"Hielt ich den Atem an". Was? Определи род существительного.`,
    options: ["Средний", "Мужской"],
    rightAnswer: 1
  },
  {
    question: `"Ins Feuer meiner Wut". Задай вопрос к существительному "Feuer" и определи падеж.`,
    options: ["Wo?  Dativ", "Wohin? Akkusativ"],
    rightAnswer: 1
  },
  {
    question: `"Sie sagen zu mir". Вспомни, с каким падежом дружит предлог "zu".`,
    options: ["Dativ", "Akkusativ"],
    rightAnswer: 0
  },
  {
    question: `В тексте песни встречается ещё один предлог, который дружит только с Dativ. Какой?`,
    options: ["Für", "Bei"],
    rightAnswer: 1
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
    document.querySelector('.win span:first-child').textContent = `Till sagt: "Du bist ja gut dran! Aber vergiss bitte fur immer nicht"`
    document.querySelector('.win span:nth-child(2)').textContent = `Mit, nach, aus, zu, von, bei`
    document.querySelector('.win span:nth-child(3)').textContent = `mit Dativ - Feuer frei :)`
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
