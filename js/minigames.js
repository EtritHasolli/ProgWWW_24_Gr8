const lightDark = document.getElementById('lightDark');
const lightDarkBtn = document.getElementById('light_dark_button');

const colorModal = document.getElementById('colorPickerModal')

window.onclick = (event) => {
    if (event.target === colorModal) colorModal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    // Event listeners for difficulty buttons
    document.getElementById('easyButton').addEventListener('click', () => setDifficulty('easy'));
    document.getElementById('mediumButton').addEventListener('click', () => setDifficulty('medium'));
    document.getElementById('hardButton').addEventListener('click', () => setDifficulty('hard'));

    // Event listener for Start New Game button
    document.getElementById('startSudokuButton').addEventListener('click', startNewSudoku);

    // Event listener for Check Solution button
    document.getElementById('checkButton').addEventListener('click', checkSudoku);

    // Event listener for Hint button
    document.getElementById('hintButton').addEventListener('click', giveHint);
});

let difficulty = 'medium'; // Default difficulty

function setDifficulty(level) {
    difficulty = level;
    console.log('Difficulty set to:', level);
    startNewSudoku(); // Start a new game whenever difficulty changes
}

function generateSudokuPuzzle(difficulty) {
    const grid = solveSudokuGrid();
    const preFillCounts = { easy: 36, medium: 28, hard: 22 };
    const puzzle = grid.map(row => row.slice());

    let emptyCells = 81 - preFillCounts[difficulty];
    while (emptyCells > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            emptyCells--;
        }
    }

    return puzzle;
}

function solveSudokuGrid() {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    function isSafe(grid, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) return false;
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    function solve(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isSafe(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (solve(grid)) return true;
                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve(grid);
    return grid;
}

function startNewSudoku() {
    const sudokuGrid = document.getElementById('sudokuGrid');
    sudokuGrid.innerHTML = '';

    const grid = generateSudokuPuzzle(difficulty);

    for (let i = 0; i < 9; i++) {
        const row = document.createElement('div');
        row.classList.add('sudoku-row');

        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            if (i % 3 === 0 && i !== 0) cell.style.borderLeft = '3px solid #333';
            if (j % 3 === 0 && j !== 0) cell.style.borderTop = '3px solid #333';
            if (i === 8) cell.style.borderRight = '3px solid #333';
            if (j === 8) cell.style.borderBottom = '3px solid #333';

            if (grid[i][j] !== 0) {
                cell.textContent = grid[i][j];
                cell.classList.add('prefilled');
            }

            row.appendChild(cell);
        }

        sudokuGrid.appendChild(row);
    }

    createNumberSelector();
}

function createNumberSelector() {
    const numberSelector = document.getElementById('numberSelector');
    numberSelector.innerHTML = '';

    for (let i = 1; i <= 9; i++) {
        const numberButton = document.createElement('button');
        numberButton.textContent = i;
        numberButton.classList.add('number-button');
        numberButton.addEventListener('click', () => selectNumber(i));
        numberSelector.appendChild(numberButton);
    }

    const clearButton = document.createElement('button');
    clearButton.textContent = "Clr";
    clearButton.classList.add('number-button');
    clearButton.addEventListener('click', () => selectNumber(null));
    numberSelector.appendChild(clearButton);
}

let selectedNumber = null;

function selectNumber(number) {
    selectedNumber = number;

    document.querySelectorAll('.number-button').forEach(button => {
        button.classList.toggle('selected', button.textContent == number || (number === null && button.textContent === "Clr"));
    });
}

function placeNumber(cell, row, col) {
    if (cell.textContent == selectedNumber && !cell.classList.contains('prefilled')) {
        cell.textContent = '';
        cell.classList.remove('active', 'error');
        return;
    }

    if (selectedNumber !== null && !cell.classList.contains('prefilled')) {
        cell.textContent = selectedNumber;
        cell.classList.add('active');
        validateNumberPlacement(cell, row, col);
    }
}

function validateNumberPlacement(cell, row, col) {
    const grid = getGridValues();

    if (!isSafeToPlace(grid, row, col, parseInt(cell.textContent))) {
        cell.classList.add('error');
    } else {
        cell.classList.remove('error');
    }
}

function getGridValues() {
    const grid = [];
    const rows = document.querySelectorAll('.sudoku-row');

    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('.sudoku-cell').forEach(cell => {
            const value = cell.textContent ? parseInt(cell.textContent) : 0;
            rowData.push(value);
        });
        grid.push(rowData);
    });

    return grid;
}

