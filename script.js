// ========================================
// PORTFOLIO MACOS - JAVASCRIPT
// Jef Ly - BTS SIO SLAM
// ========================================

// Initialisation sÃ©curisÃ©e
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio Jef Ly - Chargement terminÃ© âœ“');
});

// ========================================
// UTILITAIRES
// ========================================

// Fonction pour crÃ©er un effet de ripple
function createRipple(e, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
    transform: scale(0);
    animation: rippleEffect 0.6s ease-out;
  `;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

// ========================================
// HORLOGE SYSTÃˆME
// ========================================

const clockEl = document.getElementById('clock');

function updateClock() {
  const d = new Date();
  const days = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  clockEl.textContent = `${days[d.getDay()]} ${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 15000);

// ========================================
// THEME TOGGLE (CLAIR/SOMBRE)
// ========================================

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
let currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Animation de transition
    html.style.transition = 'background 0.4s ease';
    setTimeout(() => {
      html.style.transition = '';
    }, 400);
  });
}

// ========================================
// ACCENT COLOR TOGGLE
// ========================================

const accentColors = [
  '#3ea6ff', // Bleu
  '#7ad1c2', // Turquoise
  '#c9a227', // Or
  '#9d7cff', // Violet
  '#ff6b6b', // Rouge
  '#51cf66', // Vert
];
let accentIndex = 0;

const accentToggle = document.getElementById('toggle-accent');
if (accentToggle) {
  accentToggle.addEventListener('click', () => {
    accentIndex = (accentIndex + 1) % accentColors.length;
    document.documentElement.style.setProperty('--accent', accentColors[accentIndex]);
    
    // Animation de pulsation
    accentToggle.style.animation = 'pulse 0.6s ease';
    setTimeout(() => accentToggle.style.animation = '', 600);
  });
}

// ========================================
// GESTION DES VUES
// ========================================

const views = {
  projets: document.getElementById('view-projets'),
  apropos: document.getElementById('view-apropos'),
  parcours: document.getElementById('view-parcours'),
  competences: document.getElementById('view-competences'),
  contact: document.getElementById('view-contact')
};

// Fonction globale pour changer de vue
window.showView = function(viewName) {
  // Masquer toutes les vues
  for (const key in views) {
    if (views[key]) {
      views[key].hidden = key !== viewName;
    }
  }
  
  // Mettre Ã  jour la navigation active
  document.querySelectorAll('.navbtn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });
  
  // Mettre Ã  jour le menu bar
  document.querySelectorAll('.menu-items .item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Animation d'entrÃ©e
  const activeView = views[viewName];
  if (activeView) {
    activeView.style.animation = 'slideInUp 0.5s ease';
    setTimeout(() => {
      activeView.style.animation = '';
    }, 500);
  }
}

// ========================================
// EVENT LISTENERS NAVIGATION
// ========================================

// Navigation sidebar
document.querySelectorAll('.navbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    if (view) window.showView(view);
  });
});

// Navigation dock
document.querySelectorAll('.dock .icon[data-open]').forEach(element => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    const view = element.dataset.open;
    if (views[view]) {
      window.showView(view);
      // Animation de rebond
      element.style.animation = 'pulse 0.6s ease';
      setTimeout(() => {
        element.style.animation = '';
      }, 600);
    }
  });
});

// ========================================
// BOUTONS RÃ‰SEAUX SOCIAUX
// ========================================

const githubBtn = document.getElementById('btn-github');
const linkedinBtn = document.getElementById('btn-linkedin');

if (githubBtn) {
  githubBtn.addEventListener('click', () => {
    window.open('https://github.com/Unybudy', '_blank');
    githubBtn.style.animation = 'pulse 0.6s ease';
    setTimeout(() => {
      githubBtn.style.animation = '';
    }, 600);
  });
}

if (linkedinBtn) {
  linkedinBtn.addEventListener('click', () => {
    window.open('https://linkedin.com/in/jefly', '_blank');
    linkedinBtn.style.animation = 'pulse 0.6s ease';
    setTimeout(() => {
      linkedinBtn.style.animation = '';
    }, 600);
  });
}

// ========================================
// RECHERCHE DANS LES PROJETS
// ========================================

const searchInput = document.getElementById('search');
const projectCards = Array.from(document.querySelectorAll('#projects .card'));

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    projectCards.forEach(card => {
      const text = (card.dataset.text || '').toLowerCase();
      const matches = text.includes(query);
      
      card.style.display = matches ? 'block' : 'none';
      card.style.animation = matches ? 'slideInUp 0.3s ease' : '';
    });
    
    // Message si aucun rÃ©sultat
    const visibleCards = projectCards.filter(c => c.style.display !== 'none');
    if (visibleCards.length === 0 && query) {
      const existing = document.getElementById('no-results');
      if (!existing) {
        const noResults = document.createElement('div');
        noResults.className = 'panel';
        noResults.style.gridColumn = '1 / -1';
        noResults.innerHTML = '<p style="text-align:center">Aucun projet trouvÃ© pour cette recherche ðŸ”</p>';
        noResults.id = 'no-results';
        document.getElementById('projects').appendChild(noResults);
      }
    } else {
      const noResults = document.getElementById('no-results');
      if (noResults) noResults.remove();
    }
  });
}

