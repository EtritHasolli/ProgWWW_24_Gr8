let studyTimer, breakTimer;
let totalStudySeconds = 0;
let totalBreakSeconds = 0;
let isStudyRunning = false;
let isBreakRunning = false;
let initialStudySeconds = 0;
let initialBreakSeconds = 0;

let isLight = false;

let hoursBefore = 0;
let minutesBefore = 0;
let secondsBefore = 0;

let hoursAfter = 0;
let minutesAfter = 0;
let secondsAfter = 0;

let selectedHours = 0;
let selectedMinutes = 0;
let selectedSeconds = 0;

let selectedBreakHours = 0;
let selectedBreakMinutes = 0;
let selectedBreakSeconds = 0;

//hours display
const hourDisplay = document.getElementById('hourDisplay');
const minuteDisplay = document.getElementById('minuteDisplay');
const secondDisplay = document.getElementById('secondDisplay');

//break time display
const breakHourDisplay = document.getElementById('breakHourDisplay');
const breakMinuteDisplay = document.getElementById('breakMinuteDisplay');
const breakSecondDisplay = document.getElementById('breakSecondDisplay');

// The numbers on top of the actual time
const preHour = document.getElementById('preHour');
const preMinute = document.getElementById('preMinute');
const preSecond = document.getElementById('preSecond');

//The numers on top of the break time
const preBreakHour = document.getElementById('preBreakHour');
const preBreakMinute = document.getElementById('preBreakMinute');
const preBreakSecond = document.getElementById('preBreakSecond');

// The numbers under the actual time
const postHour = document.getElementById('postHour');
const postMinute = document.getElementById('postMinute');
const postSecond = document.getElementById('postSecond');

//The numers under the break timer
const postBreakHour = document.getElementById('postBreakHour');
const postBreakMinute = document.getElementById('postBreakMinute');
const postBreakSecond = document.getElementById('postBreakSecond');

// Modal functionality
const modal = document.getElementById('timerModal');
const bModal = document.getElementById('breakModal');
const colorModal = document.getElementById('colorPickerModal')

const selectTimerBtn = document.getElementById('selectTimerBtn');
const selectBreakBtn = document.getElementById('breakSelect');

const setTimerBtn = document.getElementById('setTimerBtn');
const setBreakTimer = document.getElementById('setBreakTimer');

// The play/pause button and icon
const studyBtn = document.getElementById('studyBtn');
const studyIcon = document.getElementById('studyIcon');

const breakBtn = document.getElementById('breakBtn');
const breakIcon = document.getElementById('breakIcon');

const lightDark = document.getElementById('lightDark');
const lightDarkBtn = document.getElementById('light_dark_button');

// Open modals when "Select Timer" or "Select Break" is clicked
selectTimerBtn.onclick = () => (modal.style.display = 'flex');
selectBreakBtn.onclick = () => (bModal.style.display = 'flex');

// Close modals
document.getElementById('closeModalBtn').onclick = () => (modal.style.display = 'none');
document.getElementById('closeBreakModal').onclick = () => (bModal.style.display = 'none');

// Helper to handle clicks outside modals
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
    if (event.target === bModal) bModal.style.display = 'none';
    if (event.target === colorModal) colorModal.style.display = 'none';
};

