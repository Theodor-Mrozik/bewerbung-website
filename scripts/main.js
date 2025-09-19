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
  // Default to dark mode unless the user explicitly saved a preference
  const initial = saved ? saved : 'dark';
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

// Active navigation link highlighting on scroll
const sections = document.querySelectorAll("section[id]");
const navLi = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

// On-scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Modal (Pop-up) Logic
const openModalButtons = document.querySelectorAll('[data-modal-open]');
const closeModalButtons = document.querySelectorAll('[data-modal-close]');

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modalOpen;
    const modal = document.getElementById(modalId);
    if (modal) {
      openModal(modal);
    }
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (modal) {
      closeModal(modal);
    }
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal.is-open');
    if (openModal) {
      closeModal(openModal);
    }
  }
});
