let timer;
let totalSeconds = 0;
let isRunning = false;
let initialSeconds = 0; // Store the initially set time
let selectedHours = 0;
let selectedMinutes = 0;
let selectedSeconds = 0;

let hoursBefore = 0;
let minutesBefore = 0;
let secondsBefore = 0;

let hoursAfter = 0;
let minutesAfter = 0;
let secondsAfter = 0;

// Modal functionality
const modal = document.getElementById('timerModal');
const selectTimerBtn = document.getElementById('selectTimerBtn');
const setTimerBtn = document.getElementById('setTimerBtn');
const hourDisplay = document.getElementById('hourDisplay');
const minuteDisplay = document.getElementById('minuteDisplay');
const secondDisplay = document.getElementById('secondDisplay');

// The numbers on top of the actual time
const preHour = document.getElementById('preHour');
const preMinute = document.getElementById('preMinute');
const preSecond = document.getElementById('preSecond');

// The numbers under the actual time
const postHour = document.getElementById('postHour');
const postMinute = document.getElementById('postMinute');
const postSecond = document.getElementById('postSecond');

// Open modal when "Select Timer" is clicked
selectTimerBtn.onclick = function() {
    modal.style.display = 'flex'; // Display the modal
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

// Function to handle scrollable selection with variable speed
function startScroll(event, unit) {
    event.preventDefault(); // Prevent default drag behavior
    const initialY = event.clientY;
    let lastY = initialY;
    const speedFactor = -2; // Adjust this to increase/decrease sensitivity

    const updateValue = (deltaY) => {
        const steps = Math.floor(Math.abs(deltaY) / speedFactor);

        if (unit === 'hours') {
            // Update hours
            selectedHours = (selectedHours + Math.sign(deltaY) * steps + 24) % 24; // Wrap around at 24
            hourDisplay.textContent = selectedHours.toString().padStart(2, '0');
            
            hoursBefore = (selectedHours - 1 + 24) % 24;
            preHour.textContent = hoursBefore.toString().padStart(2, '0');

            hoursAfter = (selectedHours + 1) % 24;
            postHour.textContent = hoursAfter.toString().padStart(2, '0');
        } else if (unit === 'minutes') {
            // Update minutes
            selectedMinutes = (selectedMinutes + Math.sign(deltaY) * steps + 60) % 60;
            minuteDisplay.textContent = selectedMinutes.toString().padStart(2, '0');

            minutesBefore = (selectedMinutes - 1 + 60) % 60;
            preMinute.textContent = minutesBefore.toString().padStart(2, '0');

            minutesAfter = (selectedMinutes + 1) % 60;
            postMinute.textContent = minutesAfter.toString().padStart(2, '0');
        } else {
            // Update seconds
            selectedSeconds = (selectedSeconds + Math.sign(deltaY) * steps + 60) % 60;
            secondDisplay.textContent = selectedSeconds.toString().padStart(2, '0');

            secondsBefore = (selectedSeconds - 1 + 60) % 60;
            preSecond.textContent = secondsBefore.toString().padStart(2, '0');

            secondsAfter = (selectedSeconds + 1) % 60;
            postSecond.textContent = secondsAfter.toString().padStart(2, '0');
        }
    };

    const onMouseMove = (moveEvent) => {
        const deltaY = moveEvent.clientY - lastY;
        updateValue(deltaY);
        lastY = moveEvent.clientY;
    };

    const stopScroll = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopScroll);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopScroll);
}

// Add event listeners to hour, minute, and second displays
hourDisplay.addEventListener('mousedown', (event) => startScroll(event, 'hours'));
minuteDisplay.addEventListener('mousedown', (event) => startScroll(event, 'minutes'));
secondDisplay.addEventListener('mousedown', (event) => startScroll(event, 'seconds'));

// Set the timer based on user input from the modal
setTimerBtn.onclick = function() {
    let hours = selectedHours;
    let mins = selectedMinutes;
    let secs = selectedSeconds;

    totalSeconds = hours * 3600 + mins * 60 + secs; // Calculate total time in seconds
    initialSeconds = totalSeconds; // Store the initial time

    document.getElementById('timer').textContent = formatTime(totalSeconds); // Update timer display
    modal.style.display = 'none'; // Close the modal
};

// Start the timer countdown
document.getElementById('startBtn').onclick = function() {
    if (!isRunning && totalSeconds > 0) {
        isRunning = true;
        timer = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                document.getElementById('timer').textContent = formatTime(totalSeconds);
            } else {
                pauseTimer();
            }
        }, 1000);

        // Hide "Paused" message when timer starts
        document.getElementById('pausedMessage').style.display = 'none';
        document.getElementById('timer').style.marginTop = '23px';
    }
};

// Pause the timer
document.getElementById('pauseBtn').onclick = function() {
    pauseTimer();
    document.getElementById('pausedMessage').style.display = 'flex'; // Show "Paused" message
    document.getElementById('pausedMessage').style.justifyContent = 'center';
    document.getElementById('pausedMessage').style.margin = '3px';
    document.getElementById('timer').style.marginTop = '-3px';
};

// Reset the timer to the initially selected value
document.getElementById('resetBtn').onclick = function() {
    isRunning = false;
    clearInterval(timer);
    totalSeconds = initialSeconds; // Reset to initial time
    document.getElementById('timer').textContent = formatTime(totalSeconds);

    // Hide "Paused" message
    document.getElementById('pausedMessage').style.display = 'none';
    document.getElementById('pausedMessage').style.marginBottom = '3px';
    document.getElementById('timer').style.marginTop = '23px';
};

// Helper function to pause the timer
function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

// Format time in HH:MM:SS format
function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
