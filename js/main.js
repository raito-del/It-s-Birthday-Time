/* ==========================================================
   main.js — পেজের লজিক
   ----------------------------------------------------------
   সাধারণত এখানে কিছু বদলানোর দরকার নেই।
   কনটেন্ট বদলাতে → config.js
   রঙ বদলাতে → themes.css
   ==========================================================

   এই ফাইলের প্রধান ধাপ:
   1. বেলুন ক্রমাগত ওঠে (startBalloons)
   2. বেলুন ফাটালে (popBalloon) পরের কিওয়ার্ড/লাইনটা আসে
   3. CONFIG.balloonsNeeded পূর্ণ হলে মোমবাতি আসে
   4. ফু দিলে (flame click) ইচ্ছার স্টিকার পাতা (showReel)
   5. "Open my birthday card" এ কার্ড (showCard)
*/

const $ = id => document.getElementById(id);
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

/* ---------- অবস্থা (state) ---------- */
let popCount = 0;          // কতগুলো বেলুন ফাটানো হয়েছে
let collected = [];        // ফাটানো বেলুনের {word, line}, ক্রম অনুযায়ী
let spawnTimer = null;

/* ---------- থিমের রঙ CSS থেকে পড়া ---------- */
function palette() {
  const s = getComputedStyle(document.documentElement);
  return ["--p1", "--p2", "--p3", "--p4"].map(v => s.getPropertyValue(v).trim());
}

/* ---------- থিম বদলানো ---------- */
function applyTheme(name) {
  if (!CONFIG.THEME_NAMES.includes(name)) name = CONFIG.THEME_NAMES[0];
  CONFIG.theme = name;
  // html এর data-theme বদলালেই themes.css এর সঠিক block চালু হয়
  document.documentElement.dataset.theme = name;
}

/* ---------- বেলুনের SVG ---------- */
function balloonSVG(color, i) {
  const grad = `g${i}`;
  return `<svg viewBox="0 0 60 84" width="74" height="103">
    <defs><radialGradient id="${grad}" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fff" stop-opacity=".9"/>
      <stop offset="25%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${color}" stop-opacity=".75"/>
    </radialGradient></defs>
    <ellipse cx="30" cy="30" rx="26" ry="30" fill="url(#${grad})"/>
    <ellipse cx="21" cy="16" rx="5" ry="8" fill="#fff" opacity=".6"/>
    <path d="M30 60 L25 67 L35 67 Z" fill="${color}"/>
    <path d="M30 67 Q24 75 30 84" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7"/>
  </svg>`;
}

/* ---------- ক্রমাগত বেলুন ---------- */
// বেগ বদলাতে: নিচের "1300" (মিলিসেকেন্ড) সংখ্যাটা বদলাও। ছোট = বেশি বেলুন।
function startBalloons() {
  if (spawnTimer) return;
  for (let i = 0; i < 4; i++) setTimeout(spawnBalloon, i * 500);
  spawnTimer = setInterval(spawnBalloon, 1300);
}

function spawnBalloon() {
  if ($("intro").classList.contains("hidden")) return;
  const colors = palette();
  const b = document.createElement("div");
  b.className = "balloon";
  b.style.left = rnd(4, 86) + "%";
  b.style.animationDuration = rnd(9, 14) + "s";     // উঠার গতি
  b.innerHTML =
    `<div class="sway" style="animation-delay:${rnd(0, 2)}s">` +
    balloonSVG(pick(colors), Math.floor(rnd(0, 9999))) +
    `</div><div class="string"></div>`;
  b.onclick = () => popBalloon(b);
  $("intro").insertBefore(b, $("candleWrap"));
  setTimeout(() => b.remove(), 14000);
}

/* ---------- বেলুন ফাটানো ---------- */
// প্রতিবার পরের আইটেম নেয়, তাই কোনো আইটেম রিপিট হয় না
function itemForPop() {
  const items = CONFIG.balloonItems;
  if (popCount < items.length) return items[popCount];
  return { word: "", line: `Bonus wish #${popCount + 1}: keep shining ✨` };
}

function popBalloon(b) {
  if (b.dataset.popped) return;
  b.dataset.popped = "1";

  // ফাটার কণা (shard)
  const rect = b.getBoundingClientRect();
  const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
  const colors = palette();
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("div");
    s.className = "shard";
    s.textContent = pick(["✦", "✧", "★", "❋"]);
    s.style.color = pick(colors);
    s.style.left = cx + "px";
    s.style.top = cy + "px";
    s.style.setProperty("--x", rnd(-150, 150) + "px");
    s.style.setProperty("--y", rnd(-150, 150) + "px");
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
  b.classList.add("pop");
  setTimeout(() => b.remove(), 300);

  const item = itemForPop();
  collected.push(item);
  popCount++;
  showWish(item);
  updateCounter();

  if (popCount >= CONFIG.balloonsNeeded) {
    $("candleWrap").classList.remove("hidden");
  }
}

