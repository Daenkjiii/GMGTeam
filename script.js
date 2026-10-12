// ==========================================
// LOGIC COUNTDOWN TIMER GIVEAWAY (SETIAP MINGGU JAM 20:00 WIB)
// ==========================================
function updateGiveawayCountdown() {
  const now = new Date();
  
  // Menentukan target hari Minggu berikutnya pukul 20:00 WIB
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

// Jalankan timer setiap 1 detik
setInterval(updateGiveawayCountdown, 1000);
updateGiveawayCountdown();

// ==========================================
// CONTROL MODAL GIVEAWAY S&K
// ==========================================
function openGiveawayModal() {
  const modal = document.getElementById('giveawayModal');
  if (modal) modal.classList.remove('hidden');
}

function closeGiveawayModal() {
  const modal = document.getElementById('giveawayModal');
  if (modal) modal.classList.add('hidden');
}

// Tutup modal jika area luar diklik
window.addEventListener('click', (event) => {
  const giveawayModal = document.getElementById('giveawayModal');
  if (event.target === giveawayModal) closeGiveawayModal();
});
