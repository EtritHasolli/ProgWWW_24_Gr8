const lightDark = document.getElementById('lightDark');
const lightDarkBtn = document.getElementById('light_dark_button');

const colorModal = document.getElementById('colorPickerModal');

window.onclick = (event) => {
    if (event.target === colorModal) colorModal.style.display = 'none';
}

// Load saved flash cards from localStorage and display them
function loadCards() {
    const cards = JSON.parse(localStorage.getItem("flashcards") || "[]");
    const tableRow = document.querySelector("table tr");

    // Clear any existing cards
    tableRow.innerHTML = '';

    // Create and append each card from localStorage
    cards.forEach(card => {
        const newCell = document.createElement("td");
        newCell.onclick = function() { flipCard(newCell); };
        newCell.innerHTML = `
            <div class="flashcard">
                <div class="front">
                    ${card.question}
                    <button class="delete-btn" onclick="deleteFlashCard(event, this)">Delete</button>
                </div>
                <div class="back">
                    ${card.answer}
                    <button class="delete-btn" onclick="deleteFlashCard(event, this)">Delete</button>
                </div>
            </div>
        `;
        tableRow.appendChild(newCell);
    });
}

function addFlashCard() {
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();

    if (question && answer) {
        // Save the flashcard to localStorage
        saveFlashCard(question, answer);

        // Clear the input fields
        document.getElementById('question').value = '';
        document.getElementById('answer').value = '';

        // Reload the flashcards on the page
        loadCards();
    } else {
        alert("Both question and answer are required.");
    }
}


// Flip the flashcard and manage delete button visibility
function flipCard(cell) {
    const flashcard = cell.querySelector('.flashcard');
    const frontButton = flashcard.querySelector('.delete-btn'); // Select the delete button

    if (flashcard) {
        flashcard.classList.toggle('flipped');
        
        // Toggle the visibility of the delete button based on the flipped state
        if (flashcard.classList.contains('flipped')) {
            frontButton.style.display = 'none'; // Hide the button when flipped
        } else {
            frontButton.style.display = 'flex'; // Show the button when not flipped
        }
    }
}

// Delete a flashcard
function deleteFlashCard(event, button) {
    event.stopPropagation(); // Prevent triggering flipCard on button click

    const cell = button.closest("td");
    if (cell) {
        const question = cell.querySelector('.front').childNodes[0].textContent.trim(); // Get the question to find the card
        const flashcards = JSON.parse(localStorage.getItem("flashcards") || "[]");
        
        // Filter out the deleted card
        const updatedCards = flashcards.filter(card => card.question !== question);
        
        // Update localStorage
        localStorage.setItem("flashcards", JSON.stringify(updatedCards));
        
        // Remove the cell from the table
        cell.remove();
    }
}

