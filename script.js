// ==========================================
// 1. INISIALISASI AOS & TILT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 50 });
  }
});

// ==========================================
// 2. LOGIC PRELOADER (Minimalist AAA Style)
// ==========================================
(function initPreloader() {
  let percent = 0;
  const loadBar = document.getElementById('loadBar');
  const loadPercent = document.getElementById('loadPercent');
  const loadStatus = document.getElementById('loadStatus');
  const preloader = document.getElementById('preloader');

  const statuses = [
    "INITIALIZING SYSTEM...",
    "AUTHENTICATING DISCORD NODE...",
    "LOADING COMMUNITY ASSETS...",
    "PREPARING ENVIRONMENT...",
    "WELCOME TO GMG TEAM"
  ];

  const interval = setInterval(() => {
    percent += Math.floor(Math.random() * 6) + 3;
    if (percent > 100) percent = 100;

    const formattedPercent = percent < 10 ? '0' + percent : percent;

    if (loadBar) loadBar.style.width = percent + '%';
    if (loadPercent) loadPercent.innerText = formattedPercent;

    if (loadStatus) {
      if (percent < 25) loadStatus.innerText = statuses[0];
      else if (percent < 50) loadStatus.innerText = statuses[1];
      else if (percent < 75) loadStatus.innerText = statuses[2];
      else if (percent < 95) loadStatus.innerText = statuses[3];
      else loadStatus.innerText = statuses[4];
    }

    if (percent >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) {
          preloader.style.opacity = '0';
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 800);
        }
      }, 350);
    }
  }, 35);
})();

// ==========================================
// 3. FUNGSI NAVIGASI KALENDER (SOLUSI BULAN HILANG)
// ==========================================
function nextMonth() {
  const slider = document.getElementById('calendarSlider');
  if (slider) {
    slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
  }
}

function prevMonth() {
  const slider = document.getElementById('calendarSlider');
  if (slider) {
    slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
  }
}

function initAutoSlider(elementId, intervalTime = 5000) {
  const slider = document.getElementById(elementId);
  if (!slider) return;
  const totalSlides = slider.children.length;
  if (totalSlides > 1) {
    setInterval(() => {
      const slideWidth = slider.clientWidth;
      let currentSlide = Math.round(slider.scrollLeft / slideWidth);
      let nextSlide = (currentSlide + 1) % totalSlides;
      slider.scrollTo({ left: slideWidth * nextSlide, behavior: 'smooth' });
    }, intervalTime);
  }
}

// ==========================================
// 4. FUNGSI MODAL POPUP
// ==========================================
function openMapModal() {
  const modal = document.getElementById('mapModal');
  if (modal) modal.classList.remove('hidden');
}

function closeMapModal() {
  const modal = document.getElementById('mapModal');
  if (modal) modal.classList.add('hidden');
}

function openCatalogModal() {
  const modal = document.getElementById('catalogModal');
  if (modal) modal.classList.remove('hidden');
}

function closeCatalogModal() {
  const modal = document.getElementById('catalogModal');
  if (modal) modal.classList.add('hidden');
}

// Menutup modal jika area backdrop diklik
window.addEventListener('click', (event) => {
  const mapModal = document.getElementById('mapModal');
  const catalogModal = document.getElementById('catalogModal');
  
  if (event.target === mapModal) closeMapModal();
  if (event.target === catalogModal) closeCatalogModal();
});

// ==========================================
// 5. FUNGSI COPY TO CLIPBOARD
// ==========================================
function copyToClipboard(text, buttonElement) {
  function showFeedback() {
    if (!buttonElement) return;
    const originalText = buttonElement.innerText;
    buttonElement.innerText = 'COPIED!';
    buttonElement.style.color = '#06b6d4';
    buttonElement.style.borderColor = '#06b6d4';

    setTimeout(() => {
      buttonElement.innerText = originalText;
      buttonElement.style.color = '';
      buttonElement.style.borderColor = '';
    }, 2000);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(showFeedback).catch(() => {
      fallbackCopy(text);
      showFeedback();
    });
  } else {
    fallbackCopy(text);
    showFeedback();
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback copy error:', err);
  }
  document.body.removeChild(textArea);
}

// ==========================================
// 6. CONTROL BACK TO TOP (RADAR)
// ==========================================
window.addEventListener('scroll', () => {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'cursor-pointer');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100', 'cursor-pointer');
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 7. MEMUAT MODUL GALERI & KALENDER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Load File Galeri
  fetch('galeri.html')
    .then(res => {
      if (!res.ok) throw new Error('galeri.html not found');
      return res.text();
    })
    .then(html => {
      const container = document.getElementById('galeri-container');
      if (container) {
        container.innerHTML = html;
        initAutoSlider('gallerySlider', 5000);
      }
    })
    .catch(err => console.warn('Pemberitahuan Galeri:', err.message));

  // Load File Kalender
  fetch('kalender.html')
    .then(res => {
      if (!res.ok) throw new Error('kalender.html not found');
      return res.text();
    })
    .then(html => {
      const container = document.getElementById('kalender-container');
      if (container) container.innerHTML = html;
    })
    .catch(err => console.warn('Pemberitahuan Kalender:', err.message));
});
