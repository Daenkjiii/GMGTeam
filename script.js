// ==========================================
// 1. INISIALISASI AOS (Animasi Scroll)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 50 });
  }
});

// ==========================================
// 2. SISTEM PRELOADER (Layar Loading Gim)
// ==========================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
      preloader.style.opacity = '0'; // Memudar perlahan
      setTimeout(() => {
        preloader.style.display = 'none'; // Menghilangkan elemen
      }, 700);
    }
  }, 1500); // Tampil selama 1.5 detik
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
// 4. FUNGSI MODAL (Popups Map & Store)
// ==========================================
function openMapModal() { document.getElementById('mapModal').classList.remove('hidden'); }
function closeMapModal() { document.getElementById('mapModal').classList.add('hidden'); }
function openCatalogModal() { document.getElementById('catalogModal').classList.remove('hidden'); }
function closeCatalogModal() { document.getElementById('catalogModal').classList.add('hidden'); }

window.onclick = function(event) {
  const mapModal = document.getElementById('mapModal');
  const catalogModal = document.getElementById('catalogModal');
  if (event.target === mapModal) closeMapModal();
  if (event.target === catalogModal) closeCatalogModal();
}

// ==========================================
// 5. FUNGSI SLIDER OTOMATIS (Galeri & Event)
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
// 6. NAVIGASI KALENDER
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
// 7. MEMUAT FILE EKSTERNAL (Galeri & Kalender)
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

  // Refresh animasi pudar (AOS) setelah HTML tambahan dimuat
  Promise.all([loadGaleri, loadKalender]).then(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  });
});
