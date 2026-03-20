# Audit Portfolio — Jef Ly (Mars 2026)

## Note globale : 7/10

Un portfolio techniquement solide et bien structuré, mais qui souffre d'un décalage identitaire (le thème cyberpunk annoncé est absent) et d'un manque de liens directs vers le code source des projets — deux éléments critiques pour un recruteur technique.

---

## 3 Points forts à conserver absolument

### 1. Architecture technique irréprochable
Le code est propre, bien organisé : CSS variables, semantic HTML5, skip link, `aria-label` (36 occurrences), `prefers-reduced-motion`, focus-visible. C'est du travail de professionnel. Un recruteur technique qui inspecte le code sera impressionné.

### 2. Section Projets riche et détaillée
8 projets avec contexte, contribution, approche technique, et captures d'écran. La grille Bento horizontale avec scroll pinné est visuellement impactante. Les projets couvrent un spectre large (Java Spring Boot, Python, PHP MVC, WordPress, Android) ce qui montre la polyvalence.

### 3. Animations et micro-interactions soignées
GSAP ScrollTrigger, canvas animé, lightbox accessible, curseur custom, transitions de page — tout est fluide, performant (requestAnimationFrame, Page Visibility API, debounce). C'est un différenciateur clair face aux portfolios statiques d'étudiants BTS.

---

## 3 Problèmes critiques à corriger en priorité

### CRITIQUE 1 : Aucun lien GitHub sur les projets

Le lien GitHub (`github.com/Unybudy`) n'apparaît qu'une seule fois, dans le footer. Aucun des 8 projets ne comporte de lien vers son repository. C'est LA première chose qu'un recruteur technique cherche.

**Correction :** Ajouter un bouton/lien vers le repo GitHub sur chaque carte projet et dans chaque page détaillée.

```html
<a href="https://github.com/Unybudy/nexus-automator"
   target="_blank" rel="noopener noreferrer"
   class="project-github-link">
    Voir le code source
</a>
```

### CRITIQUE 2 : Décalage entre le thème annoncé (cyberpunk/dark blue) et le thème réel (rétro/papier crème)

Le thème actuel (`#F3F0E7` beige crème, `#006B5E` teal) est élégant et professionnel. **Recommandation : le garder** et mettre à jour la description de profil pour refléter la réalité.

### CRITIQUE 3 : Hero section trop générique — pas de CTA clair

Un recruteur ne sait pas en 3 secondes ce que Jef cherche. L'accroche doit inclure :
- Le poste recherché (alternance Bachelor Informatique sept. 2025)
- Le domaine de prédilection
- Un bouton CTA vers la section contact

---

## Suggestions d'amélioration secondaires

- **SEO :** Ajouter les balises Open Graph (`og:title`, `og:description`, `og:image`) pour un aperçu LinkedIn
- **Navigation :** Renommer "Sommaire" en "Projets"
- **Performance :** Passer les images de `background-image` à `<img loading="lazy">` avec `object-fit: cover`
- **CV :** Horodater le fichier PDF (`cv-jef-ly-2026.pdf`)
- **Accessibilité :** Vérifier le contraste de `--text-muted: #444444` sur fond crème pour les petits textes

---

## 2 Actions à faire cette semaine

1. **Ajouter les liens GitHub sur chaque projet** (~2h). Gain le plus immédiat pour un recruteur.
2. **Réécrire l'accroche Hero** avec "alternance septembre 2025 — Bachelor Informatique" + bouton CTA contact.

**Bonus rapide (30 min) :** Balises Open Graph pour LinkedIn.
