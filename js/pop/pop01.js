// /js/opop2-neon.js

function showNeonPopup() {
    if (document.getElementById('neonPopup')) return;

    // Main container
    const container = document.createElement('div');
    container.id = 'neonPopup';
    container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        width: 92%;
        max-width: 900px;
        height: 85vh;
        z-index: 99999;
        background: #0a0a0a;
        border-radius: 20px;
        border: 2px solid #00ff41;
        box-shadow: 
            0 0 30px rgba(0, 255, 65, 0.3),
            inset 0 0 30px rgba(0, 255, 65, 0.05),
            0 0 60px rgba(0, 255, 65, 0.1);
        animation: neonPulse 2s ease-in-out infinite;
        overflow: hidden;
        animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    `;

    // Scanline effect overlay
    const scanlines = document.createElement('div');
    scanlines.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.03) 2px,
            rgba(0, 255, 65, 0.03) 4px
        );
        pointer-events: none;
        z-index: 5;
    `;

    // Header with neon glow
    const header = document.createElement('div');
    header.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        padding: 20px 25px;
        background: linear-gradient(180deg, rgba(0,0,0,0.95) 0%, transparent 100%);
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const title = document.createElement('div');
    title.style.cssText = `
        color: #00ff41;
        font-family: 'Courier New', monospace;
        font-size: 20px;
        font-weight: bold;
        text-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
        letter-spacing: 4px;
    `;
    title.innerHTML = '> ACCESS_GRANTED';

    // Close button - neon style
    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
        background: rgba(0, 255, 65, 0.1);
        border: 1px solid #00ff41;
        color: #00ff41;
        width: 45px;
        height: 45px;
        border-radius: 8px;
        font-size: 22px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.1);
    `;
    closeBtn.innerHTML = '✕';
    closeBtn.onmouseover = () => {
        closeBtn.style.background = 'rgba(0, 255, 65, 0.3)';
        closeBtn.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.3)';
    };
    closeBtn.onmouseout = () => {
        closeBtn.style.background = 'rgba(0, 255, 65, 0.1)';
        closeBtn.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.1)';
    };
    closeBtn.onclick = closeNeonPopup;

    // Timer - terminal style
    const timer = document.createElement('div');
    timer.style.cssText = `
        position: absolute;
        bottom: 30px;
        right: 30px;
        z-index: 10;
        background: rgba(0,0,0,0.9);
        border: 1px solid rgba(0, 255, 65, 0.3);
        padding: 12px 20px;
        border-radius: 6px;
        color: #00ff41;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    timer.innerHTML = `
        <span style="opacity:0.5;">[</span>
        <span id="neonTimer" style="font-weight:bold; font-size:18px;">15</span>
        <span style="opacity:0.5;">s]</span>
        <span style="opacity:0.5; margin-left:5px;">⏳</span>
    `;

    // Status indicator
    const status = document.createElement('div');
    status.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 30px;
        z-index: 10;
        display: flex;
        align-items: center;
        gap: 10px;
        color: #00ff41;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        opacity: 0.6;
    `;
    status.innerHTML = `
        <div style="width:8px;height:8px;border-radius:50%;background:#00ff41;box-shadow:0 0 15px #00ff41;animation:blink 1s infinite;"></div>
        <span>LIVE</span>
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

    // Background overlay
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 99998;
        background: rgba(0,0,0,0.85);
        animation: fadeIn 0.5s ease forwards;
    `;

    // Assemble
    frame.appendChild(iframe);
    header.appendChild(title);
    header.appendChild(closeBtn);
    container.appendChild(header);
    container.appendChild(timer);
    container.appendChild(status);
    container.appendChild(scanlines);
    container.appendChild(frame);
    
    document.body.appendChild(backdrop);
    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';

    // Animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes neonPulse {
            0%, 100% { box-shadow: 0 0 30px rgba(0, 255, 65, 0.3), inset 0 0 30px rgba(0, 255, 65, 0.05); }
            50% { box-shadow: 0 0 50px rgba(0, 255, 65, 0.5), inset 0 0 50px rgba(0, 255, 65, 0.1); }
        }
        @keyframes popIn {
            from { 
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to { 
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Countdown
    let timeLeft = 15;
    const timerInterval = setInterval(() => {
        timeLeft--;
        const timerEl = document.getElementById('neonTimer');
        if (timerEl) timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timer.style.opacity = '0.3';
            timer.style.transition = 'opacity 0.5s ease';
            status.innerHTML = `
                <div style="width:8px;height:8px;border-radius:50%;background:#ff6b6b;box-shadow:0 0 15px #ff6b6b;"></div>
                <span>UNLOCKED</span>
            `;
        }
    }, 1000);
}

function closeNeonPopup() {
    const container = document.getElementById('neonPopup');
    const backdrop = document.querySelector('#neonPopup ~ div');
    
    if (container) {
        container.style.transform = 'translate(-50%, -50%) scale(0.8)';
        container.style.opacity = '0';
        container.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => {
            container.remove();
            if (backdrop) backdrop.remove();
            document.body.style.overflow = '';
        }, 400);
    }
}
