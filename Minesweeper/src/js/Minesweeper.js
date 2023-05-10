import HTMLCode from './htmlCode.js'

export default class Minesweeper {
    constructor(body) {
        this.body = body;

        this.htmlCode = new HTMLCode();

        this.printItems = this.printItems.bind(this);
    }

    init() {

        this.printItems();
    }

    printItems() {
        this.body.appendChild(this.htmlCode.conteiterHTML())

        let table = document.getElementById('table');

        this.printCells(table)
    }

    printCells(table) {
        for (var i=0; i<10; i++) {
            let row = table.insertRow(i);

            for (var j=0; j<10; j++) {
                let cell = row.insertCell(j);
            }
        }
    }

}