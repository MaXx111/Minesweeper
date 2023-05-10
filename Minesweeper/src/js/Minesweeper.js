import HTMLCode from './htmlCode.js'

export default class Minesweeper {
    constructor(body) {
        this.body = body;
        this.table = false;

        this.htmlCode = new HTMLCode();

        this.printItems = this.printItems.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.addMines = this.addMines.bind(this);
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

        // if(cellTarget.)

        if (cellTarget.dataset.mine == 'true') {
            alert(`Game over`);
            return
        }

        console.log(cellTarget)
        cellTarget.classList.add('active');
    }

}