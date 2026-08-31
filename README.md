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
