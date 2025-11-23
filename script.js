document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    /* --------------------------------------------------
       1. CURSEUR SUIVEUR (Code Robuste)
    -------------------------------------------------- */
    const cursor = document.querySelector('.cursor');

    // Fonction simple et directe pour bouger le curseur
    document.addEventListener('mousemove', (e) => {
        // Utilise setProperty pour la performance ou GSAP
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1, // Petit délai pour effet fluide
            ease: "power2.out"
        });
    });

    // Effet au survol des liens (grossit un peu)
    const links = document.querySelectorAll('a, .project-card, .img-placeholder-large');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });
    });

    /* --------------------------------------------------
       2. ANIMATIONS HERO
    -------------------------------------------------- */
    gsap.from(".huge-title", {
        y: 100, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.2
    });
    gsap.from(".top-nav", {
        y: -50, opacity: 0, duration: 1, delay: 0.5
    });
    gsap.from(".hero-intro", {
        y: 50, opacity: 0, duration: 1, delay: 0.8
    });

    /* --------------------------------------------------
       3. SCROLL HORIZONTAL (BENTO)
    -------------------------------------------------- */
    const container = document.querySelector(".projects-container");
    const wrapper = document.querySelector(".projects-wrapper");

    if (container && wrapper) {
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
            end: () => `+=${container.scrollWidth - window.innerWidth}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true,
        });
    }

    /* --------------------------------------------------
       4. GRILLE ANIMÉE (CANVAS)
    -------------------------------------------------- */
    const canvas = document.getElementById('gridCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, time = 0;

        // PARAMÈTRES RÉAJUSTÉS
        const gridSize = 60;      // Plus large
        const waveSpeed = 0.005;  // Un peu plus rapide
        const waveAmp = 40;       // Vagues plus hautes

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        function getWaveOffset(x, y, time) {
            return Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time) * waveAmp;
        }

        function animateGrid() {
            ctx.clearRect(0, 0, width, height);

            // Couleur un peu plus foncée pour être visible
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.lineWidth = 1;

            time += waveSpeed;
            ctx.beginPath();

            // Verticales
            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x + getWaveOffset(x, 0, time), 0);
                for (let y = 0; y <= height; y += 20) {
                    ctx.lineTo(x + getWaveOffset(x, y, time), y);
                }
            }

            // Horizontales
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

    /* --------------------------------------------------
       5. FLUX RSS (FETCH JS)
    -------------------------------------------------- */
    const feedContainer = document.getElementById('rss-feed-container');
    if (feedContainer) {
        const rssUrl = 'https://www.01net.com/feed/';
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    feedContainer.innerHTML = '';
                    data.items.slice(0, 4).forEach(item => {
                        const dateObj = new Date(item.pubDate);
                        const dateStr = dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });

                        // Nettoyage description
                        let tempDiv = document.createElement("div");
                        tempDiv.innerHTML = item.description;
                        let cleanDesc = tempDiv.textContent || tempDiv.innerText || "";
                        cleanDesc = cleanDesc.length > 90 ? cleanDesc.substring(0, 90) + "..." : cleanDesc;

                        const html = `
                            <div class="timeline-item">
                                <div class="date">${dateStr}</div>
                                <div class="content">
                                    <h3>
                                        <img src="https://www.01net.com/favicon.ico" class="site-icon" alt="01net">
                                        <a href="${item.link}" target="_blank">${item.title}</a>
                                    </h3>
                                    <p>${cleanDesc}</p>
                                </div>
                            </div>
                        `;
                        feedContainer.innerHTML += html;
                    });
                }
            })
            .catch(error => console.error('Erreur RSS:', error));
    }
});