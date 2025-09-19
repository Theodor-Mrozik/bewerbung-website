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
  // Default to light mode unless the user explicitly saved a preference
  const initial = saved ? saved : 'light';
  applyTheme(initial);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  // Do not auto-switch with OS changes when no preference is saved;
  // light remains the default unless the user toggles explicitly.
})();

// Contact form: AJAX submission to Formspree
async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const status = document.getElementById("form-status");
  
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.innerHTML = "Danke für Ihre Nachricht!";
      status.className = 'success';
      form.reset();
    } else {
      const responseData = await response.json();
      if (Object.hasOwn(responseData, 'errors')) {
        status.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
        status.className = 'error';
      } else {
        status.innerHTML = "Oops! Da ist etwas schiefgelaufen.";
        status.className = 'error';
      }
    }
  } catch (error) {
    status.innerHTML = "Oops! Da ist etwas schiefgelaufen.";
    status.className = 'error';
  }
}

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", handleFormSubmit);
}