function checkSudoku() {
    const grid = getGridValues();
    const isValid = validateSudoku(grid);
    document.getElementById('resultMessage').textContent = isValid ? 'Correct Solution!' : 'Incorrect Solution, try again.';
}

function validateSudoku(grid) {
    for (let i = 0; i < 9; i++) {
        if (!isValidGroup(grid[i]) || !isValidGroup(grid.map(row => row[i]))) return false;
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            const subgrid = [];
            for (let k = 0; k < 3; k++) subgrid.push(...grid[i + k].slice(j, j + 3));
            if (!isValidGroup(subgrid)) return false;
        }
    }
    return true;
}

function isValidGroup(group) {
    const values = group.filter(num => num > 0);
    return new Set(values).size === values.length;
}

function giveHint() {
    const grid = getGridValues();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                document.querySelectorAll('.sudoku-cell')[i * 9 + j].textContent = solveSudokuGrid()[i][j];
                return;
            }
        }
    }
}

document.getElementById('light_dark_button').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (lightDark.classList.contains('fa-moon-o')) {
        lightDark.classList.replace('fa-moon-o', 'fa-sun-o');
        lightDarkBtn.style.paddingTop = '6px';
        lightDarkBtn.style.paddingRight = '8px';
        lightDarkBtn.style.paddingLeft = '8px';
        lightDarkBtn.style.paddingBottom = '6px';
    } else {
        lightDark.classList.replace('fa-sun-o', 'fa-moon-o');
        lightDarkBtn.style.paddingTop = '6px';
        lightDarkBtn.style.paddingLeft = '10px';
        lightDarkBtn.style.paddingRight = '10px';
        lightDarkBtn.style.paddingBottom = '6px';
    }
});


