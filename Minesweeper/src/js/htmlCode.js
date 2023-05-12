export default class HTMLCode {
    constructor () {

        this.localStorage = false;
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
        wrapper.appendChild(this.statisticHTML());

        conteiner.appendChild(wrapper);
        return conteiner;
    }

    statisticHTML() {
        const div = document.createElement('div');
        div.className = "statistic";

        const wrapper = document.createElement('div');
        wrapper.className = "statistic__wrapper";

        const title = document.createElement('h1');
        title.className = "statistic__title";
        title.textContent = "Статистика:";



        const clickCount = document.createElement('div');
        clickCount.className = 'click-count';

        const clickCountTitle = document.createElement('h2');
        clickCountTitle.className = 'click-count__title';
        clickCountTitle.textContent = 'Количество кликов:';

        const clickCountText = document.createElement('p');
        clickCountText.className = 'click-count__text';

        if(this.localStorage) {
            clickCountText.textContent = '20';
        } else {
            clickCountText.textContent = '0';
        }

        clickCount.appendChild(clickCountTitle);
        clickCount.appendChild(clickCountText);


        const loseWinCount = document.createElement('div');
        loseWinCount.className = "lose-win-count";

        const loseWinCountTitle = document.createElement('h2');
        loseWinCountTitle.className = 'lose-win-count__title';
        loseWinCountTitle.textContent = 'Победа / Проигрыш';

        const loseWinCountText = document.createElement('p');
        loseWinCountText.className = 'lose-win-count__text';

        if(this.localStorage) {
            loseWinCountText.textContent = '20 / 10';
        } else {
            loseWinCountText.textContent = '0 / 0';
        }

        loseWinCount.appendChild(loseWinCountTitle);
        loseWinCount.appendChild(loseWinCountText);

        wrapper.appendChild(loseWinCount);
        wrapper.appendChild(clickCount);

        div.appendChild(wrapper);

        return div;
    }
}