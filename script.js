// ==========================================
// 1. INISIALISASI AOS (Animasi Scroll)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 50 });
  }
});

// ==========================================
// 2. SISTEM PRELOADER (Gaya AAA Minimalist)
// ==========================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const percentText = document.getElementById('preloader-percent');
  const statusText = document.getElementById('preloader-status-text');
  const progressBar = document.getElementById('preloader-bar');

  if (!preloader) return;

  let progress = 0;
  const statuses = [
    "INITIALIZING SYSTEM...",
    "AUTHENTICATING DISCORD NODE...",
    "LOADING COMMUNITY ASSETS...",
    "WELCOME TO GMG TEAM"
  ];

  // Animasi hitungan persentase dinamis
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 6;
    if (progress > 100) progress = 100;

    if (percentText) percentText.innerText = `${progress}%`;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (statusText) {
      if (progress < 30) statusText.innerText = statuses[0];
      else if (progress < 65) statusText.innerText = statuses[1];
      else if (progress < 90) statusText.innerText = statuses[2];
      else statusText.innerText = statuses[3];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 700);
      }, 400);
    }
  }, 70);
});

// ==========================================
// 3. BACK TO TOP (Tombol Radar HUD)
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
// 4. FUNGSI MODAL (Map & Catalog Store)
// ==========================================
function openMapModal() { document.getElementById('mapModal').classList.remove('hidden'); }
function closeMapModal() { document.getElementById('mapModal').classList.add('hidden'); }

function openCatalogModal() { document.getElementById('catalogModal').classList.remove('hidden'); }
function closeCatalogModal() { document.getElementById('catalogModal').classList.add('hidden'); }

// Menutup modal otomatis jika klik di luar area kotak
window.onclick = function(event) {
  const mapModal = document.getElementById('mapModal');
  const catalogModal = document.getElementById('catalogModal');
  
  if (event.target === mapModal) closeMapModal();
  if (event.target === catalogModal) closeCatalogModal();
}

// ==========================================
// 5. FUNGSI SALIN LINK DALAM MODAL (QUICK COPY)
// ==========================================
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.innerText;
    buttonElement.innerText = 'COPIED!';
    buttonElement.style.color = '#06b6d4'; // Warna Cyan ala gaming
    buttonElement.style.borderColor = '#06b6d4';
    
    setTimeout(() => {
      buttonElement.innerText = originalText;
      buttonElement.style.color = ''; 
      buttonElement.style.borderColor = '';
    }, 2000);
  }).catch(err => {
    console.error('Gagal menyalin:', err);
  });
}

// ==========================================
// 6. FUNGSI SLIDER OTOMATIS (Galeri & Event)
// ==========================================
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
// 7. NAVIGASI KALENDER
// ==========================================
function nextMonth() {
  const slider = document.getElementById('calendarSlider');
  if (slider) slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
}
function prevMonth() {
  const slider = document.getElementById('calendarSlider');
  if (slider) slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
}

// ==========================================
// 8. MEMUAT FILE EKSTERNAL (Galeri & Kalender)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const loadGaleri = fetch('galeri.html')
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById('galeri-container');
      if(container) {
        container.innerHTML = data;
        initAutoSlider('gallerySlider', 5000);
        initAutoSlider('eventSlider', 5000);
        initAutoSlider('collabSlider', 5000);
      }
    }).catch(error => console.error('Gagal memuat galeri:', error));

  const loadKalender = fetch('kalender.html')
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById('kalender-container');
      if(container) container.innerHTML = data;
    }).catch(error => console.error('Gagal memuat kalender:', error));

  // Refresh animasi AOS setelah galeri & kalender dimuat
  Promise.all([loadGaleri, loadKalender]).then(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  });
});
