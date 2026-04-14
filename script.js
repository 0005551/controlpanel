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

    document.querySelectorAll('.overview-card, .action-task, .habit-card-large, .money-panel, .settings-panel').forEach(card => {
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

// ===== EXPORT FUNCTIONS =====
window.animateCounter = animateCounter;
