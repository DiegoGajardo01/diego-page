// scripts.js
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeLabel.textContent = 'Modo Oscuro';
    } else {
        themeLabel.textContent = 'Modo Claro';
    }
});

// Almacenamos el estado del tema en localStorage para recordarlo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
    themeLabel.textContent = 'Modo Oscuro';
}

themeToggle.addEventListener('change', () => {
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
