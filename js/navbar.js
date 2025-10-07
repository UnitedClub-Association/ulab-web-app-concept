// The DOMContentLoaded wrapper has been removed.
// The script now starts directly with variable declarations.

const floatingToggleBtn = document.getElementById('floating-toggle-btn');
const sidebarWrapper = document.getElementById('sidebar-wrapper');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const siteHeader = document.getElementById('site-header');
const dropdowns = document.querySelectorAll('.sidebar-menu .dropdown');
const ticker = document.querySelector('.notice-ticker');

// --- Mobile Sidebar Toggle ---
if (floatingToggleBtn && sidebarWrapper && sidebarOverlay) {
    floatingToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebarWrapper.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebarWrapper.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });
}

// --- Mobile Dropdown Toggle ---
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a.nav-link');
    if (link && dropdown.querySelector('.dropdown-menu')) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent link from navigating

            // Check if the dropdown we clicked is already open
            const isAlreadyActive = dropdown.classList.contains('active');

            // First, close all dropdowns to create the accordion effect
            dropdowns.forEach(d => {
                d.classList.remove('active');
            });

            // If the clicked dropdown was NOT already open, open it.
            // Otherwise, it will remain closed (from the step above).
            if (!isAlreadyActive) {
                dropdown.classList.add('active');
            }
        });
    }
});

// --- Infinite Notice Ticker ---
if (ticker) {
    const content = ticker.querySelector('.ticker-content');
    if (content && content.children.length > 0) {
        const clone = content.cloneNode(true);
        ticker.appendChild(clone);
    }
}

// --- Hide Header on Scroll ---
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    if (!siteHeader) return;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > siteHeader.offsetHeight) {
        // Scroll Down
        siteHeader.style.top = `-${siteHeader.offsetHeight}px`;
    } else {
        // Scroll Up
        siteHeader.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});