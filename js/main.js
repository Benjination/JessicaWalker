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
// IMAGE PATTERNS CONFIGURATION
// ==========================================
// Configure available images for blog posts
// To add new images:
// 1. Add image file(s) to the Images folder
// 2. Add corresponding pattern below
// 3. Save and refresh - images will appear automatically in blog editor
const imagePatterns = [
    // Jessica's professional photos
    { prefix: 'Jessica', count: 5, extension: 'png' },
    // Butterfly decorative images
    { prefix: 'Butterfly', count: 4, extension: 'png' },
    // Girly background elements
    { prefix: 'Girly', count: 3, extension: 'png' },
    // Additional custom images (add new patterns here)
    { prefix: 'StarCrystals', count: 1, extension: 'png' }
];

// ==========================================
// BLOG PERFORMANCE CONFIGURATION
// ==========================================
const blogConfig = {
    postsPerPage: 6,                    // Number of posts to load per page
    scrollThreshold: 300,               // Pixels from bottom to trigger load more
    searchMinChars: 2,                  // Minimum characters to trigger search
    searchDebounceMs: 300,              // Debounce delay for search input
    maxSearchResults: 20,               // Maximum search results to display
    lazyLoadOffset: 100                 // Pixels offset for lazy loading images
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
    
    // Safety check - only initialize if form exists
    if (!contactForm) {
        console.log('Contact form not found - skipping initialization');
        return;
    }
    
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
    const secretW = document.querySelector('.secret-w');
    const authModal = document.getElementById('auth-modal');
    const authForm = document.getElementById('auth-form');
    const authMessage = document.getElementById('auth-message');
    
    // Safety check - only initialize if elements exist
    if (!secretW || !authModal) {
        console.log('Auth modal elements not found - skipping initialization');
        return;
    }
    
    const closeBtn = authModal.querySelector('.close');
    
    if (!closeBtn) {
        console.log('Auth modal close button not found - skipping initialization');
        return;
    }

    // Secret W click handler
    secretW.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        authModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Secret portal accessed via footer');
    });
    
    // Close modal handlers
    closeBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetAuthForm();
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetAuthForm();
        }
    });

    // Auth form submission
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('auth-email').value;
            const password = document.getElementById('auth-password').value;
            const submitBtn = document.querySelector('.auth-submit-btn');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Authenticating...</span><i class="fas fa-spinner fa-spin"></i>';
            
            try {
                // Check if Firebase is available
                if (typeof window.firebaseAuth === 'undefined' || typeof window.signInWithEmailAndPassword === 'undefined') {
                    throw new Error('Firebase not properly initialized. Please check your configuration.');
                }
                
                // Attempt Firebase authentication
                const userCredential = await window.signInWithEmailAndPassword(window.firebaseAuth, email, password);
                const user = userCredential.user;
                
                showAuthMessage('Authentication successful! Welcome back.', 'success');
                console.log('User authenticated:', user.email);
                
                // Open blog management modal after successful authentication
                setTimeout(() => {
                    authModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    resetAuthForm();
                    
                    // Show blog management modal
                    if (window.blogManager) {
                        blogManager.isAuthenticated = true;
                        blogManager.show();
                    }
                }, 2000);
                
            } catch (error) {
                console.error('Authentication error:', error);
                let errorMessage = 'Authentication failed. Please check your credentials.';
                
                // Customize error messages based on Firebase error codes
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email address.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password. Please try again.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address format.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many failed attempts. Please try again later.';
                        break;
                    default:
                        errorMessage = error.message || errorMessage;
                }
                
                showAuthMessage(errorMessage, 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Authenticate</span><i class="fas fa-key"></i>';
            }
        });
    }

    function showAuthMessage(message, type) {
        authMessage.textContent = message;
        authMessage.className = `auth-message ${type}`;
        authMessage.style.opacity = '1';
    }

    function resetAuthForm() {
        if (authForm) {
            authForm.reset();
        }
        authMessage.style.opacity = '0';
        authMessage.className = 'auth-message';
    }
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

// ==========================================
// BLOG MANAGEMENT SYSTEM
// ==========================================

