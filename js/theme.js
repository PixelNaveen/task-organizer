document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const iconMoon = document.getElementById("icon-moon");
    const iconSun = document.getElementById("icon-sun");

    function setTheme(isDark) {
        document.body.classList.toggle("dark-theme", isDark);
        iconMoon.style.display = isDark ? "none" : "block";
        iconSun.style.display = isDark ? "block" : "none";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme === "dark");

    themeToggleBtn.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-theme");
        setTheme(isDark);
    });
});