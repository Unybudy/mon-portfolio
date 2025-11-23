document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    /* 1. CURSEUR */
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    });
    const links = document.querySelectorAll('a, .project-card, .img-placeholder-large');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => { gsap.to(cursor, { scale: 1.5, duration: 0.2 }); });
        link.addEventListener('mouseleave', () => { gsap.to(cursor, { scale: 1, duration: 0.2 }); });
    });

    /* 2. ANIMATIONS HERO */
    gsap.from(".huge-title", { y: 100, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.2 });
    gsap.from(".top-nav", { y: -50, opacity: 0, duration: 1, delay: 0.5 });
    gsap.from(".hero-intro", { y: 50, opacity: 0, duration: 1, delay: 0.8 });

    /* 3. SCROLL HORIZONTAL */
    const container = document.querySelector(".projects-container");
    if (container) {
        gsap.to(container, {
            x: () => -(container.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: ".projects-wrapper",
                start: "top top",
                end: () => `+=${container.scrollWidth - window.innerWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
    }

    /* 4. GRILLE ANIMÉE */
    const canvas = document.getElementById('gridCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, time = 0;
        const gridSize = 60; const waveSpeed = 0.005; const waveAmp = 40;

        function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
        window.addEventListener('resize', resize); resize();

        function getWaveOffset(x, y, time) { return Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time) * waveAmp; }

        function animateGrid() {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'; ctx.lineWidth = 1;
            time += waveSpeed; ctx.beginPath();
            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x + getWaveOffset(x, 0, time), 0);
                for (let y = 0; y <= height; y += 20) { ctx.lineTo(x + getWaveOffset(x, y, time), y); }
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.moveTo(0, y + getWaveOffset(0, y, time));
                for (let x = 0; x <= width; x += 20) { ctx.lineTo(x, y + getWaveOffset(x, y, time)); }
            }
            ctx.stroke(); requestAnimationFrame(animateGrid);
        }
        animateGrid();
    }

    /* 5. FLUX RSS (JS) */
    const feedContainer = document.getElementById('rss-feed-container');
    if (feedContainer) {
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://www.01net.com/feed/')}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    feedContainer.innerHTML = '';
                    data.items.slice(0, 4).forEach(item => {
                        const dateStr = new Date(item.pubDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
                        let temp = document.createElement("div"); temp.innerHTML = item.description;
                        let desc = temp.textContent || temp.innerText || "";
                        desc = desc.length > 90 ? desc.substring(0, 90) + "..." : desc;
                        feedContainer.innerHTML += `
                            <div class="timeline-item">
                                <div class="date">${dateStr}</div>
                                <div class="content">
                                    <h3><img src="https://www.01net.com/favicon.ico" class="site-icon"> <a href="${item.link}" target="_blank">${item.title}</a></h3>
                                    <p>${desc}</p>
                                </div>
                            </div>`;
                    });
                }
            })
            .catch(e => console.error(e));
    }
});