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

  /* ---- Count-up numbers (timeline stats) ---- */
  function fmtCount(el, v) {
    var target = parseFloat(el.getAttribute('data-count'));
    var plain = el.getAttribute('data-plain');
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = (String(target).split('.')[1] || '').length;
    return (plain ? Math.round(v).toString() : v.toFixed(decimals)) + suffix;
  }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var startTs = null, dur = 1100;
    function tick(ts) {
      if (startTs === null) startTs = ts;
      var p = Math.min(1, (ts - startTs) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmtCount(el, target * eased);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmtCount(el, target);
    }
    requestAnimationFrame(tick);
  }
  var counts = document.querySelectorAll('[data-count]');
  if (counts.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counts.forEach(function (el) { el.textContent = fmtCount(el, parseFloat(el.getAttribute('data-count'))); });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counts.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
