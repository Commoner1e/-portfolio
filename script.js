document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Smooth Scroll
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        // Header Scroll Effect
        const header = document.querySelector('#header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('.nav-links a, .cta-group a, .logo').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Active Link Highlighting on Scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Portfolio Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Form Submission Handling
        const contactForm = document.querySelector('form');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Basic animation for feedback
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;

                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                // Simulate API Call
                setTimeout(() => {
                    alert('Thank you for reaching out, Rojan! Your message has been sent successfully.');
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 1500);
            });
        }

        // Scroll Reveal Animation (Simple Implementation)
        const revealElements = document.querySelectorAll('.skill-card, .portfolio-item, .featured-project, .about-grid');

        const reveal = () => {
            revealElements.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const revealPoint = 150;

                if (elementTop < windowHeight - revealPoint) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        };

        // Set initial state for reveal elements
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        window.addEventListener('scroll', reveal);
        reveal(); // Initial check
    });
    // 6. Typing Effect for Hero (Detailing)
    const heroH1 = document.querySelector('.hero h1 span');
    if (heroH1) {
        const text = heroH1.innerText;
        heroH1.innerText = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroH1.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Only run if not mobile for better perf
        if (window.innerWidth > 768) {
            setTimeout(typeWriter, 500);
        } else {
            heroH1.innerText = text;
        }
    }
});