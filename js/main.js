/* ============================================================
   Mr Gole + The Second Plate — main.js
   Header scroll state, scroll-reveal, hero parallax, year stamp.
   Vanilla JS, no dependencies. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Sticky header: transparent over hero -> solid on scroll ---- */
  var header = document.querySelector('.site-header');
  if (header && !header.classList.contains('site-header--prefers-solid')) {
    var onScroll = function () {
      if (window.scrollY > 60) header.classList.add('is-solid');
      else header.classList.remove('is-solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Scroll-reveal: fade + small translate, once ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Hero parallax (subtle drift + zoom) ---- */
  var heroMedia = document.querySelector('.hero__media');
  if (heroMedia && !reduceMotion) {
    var raf = 0;
    var park = function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < 900) {
          heroMedia.style.transform = 'translateY(' + (y * 0.32) + 'px) scale(' + (1 + Math.min(y, 600) * 0.0004) + ')';
        }
      });
    };
    window.addEventListener('scroll', park, { passive: true });
  }

  /* ---- Mobile nav toggle (progressive: nav hidden < 600px) ---- */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var open = mobileNav.hasAttribute('hidden') === false;
      if (open) { mobileNav.setAttribute('hidden', ''); navToggle.setAttribute('aria-expanded', 'false'); }
      else { mobileNav.removeAttribute('hidden'); navToggle.setAttribute('aria-expanded', 'true'); }
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.setAttribute('hidden', ''); navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
