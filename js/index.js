document.addEventListener('DOMContentLoaded', () => {
    // --- Image Slider Functionality ---
    const slider = document.getElementById('image-slider');
    if (slider) {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        let currentIndex = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        function startSlider() {
            stopSlider(); // Ensure no multiple intervals are running
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startSlider(); // Restart interval on manual navigation
            });

            prevBtn.addEventListener('click', () => {
                prevSlide();
                startSlider(); // Restart interval on manual navigation
            });
        }

        // Start the slider automatically
        startSlider();
    }

    // --- Visitor Counter Animation ---
    function animateCounter(element, finalValue) {
        let currentValue = 0;
        const duration = 1500; // Animation duration in ms
        const stepTime = Math.abs(Math.floor(duration / finalValue));

        const timer = setInterval(() => {
            currentValue += Math.ceil(finalValue/100); // Increment faster for large numbers
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            element.textContent = currentValue.toLocaleString(); // Add commas for readability
        }, stepTime);
    }

    const todayVisitorsEl = document.getElementById('today-visitors');
    const totalVisitorsEl = document.getElementById('total-visitors');

    if (todayVisitorsEl) {
        const todayCount = parseInt(todayVisitorsEl.textContent, 10);
        animateCounter(todayVisitorsEl, todayCount);
    }
    if (totalVisitorsEl) {
        const totalCount = parseInt(totalVisitorsEl.textContent, 10);
        animateCounter(totalVisitorsEl, totalCount);
    }

});
