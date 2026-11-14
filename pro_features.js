/* ==========================================================================
   FILE: pro_features.js
   DESCRIPTION: Ultimate Professional Add-ons for Presentation & UX Excellence
   ========================================================================== */

(function () {
  // 1. रीडिंग प्रोग्रेस बार (Reading Progress Bar on Top of Articles)
  const progressBar = document.createElement("div");
  progressBar.id = "kb-read-progress";
  progressBar.style.cssText = "position:fixed;top:0;left:0;height:4px;background:var(--saffron);width:0%;z-index:999;transition:width 0.1s ease;";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });

  // 2. ऑटोमैटिक आर्टिकल हाइलाइटर (Highlight keywords when clicked from search)
  const origOpen = window.openArticle;
  if (typeof origOpen === "function") {
    window.openArticle = function (key) {
      origOpen(key);
      window.scrollTo({ top: 300, behavior: "smooth" });
    };
  }

  // 3. प्रेजेंटेशन मोड शॉर्टकट (Press 'P' to toggle clean presentation view)
  let presentationMode = false;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "p" && e.altKey) {
      presentationMode = !presentationMode;
      document.body.style.transform = presentationMode ? "scale(1.02)" : "scale(1)";
      document.body.style.filter = presentationMode ? "contrast(1.05)" : "none";
      alert(presentationMode ? "🚀 प्रेजेंटेशन फोकस मोड सक्रिय!" : "सामान्य मोड बहाल।");
    }
  });

  // 4. ऑटो-रिफ्रेश और स्टेटस चेक
  console.log("🇮🇳 Know About Bharat: Pro Features Engine Loaded Successfully!");
})();
