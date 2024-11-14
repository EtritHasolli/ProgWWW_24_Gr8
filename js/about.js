const lightDark = document.getElementById('lightDark');
const lightDarkBtn = document.getElementById('light_dark_button');

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
