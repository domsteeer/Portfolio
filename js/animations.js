document.addEventListener("DOMContentLoaded", () => {
    // Animation elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const revealImages = document.querySelectorAll('.reveal-image');
    const progressBars = document.querySelectorAll('.progress-bar');

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add visible class when element is in viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate progress bars
                if (entry.target.classList.contains('progress-bar')) {
                    entry.target.classList.add('animate-progress');
                }
            } else {
                // Optionally remove the class when out of viewport for re-animation
                // Commenting this out for better UX, so elements don't animate repeatedly
                // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust when animations trigger
    });

    // Observe all animation elements
    fadeElements.forEach(el => observer.observe(el));
    revealImages.forEach(el => observer.observe(el));
    progressBars.forEach(el => observer.observe(el));

    // Typing effect for hero text (if typing effect class exists)
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;

        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, 150);
            }
        }

        typing();
    });

    // Page transition effect
    const pageTransition = document.createElement('div');
    pageTransition.classList.add('page-transition');
    document.body.appendChild(pageTransition);

    // Handle internal link clicks for page transitions
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Don't animate if it's the current section
            if (window.location.hash === targetId) return;
            
            // Add transition animation
            pageTransition.classList.add('active');
            
            // After animation, navigate to the section
            setTimeout(() => {
                window.location.hash = targetId;
                pageTransition.classList.remove('active');
            }, 600);
        });
    });

    // Parallax effect for elements with parallax class
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add floating animation to specified elements
    document.querySelectorAll('.float').forEach(element => {
        // Add random delay for more natural movement
        const delay = Math.random() * 2;
        element.style.animationDelay = `${delay}s`;
    });

    // Optional: Add scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateY(0)';
        }, 1500);

        // Hide scroll indicator when user scrolls
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                setTimeout(() => {
                    scrollIndicator.style.display = 'none';
                }, 500);
            }
        });
    }

    // Optional: Animate counts (for statistics, if present)
    const countElements = document.querySelectorAll('.count-up');
    
    countElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(element.dataset.target);
                    const duration = parseInt(element.dataset.duration || 2000);
                    let current = 0;
                    const increment = target / (duration / 16); // 60fps
                    
                    const timer = setInterval(() => {
                        current += increment;
                        element.textContent = Math.floor(current);
                        
                        if (current >= target) {
                            element.textContent = target;
                            clearInterval(timer);
                        }
                    }, 16);
                    
                    // Stop observing after animation
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });

    // Create a staggered appearance for list items
    document.querySelectorAll('.stagger-items').forEach(list => {
        const items = list.children;
        
        for (let i = 0; i < items.length; i++) {
            items[i].style.animationDelay = `${i * 0.1}s`;
            items[i].classList.add('fade-in');
        }
    });

    // Add tilt effect to cards
    document.querySelectorAll('.tilt-effect').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `perspective(1000px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * -10}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});
