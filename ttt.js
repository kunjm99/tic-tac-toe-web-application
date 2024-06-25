const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameState[index] !== null || checkWin()) {
        return;
    }
    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (!gameState.includes(null)) {
        setTimeout(() => alert('Draw!'), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === gameState[b] && gameState[b] === gameState[c] && gameState[a] !== null;
    });
}

function restartGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
