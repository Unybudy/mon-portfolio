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

    // 2. Animation d'entrée (Nouveau Hero)
    // On anime le titre géant
    gsap.from(".huge-title", {
        y: 150,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
    });

    // On anime la barre du haut
    gsap.from(".top-nav", {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });

    // On anime le texte d'intro
    gsap.from(".hero-intro", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.8
    });

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

    /* --------------------------------------------------
       LIQUID GRID ANIMATION (CORRIGÉE)
    -------------------------------------------------- */
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let time = 0;

    // --- RÉGLAGES POUR AVOIR DE BELLES VAGUES ---
    const gridSize = 50;      // Taille des carreaux
    const waveSpeed = 0.003;  // Vitesse de l'animation
    const waveAmp = 30;       // Hauteur des bosses (Amplitude)

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Fonction mathématique "Double Vague" pour l'effet liquide
    function getWaveOffset(x, y, time) {
        // Vague 1 : Mouvement principal
        const wave1 = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time) * waveAmp;

        // Vague 2 : Contre-courant (c'est ça qui crée l'effet "eau")
        const wave2 = Math.sin(x * 0.005 - time * 0.5) * Math.sin(y * 0.005 + time * 0.5) * (waveAmp / 2);

        return wave1 + wave2;
    }

    function animateGrid() {
        ctx.clearRect(0, 0, width, height);

        // Couleur : Gris crayon léger (parfait sur fond beige)
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.1)';
        ctx.lineWidth = 1;

        time += waveSpeed;

        ctx.beginPath();

        // 1. Lignes VERTICALES
        for (let x = 0; x <= width; x += gridSize) {
            ctx.moveTo(x + getWaveOffset(x, 0, time), 0);
            for (let y = 0; y <= height; y += 20) {
                const offsetX = getWaveOffset(x, y, time);
                const offsetY = getWaveOffset(x, y, time);
                ctx.lineTo(x + offsetX, y + offsetY * 0.5);
            }
        }

        // 2. Lignes HORIZONTALES
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

    /* --------------------------------------------------
       FLUX RSS VIA JAVASCRIPT (API FETCH)
    -------------------------------------------------- */
    const feedContainer = document.getElementById('rss-feed-container');

    if (feedContainer) {
        // On utilise un service tiers (rss2json) pour convertir le RSS en JSON utilisable par JS
        const rssUrl = 'https://www.01net.com/feed/';
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Si tout va bien, on vide le message "Chargement..."
                if (data.status === 'ok') {
                    feedContainer.innerHTML = '';

                    // On prend les 4 premiers articles
                    data.items.slice(0, 4).forEach(item => {

                        // Nettoyage de la date
                        const dateObj = new Date(item.pubDate);
                        const dateStr = dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

                        // Création du HTML pour chaque news
                        const html = `
                            <div class="timeline-item">
                                <div class="date">${dateStr}</div>
                                <div class="content">
                                    <h3>
                                        <img src="https://www.01net.com/favicon.ico" class="site-icon" alt="01net">
                                        <a href="${item.link}" target="_blank">${item.title}</a>
                                    </h3>
                                    <p>${cleanDescription(item.description)}</p>
                                </div>
                            </div>
                        `;
                        feedContainer.innerHTML += html;
                    });
                }
            })
            .catch(error => {
                feedContainer.innerHTML = '<p style="color:red;">Impossible de charger le flux.</p>';
                console.error('Erreur RSS:', error);
            });
    }

    // Petite fonction utilitaire pour nettoyer le texte (enlever les balises HTML de la description)
    function cleanDescription(text) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = text;
        let cleanText = tempDiv.textContent || tempDiv.innerText || "";
        return cleanText.length > 100 ? cleanText.substring(0, 100) + "..." : cleanText;
    }
});