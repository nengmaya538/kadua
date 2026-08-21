(function () {
    "use strict";

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const VAST_URL =
        "https://vast.vstserv.com/vast?spot_id=2026771";

    const YOUTUBE_URL =
        "https://www.youtube.com/embed/lLv5TZv2JLA?autoplay=1&mute=1&rel=0";


    /* =====================================================
       CREATE STYLE
       No html/body styling
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `
        #vastPopup {
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100vh;
            background: #000;
            z-index: 2147483647;
        }

        #vastVideo,
        #youtubeFrame {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }

        #vastVideo {
            display: block;
            background: #000;
            object-fit: contain;
        }

        #youtubeFrame {
            display: none;
        }

        #vastStatus {
            position: absolute;
            top: 15px;
            left: 15px;
            z-index: 20;
            padding: 7px 10px;
            background: rgba(0,0,0,.65);
            color: #fff;
            font: 13px Arial, sans-serif;
            border-radius: 4px;
        }

        #closeVastPopup {
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 50;
            display: none;
            width: 42px;
            height: 42px;
            border: 0;
            border-radius: 50%;
            background: rgba(0,0,0,.8);
            color: #fff;
            font-size: 28px;
            line-height: 42px;
            padding: 0;
            cursor: pointer;
        }

        #closeVastPopup:hover {
            background: rgba(0,0,0,1);
        }
    `;

    document.head.appendChild(style);


    /* =====================================================
       CREATE POPUP
    ===================================================== */

    const popup =
        document.createElement("div");

    popup.id = "vastPopup";

    popup.innerHTML = `
        <video
            id="vastVideo"
            playsinline
            muted
            preload="auto">
        </video>

        <iframe
            id="youtubeFrame"
            src=""
            allow="autoplay; encrypted-media; fullscreen"
            allowfullscreen>
        </iframe>

        <div id="vastStatus">
            Loading advertisement...
        </div>

        <button
            id="closeVastPopup"
            type="button"
            aria-label="Close">
            ×
        </button>
    `;

    document.body.appendChild(popup);


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const video =
        document.getElementById("vastVideo");

    const youtube =
        document.getElementById("youtubeFrame");

    const status =
        document.getElementById("vastStatus");

    const closeButton =
        document.getElementById("closeVastPopup");


    /* =====================================================
       CLOSE BUTTON
       Appears after 20 seconds.
       Independent from VAST duration.
    ===================================================== */

    setTimeout(function () {

        if (!popup.isConnected) return;

        closeButton.style.display = "block";

    }, 20000);


    /* =====================================================
       CLOSE POPUP
    ===================================================== */

    closeButton.addEventListener(
        "click",
        function () {

            video.pause();

            video.removeAttribute("src");

            video.load();

            youtube.src =
                "about:blank";

            popup.remove();

            style.remove();

        }
    );


    /* =====================================================
       CLEAN URL
    ===================================================== */

    function cleanURL(value) {

        if (!value) return null;

        return value
            .trim()
            .replace(/^<!\[CDATA\[/, "")
            .replace(/\]\]>$/, "")
            .trim();
    }


    /* =====================================================
       ABSOLUTE URL
    ===================================================== */

    function absoluteURL(url, base) {

        try {

            return new URL(
                url,
                base
            ).href;

        } catch (e) {

            return url;

        }
    }


    /* =====================================================
       FIND MEDIA FILE
    ===================================================== */

    function findMediaFile(xml) {

        const files =
            Array.from(
                xml.querySelectorAll(
                    "MediaFile"
                )
            );


        if (!files.length) {
            return null;
        }


        /*
         * Prefer MP4.
         */

        for (const file of files) {

            const type =
                (
                    file.getAttribute("type")
                    || ""
                ).toLowerCase();

            const url =
                cleanURL(
                    file.textContent
                );


            if (!url) continue;


            if (
                type === "video/mp4" ||
                type.includes("mp4") ||
                /\.mp4(\?|$)/i.test(url)
            ) {

                return url;

            }
        }


        /*
         * Fallback.
         */

        for (const file of files) {

            const url =
                cleanURL(
                    file.textContent
                );

            if (url) {
                return url;
            }
        }


        return null;
    }


    /* =====================================================
       FIND VAST WRAPPER
    ===================================================== */

    function findWrapperURL(xml) {

        const node =
            xml.querySelector(
                "VASTAdTagURI"
            );


        if (!node) {
            return null;
        }


        return cleanURL(
            node.textContent
        );
    }


    /* =====================================================
       FETCH VAST
    ===================================================== */

    async function fetchVAST(url) {

        console.log(
            "[VAST] Request:",
            url
        );


        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    mode: "cors",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "VAST HTTP " +
                response.status
            );
        }


        const text =
            await response.text();


        if (!text) {

            throw new Error(
                "Empty VAST response"
            );
        }


        console.log(
            "[VAST] Response received:",
            text.substring(0, 500)
        );


        const parser =
            new DOMParser();


        const xml =
            parser.parseFromString(
                text,
                "application/xml"
            );


        if (
            xml.querySelector(
                "parsererror"
            )
        ) {

            throw new Error(
                "Invalid VAST XML"
            );
        }


        return xml;
    }


    /* =====================================================
       RESOLVE VAST
       Inline + Wrapper
    ===================================================== */

    async function resolveVAST(
        startURL
    ) {

        let currentURL =
            startURL;


        /*
         * Maximum 5 wrapper levels.
         */

        for (
            let attempt = 0;
            attempt < 5;
            attempt++
        ) {

            status.textContent =
                "Loading advertisement...";


            const xml =
                await fetchVAST(
                    currentURL
                );


            /*
             * Look for MediaFile.
             */

            const mediaURL =
                findMediaFile(
                    xml
                );


            if (mediaURL) {

                console.log(
                    "[VAST] Media found:",
                    mediaURL
                );


                return {
                    mediaURL:
                        absoluteURL(
                            mediaURL,
                            currentURL
                        )
                };
            }


            /*
             * Look for Wrapper.
             */

            const wrapperURL =
                findWrapperURL(
                    xml
                );


            if (!wrapperURL) {

                throw new Error(
                    "No MediaFile or VAST Wrapper found"
                );
            }


            currentURL =
                absoluteURL(
                    wrapperURL,
                    currentURL
                );


            console.log(
                "[VAST] Following Wrapper:",
                currentURL
            );
        }


        throw new Error(
            "Too many VAST Wrapper levels"
        );
    }


    /* =====================================================
       SHOW YOUTUBE
    ===================================================== */

    function showYouTube() {

        console.log(
            "[PLAYER] Showing YouTube"
        );


        video.pause();

        video.style.display =
            "none";


        status.style.display =
            "none";


        youtube.src =
            YOUTUBE_URL;


        youtube.style.display =
            "block";
    }


    /* =====================================================
       PLAY VAST
    ===================================================== */

    async function playVAST() {

        try {

            status.textContent =
                "Loading advertisement...";


            const result =
                await resolveVAST(
                    VAST_URL
                );


            console.log(
                "[VAST] Final media:",
                result.mediaURL
            );


            video.src =
                result.mediaURL;

            video.muted =
                true;

            video.playsInline =
                true;

            video.load();


            status.textContent =
                "Advertisement playing...";


            await video.play();


            console.log(
                "[VAST] Playback started"
            );


        } catch (error) {

            console.error(
                "[VAST] ERROR:",
                error
            );


            status.textContent =
                "Advertisement unavailable";


            setTimeout(
                function () {

                    showYouTube();

                },
                1000
            );
        }
    }


    /* =====================================================
       VAST FINISHED
    ===================================================== */

    video.addEventListener(
        "ended",
        function () {

            console.log(
                "[VAST] Advertisement finished"
            );

            showYouTube();

        }
    );


    /* =====================================================
       VAST PLAYBACK ERROR
    ===================================================== */

    video.addEventListener(
        "error",
        function () {

            console.error(
                "[VAST] Video playback error:",
                video.error
            );

            showYouTube();

        }
    );


    /* =====================================================
       START
    ===================================================== */

    playVAST();

})();
