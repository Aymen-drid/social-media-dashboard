document.addEventListener('DOMContentLoaded', function() {
    const themeToggleCheckbox = document.querySelector("[data-theme-toggle]");
    const toggleText = document.getElementById("toggle-text");
    const body = document.documentElement; // target the <html> element
    // Function to update theme based on the checkbox state
    function updateTheme() {
      const newTheme = themeToggleCheckbox.checked ? "dark" : "light";
      
      // Update the toggle text
      toggleText.textContent = newTheme === "dark" ? "Light mode" : "Dark mode";
      
      // Update the theme attribute on <html> to switch theme in CSS
      body.setAttribute("data-theme", newTheme);
      
      // Update local storage
      localStorage.setItem("theme", newTheme);
    }
  
    // Get theme from local storage
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme) {
      body.setAttribute("data-theme", storedTheme);
      themeToggleCheckbox.checked = storedTheme === "dark";
      toggleText.textContent = storedTheme === "dark" ? "Light mode" : "Dark mode";
    } else {
      // Default to system setting if no theme is stored
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = systemPrefersDark ? "dark" : "light";
      body.setAttribute("data-theme", initialTheme);
      themeToggleCheckbox.checked = systemPrefersDark;
      toggleText.textContent = initialTheme === "dark" ? "Light mode" : "Dark mode";
    }
  
    // Add event listener to the checkbox
    themeToggleCheckbox.addEventListener("change", updateTheme);
  });
  