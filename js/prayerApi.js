/**
 * PRAYERAPI.JS - API Muslim Integration (Jadwal Sholat & Kalender Hijriah)
 */

async function fetchAllCities() {
    try {
        const response = await fetch(`${API_BASE}/sholat/kabkota/semua`);
        const result = await response.json();
        if (result.status && Array.isArray(result.data)) {
            state.allCities = result.data;
            const matched = state.allCities.find(c => c.lokasi.includes('JAKARTA'));
            if (matched && state.selectedCity.id === DEFAULT_CITY.id) {
                state.selectedCity = {
                    id: matched.id,
                    lokasi: matched.lokasi,
                    prov: 'DKI JAKARTA'
                };
                localStorage.setItem('clock_city', JSON.stringify(state.selectedCity));
            }
            renderCityList(state.allCities);
        }
    } catch (err) {
        console.warn('Gagal memuat daftar kota:', err);
    }
}

async function fetchHijriDate() {
    const liveHijriDate = document.getElementById('liveHijriDate');
    try {
        const response = await fetch(`${API_BASE}/cal/today?tz=Asia%2FJakarta`);
        const result = await response.json();
        if (result.status && result.data && result.data.hijr) {
            const h = result.data.hijr;
            state.hijriData = h;
            if (liveHijriDate) liveHijriDate.textContent = `${h.day} ${h.monthName} ${h.year} H`;
            calculateIslamicEventsCountdown(new Date());
        }
    } catch (err) {
        if (liveHijriDate) liveHijriDate.textContent = '16 Safar 1448 H';
        calculateIslamicEventsCountdown(new Date());
    }
}

async function fetchPrayerSchedule() {
    const refreshPrayerBtn = document.getElementById('refreshPrayerBtn');
    const currentCityLabel = document.getElementById('currentCityLabel');
    const sidebarCityLabel = document.getElementById('sidebarCityLabel');
    const locationDetailText = document.getElementById('locationDetailText');
    const locationProvince = document.getElementById('locationProvince');

    try {
        if (refreshPrayerBtn) refreshPrayerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memuat...';
        
        let cityId = state.selectedCity.id;
        if (!cityId || cityId.length < 10) {
            const searchRes = await fetch(`${API_BASE}/sholat/kabkota/cari/jakarta`);
            const searchData = await searchRes.json();
            if (searchData.status && searchData.data && searchData.data.length > 0) {
                cityId = searchData.data[0].id;
                state.selectedCity.id = cityId;
                state.selectedCity.lokasi = searchData.data[0].lokasi;
                localStorage.setItem('clock_city', JSON.stringify(state.selectedCity));
            }
        }

        const displayTitle = state.selectedCity.displayName || state.selectedCity.subName || state.selectedCity.lokasi;
        if (currentCityLabel) currentCityLabel.textContent = displayTitle;
        if (sidebarCityLabel) sidebarCityLabel.textContent = displayTitle;
        if (locationDetailText) locationDetailText.textContent = displayTitle;

        const response = await fetch(`${API_BASE}/sholat/jadwal/${cityId}/today?tz=Asia%2FJakarta`);
        const result = await response.json();

        if (result.status && result.data && result.data.jadwal) {
            const jadwalDates = Object.keys(result.data.jadwal);
            const todayJadwal = result.data.jadwal[jadwalDates[0]];

            state.prayerSchedule = todayJadwal;
            if (locationProvince) locationProvince.textContent = result.data.prov || 'Indonesia';

            PRAYER_NAMES.forEach(p => {
                const el = document.getElementById(`time${capitalize(p.key)}`);
                if (el && todayJadwal[p.key]) {
                    el.textContent = todayJadwal[p.key];
                }
            });

            updateNextPrayer();
        }
    } catch (err) {
        console.error('Gagal mengambil jadwal sholat:', err);
    } finally {
        if (refreshPrayerBtn) refreshPrayerBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh Jadwal';
    }
}

function updateNextPrayer() {
    if (!state.prayerSchedule) return;

    const nextPrayerName = document.getElementById('nextPrayerName');
    const nextPrayerTimer = document.getElementById('nextPrayerTimer');
    const prayerCards = document.querySelectorAll('.prayer-card');

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = now.getSeconds();
    const totalCurrentSeconds = currentMinutes * 60 + currentSeconds;

    let next = null;
    let minDiffSeconds = Infinity;

    const scheduledPrayers = [
        { key: 'imsak', name: 'Imsak', time: state.prayerSchedule.imsak },
        { key: 'subuh', name: 'Subuh', time: state.prayerSchedule.subuh },
        { key: 'terbit', name: 'Terbit', time: state.prayerSchedule.terbit },
        { key: 'dhuha', name: 'Dhuha', time: state.prayerSchedule.dhuha },
        { key: 'dzuhur', name: 'Dzuhur', time: state.prayerSchedule.dzuhur },
        { key: 'ashar', name: 'Ashar', time: state.prayerSchedule.ashar },
        { key: 'maghrib', name: 'Maghrib', time: state.prayerSchedule.maghrib },
        { key: 'isya', name: 'Isya', time: state.prayerSchedule.isya }
    ];

    for (const p of scheduledPrayers) {
        if (!p.time) continue;
        const [h, m] = p.time.split(':').map(Number);
        const prayerTotalSec = (h * 60 + m) * 60;
        const diff = prayerTotalSec - totalCurrentSeconds;

        if (diff > 0 && diff < minDiffSeconds) {
            minDiffSeconds = diff;
            next = p;
        }

        if (Math.abs(diff) <= 1 && state.lastNotifiedPrayer !== p.name && (p.key === 'subuh' || p.key === 'dzuhur' || p.key === 'ashar' || p.key === 'maghrib' || p.key === 'isya')) {
            state.lastNotifiedPrayer = p.name;
            playRealAdzan(`Adzan ${p.name}`, p.key === 'subuh');
        }
    }

    if (!next) {
        const first = scheduledPrayers[0];
        const [h, m] = first.time.split(':').map(Number);
        const prayerTotalSec = (h * 60 + m) * 60;
        minDiffSeconds = (24 * 3600 - totalCurrentSeconds) + prayerTotalSec;
        next = first;
    }

    prayerCards.forEach(card => {
        if (card.dataset.prayer === next.key) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    if (nextPrayerName) nextPrayerName.textContent = next.name;

    const hoursLeft = Math.floor(minDiffSeconds / 3600);
    const minutesLeft = Math.floor((minDiffSeconds % 3600) / 60);
    const secondsLeft = minDiffSeconds % 60;

    if (nextPrayerTimer) nextPrayerTimer.textContent = `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
}

