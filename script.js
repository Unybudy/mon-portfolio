document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Curseur qui suit la souris
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // 2. Animation d'entrée du titre
    gsap.from(".main-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
    });

    // 3. Scroll Horizontal pour la section Projets
    // On ne lance ça que sur PC (plus grand que 768px)
    if (window.innerWidth > 768) {
        const container = document.querySelector(".projects-container");

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
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true
        });
    }
});
