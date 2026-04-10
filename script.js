// ============================================
//  SKYJOURNEY TRAVEL AGENCY — SCRIPT.JS
//   Validasi JavaScript Form
//  DOM Manipulation - Daftar Artikel
// ============================================

// ----  DATA ARTIKEL ----
let artikelData = [
  { id: 1, judul: 'Tips Traveling ke Bali — Pantai & Pura Terbaik' },
  { id: 2, judul: 'Paris & London: Panduan Wisata Eropa Ikonik' },
  { id: 3, judul: 'Japan Cherry Blossom — Musim Sakura Terbaik' },
  { id: 4, judul: 'Singapore City Tour — Marina Bay hingga Sentosa' },
  { id: 5, judul: 'Korea Selatan — K-Pop, Kuliner, dan Istana Bersejarah' },
  { id: 6, judul: 'New York City — Times Square hingga Central Park' },
  { id: 7, judul: 'Istanbul & Cappadocia — Keajaiban Dua Benua' },
  { id: 8, judul: 'India Taj Mahal & Rajasthan — Warna Budaya yang Memukau' },
  { id: 9, judul: 'Italy Rome & Venice — Colosseum dan Kanal Venezia' },
  { id: 10, judul: 'Bangkok City Tour — Kuil, Street Food & Pasar Malam' },
  { id: 11, judul: 'Swiss Alps & Zurich — Pegunungan Alpen yang Dramatis' },
];

let nextId = 12;

// Render semua artikel ke halaman
function renderArtikel() {
  const list = document.getElementById('artikelList');
  const emptyMsg = document.getElementById('emptyMsg');

  list.innerHTML = '';

  if (artikelData.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }

  emptyMsg.style.display = 'none';

  artikelData.forEach(function (item) {
    const div = document.createElement('div');
    div.className = 'artikel-item';
    div.setAttribute('data-id', item.id);

    div.innerHTML = `
      <span class="artikel-judul">${item.judul}</span>
      <button class="btn-hapus" onclick="hapusArtikel(${item.id})">Hapus</button>
    `;

    list.appendChild(div);
  });
}

// Tambah artikel baru (tanpa reload)
function tambahArtikel() {
  const input = document.getElementById('inputArtikel');
  const errArtikel = document.getElementById('err-artikel');
  const judul = input.value.trim();

  if (judul === '') {
    errArtikel.textContent = '⚠ Judul artikel tidak boleh kosong!';
    input.focus();
    return;
  }

  if (judul.length < 5) {
    errArtikel.textContent = '⚠ Judul minimal 5 karakter.';
    input.focus();
    return;
  }

  errArtikel.textContent = '';
  artikelData.push({ id: nextId++, judul: judul });
  input.value = '';
  renderArtikel();
}

// Hapus artikel (tanpa reload)
function hapusArtikel(id) {
  artikelData = artikelData.filter(function (item) {
    return item.id !== id;
  });
  renderArtikel();
}

// Tambah juga dengan tekan Enter
document.addEventListener('DOMContentLoaded', function () {
  renderArtikel();

  const inputArtikel = document.getElementById('inputArtikel');
  if (inputArtikel) {
    inputArtikel.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tambahArtikel();
    });
  }

  // ----  VALIDASI JAVASCRIPT ----
  const form = document.getElementById('bookingForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    clearErrors();
    let isValid = true;

    // 1. Validasi Nama
    const nama = getValue('namaLengkap');
    if (nama === '') {
      showError('err-nama', 'namaLengkap', '⚠ Nama lengkap tidak boleh kosong.');
      isValid = false;
    } else if (nama.length < 3) {
      showError('err-nama', 'namaLengkap', '⚠ Nama minimal 3 karakter.');
      isValid = false;
    }

    // 2. Validasi Email
    const email = getValue('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      showError('err-email', 'email', '⚠ Email tidak boleh kosong.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError('err-email', 'email', '⚠ Format email tidak valid. Contoh: nama@email.com');
      isValid = false;
    }

    // 3. Validasi Password
    const password = getValue('password');
    if (password === '') {
      showError('err-password', 'password', '⚠ Password tidak boleh kosong.');
      isValid = false;
    } else if (password.length < 8) {
      showError('err-password', 'password', '⚠ Password minimal 8 karakter.');
      isValid = false;
    }

    // 4. Validasi Telepon
    const telepon = getValue('telepon');
    if (telepon === '') {
      showError('err-telepon', 'telepon', '⚠ Nomor telepon tidak boleh kosong.');
      isValid = false;
    } else if (isNaN(telepon) || Number(telepon) <= 0) {
      showError('err-telepon', 'telepon', '⚠ Nomor telepon harus berupa angka positif.');
      isValid = false;
    } else if (telepon.length < 10 || telepon.length > 15) {
      showError('err-telepon', 'telepon', '⚠ Nomor telepon tidak valid (10-15 digit).');
      isValid = false;
    }

    // 5. Validasi Paket
    const paket = getValue('paket');
    if (paket === '') {
      showError('err-paket', 'paket', '⚠ Silakan pilih paket wisata.');
      isValid = false;
    }

    // 6. Validasi Budget
    const budget = getValue('budget');
    if (budget === '') {
      showError('err-budget', 'budget', '⚠ Budget tidak boleh kosong.');
      isValid = false;
    } else if (isNaN(budget) || Number(budget) <= 0) {
      showError('err-budget', 'budget', '⚠ Budget harus berupa angka positif.');
      isValid = false;
    }

    // 7. Validasi Tanggal
    const tanggal = getValue('tanggal');
    if (tanggal === '') {
      showError('err-tanggal', 'tanggal', '⚠ Tanggal keberangkatan tidak boleh kosong.');
      isValid = false;
    }

    // 8. Validasi Peserta
    const peserta = getValue('peserta');
    if (peserta === '') {
      showError('err-peserta', 'peserta', '⚠ Jumlah peserta tidak boleh kosong.');
      isValid = false;
    } else if (isNaN(peserta) || Number(peserta) <= 0) {
      showError('err-peserta', 'peserta', '⚠ Jumlah peserta harus berupa angka positif.');
      isValid = false;
    }

    // 9. Validasi Kamar
    const kamar = document.querySelector('input[name="kamar"]:checked');
    if (!kamar) {
      document.getElementById('err-kamar').textContent = '⚠ Silakan pilih jenis kamar hotel.';
      isValid = false;
    }

    if (isValid) {
      document.getElementById('successMsg').style.display = 'block';
      form.reset();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () {
        document.getElementById('successMsg').style.display = 'none';
      }, 5000);
    }
  });

  // ---- Active nav link saat scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
});

// ---- Helper Functions ----
function getValue(id) {
  return document.getElementById(id).value.trim();
}

function showError(errId, inputId, msg) {
  document.getElementById(errId).textContent = msg;
  const el = document.getElementById(inputId);
  if (el) el.classList.add('invalid');
}

function clearErrors() {
  const errors = document.querySelectorAll('.error-msg');
  errors.forEach(function (e) {
    e.textContent = '';
  });

  const invalids = document.querySelectorAll('.invalid');
  invalids.forEach(function (el) {
    el.classList.remove('invalid');
  });

  document.getElementById('successMsg').style.display = 'none';
}
