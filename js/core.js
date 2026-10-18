// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check user preference (Default: Dark Mode)
const savedTheme = localStorage.getItem('theme_mode');
let isDark = savedTheme !== null ? savedTheme === 'dark' : true;

function setTheme(dark) {
  isDark = dark;
  if (isDark) {
    root.setAttribute('data-theme', 'dark');
    if(themeBtn) themeBtn.innerHTML = '<i class="ph-fill ph-sun" style="font-size: 1.25rem; display: block;"></i>';
  } else {
    root.setAttribute('data-theme', 'light');
    if(themeBtn) themeBtn.innerHTML = '<i class="ph-fill ph-moon" style="font-size: 1.25rem; display: block;"></i>';
  }
}

// Initial set (no auto-persist so default remains dynamic)
setTheme(isDark);

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    setTheme(!isDark);
    localStorage.setItem('theme_mode', isDark ? 'dark' : 'light');
  });
}

// Custom Cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
}, { passive: true });

document.addEventListener('mouseleave', () => {
  cursor.style.display = 'none';
});
document.addEventListener('mouseenter', () => {
  cursor.style.display = 'block';
});

// Delegate cursor hover state for static and dynamic elements (modals, buttons, links)
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('a, button, .card, [role="button"], input, select, textarea, .nav-link, .neo-modal-close-btn')) {
    cursor.classList.add('hover');
  } else {
    cursor.classList.remove('hover');
  }
});

// Boot Loader & Typewriter
window.addEventListener('load', () => {
  const loader = document.getElementById('boot-loader');
  
  function startTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const text = el.getAttribute('data-text');
    el.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50);
      } else {
        el.style.borderRight = 'none'; // remove cursor blink
      }
    }
    type();
  }

  if (loader) {
    if (!sessionStorage.getItem('booted')) {
      sessionStorage.setItem('booted', 'true');
      const lines = [
        "Initializing deployment environment...",
        "Resolving package dependencies...",
        "Building static assets...",
        "Starting edge functions...",
        "Deployment successful. Routing traffic..."
      ];
      let i = 0;
      const content = document.getElementById('boot-content');
      
      function addLine() {
        if (i < lines.length) {
          content.innerHTML += `<div>> ${lines[i]}</div>`;
          i++;
          setTimeout(addLine, Math.random() * 200 + 150);
        } else {
          setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
              loader.remove();
              startTypewriter();
            }, 500);
          }, 600);
        }
      }
      addLine();
    } else {
      loader.remove();
      startTypewriter();
    }
  } else {
    startTypewriter();
  }
});

// ==========================================
// Neo-Brutalist Modal System & Language Popup
// ==========================================
let neoModalBackdrop = document.getElementById('neo-modal-backdrop');

