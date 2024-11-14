const lightDark = document.getElementById('lightDark');
const lightDarkBtn = document.getElementById('light_dark_button');

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
