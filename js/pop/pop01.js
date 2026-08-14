// /js/opop2-sidebar.js

function showSidebarPopup() {
    if (document.getElementById('sidebarPopup')) return;

    // Main container - slides from right
    const container = document.createElement('div');
    container.id = 'sidebarPopup';
    container.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        max-width: 500px;
        height: 100vh;
        z-index: 99999;
        background: #0a0a0a;
        transform: translateX(100%);
        animation: slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        box-shadow: -10px 0 40px rgba(0,0,0,0.8);
        overflow: hidden;
    `;

    // Header with gradient
    const header = document.createElement('div');
    header.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        padding: 20px 25px;
        background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%);
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    // Title
    const title = document.createElement('div');
    title.style.cssText = `
        color: white;
        font-family: 'Segoe UI', sans-serif;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 0.5px;
    `;
    title.innerHTML = '🎬 Premium Content';

    // Close button - minimal
    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
        background: rgba(255,255,255,0.1);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    closeBtn.innerHTML = '✕';
    closeBtn.onmouseover = () => {
        closeBtn.style.background = 'rgba(255,69,69,0.4)';
    };
    closeBtn.onmouseout = () => {
        closeBtn.style.background = 'rgba(255,255,255,0.1)';
    };
    closeBtn.onclick = closeSidebarPopup;

    // Timer - bottom left corner
    const timer = document.createElement('div');
    timer.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 30px;
        z-index: 10;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(10px);
        padding: 15px 25px;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.08);
        color: white;
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    timer.innerHTML = `
        <div style="width: 4px; height: 30px; background: linear-gradient(to bottom, #ff6b6b, #ffd93d); border-radius: 2px;"></div>
        <div>
            <div style="font-size: 11px; opacity: 0.5; margin-bottom: 2px;">CLOSES IN</div>
            <strong id="sidebarTimer" style="font-size: 20px;">15</strong><span style="font-size: 14px; opacity: 0.5;">s</span>
        </div>
    `;

    // Iframe
    const frame = document.createElement('div');
    frame.style.cssText = `
        width: 100%;
        height: 100%;
        position: relative;
    `;

    const urls = ["https://desi-porntube.com/embed/502523/?promo=40266" /* ... semua URL ... */];
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];

    const iframe = document.createElement('iframe');
    iframe.src = randomUrl + '&autoplay=1&muted=1';
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        position: absolute;
        top: 0;
        left: 0;
    `;
    iframe.setAttribute('allow', 'autoplay; fullscreen');
    iframe.setAttribute('allowfullscreen', '');

    // Backdrop overlay (click outside to close)
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 99998;
        background: rgba(0,0,0,0.5);
        opacity: 0;
        animation: fadeIn 0.5s ease 0.1s forwards;
        cursor: pointer;
    `;
    backdrop.onclick = closeSidebarPopup;

    // Assemble
    frame.appendChild(iframe);
    header.appendChild(title);
    header.appendChild(closeBtn);
    container.appendChild(header);
    container.appendChild(timer);
    container.appendChild(frame);
    
    document.body.appendChild(backdrop);
    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';

    // Animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Countdown
    let timeLeft = 15;
    const timerInterval = setInterval(() => {
        timeLeft--;
        const timerEl = document.getElementById('sidebarTimer');
        if (timerEl) timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timer.style.opacity = '0.3';
            timer.style.transition = 'opacity 0.5s ease';
        }
    }, 1000);
}

function closeSidebarPopup() {
    const container = document.getElementById('sidebarPopup');
    const backdrop = document.querySelector('#sidebarPopup ~ div');
    
    if (container) {
        container.style.transform = 'translateX(100%)';
        container.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => {
            container.remove();
            if (backdrop) backdrop.remove();
            document.body.style.overflow = '';
        }, 400);
    }
}
