// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');

// Check for saved theme preference or default to light mode
const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
});

// Mobile menu functionality
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Smooth scrolling for all anchor links
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

// Navbar scroll effect
let lastScrollY = window.scrollY;
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark'
            ? 'rgba(26, 26, 26, 0.98)'
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark'
            ? 'rgba(26, 26, 26, 0.95)'
            : 'rgba(255, 255, 255, 0.95)';
    }
});

// Contact form submission with better UX
document.getElementById('contact-form').addEventListener('submit', function(e) {
    const form = e.target;
    const button = form.querySelector('.cta-button');
    const buttonText = button.querySelector('.button-text');
    const buttonLoading = button.querySelector('.button-loading');
    const status = document.getElementById('form-status');
    
    // Show loading state
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline';
    button.disabled = true;
    
    // Use fetch to submit the form
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.classList.remove('error');
            status.classList.add('success');
            status.style.display = 'block';
            status.innerHTML = '✅ Thanks! Your message has been sent successfully. I\'ll get back to you soon!';
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    }).catch(error => {
        status.classList.remove('success');
        status.classList.add('error');
        status.style.display = 'block';
        status.innerHTML = '❌ Oops! Something went wrong. Please try again or email me directly.';
    }).finally(() => {
        // Reset button state
        buttonText.style.display = 'inline';
        buttonLoading.style.display = 'none';
        button.disabled = false;
    });
    
    e.preventDefault();
});

// Card animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Set initial state and observe cards
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.card, .timeline-item, .social-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});