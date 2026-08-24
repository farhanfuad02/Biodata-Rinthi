(function () {
  "use strict";

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeBtn");
  var stored = null;

  try {
    stored = localStorage.getItem("biodata-theme");
  } catch (e) {
    stored = null;
  }

  var prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(mode) {
    root.setAttribute("data-theme", mode);
    var icon = themeBtn.querySelector("[data-icon]");
    var label = themeBtn.querySelector("[data-label]");
    icon.innerHTML = mode === "dark" ? "&#9728;" : "&#9790;";
    label.textContent = mode === "dark" ? "Light" : "Dark";
    themeBtn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
  }

  applyTheme(stored || (prefersDark ? "dark" : "light"));

  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("biodata-theme", next);
    } catch (e) {
      /* storage blocked - theme still applies for this view */
    }
  });

  /* ---------- print ---------- */
  document.getElementById("printBtn").addEventListener("click", function () {
    window.print();
  });

  /* ---------- age ---------- */
  var dob = new Date(2004, 10, 9); // 9 November 2004
  var now = new Date();
  var age = now.getFullYear() - dob.getFullYear();
  var m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  document.getElementById("age").textContent = "(" + age + " years)";

  /* ---------- photo switcher ---------- */
  var mainPhoto = document.getElementById("mainPhoto");
  var thumbs = document.querySelectorAll(".thumb");

  Array.prototype.forEach.call(thumbs, function (btn) {
    btn.addEventListener("click", function () {
      var src = btn.getAttribute("data-src");
      if (src === mainPhoto.getAttribute("src")) return;

      Array.prototype.forEach.call(thumbs, function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      mainPhoto.classList.add("fading");
      var pre = new Image();
      pre.onload = function () {
        mainPhoto.src = src;
        mainPhoto.classList.remove("fading");
      };
      pre.src = src;
    });
  });

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(items, function (el) {
      el.classList.add("in");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = Number(el.dataset.delay || 0);
        setTimeout(function () {
          el.classList.add("in");
        }, delay);
        io.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  Array.prototype.forEach.call(items, function (el, i) {
    el.dataset.delay = String(Math.min(i, 4) * 80);
    io.observe(el);
  });

  window.addEventListener("beforeprint", function () {
    Array.prototype.forEach.call(items, function (el) {
      el.classList.add("in");
    });
  });
})();
