export default class HTMLCode {
    constructor () {

    }

    conteiterHTML() {
        const conteiner = document.createElement('div');
        conteiner.className = 'conteiner';

        const wrapper = document.createElement('div');
        wrapper.className = 'conteiner__wrapper';

        const table = document.createElement('table');
        table.className = 'table';
        table.id = 'table';

        const h1 = document.createElement('h1');
        h1.className = 'container__title';
        h1.textContent = 'Minesweeper';

        wrapper.appendChild(h1);
        wrapper.appendChild(table);

        conteiner.appendChild(wrapper);
        return conteiner;
    }
}