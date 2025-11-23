document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Curseur suiveur
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });

    // 2. Animation d'entrée (Hero)
    gsap.from(".hero h1", { y: 100, opacity: 0, duration: 1, ease: "power4.out" });
    gsap.from(".header-deco", { y: -50, opacity: 0, duration: 1, delay: 0.3 });

    // 3. Scroll Horizontal des Projets
    const container = document.querySelector(".projects-container");

    // Calcul de la largeur totale pour savoir combien scroller
    function getScrollAmount() {
        let containerWidth = container.scrollWidth;
        return -(containerWidth - window.innerWidth);
    }

    const tween = gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
    });

    ScrollTrigger.create({
        trigger: ".projects-wrapper",
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // La durée du scroll correspond à la longueur du contenu
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, // Recalcule si on redimensionne la fenêtre
        // markers: true // Décommente ça si tu veux voir les marqueurs de debug
    });

    // --- LIQUID GRID ANIMATION ---
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let time = 0;

    // Paramètres de la grille
    const gridSize = 40; // Taille des carreaux
    const waveAmp = 40;   // Amplitude de la vague (plus grand = plus déformé)
    const waveFreq = 0.002; // Fréquence de la vague (plus petit = vagues plus larges)
    const waveSpeed = 0.02; // Vitesse de l'animation

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // Fonction pour calculer le décalage (la vague)
    function getWaveOffset(x, y, time) {
        // On combine deux ondes sinusoïdales pour un effet plus organique
        return Math.sin(x * waveFreq + time) * Math.cos(y * waveFreq + time) * waveAmp;
    }

    function animateGrid() {
        ctx.clearRect(0, 0, width, height);

        // Couleur des lignes (Gris crayon léger)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1.5;

        time += waveSpeed;

        ctx.beginPath();

        // 1. Dessiner les lignes VERTICALES
        for (let x = 0; x <= width; x += gridSize) {
            // Pour chaque ligne verticale, on dessine plein de petits segments
            // pour pouvoir courber la ligne
            ctx.moveTo(x + getWaveOffset(x, 0, time), 0);

            for (let y = 0; y <= height; y += 20) { // Résolution de la courbe (20px)
                // On calcule la déformation à ce point précis
                const offsetX = getWaveOffset(x, y, time);
                const offsetY = getWaveOffset(x, y, time); // On peut aussi déformer Y légèrement
                ctx.lineTo(x + offsetX, y + offsetY * 0.5); // * 0.5 pour moins de bougeotte verticale
            }
        }

        // 2. Dessiner les lignes HORIZONTALES
        for (let y = 0; y <= height; y += gridSize) {
            ctx.moveTo(0, y + getWaveOffset(0, y, time));

            for (let x = 0; x <= width; x += 20) {
                const offsetX = getWaveOffset(x, y, time);
                const offsetY = getWaveOffset(x, y, time);
                ctx.lineTo(x + offsetX * 0.5, y + offsetY);
            }
        }

        ctx.stroke();
        requestAnimationFrame(animateGrid);
    }

    animateGrid();
});
