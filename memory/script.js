const words = [
  {
    de: "hell",
    ru: "светлый",
    id: 0
  },
  {
    de: "gemuetlich",
    ru: "уютный",
    id: 1
  },
  {
    de: "bequem",
    ru: "удобный",
    id: 2
  },
  {
    de: "viel Platz zum Rennen und Spielen",
    ru: "много пространства для игры и бега",
    id: 3
  },
  {
    de: "zauberhaft",
    ru: "волшебный",
    id: 4
  },
  {
    de: "Lehrer sind kinderlieb",
    ru: "учителя любят детей",
    id: 5
  },
  {
    de: "das Schulgebaeude hat viele Stockwerke",
    ru: "в здании школы много этажей",
    id: 6
  },
  {
    de: "Gesang im Chor",
    ru: "пение в хоре",
    id: 7
  }
]

// создаем перемешанный массив из карточек

const wordsArr = [];
words.forEach((word) => {
  const deWord = { text: word.de, id: word.id };
  const ruWord = { text: word.ru, id: word.id };
  wordsArr.push(deWord);
  wordsArr.push(ruWord);
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(wordsArr);

// создаем элементы на странице и передаем значения из массива

const game = document.querySelector('.game');
wordsArr.forEach((word) => {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card-container');
  cardEl.setAttribute('data-id', word.id)
  cardEl.innerHTML = `<div class="card">
                        <div class="front"></div>
                        <div class="back">
                          <p>${word.text}</p>
                        </div>
                      </div>`
  game.appendChild(cardEl);

})

const cards = document.querySelectorAll('.card-container');
const audio1 = document.querySelector('#first-card');
const audio2 = document.querySelector('#rotate-back');
const audio3 = document.querySelector('#remove');
const audio4 = document.querySelector('#win');
let count = 0;
let totalSteps = 0;
let firstCard;
let secondCard;
let checking = false;
let hiddenCount = 0;

function clearAll(arr) {
  arr.forEach((el) => {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
    }
  });
}

cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    audio1.play();
    if (card.classList.contains('active') || checking) {
      return;
    }
    card.classList.add('active');
    count++;
    if (count == 1) {
      firstCard = card;
    } else if (count == 2) {
      secondCard = card;
      checking = true;
    }
    if (count >= 2) {
      totalSteps++;
      document.querySelector('.steps').textContent = totalSteps;
      if (firstCard.dataset.id == secondCard.dataset.id) {
        setTimeout(() => {
          firstCard.classList.add('hidden');
          secondCard.classList.add('hidden');
          hiddenCount += 2;
          count = 0;
          checking = false;
          audio3.play();
          clearAll(cards);
          if (hiddenCount === words.length * 2) {
            endGame(); 
          }
        }, 1000);
      } else {
        setTimeout(() => {
          clearAll(cards);
          count = 0;
          firstCard = '';
          secondCard = '';
          checking = false;
          audio2.play();
        }, 1000);
      }
    }
  });
})

function endGame() {
  document.querySelector('.modal').classList.add('active');
  audio4.play();
}