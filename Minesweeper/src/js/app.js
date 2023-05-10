import Minesweeper from './Minesweeper.js';

const body = document.querySelector('body');
const minesweeper = new Minesweeper(body);

minesweeper.init();