/*
 * Image Management Instructions:
 * 
 * To add new images to the blog system:
 * 1. Add your image file to the Images/ folder
 * 2. Update the imagePatterns array at the top of this file (around line 15)
 * 3. For single images: { prefix: 'ImageName', count: 1, extension: 'png' }
 * 4. For numbered series: { prefix: 'Series', count: 5, extension: 'png' }
 * 5. Commit and push your changes
 * 
 * The system will automatically:
 * - Generate the dropdown options
 * - Format names nicely (StarCrystals becomes "Star Crystals")
 * - Sort alphabetically
 * - Validate image availability
 */

class BlogManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentEditingPost = null;
        this.availableImages = [];
        this.init();
    }

    async init() {
        // Wait for Firebase to be available
        if (typeof window.firebaseDB === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        this.initializeEventListeners();
        await this.loadAvailableImages();
    }

    initializeEventListeners() {
        // Blog modal management
        const blogModal = document.getElementById('blogModal');
        const blogClose = document.querySelector('.blog-close');

        if (blogClose) {
            blogClose.addEventListener('click', () => {
                blogModal.style.display = 'none';
            });
        }

        // Tab switching
        const tabBtns = document.querySelectorAll('.blog-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Blog form submission
        const blogForm = document.getElementById('blogForm');
        if (blogForm) {
            blogForm.addEventListener('submit', (e) => this.handleBlogSubmit(e));
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === blogModal) {
                blogModal.style.display = 'none';
            }
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.blog-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.blog-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');

        // Load specific tab content
        if (tabName === 'manage') {
            this.loadBlogPosts();
        }
    }

    async handleBlogSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const postData = {
            title: formData.get('title'),
            body: formData.get('body'),
            image: formData.get('image') || null,
            published: formData.get('published') === 'on',
            createdAt: window.firebaseFirestore.serverTimestamp(),
            updatedAt: window.firebaseFirestore.serverTimestamp()
        };

        try {
            if (this.currentEditingPost) {
                // Update existing post
                const postRef = window.firebaseFirestore.doc(window.firebaseDB, 'JessBlogs', this.currentEditingPost);
                await window.firebaseFirestore.updateDoc(postRef, {
                    ...postData,
                    updatedAt: window.firebaseFirestore.serverTimestamp()
                });
                showNotification('Blog post updated successfully!', 'success');
                this.currentEditingPost = null;
                document.querySelector('[data-tab="manage"]').click();
            } else {
                // Create new post
                await window.firebaseFirestore.addDoc(
                    window.firebaseFirestore.collection(window.firebaseDB, 'JessBlogs'),
                    postData
                );
                showNotification('Blog post created successfully!', 'success');
            }

            // Reset form
            e.target.reset();
            this.switchTab('manage');
            
            // Refresh blog posts list
            this.loadBlogPosts();
            
            // Refresh public blog view if it exists
            if (window.publicBlogViewer) {
                await window.publicBlogViewer.refresh();
            }
        } catch (error) {
            console.error('Error saving blog post:', error);
            showNotification('Error saving blog post. Please try again.', 'error');
        }
    }

    async loadBlogPosts() {
        const loadingEl = document.getElementById('postsLoading');
        const listEl = document.getElementById('blogPostsList');
        
        if (loadingEl) loadingEl.style.display = 'block';
        if (listEl) listEl.innerHTML = '';

        try {
            const q = window.firebaseFirestore.query(
                window.firebaseFirestore.collection(window.firebaseDB, 'JessBlogs'),
                window.firebaseFirestore.orderBy('createdAt', 'desc')
            );
            
            const querySnapshot = await window.firebaseFirestore.getDocs(q);
            
            if (loadingEl) loadingEl.style.display = 'none';

            if (querySnapshot.empty) {
                if (listEl) {
                    listEl.innerHTML = '<p class="loading">No blog posts yet. Create your first post!</p>';
                }
                return;
            }

            const postsHTML = [];
            querySnapshot.forEach((doc) => {
                const post = doc.data();
                const date = post.createdAt ? post.createdAt.toDate().toLocaleDateString() : 'Draft';
                
                postsHTML.push(`
                    <div class="blog-post-item">
                        <div class="blog-post-header">
                            <h3 class="blog-post-title">${this.escapeHtml(post.title)}</h3>
                            <span class="blog-post-status ${post.published ? 'published' : 'draft'}">
                                ${post.published ? 'Published' : 'Draft'}
                            </span>
                        </div>
                        <div class="blog-post-date">Created: ${date}</div>
                        <div class="blog-post-preview">
                            ${this.escapeHtml(post.body.substring(0, 150))}${post.body.length > 150 ? '...' : ''}
                        </div>
                        <div class="blog-post-actions">
                            <button class="blog-action-btn blog-edit-btn" onclick="blogManager.editPost('${doc.id}')">
                                Edit
                            </button>
                            <button class="blog-action-btn blog-toggle-btn ${post.published ? 'unpublish' : ''}" 
                                    onclick="blogManager.togglePublish('${doc.id}', ${!post.published})">
                                ${post.published ? 'Unpublish' : 'Publish'}
                            </button>
                            <button class="blog-action-btn blog-delete-btn" onclick="blogManager.deletePost('${doc.id}')">
                                Delete
                            </button>
                        </div>
                    </div>
                `);
            });

            if (listEl) {
                listEl.innerHTML = postsHTML.join('');
            }
        } catch (error) {
            console.error('Error loading blog posts:', error);
            if (loadingEl) loadingEl.style.display = 'none';
            if (listEl) {
                listEl.innerHTML = '<p class="loading">Error loading posts. Please refresh and try again.</p>';
            }
        }
    }

    async editPost(postId) {
        try {
            const docRef = window.firebaseFirestore.doc(window.firebaseDB, 'JessBlogs', postId);
            const docSnap = await window.firebaseFirestore.getDocs(window.firebaseFirestore.query(
                window.firebaseFirestore.collection(window.firebaseDB, 'JessBlogs')
            ));
            
            let postData = null;
            docSnap.forEach(doc => {
                if (doc.id === postId) {
                    postData = doc.data();
                }
            });

            if (postData) {
                // Fill form with existing data
                document.getElementById('blogTitle').value = postData.title;
                document.getElementById('blogBody').value = postData.body;
                document.getElementById('blogImage').value = postData.image || '';
                document.getElementById('blogPublished').checked = postData.published;
                
                // Update form button
                const submitBtn = document.querySelector('.blog-submit-btn .btn-text');
                if (submitBtn) submitBtn.textContent = 'Update Post';
                
                this.currentEditingPost = postId;
                this.switchTab('create');
            }
        } catch (error) {
            console.error('Error loading post for editing:', error);
            showNotification('Error loading post. Please try again.', 'error');
        }
    }

    async togglePublish(postId, shouldPublish) {
        try {
            const postRef = window.firebaseFirestore.doc(window.firebaseDB, 'JessBlogs', postId);
            await window.firebaseFirestore.updateDoc(postRef, {
                published: shouldPublish,
                updatedAt: window.firebaseFirestore.serverTimestamp()
            });
            
            showNotification(`Post ${shouldPublish ? 'published' : 'unpublished'} successfully!`, 'success');
            this.loadBlogPosts();
            
            // Refresh public blog view if it exists
            if (window.publicBlogViewer) {
                await window.publicBlogViewer.refresh();
            }
        } catch (error) {
            console.error('Error toggling publish status:', error);
            showNotification('Error updating post. Please try again.', 'error');
        }
    }

    async deletePost(postId) {
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            return;
        }

        try {
            await window.firebaseFirestore.deleteDoc(
                window.firebaseFirestore.doc(window.firebaseDB, 'JessBlogs', postId)
            );
            showNotification('Post deleted successfully!', 'success');
            this.loadBlogPosts();
            
            // Refresh public blog view if it exists
            if (window.publicBlogViewer) {
                await window.publicBlogViewer.refresh();
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            showNotification('Error deleting post. Please try again.', 'error');
        }
    }

    async loadAvailableImages() {
        try {
            // Dynamic image detection system using global imagePatterns configuration
            // Build image list from patterns
            this.availableImages = [];
            
            for (const pattern of imagePatterns) {
                if (pattern.count === 1) {
                    // Single image (like StarCrystals.png)
                    this.availableImages.push(`${pattern.prefix}.${pattern.extension}`);
                } else {
                    // Numbered series (like Jessica1.png, Jessica2.png, etc.)
                    for (let i = 1; i <= pattern.count; i++) {
                        this.availableImages.push(`${pattern.prefix}${i}.${pattern.extension}`);
                    }
                }
            }

            // Sort alphabetically for better organization
            this.availableImages.sort();

            console.log('Available images loaded:', this.availableImages);
            this.updateImageSelect();
        } catch (error) {
            console.error('Error loading available images:', error);
        }
    }

    updateImageSelect() {
        const imageSelect = document.getElementById('blogImage');
        if (!imageSelect) return;

        // Clear existing options except the first one
        while (imageSelect.children.length > 1) {
            imageSelect.removeChild(imageSelect.lastChild);
        }

        // Add available images with validation
        this.availableImages.forEach(image => {
            const option = document.createElement('option');
            option.value = image;
            option.textContent = this.formatImageName(image);
            imageSelect.appendChild(option);
        });
    }

    // Helper method to format image names for display
    formatImageName(filename) {
        // Remove extension and format nicely
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
        
        // Add spaces before numbers and capitalize
        const formatted = nameWithoutExt
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capitals
            .replace(/([a-z])(\d)/g, '$1 $2')   // Add space before numbers
            .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
        
        return formatted;
    }

    // Helper method to easily add new images to the system
    addCustomImage(filename) {
        if (!this.availableImages.includes(filename)) {
            this.availableImages.push(filename);
            this.availableImages.sort();
            this.updateImageSelect();
            console.log(`Added new image: ${filename}`);
        }
    }

    // Show blog management modal (called after successful auth)
    show() {
        const blogModal = document.getElementById('blogModal');
        if (blogModal) {
            blogModal.style.display = 'block';
            this.loadBlogPosts();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize blog manager
const blogManager = new BlogManager();
window.blogManager = blogManager;

// ==========================================
// PUBLIC BLOG DISPLAY
// ==========================================

class PublicBlogViewer {
    constructor() {
        this.allPosts = []; // Store all posts for search
        this.displayedPosts = []; // Currently displayed posts
        this.currentPage = 0;
        this.isLoading = false;
        this.hasMorePosts = true;
        this.searchTerm = '';
        this.searchTimeout = null;
        this.isSearchActive = false;
        
        this.init();
    }

    async init() {
        // Wait for Firebase to be available with timeout
        let retryCount = 0;
        const maxRetries = 50; // 5 seconds total
        
        const waitForFirebase = () => {
            if (typeof window.firebaseDB === 'undefined' || typeof window.firebaseFirestore === 'undefined') {
                retryCount++;
                if (retryCount < maxRetries) {
                    setTimeout(() => this.init(), 100);
                    return false;
                } else {
                    console.error('Firebase initialization timeout - blog posts will not load');
                    this.showError('Unable to connect to blog service. Please refresh the page.');
                    return false;
                }
            }
            return true;
        };

        if (!waitForFirebase()) return;

        try {
            this.initializeEventListeners();
            await this.loadAllPosts();
            this.displayPosts();
        } catch (error) {
            console.error('Error initializing blog viewer:', error);
            this.showError('Error loading blog posts. Please refresh the page.');
        }
    }

    showError(message) {
        const loadingEl = document.getElementById('blogLoading');
        const emptyEl = document.getElementById('blogEmpty');
        
        if (loadingEl) loadingEl.style.display = 'none';
        if (emptyEl) {
            emptyEl.style.display = 'block';
            emptyEl.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            `;
        }
    }

    initializeEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('blogSearch');
        const searchClear = document.getElementById('blogSearchClear');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                
                // Show/hide clear button
                if (searchClear) {
                    searchClear.style.display = value ? 'block' : 'none';
                }
                
                // Debounce search
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(() => {
                    this.handleSearch(value);
                }, blogConfig.searchDebounceMs);
            });
        }
        
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.style.display = 'none';
                this.handleSearch('');
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('blogLoadMore');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMorePosts();
            });
        }

        // Infinite scroll (optional - enabled when near bottom)
        this.initializeInfiniteScroll();
    }

    initializeInfiniteScroll() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.checkScrollPosition();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    checkScrollPosition() {
        if (this.isLoading || !this.hasMorePosts || this.isSearchActive) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Trigger when within threshold of bottom
        if (scrollTop + windowHeight >= documentHeight - blogConfig.scrollThreshold) {
            this.loadMorePosts();
        }
    }

    async loadAllPosts(retryCount = 0) {
        const loadingEl = document.getElementById('blogLoading');
        const emptyEl = document.getElementById('blogEmpty');
        const maxRetries = 3;

        try {
            // Show loading
            if (loadingEl) loadingEl.style.display = 'block';
            if (emptyEl) emptyEl.style.display = 'none';

            // Query for all posts (we'll filter published ones)
            const q = window.firebaseFirestore.query(
                window.firebaseFirestore.collection(window.firebaseDB, 'JessBlogs'),
                window.firebaseFirestore.orderBy('createdAt', 'desc')
            );

            const querySnapshot = await window.firebaseFirestore.getDocs(q);
            
            // Filter for published posts only
            this.allPosts = [];
            querySnapshot.forEach((doc) => {
                const post = doc.data();
                if (post.published) {
                    this.allPosts.push({ id: doc.id, ...post });
                }
            });

            // Hide loading
            if (loadingEl) loadingEl.style.display = 'none';

            if (this.allPosts.length === 0) {
                if (emptyEl) emptyEl.style.display = 'block';
                return;
            }

        } catch (error) {
            console.error('Error loading blog posts:', error);
            
            // Check if it's a permission error
            const isPermissionError = error.code === 'permission-denied' || 
                                    error.message?.includes('permission') ||
                                    error.message?.includes('Missing or insufficient permissions');
            
            // Retry for non-permission errors
            if (!isPermissionError && retryCount < maxRetries) {
                console.log(`Retrying blog load (attempt ${retryCount + 1}/${maxRetries})...`);
                setTimeout(() => this.loadAllPosts(retryCount + 1), 1000 * (retryCount + 1));
                return;
            }
            
            if (loadingEl) loadingEl.style.display = 'none';
            
            if (emptyEl) {
                emptyEl.style.display = 'block';
                if (isPermissionError) {
                    emptyEl.innerHTML = `
                        <i class="fas fa-lock"></i>
                        <p>Blog posts are currently being set up. Please check back soon!</p>
                        <p style="font-size: 0.9rem; color: var(--text-medium); margin-top: 1rem;">
                            <strong>Note:</strong> If you're the administrator, please check the Firestore security rules documentation.
                        </p>
                    `;
                } else {
                    emptyEl.innerHTML = `
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Unable to load blog posts at the moment. Please try again later.</p>
                        <p style="font-size: 0.9rem; color: var(--text-medium); margin-top: 1rem;">
                            ${retryCount >= maxRetries ? `Tried ${maxRetries + 1} times. ` : ''}Error: ${error.message || 'Unknown error'}
                        </p>
                    `;
                }
            }
        }
    }

    displayPosts(posts = null) {
        const postsEl = document.getElementById('blogPosts');
        if (!postsEl) return;

        const postsToDisplay = posts || this.allPosts;
        
        // Reset pagination if new search
        if (posts) {
            this.currentPage = 0;
            this.displayedPosts = [];
            postsEl.innerHTML = '';
        }

        // Calculate posts for current page
        const startIndex = this.currentPage * blogConfig.postsPerPage;
        const endIndex = startIndex + blogConfig.postsPerPage;
        const newPosts = postsToDisplay.slice(startIndex, endIndex);

        // Add new posts to displayed posts
        this.displayedPosts.push(...newPosts);

        // Create HTML for new posts
        const newPostsHTML = newPosts.map(post => this.createPostHTML(post)).join('');
        
        if (this.currentPage === 0) {
            postsEl.innerHTML = newPostsHTML;
        } else {
            postsEl.insertAdjacentHTML('beforeend', newPostsHTML);
        }

        // Update pagination state
        this.hasMorePosts = endIndex < postsToDisplay.length;
        this.updateLoadMoreButton();

        // Initialize read more buttons for new posts
        this.initializeReadMoreButtons();

        // Initialize lazy loading for new images
        this.initializeLazyLoading();
    }

    loadMorePosts() {
        if (this.isLoading || !this.hasMorePosts) return;

        this.isLoading = true;
        this.currentPage++;

        // Show loading state
        this.showLoadMoreLoading(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            const postsToDisplay = this.isSearchActive ? this.getSearchResults(this.searchTerm) : this.allPosts;
            this.displayPosts(null); // Use stored posts, just advance page
            
            this.isLoading = false;
            this.showLoadMoreLoading(false);
        }, 300);
    }

    showLoadMoreLoading(show) {
        const loadMoreBtn = document.getElementById('blogLoadMore');
        const loadMoreLoading = document.getElementById('blogLoadMoreLoading');
        
        if (loadMoreBtn) loadMoreBtn.style.display = show ? 'none' : 'inline-flex';
        if (loadMoreLoading) loadMoreLoading.style.display = show ? 'flex' : 'none';
    }

    updateLoadMoreButton() {
        const loadMoreContainer = document.getElementById('blogLoadMoreContainer');
        
        if (loadMoreContainer) {
            loadMoreContainer.style.display = this.hasMorePosts ? 'block' : 'none';
        }
    }

    handleSearch(term) {
        this.searchTerm = term;
        this.isSearchActive = term.length >= blogConfig.searchMinChars;
        
        const searchResults = document.getElementById('blogSearchResults');
        
        if (this.isSearchActive) {
            const results = this.getSearchResults(term);
            this.displaySearchResults(results.length);
            this.displayPosts(results);
        } else {
            // Show all posts when search is cleared
            if (searchResults) searchResults.style.display = 'none';
            this.displayPosts(this.allPosts);
        }
    }

    getSearchResults(term) {
        const lowerTerm = term.toLowerCase();
        
        return this.allPosts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(lowerTerm);
            const bodyMatch = post.body.toLowerCase().includes(lowerTerm);
            return titleMatch || bodyMatch;
        }).slice(0, blogConfig.maxSearchResults);
    }

    displaySearchResults(count) {
        const searchResults = document.getElementById('blogSearchResults');
        const searchCount = searchResults?.querySelector('.search-count');
        
        if (searchResults && searchCount) {
            searchCount.textContent = `Found ${count} post${count !== 1 ? 's' : ''} matching "${this.searchTerm}"`;
            searchResults.style.display = 'block';
        }
    }

    createPostHTML(post) {
        const date = post.createdAt ? this.formatDate(post.createdAt.toDate()) : 'Recent';
        const preview = this.createPreview(post.body, 200);
        const imageHTML = post.image ? 
            `<img src="Images/${post.image}" alt="${this.escapeHtml(post.title)}" class="blog-post-image" loading="lazy" data-src="Images/${post.image}">` : '';

        // Highlight search terms in title and content
        const highlightedTitle = this.highlightSearchTerm(post.title);
        const highlightedPreview = this.highlightSearchTerm(preview.text);

        return `
            <article class="blog-post" data-post-id="${post.id}">
                <div class="blog-post-header">
                    <h3 class="blog-post-title">${highlightedTitle}</h3>
                    <div class="blog-post-date">
                        <i class="fas fa-calendar-alt"></i>
                        ${date}
                    </div>
                </div>
                ${imageHTML}
                <div class="blog-post-content">
                    <div class="blog-preview">${highlightedPreview}</div>
                    ${preview.hasMore ? `
                        <div class="blog-full-content" style="display: none;">
                            ${this.highlightSearchTerm(this.formatContent(post.body))}
                        </div>
                        <a href="#" class="blog-read-more" data-action="expand">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    ` : ''}
                </div>
            </article>
        `;
    }

    highlightSearchTerm(text) {
        if (!this.isSearchActive || !this.searchTerm) return text;
        
        const regex = new RegExp(`(${this.escapeRegex(this.searchTerm)})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    initializeLazyLoading() {
        const images = document.querySelectorAll('.blog-post-image[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: `${blogConfig.lazyLoadOffset}px`
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    createPreview(content, maxLength) {
        const plainText = content.replace(/<[^>]*>/g, '').trim();
        
        if (plainText.length <= maxLength) {
            return {
                text: this.formatContent(content),
                hasMore: false
            };
        }

        const truncated = plainText.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        const preview = lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
        
        return {
            text: this.escapeHtml(preview) + '...',
            hasMore: true
        };
    }

    formatContent(content) {
        // Convert line breaks to paragraphs
        return content.split('\n\n')
            .map(paragraph => `<p>${this.escapeHtml(paragraph.trim())}</p>`)
            .join('');
    }

    formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    initializeReadMoreButtons() {
        const readMoreButtons = document.querySelectorAll('.blog-read-more:not([data-initialized])');
        
        readMoreButtons.forEach(button => {
            button.dataset.initialized = 'true';
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleReadMore(button);
            });
        });
    }

    toggleReadMore(button) {
        const post = button.closest('.blog-post');
        const preview = post.querySelector('.blog-preview');
        const fullContent = post.querySelector('.blog-full-content');
        const isExpanded = button.dataset.action === 'collapse';

        if (isExpanded) {
            // Collapse
            preview.style.display = 'block';
            fullContent.style.display = 'none';
            button.innerHTML = 'Read More <i class="fas fa-arrow-right"></i>';
            button.dataset.action = 'expand';
            
            // Smooth scroll to post title
            post.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Expand
            preview.style.display = 'none';
            fullContent.style.display = 'block';
            button.innerHTML = 'Read Less <i class="fas fa-arrow-up"></i>';
            button.dataset.action = 'collapse';
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Public method to refresh posts (useful after new post is published)
    async refresh() {
        await this.loadAllPosts();
        this.currentPage = 0;
        this.displayedPosts = [];
        this.hasMorePosts = true;
        this.displayPosts();
    }
}

// Initialize public blog viewer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Firebase to be initialized before creating blog viewer
    const initializeBlogViewer = () => {
        if (typeof window.firebaseDB !== 'undefined' && typeof window.firebaseFirestore !== 'undefined') {
            const publicBlogViewer = new PublicBlogViewer();
            window.publicBlogViewer = publicBlogViewer;
        } else {
            // Firebase not ready yet, wait a bit more
            setTimeout(initializeBlogViewer, 100);
        }
    };
    
    // Start the initialization process
    initializeBlogViewer();
});

// ==========================================
// LEGAL DOCUMENT SYSTEM
// ==========================================

/**
 * Legal document management system
 * Displays legal documents in a modal with proper formatting
 */
class LegalDocumentManager {
    constructor() {
        this.cache = new Map();
        this.currentDocument = null;
    }

    async loadDocument(documentName) {
        // Check cache first
        if (this.cache.has(documentName)) {
            return this.cache.get(documentName);
        }

        try {
            const response = await fetch(`legal/${documentName}.md`);
            if (!response.ok) {
                throw new Error(`Failed to load document: ${response.status}`);
            }
            
            const content = await response.text();
            const htmlContent = this.convertMarkdownToHTML(content);
            
            // Cache the document
            this.cache.set(documentName, htmlContent);
            return htmlContent;
        } catch (error) {
            console.error('Error loading legal document:', error);
            return this.getErrorContent(documentName);
        }
    }

    convertMarkdownToHTML(markdown) {
        // Simple markdown to HTML converter for legal documents
        let html = markdown;

        // Convert headers
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');

        // Convert bold text
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert italic text
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert inline code
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');

        // Convert links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

        // Convert line breaks to paragraphs
        const paragraphs = html.split('\n\n').filter(p => p.trim());
        html = paragraphs.map(p => {
            p = p.trim();
            if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol')) {
                return p;
            }
            return `<p>${p}</p>`;
        }).join('\n');

        // Convert unordered lists
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        return html;
    }

    getErrorContent(documentName) {
        return `
            <div style="text-align: center; padding: 2rem; color: var(--text-medium);">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--primary-gold); margin-bottom: 1rem;"></i>
                <h2>Document Unavailable</h2>
                <p>We're sorry, but the ${this.formatDocumentName(documentName)} document is currently unavailable.</p>
                <p>Please try again later or contact us directly for assistance.</p>
                <p><strong>Email:</strong> <a href="mailto:jwalker@bmsmanagement.com" style="color: var(--primary-pink);">jwalker@bmsmanagement.com</a></p>
            </div>
        `;
    }

    formatDocumentName(documentName) {
        return documentName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    getDocumentTitle(documentName) {
        const titles = {
            'privacy-policy': '🔒 Privacy Policy',
            'terms-of-service': '📋 Terms of Service',
            'cookie-policy': '🍪 Cookie Policy',
            'disclaimer': '⚖️ Legal Disclaimer'
        };
        return titles[documentName] || this.formatDocumentName(documentName);
    }
}

// Global legal document manager
const legalDocumentManager = new LegalDocumentManager();

// Global functions for legal document handling
async function showLegalDocument(documentName) {
    const modal = document.getElementById('legalModal');
    const title = document.getElementById('legalDocumentTitle');
    const content = document.getElementById('legalDocumentContent');

    if (!modal || !title || !content) {
        console.error('Legal modal elements not found');
        return;
    }

    // Show modal and loading state
    modal.style.display = 'block';
    title.textContent = legalDocumentManager.getDocumentTitle(documentName);
    content.innerHTML = `
        <div class="legal-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading document...</span>
        </div>
    `;

    // Add body class to prevent scrolling
    document.body.classList.add('modal-open');

    try {
        // Load and display document
        const documentHTML = await legalDocumentManager.loadDocument(documentName);
        content.innerHTML = documentHTML;
        legalDocumentManager.currentDocument = documentName;

        // Smooth scroll to top of content
        content.scrollTop = 0;

        // Track document view (optional analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'legal_document_view', {
                document_name: documentName,
                page_title: legalDocumentManager.getDocumentTitle(documentName)
            });
        }

    } catch (error) {
        console.error('Failed to load legal document:', error);
        content.innerHTML = legalDocumentManager.getErrorContent(documentName);
    }
}

function closeLegalModal() {
    const modal = document.getElementById('legalModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        legalDocumentManager.currentDocument = null;
    }
}

// Close modal when clicking outside content
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('legalModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLegalModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && legalDocumentManager.currentDocument) {
            closeLegalModal();
        }
    });
});

