// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check user preference or system default
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDark = localStorage.getItem('theme') ? localStorage.getItem('theme') === 'dark' : prefersDark;

function setTheme(dark) {
  isDark = dark;
  if (isDark) {
    root.setAttribute('data-theme', 'dark');
    if(themeBtn) themeBtn.innerHTML = '<i class="ph-fill ph-sun" style="font-size: 1.25rem; display: block;"></i>';
  } else {
    root.setAttribute('data-theme', 'light');
    if(themeBtn) themeBtn.innerHTML = '<i class="ph-fill ph-moon" style="font-size: 1.25rem; display: block;"></i>';
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initial set
setTheme(isDark);

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    setTheme(!isDark);
  });
}

// Custom Cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
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
