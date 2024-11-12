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

// Load cards when the page is loaded
window.onload = function() {
    loadHeader();
    loadFooter();
    loadCards(); // Load the flashcards from localStorage
};

document.getElementById('light_dark_button').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
