// Clock
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('fr-FR');
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

// Window management variables
let activeWindow = null;
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;

// Open window function
function openWindow(windowName) {
    const win = document.getElementById(windowName + '-window');
    win.style.display = 'block';
    bringToFront(win);
}

// Close window function
function closeWindow(windowId) {
    document.getElementById(windowId).style.display = 'none';
}

// Minimize window function
function minimizeWindow(windowId) {
    document.getElementById(windowId).style.display = 'none';
}

// Bring window to front
function bringToFront(element) {
    const windows = document.querySelectorAll('.window');
    windows.forEach(w => w.style.zIndex = 1);
    element.style.zIndex = 10;
}

// Drag start
function dragStart(e, windowId) {
    activeWindow = document.getElementById(windowId);
    bringToFront(activeWindow);
    
    initialX = e.clientX - activeWindow.offsetLeft;
    initialY = e.clientY - activeWindow.offsetTop;
    
    isDragging = true;
}

// Mouse move event for dragging
document.addEventListener('mousemove', (e) => {
    if (isDragging && activeWindow) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        
        activeWindow.style.left = currentX + 'px';
        activeWindow.style.top = currentY + 'px';
    }
});

// Mouse up event to stop dragging
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Start menu function
function showMenu() {
    alert('💾 Menu START\n\n→ Cliquez sur les icônes pour ouvrir les fenêtres!\n\n✨ Astuce: Vous pouvez déplacer les fenêtres!');
}

// Auto-open about window on page load
window.addEventListener('load', () => {
    setTimeout(() => openWindow('about'), 500);
});
