/* live_wiki.js — राज्य / केंद्रशासित प्रदेश / समयरेखा पर क्लिक करने पर Wikipedia (हिंदी) से लाइव सारांश।
   पुराना कोड नहीं बदलता; यह सिर्फ़ एक अलग फ़ाइल है। */
(function () {
  'use strict';
  var KEY = 'kab_wikicache', TTL = 30 * 864e5, MAXC = 80;
  var API = 'https://hi.wikipedia.org/w/api.php?origin=*&format=json&action=query';
  var PROPS = '&prop=extracts|pageimages|info|pageprops&ppprop=disambiguation&exintro=1&explaintext=1&exsentences=5&piprop=thumbnail&pithumbsize=320&inprop=url';
  var ctl = null, tok = 0;

  /* ---------- सेव की हुई जानकारी (इसी फ़ोन में) ---------- */
  function cGet(k) {
    try { var v = (JSON.parse(localStorage.getItem(KEY) || '{}'))[k]; return v && Date.now() - v.t < TTL ? v.d : null; }
    catch (e) { return null; }
  }
  function cSet(k, d) {
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || '{}'); c[k] = { t: Date.now(), d: d };
      var ks = Object.keys(c);
      if (ks.length > MAXC) { ks.sort(function (a, b) { return c[a].t - c[b].t; }).slice(0, ks.length - MAXC).forEach(function (x) { delete c[x]; }); }
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch (e) {}
  }

  /* ---------- Wikipedia से लाना ---------- */
  function shape(j) {
    var pg = j && j.query && j.query.pages, p = pg && pg[Object.keys(pg)[0]];
    if (!p || p.missing !== undefined || !p.extract) return null;
    if (p.pageprops && p.pageprops.disambiguation !== undefined) return null;
    return { title: p.title, text: p.extract, img: (p.thumbnail && p.thumbnail.source) || '', url: p.fullurl };
  }
  function get(url, sig) {
    return fetch(url, { signal: sig }).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); });
  }
  function byTitle(t, sig) { return get(API + '&redirects=1&titles=' + encodeURIComponent(t) + PROPS, sig).then(shape); }
  function bySearch(q, sig) { return get(API + '&generator=search&gsrlimit=1&gsrsearch=' + encodeURIComponent(q) + PROPS, sig).then(shape); }
  function lookup(exact, q, sig) {
    var p = exact ? byTitle(exact, sig) : Promise.resolve(null);
    return p.then(function (r) { return r || bySearch(q, sig); });
  }

  /* ---------- पैनल ---------- */
  var st = document.createElement('style');
  st.textContent =
    '#kab-live{position:fixed;left:0;right:0;bottom:0;z-index:2147483600;display:none;padding:0 8px;pointer-events:none}' +
    '#kab-live.open{display:block}' +
    '#kab-live .kl-in{pointer-events:auto;position:relative;max-width:640px;margin:0 auto;max-height:46vh;overflow-y:auto;background:#fff;color:#202b3c;border:1px solid #e5e9f0;border-bottom:0;border-radius:18px 18px 0 0;padding:16px 18px 18px;box-shadow:0 -8px 30px rgba(0,0,0,.25);line-height:1.7}' +
    'html[data-theme=dark] #kab-live .kl-in{background:#182236;color:#e6ebf5;border-color:#2a3750}' +
    '#kab-live h4{margin:0 40px 6px 0;font-size:18px;color:#e97824}' +
    '#kab-live .kl-x{position:absolute;top:10px;right:10px;width:34px;height:34px;border:0;border-radius:10px;background:#e5e9f0;color:#202b3c;font-size:16px;cursor:pointer}' +
    '#kab-live img{float:right;max-width:110px;max-height:110px;object-fit:cover;border-radius:10px;margin:0 0 6px 12px}' +
    '#kab-live .kl-s{font-size:13px;opacity:.75;margin-top:10px;clear:both}' +
    '#kab-live a{color:#16834a;font-weight:bold}';
  document.head.appendChild(st);

  var panel = document.createElement('div');
  panel.id = 'kab-live';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-live', 'polite');
  panel.innerHTML = '<div class="kl-in"><button class="kl-x" aria-label="बंद करें">✕</button><div class="kl-b"></div></div>';
  document.body.appendChild(panel);
  var body = panel.querySelector('.kl-b');

  function close() { panel.classList.remove('open'); if (ctl) ctl.abort(); }
  panel.querySelector('.kl-x').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  function el(tag, txt) { var n = document.createElement(tag); if (txt) n.textContent = txt; return n; }
  function msg(t) { body.replaceChildren(el('p', t)); }

  function render(label, r, cached) {
    body.replaceChildren();
    body.appendChild(el('h4', '📖 ' + label + (r.title !== label ? ' — ' + r.title : '')));
    if (r.img) { var i = el('img'); i.src = r.img; i.alt = r.title; i.loading = 'lazy'; body.appendChild(i); }
    body.appendChild(el('p', r.text));
    var s = el('p'); s.className = 'kl-s';
    s.appendChild(document.createTextNode('स्रोत: Wikipedia (CC BY-SA) · '));
    var a = el('a', 'पूरा लेख पढ़ें'); a.href = r.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    s.appendChild(a);
    s.appendChild(document.createTextNode(' · जानकारी सत्यापित करने के लिए सरकारी स्रोत भी देखें।' + (cached ? ' ⚡ सेव की हुई' : '')));
    body.appendChild(s);
  }

  function show(label, exact, query) {
    var my = ++tok;
    if (ctl) ctl.abort();
    ctl = new AbortController();
    panel.classList.add('open');
    var key = (exact || '') + '|' + query, hit = cGet(key);
    if (hit) { render(label, hit, true); return; }
    msg('⏳ ' + label + ' की जानकारी Wikipedia से ला रहे हैं…');
    lookup(exact, query, ctl.signal).then(function (r) {
      if (my !== tok) return;
      if (!r) { msg('इस विषय पर Wikipedia में सीधा लेख नहीं मिला।'); return; }
      cSet(key, r); render(label, r, false);
    }).catch(function (e) {
      if (my !== tok || (e && e.name === 'AbortError')) return;
      msg('जानकारी अभी नहीं आ पाई। इंटरनेट जाँचकर फिर टैप करें।');
    });
  }

  /* ---------- क्लिक सुनना (पुराने हैंडलर को रोके बिना) ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest || t.closest('#kab-live')) return;
    var s = t.closest('.state');
    if (s) {
      var b = s.querySelector('b'), n = b ? b.textContent.trim() : '';
      if (n) show(n, n.replace(/\s*\(.*?\)\s*/g, ' ').trim(), n.replace(/\s*\(.*?\)\s*/g, ' ').trim() + ' भारत');
      return;
    }
    var ti = t.closest('.timeline-item');
    if (ti) {
      var d = ti.querySelector('strong'), p = ti.querySelector('p');
      var q = (p ? p.textContent : ti.textContent).trim().split(/\s+/).slice(0, 8).join(' ');
      if (q) show(d ? d.textContent.trim() : q, '', q);
    }
  });
})();
