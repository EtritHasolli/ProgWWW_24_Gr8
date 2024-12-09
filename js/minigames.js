const lightDark = document.getElementById('lightDark');
const lightDarkBtn = document.getElementById('light_dark_button');
const colorModal = document.getElementById('colorPickerModal')
const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('reset_button');

let columns = 16; // Changeable via user input
let mineCount = Math.floor(columns ** 2 / 7.5);
let board = [];
let revealed = [];
let flagged = [];
let gameRunning = true;

// Toggle Light/Dark Mode
lightDarkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Initialize the game
function initGame() {
    board = Array(columns).fill(null).map(() => Array(columns).fill(0));
    revealed = Array(columns).fill(null).map(() => Array(columns).fill(false));
    flagged = Array(columns).fill(null).map(() => Array(columns).fill(false));
    placeMines();
    calculateNumbers();
    renderBoard();
}

// Place mines randomly
function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        const row = Math.floor(Math.random() * columns);
        const col = Math.floor(Math.random() * columns);
        if (board[row][col] !== 'X') {
            board[row][col] = 'X';
            minesPlaced++;
        }
    }
}

// Calculate numbers
function calculateNumbers() {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    for (let r = 0; r < columns; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 'X') continue;
            let count = 0;
            directions.forEach(([dr, dc]) => {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < columns && nc >= 0 && nc < columns && board[nr][nc] === 'X') {
                    count++;
                }
            });
            board[r][c] = count;
        }
    }
}

// Render the board
function renderBoard() {
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gameBoard.innerHTML = '';
    for (let r = 0; r < columns; r++) {
        for (let c = 0; c < columns; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;

            if (revealed[r][c]) {
                cell.classList.add('revealed');
                cell.textContent = board[r][c] === 0 ? '' : board[r][c];
            } else if (flagged[r][c]) {
                cell.classList.add('flagged');
            }

            cell.addEventListener('click', () => revealCell(r, c));
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                toggleFlag(r, c);
            });

            gameBoard.appendChild(cell);
        }
    }
}

// Reveal a cell
function revealCell(r, c) {
    if (!gameRunning || revealed[r][c] || flagged[r][c]) return;
    revealed[r][c] = true;
    if (board[r][c] === 'X') {
        gameRunning = false;
        alert('Game Over!');
        return;
    }
    if (board[r][c] === 0) {
        floodFill(r, c);
    }
    checkWin();
    renderBoard();
}

// Toggle a flag
function toggleFlag(r, c) {
    if (revealed[r][c]) return;
    flagged[r][c] = !flagged[r][c];
    renderBoard();
}

// Flood fill for empty cells
function floodFill(r, c) {
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    directions.forEach(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < columns && nc >= 0 && nc < columns && !revealed[nr][nc]) {
            revealCell(nr, nc);
        }
    });
}

// Check for win
function checkWin() {
    let safeCells = 0;
    for (let r = 0; r < columns; r++) {
        for (let c = 0; c < columns; c++) {
            if (revealed[r][c] && board[r][c] !== 'X') safeCells++;
        }
    }
    if (safeCells === columns ** 2 - mineCount) {
        gameRunning = false;
        alert('You Win!');
    }
}

// Reset the game
resetButton.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    // Reset the game state
    gameRunning = true;
    board = [];
    revealed = [];
    flagged = [];
    // Reinitialize the game
    initGame();
}

// Start the game
initGame();


window.onclick = (event) => {
    if (event.target === colorModal) colorModal.style.display = 'none';
}

// Color picker js
// Open the color picker modal
document.getElementById('openColorPickerBtn').addEventListener('click', function () {
    // Fetch colors from localStorage
    const headerColor = localStorage.getItem('headerColor') || '#356859';
    const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
    const cellColor = localStorage.getItem('cellColor') || '#356859';
    const cellRevealColor = localStorage.getItem('cellRevealColor') || '#fff';
    const cellTextColor = localStorage.getItem('cellTextColor') || '#2b2b2e';
    const flagColor = localStorage.getItem('flagColor') || '#4a7c68';
    const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

    // Set input values
    document.getElementById('headerColorInput').value = headerColor;
    document.getElementById('backgroundColorInput').value = backgroundColor;
    document.getElementById('cellColorInput').value = cellColor;
    document.getElementById('cellRevealColorInput').value = cellRevealColor;
    document.getElementById('cellTextColorInput').value = cellTextColor;
    document.getElementById('flagColorInput').value = flagColor;
    document.getElementById('buttonColorInput').value = buttonColor;

    // Open the color picker modal
    document.getElementById('colorPickerModal').style.display = 'block';
});


// Close the color picker modal
document.getElementById('closeColorPickerModal').addEventListener('click', function() {
    document.getElementById('colorPickerModal').style.display = 'none';
});

