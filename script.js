// Custom Cursor Animation
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update cursor position
    cursor.style.left = mouseX - 15 + 'px';
    cursor.style.top = mouseY - 15 + 'px';

    // Smooth follower animation
    setTimeout(() => {
        followerX = mouseX - 4;
        followerY = mouseY - 4;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }, 50);
});

// Show cursor on mouse enter
document.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    cursorFollower.classList.add('active');
});

// Hide cursor on mouse leave
document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    cursorFollower.classList.remove('active');
});

// Expand cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .social-links a, .skill-item, .project-card, .contact-item, input, textarea, .theme-toggle, .hamburger');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.left = mouseX - 20 + 'px';
        cursor.style.top = mouseY - 20 + 'px';
        cursor.style.borderColor = 'var(--accent-color)';
        cursor.style.boxShadow = 'inset 0 0 15px rgba(100, 255, 218, 0.5), 0 0 20px rgba(100, 255, 218, 0.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.left = mouseX - 15 + 'px';
        cursor.style.top = mouseY - 15 + 'px';
        cursor.style.boxShadow = 'inset 0 0 10px rgba(100, 255, 218, 0.3), 0 0 10px rgba(100, 255, 218, 0.3)';
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference on page load
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Theme toggle button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const newTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);

    // Update icon
    themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});

// Animated counters for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 50);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 50);
}

// Animate stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-item h3').forEach(statElement => {
                const targetValue = parseInt(statElement.textContent);
                if (!statElement.dataset.animated) {
                    animateCounter(statElement, targetValue);
                    statElement.dataset.animated = 'true';
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection.closest('section'));
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (name && email && message) {
            // The form will submit to formspree
            this.submit();
        } else {
            if (formStatus) {
                formStatus.style.color = '#ff6b6b';
                formStatus.textContent = 'Please fill in all fields.';
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 3000);
            }
        }
    });
}

// Add floating animation to skill items
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('animate-float');
});

// Typing effect for hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Enhanced hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });

    // Make entire card clickable and redirect to GitHub
    card.addEventListener('click', () => {
        const githubLink = card.querySelector('.project-link');
        if (githubLink && githubLink.href) {
            window.open(githubLink.href, '_blank');
        }
    });

    // Make card cursor pointer
    card.style.cursor = 'pointer';
});

// Parallax effect for hero section with performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;

            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Scroll-based navbar background enhancement
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});
