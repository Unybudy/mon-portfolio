document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       0. REDUCED MOTION CHECK
       ========================================================================== */
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;
    reducedMotionQuery.addEventListener('change', (e) => { prefersReducedMotion = e.matches; });

    /* ==========================================================================
       1. PRELOADER ANIMÉ
       ========================================================================== */
    const preloader = document.querySelector('.page-transition');
    const preloaderBar = document.querySelector('.preloader-bar');
    const preloaderCounter = document.querySelector('.preloader-counter');

    let progress = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    function updateCounter(val) {
        if (preloaderCounter) preloaderCounter.textContent = Math.round(val) + '%';
        if (preloaderBar) preloaderBar.style.width = val + '%';
    }

    function animatePreloader(now) {
        const elapsed = now - startTime;
        progress = Math.min((elapsed / duration) * 100, 100);

        // Easing : ease-in-out
        const eased = progress < 50
            ? 2 * (progress / 100) * (progress / 100) * 100
            : (1 - Math.pow(-2 * (progress / 100) + 2, 2) / 2) * 100;

        updateCounter(Math.min(eased, 100));

        if (progress < 100) {
            requestAnimationFrame(animatePreloader);
        } else {
            updateCounter(100);
            // Séquence de sortie
            setTimeout(hidePreloader, 200);
        }
    }

    function hidePreloader() {
        if (!preloader) return;

        if (prefersReducedMotion) {
            preloader.style.display = 'none';
            initAll();
            return;
        }

        gsap.to(preloader, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.1,
            ease: 'power4.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                initAll();
            }
        });
    }

    if (preloader) {
        requestAnimationFrame(animatePreloader);
    } else {
        initAll();
    }

    /* ==========================================================================
       2. INITIALISATION PRINCIPALE (après preloader)
       ========================================================================== */
    function initAll() {

        // ── Lenis Smooth Scroll ──────────────────────────────────────────────
        let lenis = null;
        if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.5,
            });

            // Intégration Lenis + GSAP ScrollTrigger
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
        }

        // ── GSAP Plugins ─────────────────────────────────────────────────────
        gsap.registerPlugin(ScrollTrigger);

        /* ======================================================================
           3. HERO ANIMATIONS — SPLIT TEXT MANUEL
           ====================================================================== */
        if (!prefersReducedMotion) {

            const hugeTitle = document.querySelector('.huge-title');
            if (hugeTitle) {
                // Split le texte en caractères manuellement
                const html = hugeTitle.innerHTML;
                // Garde les <br> et le span outlined-year intact
                const lines = hugeTitle.childNodes;
                let newHTML = '';

                lines.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        const text = node.textContent;
                        newHTML += [...text].map(char =>
                            char === ' ' ? ' ' : `<span class="char">${char}</span>`
                        ).join('');
                    } else if (node.nodeName === 'BR') {
                        newHTML += '<br>';
                    } else {
                        // Garde le span outlined-year
                        newHTML += node.outerHTML;
                    }
                });

                hugeTitle.innerHTML = newHTML;

                const chars = hugeTitle.querySelectorAll('.char');
                gsap.to(chars, {
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    duration: 1.0,
                    ease: 'power4.out',
                    stagger: {
                        amount: 0.5,
                        from: 'start'
                    },
                    delay: 0.1
                });

                // Année outlined
                const outlinedYear = hugeTitle.querySelector('.outlined-year');
                if (outlinedYear) {
                    setTimeout(() => {
                        outlinedYear.classList.add('is-visible');
                    }, 700);
                }
            }

            // Nav reveal
            gsap.from('.top-nav', {
                y: -40,
                opacity: 0,
                duration: 1.0,
                ease: 'power3.out',
                delay: 0.5
            });

            // Hero intro : clip-path reveal
            const heroIntro = document.querySelector('.hero-intro');
            if (heroIntro) {
                gsap.fromTo(heroIntro,
                    { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
                    { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.8 }
                );
            }

            // Scroll indicator
            gsap.from('.scroll-indicator', {
                y: 15,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 1.2
            });
        }

        /* ======================================================================
           4. SCROLL REVEAL — CLIP-PATH LIGNE PAR LIGNE
           ====================================================================== */
        if (!prefersReducedMotion) {

            // Reveal des titres de section (reveal-left → clip reveal)
            gsap.utils.toArray('.reveal-left').forEach(el => {
                gsap.fromTo(el,
                    { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Ligne décorative sections projets
            gsap.utils.toArray('.project-detail').forEach(section => {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 75%',
                    onEnter: () => section.classList.add('line-visible'),
                    once: true
                });
            });

            // Reveal sections détail : translateY + fade
            gsap.utils.toArray('.project-detail').forEach((section, i) => {
                const header = section.querySelector('.detail-header');
                const text = section.querySelector('.detail-text');
                const image = section.querySelector('.detail-image, .detail-image--stretch');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 78%',
                        toggleActions: 'play none none none'
                    }
                });

                if (header) {
                    tl.fromTo(header,
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
                    );
                }
                if (text) {
                    tl.fromTo(text,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                        '-=0.5'
                    );
                }
                if (image) {
                    tl.fromTo(image,
                        { y: 50, opacity: 0, scale: 0.97 },
                        { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
                        '-=0.5'
                    );
                }
            });

            // Stagger badges compétences
            ScrollTrigger.create({
                trigger: '.skills-container',
                start: 'top 85%',
                onEnter: () => {
                    gsap.from('.skill-badge', {
                        opacity: 0,
                        scale: 0.7,
                        y: 20,
                        rotate: -4,
                        duration: 0.5,
                        stagger: {
                            amount: 0.5,
                            from: 'center'
                        },
                        ease: 'back.out(1.7)'
                    });
                },
                once: true
            });

            // Stagger resume items
            gsap.utils.toArray('.resume-col').forEach(col => {
                const items = col.querySelectorAll('.resume-item');
                if (items.length) {
                    gsap.from(items, {
                        opacity: 0,
                        y: 35,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: col,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    });
                }
            });

            // Stagger contact rows
            ScrollTrigger.create({
                trigger: '.contact-list',
                start: 'top 85%',
                onEnter: () => {
                    gsap.from('.contact-row', {
                        opacity: 0,
                        x: -25,
                        duration: 0.6,
                        stagger: 0.12,
                        ease: 'power3.out'
                    });
                },
                once: true
            });

            // Footer reveal
            const footerTitle = document.querySelector('.footer h2');
            if (footerTitle) {
                gsap.fromTo(footerTitle,
                    { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
                    {
                        y: 0,
                        opacity: 1,
                        clipPath: 'inset(0 0 0% 0)',
                        duration: 1.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: '.footer',
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            // Footer links stagger
            gsap.from('.footer-link', {
                opacity: 0,
                y: 20,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.footer-links',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            // Canvas : fade au scroll hors hero
            const canvas = document.getElementById('gridCanvas');
            if (canvas) {
                ScrollTrigger.create({
                    trigger: '.resume-section',
                    start: 'top 60%',
                    onEnter: () => canvas.classList.add('canvas-faded'),
                    onLeaveBack: () => canvas.classList.remove('canvas-faded')
                });
            }
        }

        /* ======================================================================
           5. SCROLL HORIZONTAL BENTO — GSAP (inchangé, amélioré)
           ====================================================================== */
        const container = document.querySelector('.projects-container');
        const wrapper = document.querySelector('.projects-wrapper');

        if (container && wrapper) {
            let mm = gsap.matchMedia();
            mm.add('(min-width: 769px)', () => {
                if (prefersReducedMotion) return;

                function getScrollAmount() {
                    return -(container.scrollWidth - window.innerWidth);
                }

                const tween = gsap.to(container, {
                    x: getScrollAmount,
                    ease: 'none',
                });

                ScrollTrigger.create({
                    trigger: '.projects-wrapper',
                    start: 'top top',
                    end: () => `+=${container.scrollWidth - window.innerWidth}`,
                    pin: true,
                    animation: tween,
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                });
            });
        }

        /* ======================================================================
           6. PARALLAX IMAGES SECTIONS
           ====================================================================== */
        if (!prefersReducedMotion) {
            gsap.utils.toArray('.detail-image').forEach(container => {
                const items = container.querySelectorAll('.grid-item, .gallery-item');
                if (items.length === 0) return;

                gsap.to(items, {
                    y: -30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5
                    }
                });
            });
        }

        /* ======================================================================
           7. PROJECT CARDS — TILT 3D + SHINE AU HOVER
           ====================================================================== */
        const isTouchDevice = window.matchMedia('(hover: none)').matches;

        if (!isTouchDevice && !prefersReducedMotion) {
            document.querySelectorAll('.project-card').forEach(card => {

                // Ajoute l'élément shine
                const shine = document.createElement('div');
                shine.className = 'card-shine';
                card.style.position = 'relative';
                card.appendChild(shine);

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const cx = rect.width / 2;
                    const cy = rect.height / 2;
                    const rotateX = ((y - cy) / cy) * -6;
                    const rotateY = ((x - cx) / cx) * 6;

                    gsap.to(card, {
                        rotateX,
                        rotateY,
                        transformPerspective: 800,
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    // Shine position
                    const shineX = (x / rect.width) * 100;
                    const shineY = (y / rect.height) * 100;
                    shine.style.setProperty('--shine-x', `${shineX}%`);
                    shine.style.setProperty('--shine-y', `${shineY}%`);
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.6,
                        ease: 'power3.out'
                    });
                });
            });

            // Cursor "VOIR" sur les cards
            const cursor = document.querySelector('.custom-cursor');
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    cursor?.classList.add('is-hovering-card');
                    cursor?.classList.remove('hover');
                });
                card.addEventListener('mouseleave', () => {
                    cursor?.classList.remove('is-hovering-card');
                });
            });
        }

        /* ======================================================================
           8. EFFET MAGNÉTIQUE — Footer links & contact rows
           ====================================================================== */
        if (!isTouchDevice && !prefersReducedMotion) {
            document.querySelectorAll('.footer-link, .contact-row').forEach(el => {
                el.classList.add('magnetic');

                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    gsap.to(el, {
                        x: x * 0.25,
                        y: y * 0.25,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                });

                el.addEventListener('mouseleave', () => {
                    gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.4)'
                    });
                });
            });
        }

        /* ======================================================================
           9. NAV — HIDE ON SCROLL DOWN, SHOW ON SCROLL UP
           ====================================================================== */
        const nav = document.querySelector('.top-nav');
        let lastScrollY = 0;
        let navTicking = false;

        window.addEventListener('scroll', () => {
            if (!navTicking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    if (currentScrollY > 100) {
                        nav?.classList.add('nav-scrolled');
                    } else {
                        nav?.classList.remove('nav-scrolled');
                    }

                    if (currentScrollY > lastScrollY && currentScrollY > 200) {
                        nav?.classList.add('nav-hidden');
                    } else {
                        nav?.classList.remove('nav-hidden');
                    }

                    lastScrollY = currentScrollY;
                    navTicking = false;
                });
                navTicking = true;
            }
        });

        /* ======================================================================
           10. CUSTOM CURSOR
           ====================================================================== */
        const cursor = document.querySelector('.custom-cursor');
        if (cursor && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches && !isTouchDevice) {
            document.body.classList.add('custom-cursor-active');

            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            let cursorRafId = null;

            const animateCursor = () => {
                const dx = mouseX - cursorX;
                const dy = mouseY - cursorY;
                cursorX += dx * 0.18;
                cursorY += dy * 0.18;
                cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
                if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                    cursorRafId = requestAnimationFrame(animateCursor);
                } else {
                    cursorRafId = null;
                }
            };

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                if (!cursorRafId) cursorRafId = requestAnimationFrame(animateCursor);
            });

            const interactiveEls = document.querySelectorAll('a, button, .grid-item, .gallery-item, .icon-box, .skill-badge');
            interactiveEls.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    if (!cursor.classList.contains('is-hovering-card')) {
                        cursor.classList.add('hover');
                    }
                });
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        }

        /* ======================================================================
           11. CANVAS — GRILLE LIQUIDE
           ====================================================================== */
        const canvas = document.getElementById('gridCanvas');
        if (canvas && !prefersReducedMotion) {
            const ctx = canvas.getContext('2d');
            let width, height, time = 0;
            let animationId = null;
            let isPageVisible = true;
            const gridSize = 50;
            const waveSpeed = 0.004;
            const waveAmp = 40;

            let resizeTimeout;
            function resize() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    width = canvas.width = window.innerWidth;
                    height = canvas.height = window.innerHeight;
                }, 50);
            }
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            window.addEventListener('resize', resize);
            screen.orientation?.addEventListener('change', () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            });

            function getWaveOffset(x, y, time) {
                return Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time) * waveAmp;
            }

            function animateGrid() {
                if (!isPageVisible) { animationId = null; return; }
                ctx.clearRect(0, 0, width, height);
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.lineWidth = 1;
                time += waveSpeed;
                ctx.beginPath();
                for (let x = 0; x <= width; x += gridSize) {
                    ctx.moveTo(x + getWaveOffset(x, 0, time), 0);
                    for (let y = 0; y <= height; y += 20) {
                        ctx.lineTo(x + getWaveOffset(x, y, time), y);
                    }
                }
                for (let y = 0; y <= height; y += gridSize) {
                    ctx.moveTo(0, y + getWaveOffset(0, y, time));
                    for (let x = 0; x <= width; x += 20) {
                        ctx.lineTo(x, y + getWaveOffset(x, y, time));
                    }
                }
                ctx.stroke();
                animationId = requestAnimationFrame(animateGrid);
            }

            document.addEventListener('visibilitychange', () => {
                isPageVisible = !document.hidden;
                if (isPageVisible && !animationId) animateGrid();
            });
            animateGrid();
        } else if (canvas) {
            canvas.style.display = 'none';
        }

        /* ======================================================================
           12. BARRE DE PROGRESSION SCROLL
           ====================================================================== */
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar && !prefersReducedMotion) {
            let progressTicking = false;
            window.addEventListener('scroll', () => {
                if (!progressTicking) {
                    requestAnimationFrame(() => {
                        const scrollTop = window.scrollY;
                        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                        progressBar.style.width = progress + '%';
                        progressTicking = false;
                    });
                    progressTicking = true;
                }
            });
        }

        /* ======================================================================
           13. BOUTON BACK TO TOP
           ====================================================================== */
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            let backTicking = false;
            window.addEventListener('scroll', () => {
                if (!backTicking) {
                    requestAnimationFrame(() => {
                        backToTopBtn.classList.toggle('visible', window.scrollY > 500);
                        backTicking = false;
                    });
                    backTicking = true;
                }
            });
            backToTopBtn.addEventListener('click', () => {
                if (lenis) {
                    lenis.scrollTo(0, { duration: 1.5 });
                } else {
                    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
                }
            });
        }

        /* ======================================================================
           14. LIGHTBOX / MODAL
           ====================================================================== */
        const navLinks = document.querySelector('.nav-links');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('fullImage');
        const closeModalBtn = document.querySelector('.close-modal');
        const gridItems = document.querySelectorAll('.grid-item, .gallery-item');

        if (modal && modalImg) {
            const openModal = (item) => {
                const bg = window.getComputedStyle(item).backgroundImage;
                if (bg && bg !== 'none') {
                    const url = bg.match(/url\(["']?([^"']+)["']?\)/);
                    if (url && url[1]) {
                        modal.style.display = 'flex';
                        modal.style.alignItems = 'center';
                        modal.style.justifyContent = 'center';
                        modalImg.src = url[1];
                        modalImg.alt = item.getAttribute('aria-label') || 'Image en plein écran';
                        document.body.style.overflow = 'hidden';
                        if (lenis) lenis.stop();
                        if (closeModalBtn) closeModalBtn.focus();
                    }
                }
            };

            gridItems.forEach(item => {
                item.addEventListener('click', () => openModal(item));
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(item); }
                });
            });

            const hideModal = () => {
                modal.style.display = 'none';
                if (!navLinks?.classList.contains('menu-open')) {
                    document.body.style.overflow = '';
                    if (lenis) lenis.start();
                }
            };

            if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target === closeModalBtn) hideModal();
            });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal(); });
        }

        /* ======================================================================
           15. MENU MOBILE
           ====================================================================== */
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (mobileBtn && navLinks) {
            mobileBtn.addEventListener('click', () => {
                const isOpen = navLinks.classList.toggle('menu-open');
                mobileBtn.setAttribute('aria-expanded', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
                if (lenis) isOpen ? lenis.stop() : lenis.start();
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('menu-open');
                    mobileBtn.setAttribute('aria-expanded', false);
                    document.body.style.overflow = '';
                    if (lenis) lenis.start();
                });
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && navLinks.classList.contains('menu-open')) {
                    navLinks.classList.remove('menu-open');
                    mobileBtn.setAttribute('aria-expanded', false);
                    document.body.style.overflow = '';
                    if (lenis) lenis.start();
                }
            });
        }

    } // fin initAll()

}); // fin DOMContentLoaded
