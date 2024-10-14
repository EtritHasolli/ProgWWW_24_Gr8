let timer;
let totalSeconds = 0;
let isRunning = false;
let initialSeconds = 0; // Store the initially set time
let selectedMinutes = 0;
let selectedSeconds = 0;

// Modal functionality
const modal = document.getElementById('timerModal');
const selectTimerBtn = document.getElementById('selectTimerBtn');
// const closeModalBtn = document.querySelector('.close');
const setTimerBtn = document.getElementById('setTimerBtn');
const minuteDisplay = document.getElementById('minuteDisplay');
const secondDisplay = document.getElementById('secondDisplay');

// Open modal when "Select Timer" is clicked
selectTimerBtn.onclick = function() {
    modal.style.display = 'flex'; // Change to flex for centering content
};

// Close modal when the 'Close' button is clicked
const closeModalBtn = document.getElementById('closeModalBtn');

closeModalBtn.onclick = function() {
    modal.style.display = 'none'; // Hide the modal
};


// Close modal when clicking outside the modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide the modal
    }
};

// Function to handle the scrollable selection with variable speed
function startScroll(event, unit) {
    event.preventDefault(); // Prevent default drag behavior
    const initialY = event.clientY;
    let lastY = initialY; // Keep track of last mouse position
    const speedFactor = 3.5; // Change this to increase/decrease sensitivity

    const updateValue = (deltaY) => {
        // Determine how much to increment/decrement based on mouse movement
        const steps = Math.floor(Math.abs(deltaY) / speedFactor);
        if (unit === 'minutes') {
            // Update minutes
            selectedMinutes = Math.max(0, Math.min(60, selectedMinutes - Math.sign(deltaY) * steps));
            minuteDisplay.textContent = selectedMinutes.toString().padStart(2, '0');
        } else {
            // Update seconds
            selectedSeconds = Math.max(0, Math.min(59, selectedSeconds - Math.sign(deltaY) * steps));
            secondDisplay.textContent = selectedSeconds.toString().padStart(2, '0');
        }
    };

    const onMouseMove = (moveEvent) => {
        const deltaY = moveEvent.clientY - lastY; // Calculate the change in Y position
        updateValue(deltaY);
        lastY = moveEvent.clientY; // Update lastY for the next move
    };

    const stopScroll = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopScroll);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopScroll);
}

// Add event listeners to the minute and second displays
minuteDisplay.addEventListener('mousedown', (event) => startScroll(event, 'minutes'));
secondDisplay.addEventListener('mousedown', (event) => startScroll(event, 'seconds'));

// Set the timer based on user input from modal
setTimerBtn.onclick = function() {
    let mins = selectedMinutes; // Get selected minutes
    let secs = selectedSeconds; // Get selected seconds

    // Set total seconds and initial time
    totalSeconds = mins * 60 + secs;
    initialSeconds = totalSeconds; // Store the initially selected time

    // Update the timer display
    document.getElementById('timer').textContent = formatTime(totalSeconds);

    // Close the modal
    modal.style.display = 'none';
};

// Start the timer countdown
document.getElementById('startBtn').onclick = function() {
    if (!isRunning && totalSeconds > 0) {
        isRunning = true;
        timer = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                document.getElementById("timer").textContent = formatTime(totalSeconds);
            } else {
                pauseTimer(); // Stop the timer when it reaches 0
            }
        }, 1000);
    }
};

// Pause the timer
document.getElementById('pauseBtn').onclick = function() {
    pauseTimer();
};

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

// Reset the timer to the initially selected value
document.getElementById('resetBtn').onclick = function() {
    isRunning = false;
    clearInterval(timer);
    totalSeconds = initialSeconds; // Reset to the initial selected time
    document.getElementById('timer').textContent = formatTime(totalSeconds);
};

// Format time in HH:MM:SS format
function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