// ==========================================
// CONTACT FORM HANDLING (FORMSPREE)
// ==========================================
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitButton = document.getElementById('submit-button');
        this.messagesDiv = document.getElementById('form-messages');
        this.originalButtonContent = this.submitButton.innerHTML;
        
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        this.setLoadingState(true);
        this.hideMessages();
        
        try {
            const formData = new FormData(this.form);
            
            // Submit to Formspree
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showSuccess();
                this.form.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    this.showError(data.errors.map(error => error.message).join(', '));
                } else {
                    this.showError('There was a problem submitting your form. Please try again.');
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('There was a problem submitting your form. Please check your connection and try again.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitButton.disabled = true;
            this.submitButton.classList.add('loading');
            this.submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner"></i>';
        } else {
            this.submitButton.disabled = false;
            this.submitButton.classList.remove('loading');
            this.submitButton.innerHTML = this.originalButtonContent;
        }
    }
    
    showSuccess() {
        this.messagesDiv.className = 'form-messages success';
        this.messagesDiv.innerHTML = '✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
        this.messagesDiv.style.display = 'block';
        this.scrollToMessages();
    }
    
    showError(message) {
        this.messagesDiv.className = 'form-messages error';
        this.messagesDiv.innerHTML = `❌ ${message}`;
        this.messagesDiv.style.display = 'block';
        this.scrollToMessages();
    }
    
    hideMessages() {
        this.messagesDiv.style.display = 'none';
    }
    
    scrollToMessages() {
        setTimeout(() => {
            this.messagesDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ContactFormManager();
});

// Export legal functions for global access
window.showLegalDocument = showLegalDocument;
window.closeLegalModal = closeLegalModal;