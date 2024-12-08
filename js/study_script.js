const lightDark = document.getElementById('lightDark');
const lightDarkBtn = document.getElementById('light_dark_button');

const colorModal = document.getElementById('colorPickerModal')

let basicTheme = localStorage.getItem('theme');
let darkToggled = localStorage.getItem('theme') || 'dark';

window.onclick = (event) => {
    if (event.target === colorModal) colorModal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the last viewed page from localStorage or set to 1 if not set
    let currentPage = parseInt(localStorage.getItem('lastViewedPage')) || 1;

    const pages = document.querySelectorAll('.page');
    const totalPages = Math.ceil(pages.length / 2);  // Each pair of pages counts as one "book spread"

    function showPages(pageNumber) {
        pages.forEach((page, index) => {
            const leftPageIndex = (pageNumber - 1) * 2;  // Left page in the spread
            const rightPageIndex = leftPageIndex + 1;    // Right page in the spread

            if (index === leftPageIndex || index === rightPageIndex) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
        // Save the current page to localStorage
        localStorage.setItem('lastViewedPage', pageNumber);
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            showPages(currentPage);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            showPages(currentPage);
        }
    }

    // Show the last viewed page on load
    showPages(currentPage);

    // Make prevPage and nextPage globally accessible
    window.prevPage = prevPage;
    window.nextPage = nextPage;
});

// Color picker js
// Open the color picker modal
document.getElementById('openColorPickerBtn').addEventListener('click', function () {
    // Fetch colors from localStorage
    const headerColor = localStorage.getItem('headerColor') || '#356859';
    const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
    const pageColor = localStorage.getItem('pageColor') || '#356859';
    const textColor = localStorage.getItem('textColor') || '#4a7c68';
    const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

    // Set input values
    document.getElementById('headerColorInput').value = headerColor;
    document.getElementById('backgroundColorInput').value = backgroundColor;
    document.getElementById('pageColorInput').value = pageColor;
    document.getElementById('pageTextColorInput').value = textColor;
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
    const pageColor = document.getElementById('pageColorInput').value;
    const textColor = document.getElementById('pageTextColorInput').value;
    const buttonColor = document.getElementById('buttonColorInput').value;

    // Set CSS variables dynamically
    document.documentElement.style.setProperty('--header-color', headerColor);
    document.documentElement.style.setProperty('--background-color', backgroundColor);
    document.documentElement.style.setProperty('--book-page-color', pageColor);
    document.documentElement.style.setProperty('--book-text-color', textColor);
    document.documentElement.style.setProperty('--button-color', buttonColor);

    // Save custom colors to localStorage
    localStorage.setItem('previousTheme', 'custom');
    localStorage.setItem('headerColor', headerColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('pageColor', pageColor);
    localStorage.setItem('textColor', textColor);
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
            const pageColor = localStorage.getItem('pageColor') || '#356859';
            const textColor = localStorage.getItem('textColor') || '#4a7c68';
            const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

            // Set custom CSS properties
            document.documentElement.style.setProperty('--header-color', headerColor);
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--book-page-color', pageColor);
            document.documentElement.style.setProperty('--book-text-color', textColor);
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
            const popColor = localStorage.getItem('popColor') || '#356859';
            const accentColor = localStorage.getItem('accentColor') || '#4a7c68';
            const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

            document.documentElement.style.setProperty('--header-color', headerColor);
            document.documentElement.style.setProperty('--background-color', backgroundColor);
            document.documentElement.style.setProperty('--pop-color', popColor);
            document.documentElement.style.setProperty('--accent-color', accentColor);
            document.documentElement.style.setProperty('--button-color', buttonColor);

            document.body.classList.add('custom');
            lightDark.classList.replace('fa-sun-o', 'fa-moon-o');
            lightDarkBtn.style.paddingTop = "6px";
            lightDarkBtn.style.paddingBottom = "6px";
            lightDarkBtn.style.paddingLeft = "11px";
            lightDarkBtn.style.paddingRight =  "11px";
            document.body.classList.remove('light-mode-defaults', 'dark-mode');
        } else {
            document.body.classList.add('light-mode-defaults');
            lightDark.classList.replace('fa-sun-o', 'fa-moon-o');
            lightDarkBtn.style.paddingTop = "6px";
            lightDarkBtn.style.paddingBottom = "6px";
            lightDarkBtn.style.paddingLeft = "11px";
            lightDarkBtn.style.paddingRight =  "11px";
            document.body.classList.remove('custom', 'dark-mode');
        }
    } else {
        const isCustom = document.body.classList.contains('custom');
        localStorage.setItem('previousTheme', isCustom ? 'custom' : 'light');
        localStorage.setItem('darkMode', 'true');

        document.body.classList.add('dark-mode');
        lightDark.classList.replace('fa-moon-o', 'fa-sun-o');
        lightDarkBtn.style.paddingTop = "6px";
        lightDarkBtn.style.paddingBottom = "6px";
        lightDarkBtn.style.paddingLeft = "9px";
        lightDarkBtn.style.paddingRight = "9px";
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
    document.documentElement.style.removeProperty('--book-page-color');
    document.documentElement.style.removeProperty('--book-text-color');
    document.documentElement.style.removeProperty('--button-color');
});
