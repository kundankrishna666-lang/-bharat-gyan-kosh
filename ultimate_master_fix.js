/* ==========================================================================
   FILE: ultimate_master_fix.js
   DESCRIPTION: Comprehensive Master Fix Script addressing layout issues,
                scrolling friction, mobile responsiveness, floating navigation,
                instant search highlighting, UI enhancements, and auto-error recovery.
   ========================================================================== */

(function () {
  'use strict';

  console.log("🚀 Ultimate Master Fix Engine Initializing...");

  // 1. स्मूथ स्क्रॉलिंग और लेआउट फिक्स (Fixing scrolling & box model issues globally)
  const globalStyle = document.createElement("style");
  globalStyle.id = "kb-ultimate-fixes";
  globalStyle.textContent = `
    html {
      scroll-behavior: smooth;
    }
    body {
      overflow-x: hidden;
      -webkit-tap-highlight-color: transparent;
    }
    /* फ्लोटिंग नेविगेशन डॉक - ताकि कभी भी नीचे स्क्रॉल न करना पड़े */
    .kb-floating-dock {
      position: fixed;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(20, 36, 61, 0.95);
      backdrop-filter: blur(14px);
      padding: 8px 18px;
      border-radius: 35px;
      display: flex;
      gap: 12px;
      z-index: 9999;
      box-shadow: 0 12px 30px rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.2);
    }
    .kb-dock-btn {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 13px;
      font-weight: bold;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 20px;
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .kb-dock-btn:hover {
      background: #e97824;
      color: #fff;
    }
    /* मोबाइल स्क्रीन के लिए परफेक्ट एडजस्टमेंट */
    @media (max-width: 768px) {
      .kb-floating-dock {
        bottom: 10px;
        width: 92%;
        justify-content: space-around;
        padding: 6px 8px;
      }
      .kb-dock-btn {
        font-size: 11px;
        padding: 4px 8px;
      }
    }
    /* सर्च हाइलाइट स्टाइल */
    .kb-highlight {
      background: #fef08a !important;
      color: #713f12 !important;
      padding: 2px 4px;
      border-radius: 4px;
      font-weight: bold;
    }
  `;
  if (!document.getElementById("kb-ultimate-fixes")) {
    document.head.appendChild(globalStyle);
  }

  // 2. ऑटोमैटिक फ्लोटिंग डॉक जनरेटर (सॉल्व्स स्क्रॉलिंग प्रॉब्लम)
  function setupFloatingDock() {
    if (document.getElementById("kb-floating-dock")) return;
    const dock = document.createElement("div");
    dock.id = "kb-floating-dock";
    dock.className = "kb-floating-dock";
    dock.innerHTML = `
      <button class="kb-dock-btn" onclick="window.scrollTo({top:0, behavior:'smooth'})">🏠 शीर्ष</button>
      <button class="kb-dock-btn" onclick="const el=document.querySelector('#kb-advanced-explorer')||document.querySelector('section:nth-of-type(2)'); el?.scrollIntoView({behavior:'smooth'});">🗺️ क्षेत्र दर्शन</button>
      <button class="kb-dock-btn" onclick="const el=document.querySelector('#quiz')||document.querySelector('.quiz-box'); el?.scrollIntoView({behavior:'smooth'});">🎯 क्विज़</button>
      <button class="kb-dock-btn" onclick="window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'})">📜 नीचे</button>
    `;
    document.body.appendChild(dock);
  }

  // 3. स्मार्ट सर्च हाइलाइटर (सॉल्व्स सर्च डेटा विजिबिलिटी प्रॉब्लम)
  function setupSearchHighlighter() {
    const origOpenArticle = window.openArticle;
    if (typeof origOpenArticle === "function" && !window._kbHighlighterHooked) {
      window._kbHighlighterHooked = true;
      window.openArticle = function (key) {
        origOpenArticle(key);
        setTimeout(() => {
          const searchInput = document.querySelector("#kb-search") || document.querySelector("input[type='text']");
          if (!searchInput || !searchInput.value.trim()) return;

          const query = searchInput.value.trim().toLowerCase();
          const contentArea = document.getElementById("articleContent");
          if (!contentArea) return;

          const innerHTML = contentArea.innerHTML;
          const cleanHTML = innerHTML.replace(/<span class="kb-highlight">([^<]+)<\/span>/gi, '$1');
          const regex = new RegExp(`(${query})`, 'gi');
          contentArea.innerHTML = cleanHTML.replace(regex, '<span class="kb-highlight">$1</span>');
        }, 350);
      };
    }
  }

  // 4. ऑटो-एक्टिवेट और एरर प्रिवेंशन (Fixing missing elements & broken states)
  window.addEventListener("DOMContentLoaded", () => {
    setupFloatingDock();
    setupSearchHighlighter();
  });

  // तुरंत रन करने के लिए
  setTimeout(() => {
    setupFloatingDock();
    setupSearchHighlighter();
  }, 500);

  console.log("✨ Ultimate Master Fix Engine Successfully Loaded & Executed!");
})();
