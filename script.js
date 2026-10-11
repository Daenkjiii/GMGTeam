// ==========================================
// 1. FUNGSI MODAL (Popups untuk Map & Store)
// ==========================================
function openMapModal() { 
  document.getElementById('mapModal').classList.remove('hidden'); 
}
function closeMapModal() { 
  document.getElementById('mapModal').classList.add('hidden'); 
}
function openCatalogModal() { 
  document.getElementById('catalogModal').classList.remove('hidden'); 
}
function closeCatalogModal() { 
  document.getElementById('catalogModal').classList.add('hidden'); 
}

// Menutup modal otomatis jika user klik di luar kotak hitam modal
window.onclick = function(event) {
  const mapModal = document.getElementById('mapModal');
  const catalogModal = document.getElementById('catalogModal');
  if (event.target === mapModal) closeMapModal();
  if (event.target === catalogModal) closeCatalogModal();
}

// ==========================================
// 2. FUNGSI SLIDER OTOMATIS (Galeri & Event)
// ==========================================
function initAutoSlider(elementId, intervalTime = 5000) {
  const slider = document.getElementById(elementId);
  if (!slider) return; // Jika slider tidak ditemukan, lewati
  
  const totalSlides = slider.children.length;
  if (totalSlides > 1) {
    setInterval(() => {
      const slideWidth = slider.clientWidth;
      let currentSlide = Math.round(slider.scrollLeft / slideWidth);
      let nextSlide = (currentSlide + 1) % totalSlides;
      
      // Geser ke slide berikutnya
      slider.scrollTo({ left: slideWidth * nextSlide, behavior: 'smooth' });
    }, intervalTime);
  }
}

// ==========================================
// 3. NAVIGASI KALENDER (Bulan Berikutnya/Sebelumnya)
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
// 4. MEMUAT FILE EKSTERNAL (Galeri & Kalender) & REFRESH ANIMASI
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  
  // A. Memuat file galeri.html
  const loadGaleri = fetch('galeri.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('galeri-container').innerHTML = data;
      // Aktifkan slider foto HANYA SETELAH galeri berhasil dimuat
      initAutoSlider('gallerySlider', 5000);
      initAutoSlider('eventSlider', 5000);
      initAutoSlider('collabSlider', 5000);
    })
    .catch(error => console.error('Gagal memuat galeri:', error));

  // B. Memuat file kalender.html
  const loadKalender = fetch('kalender.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('kalender-container').innerHTML = data;
    })
    .catch(error => console.error('Gagal memuat kalender:', error));

  // C. JALANKAN REFRESH ANIMASI (Tunggu sampai galeri & kalender selesai masuk)
  Promise.all([loadGaleri, loadKalender]).then(() => {
    // Memastikan efek pudar (AOS dari library di index.html) me-refresh datanya
    // sehingga elemen galeri dan kalender ikut muncul perlahan saat di-scroll
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });

});