// Apply selected colors to the CSS custom properties
document.getElementById('applyColorsBtn').addEventListener('click', function() {
    const headerColor = document.getElementById('headerColorInput').value;
    const backgroundColor = document.getElementById('backgroundColorInput').value;
    const cellColor = document.getElementById('cellColorInput').value;
    const cellRevealColor = document.getElementById('cellRevealColorInput').value;
    const cellTextColor = document.getElementById('cellTextColorInput').value;
    const flagColor = document.getElementById('flagColorInput').value;
    const buttonColor = document.getElementById('buttonColorInput').value;

    // Set CSS variables dynamically
    document.documentElement.style.setProperty('--header-color', headerColor);
    document.documentElement.style.setProperty('--background-color', backgroundColor);
    document.documentElement.style.setProperty('--cell-color', cellColor);
    document.documentElement.style.setProperty('--cell-reveal-color', cellRevealColor);
    document.documentElement.style.setProperty('--cell-text-color', cellTextColor);
    document.documentElement.style.setProperty('--flag-color', flagColor);
    document.documentElement.style.setProperty('--button-color', buttonColor);

    // Save custom colors to localStorage
    localStorage.setItem('previousTheme', 'custom');
    localStorage.setItem('headerColor', headerColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('cellColor', cellColor);
    localStorage.setItem('cellRevealColor', cellRevealColor);
    localStorage.setItem('cellTextColor', cellTextColor);
    localStorage.setItem('flagColor', flagColor);
    localStorage.setItem('buttonColor', buttonColor);

    document.body.classList.add('custom');
    localStorage.setItem('darkMode', 'false');
    document.body.classList.remove('dark-mode', 'light-mode-defaults');
});

function loadBody() {
    const darkMode = localStorage.getItem('darkMode') === 'true'; // Retrieve dark mode status
    const previousTheme = localStorage.getItem('previousTheme') || 'light'; // Retrieve previous theme

    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode-defaults', 'custom');
    } else {
        if (previousTheme === 'custom') {
            const headerColor = localStorage.getItem('headerColor') || '#356859';
            const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
            const cellColor = localStorage.getItem('cellColor') || '#356859';
            const cellRevealColor = localStorage.getItem('cellRevealColor') || '#fff';
            const cellTextColor = localStorage.getItem('cellTextColor') || '#2b2b2e';
            const flagColor = localStorage.getItem('flagColor') || '#4a7c68';
            const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

            // Set custom CSS properties
            document.documentElement.style.setProperty('--header-color', headerColor);
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--cell-color', cellColor);
            document.documentElement.style.setProperty('--cell-reveal-color', cellRevealColor);
            document.documentElement.style.setProperty('--cell-text-color', cellTextColor);
            document.documentElement.style.setProperty('--flag-color', flagColor);
            document.documentElement.style.setProperty('--button-color', buttonColor);

            // Apply 'custom' class
            document.body.classList.add('custom');
            document.body.classList.remove('light-mode-defaults');
        } else {
            document.body.classList.add('light-mode-defaults');
            document.body.classList.remove('custom');
        }
        document.body.classList.remove('dark-mode');
    }
}

// Toggle theme when the button is clicked
document.getElementById('light_dark_button').addEventListener('click', function () {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const previousTheme = localStorage.getItem('previousTheme') || 'light';

    if (isDarkMode) {
        localStorage.setItem('darkMode', 'false');

        if (previousTheme === 'custom') {
            const headerColor = localStorage.getItem('headerColor') || '#356859';
            const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
            const popColor = localStorage.getItem('popColor') || '#356859';
            const accentColor = localStorage.getItem('accentColor') || '#4a7c68';
            const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

            document.documentElement.style.setProperty('--header-color', headerColor);
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--pop-color', popColor);
            document.documentElement.style.setProperty('--accent-color', accentColor);
            document.documentElement.style.setProperty('--button-color', buttonColor);

            document.body.classList.add('custom');
            lightDark.classList.replace('fa-sun-o', 'fa-moon-o');
            lightDarkBtn.style.paddingTop = "6px";
            lightDarkBtn.style.paddingBottom = "6px";
            lightDarkBtn.style.paddingLeft = "11px";
            lightDarkBtn.style.paddingRight =  "11px";
            document.body.classList.remove('light-mode-defaults', 'dark-mode');
        } else {
            document.body.classList.add('light-mode-defaults');
            lightDark.classList.replace('fa-sun-o', 'fa-moon-o');
            lightDarkBtn.style.paddingTop = "6px";
            lightDarkBtn.style.paddingBottom = "6px";
            lightDarkBtn.style.paddingLeft = "11px";
            lightDarkBtn.style.paddingRight =  "11px";
            document.body.classList.remove('custom', 'dark-mode');
        }
    } else {
        const isCustom = document.body.classList.contains('custom');
        localStorage.setItem('previousTheme', isCustom ? 'custom' : 'light');
        localStorage.setItem('darkMode', 'true');

        document.body.classList.add('dark-mode');
        lightDark.classList.replace('fa-moon-o', 'fa-sun-o');
        lightDarkBtn.style.paddingTop = "6px";
        lightDarkBtn.style.paddingBottom = "6px";
        lightDarkBtn.style.paddingLeft = "9px";
        lightDarkBtn.style.paddingRight = "9px";
        document.body.classList.remove('light-mode-defaults', 'custom');
    }
});

// Reset to default light/dark mode when the defaultColorsBtn is clicked
document.getElementById('defaultColorsBtn').addEventListener('click', function () {
    document.body.classList.add('light-mode-defaults');
    let currentTheme = document.body.classList.contains('light-mode-defaults') ? 'light' : 'dark';
    document.body.classList.remove('dark-mode', 'custom');
    localStorage.setItem('previousTheme', currentTheme);

    // Reset CSS custom properties
    document.documentElement.style.removeProperty('--background-color');
    document.documentElement.style.removeProperty('--cell-color');
    document.documentElement.style.removeProperty('--flag-color');
    document.documentElement.style.removeProperty('--button-color');
});
// Get the modal and close button
const welcomeModal = document.getElementById('welcomeModal');
const closeWelcomeModal = document.getElementById('closeWelcomeModal');

// Show the modal on page load
window.addEventListener('load', () => {
    welcomeModal.style.display = 'block';
});

// Close the modal when the button is clicked
closeWelcomeModal.addEventListener('click', () => {
    welcomeModal.style.display = 'none';
});
