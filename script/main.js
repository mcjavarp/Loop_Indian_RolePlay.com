// script/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
    });

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // --- Accordion for Rules Page ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const content = item.querySelector('.accordion-content');
            header.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // --- On-Load Animations ---
    const loadAnimations = document.querySelectorAll('.animate-on-load');
    loadAnimations.forEach(el => {
        const delay = el.dataset.delay || '0';
        el.style.animationDelay = `${delay}s`;
    });

    // --- Scroll-Triggered Animations ---
    const scrollAnimations = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || '0';
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    scrollAnimations.forEach(el => {
        observer.observe(el);
    });

    // --- Particle Background ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const setupCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = 'rgba(0, 170, 255, 0.5)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.1) this.size -= 0.01;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const handleParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].size <= 0.1) {
                    particles.splice(i, 1);
                    i--;
                }
            }
        };
        
        const createParticles = (e) => {
             let xPos = e.x;
             let yPos = e.y;
             for (let i = 0; i < 5; i++) {
                particles.push(new Particle(xPos, yPos));
             }
        };
        
        window.addEventListener('mousemove', createParticles);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            requestAnimationFrame(animate);
        };
        
        setupCanvas();
        animate();
        window.addEventListener('resize', setupCanvas);
    }
});