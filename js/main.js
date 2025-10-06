/*
 * JESSICA WALKER WEBSITE - MAIN JAVASCRIPT
 * Handles interactions, animations, and auth functionality
 */

// ==========================================
// GLOBAL VARIABLES AND CONFIGURATION
// ==========================================
const config = {
    animationDuration: 300,
    scrollOffset: 100,
    mobileBreakpoint: 768
};

// ==========================================
// DOM CONTENT LOADED EVENT
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeAuthModal();
    initializeGallery();
    initializeSmoothScroll();
});

// ==========================================
// LOADING SCREEN
// ==========================================
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time and fade out
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Active nav link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .timeline-item, .about-text, .contact-info, .certifications');
    
    // Add fade-in class to elements
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// CONTACT FORM FUNCTIONALITY
// ==========================================
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            'inquiry-type': formData.get('inquiry-type'),
            message: formData.get('message')
        };
        
        // Validate form
        if (validateContactForm(data)) {
            submitContactForm(data);
        }
    });
}

function validateContactForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Inquiry type validation
    if (!data['inquiry-type']) {
        errors.push('Please select an inquiry type');
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    if (errors.length > 0) {
        showNotification('Please fix the following errors:\n' + errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function submitContactForm(data) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual implementation)
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you for reaching out! I\'ll review your inquiry and get back to you within 24 hours. Let\'s connect and explore opportunities together!', 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // TODO: Implement actual form submission
        // This could be:
        // 1. EmailJS integration
        // 2. Netlify forms
        // 3. Firebase functions
        // 4. PHP backend
        console.log('Form data to be sent:', data);
        
    }, 2000);
}

// ==========================================
// AUTH MODAL FUNCTIONALITY
// ==========================================
function initializeAuthModal() {
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const closeBtn = authModal.querySelector('.close');
    
    authBtn.addEventListener('click', (e) => {
        e.preventDefault();
        authModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // TODO: Implement Firebase Auth
    initializeFirebaseAuth();
}

function initializeFirebaseAuth() {
    // Placeholder for Firebase Auth implementation
    console.log('Firebase Auth will be implemented here');
    
    // Example structure for Firebase Auth:
    /*
    import { initializeApp } from 'firebase/app';
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
    
    const firebaseConfig = {
        // Your config
    };
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    */
}

// ==========================================
// GALLERY FUNCTIONALITY
// ==========================================
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add lightbox functionality here
            openLightbox(item);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
}

function openLightbox(item) {
    // Placeholder for lightbox functionality
    console.log('Lightbox would open for:', item);
    
    // TODO: Implement lightbox modal for gallery images
    showNotification('Gallery lightbox coming soon!', 'info');
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10001;
        max-width: 400px;
        transform: translateX(500px);
        transition: transform 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    return colors[type] || colors.info;
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(500px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================
// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ==========================================
// FLOATING BUTTERFLY ANIMATION
// ==========================================
function createFloatingButterfly() {
    const butterfly = document.createElement('i');
    butterfly.className = 'fas fa-fan floating-butterfly';
    butterfly.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        color: rgba(255, 105, 180, 0.6);
        pointer-events: none;
        z-index: 1;
        animation: floatAcross 10s linear infinite;
    `;
    
    // Random starting position
    butterfly.style.left = '-50px';
    butterfly.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.appendChild(butterfly);
    
    // Remove after animation
    setTimeout(() => {
        if (butterfly.parentNode) {
            butterfly.parentNode.removeChild(butterfly);
        }
    }, 10000);
}

// Add CSS for floating butterfly animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatAcross {
        0% {
            transform: translateX(-50px) rotate(0deg);
        }
        100% {
            transform: translateX(calc(100vw + 50px)) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Create floating butterflies periodically
setInterval(createFloatingButterfly, 8000);

// ==========================================
// HERO SECTION INTERACTIONS
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Smooth scroll to about section
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Add extra butterfly animation
            createButterflyBurst(ctaButton);
        });
    }
});

function createButterflyBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const butterfly = document.createElement('i');
            butterfly.className = 'fas fa-fan burst-butterfly';
            butterfly.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1rem;
                color: rgba(255, 105, 180, 0.8);
                pointer-events: none;
                z-index: 1000;
                animation: butterflyBurst 2s ease-out forwards;
            `;
            
            // Random direction
            const angle = (i * 72) * (Math.PI / 180); // 72 degrees apart
            const distance = 100;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            butterfly.style.setProperty('--endX', endX + 'px');
            butterfly.style.setProperty('--endY', endY + 'px');
            
            document.body.appendChild(butterfly);
            
            setTimeout(() => {
                if (butterfly.parentNode) {
                    butterfly.parentNode.removeChild(butterfly);
                }
            }, 2000);
        }, i * 100);
    }
}

// Add burst animation CSS
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes butterflyBurst {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--endX), var(--endY)) scale(0.5) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// ==========================================
// EXPORT FOR EXTERNAL USE
// ==========================================
window.JessicaWalkerSite = {
    showNotification,
    createFloatingButterfly,
    config
};