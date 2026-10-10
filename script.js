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
  if(slider) slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
}
function prevMonth() {
  const slider = document.getElementById('calendarSlider');
  if(slider) slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
}

// Memuat komponen kalender.html secara terpisah ke dalam index.html
document.addEventListener("DOMContentLoaded", () => {
  fetch('kalender.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('kalender-container').innerHTML = data;
    })
    .catch(error => console.error('Gagal memuat kalender:', error));

  // Inisialisasi Auto-slider Galeri
  initAutoSlider('gallerySlider', 5000);
  initAutoSlider('eventSlider', 5000);
  initAutoSlider('collabSlider', 5000);
});
