# 🕌 Al-Waqt (الْوَقْت) • Presisi Waktu & Sholat Islami

Aplikasi Jam Islami Mewah, Jadwal Sholat Presisi (Kemenag RI), Kompas Arah Kiblat Real-time, Hitung Mundur Ramadhan & Idul Fitri, serta Inspirasi Harian Al-Qur'an.

Tersedia dalam 2 platform:
1. **Web Version** (HTML5, CSS3 Modular, Vanilla JavaScript ES6+)
2. **Mobile Version** (Flutter / Dart Cross-Platform Android & iOS)

---

## ✨ Fitur Utama

- ⏱️ **Jam Analog & Digital Mewah**:
  - Jarum detik *Smooth Sweep* (meluncur halus).
  - Pilihan Angka Arab (١, ٢, ٣) & Latin (1, 2, 3).
  - Format 24 Jam atau 12 Jam (AM/PM).
  - Kalender Hijriah & Masehi otomatis.
- 🕋 **Kompas Arah Kiblat Interaktif**:
  - Perhitungan sudut azimut Ka'bah presisi (Great-Circle Equation).
  - Sensor gyro/magnetometer real-time (Mobile) & simulasi interaktif (Web).
- 🕌 **Jadwal Sholat 8 Waktu Presisi (Kemenag RI API)**:
  - Imsak, Subuh, Terbit, Dhuha, Dzuhur, Ashar, Maghrib, Isya.
  - Beacon countdown live menuju waktu sholat berikutnya.
  - Pencarian wilayah & kecamatan seluruh Indonesia.
- 📢 **Audio Adzan Otomatis & 4 Pilihan Muazin**:
  - Makkah Al-Mukarramah, Madinah Al-Munawwarah, Mesir (Cairo), dan Turki (Istanbul).
  - Khusus waktu Subuh: Otomatis melantunkan lafadz *Tatswib* (*Ash-Shalatu Khairum Minan-Naum*).
- 🌙 **Hitung Mundur Ramadhan & Idul Fitri**:
  - Estimasi kalender Masehi 1448 H / 2027 M.
- 📖 **Inspirasi Harian Ayat Al-Qur'an**:
  - Kaligrafi Arab tajwid, terjemahan bahasa Indonesia, dan renungan harian.
- 🌓 **Tema Obsidian Jade (Dark) & Opal Ivory (Light)**.

---

## 🌐 Sumber Data & API (Data Sources)

Aplikasi ini menggunakan integrasi data resmi & algoritma astronomis presisi:

### 1. API Jadwal Sholat & Kalender Hijriah
* **Penyedia API**: [MyQuran API v2 (API Muslim)](https://api.myquran.com)
* **Sumber Data Asli**: **Bimas Islam Kementerian Agama Republik Indonesia (Kemenag RI)**.
* **Endpoint yang Digunakan**:
  * Daftar Semua Kota/Kabupaten: `GET https://api.myquran.com/v2/sholat/kabkota/semua`
  * Cari Kota/Wilayah: `GET https://api.myquran.com/v2/sholat/kabkota/cari/{nama_kota}`
  * Jadwal Sholat Harian: `GET https://api.myquran.com/v2/sholat/jadwal/{id_kota}/{tahun}/{bulan}/{tanggal}`
  * Tanggal Hijriah: `GET https://api.myquran.com/v2/cal/today?tz=Asia%2FJakarta`

### 2. Perhitungan Arah Kiblat (Qibla Geodesic Calculation)
* **Metode**: Trigonometri Bola (*Great-Circle Navigation / Forward Azimuth Formula*).
* **Titik Koordinat Ka'bah (Makkah)**:
  * Latitude ($\phi_2$): `21.422487° N`
  * Longitude ($\lambda_2$): `39.826206° E`
* **Rumus Azimut Kiblat**:
  $$\theta = \text{atan2}\left(\sin(\Delta \lambda), \cos(\phi_1)\tan(\phi_2) - \sin(\phi_1)\cos(\Delta \lambda)\right)$$

### 3. Database Ayat Harian & Audio Adzan (Lokal / Offline)
* **Inspirasi Al-Qur'an**: 31 Ayat tematik harian dari Mushaf Standar Indonesia & Terjemahan Kemenag RI.
* **Audio Muazin**: Audio adzan berkualitas tinggi dari Makkah, Madinah, Mesir, Turki, dan Subuh Tatswib.

---

## 🚀 Cara Menjalankan

### 1. Web Version
Cukup buka `index.html` di browser apa pun atau gunakan Live Server:
```bash
# Menggunakan python http server (opsional)
python -m http.server 8080
```

### 2. Flutter Mobile App (`al_waqt_mobile`)
```bash
cd al_waqt_mobile
flutter pub get
flutter run
```

Untuk build APK Android:
```bash
flutter build apk --release
```

---

## 📜 Lisensi
Open-source di bawah lisensi MIT.
