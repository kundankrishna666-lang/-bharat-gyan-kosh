/* ==========================================================================
   FILE: timeline_explore_engine.js
   DESCRIPTION: Ultra-Detailed Regional Cultural Explorer & Deep Historical 
                Timeline Milestone Generator for National Level Presentations.
   ========================================================================== */

(function () {
  // मुख्य कंटेनर ढूंढें या होमपेज पर नया सेक्शन बनाएं
  const mainContainer = document.querySelector("main") || document.body;
  if (!mainContainer) return;

  // विशाल क्षेत्रीय और ऐतिहासिक डेटा बैंक (Deep Data)
  const REGIONAL_DATA = {
    north: {
        title: "🏔️ उत्तर भारत: हिमालयी धरोहर और सभ्यता का उद्गम",
        desc: "उत्तर भारत अपनी प्राचीन वैदिक संस्कृति, सिंधु घाटी के अवशेषों और भव्य हिमालयी भूभाग के लिए विश्व प्रसिद्ध है।",
        highlights: ["वैदिक संस्कृति एवं उपनिषदों की भूमि", "ताजमहल और मुगल वास्तुकला", "भांगड़ा, कथक और लोक संगीत", "कुरुक्षेत्र और महाभारत की ऐतिहासिक स्थलियाॅं"]
    },
    south: {
        title: "🌊 दक्षिण भारत: भव्य मंदिर, प्राचीन राजवंश और समुद्री व्यापार",
        desc: "चोल, पल्लव और विजयनगर साम्राज्य की भूमि, जो अपनी उत्कृष्ट द्रविड़ वास्तुकला और शास्त्रीय संगीत के लिए जानी जाती है।",
        highlights: ["द्रविड़ वास्तुकला के विशाल मंदिर (तंजावुर, मदुरै)", "भरतनाट्यम और कुचिपुड़ी नृत्य", "प्राचीन रोमन व्यापार के बंदरगाह (मुचिरी)", "भारत का आईटी और तकनीकी केंद्र (बेंगलुरु, हैदराबाद)"]
    },
    east: {
        title: "🌿 पूर्व भारत: साहित्य, कला, और स्वतंत्रता संग्राम की जननी",
        desc: "बंगाल की बौद्धिक भूमि, ओडिशा के सूर्य मंदिर और बिहार की प्राचीन नालंदा-वैशाली संस्कृति का अनूठा संगम।",
        highlights: ["नालंदा और विक्रमशिला प्राचीन विश्वविद्यालय", "दुर्गा पूजा और पुरी रथ यात्रा", "रवींद्रनाथ टैगोर और बंकिमचंद्र का साहित्यिक योगदान", "सुभाष चंद्र बोस और स्वतंत्रता संग्राम की गाथाएँ"]
    },
    west: {
        title: "⚓ पश्चिम भारत: व्यापारिक संस्कृति, संत परंपरा और सुदीर्घ तटरेखा",
        desc: "गुजरात और महाराष्ट्र की यह भूमि आर्थिक विकास, छत्रपति शिवाजी महाराज के स्वराज और उद्यमिता का प्रतीक है।",
        highlights: ["सिंधु घाटी के महान बंदरगाह शहर (लोथल और धोलावीरा)", "छत्रपति शिवाजी महाराज का मराठा साम्राज्य", "गरबा और लावणी लोकनृत्य", "भारत की आर्थिक राजधानी मुंबई"]
    },
    central: {
        title: "🐅 मध्य भारत: भारत का हृदय स्थल और वन्यजीव धरोहर",
        desc: "मध्य प्रदेश और छत्तीसगढ़ के जंगलों में छिपे प्राचीन खजुराहो मंदिर, सांची स्तूप और गोंड जनजाति की लोक कला।",
        highlights: ["सांची का बौद्ध स्तूप (सम्राट अशोक द्वारा निर्मित)", "खजुराहो के नागर शैली के विश्व प्रसिद्ध मंदिर", "भीमबेटका की प्रागैतिहासिक शैल चित्रकारी (Rock Art)", "भारत का टाइगर स्टेट और समृद्ध जैव विविधता"]
    },
    northeast: {
        title: "🌺 पूर्वोत्तर भारत: सात बहनें, जैव विविधता और अद्वितीय जनजातीय संस्कृति",
        desc: "प्रकृति की गोद में बसा यह क्षेत्र अपनी अनूठी हस्तकला, बाँस वास्तुकला और 200 से अधिक जनजातीय संस्कृतियों के लिए प्रसिद्ध है।",
        highlights: ["लिविंग रूट ब्रिजेस (मेघालय की जीवित जड़ पुल)", "काजीरंगा और एकसिंगी गैंडों का प्राकृतिक आवास", "बिहू और बांस नृत्य (चेराव)", "हॉर्नबिल महोत्सव और पारंपरिक हथकरघा"]
    }
  };

  const TIMELINE_DATA = [
    { year: "ईसा पूर्व 2500 - 1500", title: "सिंधु घाटी सभ्यता (Indus Valley Civilization)", details: "विश्व की सबसे उन्नत शहरी नियोजन व्यवस्था, जल निकासी प्रणाली, पक्की ईंटों के मकान और लोथल जैसे बंदरगाह।" },
    { year: "ईसा पूर्व 600 - 322", title: "महाजनपद काल एवं बौद्ध-जैन दर्शन", details: "16 महाजनपदों का उदय, मगध साम्राज्य का विस्तार, तथा गौतम बुद्ध और महावीर स्वामी द्वारा शांति और अहिंसा का संदेश।" },
    { year: "ईसा पूर्व 321 - 185", title: "मौर्य साम्राज्य और सम्राट अशोक का काल", details: "चाणक्य की नीति और चंद्रगुप्त मौर्य द्वारा स्थापित साम्राज्य। सम्राट अशोक ने कलिंग युद्ध के बाद बौद्ध धर्म अपनाकर शांति का संदेश दिया।" },
    { year: "320 - 550 ईस्वी", title: "गुप्त साम्राज्य (भारत का स्वर्ण युग)", details: "विज्ञान, गणित, साहित्य और खगोल विज्ञान का अभूतपूर्व विकास। आर्यभट्ट, कालिदास और वराहमिहिर इसी काल के रत्न थे।" },
    { year: "1526 - 1707", title: "मुगल साम्राज्य और सांस्कृतिक समन्वय", details: "बाबर द्वारा स्थापना, अकबर की धार्मिक सहिष्णुता (दीन-ए-इलाही), और शाहजहाँ के काल में वास्तुकला का चरम विकास।" },
    { year: "1674 - 1818", title: "मराठा साम्राज्य और स्वराज की स्थापना", details: "छत्रपति शिवाजी महाराज द्वारा गुरिल्ला युद्धनीति और कुशल प्रशासनिक व्यवस्था (अष्टप्रधान) की स्थापना।" },
    { year: "1857", title: "प्रथम भारतीय स्वतंत्रता संग्राम", details: "मंगल मंगड़े, रानी लक्ष्मीबाई, तात्या टोपे और कुंवर सिंह के नेतृत्व में ब्रिटिश ईस्ट इंडिया कंपनी के खिलाफ महान जन-विद्रोह।" },
    { year: "15 अगस्त 1947", title: "भारत की स्वतंत्रता", details: "लगभग 200 वर्षों के ब्रिटिश औपनिवेशिक शासन के बाद महात्मा गांधी, सरदार पटेल, भगत सिंह और अनगिनत सेनानियों के बलिदान से स्वतंत्र भारत का उदय।" },
    { year: "26 जनवरी 1950", title: "गणतंत्र भारत और संविधान लागू", details: "डॉ. भीमराव आंबेडकर की अध्यक्षता में निर्मित दुनिया का सबसे बड़ा लिखित संविधान लागू हुआ और भारत एक संप्रभु लोकतांत्रिक गणराज्य बना।" },
    { year: "1975 से वर्तमान", title: "आधुनिक अंतरिक्ष और डिजिटल भारत युग", details: "1975 में पहला उपग्रह 'आर्यभट', परमाणु शक्ति संपन्न राष्ट्र, और हाल ही में 2023 में चंद्रयान-3 की चंद्रमा के दक्षिणी ध्रुव पर ऐतिहासिक लैंडिंग।" }
  ];

  // नया सुंदर HTML UI खंड तैयार करना
  const section = document.createElement("section");
  section.id = "kb-advanced-explorer";
  section.style.cssText = "padding: 40px 6%; background: var(--card); border-top: 2px solid var(--line); margin-top: 30px; border-radius: 16px;";
  
  section.innerHTML = `
    <div style="text-align:center; margin-bottom:30px;">
      <span style="background:var(--saffron); color:#fff; padding:4px 14px; border-radius:20px; font-size:12px; font-weight:bold;">राष्ट्रीय प्रस्तुति विशेष (National Special Edition)</span>
      <h2 style="font-size:28px; margin-top:10px; color:var(--text);">🇮🇳 भारत समग्र दर्शन: क्षेत्रीय एवं ऐतिहासिक महाकोश</h2>
      <p style="color:var(--muted); font-size:14px; margin-top:6px;">भारत के विभिन्न क्षेत्रों की सांस्कृतिक विविधता और समय के पन्नों में दर्ज गौरवशाली इतिहास का विस्तृत अध्ययन।</p>
    </div>

    <!-- Tabs Header -->
    <div style="display:flex; justify-content:center; gap:12px; margin-bottom:25px; flex-wrap:wrap;">
      <button class="btn btn-dark" id="tab-reg-btn" style="background:var(--saffron);">🗺️ क्षेत्रीय एवं सांस्कृतिक विविधता</button>
      <button class="btn btn-light" id="tab-time-btn">⏳ इतिहास के स्वर्ण पन्ने (Timeline)</button>
    </div>

    <!-- Region Explorer View -->
    <div id="kb-region-view" style="display:block;">
      <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-bottom:20px;">
        <button class="reg-chip btn btn-light" data-region="north" style="border-color:var(--saffron);">उत्तर भारत</button>
        <button class="reg-chip btn btn-light" data-region="south">दक्षिण भारत</button>
        <button class="reg-chip btn btn-light" data-region="east">पूर्व भारत</button>
        <button class="reg-chip btn btn-light" data-region="west">पश्चिम भारत</button>
        <button class="reg-chip btn btn-light" data-region="central">मध्य भारत</button>
        <button class="reg-chip btn btn-light" data-region="northeast">पूर्वोत्तर भारत</button>
      </div>
      <div id="kb-region-content" style="background:var(--bg); padding:25px; border-radius:12px; border:1px solid var(--line);">
        <!-- Dynamic Region Content Here -->
      </div>
    </div>

    <!-- Timeline Inspector View -->
    <div id="kb-timeline-view" style="display:none;">
      <div style="text-align:center; margin-bottom:15px;">
        <button class="btn btn-dark" id="kb-random-time-btn">🎲 कोई एक यादृच्छिक ऐतिहासिक मील का पत्थर खोजें</button>
      </div>
      <div id="kb-timeline-list" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:15px; margin-top:20px;">
        <!-- Dynamic Timeline Cards Here -->
      </div>
    </div>
  `;

  // मुख्य पेज पर इसे क्विज़ या फुटर से पहले जोड़ना
  const targetElement = document.querySelector("#quiz") || mainContainer.lastElementChild;
  targetElement.before(section);

  // लॉजिक और इंटरएक्टिविटी
  const regView = document.getElementById("kb-region-view");
  const timeView = document.getElementById("kb-timeline-view");
  const tabRegBtn = document.getElementById("tab-reg-btn");
  const tabTimeBtn = document.getElementById("tab-time-btn");

  tabRegBtn.onclick = () => {
    regView.style.display = "block";
    timeView.style.display = "none";
    tabRegBtn.style.background = "var(--saffron)";
    tabRegBtn.className = "btn btn-dark";
    tabTimeBtn.style.background = "#fff";
    tabTimeBtn.className = "btn btn-light";
  };

  tabTimeBtn.onclick = () => {
    regView.style.display = "none";
    timeView.style.display = "block";
    tabTimeBtn.style.background = "var(--saffron)";
    tabTimeBtn.className = "btn btn-dark";
    tabRegBtn.style.background = "#fff";
    tabRegBtn.className = "btn btn-light";
    renderTimelineCards();
  };

  // क्षेत्र渲染 फंक्शन
  function renderRegion(key) {
    const data = REGIONAL_DATA[key];
    const contentBox = document.getElementById("kb-region-content");
    contentBox.innerHTML = `
      <h3 style="color:var(--saffron); font-size:22px; margin-bottom:8px;">${data.title}</h3>
      <p style="font-size:15px; line-height:1.6; margin-bottom:15px;">${data.desc}</p>
      <h4 style="font-size:15px; margin-bottom:8px; color:var(--text);">✨ प्रमुख विशेषताएँ एवं सांस्कृतिक आयाम:</h4>
      <ul style="padding-left:20px; line-height:1.8; font-size:14px;">
        ${data.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>
    `;
  }

  // चिप्स क्लिक इवेंट
  document.querySelectorAll(".reg-chip").forEach(btn => {
    btn.onclick = (e) => {
      document.querySelectorAll(".reg-chip").forEach(b => b.style.borderColor = "var(--line)");
      e.target.style.borderColor = "var(--saffron)";
      renderRegion(e.target.getAttribute("data-region"));
    };
  });

  // डिफ़ॉल्ट रूप से उत्तर भारत दिखाएं
  renderRegion("north");

  // टाइमलाइन कार्ड्स रेंडर करना
  function renderTimelineCards() {
    const listContainer = document.getElementById("kb-timeline-list");
    listContainer.innerHTML = TIMELINE_DATA.map(t => `
      <div style="background:var(--bg); padding:18px; border-radius:10px; border-left:4px solid var(--saffron); border-top:1px solid var(--line); border-right:1px solid var(--line); border-bottom:1px solid var(--line);">
        <span style="font-size:12px; font-weight:bold; color:var(--saffron); background:#fef3c7; padding:2px 8px; border-radius:4px;">📅 ${t.year}</span>
        <h4 style="font-size:16px; margin:8px 0; color:var(--text);">${t.title}</h4>
        <p style="font-size:13px; color:var(--muted); line-height:1.5;">${t.details}</p>
      </div>
    `).join("");
  }

  // रैंडम टाइमलाइन इवेंट जेनरेटर बटन
  document.getElementById("kb-random-time-btn").onclick = () => {
    const randomItem = TIMELINE_DATA[Math.floor(Math.random() * TIMELINE_DATA.length)];
    const listContainer = document.getElementById("kb-timeline-list");
    listContainer.innerHTML = `
      <div style="grid-column: 1 / -1; background:linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); padding:25px; border-radius:12px; border:2px solid #d97706; text-align:center;">
        <span style="font-size:13px; font-weight:bold; color:#b45309;">🎯 यादृच्छिक ऐतिहासिक खोज (Random Historical Milestone)</span>
        <h3 style="font-size:22px; color:#92400e; margin:10px 0;">${randomItem.year} : ${randomItem.title}</h3>
        <p style="font-size:15px; color:#78350f; max-width:700px; margin:0 auto; line-height:1.6;">${randomItem.details}</p>
        <button class="btn btn-dark" onclick="location.reload()" style="margin-top:15px; font-size:12px;">🔄 सभी टाइमलाइन देखें</button>
      </div>
    `;
  };

  console.log("🇮🇳 Know About Bharat: Advanced Timeline & Regional Explorer Loaded Successfully!");
})();
