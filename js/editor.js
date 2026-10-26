/* ==========================================================
   editor.js — Customize প্যানেল
   ----------------------------------------------------------
   এই প্যানেলে যা লেখা হবে তা শুধু এই ব্রাউজারে পেজ খোলা থাকা পর্যন্ত থাকে।
   স্থায়ী করতে চাইলে js/config.js এ একই জিনিস লিখে GitHub এ commit করো।

   এখানে কী আছে:
   - ইনপুট → CONFIG এ লেখা → পেজ লাইভ আপডেট
   - "বেলুন আইটেম" ঘরে প্রতি লাইনে: কিওয়ার্ড | লাইন
   - থিমের রঙের বোতাম → CONFIG.THEME_NAMES থেকে তৈরি হয়
   ========================================================== */

/* বেলুন আইটেম ↔ টেক্সট রূপান্তর */
function itemsToText(items) {
  return items.map(it => it.word ? `${it.word} | ${it.line}` : it.line).join("\n");
}

function textToItems(text) {
  return text
    .split("\n")
    .filter(l => l.trim())
    .map(l => {
      const idx = l.indexOf("|");
      if (idx === -1) return { word: "", line: l.trim() };
      return { word: l.slice(0, idx).trim(), line: l.slice(idx + 1).trim() };
    });
}

function fillEditor() {
  $("inName").value = CONFIG.name;
  $("inHeadline").value = CONFIG.headline;
  $("inNeed").value = CONFIG.balloonsNeeded;
  $("inItems").value = itemsToText(CONFIG.balloonItems);
  $("inPhoto").value = CONFIG.photo;
  $("inBottom").value = CONFIG.bottomText;
  $("inCheer").value = CONFIG.cheer;
}

function bindEditor() {
  $("toggleEdit").onclick = () => $("editor").classList.toggle("open");

  $("inName").oninput = e => { CONFIG.name = e.target.value; App.renderCard(); };
  $("inHeadline").oninput = e => { CONFIG.headline = e.target.value; App.renderCard(); };
  $("inNeed").oninput = e => {
    const n = parseInt(e.target.value, 10);
    if (n > 0) { CONFIG.balloonsNeeded = n; App.updateCounter(); }
  };
  $("inItems").oninput = e => { CONFIG.balloonItems = textToItems(e.target.value); };
  $("inPhoto").oninput = e => { CONFIG.photo = e.target.value.trim(); App.renderCard(); };
  $("inBottom").oninput = e => { CONFIG.bottomText = e.target.value; App.renderBottomLetters(); };
  $("inCheer").oninput = e => { CONFIG.cheer = e.target.value; App.renderCard(); };

  // থিমের রঙের বোতাম — নাম থেকে নিজে তৈরি হয়, নতুন থিম যোগ করলে আপনাআপনি আসে
  const tb = $("themeBtns");
  CONFIG.THEME_NAMES.forEach(name => {
    const b = document.createElement("button");
    b.title = name;
    b.dataset.swatch = name;
    b.onclick = () => App.applyTheme(name);
    tb.appendChild(b);
  });
}

fillEditor();
bindEditor();