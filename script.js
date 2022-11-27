"use strict"

const gameBoard = (() => {
    let board = new Array(9);

    const getMark = (index) => {
        return board[index];
    }

    const setMark = (index, typeMark) => {
        board[index] = typeMark;
    }

    const reset = () => {
        board = new Array(9);
    }

    return { getMark, setMark, reset }
})();

let gameBoardEl = document.querySelector('.game-board');
let winnerEl = document.querySelector('.winner');
let winnerNameEl = document.getElementById('winner');
let tieEl = document.querySelector('.tie');
let winMsgEl = document.querySelector('.win-message');
let overlayEl = document.querySelector('.overlay');
let resetBtn = document.querySelector('.reset');


function showWinMessage() {
    overlayEl.classList.add('active');
    winMsgEl.classList.add('active');
}

function hideWinMessage() {
    overlayEl.classList.remove('active');
    winMsgEl.classList.remove('active');
}

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

    const reset = () => {
        winner = undefined;
        isTie = false;
        currentRound = 1;
        currentPlayer = undefined;;
        clickedBtnIndex = undefined;
    }

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
                setTimeout(function () {
                    showWinMessage();
                    winnerEl.classList.add('active');
                    winnerNameEl.textContent = winner.getPlayerName();
                }, 500)
                return;
            }
        }
        isTie = currentRound === 9;
        if (isTie) {
            setTimeout(function () {
                showWinMessage();
                tieEl.classList.add('active');
            }, 500)
        }

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

    return { playRound, setClickedBtnIndex, reset };
})();



const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', '0');


renderGameBoard();

gameBoardEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cell')) {
        return;
    } else {
        GameController.setClickedBtnIndex(parseInt(e.target.id));
        GameController.playRound();
    }
});

resetBtn.addEventListener('click', (e) => {
    e.preventDefault;
    let activeEls = document.querySelectorAll('.active');
    gameBoard.reset();
    GameController.reset();
    for (let el of activeEls) {
        el.classList.remove('active');
    }
    renderGameBoard();
})

