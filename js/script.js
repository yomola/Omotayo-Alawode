document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            testimonials[index].classList.add('active');
        }
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Carousel Functionality
function initCarousel() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let counter = 0;
    const size = carouselImages[0].clientWidth;
    
    // Create dots
    carouselImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');
    
    // Set up the slider
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    
    // Next button
    nextBtn.addEventListener('click', () => {
        if (counter >= carouselImages.length - 1) return;
        counter++;
        updateCarousel();
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        counter--;
        updateCarousel();
    });
    
    // Auto slide
    let autoSlide = setInterval(() => {
        counter = (counter + 1) % carouselImages.length;
        updateCarousel();
    }, 5000);
    
    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            counter = (counter + 1) % carouselImages.length;
            updateCarousel();
        }, 5000);
    });
    
    // Go to specific slide
    function goToSlide(index) {
        counter = index;
        updateCarousel();
    }
    
    // Update carousel display
    function updateCarousel() {
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === counter);
        });
    }
    
    // Reset transition when it ends
    carouselSlide.addEventListener('transitionend', () => {
        if (carouselImages[counter].id === 'lastClone') {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - 2;
            carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        }
        if (carouselImages[counter].id === 'firstClone') {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - counter;
            carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        carouselSlide.style.transition = "none";
        carouselSlide.style.transform = `translateX(${-carouselImages[0].clientWidth * counter}px)`;
    });
}

// Initialize carousel when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Your existing DOMContentLoaded code...
    
    // Add this line to initialize the carousel
    initCarousel();
});