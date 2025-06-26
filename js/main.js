// Navigation drawer functions
function toggleMenu() {
    document.getElementById('drawer').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function closeMenu() {
    document.getElementById('drawer').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

// Modal functions with animation
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    modal.style.animation = 'none';
    modal.offsetHeight;
    modal.style.animation = null;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'none';
    modalContent.offsetHeight;
    modalContent.style.animation = null;
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');

    modal.classList.add('hide');
    modalContent.classList.add('hide');

    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('hide');
        modalContent.classList.remove('hide');
    }, 400);
}

// Function to set up event listeners after components are loaded
function setupEventListeners() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    // Auth buttons event listeners
    const signInButton = document.querySelector('.auth-button.signin');
    if (signInButton) {
        signInButton.addEventListener('click', function() {
            openModal('signInModal');
        });
    }

    const signUpButton = document.querySelector('.auth-button.signup');
    if (signUpButton) {
        signUpButton.addEventListener('click', function() {
            openModal('signUpModal');
        });
    }

    // Form submission handlers
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Sign In functionality will be implemented here');
            closeModal('signInModal');
        });
    }

    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Sign Up functionality will be implemented here');
            closeModal('signUpModal');
        });
    }
}

// Dark Mode Toggle with Logo Animation
function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const headerLogo = document.getElementById('headerLogo');
    const mainLogo = document.getElementById('mainLogo');

    if (!darkModeToggle) return;

    // Function to set the correct logo based on theme
    function setLogoTheme(isDarkMode) {
        if (headerLogo) {
            headerLogo.src = isDarkMode ? "/img/logo-white.jpg" : "/img/logo-dark.jpg";
            headerLogo.onload = () => headerLogo.style.opacity = '1';
        }
        
        if (mainLogo) {
            mainLogo.src = isDarkMode ? "/img/logo-white.jpg" : "/img/logo-dark.jpg";
            mainLogo.onload = () => mainLogo.style.opacity = '1';
        }
    }

    // Initialize theme
    function initializeTheme() {
        const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
        
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.textContent = '☀️';
            setLogoTheme(true);
        } else {
            setLogoTheme(false);
        }
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes logoPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            @keyframes darkModePulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            .logo-large img.animate {
                animation: logoPulse 0.5s ease-in-out;
            }
            .dark-mode-toggle.animate {
                animation: darkModePulse 0.5s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    // Toggle dark mode with animations
    darkModeToggle.addEventListener('click', function() {
        // Apply animations
        this.classList.add('animate');
        if (mainLogo) mainLogo.classList.add('animate');
        
        // Remove animation classes after they complete
        setTimeout(() => {
            this.classList.remove('animate');
            if (mainLogo) mainLogo.classList.remove('animate');
        }, 500);
        
        // Toggle dark mode
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
            setLogoTheme(true);
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
            setLogoTheme(false);
        }
    });

    // Initialize theme
    initializeTheme();
    
    // Set initial logo visibility
    const currentTheme = localStorage.getItem('theme') || 
                       (prefersDarkScheme.matches ? 'dark' : 'light');
    if (currentTheme === 'dark') {
        setLogoTheme(true);
    } else {
        setLogoTheme(false);
    }
    
    // If logos are already loaded (from cache)
    if (headerLogo && headerLogo.complete) headerLogo.style.opacity = '1';
    if (mainLogo && mainLogo.complete) mainLogo.style.opacity = '1';
}

// Function to animate elements in sequence
function animatePageLoad() {
    const elementsToAnimate = [
        { selector: '#headerLogo', animation: 'fadeIn 0.5s ease-out forwards' },
        { selector: '.auth-buttons', animation: 'fadeIn 0.5s ease-out forwards', delay: 300 },
        { selector: '.logo-large', animation: 'fadeIn 0.5s ease-out forwards', delay: 600 },
        { selector: '.welcome-heading', animation: 'fadeIn 0.5s ease-out forwards', delay: 900 },
        { selector: '.social-icons', animation: 'fadeIn 0.5s ease-out forwards', delay: 1200 },
        { selector: '.footer', animation: 'fadeIn 0.5s ease-out forwards', delay: 1500 }
    ];

    // Hide all elements initially
    elementsToAnimate.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.style.opacity = '0';
        }
    });

    // Animate each element with delay
    elementsToAnimate.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            setTimeout(() => {
                element.style.animation = item.animation;
                element.style.opacity = '1';
            }, item.delay || 0);
        }
    });
}

// Add animation styles to head
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Set up all functionality once components are loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a short time to ensure components are loaded
    setTimeout(() => {
        setupEventListeners();
        setupDarkMode();
        addAnimationStyles();
        animatePageLoad();
    }, 300);
});