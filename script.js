document.addEventListener("DOMContentLoaded", (event) => {

    // Vérifier si l'utilisateur préfère les mouvements réduits (mis à jour dynamiquement)
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;
    reducedMotionQuery.addEventListener('change', (e) => { prefersReducedMotion = e.matches; });

    // Enregistrement des plugins GSAP (Indispensable)
    gsap.registerPlugin(ScrollTrigger);

    /* ==========================================================================
       2. ANIMATIONS D'ENTRÉE (HERO)
       ========================================================================== */
    if (!prefersReducedMotion) {
        const tlHero = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Page Transition first
        tlHero.to(".page-transition", { scaleY: 0, duration: 1.2, ease: "power4.inOut" })
              .from(".huge-title", { y: 120, opacity: 0, duration: 1.4, delay: -0.2 })
            .from(".top-nav", { y: -30, opacity: 0, duration: 0.8 }, "-=1")
            .from(".hero-intro", { y: 40, opacity: 0, duration: 1 }, "-=0.7")
            .from(".scroll-indicator", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5");

        /* ======================================================================
           2b. SCROLL REVEAL — Sections qui apparaissent au scroll
           ====================================================================== */

        // Reveal vertical (fade-in-up) pour les sections de projet
        gsap.utils.toArray(".reveal-element").forEach(el => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Reveal latéral (slide-in-left) pour les titres de section
        gsap.utils.toArray(".reveal-left").forEach(el => {
            gsap.to(el, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Stagger sur les badges de compétences (cascade)
        ScrollTrigger.create({
            trigger: ".skills-container",
            start: "top 85%",
            onEnter: () => {
                gsap.from(".skill-badge", {
                    opacity: 0,
                    scale: 0.8,
                    y: 15,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: "back.out(1.7)"
                });
            },
            once: true
        });

        // Stagger sur les resume items
        gsap.utils.toArray(".resume-col").forEach(col => {
            const items = col.querySelectorAll(".resume-item");
            if (items.length) {
                gsap.from(items, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: col,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            }
        });

        // Stagger sur les contact rows
        ScrollTrigger.create({
            trigger: ".contact-list",
            start: "top 85%",
            onEnter: () => {
                gsap.from(".contact-row", {
                    opacity: 0,
                    x: -20,
                    duration: 0.5,
                    stagger: 0.12,
                    ease: "power2.out"
                });
            },
            once: true
        });
    }

    /* ==========================================================================
       3. SCROLL HORIZONTAL (BENTO) - CALCUL DYNAMIQUE
       ========================================================================== */
    const container = document.querySelector(".projects-container");
    const wrapper = document.querySelector(".projects-wrapper");

    if (container && wrapper) {

        let mm = gsap.matchMedia();

        // N'activer le pin GSAP que sur Desktop/Tablette (> 768px)
        mm.add("(min-width: 769px)", () => {
            if (prefersReducedMotion) return;

            // Fonction pour recalculer la largeur exacte à scroller
            function getScrollAmount() {
                let containerWidth = container.scrollWidth;
                return -(containerWidth - window.innerWidth);
            }

            const tween = gsap.to(container, {
                x: getScrollAmount, // On déplace vers la gauche
                ease: "none",       // Linéaire (contrôlé par le scroll)
            });

            ScrollTrigger.create({
                trigger: ".projects-wrapper",
                start: "top top",
                // La durée du "pin" est égale à la longueur du contenu caché
                end: () => `+=${container.scrollWidth - window.innerWidth}`,
                pin: true,          // On fige l'écran
                animation: tween,   // On joue l'animation
                scrub: 1,           // Fluidité (1s de retard)
                invalidateOnRefresh: true, // Recalcule tout au redimensionnement
            });
        });
    }

    /* ==========================================================================
       4. GRILLE LIQUIDE (CANVAS) - OPTIMISÉ AVEC PAGE VISIBILITY API
       ========================================================================== */
    const canvas = document.getElementById('gridCanvas');

    // Désactiver le canvas si l'utilisateur préfère les mouvements réduits
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let width, height, time = 0;
        let animationId = null;
        let isPageVisible = true;

        // Paramètres visuels
        const gridSize = 50;
        const waveSpeed = 0.004;
        const waveAmp = 40; // Amplitude des vagues

        let resizeTimeout;
        function resize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }, 50);
        }
        // Premier appel immédiat
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        window.addEventListener('resize', resize);
        // Rotation mobile : recalcul immédiat sans debounce
        screen.orientation?.addEventListener('change', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Formule mathématique de la double vague
        function getWaveOffset(x, y, time) {
            return Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time) * waveAmp;
        }

        function animateGrid() {
            // Si la page n'est pas visible, on arrête la boucle d'animation
            if (!isPageVisible) {
                animationId = null;
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // Couleur des lignes : Gris moyen (bien visible sur le beige)
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.lineWidth = 1.5;

            time += waveSpeed;
            ctx.beginPath();

            // Lignes Verticales
            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x + getWaveOffset(x, 0, time), 0);
                for (let y = 0; y <= height; y += 20) {
                    ctx.lineTo(x + getWaveOffset(x, y, time), y);
                }
            }

            // Lignes Horizontales
            for (let y = 0; y <= height; y += gridSize) {
                ctx.moveTo(0, y + getWaveOffset(0, y, time));
                for (let x = 0; x <= width; x += 20) {
                    ctx.lineTo(x, y + getWaveOffset(x, y, time));
                }
            }

            ctx.stroke();
            animationId = requestAnimationFrame(animateGrid);
        }

        // Page Visibility API : pause/reprise du canvas
        document.addEventListener('visibilitychange', () => {
            isPageVisible = !document.hidden;
            if (isPageVisible && !animationId) {
                animateGrid(); // Relancer l'animation quand l'onglet redevient actif
            }
        });

        animateGrid();
    } else if (canvas) {
        // Cacher le canvas si reduced-motion
        canvas.style.display = 'none';
    }

    /* ==========================================================================
       5. BOUTON RETOUR EN HAUT (BACK TO TOP)
       ========================================================================== */
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        let backToTopTicking = false;
        window.addEventListener("scroll", () => {
            if (!backToTopTicking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 500) {
                        backToTopBtn.classList.add("visible");
                    } else {
                        backToTopBtn.classList.remove("visible");
                    }
                    backToTopTicking = false;
                });
                backToTopTicking = true;
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "instant" : "smooth"
            });
        });
    }

    /* ==========================================================================
       6. LIGHTBOX / MODAL D'IMAGES
       ========================================================================== */
    // Déclaré ici pour être accessible dans hideModal
    const navLinks = document.querySelector('.nav-links');

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImage");
    const closeModalBtn = document.querySelector(".close-modal");
    const gridItems = document.querySelectorAll(".grid-item, .gallery-item");

    if (modal && modalImg) {
        const openModal = (item) => {
            const bg = window.getComputedStyle(item).backgroundImage;
            if (bg && bg !== "none") {
                const url = bg.match(/url\(["']?([^"']+)["']?\)/);
                if (url && url[1]) {
                    modal.style.display = "flex";
                    modal.style.alignItems = "center";
                    modal.style.justifyContent = "center";
                    modalImg.src = url[1];
                    // Alt dynamique depuis aria-label
                    modalImg.alt = item.getAttribute('aria-label') || 'Image en plein écran';
                    document.body.style.overflow = "hidden";
                    // Focus sur le bouton fermer (accessibilité)
                    if (closeModalBtn) closeModalBtn.focus();
                }
            }
        };

        gridItems.forEach(item => {
            // Click
            item.addEventListener("click", () => openModal(item));
            // Clavier : Entrée et Espace
            item.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(item);
                }
            });
        });

        const hideModal = () => {
            modal.style.display = "none";
            // Ne réinitialise l'overflow que si le menu mobile n'est pas ouvert
            if (!navLinks || !navLinks.classList.contains('menu-open')) {
                document.body.style.overflow = '';
            }
        };

        if (closeModalBtn) closeModalBtn.addEventListener("click", hideModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target === closeModalBtn) {
                hideModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") hideModal();
        });
    }

    /* ==========================================================================
       7. NAV STICKY (Remplace par CSS Fixed)
       ========================================================================== */
    // La navigation est gérée entièrement en CSS fixed désormais


    /* ==========================================================================
       8. BARRE DE PROGRESSION DE SCROLL
       ========================================================================== */
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar && !prefersReducedMotion) {
        let progressTicking = false;
        window.addEventListener("scroll", () => {
            if (!progressTicking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    progressBar.style.width = progress + "%";
                    progressTicking = false;
                });
                progressTicking = true;
            }
        });
    }

    /* ==========================================================================
       9. CUSTOM CURSOR
       ========================================================================== */
    const cursor = document.querySelector('.custom-cursor');
    if (cursor && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(hover: none)").matches) {
        document.body.classList.add('custom-cursor-active');
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let cursorRafId = null;

        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;
            cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
            // Arrête la boucle quand le curseur est suffisamment proche de la cible
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                cursorRafId = requestAnimationFrame(animateCursor);
            } else {
                cursorRafId = null;
            }
        };

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Relance la boucle seulement si elle est arrêtée
            if (!cursorRafId) {
                cursorRafId = requestAnimationFrame(animateCursor);
            }
        });

        const interactiveElements = document.querySelectorAll('a, button, .grid-item, .gallery-item, .icon-box');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    /* ==========================================================================
       10. MENU MOBILE
       ========================================================================== */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('menu-open');
            mobileBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('menu-open');
                mobileBtn.setAttribute('aria-expanded', false);
                document.body.style.overflow = '';
            });
        });

        // Réinitialise l'overflow si on passe en desktop avec le menu ouvert
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('menu-open')) {
                navLinks.classList.remove('menu-open');
                mobileBtn.setAttribute('aria-expanded', false);
                document.body.style.overflow = '';
            }
        });
    }

    /* ==========================================================================
       11. FOOTER REVEAL
       ========================================================================== */
    const footerTitle = document.querySelector('.footer h2');
    if (footerTitle && !prefersReducedMotion) {
        gsap.from(footerTitle, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".footer",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    }

});
