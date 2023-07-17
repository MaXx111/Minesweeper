import HTMLCode from './htmlCode.js';

export default class Minesweeper {
  constructor(body) {
    this.body = body;
    this.table = false;
    this.firstClick = true;
    this.storage = {
      lose: 0,
      win: 0,
    };

    this.loseTxt = false;
    this.winTxt = false;
    this.clickTxt = false;
    this.secTxt = false;

    this.htmlCode = new HTMLCode();

    this.localSec = 0;
    this.localClick = 0;
    this.interval = 0;

    this.printItems = this.printItems.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.addMines = this.addMines.bind(this);
    this.cellClick = this.cellClick.bind(this);
    this.checkLevelCompletion = this.checkLevelCompletion.bind(this);
    this.showMines = this.showMines.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.onResetBtn = this.onResetBtn.bind(this);

    this.tick = this.tick.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  init() {
    this.printItems();
    const storage = JSON.parse(localStorage.getItem('statistic'));

    this.interval = setInterval(this.tick, 1000);

    if (storage) {
      this.storage = storage;
    } else {
      localStorage.setItem('statistic', JSON.stringify(this.storage));
    }
  }

  printItems() {
    this.body.appendChild(this.htmlCode.conteiterHTML());
    this.table = document.getElementById('table');
    this.table.addEventListener('click', this.onCellClick);
    this.body.querySelector('.reset-btn').addEventListener('click', this.onResetBtn);

    this.loseTxt = document.querySelector('.lose');
    this.winTxt = document.querySelector('.win');
    this.clickTxt = document.querySelector('.click-count__text');
    this.secTxt = document.querySelector('.sec-count__text');

    this.printCells();
  }

  printCells() {
    for (let i = 0; i < 10; i++) {
      const row = this.table.insertRow(i);

      for (let j = 0; j < 10; j++) {
        const cell = row.insertCell(j);
        cell.className = 'cell';

        const mine = document.createAttribute('data-mine');
        mine.value = 'false';
        cell.setAttributeNode(mine);
      }
    }
  }

  onResetBtn(e) {
    e.preventDefault();
    this.clearInterval();

    this.table.removeEventListener('click', this.onCellClick);

    this.interval = setInterval(this.tick, 1000);
    this.localSec = 0;
    this.localClick = 0;
    this.secTxt.textContent = this.localSec;
    this.clickTxt.textContent = this.localClick;

    this.table.textContent = '';
    this.firstClick = true;
    this.printCells();
    this.table.addEventListener('click', this.onCellClick);
  }

  onCellClick(e) {
    e.preventDefault();
    if (e.target.className !== 'cell') return;

    const cellTarget = e.target;

    this.cellClick(cellTarget);

    this.localClick++;
    this.clickTxt.textContent = this.localClick;
  }

  cellClick(cell) {
    if (cell.dataset.mine === 'true') {
      alert('Game over. Try again');
      this.stopGame('lose');
      this.showMines();

      return;
    }

    if (this.firstClick) {
      this.addMines();
      this.firstClick = false;
    }

    cell.classList.add('active');

    let mineCount = 0;
    const cellRow = cell.parentNode.rowIndex;
    const cellCol = cell.cellIndex;

    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
      for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
        if (this.table.rows[i].cells[j].getAttribute('data-mine') === 'true') mineCount++;
      }
    }

    if (mineCount === 1) {
      cell.classList.add('green');
    }

    if (mineCount === 2) {
      cell.classList.add('aqua');
    }

    if (mineCount === 3) {
      cell.classList.add('orange');
    }

    if (mineCount === 4) {
      cell.classList.add('red');
    }
    cell.textContent = mineCount;

    if (mineCount === 0) {
      for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
          if (this.table.rows[i].cells[j].textContent === '') this.cellClick(this.table.rows[i].cells[j]);
        }
      }
    }

    this.checkLevelCompletion();
  }

  checkLevelCompletion() {
    let levelComplete = true;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (
          (this.table.rows[i].cells[j].getAttribute('data-mine') === 'false') && (this.table.rows[i].cells[j].textContent === '')
        ) {
          levelComplete = false;
        }
      }
    }
    if (levelComplete) {
      alert(`Hooray! You found all mines in ${this.localSec} seconds and ${this.localClick} moves!`);
      this.showMines();
      this.stopGame('win');
    }
  }

  addMines() {
    for (let i = 0; i < 10; i++) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const cell = this.table.rows[row].cells[col];
      cell.setAttribute('data-mine', 'true');
    }
  }

  showMines() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = this.table.rows[i].cells[j];
        if (cell.getAttribute('data-mine') === 'true') cell.className = 'mine';
      }
    }
  }

  stopGame(way) {
    this.table.removeEventListener('click', this.onCellClick);

    if (way === 'win') {
      this.storage.win++;
      this.winTxt.textContent = this.storage.win;
    }

    if (way === 'lose') {
      this.storage.lose++;
      this.loseTxt.textContent = this.storage.lose;
    }

    this.clearInterval();
    localStorage.setItem('statistic', JSON.stringify(this.storage));
  }

  tick() {
    this.localSec++;
    this.secTxt.textContent = this.localSec;
  }

  clearInterval() {
    clearInterval(this.interval);
  }
}
