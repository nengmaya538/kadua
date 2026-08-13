// ============================================================
// FULLSCREEN POPUP - VIA JAVASCRIPT INJECT
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // DAFTAR LINK IFRAME - RANDOM
    // ============================================================
    const _fs_links = [
        "https://videovoyeurhit.com/embed/362993/?source=1594287872",
        "https://videovoyeurhit.com/embed/362971/?source=1594287872",
        "https://videovoyeurhit.com/embed/362963/?source=1594287872",
        "https://videovoyeurhit.com/embed/362813/?source=1594287872",
        "https://videovoyeurhit.com/embed/362747/?source=1594287872",
        "https://videovoyeurhit.com/embed/362727/?source=1594287872",
        "https://videovoyeurhit.com/embed/362483/?source=1594287872",
        "https://videovoyeurhit.com/embed/362471/?source=1594287872",
        "https://videovoyeurhit.com/embed/362159/?source=1594287872"
    ];

    // Pilih random
    const _fs_randomIndex = Math.floor(Math.random() * _fs_links.length);
    const _fs_randomLink = _fs_links[_fs_randomIndex];

    // ============================================================
    // CSS
    // ============================================================
    const _fs_style = document.createElement('style');
    _fs_style.textContent = `
        /* FULLSCREEN - HITAM PEKAT */
        ._fs_overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000000;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
        }

        ._fs_popup {
            width: 100vw;
            height: 100vh;
            background: #000000;
            position: relative;
        }

        ._fs_video {
            width: 100vw;
            height: 100vh;
        }

        ._fs_video iframe {
            width: 100vw;
            height: 100vh;
            border: none;
            display: block;
        }

        ._fs_topbar {
            position: absolute;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 30;
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 60px;
            padding: 6px 6px 6px 20px;
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
            user-select: none;
            transition: opacity 0.4s ease;
        }

        ._fs_badge {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: Arial, sans-serif;
        }

        ._fs_badge svg {
            width: 16px;
            height: 16px;
            fill: none;
            stroke: rgba(255, 255, 255, 0.7);
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        ._fs_badge span {
            font-size: 12px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }

        ._fs_separator {
            width: 1px;
            height: 24px;
            background: rgba(255, 255, 255, 0.1);
        }

        ._fs_countdown {
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: Arial, sans-serif;
        }

        ._fs_countdown ._fs_icon {
            font-size: 16px;
            opacity: 0.6;
        }

        ._fs_countdown ._fs_number {
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            min-width: 28px;
            text-align: center;
        }

        ._fs_countdown ._fs_text {
            font-size: 13px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.4);
        }

        ._fs_countdown ._fs_dot {
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            display: inline-block;
            animation: _fs_pulse 1s ease-in-out infinite;
        }

        @keyframes _fs_pulse {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.3); }
        }

        ._fs_close {
            display: none;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.95);
            border: none;
            border-radius: 50px;
            padding: 10px 22px 10px 18px;
            color: #1a1a1a;
            font-size: 15px;
            font-weight: 700;
            font-family: Arial, sans-serif;
            cursor: pointer;
            transition: 0.2s;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            letter-spacing: 0.3px;
        }

        ._fs_close:hover {
            background: #ffffff;
            transform: scale(1.04);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        }

        ._fs_close:active {
            transform: scale(0.95);
        }

        ._fs_close._fs_show {
            display: flex;
            animation: _fs_fadeIn 0.3s ease;
        }

        ._fs_close svg {
            width: 18px;
            height: 18px;
            stroke: #1a1a1a;
            stroke-width: 2.5;
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        @keyframes _fs_fadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        ._fs_topbar._fs_hide ._fs_countdown {
            display: none;
        }

        @media (max-width: 768px) {
            ._fs_topbar {
                top: 18px;
                padding: 5px 5px 5px 16px;
                gap: 10px;
                border-radius: 50px;
            }
            ._fs_badge span {
                font-size: 11px;
                letter-spacing: 0.5px;
            }
            ._fs_countdown ._fs_number {
                font-size: 16px;
                min-width: 24px;
            }
            ._fs_countdown ._fs_text {
                font-size: 12px;
            }
            ._fs_countdown ._fs_icon {
                font-size: 14px;
            }
            ._fs_countdown ._fs_dot {
                width: 5px;
                height: 5px;
            }
            ._fs_separator {
                height: 20px;
            }
            ._fs_close {
                padding: 8px 18px 8px 14px;
                font-size: 13px;
                gap: 8px;
                border-radius: 40px;
            }
            ._fs_close svg {
                width: 16px;
                height: 16px;
            }
        }

        @media (max-width: 480px) {
            ._fs_topbar {
                top: 14px;
                padding: 4px 4px 4px 12px;
                gap: 8px;
                border-radius: 40px;
            }
            ._fs_badge svg {
                width: 13px;
                height: 13px;
            }
            ._fs_badge span {
                font-size: 9px;
                letter-spacing: 0.3px;
            }
            ._fs_countdown ._fs_number {
                font-size: 14px;
                min-width: 20px;
            }
            ._fs_countdown ._fs_text {
                font-size: 10px;
            }
            ._fs_countdown ._fs_icon {
                font-size: 12px;
            }
            ._fs_countdown ._fs_dot {
                width: 4px;
                height: 4px;
            }
            ._fs_separator {
                height: 16px;
            }
            ._fs_close {
                padding: 6px 12px 6px 10px;
                font-size: 11px;
                gap: 6px;
                border-radius: 30px;
            }
            ._fs_close svg {
                width: 13px;
                height: 13px;
            }
        }

        @media (max-width: 380px) {
            ._fs_topbar {
                top: 10px;
                padding: 3px 3px 3px 10px;
                gap: 6px;
                border-radius: 30px;
            }
            ._fs_badge span {
                font-size: 8px;
                letter-spacing: 0.2px;
            }
            ._fs_countdown ._fs_number {
                font-size: 12px;
                min-width: 16px;
            }
            ._fs_countdown ._fs_text {
                font-size: 9px;
            }
            ._fs_countdown ._fs_icon {
                font-size: 10px;
            }
            ._fs_separator {
                height: 14px;
            }
            ._fs_close {
                padding: 5px 10px 5px 8px;
                font-size: 10px;
                gap: 5px;
                border-radius: 20px;
            }
            ._fs_close svg {
                width: 12px;
                height: 12px;
            }
        }
    `;
    document.head.appendChild(_fs_style);

    // ============================================================
    // HTML
    // ============================================================
    const _fs_html = document.createElement('div');
    _fs_html.innerHTML = `
        <div class="_fs_overlay" id="_fs_overlay">
            <div class="_fs_popup">
                <div class="_fs_topbar" id="_fs_topbar">
                    <div class="_fs_badge">
                        <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4l3 3" />
                        </svg>
                        <span>Sponsored</span>
                    </div>
                    <span class="_fs_separator"></span>
                    <div class="_fs_countdown">
                        <span class="_fs_icon">⏳</span>
                        <span class="_fs_number" id="_fs_number">15</span>
                        <span class="_fs_text">sec</span>
                        <span class="_fs_dot"></span>
                    </div>
                    <span class="_fs_separator" id="_fs_sep_close"></span>
                    <button class="_fs_close" id="_fs_close">
                        <svg viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Close
                    </button>
                </div>
                <div class="_fs_video">
                    <iframe id="_fs_iframe"
                        allow="autoplay; fullscreen"
                        frameborder="0" 
                        allowfullscreen 
                        webkitallowfullscreen 
                        mozallowfullscreen 
                        oallowfullscreen 
                        msallowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(_fs_html.firstElementChild);

    // ============================================================
    // JAVASCRIPT - SET IFRAME & COUNTDOWN
    // ============================================================
    const _fs_iframe = document.getElementById('_fs_iframe');
    if (_fs_iframe) {
        _fs_iframe.src = _fs_randomLink;
    }

    const _fs_overlay = document.getElementById('_fs_overlay');
    const _fs_close = document.getElementById('_fs_close');
    const _fs_number = document.getElementById('_fs_number');
    const _fs_topbar = document.getElementById('_fs_topbar');
    const _fs_sep_close = document.getElementById('_fs_sep_close');

    let _fs_seconds = 15;

    function _fs_startCountdown() {
        _fs_seconds = 15;
        _fs_number.textContent = _fs_seconds;

        const timer = setInterval(function() {
            _fs_seconds--;
            if (_fs_seconds > 0) {
                _fs_number.textContent = _fs_seconds;
            } else {
                clearInterval(timer);
                _fs_topbar.classList.add('_fs_hide');
                _fs_close.classList.add('_fs_show');
                if (_fs_sep_close) {
                    _fs_sep_close.style.display = 'block';
                }
            }
        }, 1000);
    }

    _fs_startCountdown();

    _fs_close.addEventListener('click', function() {
        _fs_overlay.style.display = 'none';
    });

})();