/*
document.addEventListener("DOMContentLoaded", function() {
    // Difficulty buttons
    document.getElementById('easyButton').addEventListener('click', () => setDifficulty('easy'));
    document.getElementById('mediumButton').addEventListener('click', () => setDifficulty('medium'));
    document.getElementById('hardButton').addEventListener('click', () => setDifficulty('hard'));

    // Game controls
    document.getElementById('startSudokuButton').addEventListener('click', startNewSudoku);
    document.getElementById('checkButton').addEventListener('click', checkSudoku);
    document.getElementById('hintButton').addEventListener('click', giveHint);
});

let difficulty = 'medium'; // Default difficulty

function setDifficulty(level) {
    difficulty = level;
    console.log('Difficulty set to:', level);
    startNewSudoku(); // Refresh game on difficulty change
}

function generateSudokuPuzzle(difficulty) {
    const grid = solveSudokuGrid();
    const preFillCounts = { easy: 36, medium: 28, hard: 22 };
    const puzzle = grid.map(row => row.slice());

    let emptyCells = 81 - preFillCounts[difficulty];
    while (emptyCells > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            emptyCells--;
        }
    }

    return puzzle;
}

function solveSudokuGrid() {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    function isSafe(grid, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) return false;
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    function solve(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isSafe(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (solve(grid)) return true;
                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve(grid);
    return grid;
}

function startNewSudoku() {
    const sudokuGrid = document.getElementById('sudokuGrid');
    sudokuGrid.innerHTML = '';

    const grid = generateSudokuPuzzle(difficulty);

    for (let i = 0; i < 9; i++) {
        const row = document.createElement('div');
        row.classList.add('sudoku-row');

        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            cell.dataset.row = i;
            cell.dataset.col = j;

            if (grid[i][j] !== 0) {
                cell.textContent = grid[i][j];
                cell.classList.add('prefilled');
            } else {
                // Add click event for empty cells
                cell.addEventListener('click', () => placeNumber(cell, i, j));
            }

            row.appendChild(cell);
        }

        sudokuGrid.appendChild(row);
    }

    createNumberSelector();
}

function createNumberSelector() {
    const numberSelector = document.getElementById('numberSelector');
    numberSelector.innerHTML = '';

    for (let i = 1; i <= 9; i++) {
        const numberButton = document.createElement('button');
        numberButton.textContent = i;
        numberButton.classList.add('number-button');
        numberButton.addEventListener('click', () => selectNumber(i));
        numberSelector.appendChild(numberButton);
    }

    const clearButton = document.createElement('button');
    clearButton.textContent = "Clr";
    clearButton.classList.add('number-button');
    clearButton.addEventListener('click', () => selectNumber(null));
    numberSelector.appendChild(clearButton);
}

let selectedNumber = null;

function selectNumber(number) {
    selectedNumber = number;

    document.querySelectorAll('.number-button').forEach(button => {
        button.classList.toggle('selected', button.textContent == number || (number === null && button.textContent === "Clr"));
    });
}

function placeNumber(cell, row, col) {
    if (selectedNumber === null || cell.classList.contains('prefilled')) return;

    // Place or remove number
    cell.textContent = cell.textContent == selectedNumber ? '' : selectedNumber;
    validateNumberPlacement(cell, row, col);
}

function validateNumberPlacement(cell, row, col) {
    const grid = getGridValues();
    cell.classList.toggle('error', !isSafeToPlace(grid, row, col, parseInt(cell.textContent)));
}

function isSafeToPlace(grid, row, col, num) {
    if (isNaN(num)) return true;

    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) return false;
        }
    }

    return true;
}

function getGridValues() {
    const grid = [];
    const rows = document.querySelectorAll('.sudoku-row');

    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('.sudoku-cell').forEach(cell => {
            const value = cell.textContent ? parseInt(cell.textContent) : 0;
            rowData.push(value);
        });
        grid.push(rowData);
    });

    return grid;
}

function checkSudoku() {
    const grid = getGridValues();
    const isValid = validateSudoku(grid);
    document.getElementById('resultMessage').textContent = isValid ? 'Correct Solution!' : 'Incorrect Solution, try again.';
}

function validateSudoku(grid) {
    for (let i = 0; i < 9; i++) {
        if (!isValidGroup(grid[i]) || !isValidGroup(grid.map(row => row[i]))) return false;
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            const subgrid = [];
            for (let k = 0; k < 3; k++) subgrid.push(...grid[i + k].slice(j, j + 3));
            if (!isValidGroup(subgrid)) return false;
        }
    }
    return true;
}

function isValidGroup(group) {
    const values = group.filter(num => num > 0);
    return new Set(values).size === values.length;
}

function giveHint() {
    const grid = getGridValues();
    const solution = solveSudokuGrid();

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                document.querySelectorAll('.sudoku-cell')[i * 9 + j].textContent = solution[i][j];
                return;
            }
        }
    }
}
*/

