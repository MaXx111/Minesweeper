import HTMLCode from './htmlCode.js'

export default class Minesweeper {
    constructor(body) {
        this.body = body;
        this.table = false;
        this.firstClick = true;
        this.storage = {
            lose: 0,
            win: 0,
            click: 0
        }

        this.loseTxt = false;
        this.winTxt = false;
        this.clickTxt = false;

        this.htmlCode = new HTMLCode();

        this.printItems = this.printItems.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.addMines = this.addMines.bind(this);
        this.cellClick = this.cellClick.bind(this);
        this.checkLevelCompletion = this.checkLevelCompletion.bind(this);
        this.showMines = this.showMines.bind(this);
        this.stopGame = this.stopGame.bind(this)
    }

    init() {
        this.printItems();
        let storage = JSON.parse(localStorage.getItem('statistic'));

        console.log(storage);

        if(storage) {
            this.storage = storage;
        } else {
            localStorage.setItem('statistic', JSON.stringify(this.storage));
        }
    }

    printItems() {
        this.body.appendChild(this.htmlCode.conteiterHTML())
        this.table = document.getElementById('table');
        this.table.addEventListener('click', this.onCellClick)

        this.loseTxt = document.querySelector('.lose')
        this.winTxt = document.querySelector('.win')
        this.clickTxt = document.querySelector('.click-count__text')

        this.printCells()
    }

    printCells() {
        for (let i = 0; i < 10; i++) {
            let row = this.table.insertRow(i);

            for (let j = 0; j < 10; j++) {
                let cell = row.insertCell(j);
                cell.className = 'cell';

                let mine = document.createAttribute("data-mine");       
                mine.value = "false";             
                cell.setAttributeNode(mine);
            }
        }
    }

    addMines() {
        for (var i=0; i<20; i++) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            let cell = this.table.rows[row].cells[col];
            cell.setAttribute("data-mine", "true");
            cell.textContent = "X";
          }
    }

    onCellClick(e) {
        e.preventDefault();
        if(e.target.className !== 'cell') return;

        let cellTarget = e.target;

        this.cellClick(cellTarget);
        this.storage.click++;
        this.clickTxt.textContent = this.storage.click;
        localStorage.setItem('statistic', JSON.stringify(this.storage));
    }

    cellClick(cell) {
        if (cell.dataset.mine == 'true') {
            alert(`Game over`);
            this.stopGame('lose');
            this.showMines();

            return
        }

        if(this.firstClick) {
            this.addMines();
            this.firstClick = false;
        }

        cell.classList.add('active');

        let mineCount = 0;
        let cellRow = cell.parentNode.rowIndex;
        let cellCol = cell.cellIndex;
    
        for (let i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1,9); i++) {

            for(let j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1,9); j++) {
                if (this.table.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;
            }
        }

        cell.textContent = mineCount;

        if (mineCount == 0) { 
            for (let i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1,9); i++) {

                for(let j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1,9); j++) {
                    if (this.table.rows[i].cells[j].textContent == "") this.cellClick(this.table.rows[i].cells[j]);
                }
            }
        }

     this.checkLevelCompletion();
    }

    checkLevelCompletion() {
        let levelComplete = true;

          for (let i=0; i<10; i++) {

            for(let j=0; j<10; j++) {
              if (
                  (this.table.rows[i].cells[j].getAttribute("data-mine")=="false") && (this.table.rows[i].cells[j].textContent=="")
                  )  {
                      levelComplete = false;
                  }
            }
        }
        if (levelComplete) {
          alert("You Win!");
          this.showMines();
          this.stopGame(`win`);
        }
      }

    showMines() {
        for (let i=0; i<10; i++) {

          for(let j=0; j<10; j++) {

            let cell = this.table.rows[i].cells[j];
            if (cell.getAttribute("data-mine")=="true") cell.className="mine";
          }
        }
    }

    stopGame(way) {
        this.table.removeEventListener('click', this.onCellClick)

        if(way == 'win') {
            this.storage.win++;
            this.winTxt.textContent = this.storage.win;
        }

        if(way == 'lose') {
            this.storage.lose++;
            this.loseTxt.textContent = this.storage.lose;
        }

        localStorage.setItem('statistic', JSON.stringify(this.storage));
    }

}