// ========================================
// SEGMENTED CONTROL (GRID/LISTE)
// ========================================

const segButtons = document.querySelectorAll('.seg button');
const projectsGrid = document.getElementById('projects');

segButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    segButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    if (btn.dataset.tab === 'liste') {
      projectsGrid.style.gridTemplateColumns = '1fr';
      projectCards.forEach(card => {
        card.style.maxWidth = '100%';
      });
    } else {
      projectsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
      projectCards.forEach(card => {
        card.style.maxWidth = 'none';
      });
    }
  });
});

// ========================================
// BOUTONS TRAFFIC LIGHT
// ========================================

const redLight = document.querySelector('.light.red');
const yellowLight = document.querySelector('.light.yellow');
const greenLight = document.querySelector('.light.green');
const win = document.getElementById('win');

// Bouton rouge - Fermer
if (redLight) {
  redLight.addEventListener('click', () => {
    win.style.transition = 'all 0.5s ease';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.8)';
    setTimeout(() => {
      win.style.display = 'none';
      
      // Bouton pour rouvrir
      const reopenBtn = document.createElement('button');
      reopenBtn.textContent = 'ðŸ–¥ï¸ Rouvrir la fenÃªtre';
      reopenBtn.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 16px 32px;
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        cursor: pointer;
        z-index: 100;
      `;
      reopenBtn.onclick = () => {
        win.style.display = 'grid';
        win.style.opacity = '1';
        win.style.transform = 'scale(1)';
        reopenBtn.remove();
      };
      document.body.appendChild(reopenBtn);
    }, 500);
  });
}

// Bouton jaune - Minimiser
if (yellowLight) {
  yellowLight.addEventListener('click', () => {
    win.style.transition = 'all 0.3s ease';
    win.style.transform = 'translateY(calc(100vh - 100px))';
    win.style.opacity = '0.3';
    
    // Indicateur dans le dock
    const minimizedIndicator = document.createElement('div');
    minimizedIndicator.style.cssText = `
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
    `;
    
    const firstDockIcon = document.querySelector('.dock .icon');
    if (firstDockIcon && !firstDockIcon.querySelector('div')) {
      firstDockIcon.style.position = 'relative';
      firstDockIcon.appendChild(minimizedIndicator);
    }
    
    // Restaurer au clic
    const restore = () => {
      win.style.transform = 'translateY(0)';
      win.style.opacity = '1';
      if (minimizedIndicator) minimizedIndicator.remove();
      document.removeEventListener('click', restore);
    };
    
    setTimeout(() => {
      document.addEventListener('click', restore);
    }, 100);
  });
}

// Bouton vert - Plein Ã©cran
if (greenLight) {
  greenLight.addEventListener('click', () => {
    const isFullscreen = win.classList.contains('fullscreen');
    
    win.style.transition = 'all 0.4s ease';
    
    if (isFullscreen) {
      // Restaurer taille normale
      win.classList.remove('fullscreen');
      win.style.width = '960px';
      win.style.height = '66vh';
      win.style.left = 'calc(50% - 480px)';
      win.style.top = '92px';
      win.style.borderRadius = '22px';
      win.style.maxWidth = '';
      win.style.maxHeight = '';
    } else {
      // Passer en plein Ã©cran
      win.classList.add('fullscreen');
      win.style.width = 'calc(100vw - 16px)';
      win.style.height = 'calc(100vh - 52px)';
      win.style.left = '8px';
      win.style.top = '44px';
      win.style.borderRadius = '12px';
      win.style.maxWidth = '100vw';
      win.style.maxHeight = '100vh';
    }
  });
}

// ========================================
// DRAG DE LA FENÃŠTRE
// ========================================

(function() {
  const drag = document.getElementById('drag');
  let isDragging = false;
  let startX = 0, startY = 0;
  let winX = 0, winY = 0;
  
  const startDrag = (e) => {
    // Ne pas draguer si on clique sur un bouton
    if (e.target.classList.contains('light')) return;
    
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
    startY = e.clientY || e.touches[0].clientY;
    const rect = win.getBoundingClientRect();
    winX = rect.left;
    winY = rect.top;
    drag.style.cursor = 'grabbing';
  };
  
  const doDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    
    let newX = winX + deltaX;
    let newY = winY + deltaY;
    
    // Contraintes
    const maxX = window.innerWidth - win.offsetWidth - 8;
    const maxY = window.innerHeight - win.offsetHeight - 80;
    
    newX = Math.max(8, Math.min(newX, maxX));
    newY = Math.max(40, Math.min(newY, maxY));
    
    win.style.left = newX + 'px';
    win.style.top = newY + 'px';
  };
  
  const endDrag = () => {
    isDragging = false;
    drag.style.cursor = 'move';
  };
  
  // Mouse events
  drag.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', doDrag);
  window.addEventListener('mouseup', endDrag);
  
  // Touch events
  drag.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', doDrag, { passive: false });
  window.addEventListener('touchend', endDrag);
})();

// ========================================
// FORMULAIRE DE CONTACT
// ========================================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animation du bouton
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>âœ…</span> Message envoyÃ© !';
    btn.style.background = 'linear-gradient(135deg, #51cf66, #7ad1c2)';
    
    // Notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 60px;
      right: 20px;
      padding: 16px 24px;
      background: linear-gradient(135deg, var(--success), var(--accent));
      color: white;
      border-radius: 12px;
      box-shadow: var(--shadow-xl);
      z-index: 1000;
      animation: slideInUp 0.5s ease;
      font-weight: 600;
    `;
    notification.textContent = 'âœ¨ Merci pour votre message ! Je vous rÃ©pondrai rapidement.';
    document.body.appendChild(notification);
    
    // Reset aprÃ¨s 3 secondes
    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = originalText;
      btn.style.background = '';
      notification.style.animation = 'slideInUp 0.5s ease reverse';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  });
}

// ========================================
// TAGS CLIQUABLES POUR FILTRER
// ========================================

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', (e) => {
    if (e.target.closest('.skills')) {
      const skill = chip.textContent.trim();
      
      // Aller Ã  la vue projets
      window.showView('projets');
      
      // Filtrer par compÃ©tence
      if (searchInput) {
        searchInput.value = skill;
        searchInput.dispatchEvent(new Event('input'));
      }
    }
  });
});

