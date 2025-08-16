document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Video Carousel (No Auto-Rotation)
    // ======================
    const initVideoCarousel = () => {
        const slides = document.querySelector('.video-slides');
        const slideItems = document.querySelectorAll('.video-slide');
        const prevBtn = document.querySelector('.prev-video');
        const nextBtn = document.querySelector('.next-video');
        const dotsContainer = document.querySelector('.video-dots');
        
        // Exit if elements don't exist
        if (!slides || slideItems.length === 0) return;
        
        let currentIndex = 0;
        const slideCount = slideItems.length;
        
        // Create navigation dots
        const createDots = () => {
            slideItems.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('video-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        };
        
        // Update carousel position
        const updateCarousel = () => {
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.video-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };
        
        // Go to specific slide
        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
        };
        
        // Initialize
        createDots();
        updateCarousel();
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            slides.style.transition = 'none';
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
            setTimeout(() => {
                slides.style.transition = 'transform 0.5s ease-in-out';
            });
        });
    };

    // ======================
    // Image Carousel (With Auto-Rotation)
    // ======================
    const initImageCarousel = () => {
        const slides = document.querySelector('.image-slides');
        const slideItems = document.querySelectorAll('.image-slide');
        const prevBtn = document.querySelector('.image-prev-btn');
        const nextBtn = document.querySelector('.image-next-btn');
        const dotsContainer = document.querySelector('.image-dots');
        
        // Exit if elements don't exist
        if (!slides || slideItems.length === 0) return;
        
        let currentIndex = 0;
        const slideCount = slideItems.length;
        let slideInterval;
        
        // Create navigation dots
        const createDots = () => {
            slideItems.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('image-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        };
        
        // Update carousel position
        const updateCarousel = () => {
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.image-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };
        
        // Go to specific slide
        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
        };
        
        // Start auto-rotation
        const startAutoSlide = () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }, 5000); // Rotate every 5 seconds
        };
        
        // Initialize
        createDots();
        updateCarousel();
        startAutoSlide();
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
            resetAutoSlide();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
            resetAutoSlide();
        });
        
        // Reset timer on interaction
        const resetAutoSlide = () => {
            clearInterval(slideInterval);
            startAutoSlide();
        };
        
        // Pause on hover
        const carousel = document.querySelector('.image-carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            slides.style.transition = 'none';
            slides.style.transform = `translateX(${-currentIndex * 100}%)`;
            setTimeout(() => {
                slides.style.transition = 'transform 0.5s ease-in-out';
            });
        });
    };

    // ======================
    // Testimonial Slider (Auto-Rotation)
    // ======================
    const initTestimonialSlider = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length === 0) return;
        
        let currentIndex = 0;
        
        const showTestimonial = (index) => {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            testimonials[index].classList.add('active');
        };
        
        // Auto-rotate every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    };

    // ======================
    // Smooth Scrolling
    // ======================
    const initSmoothScrolling = () => {
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
    };

    // ======================
    // Form Handling
    // ======================
    const initContactForm = () => {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    };

    // Initialize all components
    initVideoCarousel();
    initImageCarousel();
    initTestimonialSlider();
    initSmoothScrolling();
    initContactForm();
});