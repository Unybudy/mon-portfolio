// On attend que le DOM soit chargé pour être sûr
document.addEventListener("DOMContentLoaded", (event) => {

    // Initialisation du plugin ScrollTrigger de GSAP
    gsap.registerPlugin(ScrollTrigger);

    /* --------------------------------------------------
       1. ANIMATION DU CURSEUR
    -------------------------------------------------- */
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1, // Légère latence pour effet fluide
            ease: "power2.out"
        });
    });

    /* --------------------------------------------------
       2. ANIMATION D'ENTRÉE (HERO)
    -------------------------------------------------- */
    gsap.from(".hero h1", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
    });

    gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5 // Apparaît un peu après le titre
    });

    /* --------------------------------------------------
       3. SCROLL HORIZONTAL (L'effet principal)
    -------------------------------------------------- */
    const container = document.querySelector(".projects-container");

    // On calcule combien de pixels on doit déplacer vers la gauche
    // Largeur totale du contenu - Largeur de l'écran
    let scrollWidth = container.offsetWidth - window.innerWidth;

    gsap.to(container, {
        x: () => -scrollWidth, // Déplace vers la gauche (négatif)
        ease: "none",
        scrollTrigger: {
            trigger: ".projects-wrapper",
            pin: true,     // Épingle la section (l'empêche de scroller verticalement)
            scrub: 1,      // Lie l'animation au scroll avec fluidité
            end: () => "+=" + container.offsetWidth, // Définit la durée du scroll virtuel
            invalidateOnRefresh: true // Recalcule si on redimensionne la fenêtre
        }
    });

    /* --------------------------------------------------
       4. AMBIANCE (Changement de fond)
    -------------------------------------------------- */
    gsap.to("body", {
        backgroundColor: "#000000", // Devient noir absolu à la fin
        scrollTrigger: {
            trigger: ".footer",
            start: "top center",
            toggleActions: "play none none reverse"
        }
    });

});

/* --------------------------------------------------
   5. LIQUID GRID ANIMATION (Le fond style "Matrix")
-------------------------------------------------- */
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let time = 0;

// Paramètres de la grille (Tu peux jouer avec ça !)
const gridSize = 60;      // Taille des carreaux (plus grand = moins de lignes)
const waveSpeed = 0.002;  // Vitesse de l'ondulation
const waveAmp = 40;       // Amplitude de la vague (puissance de la déformation)

// On redimensionne le canvas pour qu'il prenne tout l'écran
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Fonction mathématique pour créer l'ondulation
function getWaveOffset(x, y, time) {
    // On combine deux ondes sinusoïdales pour un effet plus "organique" et moins répétitif
    const wave1 = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time) * waveAmp;
    const wave2 = Math.sin(x * 0.005 - time * 0.5) * Math.sin(y * 0.005 + time * 0.5) * (waveAmp / 2);
    return wave1 + wave2;
}

function animateGrid() {
    ctx.clearRect(0, 0, width, height);

    // Couleur des lignes (Gris très foncé, presque noir)
    ctx.strokeStyle = 'rgba(120, 120, 120, 0.5)';
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

// Lancer l'animation
animateGrid();
