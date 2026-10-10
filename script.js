// Function Modal
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

// Function Slider Otomatis
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

// Navigasi Kalender
function nextMonth() {
  const slider = document.getElementById('calendarSlider');
  if (slider) slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
}
function prevMonth() {
  const slider = document.getElementById('calendarSlider');
  if (slider) slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
}

// Memuat Komponen Eksternal (Galeri & Kalender)
document.addEventListener("DOMContentLoaded", () => {
  // 1. Load Galeri Foto
  fetch('galeri.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('galeri-container').innerHTML = data;
      // Inisialisasi Auto-slider setelah galeri berhasil dimuat
      initAutoSlider('gallerySlider', 5000);
      initAutoSlider('eventSlider', 5000);
      initAutoSlider('collabSlider', 5000);
    })
    .catch(error => console.error('Gagal memuat galeri:', error));

  // 2. Load Kalender
  fetch('kalender.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('kalender-container').innerHTML = data;
    })
    .catch(error => console.error('Gagal memuat kalender:', error));
});
