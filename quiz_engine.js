/* ==========================================================================
   FILE: quiz_engine.js
   DESCRIPTION: Advanced Dynamic Quiz Engine with Large Government/National Data Bank,
                Random Question Shuffling & Downloadable Digital Certificate.
   ========================================================================== */

(function () {
  const quizSection = document.querySelector("#quiz .quiz-box");
  if (!quizSection) return;

  // 🌐 नया और विशाल सरकारी/राष्ट्रीय डेटा प्रश्न बैंक (Expanded Question Bank)
  const QUESTION_BANK = [
    // 🏛️ इतिहास एवं संस्कृति
    { cat: "history", q: "सिंधु घाटी सभ्यता का कौन-सा स्थल विशाल स्नानागार (Great Bath) के लिए प्रसिद्ध है?", o: ["हड़प्पा", "मोहनजोदड़ो", "लोथल", "कालीबंगा"], a: 1, e: "मोहनजोदड़ो में विशाल सार्वजनिक स्नानागार के अवशेष मिले हैं।" },
    { cat: "history", q: "सम्राट अशोक ने किस युद्ध के बाद बौद्ध धर्म और अहिंसा का मार्ग अपनाया?", o: ["पानीपत युद्ध", "कलिंग युद्ध", "तराइन युद्ध", "बक्सर युद्ध"], a: 1, e: "261 ईसा पूर्व के कलिंग युद्ध के भीषण नरसंहार के बाद अशोक का हृदय परिवर्तन हुआ।" },
    { cat: "history", q: "प्राचीन नालंदा विश्वविद्यालय की स्थापना किस राजवंश के शासनकाल में हुई थी?", o: ["मौर्य वंश", "गुप्त वंश", "चोल वंश", "सातवाहन वंश"], a: 1, e: "गुप्त शासक कुमारगुप्त प्रथम ने 5वीं शताब्दी में नालंदा विश्वविद्यालय की स्थापना की थी।" },
    { cat: "history", q: "भारत का राष्ट्रीय गान 'जन गण मन' पहली बार किस वर्ष गाया गया था?", o: ["1905", "1911", "1919", "1947"], a: 1, e: "इसे पहली बार 27 दिसंबर 1911 को कलकत्ता (अब कोलकाता) अधिवेशन में गाया गया था।" },
    { cat: "history", q: "दिल्ली को आधिकारिक रूप से भारत की राजधानी किस वर्ष घोषित किया गया था?", o: ["1911", "1920", "1931", "1947"], a: 2, e: "नई दिल्ली का उद्घाटन 13 फरवरी 1931 को वायसराय लॉर्ड इरविन द्वारा किया गया था।" },

    // 📜 संविधान एवं सरकारी व्यवस्था
    { cat: "constitution", q: "भारतीय संविधान को संविधान सभा द्वारा कब अंगीकृत (Adopt) किया गया था?", o: ["15 अगस्त 1947", "26 जनवरी 1950", "26 नवंबर 1949", "2 अक्टूबर 1950"], a: 2, e: "संविधान 26 नवंबर 1949 को अंगीकृत हुआ और 26 जनवरी 1950 को लागू हुआ।" },
    { cat: "constitution", q: "भारतीय संविधान की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?", o: ["डॉ. राजेंद्र प्रसाद", "डॉ. भीमराव आंबेडकर", "पंडित नेहरू", "सरदार पटेल"], a: 1, e: "डॉ. भीमराव आंबेडकर प्रारूप समिति के अध्यक्ष थे।" },
    { cat: "constitution", q: "संविधान के किस भाग में नागरिकों के 'मौलिक अधिकार' वर्णित हैं?", o: ["भाग II", "भाग III", "भाग IV", "भाग V"], a: 1, e: "संविधान के भाग III (अनुच्छेद 12 से 35) में मौलिक अधिकार दिए गए हैं।" },
    { cat: "constitution", q: "भारतीय संविधान की प्रस्तावना में 'धर्मनिरपेक्ष' (Secular) और 'समाजवादी' शब्द किस संशोधन द्वारा जोड़े गए?", o: ["42वां संशोधन", "44वां संशोधन", "86वां संशोधन", "73वां संशोधन"], a: 0, e: "वर्ष 1976 के 42वें संविधान संशोधन द्वारा ये शब्द प्रस्तावना में जोड़े गए।" },

    // 🔬 विज्ञान, अंतरिक्ष एवं डिजिटल इंडिया (Government Data & Tech)
    { cat: "science", q: "भारत के पहले कृत्रिम उपग्रह 'आर्यभट' का प्रक्षेपण किस वर्ष किया गया था?", o: ["1969", "1975", "1984", "1998"], a: 1, e: "19 अप्रैल 1975 को भारत का पहला उपग्रह आर्यभट प्रक्षेपित किया गया था।" },
    { cat: "science", q: "चंद्रयान-3 ने चंद्रमा के किस हिस्से पर सफलतापूर्वक सॉफ्ट लैंडिंग की?", o: ["उत्तरी ध्रुव", "दक्षिणी ध्रुव", "भूमध्य रेखा", "पश्चिमी भाग"], a: 1, e: "23 अगस्त 2023 को भारत चंद्रमा के दक्षिणी ध्रुव पर उतरने वाला दुनिया का पहला देश बना।" },
    { cat: "science", q: "भारत के डिजिटल भुगतान इकोसिस्टम 'UPI' को किस संस्था द्वारा विकसित और संचालित किया जाता है?", o: ["RBI", "NPCI", "SBI", "SEBI"], a: 1, e: "NPCI (National Payments Corporation of India) द्वारा UPI का संचालन किया जाता है।" },
    { cat: "science", q: "इसरो (ISRO) का मुख्यालय भारत के किस शहर में स्थित है?", o: ["नई दिल्ली", "मुंबई", "बेंगलुरु", "चेन्नई"], a: 2, e: "ISRO का मुख्यालय बेंगलुरु, कर्नाटक में स्थित है।" },

    // 🌏 भारत का भूगोल एवं अर्थव्यवस्था
    { cat: "geography", q: "भारत की सबसे लंबी नदी कौन-सी है जो पूर्णतः भारत में प्रवाहित होती है?", o: ["ब्रह्मपुत्र", "गंगा", "गोदावरी", "यमुना"], a: 1, e: "गंगा नदी (लगभग 2,525 किमी) भारत की सबसे लंबी और पवित्र नदी है।" },
    { cat: "geography", q: "क्षेत्रफल की दृष्टि से भारत का सबसे बड़ा राज्य कौन-सा है?", o: ["मध्य प्रदेश", "महाराष्ट्र", "राजस्थान", "उत्तर प्रदेश"], a: 2, e: "राजस्थान क्षेत्रफल की दृष्टि से भारत का सबसे बड़ा राज्य है।" },
    { cat: "geography", q: "भारत की सबसे लंबी तटरेखा (Coastline) वाला राज्य कौन-सा है?", o: ["महाराष्ट्र", "तमिलनाडु", "गुजरात", "आंध्र प्रदेश"], a: 2, e: "गुजरात की समुद्री तटरेखा भारत में सबसे लंबी (लगभग 1,600 किमी) है।" },
    { cat: "geography", q: "भारत का सर्वोच्च शिखर (Peak) कौन-सा है?", o: ["माउंट एवरेस्ट", "कंचनजंगा", "के-2 (गॉडविन ऑस्टिन)", "नंदा देवी"], a: 2, e: "के-2 (Godwin-Austen) भारत की सबसे ऊंची चोटी है।" },

    // 🎭 कला, संस्कृति एवं राष्ट्रीय प्रतीक
    { cat: "culture", q: "मधुबनी चित्रकला (मिथिला पेंटिंग) किस राज्य की विश्व प्रसिद्ध लोक कला है?", o: ["ओडिशा", "बिहार", "राजस्थान", "गुजरात"], a: 1, e: "मधुबनी चित्रकला बिहार के मिथिला क्षेत्र की पारंपरिक लोक कला है।" },
    { cat: "culture", q: "भारत के राष्ट्रीय ध्वज (तिरंगा) की लंबाई और चौड़ाई का अनुपात (Ratio) कितना है?", o: ["2:3", "3:2", "4:3", "1:2"], a: 1, e: "तिरंगे की लंबाई और चौड़ाई का आधिकारिक अनुपात 3:2 है।" },
    { cat: "culture", q: "भारतीय राष्ट्रीय कैलेंडर (संवत्) किस कैलेंडर पर आधारित है?", o: ["ग्रेगोरियन कैलेंडर", "शक संवत", "विक्रमी संवत", "हिजरी कैलेंडर"], a: 1, e: "भारत का राष्ट्रीय पंचांग 'शक संवत' पर आधारित है।" }
  ];

  // सर्टिफिकेट के लिए CSS स्टाइल जोड़ना
  if (!document.getElementById("kb-cert-style")) {
    const style = document.createElement("style");
    style.id = "kb-cert-style";
    style.textContent = `
      .kb-cert-container {
        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
        border: 4px solid #d97706;
        border-radius: 16px;
        padding: 25px;
        text-align: center;
        margin-top: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        color: #451a03;
      }
      .kb-cert-title { font-size: 24px; font-weight: bold; color: #b45309; margin-bottom: 4px; }
      .kb-cert-subtitle { font-size: 13px; color: #78350f; margin-bottom: 15px; }
      .kb-cert-name {
        font-size: 26px; font-weight: bold; border-bottom: 2px dashed #b45309;
        display: inline-block; padding: 0 15px; margin: 8px 0 15px 0; color: #14243d;
      }
      .kb-cert-footer {
        display: flex; justify-content: space-between; margin-top: 25px;
        font-size: 12px; font-weight: bold; color: #78350f;
      }
    `;
    document.head.appendChild(style);
  }

  // क्विज़ का इंटरफेस तैयार करना
  quizSection.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid var(--line);">
      <div>
        <label for="kb-quiz-cat" style="font-size:13px;font-weight:bold;display:block;margin-bottom:4px;">🎯 सरकारी और राष्ट्रीय डेटा क्विज़:</label>
        <select id="kb-quiz-cat" style="padding:8px 12px;border-radius:8px;border:1px solid var(--line);background:var(--bg);color:var(--text);font-weight:bold;">
          <option value="all">🌐 सभी विषय (मिश्रित नए प्रश्न)</option>
          <option value="history">🏛️ इतिहास एवं संस्कृति</option>
          <option value="constitution">📜 संविधान एवं व्यवस्था</option>
          <option value="science">🔬 विज्ञान, इसरो एवं डिजिटल डेटा</option>
          <option value="geography">🌏 भारत का भूगोल</option>
          <option value="culture">🎭 राष्ट्रीय प्रतीक एवं कला</option>
        </select>
      </div>
      <button class="btn btn-dark" id="kb-gen-quiz" style="font-size:13px;">🎲 नया क्विज़ खेलें ↻</button>
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

    <div id="kb-quiz-summary" style="display:none;text-align:center;padding:15px;">
      <div style="font-size:42px;">🏆</div>
      <h3 id="kb-sum-title" style="font-size:22px;margin:8px 0;color:var(--saffron);">शानदार प्रदर्शन!</h3>
      <p id="kb-sum-text" style="font-size:15px;margin-bottom:15px;"></p>
      
      <!-- यूज़र का नाम दर्ज करके सर्टिफिकेट लेने का बॉक्स -->
      <div id="kb-cert-input-box" style="background:var(--bg);padding:15px;border-radius:10px;border:1px solid var(--line);margin-bottom:15px;">
        <label style="font-size:13px;font-weight:bold;display:block;margin-bottom:6px;">📝 अपना पूरा नाम लिखें (सर्टिफिकेट के लिए):</label>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
          <input type="text" id="kb-username-in" placeholder="यहाँ अपना नाम टाइप करें..." style="padding:10px;border-radius:8px;border:1px solid var(--line);flex:1;max-width:280px;background:#fff;color:#202b3c;">
          <button class="btn btn-dark" id="kb-get-cert" style="font-size:13px;">🎓 डिजिटल सर्टिफिकेट प्राप्त करें</button>
        </div>
      </div>

      <div id="kb-cert-render-area"></div>

      <button class="btn btn-light" id="kb-sum-retry" style="margin-top:15px;">↻ नया क्विज़ खेलें</button>
    </div>
  `;

  let activePool = [];
  let idx = 0;
  let score = 0;
  let locked = false;

  function generateNewQuiz() {
    const cat = document.getElementById("kb-quiz-cat").value;
    let filtered = cat === "all" ? [...QUESTION_BANK] : QUESTION_BANK.filter((item) => item.cat === cat);
    
    // हर बार प्रश्नों को पूरी तरह रैंडम (Shuffle) करना ताकि एक बिल्कुल नया सेट मिले
    filtered.sort(() => Math.random() - 0.5);
    activePool = filtered.slice(0, 5);
    idx = 0;
    score = 0;

    document.getElementById("kb-quiz-play-area").style.display = "block";
    document.getElementById("kb-quiz-summary").style.display = "none";
    document.getElementById("kb-cert-render-area").innerHTML = "";
    document.getElementById("kb-username-in").value = "";
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

    // विकल्पों को भी रैंडम शफल करना ताकि उत्तर हमेशा एक ही जगह न रहें
    let shuffledOpts = item.o.map((text, originalIndex) => ({ text, originalIndex }));
    shuffledOpts.sort(() => Math.random() - 0.5);

    shuffledOpts.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = `${String.fromCharCode(65 + i)}. ${opt.text}`;
      btn.onclick = () => checkAnswer(opt.originalIndex === item.a, item, btn);
      optsDiv.appendChild(btn);
    });
  }

  function checkAnswer(isCorrect, item, selectedBtn) {
    if (locked) return;
    locked = true;
    const allBtns = document.querySelectorAll("#kb-q-opts .quiz-option");

    allBtns.forEach((b) => {
      b.disabled = true;
      if (b.textContent.includes(item.o[item.a])) {
        b.style.borderColor = "#16834a";
        b.style.background = "#dcfce7";
        b.style.color = "#14532d";
        b.style.fontWeight = "bold";
      }
    });

    const expEl = document.getElementById("kb-q-exp");
    if (isCorrect) {
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

  // सर्टिफिकेट जेनरेट करने का एक्शन
  document.getElementById("kb-get-cert").onclick = () => {
    const nameInput = document.getElementById("kb-username-in").value.trim();
    const finalName = nameInput || "जिज्ञासु छात्र";
    const renderArea = document.getElementById("kb-cert-render-area");

    renderArea.innerHTML = `
      <div class="kb-cert-container">
        <div style="font-size:32px;">🇮🇳</div>
        <div class="kb-cert-title">प्रमाण पत्र - Certificate of Achievement</div>
        <div class="kb-cert-subtitle">"Know About Bharat" राष्ट्रीय ज्ञान मंच द्वारा प्रमाणित किया जाता है कि</div>
        <div class="kb-cert-name">${finalName}</div>
        <p style="font-size:14px;line-height:1.5;">
          ने 'भारत को जानो' राष्ट्रीय ज्ञान प्रतियोगिता में सफलतापूर्वक भाग लेकर ${activePool.length} में से <strong>${score}</strong> अंक प्राप्त किए हैं।
        </p>
        <div class="kb-cert-footer">
          <div>दिनांक: ${new Date().toLocaleDateString("hi-IN")}</div>
          <div>🏆 प्लेटफॉर्म: Know About Bharat</div>
        </div>
        <button class="btn btn-dark" onclick="window.print()" style="margin-top:15px;font-size:13px;">🖨️ प्रमाण पत्र प्रिंट / PDF डाउनलोड करें</button>
      </div>
    `;
  };

  document.getElementById("kb-gen-quiz").onclick = generateNewQuiz;
  document.getElementById("kb-quiz-cat").onchange = generateNewQuiz;
  document.getElementById("kb-sum-retry").onclick = generateNewQuiz;

  generateNewQuiz();
})();
