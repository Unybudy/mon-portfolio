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
       5. AGRÉGATEUR MULTI-SOURCES (VEILLE TECHNOLOGIQUE)
       ========================================================================== */
    const feedContainer = document.getElementById('rss-feed-container');
    const filtersContainer = document.getElementById('source-filters');

    if (feedContainer) {

        // ───────────────────────────────────────────────
        // A. CONFIGURATION DES SOURCES
        // ───────────────────────────────────────────────
        const SOURCES = [
            {
                nom: 'Dev.to',
                type: 'json',               // API JSON native (pas besoin de rss2json)
                url: 'https://dev.to/api/articles?per_page=15&tag=programming',
                icone: 'https://dev.to/favicon.ico',
                couleur: '#3B49DF',
                // Fonction d'uniformisation spécifique à Dev.to
                uniformiser: (item) => ({
                    titre: item.title,
                    lien: item.url,
                    date: new Date(item.published_at),
                    source: 'Dev.to',
                    icone: 'https://dev.to/favicon.ico',
                    description: item.description || '',
                    tags: item.tag_list || [],
                }),
            },
            {
                nom: 'Journal du Hacker',
                type: 'rss',                // Flux RSS → passage par rss2json
                url: 'https://www.journalduhacker.net/rss',
                icone: 'https://www.journalduhacker.net/favicon.ico',
                couleur: '#B5460F',
                uniformiser: (item) => ({
                    titre: item.title,
                    lien: item.link,
                    date: new Date(item.pubDate),
                    source: 'Journal du Hacker',
                    icone: 'https://www.journalduhacker.net/favicon.ico',
                    description: nettoyerHTML(item.description || ''),
                    tags: (item.categories || []),
                }),
            },
            {
                nom: '01net',
                type: 'rss',
                url: 'https://www.01net.com/feed/',
                icone: 'https://www.01net.com/favicon.ico',
                couleur: '#e74c3c',
                uniformiser: (item) => ({
                    titre: item.title,
                    lien: item.link,
                    date: new Date(item.pubDate),
                    source: '01net',
                    icone: 'https://www.01net.com/favicon.ico',
                    description: nettoyerHTML(item.description || ''),
                    tags: (item.categories || []),
                }),
            },
        ];

        // ───────────────────────────────────────────────
        // B. FILTRAGE PAR MOTS-CLÉS (Programmation uniquement)
        // ───────────────────────────────────────────────
        const MOTS_INCLUS = [
            'code', 'dev', 'développ', 'program', 'javascript', 'python', 'php',
            'java', 'react', 'angular', 'vue', 'node', 'css', 'html', 'api',
            'framework', 'sql', 'database', 'git', 'github', 'docker', 'linux',
            'web', 'frontend', 'backend', 'fullstack', 'open source', 'script',
            'algorithm', 'data', 'cloud', 'cyber', 'sécurité', 'réseau',
            'logiciel', 'software', 'bug', 'debug', 'deploy', 'server',
            'terminal', 'cli', 'rust', 'go ', 'typescript', 'kotlin', 'swift',
            'symfony', 'laravel', 'django', 'spring', 'flutter', 'android',
            'ios', 'mobile', 'app', 'tech', 'agile', 'scrum', 'devops',
            'ia', 'machine learning', 'deep learning', 'intelligence artificielle',
        ];

        const MOTS_EXCLUS = [
            'smartphone', 'iphone', 'samsung', 'galaxy', 'processeur', 'cpu',
            'gpu', 'nvidia', 'amd', 'intel', 'carte graphique', 'ram',
            'promo', 'bon plan', 'solde', 'réduction', 'euro', '€',
            'tv', 'télé', 'écran', 'casque', 'enceinte', 'forfait',
            'opérateur', 'fibre', 'box', 'voiture', 'électrique',
        ];

        /** Vérifie si un article parle de programmation/tech */
        function estPertinent(article) {
            const texte = `${article.titre} ${article.description} ${(article.tags || []).join(' ')}`.toLowerCase();

            // Si la source est Dev.to ou Journal du Hacker → déjà orienté dev, on garde tout
            if (article.source === 'Dev.to' || article.source === 'Journal du Hacker') {
                return true;
            }

            // Pour les sources généralistes (01net), on filtre
            const contientInclu = MOTS_INCLUS.some(mot => texte.includes(mot));
            const contientExclu = MOTS_EXCLUS.some(mot => texte.includes(mot));

            return contientInclu && !contientExclu;
        }

        // ───────────────────────────────────────────────
        // C. UTILITAIRES
        // ───────────────────────────────────────────────
        /** Nettoie le HTML brut d'une description RSS */
        function nettoyerHTML(html) {
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            let texte = tempDiv.textContent || tempDiv.innerText || '';
            return texte.length > 120 ? texte.substring(0, 120) + '…' : texte;
        }

        /** Récupère les articles d'une source RSS via rss2json */
        function fetchRSS(source) {
            const rssUrl = encodeURIComponent(source.url);
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
            return fetch(apiUrl)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        return data.items.map(source.uniformiser);
                    }
                    return [];
                });
        }

        /** Récupère les articles d'une source JSON (ex: Dev.to) */
        function fetchJSON(source) {
            return fetch(source.url)
                .then(res => res.json())
                .then(items => {
                    if (Array.isArray(items)) {
                        return items.map(source.uniformiser);
                    }
                    return [];
                });
        }

        // ───────────────────────────────────────────────
        // D. GÉNÉRATION DES FILTRES (Boutons toggle)
        // ───────────────────────────────────────────────
        let sourcesActives = new Set(SOURCES.map(s => s.nom)); // Toutes actives par défaut

        function creerFiltres() {
            if (!filtersContainer) return;
            filtersContainer.innerHTML = '';
            SOURCES.forEach(source => {
                const btn = document.createElement('button');
                btn.className = 'source-filter-btn active';
                btn.dataset.source = source.nom;
                btn.innerHTML = `<img src="${source.icone}" class="site-icon" alt="${source.nom}"> ${source.nom}`;
                btn.style.setProperty('--filter-color', source.couleur);

                btn.addEventListener('click', () => {
                    btn.classList.toggle('active');
                    if (sourcesActives.has(source.nom)) {
                        sourcesActives.delete(source.nom);
                    } else {
                        sourcesActives.add(source.nom);
                    }
                    afficherArticles(tousLesArticles);
                });

                filtersContainer.appendChild(btn);
            });
        }

        // ───────────────────────────────────────────────
        // E. AFFICHAGE DES ARTICLES
        // ───────────────────────────────────────────────
        let tousLesArticles = [];

        function afficherArticles(articles) {
            feedContainer.innerHTML = '';

            const filtres = articles.filter(a => sourcesActives.has(a.source));

            if (filtres.length === 0) {
                feedContainer.innerHTML = '<p style="padding:20px; color:#888;">Aucun article trouvé. Activez au moins une source.</p>';
                return;
            }

            filtres.slice(0, 8).forEach(article => {
                const dateStr = article.date.toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });

                // Trouver la couleur de la source
                const sourceConfig = SOURCES.find(s => s.nom === article.source);
                const couleur = sourceConfig ? sourceConfig.couleur : '#e74c3c';

                feedContainer.innerHTML += `
                    <div class="timeline-item" data-source="${article.source}" style="--timeline-color: ${couleur}">
                        <div class="date">${dateStr}</div>
                        <div class="content">
                            <h3>
                                <img src="${article.icone}" class="site-icon" alt="${article.source}"> 
                                <a href="${article.lien}" target="_blank">${article.titre}</a>
                            </h3>
                            <p>${article.description}</p>
                            <span class="source-badge" style="color: ${couleur}; border-color: ${couleur};">${article.source}</span>
                        </div>
                    </div>`;
            });
        }

        // ───────────────────────────────────────────────
        // F. LANCEMENT DE L'AGRÉGATION
        // ───────────────────────────────────────────────
        creerFiltres();

        // On lance tous les appels en parallèle avec Promise.allSettled
        const requetes = SOURCES.map(source => {
            if (source.type === 'json') return fetchJSON(source);
            if (source.type === 'rss') return fetchRSS(source);
            return Promise.resolve([]);
        });

        Promise.allSettled(requetes)
            .then(resultats => {
                let articlesbruts = [];

                resultats.forEach((resultat, index) => {
                    if (resultat.status === 'fulfilled' && resultat.value.length > 0) {
                        articlesbruts = articlesbruts.concat(resultat.value);
                    } else if (resultat.status === 'rejected') {
                        console.warn(`⚠️ Échec du chargement de ${SOURCES[index].nom}:`, resultat.reason);
                    }
                });

                // Filtrage : ne garder que les articles liés à la programmation
                tousLesArticles = articlesbruts.filter(estPertinent);

                // Tri chronologique (du plus récent au plus ancien)
                tousLesArticles.sort((a, b) => b.date - a.date);

                // Affichage
                if (tousLesArticles.length > 0) {
                    afficherArticles(tousLesArticles);
                } else {
                    feedContainer.innerHTML = '<p style="padding:20px; color:#888;">Aucun article de programmation trouvé pour le moment.</p>';
                }
            })
            .catch(error => {
                console.error('Erreur globale :', error);
                feedContainer.innerHTML = '<p>Erreur de connexion aux flux.</p>';
            });
    }
});