/* ইচ্ছার বাবল: উপরে ৩ সেকেন্ড থাকে */
function showWish(item) {
  document.querySelectorAll(".wishBubble").forEach(w => w.remove());
  const wb = document.createElement("div");
  wb.className = "wishBubble";
  if (item.word) {
    const k = document.createElement("div");
    k.className = "kw";
    k.textContent = item.word;
    wb.appendChild(k);
  }
  const l = document.createElement("div");
  l.className = "ln";
  l.textContent = item.line;
  wb.appendChild(l);
  $("intro").appendChild(wb);
  setTimeout(() => {
    wb.classList.add("out");
    setTimeout(() => wb.remove(), 500);
  }, 3000);
}

function updateCounter() {
  $("popCount").textContent = popCount;
  $("needCount").textContent = CONFIG.balloonsNeeded;
}

/* ---------- মোমবাতি → ফু → স্টিকার পাতা ---------- */
$("flame").onclick = () => {
  const f = $("flame");
  if (f.classList.contains("out")) return;
  f.classList.add("out");
  setTimeout(() => {
    $("intro").classList.add("hidden");
    showReel();
  }, 600);
};

function showReel() {
  const box = $("stickers");
  box.innerHTML = "";
  const colors = palette();
  collected.forEach((item, i) => {
    const s = document.createElement("div");
    s.className = "sticker";
    if (item.word) {
      const k = document.createElement("div");
      k.className = "kw";
      k.textContent = item.word;
      s.appendChild(k);
    }
    const l = document.createElement("div");
    l.textContent = item.line;
    s.appendChild(l);
    s.style.setProperty("--r", rnd(-6, 6).toFixed(1) + "deg");
    s.style.borderLeft = `6px solid ${colors[i % colors.length]}`;
    s.style.animationDelay = (i * 0.12) + "s";
    box.appendChild(s);
  });
  $("reel").classList.remove("hidden");
  burstConfetti(true);
}

/* ---------- বার্থডে কার্ড ---------- */
$("openCard").onclick = () => {
  $("reel").classList.add("hidden");
  $("card").classList.remove("hidden");
  renderBottomLetters();
  burstConfetti(true);
};

$("celebrate").onclick = () => {
  $("cheer").classList.remove("hidden");
  $("celebrate").classList.add("hidden");
  burstConfetti(true);
};

function renderCard() {
  $("nameLine").textContent = `Dear ${CONFIG.name},`;
  $("headline").textContent = CONFIG.headline;
  $("cheer").textContent = CONFIG.cheer;
  renderBottomLetters();

  const p = $("photo");
  p.innerHTML = "";
  if (CONFIG.photo) {
    const img = document.createElement("img");
    img.src = CONFIG.photo;
    img.alt = "photo";
    img.onerror = () => { p.innerHTML = "🎉"; };
    p.appendChild(img);
  } else {
    p.textContent = "🎉";
  }
}

// প্রতিটা অক্ষর আলাদা span, যাতে একটা একটা করে ভাসে
function renderBottomLetters() {
  const box = $("bottomText");
  box.innerHTML = "";
  [...CONFIG.bottomText].forEach((ch, i) => {
    const s = document.createElement("span");
    s.textContent = ch === " " ? "\u00A0" : ch;
    s.style.animationDelay = (i * 0.025) + "s";
    box.appendChild(s);
  });
}

/* ---------- কনফেটি ---------- */
function burstConfetti(big) {
  const colors = palette();
  const deco = $("decoLayer");
  const n = big ? 70 : 30;
  for (let i = 0; i < n; i++) {
    const p = document.createElement("div");
    p.className = "piece";
    const shape = pick(["circle", "rect", "star"]);
    const color = pick(colors);
    p.style.left = rnd(0, 100) + "vw";
    p.style.setProperty("--drift", rnd(-100, 100) + "px");
    p.style.animationDuration = rnd(4, 8) + "s";
    if (shape === "circle") {
      p.style.width = "9px"; p.style.height = "9px";
      p.style.borderRadius = "50%"; p.style.background = color;
    } else if (shape === "rect") {
      p.style.width = "8px"; p.style.height = "14px";
      p.style.borderRadius = "2px"; p.style.background = color;
    } else {
      p.textContent = "★"; p.style.color = color; p.style.fontSize = "16px";
    }
    deco.appendChild(p);
    setTimeout(() => p.remove(), 9000);
  }
}

/* ---------- Editor এর জন্য ফাংশন বের করে দেওয়া ---------- */
window.App = { applyTheme, renderCard, updateCounter, renderBottomLetters };

/* ---------- শুরু ---------- */
(function init() {
  // তারা
  const s = $("stars");
  for (let i = 0; i < 60; i++) {
    const d = document.createElement("i");
    d.style.left = rnd(0, 100) + "%";
    d.style.top = rnd(0, 100) + "%";
    d.style.animationDuration = rnd(2, 5) + "s";
    d.style.animationDelay = rnd(0, 4) + "s";
    s.appendChild(d);
  }
  applyTheme(CONFIG.theme);
  renderCard();
  updateCounter();
  startBalloons();
})();