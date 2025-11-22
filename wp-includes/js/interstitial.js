(() => {
  // --- CONFIG ---
  const IMAGE_BASE = "/wp-content/uploads/2025/09/TotalAV-Offer";
  const IMAGE_COUNT = 4; 
  const CLICK_URL = "/link?offer=totalav&source=theprotect_interstitial";
  const SHOW_ON_MOBILE = false;
  const STORAGE_KEY = "exitIntentShown";

  // --- PICK RANDOM IMAGE ---
  const randomIndex = Math.floor(Math.random() * IMAGE_COUNT) + 1;
  const IMAGE_SRC = `${IMAGE_BASE}${randomIndex}.png`;

  // --- PRELOAD IMAGE ---
  const preloadImg = new Image();
  preloadImg.src = IMAGE_SRC;
  preloadImg.onload = () => {
    initExitIntent();
  };

  // --- STYLE INJECTION ---
  function injectStyles() {
    if (document.getElementById("exit-intent-styles")) return;
    const css = `
      #exit-intent-overlay {
        position: fixed; inset: 0; display: none;
        align-items: center; justify-content: center;
        background: rgba(0,0,0,.65);
        z-index: 99999;
        transition: opacity .3s ease;
        opacity: 0;
      }
      #exit-intent-overlay[aria-hidden="false"] {
        display: flex; opacity: 1;
      }
      .exit-intent-modal {
        position: relative; max-width: min(90vw, 720px);
        max-height: 90vh; background: transparent; outline: none;
        animation: fadeIn .4s ease;
      }
      .exit-intent-img {
        display: block; max-width: 100%; max-height: 80vh;
        border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.35);
        cursor: pointer;
      }
      .exit-intent-close {
        position: absolute; top: -12px; right: -12px;
        width: 36px; height: 36px; border: none; border-radius: 50%;
        background: #fff; color: #111; cursor: pointer;
        font-size: 22px; line-height: 36px;
        box-shadow: 0 4px 12px rgba(0,0,0,.25);
      }
      .exit-intent-close:hover { filter: brightness(.9); }
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(.9); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    const style = document.createElement("style");
    style.id = "exit-intent-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  // --- OVERLAY BUILDER ---
  function buildOverlay() {
    if (document.getElementById("exit-intent-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "exit-intent-overlay";
    overlay.setAttribute("aria-hidden", "true");

    const modal = document.createElement("div");
    modal.className = "exit-intent-modal";

    const closeBtn = document.createElement("button");
    closeBtn.className = "exit-intent-close";
    closeBtn.innerHTML = "&times;";

    const link = document.createElement("a");
    link.id = 'exit-intent-link';
    link.href = CLICK_URL;
    link.target = "_blank";
    link.rel = "noopener nofollow sponsored";

    const img = document.createElement("img");
    img.className = "exit-intent-img";
    img.src = IMAGE_SRC;
    img.alt = "Special Offer";

    link.appendChild(img);
    modal.appendChild(closeBtn);
    modal.appendChild(link);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close behavior
    const close = () => {
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.removeProperty("overflow");
    };
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  // --- SHOW FUNCTION ---
  function showOverlay() {
    injectStyles();
    buildOverlay();
    const overlay = document.getElementById("exit-intent-overlay");
    overlay.setAttribute("aria-hidden", "false");
 
 const query = window.location.search;
    if (query) {
      const link = overlay.querySelector("#exit-intent-link");
      if (link) {
        try {
          const url = new URL(link.href, window.location.origin);
          url.search += (url.search ? '&' : '?') + query.slice(1);
          link.href = url.toString();
        } catch {}
      }
    }




    document.body.style.overflow = "hidden";
  }

  // --- EXIT INTENT LOGIC ---
  function shouldTrigger(e) {
    if (sessionStorage.getItem(STORAGE_KEY)) return false;
    if (!SHOW_ON_MOBILE && (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent))) return false;
    return e.clientY <= 0 || (!e.relatedTarget && e.toElement === null);
  }

  function onMouseOut(e) {
    if (!shouldTrigger(e)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(showOverlay, 50);
    window.removeEventListener("mouseout", onMouseOut);
    document.removeEventListener("mouseleave", onMouseLeave);
  }

  function onMouseLeave() {
    onMouseOut({ clientY: 0, relatedTarget: null, toElement: null });
  }

  // --- INITIALIZE ---
  function initExitIntent() {
    window.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onMouseLeave);
  }


})();



window.onload = function() {
    const query = window.location.search;
          if (!query) return;
    
    function gtag_report_conversion(url) {
      var callback = function () {
        if (typeof(url) !== 'undefined') {
          window.location = url;
        }
      };
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-17668588145/mIkVCMKExb4bEPGEhelB',
          'event_callback': callback
        });
      } else {
        console.error('gtag is not defined');
      }
      return false;
    }
    
    document.querySelectorAll('a.btn-website').forEach(a => {
            try {
              const url = new URL(a.href, window.location.origin);
              url.search += (url.search ? '&' : '?') + query.slice(1);
              a.href = url.toString();
            } catch {}
    });
                
     const allowedCids = [
        "AkqvrGuy1cVzMbgwY",
        "xFLIbT0jtkm1AQaZk",
        "hwwEEYjhdRdXIZv"
      ];

  const params = new URLSearchParams(window.location.search);
  const cid = params.get('campaignid');

  if (!!cid && allowedCids.includes(cid)){
      document.querySelectorAll('a.btn-website').forEach(link => {
        link.addEventListener('click', function(e) {
          gtag_report_conversion();
        });
      });
  }
};





