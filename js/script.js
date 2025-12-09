// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.toggle('hidden');
        // Prevent scroll when menu is open
        if (!mobileMenu.classList.contains('hidden')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// Close mobile menu when a link is clicked
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Fade in elements on scroll
const fadeInElements = document.querySelectorAll('[data-fade-in]');
if (fadeInElements.length > 0 && 'IntersectionObserver' in window) {
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
                entry.target.classList.remove('opacity-0');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(el => {
        el.classList.add('opacity-0');
        fadeInObserver.observe(el);
    });
}

// Window resize handler for responsive adjustments
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 250);
});

// Smooth page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.5';
});

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Utility function to format currency
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// Utility function to format phone number
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,10})(\d{0,10})$/);
    if (!match) return phone;
    
    const [, part1, part2] = match;
    if (!part2) return part1;
    return part1 + ' ' + part2;
}

// Form validation utility
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    return cleaned.length >= 10;
}

// Add active class to current navigation link
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.pathname === currentLocation) {
            link.classList.add('text-blue-600');
        }
    });
});

// Scroll to top button functionality - Disabled on mobile

// Search functionality (if search is implemented)
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('[data-searchable]');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

setupSearch();

// Rating functionality
function setupRating() {
    const starInputs = document.querySelectorAll('input[name="rating"]');
    const starLabels = document.querySelectorAll('label[for^="star"]');
    
    if (starLabels.length === 0) return;

    starLabels.forEach((label, index) => {
        label.addEventListener('mouseover', function() {
            starLabels.forEach((l, i) => {
                if (i <= index) {
                    l.classList.add('text-yellow-400');
                } else {
                    l.classList.remove('text-yellow-400');
                }
            });
        });
    });

    document.addEventListener('mouseout', function() {
        const checked = document.querySelector('input[name="rating"]:checked');
        starLabels.forEach(l => {
            if (checked) {
                const checkedIndex = Array.from(starInputs).indexOf(checked);
                const labelIndex = Array.from(starLabels).indexOf(l);
                if (labelIndex <= checkedIndex) {
                    l.classList.add('text-yellow-400');
                } else {
                    l.classList.remove('text-yellow-400');
                }
            }
        });
    });
}

setupRating();

// Add loading state to forms
function addFormLoadingState(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function() {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
        }
    });
}

// Initialize all forms
document.querySelectorAll('form').forEach(form => {
    addFormLoadingState(form.id);
});

// Tooltip functionality
function setupTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
            this.appendChild(tooltip);

            setTimeout(() => tooltip.remove(), 3000);
        });
    });
}

setupTooltips();

// Add animation to elements on page load
function animateOnLoad() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fade-in-up');
        }, index * 100);
    });
}

window.addEventListener('load', animateOnLoad);

// Track page analytics (basic)
function trackPageView(pageName) {
    console.log('Page view:', pageName);
    // Can be connected to Google Analytics or other tracking service
}

// Initialize tracking on page load
window.addEventListener('load', function() {
    const pageName = document.title;
    trackPageView(pageName);
});

// Performance monitoring
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    }
});

// Geolocation (if needed for location-based features)
function initializeGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('User location:', position.coords);
            // Can be used for location-based services
        });
    }
}

// Call geolocation on user action
document.addEventListener('click', function() {
    // Only call once
    if (!window.geoInitialized) {
        initializeGeolocation();
        window.geoInitialized = true;
    }
}, { once: true });

// Prevent console errors in production
window.addEventListener('error', function(e) {
    if (e.message === 'Script error.') {
        console.log('Script error caught');
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search (if search exists)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[role="dialog"]:not(.hidden)');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
    }
});

// Print friendly styles
if (window.matchMedia) {
    window.matchMedia('print').addListener(function(e) {
        if (e.matches) {
            console.log('Printing page...');
            // Hide navigation and footer for print
            document.querySelectorAll('nav, footer').forEach(el => {
                el.style.display = 'none';
            });
        }
    });
}

// Mobile Responsive Enhancements

// Detect device type
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

// Prevent accidental double-tap zoom
document.addEventListener('touchend', function(e) {
    if (e.touches.length < 2 && e.changedTouches) {
        if (Date.now() - lastTouchTime < 300) {
            e.preventDefault();
        }
        lastTouchTime = Date.now();
    }
}, false);

let lastTouchTime = 0;

// Handle viewport orientation changes
window.addEventListener('orientationchange', function() {
    console.log('Orientation changed to:', window.orientation);
    // Refresh layout if needed
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
});

// Improve touch feedback for buttons
const buttons = document.querySelectorAll('button, a[href], .cursor-pointer');
buttons.forEach(btn => {
    btn.addEventListener('touchstart', function() {
        this.style.opacity = '0.8';
    });
    
    btn.addEventListener('touchend', function() {
        this.style.opacity = '1';
    });
});

// Disable pinch zoom on mobile if needed (optional)
document.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./js/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}

// Cookie consent (if needed)
function showCookieConsent() {
    const consentKey = 'cookie-consent-accepted';
    if (!localStorage.getItem(consentKey)) {
        console.log('Cookie consent would be shown here');
    }
}

showCookieConsent();

// Responsive menu close on resize
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth > 768 && mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
});

// Mobile performance optimization - Defer non-critical content loading
window.addEventListener('load', function() {
    // Load analytics or other non-critical scripts
    if (navigator.connection && navigator.connection.saveData) {
        console.log('User has requested data saver mode');
    }
});

// Export utilities for use in other scripts
window.AppUtils = {
    formatCurrency,
    formatPhoneNumber,
    validateEmail,
    validatePhone,
    isMobile,
    isTablet
};

console.log('Karde Beach website script loaded successfully');

