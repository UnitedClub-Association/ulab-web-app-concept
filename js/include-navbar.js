// This script fetches the navbar HTML and injects it into a placeholder element.
// This allows you to reuse the navbar across multiple pages easily.

document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    
    if (navbarPlaceholder) {
        fetch('/components/navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                // Inject the navbar HTML
                navbarPlaceholder.innerHTML = data;

                // The navbar.html itself loads its CSS, but the JS needs to be re-loaded
                // to execute in the context of the main document. We fetch and append it.
                return fetch('/js/navbar.js');
            })
            .then(response => response.text())
            .then(scriptText => {
                const script = document.createElement('script');
                script.textContent = scriptText;
                document.body.appendChild(script);
            })
            .catch(error => {
                console.error('Error fetching or loading navbar:', error);
                navbarPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Failed to load navigation bar.</p>';
            });
    }
});
