/* scroll.js — Scroll choreography for Chris Wu, Guanqing */

// ── 1. Nav: transparent → white on scroll ──────────────────────────────────
const nav = document.getElementById('site-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── 2. IntersectionObserver for all data-scroll + curtain elements ──────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -48px 0px'
});

document.querySelectorAll('[data-scroll], .curtain-wrap').forEach(el => observer.observe(el));

// ── 3. Hero parallax ────────────────────────────────────────────────────────
const heroBg = document.querySelector('.hero-bg img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
  }, { passive: true });
}

// ── 4. Scroll-position section label ───────────────────────────────────────
const scrollLabel = document.querySelector('.scroll-label');
const sections = document.querySelectorAll('section[data-label]');

if (scrollLabel && sections.length) {
  const labelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrollLabel.textContent = entry.target.dataset.label;
        scrollLabel.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => labelObserver.observe(s));
}

// ── 5. Parallax bands ──────────────────────────────────────────────────────
const bandImgs = document.querySelectorAll('.parallax-band img');
if (bandImgs.length) {
  const updateBands = () => {
    bandImgs.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const progress = (window.innerHeight / 2 - center) / window.innerHeight;
      img.style.transform = `translateY(${progress * 90}px)`;
    });
  };
  window.addEventListener('scroll', updateBands, { passive: true });
  updateBands();
}

// ── 6. Hero text entrance on load ──────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
    setTimeout(() => heroText.classList.add('revealed'), 300);
  }
});
