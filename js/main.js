/* Maeen Uddin — personal site interactions
   Vanilla JS only: scroll reveal, nav state, mobile menu. */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- current year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- nav background on scroll ---------- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  var closeMenu = function () {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });

  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var viz = document.querySelector(".twviz");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    if (viz) viz.classList.add("is-visible");
    return;
  }

  /* Reveal above-the-fold content immediately (no waiting for the first
     observer tick), then let IntersectionObserver handle the rest. */
  var ioFired = false;
  var io = new IntersectionObserver(
    function (entries) {
      ioFired = true;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealEls.forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      el.classList.add("is-visible");
    } else {
      io.observe(el);
    }
  });

  /* Safety net: if the observer never responds (rare embedded webviews),
     show everything rather than leave content hidden. */
  setTimeout(function () {
    if (!ioFired) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
      if (viz) viz.classList.add("is-visible");
    }
  }, 1600);

  /* waveform draw-in when the hero viz becomes visible */
  if (viz && viz.getBoundingClientRect().top < window.innerHeight * 0.95) {
    viz.classList.add("is-visible");
    viz = null;
  }
  if (viz) {
    var vizIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            viz.classList.add("is-visible");
            vizIO.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    vizIO.observe(viz);
  }
})();
