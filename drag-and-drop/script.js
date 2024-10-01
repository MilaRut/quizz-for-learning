const items = document.querySelectorAll('.item');
const placeholders = document.querySelectorAll('.placeholder');
const check = document.querySelector('#check');
let count = 0;

items.forEach((item) => {
  item.addEventListener('dragstart', dragstart);
  item.addEventListener('dragend', dragend);
})

placeholders.forEach((el) => {
  el.addEventListener('dragover', dragover);
  el.addEventListener('dragenter', dragenter);
  el.addEventListener('dragleave', dragleave);
  el.addEventListener('drop', dragdrop);
})

function dragstart(e) {
  e.target.classList.add('hold');
  setTimeout(() => e.target.classList.add('hide'), 0);
  e.dataTransfer.setData('text/plain', e.target.id);
};

function dragend(e) {
  e.target.classList.remove('hold', 'hide');
};

function dragover(e) {
  e.preventDefault();
};

function dragenter(e) {
  e.target.classList.add('hovered');
};

function dragleave(e) {
  e.target.classList.remove('hovered');
};

function dragdrop(e) {
  e.target.classList.remove('hovered');
  const id = e.dataTransfer.getData('text/plain');
  const item = document.getElementById(id);
  e.target.append(item);
  showBtn();
};

function showBtn() {
  let allDragged = true;
  items.forEach((item) => {
    if (!item.closest('.placeholder.answer')) {
      allDragged = false;
    }
  });
  check.disabled = !allDragged;
}

function checkAnswers() {
  count = 0;
  items.forEach((item) => {
    if (item.getAttribute('id') === item.closest('.placeholder').dataset.id) {
      count++;
    } else {
      count--;
    }
  });
  if (count === items.length) {
    alert('Richtig');
  } else {
    alert('Falsch');
  }
}

check.addEventListener('click', checkAnswers);