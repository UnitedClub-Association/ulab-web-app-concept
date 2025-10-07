// This script fetches the footer HTML and injects it into a placeholder element.

document.addEventListener('DOMContentLoaded', function() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (footerPlaceholder) {
        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching or loading footer:', error);
                footerPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Failed to load footer.</p>';
            });
    }
});
