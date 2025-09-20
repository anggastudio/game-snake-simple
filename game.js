// Game Configuration
const GAME_CONFIG = {
    CANVAS_WIDTH: 600,
    CANVAS_HEIGHT: 400,
    GRID_SIZE: 20,
    INITIAL_SNAKE_LENGTH: 3,
    GAME_SPEED: 150,
    COLORS: {
        SNAKE: '#DC2626',
        SNAKE_BORDER: '#991B1B',
        SNAKE_HEAD: '#EF4444',
        FOOD: '#FFFFFF',
        FOOD_BORDER: '#DC2626',
        BACKGROUND: '#000000',
        GRID: '#1F2937'
    }
};

// Game State
let gameState = {
    snake: [
        {x: 10, y: 10},
        {x: 9, y: 10},
        {x: 8, y: 10}
    ],
    food: {x: 15, y: 15},
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    score: 0,
    isRunning: false,
    gameOver: false,
    isPaused: false
};

// DOM Elements
let canvas, ctx;
let scoreElement, highScoreElement, finalScoreElement, modalHighScoreElement;
let startBtn, pauseBtn, resetBtn, restartBtn, gameOverModal;

// Game Loop
let gameInterval;

// Initialize Game
function initGame() {
    // Get DOM elements
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    scoreElement = document.getElementById('score');
    highScoreElement = document.getElementById('highScore');
    finalScoreElement = document.getElementById('finalScore');
    modalHighScoreElement = document.getElementById('modalHighScore');
    
    startBtn = document.getElementById('startBtn');
    pauseBtn = document.getElementById('pauseBtn');
    resetBtn = document.getElementById('resetBtn');
    restartBtn = document.getElementById('restartBtn');
    gameOverModal = document.getElementById('gameOverModal');
    
    // Set canvas size
    canvas.width = GAME_CONFIG.CANVAS_WIDTH;
    canvas.height = GAME_CONFIG.CANVAS_HEIGHT;
    
    // Load high score
    loadHighScore();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial render
    render();
    updateUI();
}

// Event Listeners
function setupEventListeners() {
    // Button events
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    resetBtn.addEventListener('click', resetGame);
    restartBtn.addEventListener('click', restartGame);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyPress);
}

// Keyboard Input Handler
function handleKeyPress(event) {
    if (!gameState.isRunning || gameState.gameOver) return;
    
    const key = event.key.toLowerCase();
    
    // Prevent default behavior for game keys
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        event.preventDefault();
    }
    
    switch (key) {
        case 'arrowup':
        case 'w':
            if (gameState.direction !== 'DOWN') {
                gameState.nextDirection = 'UP';
            }
            break;
        case 'arrowdown':
        case 's':
            if (gameState.direction !== 'UP') {
                gameState.nextDirection = 'DOWN';
            }
            break;
        case 'arrowleft':
        case 'a':
            if (gameState.direction !== 'RIGHT') {
                gameState.nextDirection = 'LEFT';
            }
            break;
        case 'arrowright':
        case 'd':
            if (gameState.direction !== 'LEFT') {
                gameState.nextDirection = 'RIGHT';
            }
            break;
        case ' ':
            event.preventDefault();
            togglePause();
            break;
    }
}

// Game Control Functions
function startGame() {
    if (gameState.gameOver) {
        resetGame();
    }
    
    gameState.isRunning = true;
    gameState.isPaused = false;
    
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    
    gameInterval = setInterval(gameLoop, GAME_CONFIG.GAME_SPEED);
    updateUI();
}

function togglePause() {
    if (!gameState.isRunning || gameState.gameOver) return;
    
    gameState.isPaused = !gameState.isPaused;
    
    if (gameState.isPaused) {
        clearInterval(gameInterval);
    } else {
        gameInterval = setInterval(gameLoop, GAME_CONFIG.GAME_SPEED);
    }
    
    updateUI();
}

function resetGame() {
    clearInterval(gameInterval);
    
    gameState = {
        snake: [
            {x: 10, y: 10},
            {x: 9, y: 10},
            {x: 8, y: 10}
        ],
        food: {x: 15, y: 15},
        direction: 'RIGHT',
        nextDirection: 'RIGHT',
        score: 0,
        isRunning: false,
        gameOver: false,
        isPaused: false
    };
    
    generateFood();
    hideGameOverModal();
    render();
    updateUI();
}

function restartGame() {
    resetGame();
    startGame();
}

// Game Loop
function gameLoop() {
    if (gameState.isPaused || gameState.gameOver) return;
    
    // Update direction
    gameState.direction = gameState.nextDirection;
    
    // Move snake
    moveSnake();
    
    // Check collisions
    if (checkCollision()) {
        gameOver();
        return;
    }
    
    // Check food collision
    if (checkFoodCollision()) {
        eatFood();
        generateFood();
    }
    
    // Render game
    render();
}

// Snake Movement
function moveSnake() {
    const head = {...gameState.snake[0]};
    
    switch (gameState.direction) {
        case 'UP':
            head.y -= 1;
            break;
        case 'DOWN':
            head.y += 1;
            break;
        case 'LEFT':
            head.x -= 1;
            break;
        case 'RIGHT':
            head.x += 1;
            break;
    }
    
    gameState.snake.unshift(head);
    
    // Remove tail if no food eaten
    if (!checkFoodCollision()) {
        gameState.snake.pop();
    }
}