// Color picker js
// Open the color picker modal
document.getElementById('openColorPickerBtn').addEventListener('click', function () {
    // Fetch colors from localStorage
    const headerColor = localStorage.getItem('headerColor') || '#356859';
    const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
    const popColor = localStorage.getItem('popColor') || '#356859';
    const accentColor = localStorage.getItem('accentColor') || '#4a7c68';
    const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

    // Set input values
    document.getElementById('headerColorInput').value = headerColor;
    document.getElementById('backgroundColorInput').value = backgroundColor;
    document.getElementById('popColorInput').value = popColor;
    document.getElementById('accentColorInput').value = accentColor;
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
    const popColor = document.getElementById('popColorInput').value;
    const accentColor = document.getElementById('accentColorInput').value;
    const buttonColor = document.getElementById('buttonColorInput').value;

    // Set CSS variables dynamically
    document.documentElement.style.setProperty('--header-color', headerColor);
    document.documentElement.style.setProperty('--background-color', backgroundColor);
    document.documentElement.style.setProperty('--pop-color', popColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty('--button-color', buttonColor);

    // Save custom colors to localStorage
    localStorage.setItem('theme', 'custom');
    localStorage.setItem('headerColor', headerColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('popColor', popColor);
    localStorage.setItem('accentColor', accentColor);
    localStorage.setItem('buttonColor', buttonColor);

    document.body.classList.add('custom');
    document.body.classList.remove('dark-mode', 'light-mode-defaults');

    // Close the modal after applying colors
    // document.getElementById('colorPickerModal').style.display = 'none';
});

function loadBody() {
    let theme = localStorage.getItem('theme') || 'light';
    console.log("Loaded theme from localStorage:", theme); // Debug log

    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode-defaults', 'custom');
    } else if (theme === 'light') {
        document.body.classList.add('light-mode-defaults');
        document.body.classList.remove('dark-mode', 'custom');
    } else if (theme === 'custom') {
        // Apply custom theme from localStorage
        const headerColor = localStorage.getItem('headerColor') || '#356859';
        const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
        const popColor = localStorage.getItem('popColor') || '#356859';
        const accentColor = localStorage.getItem('accentColor') || '#4a7c68';
        const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

        // Set CSS variables dynamically
        document.documentElement.style.setProperty('--header-color', headerColor);
        document.documentElement.style.setProperty('--background-color', backgroundColor);
        document.documentElement.style.setProperty('--pop-color', popColor);
        document.documentElement.style.setProperty('--accent-color', accentColor);
        document.documentElement.style.setProperty('--button-color', buttonColor);

        document.body.classList.add('custom');
        document.body.classList.remove('dark-mode', 'light-mode-defaults');
    } else {
        document.body.classList.add('light-mode-defaults');
        document.body.classList.remove('dark-mode', 'custom');
    }
};

// Toggle theme when the button is clicked
document.getElementById('light_dark_button').addEventListener('click', function() {
    const lightDark = document.getElementById('lightDark');
    const lightDarkBtn = document.getElementById('light_dark_button');

    basicTheme = localStorage.getItem('theme');

    // Toggle dark mode class
    document.body.classList.toggle('dark-mode');

    // Determine the new theme and save it
    darkToggled = document.body.classList.contains('dark-mode') ? 'yes' : 'no';

    if(darkToggled === 'yes'){
        // Update the icon for light/dark mode
        if (lightDark.classList.contains('fa-moon-o')) {
            lightDark.classList.replace('fa-moon-o', 'fa-sun-o');
            lightDarkBtn.style.paddingTop = '6px';
            lightDarkBtn.style.paddingRight = '8px';
            lightDarkBtn.style.paddingLeft = '8px';
            lightDarkBtn.style.paddingBottom = '6px';
        }  
        // localStorage.setItem('theme', 'dark');

    } else if(darkToggled === 'no') {
        lightDark.classList.replace('fa-sun-o', 'fa-moon-o');
        lightDarkBtn.style.paddingTop = '6px';
        lightDarkBtn.style.paddingLeft = '10px';
        lightDarkBtn.style.paddingRight = '10px';
        lightDarkBtn.style.paddingBottom = '6px';

        
        if (basicTheme === 'light') {
            // localStorage.setItem('theme', 'light');
            document.body.classList.add('light-mode-defaults');
            document.body.classList.remove('dark-mode', 'custom');
        } else {
            // localStorage.setItem('theme', 'custom');
            document.body.classList.add('custom');
            document.body.classList.remove('dark-mode', 'light-mode-defaults');
        }
    }
});

// Reset to default light/dark mode when the defaultColorsBtn is clicked
document.getElementById('defaultColorsBtn').addEventListener('click', function () {
    document.body.classList.add('light-mode-defaults');
    let currentTheme = document.body.classList.contains('light-mode-defaults') ? 'light' : 'dark';
    document.body.classList.remove('dark-mode', 'custom');
    localStorage.setItem('theme', currentTheme);

    // Reset CSS custom properties
    document.documentElement.style.removeProperty('--background-color');
    document.documentElement.style.removeProperty('--pop-color');
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--button-color');
});
