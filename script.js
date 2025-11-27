document.addEventListener("DOMContentLoaded", (event) => {
    
    // Enregistrement des plugins GSAP (Indispensable)
    gsap.registerPlugin(ScrollTrigger);

    /* ==========================================================================
       1. CURSEUR SUIVEUR (OPTIMISÉ PERFORMANCE)
       ========================================================================== */
    const cursor = document.querySelector('.cursor');
    
    // Création des fonctions optimisées "quickTo" pour éviter le lag
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    // Le curseur suit la souris sans délai CSS
    document.addEventListener('mousemove', (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // Effet "Grossissement" au survol des éléments interactifs
    const interactives = document.querySelectorAll('a, button, .project-card, .img-placeholder-large, .contact-row, .cta-button');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1.5, duration: 0.2 }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.2 }));
    });

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
        
        // Fonction pour recalculer la largeur exacte à scroller
        // (Essentiel si les images chargent après ou si la fenêtre change)
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
    }

    /* ==========================================================================
       4. GRILLE LIQUIDE (CANVAS) - LIGNES VISIBLES
       ========================================================================== */
    const canvas = document.getElementById('gridCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, time = 0;
        
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
            requestAnimationFrame(animateGrid);
        }
        animateGrid();
    }

    /* ==========================================================================
       5. FLUX RSS (API FETCH) - 01NET
       ========================================================================== */
    const feedContainer = document.getElementById('rss-feed-container');
    
    if (feedContainer) {
        // On passe par rss2json pour convertir le XML en JSON lisible par JS
        const rssUrl = encodeURIComponent('https://www.01net.com/feed/');
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    feedContainer.innerHTML = ''; // On vide le message de chargement
                    
                    // On boucle sur les 4 premiers articles
                    data.items.slice(0, 4).forEach(item => {
                        const dateObj = new Date(item.pubDate);
                        const dateStr = dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
                        
                        // Nettoyage sommaire de la description (enlève les balises HTML sales)
                        let tempDiv = document.createElement("div");
                        tempDiv.innerHTML = item.description;
                        let cleanDesc = tempDiv.textContent || tempDiv.innerText || "";
                        // On coupe si c'est trop long
                        cleanDesc = cleanDesc.length > 90 ? cleanDesc.substring(0, 90) + "..." : cleanDesc;

                        // Injection HTML
                        feedContainer.innerHTML += `
                            <div class="timeline-item">
                                <div class="date">${dateStr}</div>
                                <div class="content">
                                    <h3>
                                        <img src="https://www.01net.com/favicon.ico" class="site-icon" alt="01net"> 
                                        <a href="${item.link}" target="_blank">${item.title}</a>
                                    </h3>
                                    <p>${cleanDesc}</p>
                                </div>
                            </div>`;
                    });
                } else {
                    feedContainer.innerHTML = '<p>Impossible de charger les actualités.</p>';
                }
            })
            .catch(error => {
                console.error(error);
                feedContainer.innerHTML = '<p>Erreur de connexion au flux.</p>';
            });
    }
});
