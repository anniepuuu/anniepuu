document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll-Animation für Bubbles (Intersection Observer)
    const observerOptions = {
        threshold: 0.15 // Element muss 15% sichtbar sein
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));


    // 2. Navigation Active State beim Scrollen aktualisieren + Blur/Fade Effekt
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        let activeSectionElement = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -150px Offset für die Navbar oben
            if (pageYOffset >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
                activeSectionElement = section;
            }
        });

        // Navigation aktualisieren
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(currentSection)) {
                item.classList.add('active');
            }
        });

        // Blur/Fade Effekt: Aktive Section hervorheben, Rest verblassen
        sections.forEach(section => {
            if (section === activeSectionElement) {
                section.classList.add('section-active');
                section.classList.remove('section-inactive');
            } else {
                section.classList.add('section-inactive');
                section.classList.remove('section-active');
            }
        });
    });

    // 3. Parallax-Effekt für Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const parallaxOffset = scrollY * 0.3;
        header.style.transform = `translateY(${parallaxOffset}px)`;
    });

});