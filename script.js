function updateClock() {
            const now = new Date();
            document.getElementById('clock').textContent = now.toLocaleTimeString('fr-FR');
        }
        setInterval(updateClock, 1000);
        updateClock();

        let activeWindow = null;
        let isDragging = false;
        let currentX, currentY, initialX, initialY;

        function openWindow(windowName) {
            const win = document.getElementById(windowName + '-window');
            win.style.display = 'block';
            bringToFront(win);
        }

        function closeWindow(windowId) {
            document.getElementById(windowId).style.display = 'none';
        }

        function minimizeWindow(windowId) {
            document.getElementById(windowId).style.display = 'none';
        }

        function bringToFront(element) {
            const windows = document.querySelectorAll('.window');
            windows.forEach(w => w.style.zIndex = 1);
            element.style.zIndex = 10;
        }

        function dragStart(e, windowId) {
            activeWindow = document.getElementById(windowId);
            bringToFront(activeWindow);
            initialX = e.clientX - activeWindow.offsetLeft;
            initialY = e.clientY - activeWindow.offsetTop;
            isDragging = true;
        }

        document.addEventListener('mousemove', (e) => {
            if (isDragging && activeWindow) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                activeWindow.style.left = currentX + 'px';
                activeWindow.style.top = currentY + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        function showMenu() {
            alert('🪟 Menu Démarrer\n\n→ Cliquez sur les icônes pour ouvrir les fenêtres!\n\n✨ Astuce: Vous pouvez déplacer les fenêtres!');
        }

        setTimeout(() => openWindow('about'), 500);
