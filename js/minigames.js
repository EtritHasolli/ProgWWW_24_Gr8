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