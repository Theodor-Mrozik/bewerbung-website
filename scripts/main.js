// Responsive Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    navToggle.classList.toggle('open');
  });
}

// Theme toggle with persistence and system preference
(function() {
  const root = document.documentElement;
  const btn = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  function setIcon(theme) {
    if (!btn) return;
    if (theme === 'dark') {
      btn.textContent = '☀️';
      btn.setAttribute('aria-label', 'Hellmodus aktivieren');
      btn.title = 'Hellmodus aktivieren';
    } else {
      btn.textContent = '🌙';
      btn.setAttribute('aria-label', 'Dunkelmodus aktivieren');
      btn.title = 'Dunkelmodus aktivieren';
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    setIcon(theme);
  }

  const saved = localStorage.getItem('theme');
  const initial = saved ? saved : (prefersDark && prefersDark.matches ? 'dark' : 'light');
  applyTheme(initial);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  if (prefersDark && prefersDark.addEventListener) {
    prefersDark.addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();

// Contact form: open mail client with prefilled content
(function() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (nameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const message = (messageInput?.value || '').trim();
    if (!name || !email || !message) {
      alert('Bitte Name, E-Mail und Nachricht ausfüllen.');
      return;
    }
    const to = 'theodor.mrozik@gmail.com';
    const subject = encodeURIComponent(`Kontakt über Bewerbung – ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
})();