// Save a new flashcard to localStorage
function saveFlashCard(question, answer) {
    const flashcards = JSON.parse(localStorage.getItem("flashcards") || "[]");
    flashcards.push({ question, answer });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

// Color picker js
document.getElementById('openColorPickerBtn').addEventListener('click', function () {
    // Fetch colors from localStorage
    const headerColor = localStorage.getItem('headerColor') || '#356859';
    const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
    const flashCardTextColor = localStorage.getItem('flashCardTextColor') || '#000000';
    const frontCardColor = localStorage.getItem('frontCardColor') || '#356859';
    const backCardColor = localStorage.getItem('backCardColor') || '#4a7c68';
    const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

    // Set input values
    document.getElementById('headerColorInput').value = headerColor;
    document.getElementById('backgroundColorInput').value = backgroundColor;
    document.getElementById('flashCardTextColorInput').value = flashCardTextColor;
    document.getElementById('frontCardColorInput').value = frontCardColor;
    document.getElementById('backCardColorInput').value = backCardColor;
    document.getElementById('buttonColorInput').value = buttonColor;

    // Open the color picker modal
    document.getElementById('colorPickerModal').style.display = 'block';
});

document.getElementById('closeColorPickerModal').addEventListener('click', function() {
    document.getElementById('colorPickerModal').style.display = 'none';
});

document.getElementById('applyColorsBtn').addEventListener('click', function() {
    const headerColor = document.getElementById('headerColorInput').value;
    const backgroundColor = document.getElementById('backgroundColorInput').value;
    const flashCardTextColor = document.getElementById('flashCardTextColorInput').value;
    const frontCardColor = document.getElementById('frontCardColorInput').value;
    const backCardColor = document.getElementById('backCardColorInput').value;
    const buttonColor = document.getElementById('buttonColorInput').value;

    // Set CSS variables dynamically
    document.documentElement.style.setProperty('--header-color', headerColor);
    document.documentElement.style.setProperty('--background-color', backgroundColor);
    document.documentElement.style.setProperty('--flash-card-text', flashCardTextColor);
    document.documentElement.style.setProperty('--front-flash-card', frontCardColor);
    document.documentElement.style.setProperty('--back-flash-card', backCardColor);
    document.documentElement.style.setProperty('--button-color', buttonColor);

    // Save custom colors to localStorage
    localStorage.setItem('previousTheme', 'custom');
    localStorage.setItem('headerColor', headerColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('flashCardTextColor', flashCardTextColor);
    localStorage.setItem('frontCardColor', frontCardColor);
    localStorage.setItem('backCardColor', backCardColor);
    localStorage.setItem('buttonColor', buttonColor);

    document.body.classList.add('custom');
    document.body.classList.remove('dark-mode', 'light-mode-defaults');
});

// On page load, apply the saved theme
function loadBody() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const previousTheme = localStorage.getItem('previousTheme') || 'light';

    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode-defaults', 'custom');
    } else {
        if (previousTheme === 'custom') {
            const headerColor = localStorage.getItem('headerColor') || '#356859';
            const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
            const flashCardTextColor = localStorage.getItem('flashCardTextColor') || '#000000';
            const frontCardColor = localStorage.getItem('frontCardColor') || '#356859';
            const backCardColor = localStorage.getItem('backCardColor') || '#4a7c68';
            const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

            // Set custom CSS properties
            document.documentElement.style.setProperty('--header-color', headerColor);
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--flash-card-text', flashCardTextColor);
            document.documentElement.style.setProperty('--front-flash-card', frontCardColor);
            document.documentElement.style.setProperty('--back-flash-card', backCardColor);
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
            const flashCardTextColor = localStorage.getItem('flashCardTextColor') || '#000000';
            const frontCardColor = localStorage.getItem('frontCardColor') || '#356859';
            const backCardColor = localStorage.getItem('backCardColor') || '#4a7c68';
            const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

            document.documentElement.style.setProperty('--header-color', headerColor);
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--flash-card-text', flashCardTextColor);
            document.documentElement.style.setProperty('--front-flash-card', frontCardColor);
            document.documentElement.style.setProperty('--back-flash-card', backCardColor);
            document.documentElement.style.setProperty('--button-color', buttonColor);

            document.body.classList.add('custom');
            document.body.classList.remove('light-mode-defaults', 'dark-mode');
        } else {
            document.body.classList.add('light-mode-defaults');
            document.body.classList.remove('custom', 'dark-mode');
        }
    } else {
        const isCustom = document.body.classList.contains('custom');
        localStorage.setItem('previousTheme', isCustom ? 'custom' : 'light');
        localStorage.setItem('darkMode', 'true');

        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode-defaults', 'custom');
    }
});

document.getElementById('defaultColorsBtn').addEventListener('click', function () {
    document.body.classList.add('light-mode-defaults');
    let currentTheme = document.body.classList.contains('light-mode-defaults') ? 'light' : 'custom';
    document.body.classList.remove('dark-mode', 'custom');
    localStorage.setItem('previousTheme', currentTheme);

    document.documentElement.style.removeProperty('--background-color');
    document.documentElement.style.removeProperty('--front-flash-card');
    document.documentElement.style.removeProperty('--back-flash-card');
    document.documentElement.style.removeProperty('--button-color');
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}