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
                    <button class="delete-btn" onclick="deleteFlashCard(this)">Delete</button>
                </div>
                <div class="back">
                    ${card.answer}
                    <button class="delete-btn" onclick="deleteFlashCard(this)">Delete</button>
                </div>
            </div>
        `;
        tableRow.appendChild(newCell);
    });
}

// Load header from HTML file
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}

// Load footer from HTML file
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
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

// Add a new flashcard
function addFlashCard() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    if (question && answer) {
        const tableRow = document.querySelector("table tr");
        const newCell = document.createElement("td");
        newCell.onclick = function() { flipCard(newCell); };

        newCell.innerHTML = `
            <div class="flashcard">
                <div class="front">
                    ${question}
                    <button class="delete-btn" onclick="deleteFlashCard(this)">Delete</button>
                </div>
                <div class="back">
                    ${answer}
                    <button class="delete-btn" onclick="deleteFlashCard(this)">Delete</button>
                </div>
            </div>
        `;

        tableRow.appendChild(newCell);
        saveFlashCard(question, answer); // Save the new flashcard to localStorage

        document.getElementById("question").value = '';
        document.getElementById("answer").value = '';
    } else {
        alert("Please enter both a question and an answer.");
    }
}

// Delete a flashcard
function deleteFlashCard(button) {
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
