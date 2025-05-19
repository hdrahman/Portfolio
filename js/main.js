// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100,
});

// Navigation toggle for mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle navigation
            nav.classList.toggle('nav-active');

            // Animate links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger animation
            burger.classList.toggle('toggle');
        });
    }
};

// Navbar scroll effect
const navbarScroll = () => {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
};

// Typing effect for the hero section
const initTypeWriter = () => {
    const text = document.querySelector('.typing-text');

    if (text) {
        const textContent = text.textContent;
        text.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < textContent.length) {
                text.textContent += textContent.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 1000);
    }
};

// Active link on scroll
const highlightActiveLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

// Progress bar animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.progress');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.parentElement.style.width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

// Form submission
const contactForm = () => {
    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Replace with actual form submission logic
            alert('Thanks for your message! This form is not connected to a backend yet.');
            form.reset();
        });
    }
};

// Smooth scroll for anchor links
const smoothScroll = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');

                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });
};

// Particles background effect
const initParticlesBackground = () => {
    const hero = document.querySelector('.hero');

    if (hero) {
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.classList.add('particles-canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';

        hero.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle properties
        const particlesArray = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = this.getRandomColor();
            }

            getRandomColor() {
                const colors = ['rgba(44, 239, 255, 0.7)', 'rgba(106, 17, 203, 0.7)'];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }

                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        const init = () => {
            for (let i = 0; i < particleCount; i++) {
                particlesArray.push(new Particle());
            }
        };

        // Connect particles with lines
        const connect = () => {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const distance = Math.sqrt(
                        (particlesArray[a].x - particlesArray[b].x) ** 2 +
                        (particlesArray[a].y - particlesArray[b].y) ** 2
                    );

                    if (distance < 150) {
                        const opacity = 1 - distance / 150;
                        ctx.strokeStyle = `rgba(44, 239, 255, ${opacity * 0.2})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }

            connect();
            requestAnimationFrame(animate);
        };

        init();
        animate();
    }
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    navbarScroll();
    initTypeWriter();
    highlightActiveLink();
    animateSkillBars();
    contactForm();
    smoothScroll();
    initParticlesBackground();

    // Burger menu toggle animation
    document.querySelector('.burger')?.classList.add('toggle');
    setTimeout(() => {
        document.querySelector('.burger')?.classList.remove('toggle');
    }, 1000);
});

// Add burger toggle animation
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');

    if (burger) {
        burger.addEventListener('click', () => {
            const line1 = burger.querySelector('.line1');
            const line2 = burger.querySelector('.line2');
            const line3 = burger.querySelector('.line3');

            line1.classList.toggle('line1-active');
            line2.classList.toggle('line2-active');
            line3.classList.toggle('line3-active');
        });
    }
});

// Additional styles for burger animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .line1-active {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .line2-active {
            opacity: 0;
        }
        .line3-active {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}); 