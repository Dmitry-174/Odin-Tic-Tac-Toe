"use strict"

const gameBoard = (() => {
    let board = new Array(9);

    //let board = ['', '0', 'X',
    //    '0', 'X', '0',
    //    'X', '0', 'X'];

    const getMark = (index) => {
        return board[index];
    }

    const setMark = (index, typeMark) => {
        board[index] = typeMark;
    }

    return { getMark, setMark }
})();

let gameBoardEl = document.querySelector('.game-board');

function renderGameBoard() {
    while (gameBoardEl.firstChild) {
        gameBoardEl.removeChild(gameBoardEl.lastChild);
    };

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', i);
        cell.textContent = gameBoard.getMark(i);
        gameBoardEl.appendChild(cell);
    }
}

const Player = (name, mark) => {
    const getPlayerName = () => name;
    const getPlayerMark = () => mark;
    return { getPlayerName, getPlayerMark };
}

const GameController = (() => {
    let currentRound = 1;
    let currentPlayer;
    let clickedBtnIndex;

    const setClickedBtnIndex = (index) => {
        clickedBtnIndex = index;
    };

    const playRound = () => {
        if (currentRound % 2 === 1) {
            currentPlayer = player1;
        } else {
            currentPlayer = player2;
        }

        if (!gameBoard.getMark(clickedBtnIndex)) {
            gameBoard.setMark(clickedBtnIndex, currentPlayer.getPlayerMark());
            renderGameBoard();
            currentRound++;
        }
    };
    
    return { playRound, setClickedBtnIndex };
})();

const player1 = Player('player1', 'X');
const player2 = Player('player2', '0');


renderGameBoard();

gameBoardEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell')) {
        return;
    } else {
        GameController.setClickedBtnIndex(parseInt(e.target.id));
        GameController.playRound();
    }
});


