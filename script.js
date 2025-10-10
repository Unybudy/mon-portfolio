// =======================================================
// Interactions macOS-like (horloge, dock, navigation, drag)
// Fichier: script.js
// =======================================================

// Horloge façon macOS (HH:MM + jour abrégé)
const clockEl = document.getElementById('clock');
function fmt(n){ return n.toString().padStart(2,'0'); }
function tick(){
  const d = new Date();
  const days = ['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'];
  clockEl.textContent = `${days[d.getDay()]} ${fmt(d.getHours())}:${fmt(d.getMinutes())}`;
}
tick();
setInterval(tick, 15000);

// Accent toggle (couleur d'accent des contrôles)
const accents = ['#3ea6ff','#7ad1c2','#c9a227','#9d7cff'];
let ai = 0;
document.getElementById('toggle-accent').addEventListener('click', ()=>{
  ai = (ai+1)%accents.length;
  document.documentElement.style.setProperty('--accent', accents[ai]);
});

// Vues (projets / à propos / contact)
const views = {
  projets: document.getElementById('view-projets'),
  apropos: document.getElementById('view-apropos'),
  contact: document.getElementById('view-contact')
};
function show(view){
  for(const k in views){ views[k].hidden = k !== view; }
  document.querySelectorAll('.navbtn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
}
document.querySelectorAll('.navbtn').forEach(b => b.addEventListener('click', ()=> show(b.dataset.view)));
document.querySelectorAll('.dock .icon[data-open], .dock .icon[data-open]').forEach(i => {
  i.addEventListener('click', ()=> show(i.dataset.open));
});
document.querySelectorAll('.dock .icon[data-open]').forEach(i => i.addEventListener('click', ()=> show(i.dataset.open)));

// Recherche dans les projets
const search = document.getElementById('search');
const items = Array.from(document.querySelectorAll('#projects .card'));
if (search){
  search.addEventListener('input', ()=>{
    const q = search.value.trim().toLowerCase();
    items.forEach(it => {
      const t = (it.dataset.text || '').toLowerCase();
      it.style.display = t.includes(q) ? 'block' : 'none';
    });
  });
}

// Segmented control (grille / liste)
const seg = document.querySelectorAll('.seg button');
const grid = document.getElementById('projects');
seg.forEach(b => b.addEventListener('click', ()=>{
  seg.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  if(b.dataset.tab === 'liste'){
    grid.style.gridTemplateColumns = 'repeat(12, 1fr)';
    grid.querySelectorAll('.card').forEach(c => c.style.gridColumn = 'span 12');
  } else {
    grid.style.gridTemplateColumns = 'repeat(12, 1fr)';
    grid.querySelectorAll('.card').forEach(c => c.style.gridColumn = 'span 4');
  }
}));

// Drag de la fenêtre (barre de titre)
(function(){
  const win = document.getElementById('win');
  const drag = document.getElementById('drag');
  let sx=0, sy=0, ox=0, oy=0, down=false;
  const clamp = (v, min, max)=> Math.min(Math.max(v,min), max);
  function onDown(e){
    down = true;
    sx = (e.touches?e.touches[0].clientX:e.clientX);
    sy = (e.touches?e.touches[0].clientY:e.clientY);
    const r = win.getBoundingClientRect();
    ox = r.left; oy = r.top;
  }
  function onMove(e){
    if(!down) return;
    const x = (e.touches?e.touches[0].clientX:e.clientX);
    const y = (e.touches?e.touches[0].clientY:e.clientY);
    let nx = ox + (x - sx);
    let ny = oy + (y - sy);
    const W = window.innerWidth;
    const H = window.innerHeight;
    const rect = win.getBoundingClientRect();
    nx = clamp(nx, 8, W - rect.width - 8);
    ny = clamp(ny, 40, H - rect.height - 80);
    win.style.left = nx + 'px';
    win.style.top = ny + 'px';
  }
  function onUp(){ down = false; }
  drag.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  drag.addEventListener('touchstart', onDown, {passive:true});
  window.addEventListener('touchmove', onMove, {passive:false});
  window.addEventListener('touchend', onUp);
})();

// Soumission du formulaire (pas d'infos perso stockées)
const form = document.getElementById('contact-form');
if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Message envoyé (démo) — Aucune donnée n\'est conservée.');
    form.reset();
  });
}

// Par défaut, afficher Projets
show('projets');