// Function to handle scrollable selection with variable speed for both timers
function startScroll(event, unit, timerType) {
    event.preventDefault();
    const initialY = event.clientY;
    let lastY = initialY;
    const speedFactor = -2;

    const updateValue = (deltaY) => {
        const steps = Math.floor(Math.abs(deltaY) / speedFactor);

        if (timerType === 'study') {
            if (unit === 'hours') {
                selectedHours = (selectedHours + Math.sign(deltaY) * steps + 24) % 24;
                hourDisplay.textContent = selectedHours.toString().padStart(2, '0');
                preHour.textContent = ((selectedHours - 1 + 24) % 24).toString().padStart(2, '0');
                postHour.textContent = ((selectedHours + 1) % 24).toString().padStart(2, '0');
            } else if (unit === 'minutes') {
                selectedMinutes = (selectedMinutes + Math.sign(deltaY) * steps + 60) % 60;
                minuteDisplay.textContent = selectedMinutes.toString().padStart(2, '0');
                preMinute.textContent = ((selectedMinutes - 1 + 60) % 60).toString().padStart(2, '0');
                postMinute.textContent = ((selectedMinutes + 1) % 60).toString().padStart(2, '0');
            } else {
                selectedSeconds = (selectedSeconds + Math.sign(deltaY) * steps + 60) % 60;
                secondDisplay.textContent = selectedSeconds.toString().padStart(2, '0');
                preSecond.textContent = ((selectedSeconds - 1 + 60) % 60).toString().padStart(2, '0');
                postSecond.textContent = ((selectedSeconds + 1) % 60).toString().padStart(2, '0');
            }
        } else if (timerType === 'break') {
            if (unit === 'hours') {
                selectedBreakHours = (selectedBreakHours + Math.sign(deltaY) * steps + 24) % 24;
                breakHourDisplay.textContent = selectedBreakHours.toString().padStart(2, '0');
                preBreakHour.textContent = ((selectedBreakHours - 1 + 24) % 24).toString().padStart(2, '0');
                postBreakHour.textContent = ((selectedBreakHours + 1) % 24).toString().padStart(2, '0');
            } else if (unit === 'minutes') {
                selectedBreakMinutes = (selectedBreakMinutes + Math.sign(deltaY) * steps + 60) % 60;
                breakMinuteDisplay.textContent = selectedBreakMinutes.toString().padStart(2, '0');
                preBreakMinute.textContent = ((selectedBreakMinutes - 1 + 60) % 60).toString().padStart(2, '0');
                postBreakMinute.textContent = ((selectedBreakMinutes + 1) % 60).toString().padStart(2, '0');
            } else {
                selectedBreakSeconds = (selectedBreakSeconds + Math.sign(deltaY) * steps + 60) % 60;
                breakSecondDisplay.textContent = selectedBreakSeconds.toString().padStart(2, '0');
                preBreakSecond.textContent = ((selectedBreakSeconds - 1 + 60) % 60).toString().padStart(2, '0');
                postBreakSecond.textContent = ((selectedBreakSeconds + 1) % 60).toString().padStart(2, '0');
            }
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

// Study timer event listeners
document.getElementById('hourDisplay').addEventListener('mousedown', (event) => startScroll(event, 'hours', 'study'));
document.getElementById('minuteDisplay').addEventListener('mousedown', (event) => startScroll(event, 'minutes', 'study'));
document.getElementById('secondDisplay').addEventListener('mousedown', (event) => startScroll(event, 'seconds', 'study'));

// Break timer event listeners
document.getElementById('breakHourDisplay').addEventListener('mousedown', (event) => startScroll(event, 'hours', 'break'));
document.getElementById('breakMinuteDisplay').addEventListener('mousedown', (event) => startScroll(event, 'minutes', 'break'));
document.getElementById('breakSecondDisplay').addEventListener('mousedown', (event) => startScroll(event, 'seconds', 'break'));


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

// Set study timer from modal input
setTimerBtn.onclick = function () {
    initialStudySeconds = totalStudySeconds = selectedHours * 3600 + selectedMinutes * 60 + selectedSeconds;
    document.getElementById('timer').textContent = formatTime(totalStudySeconds);
    modal.style.display = 'none';
};

// Set break timer from modal input
setBreakTimer.onclick = function () {
    initialBreakSeconds = totalBreakSeconds = selectedBreakHours * 3600 + selectedBreakMinutes * 60 + selectedBreakSeconds;
    document.getElementById('break').textContent = formatTime(totalBreakSeconds);
    bModal.style.display = 'none';
};

// Play/pause functionality for the study timer
studyBtn.addEventListener('click', () => {
    if (studyIcon.classList.contains('fa-play')) {
        studyIcon.classList.replace('fa-play', 'fa-pause');
        startStudyTimer();
    } else {
        studyIcon.classList.replace('fa-pause', 'fa-play');
        pauseStudyTimer();
    }
});

// Play/pause functionality for the break timer
breakBtn.addEventListener('click', () => {
    if (breakIcon.classList.contains('fa-play')) {
        breakIcon.classList.replace('fa-play', 'fa-pause');
        startBreakTimer();
    } else {
        breakIcon.classList.replace('fa-pause', 'fa-play');
        pauseBreakTimer();
    }
});

// Start study timer countdown
function startStudyTimer() {
    if (!isStudyRunning && totalStudySeconds > 0) {
        isStudyRunning = true;
        studyTimer = setInterval(() => {
            if (totalStudySeconds > 0) {
                pauseBreakTimer(); // Pause break timer if running
                totalStudySeconds--;
                document.getElementById('timer').textContent = formatTime(totalStudySeconds);
            } else {
                startBreakTimer(); // Automatically start break timer when study time is up
                pauseStudyTimer();
            }
        }, 1000);
    }
}

// Start break timer countdown
function startBreakTimer() {
    if (!isBreakRunning && totalBreakSeconds > 0) {
        isBreakRunning = true;
        breakTimer = setInterval(() => {
            if (totalBreakSeconds > 0) {
                if(breakIcon.classList.contains('fa-play')) {
                    breakIcon.classList.replace('fa-play', 'fa-pause');
                }
                totalBreakSeconds--;
                document.getElementById('break').textContent = formatTime(totalBreakSeconds);
            } else {
                pauseBreakTimer(); // Automatically pause break timer when time is up
            }
        }, 1000);
    }
}

// Reset button for both timers
document.getElementById('resetBtn').onclick = function () {
    // Reset study timer
    isStudyRunning = false;
    clearInterval(studyTimer);
    totalStudySeconds = initialStudySeconds;
    document.getElementById('timer').textContent = formatTime(totalStudySeconds);
    studyIcon.classList.replace('fa-pause', 'fa-play');

    // Reset break timer
    isBreakRunning = false;
    clearInterval(breakTimer);
    totalBreakSeconds = initialBreakSeconds;
    document.getElementById('break').textContent = formatTime(totalBreakSeconds);
    breakIcon.classList.replace('fa-pause', 'fa-play');
};

// Pause the study timer
function pauseStudyTimer() {
    isStudyRunning = false;
    clearInterval(studyTimer);
    startBreakTimer(); // Start break timer when study timer is paused
}

// Pause the break timer
function pauseBreakTimer() {
    isBreakRunning = false;
    breakIcon.classList.replace('fa-pause', 'fa-play');
    clearInterval(breakTimer);
}

// Format time in HH:MM:SS format
function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

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
    localStorage.setItem('previousTheme', 'custom');
    localStorage.setItem('headerColor', headerColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('popColor', popColor);
    localStorage.setItem('accentColor', accentColor);
    localStorage.setItem('buttonColor', buttonColor);

    document.body.classList.add('custom');
    document.body.classList.remove('dark-mode', 'light-mode-defaults');
});

// On page load, apply the saved theme
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
            const popColor = localStorage.getItem('popColor') || '#356859';
            const accentColor = localStorage.getItem('accentColor') || '#4a7c68';
            const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

            // Set custom CSS properties
            document.documentElement.style.setProperty('--header-color', headerColor);
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--pop-color', popColor);
            document.documentElement.style.setProperty('--accent-color', accentColor);
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
    const isDarkMode = localStorage.getItem('darkMode') === 'true'; // Retrieve current dark mode state
    const previousTheme = localStorage.getItem('previousTheme') || 'light'; // Retrieve previous theme

    if (isDarkMode) {
        // Switch to the previous theme (custom or light)
        localStorage.setItem('darkMode', 'false');

        if (previousTheme === 'custom') {
            // Restore custom theme
            const headerColor = localStorage.getItem('headerColor') || '#356859';
            const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
            const popColor = localStorage.getItem('popColor') || '#356859';
            const accentColor = localStorage.getItem('accentColor') || '#4a7c68';
            const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

            // Set custom CSS properties
            document.documentElement.style.setProperty('--header-color', headerColor);
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--pop-color', popColor);
            document.documentElement.style.setProperty('--accent-color', accentColor);
            document.documentElement.style.setProperty('--button-color', buttonColor);

            document.body.classList.add('custom');
            document.body.classList.remove('light-mode-defaults', 'dark-mode');
        } else {
            // Switch to light mode defaults
            document.body.classList.add('light-mode-defaults');
            document.body.classList.remove('custom', 'dark-mode');
        }
    } else {
        // Save the current theme (custom or light) before enabling dark mode
        const isCustom = document.body.classList.contains('custom');
        localStorage.setItem('previousTheme', isCustom ? 'custom' : 'light');
        localStorage.setItem('darkMode', 'true');

        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode-defaults', 'custom');
    }
});

// Reset to default light/dark mode when the defaultColorsBtn is clicked
document.getElementById('defaultColorsBtn').addEventListener('click', function () {
    document.body.classList.add('light-mode-defaults');
    let currentTheme = document.body.classList.contains('light-mode-defaults') ? 'light' : 'custom';
    document.body.classList.remove('dark-mode', 'custom');
    localStorage.setItem('previousTheme', currentTheme);

    // Reset CSS custom properties
    document.documentElement.style.removeProperty('--background-color');
    document.documentElement.style.removeProperty('--pop-color');
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--button-color');
});
