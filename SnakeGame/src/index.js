const menuView = document.querySelector('#menuView')
const selectView = document.querySelector('#selectView')
const gameView = document.querySelector('#gameView')

const board = document.querySelector('#board');
const currentScore = document.querySelector('#currentScore');
const restartButton = document.querySelector('#restartButton');
const startButton = document.querySelector('#startButton');

let snakeDirection = 'right';
let snakeBody = [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }];
let foodPosition = { x: 5, y: 5 };
let score = 0;

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    if (event.key === 'ArrowUp' && snakeDirection !== 'down') {
        snakeDirection = 'up';
    } else if (event.key === 'ArrowDown' && snakeDirection !== 'up') {
        snakeDirection = 'down';
    } else if (event.key === 'ArrowLeft' && snakeDirection !== 'right') {
        snakeDirection = 'left';
    } else if (event.key === 'ArrowRight' && snakeDirection !== 'left') {
        snakeDirection = 'right';
    }
}

function renderBoard() {
    board.innerHTML = '';
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (row === foodPosition.y && col === foodPosition.x) {
                cell.classList.add('food');
            }
            snakeBody.forEach((segment) => {
                if (segment.x === col && segment.y === row) {
                    cell.classList.add('snake');
                }
            });
            board.appendChild(cell);
        }
    }
}

function moveSnake() {
    const head = { ...snakeBody[0] };

    if (snakeDirection === 'up') {
        head.y -= 1;
    } else if (snakeDirection === 'down') {
        head.y += 1;
    } else if (snakeDirection === 'left') {
        head.x -= 1;
    } else if (snakeDirection === 'right') {
        head.x += 1;
    }

    snakeBody.unshift(head);

    if (head.x === foodPosition.x && head.y === foodPosition.y) {
        score++;
        generateFood();
    } else {
        snakeBody.pop();
    }

    if (head.x < 0 || head.x >= 10 || head.y < 0 || head.y >= 10 || checkCollision()) {
        restartGame();
    }

    renderBoard();
}

function checkCollision() {
    const [head, ...body] = snakeBody;
    return body.some(segment => segment.x === head.x && segment.y === head.y);
}

function generateFood() {
    foodPosition = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10)
    };
}

function restartGame() {
    snakeBody = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];
    foodPosition = { x: 5, y: 5 };
    snakeDirection = 'right';
    score = 0;
}

function gameLoop() {
    moveSnake();
    renderBoard();
}

let gameInterval;

restartButton.onclick = () => {
    clearInterval(gameInterval)
    gameInterval = setInterval(gameLoop, 200)

};

renderBoard();