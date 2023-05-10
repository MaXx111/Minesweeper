import HTMLCode from './htmlCode.js'

export default class Minesweeper {
    constructor(body) {
        this.body = body;
        this.table = false;

        this.htmlCode = new HTMLCode();

        this.printItems = this.printItems.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.addMines = this.addMines.bind(this);
        this.cellClick = this.cellClick.bind(this);
    }

    init() {

        this.printItems();
    }

    printItems() {
        this.body.appendChild(this.htmlCode.conteiterHTML())

        this.table = document.getElementById('table');

        this.table.addEventListener('click', this.onCellClick)

        this.printCells()
    }

    printCells() {
        for (var i=0; i<10; i++) {
            let row = this.table.insertRow(i);

            for (var j=0; j<10; j++) {
                let cell = row.insertCell(j);
                cell.className = 'cell';
                let mine = document.createAttribute("data-mine");       
                mine.value = "false";             
                cell.setAttributeNode(mine);
            }
        }

        this.addMines();
    }

    addMines() {
        for (var i=0; i<20; i++) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            let cell = this.table.rows[row].cells[col];
            cell.setAttribute("data-mine","true");
            cell.innerHTML="X";
          }
    }

    onCellClick(e) {
        e.preventDefault();
        if(e.target.className !== 'cell') return;

        let cellTarget = e.target;

        this.cellClick(cellTarget);
    }

    cellClick(cell) {
        if (cell.dataset.mine == 'true') {
            alert(`Game over`);
            return
        }

        console.log(cell)
        cell.classList.add('active');

        let mineCount = 0;
        let cellRow = cell.parentNode.rowIndex;
        let cellCol = cell.cellIndex;
            //alert(cellRow + " " + cellCol);
        for (let i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1,9); i++) {
            for(let j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1,9); j++) {
                if (this.table.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;
            }
        }

        cell.innerHTML=mineCount;

        if (mineCount == 0) { 
        //Reveal all adjacent cells as they do not have a mine
            for (let i = Math.max(cellRow-1,0); i <= Math.min(cellRow+1,9); i++) {
                for(let j = Math.max(cellCol-1,0); j <= Math.min(cellCol+1,9); j++) {
                //Recursive Call
                    if (this.table.rows[i].cells[j].innerHTML == "") this.cellClick(this.table.rows[i].cells[j]);
                }
            }
        }

    // checkLevelCompletion();
    }

}