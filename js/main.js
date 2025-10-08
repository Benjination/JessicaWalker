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

        // Image upload functionality
        this.initializeImageUpload();

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
        } else if (tabName === 'upload') {
            this.resetUploadArea();
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
        } catch (error) {
            console.error('Error deleting post:', error);
            showNotification('Error deleting post. Please try again.', 'error');
        }
    }

    async loadAvailableImages() {
        try {
            // Get list of images from the Images folder
            // Since we can't directly access the file system, we'll maintain a list
            this.availableImages = [
                'Butterfly1.png', 'Butterfly2.png', 'Butterfly3.png', 'Butterfly4.png',
                'Girly1.png', 'Girly2.png', 'Girly3.png',
                'Jessica1.png', 'Jessica2.png', 'Jessica3.png', 'Jessica4.png', 'Jessica5.png'
            ];

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

        // Add available images
        this.availableImages.forEach(image => {
            const option = document.createElement('option');
            option.value = image;
            option.textContent = image;
            imageSelect.appendChild(option);
        });
    }

    initializeImageUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('imageUpload');
        const previewSection = document.getElementById('uploadPreview');
        const previewImage = document.getElementById('previewImage');
        const fileNameInput = document.getElementById('imageFileName');
        const confirmBtn = document.getElementById('confirmUpload');
        const cancelBtn = document.getElementById('cancelUpload');

        if (!uploadArea || !fileInput) return;

        // Click to browse
        uploadArea.addEventListener('click', () => fileInput.click());

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-pink)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--primary-gold)';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-gold)';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleImageFile(files[0]);
            }
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleImageFile(e.target.files[0]);
            }
        });

        // Confirm upload
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => this.saveImageFile());
        }

        // Cancel upload
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.resetUploadArea());
        }
    }

    handleImageFile(file) {
        if (!file.type.startsWith('image/')) {
            showNotification('Please select an image file.', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showNotification('Image file is too large. Please choose a file under 5MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const previewImage = document.getElementById('previewImage');
            const previewSection = document.getElementById('uploadPreview');
            const uploadArea = document.getElementById('uploadArea');
            const fileNameInput = document.getElementById('imageFileName');

            if (previewImage && previewSection && uploadArea && fileNameInput) {
                previewImage.src = e.target.result;
                uploadArea.style.display = 'none';
                previewSection.style.display = 'block';
                
                // Suggest filename (without extension)
                const baseName = file.name.replace(/\.[^/.]+$/, "");
                fileNameInput.value = baseName;
                
                this.currentImageFile = file;
                this.currentImageData = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }

    async saveImageFile() {
        const fileNameInput = document.getElementById('imageFileName');
        if (!fileNameInput || !this.currentImageFile) return;

        const fileName = fileNameInput.value.trim();
        if (!fileName) {
            showNotification('Please enter a filename.', 'error');
            return;
        }

        // Get file extension
        const extension = this.currentImageFile.name.split('.').pop().toLowerCase();
        const fullFileName = `${fileName}.${extension}`;

        try {
            // Create download link (since we can't directly save to file system)
            const link = document.createElement('a');
            link.href = this.currentImageData;
            link.download = fullFileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Add to available images list
            if (!this.availableImages.includes(fullFileName)) {
                this.availableImages.push(fullFileName);
                this.updateImageSelect();
            }

            showNotification(`Image saved as ${fullFileName}. Please manually move it to the Images folder.`, 'success');
            this.resetUploadArea();
        } catch (error) {
            console.error('Error saving image:', error);
            showNotification('Error saving image. Please try again.', 'error');
        }
    }

    resetUploadArea() {
        const uploadArea = document.getElementById('uploadArea');
        const previewSection = document.getElementById('uploadPreview');
        const fileInput = document.getElementById('imageUpload');
        const fileNameInput = document.getElementById('imageFileName');

        if (uploadArea) uploadArea.style.display = 'block';
        if (previewSection) previewSection.style.display = 'none';
        if (fileInput) fileInput.value = '';
        if (fileNameInput) fileNameInput.value = '';
        
        this.currentImageFile = null;
        this.currentImageData = null;
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