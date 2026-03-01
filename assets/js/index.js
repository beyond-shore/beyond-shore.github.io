function initIcons() {
    lucide.createIcons();
}

function initRevealAnimation() {
    const revealElements = document.querySelectorAll('.reveal-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => observer.observe(element));
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.setAttribute('data-lucide', 'menu');
        } else {
            menuIcon.setAttribute('data-lucide', 'x');
        }

        initIcons();
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.setAttribute('data-lucide', 'menu');
            initIcons();
        });
    });
}

function initNavbarShadow() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });
}

function setActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('[data-nav-target]');

    navLinks.forEach((link) => {
        const isActive = link.dataset.navTarget === sectionId;

        if (link.classList.contains('nav-link-mobile')) {
            link.classList.toggle('nav-link-mobile-active', isActive);
        } else {
            link.classList.toggle('nav-link-active', isActive);
        }
    });
}

function initSectionSpy() {
    const navbar = document.getElementById('navbar');
    const sections = Array.from(document.querySelectorAll('main section[id]'));

    const updateActiveSection = () => {
        const offsetTop = window.scrollY + navbar.offsetHeight + 140;
        let currentSectionId = sections[0]?.id;

        sections.forEach((section) => {
            if (offsetTop >= section.offsetTop) {
                currentSectionId = section.id;
            }
        });

        if (currentSectionId) {
            setActiveNavLink(currentSectionId);
        }
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);
}

function initPage() {
    initIcons();
    initRevealAnimation();
    initMobileMenu();
    initNavbarShadow();
    initSectionSpy();
}

initPage();
