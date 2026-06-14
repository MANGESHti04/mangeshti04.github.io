/* =============================================
   MANGESH TIWARI — PORTFOLIO INTERACTIONS
   Typing animation · Scroll reveal · Nav effects
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initScrollReveal();
  initNavigation();
  initSmoothScroll();
  initActiveNavHighlight();
});

/* ── Typing Animation ── */
function initTypingAnimation() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Electronics & Telecommunication Engineer',
    'Embedded Systems Builder',
    'Robotics Enthusiast',
    'Control Systems Nerd',
    'Cybersecurity Practitioner',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pauseTime = 0;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing forward
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        // Pause before deleting
        pauseTime = 2000;
        isDeleting = true;
      } else {
        pauseTime = 50 + Math.random() * 40; // Natural typing speed
      }
    } else {
      // Deleting
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        pauseTime = 400;
      } else {
        pauseTime = 25 + Math.random() * 15; // Faster deletion
      }
    }

    setTimeout(type, pauseTime);
  }

  // Start after initial page animation
  setTimeout(type, 800);
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);

  reveals.forEach((el) => observer.observe(el));
}

/* ── Navigation ── */
function initNavigation() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  // Scroll effect — add background on scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('nav__links--open');
      const isOpen = links.classList.contains('nav__links--open');
      toggle.setAttribute('aria-expanded', isOpen);

      // Animate hamburger to X
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu on link click
    links.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('nav__links--open');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/* ── Active Nav Highlight ── */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -60% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}
