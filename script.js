document.addEventListener("DOMContentLoaded", (event) => {

    // Enregistrement des plugins GSAP (Indispensable)
    gsap.registerPlugin(ScrollTrigger);

    /* ==========================================================================
       2. ANIMATIONS D'ENTRÉE (HERO)
       ========================================================================== */
    const tlHero = gsap.timeline({ defaults: { ease: "power4.out" } });

    tlHero.from(".huge-title", { y: 100, opacity: 0, duration: 1.5, delay: 0.2 })
        .from(".top-nav", { y: -20, opacity: 0, duration: 1 }, "-=1")
        .from(".hero-intro", { y: 30, opacity: 0, duration: 1 }, "-=0.8");

    /* ==========================================================================
       3. SCROLL HORIZONTAL (BENTO) - CALCUL DYNAMIQUE
       ========================================================================== */
    const container = document.querySelector(".projects-container");
    const wrapper = document.querySelector(".projects-wrapper");

    if (container && wrapper) {

        let mm = gsap.matchMedia();

        // N'activer le pin GSAP que sur Desktop/Tablette (> 768px)
        mm.add("(min-width: 769px)", () => {
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
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, time = 0;
        let animationId = null;
        let isPageVisible = true;

        // Paramètres visuels
        const gridSize = 50;
        const waveSpeed = 0.004;
        const waveAmp = 40; // Amplitude des vagues

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

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
    }

});
