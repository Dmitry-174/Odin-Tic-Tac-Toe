"use strict"

const gameBoard = (() => {
    let board = new Array(9);

    const getMark = (index) => {
        return board[index];
    }

    const setMark = (index, typeMark) => {
        board[index] = typeMark;
    }

    return {getMark, setMark}
})();

console.dir(gameBoard.board);
console.dir(gameBoard.setMark(1, 'X'));
console.dir(gameBoard.getMark(1));
