/* ==========================================================
   config.js — তোমার সব কনটেন্ট এখানে
   ----------------------------------------------------------
   এই ফাইলটাই সবচেয়ে বেশি বদলাবে। পুরো কোড খোলার দরকার নেই।
   প্রতিটা লাইনের উপরে কমেন্ট দেওয়া আছে।
   ========================================================== */

const CONFIG = {

  /* ---------- বন্ধুর তথ্য ---------- */

  // কার্ডের উপরে "Dear ___," হিসেবে আসবে
  name: "Friend",

  // কার্ডের বড় শিরোনাম
  headline: "Happy Birthday!",

  // একটাই ছবি। দুই রকম দেওয়া যাবে:
  //   assets/photo.jpg           → নিজের ফোল্ডারের ছবি (GitHub এ আপলোড করা)
  //   https://.../photo.jpg      → ইন্টারনেটের লিংক
  // খালি রাখলে 🎉 দেখাবে।
  photo: "",

  // ছবির নিচের লেখা। অক্ষরগুলো একটা একটা করে ভেসে উঠবে।
  bottomText: "Another year of you being the best person I know. Thanks for every laugh and every late-night call. Hope today is as amazing as you are! 🎂",

  // "Let's celebrate" চাপলে যে লেখা আসবে
  cheer: "Happy Birthday, my friend! 🥳",

  /* ---------- খেলার নিয়ম ---------- */

  // কতগুলো বেলুন ফাটালে মোমবাতি আসবে (যেমন বয়স 21)
  balloonsNeeded: 21,

  /* ---------- থিম ---------- */

  // ডিফল্ট থিম (themes.css এর নাম)
  theme: "sunshine",

  // Customize প্যানেলে যে থিমগুলো দেখাবে। নতুন থিম যোগ করলে এখানেও নাম দাও।
  THEME_NAMES: ["sunshine", "pastel", "ocean", "party"],

  /* ---------- বেলুনের কিওয়ার্ড ও মোটিভেশন ----------
     প্রতিটা আইটেম একটা বেলুনের জন্য।
     প্রথম বেলুন = প্রথম আইটেম, দ্বিতীয় = দ্বিতীয়, এভাবে।
     কোনো আইটেম রিপিট হবে না।
     নতুন আইটেম যোগ করতে: { word: "শব্দ", line: "লাইন" },
     লিস্টের চেয়ে বেশি বেলুন ফাটালে "Bonus wish #N" আসবে।
  ---------------------------------------------------- */
  balloonItems: [
    { word: "Courage",    line: "Be brave enough to start, even when it isn't perfect." },
    { word: "Joy",        line: "Find one reason to smile today." },
    { word: "Growth",     line: "Every year is a new chapter. Write it well." },
    { word: "Kindness",   line: "Be the reason someone feels seen." },
    { word: "Dream",      line: "Chase the thing that makes you lose track of time." },
    { word: "Strength",   line: "You have survived every hard day so far." },
    { word: "Friendship", line: "The best people are the ones who show up." },
    { word: "Adventure",  line: "Say yes to the unplanned road trip." },
    { word: "Peace",      line: "Let go of what you can't control." },
    { word: "Focus",      line: "Small steps every day build big things." },
    { word: "Love",       line: "Keep the people who make you feel like home." },
    { word: "Health",     line: "Take care of your body. It carries all your dreams." },
    { word: "Savings",    line: "Save a little, and spend a little on memories too." },
    { word: "Confidence", line: "Your voice matters. Use it loudly." },
    { word: "Laughter",   line: "Laugh loud, even at yourself." },
    { word: "Balance",    line: "Rest is part of the work." },
    { word: "Creativity", line: "Make something messy and beautiful today." },
    { word: "Gratitude",  line: "Count the good things. There are more than you think." },
    { word: "Patience",   line: "Good things bloom in their own time." },
    { word: "Hope",       line: "Tomorrow is a fresh page." },
    { word: "Glow",       line: "Shine in your own light, not someone else's." },
    { word: "Legend",     line: "Another year of being the legend you are." },
    { word: "Cake",       line: "Cake first, worry later. 🎂" }
  ]
};