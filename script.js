// ==========================================
// 1. INISIALISASI AOS (ANIMASI SCROLL)
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
// 3. COUNTDOWN TIMER GIVEAWAY (SETIAP MINGGU 20:00 WIB)
// ==========================================
function updateGiveawayCountdown() {
  const now = new Date();
  
  // Target hari Minggu pukul 20:00 WIB
  let nextDraw = new Date();
  nextDraw.setDate(now.getDate() + ((7 - now.getDay()) % 7));
  nextDraw.setHours(20, 0, 0, 0);

  // Jika hari ini Minggu dan sudah lewat jam 20:00, targetkan ke Minggu depan
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
// 4. FUNGSI SLIDER OTOMATIS (GALERI, EVENT, COLLAB)
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
// 5. NAVIGASI KALENDER BULAN
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
// 6. FUNGSI CONTROL MODAL POPUP (MAP, KATALOG, GIVEAWAY)
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

// Menutup modal jika klik di luar area modal
window.addEventListener('click', (event) => {
  const mapModal = document.getElementById('mapModal');
  const catalogModal = document.getElementById('catalogModal');
  const giveawayModal = document.getElementById('giveawayModal');
  
  if (event.target === mapModal) closeMapModal();
  if (event.target === catalogModal) closeCatalogModal();
  if (event.target === giveawayModal) closeGiveawayModal();
});

// ==========================================
// 7. FUNGSI COPY TO CLIPBOARD
// ==========================================
function copyToClipboard(text, buttonElement) {
  function showFeedback() {
    if (!buttonElement) return;
    const originalText = buttonElement.innerText;
    buttonElement.innerText = 'COPIED!';
    buttonElement.style.color = '#06