// ========================================
// ANIMATIONS AU SCROLL (INTERSECTION OBSERVER)
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideInUp 0.6s ease';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer les Ã©lÃ©ments
document.querySelectorAll('.card, .panel').forEach(el => {
  observer.observe(el);
});

// ========================================
// EFFET RIPPLE SUR LES ICÃ”NES DU DOCK
// ========================================

document.querySelectorAll('.dock .icon').forEach(icon => {
  icon.addEventListener('mousedown', (e) => {
    icon.style.transform = 'scale(0.95)';
    createRipple(e, icon);
  });
  
  icon.addEventListener('mouseup', () => {
    icon.style.transform = '';
  });
  
  icon.addEventListener('mouseleave', () => {
    icon.style.transform = '';
  });
});

// ========================================
// INITIALISATION AU CHARGEMENT
// ========================================

window.addEventListener('load', () => {
  setTimeout(() => {
    // Afficher la vue projets par dÃ©faut
    window.showView('projets');
    
    // VÃ©rifier l'Ã©tat des composants
    const elementsCheck = {
      'FenÃªtre': document.getElementById('win'),
      'Dock': document.querySelector('.dock'),
      'Boutons traffic': document.querySelectorAll('.light').length,
      'IcÃ´nes dock': document.querySelectorAll('.dock .icon').length,
      'Vues': Object.keys(views).length
    };
    
    console.log('âœ“ Portfolio Jef Ly - Ã‰tat des composants:', elementsCheck);
    
    // Animation d'entrÃ©e du dock
    const dock = document.querySelector('.dock');
    if (dock) {
      dock.style.animation = 'slideInUp 0.8s ease';
    }
    
    console.log('âœ“ Tous les systÃ¨mes sont opÃ©rationnels!');
  }, 100);
});

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join(',') === konamiPattern.join(',')) {
    document.body.style.animation = 'glow 2s infinite';
    
    // Message spÃ©cial
    const easterEgg = document.createElement('div');
    easterEgg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 24px 36px;
      background: linear-gradient(135deg, #9d7cff, #3ea6ff);
      color: white;
      border-radius: 16px;
      font-size: 20px;
      font-weight: bold;
      z-index: 9999;
      animation: pulse 1s infinite;
    `;
    easterEgg.textContent = 'ðŸŽ® Konami Code activÃ©! Vous Ãªtes un vrai gamer!';
    document.body.appendChild(easterEgg);
    
    setTimeout(() => {
      document.body.style.animation = '';
      easterEgg.remove();
    }, 5000);
  }
});

// ========================================
// PERFORMANCE - LAZY LOADING
// ========================================

if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// LOG DE BIENVENUE
// ========================================

console.log('%cðŸš€ Portfolio Jef Ly', 'font-size: 24px; font-weight: bold; color: #3ea6ff;');
console.log('%cDÃ©veloppeur Full Stack passionnÃ©', 'font-size: 14px; color: #7ad1c2;');
console.log('%cðŸ“§ contact@jefly.dev', 'font-size: 12px; color: #b9c2cf;');
console.log('%cðŸ”— github.com/Unybudy', 'font-size: 12px; color: #b9c2cf;');
