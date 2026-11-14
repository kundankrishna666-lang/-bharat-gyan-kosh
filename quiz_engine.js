/* ==========================================================================
   FILE: quiz_engine.js
   DESCRIPTION: Dynamic Multi-Category Quiz Generator with Score Badge
   ========================================================================== */

(function () {
  const quizSection = document.querySelector("#quiz .quiz-box");
  if (!quizSection) return;

  const QUESTION_BANK = [
    { cat: "history", q: "सिंधु घाटी सभ्यता का कौन-सा स्थल विशाल स्नानागार (Great Bath) के लिए प्रसिद्ध है?", o: ["हड़प्पा", "मोहनजोदड़ो", "लोथल", "कालीबंगा"], a: 1, e: "मोहनजोदड़ो में विशाल सार्वजनिक स्नानागार के अवशेष मिले हैं।" },
    { cat: "history", q: "सम्राट अशोक ने किस युद्ध के बाद बौद्ध धर्म और अहिंसा का मार्ग अपनाया?", o: ["पानीपत युद्ध", "कलिंग युद्ध", "तराइन युद्ध", "बक्सर युद्ध"], a: 1, e: "261 ईसा पूर्व के कलिंग युद्ध के भीषण नरसंहार के बाद अशोक का हृदय परिवर्तन हुआ।" },
    { cat: "history", q: "प्राचीन नालंदा विश्वविद्यालय की स्थापना किस राजवंश के शासनकाल में हुई थी?", o: ["मौर्य वंश", "गुप्त वंश", "चोल वंश", "सातवाहन वंश"], a: 1, e: "गुप्त शासक कुमारगुप्त प्रथम ने 5वीं शताब्दी में नालंदा विश्वविद्यालय की स्थापना की थी।" },
    { cat: "constitution", q: "भारतीय संविधान को संविधान सभा द्वारा कब अंगीकृत (Adopt) किया गया था?", o: ["15 अगस्त 1947", "26 जनवरी 1950", "26 नवंबर 1949", "2 अक्टूबर 1950"], a: 2, e: "संविधान 26 नवंबर 1949 को अंगीकृत हुआ और 26 जनवरी 1950 को लागू हुआ।" },
    { cat: "constitution", q: "भारतीय संविधान की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?", o: ["डॉ. राजेंद्र प्रसाद", "डॉ. भीमराव आंबेडकर", "पंडित नेहरू", "सरदार पटेल"], a: 1, e: "डॉ. भीमराव आंबेडकर प्रारूप समिति के अध्यक्ष थे।" },
    { cat: "constitution", q: "संविधान के किस भाग में नागरिकों के 'मौलिक अधिकार' वर्णित हैं?", o: ["भाग II", "भाग III", "भाग IV", "भाग V"], a: 1, e: "संविधान के भाग III (अनुच्छेद 12 से 35) में मौलिक अधिकार दिए गए हैं।" },
    { cat: "science", q: "भारत के पहले कृत्रिम उपग्रह 'आर्यभट' का प्रक्षेपण किस वर्ष किया गया था?", o: ["1969", "1975", "1984", "1998"], a: 1, e: "19 अप्रैल 1975 को भारत का पहला उपग्रह आर्यभट प्रक्षेपित किया गया था।" },
    { cat: "science", q: "चंद्रयान-3 ने चंद्रमा के किस हिस्से पर सफलतापूर्वक सॉफ्ट लैंडिंग की?", o: ["उत्तरी ध्रुव", "दक्षिणी ध्रुव", "भूमध्य रेखा", "पश्चिमी भाग"], a: 1, e: "23 अगस्त 2023 को भारत चंद्रमा के दक्षिणी ध्रुव पर उतरने वाला पहला देश बना।" },
    { cat: "science", q: "प्रकाश के प्रकीर्णन (Scattering of Light) की खोज के लिए किस भारतीय वैज्ञानिक को नोबेल पुरस्कार मिला?", o: ["होमी भाभा", "सी. वी. रमन", "जगदीश चंद्र बसु", "विक्रम साराभाई"], a: 1, e: "सर सी. वी. रमन को 'रमन प्रभाव' के लिए 1930 में भौतिकी का नोबेल मिला।" },
    { cat: "geography", q: "भारत की सबसे लंबी नदी कौन-सी है जो पूर्णतः भारत में प्रवाहित होती है?", o: ["ब्रह्मपुत्र", "गंगा", "गोदावरी", "यमुना"], a: 1, e: "गंगा नदी (लगभग 2,525 किमी) भारत की सबसे लंबी और पवित्र नदी है।" },
    { cat: "geography", q: "क्षेत्रफल की दृष्टि से भारत का सबसे बड़ा राज्य कौन-सा है?", o: ["मध्य प्रदेश", "महाराष्ट्र", "राजस्थान", "उत्तर प्रदेश"], a: 2, e: "राजस्थान क्षेत्रफल की दृष्टि से भारत का सबसे बड़ा राज्य है।" },
    { cat: "culture", q: "मधुबनी चित्रकला (मिथिला पेंटिंग) किस राज्य की विश्व प्रसिद्ध लोक कला है?", o: ["ओडिशा", "बिहार", "राजस्थान", "गुजरात"], a: 1, e: "मधुबनी चित्रकला बिहार के मिथिला क्षेत्र की पारंपरिक लोक कला है।" }
  ];

  // नया एडवांस्ड क्विज़ इंटरफेस तैयार करना
  quizSection.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid var(--line);">
      <div>
        <label for="kb-quiz-cat" style="font-size:13px;font-weight:bold;display:block;margin-bottom:4px;">🎯 विषय चुनें (Quiz Generator):</label>
        <select id="kb-quiz-cat" style="padding:8px 12px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-weight:bold;">
          <option value="all">🌐 सभी विषय (मिश्रित प्रश्न)</option>
          <option value="history">🏛️ भारतीय इतिहास</option>
          <option value="constitution">📜 भारतीय संविधान</option>
          <option value="science">🔬 विज्ञान और अंतरिक्ष</option>
          <option value="geography">🌏 भारत का भूगोल</option>
          <option value="culture">🎭 कला और संस्कृति</option>
        </select>
      </div>
      <button class="btn btn-dark" id="kb-gen-quiz" style="font-size:13px;">🎲 नया क्विज़ जेनरेट करें</button>
    </div>

    <div id="kb-quiz-play-area">
      <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-bottom:10px;">
        <span id="kb-q-progress">प्रश्न 1 / 5</span>
        <span id="kb-q-score" style="font-weight:bold;color:var(--green);">स्कोर: 0</span>
      </div>
      <h3 id="kb-q-text" style="margin-bottom:14px;font-size:19px;"></h3>
      <div id="kb-q-opts"></div>
      <p id="kb-q-exp" style="margin-top:12px;font-weight:600;font-size:14px;"></p>
      <div style="margin-top:18px;">
        <button class="btn btn-dark" id="kb-q-next" style="display:none;">अगला प्रश्न →</button>
      </div>
    </div>

    <div id="kb-quiz-summary" style="display:none;text-align:center;padding:20px;">
      <div style="font-size:48px;">🏆</div>
      <h3 id="kb-sum-title" style="font-size:24px;margin:10px 0;color:var(--saffron);">शानदार प्रदर्शन!</h3>
      <p id="kb-sum-text" style="font-size:16px;margin-bottom:18px;"></p>
      <button class="btn btn-dark" id="kb-sum-retry">↻ फिर से नया क्विज़ खेलें</button>
    </div>
  `;

  let activePool = [];
  let idx = 0;
  let score = 0;
  let locked = false;

  function generateNewQuiz() {
    const cat = document.getElementById("kb-quiz-cat").value;
    let filtered = cat === "all" ? [...QUESTION_BANK] : QUESTION_BANK.filter((item) => item.cat === cat);
    // प्रश्नों को रैंडम (Shuffle) करना
    filtered.sort(() => Math.random() - 0.5);
    activePool = filtered.slice(0, 5);
    idx = 0;
    score = 0;

    document.getElementById("kb-quiz-play-area").style.display = "block";
    document.getElementById("kb-quiz-summary").style.display = "none";
    renderQuestion();
  }

  function renderQuestion() {
    locked = false;
    const item = activePool[idx];
    document.getElementById("kb-q-progress").textContent = `प्रश्न ${idx + 1} / ${activePool.length}`;
    document.getElementById("kb-q-score").textContent = `स्कोर: ${score}`;
    document.getElementById("kb-q-text").textContent = `${idx + 1}. ${item.q}`;
    document.getElementById("kb-q-exp").textContent = "";
    document.getElementById("kb-q-next").style.display = "none";

    const optsDiv = document.getElementById("kb-q-opts");
    optsDiv.innerHTML = "";

    item.o.forEach((optText, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = `${String.fromCharCode(65 + i)}. ${optText}`;
      btn.onclick = () => checkAnswer(i, btn);
      optsDiv.appendChild(btn);
    });
  }

  function checkAnswer(selectedIdx, selectedBtn) {
    if (locked) return;
    locked = true;
    const item = activePool[idx];
    const allBtns = document.querySelectorAll("#kb-q-opts .quiz-option");

    allBtns.forEach((b, i) => {
      b.disabled = true;
      if (i === item.a) {
        b.style.borderColor = "#16834a";
        b.style.background = "#dcfce7";
        b.style.color = "#14532d";
        b.style.fontWeight = "bold";
      }
    });

    const expEl = document.getElementById("kb-q-exp");
    if (selectedIdx === item.a) {
      score++;
      expEl.style.color = "#16834a";
      expEl.textContent = "✓ बिल्कुल सही! " + item.e;
    } else {
      selectedBtn.style.borderColor = "#dc2626";
      selectedBtn.style.background = "#fee2e2";
      selectedBtn.style.color = "#7f1d1d";
      expEl.style.color = "#dc2626";
      expEl.textContent = `✕ गलत उत्तर। सही उत्तर: ${item.o[item.a]} — ${item.e}`;
    }

    document.getElementById("kb-q-score").textContent = `स्कोर: ${score}`;
    const nextBtn = document.getElementById("kb-q-next");
    nextBtn.style.display = "inline-block";
    nextBtn.textContent = idx === activePool.length - 1 ? "परिणाम देखें 🏆" : "अगला प्रश्न →";
  }

  document.getElementById("kb-q-next").onclick = () => {
    if (idx < activePool.length - 1) {
      idx++;
      renderQuestion();
    } else {
      document.getElementById("kb-quiz-play-area").style.display = "none";
      const sumDiv = document.getElementById("kb-quiz-summary");
      sumDiv.style.display = "block";
      const pct = Math.round((score / activePool.length) * 100);
      document.getElementById("kb-sum-title").textContent = pct >= 80 ? "🌟 भारत ज्ञान रत्न (उत्कृष्ट!)" : pct >= 50 ? "👏 बहुत अच्छा प्रयास!" : "📚 अभ्यास जारी रखें!";
      document.getElementById("kb-sum-text").textContent = `आपने ${activePool.length} में से ${score} प्रश्नों के सही उत्तर दिए (${pct}%)।`;
    }
  };

  document.getElementById("kb-gen-quiz").onclick = generateNewQuiz;
  document.getElementById("kb-quiz-cat").onchange = generateNewQuiz;
  document.getElementById("kb-sum-retry").onclick = generateNewQuiz;

  generateNewQuiz();
})();
