let selectedNumber = null;

function startNewSudoku() {
    const sudokuGrid = document.getElementById('sudokuGrid');
    sudokuGrid.innerHTML = '';

    // Create a 9x9 grid with 3x3 section borders
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('div');
        row.classList.add('sudoku-row');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('sudoku-cell');
            
            // Apply thicker borders around the 3x3 grids
            if (i % 3 === 0 && i !== 0) cell.style.borderLeft = '3px solid #333';
            if (j % 3 === 0 && j !== 0) cell.style.borderTop = '3px solid #333';

            // Bottom and right borders for the last cells in each row/column to fully enclose the grid
            if (i === 8) cell.style.borderRight = '3px solid #333';
            if (j === 8) cell.style.borderBottom = '3px solid #333';

            cell.addEventListener('click', () => placeNumber(cell));
            
            // Randomly pre-fill some cells for demo purposes
            if (Math.random() > 0.7) {
                cell.textContent = Math.floor(Math.random() * 9) + 1;
                cell.classList.add('prefilled');
            }
            
            row.appendChild(cell);
        }
        sudokuGrid.appendChild(row);
    }

    createNumberSelector(); // Create the number selector bar
}


// Create number selector bar with numbers 1-9 and a "Clear" button
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

    // Add Clear button to remove number from cells
    const clearButton = document.createElement('button');
    clearButton.textContent = "Clr";
    clearButton.classList.add('number-button');
    clearButton.addEventListener('click', () => selectNumber(null)); // Setting null clears cells
    numberSelector.appendChild(clearButton);
}

function selectNumber(number) {
    selectedNumber = number;

    // Highlight the selected button
    document.querySelectorAll('.number-button').forEach(button => {
        button.classList.toggle('selected', button.textContent == number || (number === null && button.textContent === "Clear"));
    });
}

// Function to place the selected number in a cell
function placeNumber(cell) {
    if (!cell.classList.contains('prefilled')) {
        cell.textContent = selectedNumber !== null ? selectedNumber : '';
    }
}

// Function to check if the Sudoku solution is valid
function checkSudoku() {
    const rows = document.querySelectorAll('.sudoku-row');
    const grid = [];

    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('.sudoku-cell').forEach(cell => {
            const value = cell.textContent ? parseInt(cell.textContent) : 0;
            rowData.push(value);
        });
        grid.push(rowData);
    });

    const isValid = validateSudoku(grid);
    document.getElementById('resultMessage').textContent = isValid ? 'Correct Solution!' : 'Incorrect Solution, try again.';
}

// Helper functions for validation
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