function createNeoModal() {
  if (neoModalBackdrop) return;
  
  neoModalBackdrop = document.createElement('div');
  neoModalBackdrop.id = 'neo-modal-backdrop';
  neoModalBackdrop.className = 'neo-modal-backdrop';
  neoModalBackdrop.innerHTML = `
    <div class="neo-modal-card" role="dialog" aria-modal="true" aria-labelledby="neo-modal-title">
      <div class="neo-modal-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i id="neo-modal-icon" class="ph-bold ph-translate" style="font-size: 1.25rem; color: var(--accent-primary);"></i>
          <span id="neo-modal-category" class="font-mono" style="font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase;">LOCALIZATION NOTICE</span>
        </div>
        <button id="neo-modal-close-x" class="neo-modal-close-btn" aria-label="Close Modal">
          <i class="ph-bold ph-x"></i>
        </button>
      </div>
      <div class="neo-modal-body">
        <h3 id="neo-modal-title" class="font-display" style="font-size: 1.35rem; margin-bottom: 0.75rem; color: var(--text-primary); line-height: 1.25;">
          Bahasa Indonesia Sedang Disiapkan
        </h3>
        <p id="neo-modal-msg" style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1.5rem;">
          Versi Bahasa Indonesia untuk portofolio teknis ini sedang dalam tahap lokalisasi dan standardisasi konten rekayasa. Seluruh studi kasus dan pembuktian metrik saat ini tersedia lengkap pada versi bahasa Inggris (EN).
        </p>
        <div style="display: flex; justify-content: flex-end;">
          <button id="neo-modal-close-btn" class="btn btn-primary" style="padding: 0.65rem 1.4rem; font-size: 0.85rem;">
            MENGERTI
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(neoModalBackdrop);

  // Close triggers
  const closeBtn = neoModalBackdrop.querySelector('#neo-modal-close-btn');
  const closeX = neoModalBackdrop.querySelector('#neo-modal-close-x');
  
  const closeModal = () => {
    neoModalBackdrop.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeX) closeX.addEventListener('click', closeModal);
  
  neoModalBackdrop.addEventListener('click', (e) => {
    if (e.target === neoModalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && neoModalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

function showNeoModal(options = {}) {
  createNeoModal();
  if (options.title) {
    const titleEl = document.getElementById('neo-modal-title');
    if (titleEl) titleEl.textContent = options.title;
  }
  if (options.message) {
    const msgEl = document.getElementById('neo-modal-msg');
    if (msgEl) msgEl.textContent = options.message;
  }
  if (options.category) {
    const catEl = document.getElementById('neo-modal-category');
    if (catEl) catEl.textContent = options.category;
  }
  if (options.buttonText) {
    const btnEl = document.getElementById('neo-modal-close-btn');
    if (btnEl) btnEl.textContent = options.buttonText;
  }
  
  // Ensure custom cursor element is always the last child in body so it renders on top
  if (cursor && cursor.parentElement === document.body) {
    document.body.appendChild(cursor);
  }
  
  // Show modal
  requestAnimationFrame(() => {
    neoModalBackdrop.classList.add('active');
  });
}

// Language Dropdown Logic
const langBtn = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');

if (langBtn && langMenu) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent document click from firing immediately
    const isVisible = langMenu.style.display === 'flex';
    langMenu.style.display = isVisible ? 'none' : 'flex';
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.style.display = 'none';
    }
  });

  // Handle click on Indonesia (ID) option
  langMenu.addEventListener('click', (e) => {
    const target = e.target.closest('.lang-id-btn, [data-lang="id"]');
    // Fallback: check if clicked item text contains Indonesia
    const isIdOption = target || (e.target.textContent && e.target.textContent.includes('Indonesia'));
    
    if (isIdOption) {
      e.preventDefault();
      e.stopPropagation();
      langMenu.style.display = 'none';
      showNeoModal({
        category: 'LOCALIZATION NOTICE',
        title: 'Bahasa Indonesia Sedang Disiapkan',
        message: 'Versi Bahasa Indonesia untuk portofolio teknis ini sedang dalam tahap lokalisasi dan standardisasi konten rekayasa. Seluruh studi kasus dan pembuktian metrik saat ini tersedia lengkap pada versi bahasa Inggris (EN).',
        buttonText: 'MENGERTI'
      });
    }
  });
}

// Brutalist Tooltip Logic
const customTooltip = document.createElement('div');
customTooltip.className = 'brutalist-tooltip';
document.body.appendChild(customTooltip);

document.addEventListener('mouseover', (e) => {
  const target = e.target.closest('[data-tooltip]');
  if (target) {
    customTooltip.textContent = target.getAttribute('data-tooltip');
    customTooltip.classList.add('visible');
  } else {
    customTooltip.classList.remove('visible');
  }
});

document.addEventListener('mousemove', (e) => {
  if (customTooltip.classList.contains('visible')) {
    customTooltip.style.left = (e.clientX + 15) + 'px';
    customTooltip.style.top = (e.clientY + 15) + 'px';
  }
});

// Smooth Hortensia Page Transition Interceptor
document.addEventListener("DOMContentLoaded", () => {

  // Home Page Intro Sequence
  const heroPhoto = document.querySelector('.hero-hidden-photo');
  const heroLogo = document.querySelector('.hero-logo-trigger');
  if (heroPhoto && heroLogo) {
    // Start with photo visible
    document.body.classList.add('intro-active');
    
    // Dismiss photo after 1.2s
    setTimeout(() => {
      document.body.classList.remove('intro-active');
      
      // Twitch the logo as the photo leaves to draw attention
      setTimeout(() => {
        heroLogo.classList.add('logo-twitch');
        setTimeout(() => {
          heroLogo.classList.remove('logo-twitch');
        }, 700);
      }, 400); 
    }, 1200);
  }

  // Select all internal links
  const internalLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"])');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      
      // Determine destination name for transition text
      let destName = link.textContent.trim().toUpperCase();
      if(!destName || destName === "") {
        destName = "DESTINATION";
      }
      
      // Trigger exit animation with text
      document.body.setAttribute('data-transition-text', `ROUTING TO ${destName} //`);
      document.body.classList.add('page-exit');
      
      // Wait for animation to finish (0.5s) before navigating
      setTimeout(() => {
        window.location.href = href;
      }, 500); 
    });
  });
});

// Fix for browser back button cache restoring page with opacity 0
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    document.body.classList.remove('page-exit');
  }
});


// Mobile Hamburger Menu Logic
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');

if (hamburgerBtn && mainNav) {
hamburgerBtn.addEventListener('click', () => {
  mainNav.classList.toggle('mobile-active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburgerBtn.contains(e.target) && !mainNav.contains(e.target)) {
    mainNav.classList.remove('mobile-active');
  }
});
}