// Collision Detection
function checkCollision() {
    const head = gameState.snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.GRID_SIZE ||
        head.y < 0 || head.y >= GAME_CONFIG.CANVAS_HEIGHT / GAME_CONFIG.GRID_SIZE) {
        return true;
    }
    
    // Self collision
    for (let i = 1; i < gameState.snake.length; i++) {
        if (head.x === gameState.snake[i].x && head.y === gameState.snake[i].y) {
            return true;
        }
    }
    
    return false;
}

function checkFoodCollision() {
    const head = gameState.snake[0];
    return head.x === gameState.food.x && head.y === gameState.food.y;
}

// Food System
function generateFood() {
    let newFood;
    let validPosition = false;
    
    while (!validPosition) {
        newFood = {
            x: Math.floor(Math.random() * (GAME_CONFIG.CANVAS_WIDTH / GAME_CONFIG.GRID_SIZE)),
            y: Math.floor(Math.random() * (GAME_CONFIG.CANVAS_HEIGHT / GAME_CONFIG.GRID_SIZE))
        };
        
        validPosition = true;
        
        // Check if food spawns on snake
        for (let segment of gameState.snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                validPosition = false;
                break;
            }
        }
    }
    
    gameState.food = newFood;
}

function eatFood() {
    gameState.score += 10;
    updateScore();
}

// Score System
function updateScore() {
    scoreElement.textContent = gameState.score;
    
    const highScore = getHighScore();
    if (gameState.score > highScore) {
        saveHighScore(gameState.score);
        highScoreElement.textContent = gameState.score;
    }
}

function getHighScore() {
    return parseInt(localStorage.getItem('snakeHighScore') || '0');
}

function saveHighScore(score) {
    localStorage.setItem('snakeHighScore', score.toString());
}

function loadHighScore() {
    const highScore = getHighScore();
    highScoreElement.textContent = highScore;
}

// Game Over
function gameOver() {
    gameState.gameOver = true;
    gameState.isRunning = false;
    clearInterval(gameInterval);
    
    showGameOverModal();
    updateUI();
}

function showGameOverModal() {
    finalScoreElement.textContent = gameState.score;
    modalHighScoreElement.textContent = getHighScore();
    gameOverModal.classList.remove('hidden');
}

function hideGameOverModal() {
    gameOverModal.classList.add('hidden');
}

// UI Updates
function updateUI() {
    if (gameState.gameOver) {
        startBtn.textContent = 'Mulai Lagi';
        pauseBtn.disabled = true;
    } else if (gameState.isRunning && !gameState.isPaused) {
        startBtn.textContent = 'Berjalan';
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        pauseBtn.textContent = 'Pause';
    } else if (gameState.isPaused) {
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        pauseBtn.textContent = 'Lanjut';
    } else {
        startBtn.textContent = 'Mulai';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.textContent = 'Pause';
    }
}

// Rendering
function render() {
    // Clear canvas
    ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid (optional)
    drawGrid();
    
    // Draw food
    drawFood();
    
    // Draw snake
    drawSnake();
}

function drawGrid() {
    ctx.strokeStyle = GAME_CONFIG.COLORS.GRID;
    ctx.lineWidth = 0.5;
    
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += GAME_CONFIG.GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += GAME_CONFIG.GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawSnake() {
    gameState.snake.forEach((segment, index) => {
        const x = segment.x * GAME_CONFIG.GRID_SIZE;
        const y = segment.y * GAME_CONFIG.GRID_SIZE;
        
        // Snake body
        ctx.fillStyle = index === 0 ? GAME_CONFIG.COLORS.SNAKE_HEAD : GAME_CONFIG.COLORS.SNAKE;
        ctx.fillRect(x, y, GAME_CONFIG.GRID_SIZE, GAME_CONFIG.GRID_SIZE);
        
        // Snake border
        ctx.strokeStyle = GAME_CONFIG.COLORS.SNAKE_BORDER;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, GAME_CONFIG.GRID_SIZE, GAME_CONFIG.GRID_SIZE);
    });
}

function drawFood() {
    const x = gameState.food.x * GAME_CONFIG.GRID_SIZE;
    const y = gameState.food.y * GAME_CONFIG.GRID_SIZE;
    const centerX = x + GAME_CONFIG.GRID_SIZE / 2;
    const centerY = y + GAME_CONFIG.GRID_SIZE / 2;
    const radius = GAME_CONFIG.GRID_SIZE / 2 - 2;
    
    // Food circle
    ctx.fillStyle = GAME_CONFIG.COLORS.FOOD;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Food border
    ctx.strokeStyle = GAME_CONFIG.COLORS.FOOD_BORDER;
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

// Handle window resize
window.addEventListener('resize', () => {
    // Maintain canvas aspect ratio on mobile
    if (window.innerWidth <= 768) {
        const container = canvas.parentElement;
        const containerWidth = container.offsetWidth;
        const aspectRatio = GAME_CONFIG.CANVAS_HEIGHT / GAME_CONFIG.CANVAS_WIDTH;
        
        if (containerWidth < GAME_CONFIG.CANVAS_WIDTH) {
            canvas.style.width = containerWidth + 'px';
            canvas.style.height = (containerWidth * aspectRatio) + 'px';
        } else {
            canvas.style.width = GAME_CONFIG.CANVAS_WIDTH + 'px';
            canvas.style.height = GAME_CONFIG.CANVAS_HEIGHT + 'px';
        }
    }
});