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
