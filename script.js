// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeClock();
    initializeSidebarToggle();
    initializeScrollAnimations();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const sectionName = link.dataset.section;

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active');
            });

            const activeSection = document.querySelector(`.page-section[data-section="${sectionName}"]`);
            if (activeSection) {
                activeSection.classList.add('active');
            }

            const titles = {
                dashboard: { title: 'Dashboard', subtitle: 'Welcome to your command center' },
                actions: { title: 'Actions', subtitle: 'Command center for your tasks' },
                habits: { title: 'Habits', subtitle: 'Track and build positive routines' },
                money: { title: 'Money', subtitle: 'Financial overview and management' },
                settings: { title: 'Settings', subtitle: 'System configuration and preferences' }
            };

            if (titles[sectionName]) {
                pageTitle.textContent = titles[sectionName].title;
                pageSubtitle.textContent = titles[sectionName].subtitle;
            }

            const sidebar = document.querySelector('.sidebar');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
}

// ===== LIVE CLOCK =====
function initializeClock() {
    function updateClock() {
        const now = new Date();
        const timeElement = document.getElementById('liveTime');
        const dateElement = document.getElementById('liveDate');

        if (timeElement) {
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}`;
        }

        if (dateElement) {
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            const dateString = now.toLocaleDateString('en-US', options);
            dateElement.textContent = dateString;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
}

// ===== SIDEBAR TOGGLE =====
function initializeSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickOnToggle = toggleBtn && toggleBtn.contains(e.target);

            if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all section cards
    document.querySelectorAll('.section-card').forEach(card => {
        observer.observe(card);
    });
}

// ===== ANIMATED COUNTERS =====
function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== PROGRESS RING ANIMATION =====
window.addEventListener('load', () => {
    // Add SVG gradient
    const svg = document.querySelector('.progress-ring svg');
    if (svg && !document.querySelector('defs')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#d0d0d0');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#a0a0a0');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);
    }

    // Animate counters on load
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, target);
    });
});

// ===== RESPONSIVE HANDLING =====
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
        }
    });
});

// ===== HOVER EFFECTS =====
document.querySelectorAll('.action-btn, .section-card').forEach(element => {
    element.addEventListener('mouseenter', function () {
        if (window.innerWidth > 768) {
            this.style.willChange = 'transform, box-shadow';
        }
    });

    element.addEventListener('mouseleave', function () {
        this.style.willChange = 'auto';
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    }
});

// ===== THEME PREFERENCES =====
function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-theme');
    }
}

initializeTheme();

// ===== PERFORMANCE OPTIMIZATION =====
let ticking = false;
document.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations can be added here
            ticking = false;
        });
        ticking = true;
    }
});

// ===== EXPORT FUNCTIONS =====
window.animateCounter = animateCounter;
