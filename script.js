"use strict"

const gameBoard = (() => {
    //let board = new Array(9);

    let board = ['X', '0', 'X',
                '0', 'X', '0',
                'X', '0', 'X'];

    const getMark = (index) => {
        return board[index];
    }

    const setMark = (index, typeMark) => {
        board[index] = typeMark;
    }

    return { getMark, setMark }
})();


function renderGameBoard() {
    let gameBoardEl = document.querySelector('.game-board')
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', i);
        cell.textContent = gameBoard.getMark(i);
        gameBoardEl.appendChild(cell);
    }
}


renderGameBoard();