document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loader ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Trigger initial animations after load
            document.querySelectorAll('.fade-up').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 100);
            });
        }, 500);
    }, 1500);

    // --- 2. Navbar & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Navigation Highlighting
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.querySelector('i').classList.remove('fa-xmark');
            mobileBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- 3. Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // --- 4. Countdown Timer ---
    const eventDate = new Date('October 25, 2026 09:00:00').getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0'+days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0'+hours : hours;
        document.getElementById('mins').innerText = mins < 10 ? '0'+mins : mins;
        document.getElementById('secs').innerText = secs < 10 ? '0'+secs : secs;
    };
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- 5. Custom Particles Animation for Hero Background ---
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? '#ff2a2a' : '#00f0ff';
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.01;
            
            // Re-initialize if particle goes out or shrinks too much
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.size <= 0.2) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 8000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();

    // --- 6. Form Validation & Simulated Submission ---
    const regForm = document.getElementById('registrationForm');
    const formMessages = document.getElementById('formMessages');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic Client-Side Validation
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const college = document.getElementById('collegeName').value.trim();
        const department = document.getElementById('department').value;
        const phone = document.getElementById('phoneNumber').value.trim();

        if (!fullName || !email || !college || !department || !phone) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            showMessage('Please enter a valid 10-digit phone number.', 'error');
            return;
        }

        // Simulate API call and Show Success
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;

        setTimeout(() => {
            showMessage('Registration Successful! See you at PowerTech 2026.', 'success');
            regForm.reset();
            
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }, 2000);
    });

    function showMessage(msg, type) {
        formMessages.innerHTML = '';
        const p = document.createElement('p');
        p.style.padding = '15px';
        p.style.borderRadius = '4px';
        p.style.fontWeight = '500';
        p.style.display = 'flex';
        p.style.alignItems = 'center';
        p.style.gap = '10px';
        
        if (type === 'success') {
            p.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
            p.style.color = '#00f0ff';
            p.style.border = '1px solid var(--border-cyan)';
            p.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${msg}`;
        } else {
            p.style.backgroundColor = 'rgba(255, 42, 42, 0.1)';
            p.style.color = '#ff2a2a';
            p.style.border = '1px solid var(--border-glow)';
            p.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${msg}`;
        }
        
        formMessages.appendChild(p);

        // Auto remove message after 5 seconds
        setTimeout(() => {
            if(formMessages.contains(p)) {
                p.style.transition = 'opacity 0.5s';
                p.style.opacity = '0';
                setTimeout(() => p.remove(), 500);
            }
        }, 5000);
    }

    // --- 7. Event Card Modal Logic ---
    const eventModal = document.getElementById('eventModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    // Add click listener to all event cards
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            // Get data from the card
            const iconHTML = card.querySelector('.event-icon').innerHTML;
            const titleText = card.querySelector('h3').innerText;
            const descText = card.querySelector('p').innerText;

            // Populate the modal
            modalIcon.innerHTML = iconHTML;
            modalTitle.innerText = titleText;
            modalDesc.innerText = descText;

            // Show the modal
            eventModal.classList.add('active');
        });
    });

    // Close modal when X is clicked
    closeModalBtn.addEventListener('click', () => {
        eventModal.classList.remove('active');
    });

    // Close modal when clicking outside the content
    eventModal.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            eventModal.classList.remove('active');
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && eventModal.classList.contains('active')) {
            eventModal.classList.remove('active');
        }
    });

    // --- 8. Mouse Lightning Effect ---
    const mouseCanvas = document.getElementById('mouse-canvas');
    if (mouseCanvas) {
        const mCtx = mouseCanvas.getContext('2d');
        let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
        let lightnings = [];

        mouseCanvas.width = window.innerWidth;
        mouseCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            mouseCanvas.width = window.innerWidth;
            mouseCanvas.height = window.innerHeight;
        });

        class Lightning {
            constructor(x, y) {
                this.startX = x;
                this.startY = y;
                this.life = 1.0;
                this.color = Math.random() > 0.5 ? '#00f0ff' : '#ff2a2a';
                this.lineWidth = Math.random() * 2 + 1.5;
                this.paths = [];
                
                this.generateBolt(this.startX, this.startY, this.lineWidth, 0);
            }
            
            generateBolt(x, y, width, depth) {
                if (depth > 2) return; // Max branching depth
                
                let currentX = x;
                let currentY = y;
                let length = Math.random() * 150 + 50; // Bolt length
                let segments = Math.floor(length / 15);
                
                let targetX = currentX + (Math.random() - 0.5) * length * 2;
                let targetY = currentY + (Math.random() - 0.5) * length * 2;
                
                let path = [{x: currentX, y: currentY}];
                
                for(let i=1; i<=segments; i++){
                    let progress = i / segments;
                    let nextX = x + (targetX - x) * progress + (Math.random() - 0.5) * 40;
                    let nextY = y + (targetY - y) * progress + (Math.random() - 0.5) * 40;
                    path.push({x: nextX, y: nextY});
                    currentX = nextX;
                    currentY = nextY;
                    
                    // Branching probability
                    if (Math.random() > 0.7) {
                        this.generateBolt(currentX, currentY, width * 0.6, depth + 1);
                    }
                }
                this.paths.push({path: path, width: width});
            }

            update() {
                this.life -= 0.08; // Fade out speed
            }

            draw() {
                mCtx.globalAlpha = Math.max(0, this.life);
                mCtx.strokeStyle = this.color;
                mCtx.shadowBlur = 15;
                mCtx.shadowColor = this.color;
                
                this.paths.forEach(p => {
                    mCtx.lineWidth = p.width;
                    mCtx.beginPath();
                    mCtx.moveTo(p.path[0].x, p.path[0].y);
                    for(let i=1; i<p.path.length; i++) {
                        mCtx.lineTo(p.path[i].x, p.path[i].y);
                    }
                    mCtx.stroke();
                });
                
                mCtx.shadowBlur = 0;
                mCtx.globalAlpha = 1.0;
            }
        }

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            // Spawn lightning less frequently but make it more impactful
            if(Math.random() > 0.85) {
                lightnings.push(new Lightning(mouse.x, mouse.y));
            }
        });

        function animateMouseEffects() {
            mCtx.clearRect(0, 0, mouseCanvas.width, mouseCanvas.height);
            
            for (let i = 0; i < lightnings.length; i++) {
                lightnings[i].update();
                lightnings[i].draw();
                if (lightnings[i].life <= 0) {
                    lightnings.splice(i, 1);
                    i--;
                }
            }

            requestAnimationFrame(animateMouseEffects);
        }
        
        animateMouseEffects();
    }
});
