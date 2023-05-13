export default class HTMLCode {
    constructor () {

        this.storage = JSON.parse(localStorage.getItem('statistic'));
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

        const resetBtn = document.createElement('button');
        resetBtn.className = "reset-btn";
        resetBtn.textContent = 'New game';

        const info = document.createElement('div');
        info.className = 'main-info';

        wrapper.appendChild(h1);
        info.appendChild(table);
        info.appendChild(this.statisticHTML());
        wrapper.appendChild(info);
        wrapper.appendChild(resetBtn);

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
        clickCountText.textContent = '0';
        
        clickCount.appendChild(clickCountTitle);
        clickCount.appendChild(clickCountText);


        const loseWinCount = document.createElement('div');
        loseWinCount.className = "lose-win-count";

        const loseWinCountTitle = document.createElement('h2');
        loseWinCountTitle.className = 'lose-win-count__title';
        loseWinCountTitle.textContent = 'Победа / Проигрыш';

        const loseWinCountText = document.createElement('p');
        loseWinCountText.className = 'lose-win-count__text';

        const lose = document.createElement('span');
        lose.className = "lose";

        const win = document.createElement('span');
        win.className = 'win'

        const slash = document.createElement('span');
        slash.className = 'slash';
        slash.textContent = '/'

        if(this.storage) {
            win.textContent = `${this.storage.win}`;
            lose.textContent = `${this.storage.lose}`;
        } else {
            win.textContent = `0`;
            lose.textContent = `0`;
        }

        loseWinCountText.appendChild(win);
        loseWinCountText.appendChild(slash);
        loseWinCountText.appendChild(lose);

        loseWinCount.appendChild(loseWinCountTitle);
        loseWinCount.appendChild(loseWinCountText);

        const secCount = document.createElement('div');
        secCount.className = 'sec-count';

        const secCountTitle = document.createElement('h2');
        secCountTitle.className = 'sec-count__title';
        secCountTitle.textContent = 'Прошло секунд:';

        const secCountText = document.createElement('p');
        secCountText.className = 'sec-count__text';
        secCountText.textContent = '0';

        secCount.appendChild(secCountTitle);
        secCount.appendChild(secCountText);

        wrapper.appendChild(loseWinCount);
        wrapper.appendChild(clickCount);
        wrapper.appendChild(secCount);

        div.appendChild(wrapper);

        return div;
    }
}