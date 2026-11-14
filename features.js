/* ==========================================================================
   FILE: features.js
   DESCRIPTION: Theme Switcher, Text-to-Speech Reader, Interactive State Modal,
                Category Filters & Historical "Did You Know" Engine
   ========================================================================== */

(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ------------------------------------------------------------------------
     1. MULTI-THEME ENGINE (6 थीम्स का नियंत्रण)
     ------------------------------------------------------------------------ */
  const THEMES = [
    { id: "tiranga", label: "🇮🇳 तिरंगा क्लासिक" },
    { id: "isro", label: "🚀 इसरो अंतरिक्ष" },
    { id: "heritage", label: "🏛️ शाही विरासत" },
    { id: "manuscript", label: "📜 प्राचीन पांडुलिपि" },
    { id: "prakriti", label: "🌿 हरित प्रकृति" }
  ];

  function initThemeEngine() {
    const nav = $("nav");
    if (!nav) return;

    const bar = document.createElement("div");
    bar.id = "kb-theme-bar";
    bar.innerHTML = `
      <span style="font-size:13px;font-weight:bold;">🎨 वेबसाइट थीम चुनें:</span>
      <div class="kb-theme-pills" id="kb-theme-pills"></div>
    `;
    nav.after(bar);

    const pillsContainer = $("#kb-theme-pills");
    const savedTheme = localStorage.getItem("kb_active_theme") || "tiranga";

    THEMES.forEach((t) => {
      const btn = document.createElement("button");
      btn.className = "kb-theme-btn" + (t.id === savedTheme ? " active" : "");
      btn.textContent = t.label;
      btn.onclick = () => applyTheme(t.id);
      btn.dataset.tid = t.id;
      pillsContainer.appendChild(btn);
    });

    applyTheme(savedTheme);
  }

  function applyTheme(themeId) {
    document.documentElement.setAttribute("data-bharat-theme", themeId);
    localStorage.setItem("kb_active_theme", themeId);
    $$(".kb-theme-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.tid === themeId);
    });
  }

  /* ------------------------------------------------------------------------
     2. "क्या आप जानते हैं?" (Daily Historical & Scientific Fact Widget)
     ------------------------------------------------------------------------ */
  const BHARAT_FACTS = [
    "शून्य (0) और दशमलव प्रणाली का आविष्कार प्राचीन भारत में हुआ, जिसने आधुनिक गणित और कंप्यूटर विज्ञान की नींव रखी।",
    "भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने पहले ही प्रयास में मंगलयान को मंगल की कक्षा में सफलतापूर्वक स्थापित कर विश्व रिकॉर्ड बनाया।",
    "भारत का संविधान विश्व का सबसे लंबा लिखित संविधान है, जिसे तैयार करने में 2 वर्ष, 11 महीने और 18 दिन लगे।",
    "सिंधु घाटी सभ्यता (लगभग 2600 ईसा पूर्व) में दुनिया की सबसे प्राचीन और उन्नत जल निकासी (Drainage) व्यवस्था मौजूद थी।",
    "नालंदा विश्वविद्यालय (बिहार) विश्व के सबसे प्राचीन आवासीय विश्वविद्यालयों में से एक था, जहाँ दुनिया भर से 10,000 से अधिक छात्र पढ़ने आते थे।",
    "भारत में 22 आधिकारिक भाषाओं के अलावा 1,600 से अधिक बोलियाँ बोली जाती हैं, जो इसे दुनिया का सबसे बड़ा भाषाई विविधता वाला लोकतंत्र बनाती हैं।",
    "चेनाब रेल ब्रिज (जम्मू-कश्मीर) दुनिया का सबसे ऊँचा रेलवे आर्च ब्रिज है, जो एफिल टॉवर से भी ऊँचा है।"
  ];

  function initDailyFactWidget() {
    const homeIntro = $("main > section.section");
    if (!homeIntro) return;

    let idx = Math.floor(Math.random() * BHARAT_FACTS.length);
    const widget = document.createElement("div");
    widget.id = "kb-daily-fact";
    widget.innerHTML = `
      <div style="flex:1;min-width:240px;">
        <strong style="color:var(--saffron);font-size:14px;">💡 क्या आप जानते हैं? (अद्भुत भारत तथ्य)</strong>
        <p id="kb-fact-text" style="margin-top:5px;font-size:15px;font-weight:500;">${BHARAT_FACTS[idx]}</p>
      </div>
      <button class="btn btn-dark" id="kb-next-fact" style="font-size:13px;">अगला तथ्य ↻</button>
    `;
    homeIntro.appendChild(widget);

    $("#kb-next-fact").onclick = () => {
      idx = (idx + 1) % BHARAT_FACTS.length;
      $("#kb-fact-text").textContent = BHARAT_FACTS[idx];
    };
  }

  /* ------------------------------------------------------------------------
     3. CATEGORY FILTER PILLS FOR KNOWLEDGE HUB (#topics)
     ------------------------------------------------------------------------ */
  function initCategoryFilters() {
    const searchWrap = $("#topics .search-wrap");
    const cards = $$("#topicGrid .card");
    if (!searchWrap || !cards.length) return;

    const categories = [
      { id: "all", name: "सभी विषय (9)", keys: [] },
      { id: "hist", name: "🏛️ इतिहास एवं विरासत", keys: [0, 5, 6] },
      { id: "pol", name: "📜 संविधान एवं अर्थव्यवस्था", keys: [2, 8] },
      { id: "sci", name: "🔬 विज्ञान एवं भूगोल", keys: [3, 4] },
      { id: "cul", name: "🎭 संस्कृति एवं व्यक्तित्व", keys: [1, 7] }
    ];

    const bar = document.createElement("div");
    bar.className = "kb-filter-bar";

    categories.forEach((cat, i) => {
      const btn = document.createElement("button");
      btn.className = "kb-filter-btn" + (i === 0 ? " active" : "");
      btn.textContent = cat.name;
      btn.onclick = () => {
        $$(".kb-filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        cards.forEach((card, cardIdx) => {
          if (cat.id === "all" || cat.keys.includes(cardIdx)) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      };
      bar.appendChild(btn);
    });

    searchWrap.before(bar);
  }

  /* ------------------------------------------------------------------------
     4. TEXT-TO-SPEECH (ऑडियो लेख वाचक - Listen to Article)
     ------------------------------------------------------------------------ */
  function initAudioReader() {
    const articleArea = $("#articleArea");
    const articleTitle = $("#articleTitle");
    if (!articleArea || !articleTitle) return;

    const audioBar = document.createElement("div");
    audioBar.className = "kb-audio-bar";
    audioBar.innerHTML = `
      <span style="font-weight:bold;font-size:13px;">🔊 ऑडियो मोड:</span>
      <button class="btn btn-dark" id="kb-tts-play" style="padding:6px 14px;font-size:13px;">▶️ लेख सुनें</button>
      <button class="btn btn-light" id="kb-tts-stop" style="padding:6px 14px;font-size:13px;display:none;">⏹️ रोकें</button>
      <span id="kb-tts-status" style="font-size:12px;color:var(--muted);">ब्राउज़र वॉयस असिस्टेंट तैयार है</span>
    `;
    articleTitle.after(audioBar);

    const playBtn = $("#kb-tts-play");
    const stopBtn = $("#kb-tts-stop");
    const status = $("#kb-tts-status");

    playBtn.onclick = () => {
      if (!("speechSynthesis" in window)) {
        status.textContent = "आपके ब्राउज़र में ऑडियो रीडर उपलब्ध नहीं है।";
        return;
      }
      window.speechSynthesis.cancel();
      const text = $("#articleTitle").innerText + ". " + $("#articleContent").innerText;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = document.documentElement.lang === "en" ? "en-IN" : "hi-IN";
      utterance.rate = 0.95;

      utterance.onstart = () => {
        playBtn.style.display = "none";
        stopBtn.style.display = "inline-block";
        status.textContent = "🎙️ लेख पढ़ा जा रहा है...";
      };
      utterance.onend = () => {
        playBtn.style.display = "inline-block";
        stopBtn.style.display = "none";
        status.textContent = "✅ वाचन पूर्ण हुआ";
      };

      window.speechSynthesis.speak(utterance);
    };

    stopBtn.onclick = () => {
      window.speechSynthesis.cancel();
      playBtn.style.display = "inline-block";
      stopBtn.style.display = "none";
      status.textContent = "⏹️ वाचन रोका गया";
    };
  }

  /* ------------------------------------------------------------------------
     5. INTERACTIVE STATE & UT EXPLORER MODAL (राज्यों पर क्लिक करने पर विवरण)
     ------------------------------------------------------------------------ */
  const STATE_DETAILS = {
    "बिहार": { lang: "हिन्दी, मैथिली, भोजपुरी, मगही", dance: "जट-जटिन, झिझिया, विदेशिया", landmark: "महाबोधि मंदिर (बोधगया), नालंदा खंडहर, राजगीर", fact: "प्राचीन मगध साम्राज्य, बौद्ध और जैन धर्म की जन्मस्थली तथा विश्व के प्रथम गणतंत्र वैशाली की भूमि।" },
    "उत्तर प्रदेश": { lang: "हिन्दी, उर्दू, अवधी, ब्रज", dance: "कथक, रासलीला, नौटंकी", landmark: "ताजमहल, काशी विश्वनाथ, अयोध्या, सारनाथ", fact: "भारत का सबसे अधिक जनसंख्या वाला राज्य और गंगा-यमुना की उपजाऊ संस्कृति का केंद्र।" },
    "राजस्थान": { lang: "हिन्दी, राजस्थानी, मारवाड़ी", dance: "घूमर, कालबेलिया", landmark: "आमेर किला, हवा महल, चित्तौड़गढ़, जैसलमेर", fact: "क्षेत्रफल की दृष्टि से भारत का सबसे बड़ा राज्य, जो अपने शौर्य और भव्य किलों के लिए प्रसिद्ध है।" },
    "महाराष्ट्र": { lang: "मराठी", dance: "लावणी, कोली नृत्य", landmark: "अजंता-एलोरा गुफाएँ, गेटवे ऑफ इंडिया, रायगढ़", fact: "भारत की आर्थिक राजधानी मुंबई का घर और छत्रपति शिवाजी महाराज की वीर भूमि।" },
    "तमिलनाडु": { lang: "तमिल", dance: "भरतनाट्यम", landmark: "मीनाक्षी मंदिर, बृहदीश्वर मंदिर, महाबलीपुरम", fact: "विश्व की प्राचीनतम जीवित शास्त्रीय भाषाओं में से एक तमिल और भव्य द्रविड़ मंदिर स्थापत्य का केंद्र।" },
    "केरल": { lang: "मलयालम", dance: "कथकली, मोहिनीअट्टम", landmark: "मुन्नार, अलेप्पी बैकवाटर्स, पद्मनाभस्वामी मंदिर", fact: "भारत का सबसे अधिक साक्षर राज्य, जिसे 'ईश्वर का अपना देश' और मसालों का बगीचा कहा जाता है।" },
    "पश्चिम बंगाल": { lang: "बांग्ला", dance: "छऊ, बाउल संगीत", landmark: "विक्टोरिया मेमोरियल, सुंदरबन, शांतिनिकेतन", fact: "साहित्य, कला, नवजागरण और नोबेल पुरस्कार विजेता रवींद्रनाथ टैगोर की कर्मभूमि।" },
    "गुजरात": { lang: "गुजराती", dance: "गरबा, डांडिया रास", landmark: "स्टैच्यू ऑफ यूनिटी, गिर वन, धोलावीरा, सोमनाथ", fact: "भारत की सबसे लंबी समुद्री तटरेखा वाला राज्य और महात्मा गांधी व सरदार पटेल की जन्मभूमि।" }
  };

  function initStateModal() {
    const modal = document.createElement("div");
    modal.id = "kb-state-modal";
    modal.innerHTML = `
      <div class="kb-modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <h2 id="kb-m-title" style="color:var(--saffron);">राज्य का नाम</h2>
          <button class="btn btn-dark" id="kb-m-close" style="padding:6px 12px;">✕</button>
        </div>
        <p id="kb-m-cap" style="color:var(--muted);font-weight:bold;margin-top:4px;"></p>
        <div class="kb-modal-grid">
          <div class="kb-stat-box"><small>🗣️ प्रमुख भाषाएँ</small><strong id="kb-m-lang">-</strong></div>
          <div class="kb-stat-box"><small>💃 लोक नृत्य एवं कला</small><strong id="kb-m-dance">-</strong></div>
        </div>
        <div class="kb-stat-box" style="margin-bottom:12px;">
          <small>🏛️ प्रमुख ऐतिहासिक एवं पर्यटन स्थल</small>
          <strong id="kb-m-land">-</strong>
        </div>
        <div class="info-box" id="kb-m-fact" style="margin:0;font-size:14px;"></div>
      </div>
    `;
    document.body.appendChild(modal);

    $("#kb-m-close").onclick = () => modal.classList.remove("open");
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove("open"); };

    $$(".states-grid .state").forEach((card) => {
      card.addEventListener("click", () => {
        const name = card.querySelector("b").textContent.trim();
        const cap = card.querySelector("small").textContent.trim();
        const info = STATE_DETAILS[name] || {
          lang: "क्षेत्रीय भाषाएँ एवं हिन्दी/अंग्रेज़ी",
          dance: "पारंपरिक लोक कला एवं उत्सव",
          landmark: "प्रमुख ऐतिहासिक स्मारक एवं प्राकृतिक स्थल",
          fact: `${name} भारत की सांस्कृतिक, भौगोलिक और प्रशासनिक विविधता का एक अभिन्न और गौरवशाली अंग है।`
        };

        $("#kb-m-title").textContent = "🗺️ " + name;
        $("#kb-m-cap").textContent = cap;
        $("#kb-m-lang").textContent = info.lang;
        $("#kb-m-dance").textContent = info.dance;
        $("#kb-m-land").textContent = info.landmark;
        $("#kb-m-fact").textContent = "✨ विशेष तथ्य: " + info.fact;
        modal.classList.add("open");
      });
    });
  }

  // सभी मॉड्यूल प्रारंभ करें
  initThemeEngine();
  initDailyFactWidget();
  initCategoryFilters();
  initAudioReader();
  initStateModal();
})();
