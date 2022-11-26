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
    const WinConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let winner;
    let isTie = false;
    let currentRound = 1;
    let currentPlayer;
    let clickedBtnIndex;

    const setClickedBtnIndex = (index) => {
        clickedBtnIndex = index;
    };

    const checkWinConditions = () => {
        for (let condition of WinConditions) {
            if (gameBoard.getMark(condition[0]) && gameBoard.getMark(condition[1]) &&
                gameBoard.getMark(condition[2]) &&
                gameBoard.getMark(condition[0]) === gameBoard.getMark(condition[1]) &&
                gameBoard.getMark(condition[1]) === gameBoard.getMark(condition[2])) {
                winner = currentPlayer;
                for (let id of condition) {
                    document.getElementById(id).classList.add('win');
                }
                
            }
        }
        isTie = currentRound === 9;
        console.log(isTie);
    }


    const playRound = () => {
        if (currentRound % 2 === 1) {
            currentPlayer = player1;
        } else {
            currentPlayer = player2;
        }

        if (!gameBoard.getMark(clickedBtnIndex) &&
            !winner && !isTie) {
            gameBoard.setMark(clickedBtnIndex, currentPlayer.getPlayerMark());
            renderGameBoard();
            checkWinConditions();
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


