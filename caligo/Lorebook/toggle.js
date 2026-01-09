const toggle = document.getElementById('toggle-stars');
const starsScript = document.getElementById('stars-script');

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        // Enable stars.js by re-adding the script
        if (!document.getElementById('stars-script')) {
            const script = document.createElement('script');
            script.src = 'stars.js';
            script.id = 'stars-script';
            document.body.appendChild(script);
        }
    } else {
        // Disable stars.js by removing the script
        if (starsScript) {
            starsScript.remove();
        }
    }
});
