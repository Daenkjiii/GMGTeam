// ==========================================
// 1. LOGIC PRELOADER
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
    percent += Math.floor(Math.random() * 8) + 4;
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
            // Pemicu ulang AOS setelah preloader hilang
            if (typeof AOS !== 'undefined') {
              AOS.init({ once: true, offset: 20 });
              AOS.refresh();
            }
          }, 700);
        }
      }, 200);
    }
  }, 25);
})();

// ==========================================
// 2. COUNTDOWN TIMER GIVEAWAY (MINGGU 20:00 WIB)
// ==========================================
function updateGiveawayCountdown() {
  const now = new Date();
  
  let nextDraw = new Date();
  nextDraw.setDate(now.getDate() + ((7 - now.getDay()) % 7));
  nextDraw.setHours(20, 0, 0, 0);

  if (now > nextDraw) {
    nextDraw.setDate(nextDraw.getDate() + 7);
  }

  const diff = nextDraw - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-minutes');
  const sEl = document.getElementById('cd-seconds');

  if (dEl) dEl.innerText = days < 10 ? '0' + days : days;
  if (hEl) hEl.innerText = hours < 10 ? '0' + hours : hours;
  if (mEl) mEl.innerText = minutes < 10 ? '0' + minutes : minutes;
  if (sEl) sEl.innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateGiveawayCountdown, 1000);
updateGiveawayCountdown();

// ==========================================
// 3. FUNGSI SLIDER OTOMATIS
// ==========================================
function initAutoSlider(elementId, intervalTime = 5000) {
  const slider = document.getElementById(elementId);
  if (!slider) return;

  if (slider.dataset.autoSliderInterval) {
    clearInterval(parseInt(slider.dataset.autoSliderInterval));
  }

  const totalSlides = slider.children.length;
  if (totalSlides <= 1) return;

  const intervalId = setInterval(() => {
    const firstChild = slider.firstElementChild;
    const slideWidth = firstChild ? firstChild.getBoundingClientRect().width : slider.clientWidth;
    if (slideWidth <= 0) return;

    let currentSlide = Math.round(slider.scrollLeft / slideWidth);
    let nextSlide = (currentSlide + 1) % totalSlides;

    slider.scrollTo({
      left: nextSlide * slideWidth,
      behavior: 'smooth'
    });
  }, intervalTime);

  slider.dataset.autoSliderInterval = intervalId;
}

// ==========================================
// 4. NAVIGASI KALENDER
// ==========================================
function nextMonth() {
  const slider = document.getElementById('calendarSlider');
  if (slider) {
    const firstChild = slider.firstElementChild;
    const slideWidth = firstChild ? firstChild.getBoundingClientRect().width : slider.clientWidth;
    slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
  }
}

function prevMonth() {
  const slider = document.getElementById('calendarSlider');
  if (slider) {
    const firstChild = slider.firstElementChild;
    const slideWidth = firstChild ? firstChild.getBoundingClientRect().width : slider.clientWidth;
    slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  }
}

// ==========================================
// 5. CONTROL MODAL POPUP
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

function openGiveawayModal() {
  const modal = document.getElementById('giveawayModal');
  if (modal) modal.classList.remove('hidden');
}

function closeGiveawayModal() {
  const modal = document.getElementById('giveawayModal');
  if (modal) modal.classList.add('hidden');
}

window.addEventListener('click', (event) => {
  const mapModal = document.getElementById('mapModal');
  const catalogModal = document.getElementById('catalogModal');
  const giveawayModal = document.getElementById('giveawayModal');
  
  if (event.target === mapModal) closeMapModal();
  if (event.target === catalogModal) closeCatalogModal();
  if (event.target === giveawayModal) closeGiveawayModal();
});

// ==========================================
// 6. COPY TO CLIPBOARD
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
// 7. BACK TO TOP
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
// 8. MEMUAT MODUL GALERI & KALENDER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const loadGaleri = fetch('galeri.html')
    .then(res => {
      if (!res.ok) throw new Error('galeri.html not found');
      return res.text();
    })
    .then(html => {
      const container = document.getElementById('galeri-container');
      if (container) {
        container.innerHTML = html;
        initAutoSlider('gallerySlider', 5000);
        initAutoSlider('eventSlider', 5000);
        initAutoSlider('collabSlider', 5000);
      }
    })
    .catch(err => console.warn('Pemberitahuan Galeri:', err.message));

  const loadKalender = fetch('kalender.html')
    .then(res => {
      if (!res.ok) throw new Error('kalender.html not found');
      return res.text();
    })
    .then(html => {
      const container = document.getElementById('kalender-container');
      if (container) {
        container.innerHTML = html;
      }
    })
    .catch(err => console.warn('Pemberitahuan Kalender:', err.message));

  Promise.all([loadGaleri, loadKalender]).then(() => {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });
});
