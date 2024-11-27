const lightDark = document.getElementById('lightDark');
const lightDarkBtn = document.getElementById('light_dark_button');

const colorModal = document.getElementById('colorPickerModal')

window.onclick = (event) => {
    if (event.target === colorModal) colorModal.style.display = 'none';
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
    let currentTheme = document.body.classList.contains('light-mode-defaults') ? 'light' : 'dark';
    document.body.classList.remove('dark-mode', 'custom');
    localStorage.setItem('previousTheme', currentTheme);

    // Reset CSS custom properties
    document.documentElement.style.removeProperty('--background-color');
    document.documentElement.style.removeProperty('--pop-color');
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--button-color');
});
