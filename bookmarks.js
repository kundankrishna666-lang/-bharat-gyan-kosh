/* ==========================================================================
   FILE: bookmarks.js
   DESCRIPTION: Adds Interactive Bookmarks & Reading History Panel
   ========================================================================== */

(function () {
  // 1. स्टोरेज से डेटा निकालना
  let bookmarks = JSON.parse(localStorage.getItem("kb_bookmarks") || "[]");
  let history = JSON.parse(localStorage.getItem("kb_history") || "[]");

  // 2. जब भी कोई लेख खुले, उसे हिस्ट्री में जोड़ें
  const origOpenArticle = window.openArticle;
  if (typeof origOpenArticle === "function") {
    window.openArticle = function (key) {
      origOpenArticle(key);
      
      // हिस्ट्री में जोड़ें (डुप्लीकेट हटाकर)
      if (!history.includes(key)) {
        history.unshift(key);
        if (history.length > 10) history.pop(); // अधिकतम 10 लेख सुरक्षित रखें
        localStorage.setItem("kb_history", JSON.stringify(history));
      }
      
      renderBookmarkButton(key);
    };
  }

  // 3. लेख के अंदर बुकमार्क बटन दिखाना
  function renderBookmarkButton(articleKey) {
    const titleEl = document.getElementById("articleTitle");
    if (!titleEl) return;

    let btn = document.getElementById("kb-bookmark-btn");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "kb-bookmark-btn";
      btn.className = "btn btn-light";
      btn.style.cssText = "margin-left:10px;font-size:12px;padding:4px 10px;";
      titleEl.appendChild(btn);
    }

    const isBookmarked = bookmarks.includes(articleKey);
    btn.textContent = isBookmarked ? "⭐ बुकमार्क किया गया" : "☆ बुकमार्क करें";

    btn.onclick = () => {
      if (isBookmarked) {
        bookmarks = bookmarks.filter(k => k !== articleKey);
      } else {
        bookmarks.push(articleKey);
      }
      localStorage.setItem("kb_bookmarks", JSON.stringify(bookmarks));
      renderBookmarkButton(articleKey);
    };
  }

  // 4. होमपेज पर बुकमार्क और हिस्ट्री का एक सुंदर फ्लोटिंग पैनल या सेक्शन जोड़ना
  const nav = document.querySelector("nav");
  if (nav) {
    const panel = document.createElement("div");
    panel.style.cssText = "background:var(--card);border-top:1px solid var(--line);padding:8px 6%;font-size:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;color:var(--muted);";
    panel.innerHTML = `
      <span>📌 सहेजे गए लेख (Bookmarks): <strong id="kb-bm-count">${bookmarks.length}</strong></span>
      <span>⚡ आपके द्वारा पढ़े गए कुल लेख (History): <strong id="kb-hist-count">${history.length}</strong></span>
    `;
    nav.after(panel);
  }

  console.log("⭐ Bookmark & Reading History Module Loaded Successfully!");
})();
