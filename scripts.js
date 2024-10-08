// scripts.js
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = themeToggleBtn.querySelector('i');

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    updateThemeIcon();
    saveThemePreference();
}

function updateThemeIcon() {
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

function saveThemePreference() {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Cargar preferencia de tema guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
}

themeToggleBtn.addEventListener('click', toggleTheme);