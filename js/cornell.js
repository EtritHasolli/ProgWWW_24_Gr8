const lightDark = document.getElementById('lightDark');
const lightDarkBtn = document.getElementById('light_dark_button');

const colorModal = document.getElementById('colorPickerModal')

window.onclick = (event) => {
    if (event.target === colorModal) colorModal.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve and set saved values from cookies on load
    document.querySelector("input[type='text']").value = getCookie("topic") || "";
    document.querySelector(".cue-column textarea").value = getCookie("cues") || "";
    document.querySelector(".main-notes textarea").value = getCookie("mainNotes") || "";
    document.querySelector(".summary textarea").value = getCookie("summary") || "";

    // Set event listeners to save values in cookies
    document.querySelector("input[type='text']").addEventListener("input", function() {
        setCookie("topic", this.value, 7);
        console.log("Saving topic to cookies:", this.value);
    });
    document.querySelector(".cue-column textarea").addEventListener("input", function() {
        setCookie("cues", this.value, 7);
        console.log("Saving cues to cookies:", this.value);
    });
    document.querySelector(".main-notes textarea").addEventListener("input", function() {
        setCookie("mainNotes", this.value, 7);
        console.log("Saving main notes to cookies:", this.value);
    });
    document.querySelector(".summary textarea").addEventListener("input", function() {
        setCookie("summary", this.value, 7);
        console.log("Saving summary to cookies:", this.value);
    });
});

// Helper functions to set and get cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    for(let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(nameEQ) == 0) return decodeURIComponent(cookie.substring(nameEQ.length));
    }
    return null;
}

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
    localStorage.setItem('theme', 'custom');
    localStorage.setItem('headerColor', headerColor);
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('popColor', popColor);
    localStorage.setItem('accentColor', accentColor);
    localStorage.setItem('buttonColor', buttonColor);

    document.body.classList.add('custom');
    document.body.classList.remove('dark-mode', 'light-mode-defaults');

    // Close the modal after applying colors
    // document.getElementById('colorPickerModal').style.display = 'none';
});

function loadBody() {
    let theme = localStorage.getItem('theme') || 'light';
    console.log("Loaded theme from localStorage:", theme); // Debug log

    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode-defaults', 'custom');
    } else if (theme === 'light') {
        document.body.classList.add('light-mode-defaults');
        document.body.classList.remove('dark-mode', 'custom');
    } else if (theme === 'custom') {
        // Apply custom theme from localStorage
        const headerColor = localStorage.getItem('headerColor') || '#356859';
        const backgroundColor = localStorage.getItem('backgroundColor') || '#f5f5fa';
        const popColor = localStorage.getItem('popColor') || '#356859';
        const accentColor = localStorage.getItem('accentColor') || '#4a7c68';
        const buttonColor = localStorage.getItem('buttonColor') || '#4a7c68';

        // Set CSS variables dynamically
        document.documentElement.style.setProperty('--header-color', headerColor);
        document.documentElement.style.setProperty('--background-color', backgroundColor);
        document.documentElement.style.setProperty('--pop-color', popColor);
        document.documentElement.style.setProperty('--accent-color', accentColor);
        document.documentElement.style.setProperty('--button-color', buttonColor);

        document.body.classList.add('custom');
        document.body.classList.remove('dark-mode', 'light-mode-defaults');
    } else {
        document.body.classList.add('light-mode-defaults');
        document.body.classList.remove('dark-mode', 'custom');
    }
};

// Toggle theme when the button is clicked
document.getElementById('light_dark_button').addEventListener('click', function() {
    const lightDark = document.getElementById('lightDark');
    const lightDarkBtn = document.getElementById('light_dark_button');

    basicTheme = localStorage.getItem('theme');

    // Toggle dark mode class
    document.body.classList.toggle('dark-mode');

    // Determine the new theme and save it
    darkToggled = document.body.classList.contains('dark-mode') ? 'yes' : 'no';

    if(darkToggled === 'yes'){
        // Update the icon for light/dark mode
        if (lightDark.classList.contains('fa-moon-o')) {
            lightDark.classList.replace('fa-moon-o', 'fa-sun-o');
            lightDarkBtn.style.paddingTop = '6px';
            lightDarkBtn.style.paddingRight = '8px';
            lightDarkBtn.style.paddingLeft = '8px';
            lightDarkBtn.style.paddingBottom = '6px';
        }  
        // localStorage.setItem('theme', 'dark');

    } else if(darkToggled === 'no') {
        lightDark.classList.replace('fa-sun-o', 'fa-moon-o');
        lightDarkBtn.style.paddingTop = '6px';
        lightDarkBtn.style.paddingLeft = '10px';
        lightDarkBtn.style.paddingRight = '10px';
        lightDarkBtn.style.paddingBottom = '6px';

        
        if (basicTheme === 'light') {
            // localStorage.setItem('theme', 'light');
            document.body.classList.add('light-mode-defaults');
            document.body.classList.remove('dark-mode', 'custom');
        } else {
            // localStorage.setItem('theme', 'custom');
            document.body.classList.add('custom');
            document.body.classList.remove('dark-mode', 'light-mode-defaults');
        }
    }
});

// Reset to default light/dark mode when the defaultColorsBtn is clicked
document.getElementById('defaultColorsBtn').addEventListener('click', function () {
    document.body.classList.add('light-mode-defaults');
    let currentTheme = document.body.classList.contains('light-mode-defaults') ? 'light' : 'dark';
    document.body.classList.remove('dark-mode', 'custom');
    localStorage.setItem('theme', currentTheme);

    // Reset CSS custom properties
    document.documentElement.style.removeProperty('--background-color');
    document.documentElement.style.removeProperty('--pop-color');
    document.documentElement.style.removeProperty('--accent-color');
    document.documentElement.style.removeProperty('--button-color');
});
