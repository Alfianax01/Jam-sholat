/**
 * QIBLA.JS - Precision Islamic Qibla Compass & Interactive Geolocation Engine
 * Calculates Exact Kaaba Direction Angle, Distance, and Live Interactive Rotation
 */

// Coordinates of the Holy Ka'bah in Makkah Al-Mukarramah
const KAABA_COORDS = {
    lat: 21.422487,
    lng: 39.826206
};

// Comprehensive Indonesian Regional Coordinates Database (All Major Cities & Provinces)
const CITY_COORDINATES = {
    // DKI Jakarta & Bodetabek
    'JAKARTA': { lat: -6.2088, lng: 106.8456, name: 'DKI Jakarta' },
    'BOGOR': { lat: -6.5971, lng: 106.8060, name: 'Bogor' },
    'DEPOK': { lat: -6.4025, lng: 106.7942, name: 'Depok' },
    'TANGERANG': { lat: -6.1783, lng: 106.6319, name: 'Tangerang' },
    'BEKASI': { lat: -6.2383, lng: 106.9756, name: 'Bekasi' },
    'SERANG': { lat: -6.1104, lng: 106.1640, name: 'Serang' },
    'CILEGON': { lat: -6.0174, lng: 106.0538, name: 'Cilegon' },

    // Jawa Barat & Jawa Tengah
    'BANDUNG': { lat: -6.9175, lng: 107.6191, name: 'Bandung' },
    'CIREBON': { lat: -6.7320, lng: 108.5523, name: 'Cirebon' },
    'SUKABUMI': { lat: -6.9277, lng: 106.9300, name: 'Sukabumi' },
    'TASIKMALAYA': { lat: -7.3274, lng: 108.2207, name: 'Tasikmalaya' },
    'SEMARANG': { lat: -6.9667, lng: 110.4167, name: 'Semarang' },
    'SOLO': { lat: -7.5755, lng: 110.8243, name: 'Surakarta (Solo)' },
    'SURAKARTA': { lat: -7.5755, lng: 110.8243, name: 'Surakarta (Solo)' },
    'YOGYAKARTA': { lat: -7.7956, lng: 110.3695, name: 'DI Yogyakarta' },
    'MAGELANG': { lat: -7.4706, lng: 110.2178, name: 'Magelang' },
    'PEKALONGAN': { lat: -6.8886, lng: 109.6753, name: 'Pekalongan' },
    'TEGAL': { lat: -6.8694, lng: 109.1402, name: 'Tegal' },
    'PURWOKERTO': { lat: -7.4244, lng: 109.2302, name: 'Banyumas (Purwokerto)' },

    // Jawa Timur
    'SURABAYA': { lat: -7.2575, lng: 112.7521, name: 'Surabaya' },
    'MALANG': { lat: -7.9666, lng: 112.6326, name: 'Malang' },
    'KEDIRI': { lat: -7.8480, lng: 112.0178, name: 'Kediri' },
    'MADIUN': { lat: -7.6298, lng: 111.5239, name: 'Madiun' },
    'JEMBER': { lat: -8.1845, lng: 113.6681, name: 'Jember' },
    'BANYUWANGI': { lat: -8.2192, lng: 114.3691, name: 'Banyuwangi' },

    // Sumatera
    'BANDA ACEH': { lat: 5.5483, lng: 95.3238, name: 'Banda Aceh' },
    'ACEH': { lat: 5.5483, lng: 95.3238, name: 'Aceh' },
    'MEDAN': { lat: 3.5952, lng: 98.6722, name: 'Medan' },
    'PADANG': { lat: -0.9471, lng: 100.4172, name: 'Padang' },
    'PEKANBARU': { lat: 0.5071, lng: 101.4478, name: 'Pekanbaru' },
    'BATAM': { lat: 1.1301, lng: 104.0529, name: 'Batam' },
    'JAMBI': { lat: -1.6101, lng: 103.6131, name: 'Jambi' },
    'PALEMBANG': { lat: -2.9761, lng: 104.7754, name: 'Palembang' },
    'BENGKULU': { lat: -3.7928, lng: 102.2608, name: 'Bengkulu' },
    'BANDAR LAMPUNG': { lat: -5.3971, lng: 105.2668, name: 'Bandar Lampung' },
    'LAMPUNG': { lat: -5.3971, lng: 105.2668, name: 'Lampung' },
    'PANGKAL PINANG': { lat: -2.1316, lng: 106.1169, name: 'Bangka Belitung' },

    // Bali & Nusa Tenggara
    'DENPASAR': { lat: -8.6705, lng: 115.2126, name: 'Denpasar (Bali)' },
    'BALI': { lat: -8.6705, lng: 115.2126, name: 'Bali' },
    'MATARAM': { lat: -8.5768, lng: 116.0999, name: 'Mataram (Lombok)' },
    'LOMBOK': { lat: -8.5768, lng: 116.0999, name: 'Lombok' },
    'KUPANG': { lat: -10.1772, lng: 123.6070, name: 'Kupang (NTT)' },

    // Kalimantan
    'PONTIANAK': { lat: -0.0263, lng: 109.3425, name: 'Pontianak' },
    'BANJARMASIN': { lat: -3.3194, lng: 114.5908, name: 'Banjarmasin' },
    'SAMARINDA': { lat: -0.5022, lng: 117.1536, name: 'Samarinda' },
    'BALIKPAPAN': { lat: -1.2379, lng: 116.8529, name: 'Balikpapan' },
    'PALANGKARAYA': { lat: -2.2161, lng: 113.9140, name: 'Palangka Raya' },
    'TARAKAN': { lat: 3.3271, lng: 117.5785, name: 'Tarakan' },
    'IKN': { lat: -0.9658, lng: 116.7022, name: 'Nusantara (IKN)' },

    // Sulawesi
    'MAKASSAR': { lat: -5.1477, lng: 119.4327, name: 'Makassar' },
    'MANADO': { lat: 1.4748, lng: 124.8421, name: 'Manado' },
    'PALU': { lat: -0.9003, lng: 119.8780, name: 'Palu' },
    'KENDARI': { lat: -3.9985, lng: 122.5126, name: 'Kendari' },
    'GORONTALO': { lat: 0.5435, lng: 123.0568, name: 'Gorontalo' },
    'MAMUJU': { lat: -2.6738, lng: 118.8894, name: 'Mamuju' },

    // Maluku & Papua
    'AMBON': { lat: -3.6547, lng: 128.1906, name: 'Ambon' },
    'TERNATE': { lat: 0.7893, lng: 127.3610, name: 'Ternate' },
    'JAYAPURA': { lat: -2.5916, lng: 140.6690, name: 'Jayapura' },
    'SORONG': { lat: -0.8762, lng: 131.2558, name: 'Sorong' },
    'MANOKWARI': { lat: -0.8615, lng: 134.0620, name: 'Manokwari' },
    'MERAUKE': { lat: -8.4991, lng: 140.4011, name: 'Merauke' }
};

let qiblaState = {
    userLat: -6.2088,
    userLng: 106.8456,
    qiblaBearing: 295.14,
    distanceKm: 7925,
    deviceHeading: 0,
    isSensorActive: false,
    isDragging: false,
    dragStartAngle: 0,
    dragStartHeading: 0,
    locationSource: 'KOTA JAKARTA'
};

/**
 * Calculates Great-Circle Qibla Direction Bearing from given Lat/Lng in degrees (0 - 360)
 */
function calculateQiblaBearing(lat, lng) {
    const phi1 = (lat * Math.PI) / 180;
    const phi2 = (KAABA_COORDS.lat * Math.PI) / 180;
    const deltaLambda = ((KAABA_COORDS.lng - lng) * Math.PI) / 180;

    const y = Math.sin(deltaLambda);
    const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

    let qiblaRad = Math.atan2(y, x);
    let qiblaDeg = (qiblaRad * 180) / Math.PI;

    return (qiblaDeg + 360) % 360;
}

/**
 * Calculates Great-Circle Distance to Ka'bah (Haversine formula in KM)
 */
function calculateDistanceToKaaba(lat, lng) {
    const R = 6371; // Earth radius in KM
    const dLat = ((KAABA_COORDS.lat - lat) * Math.PI) / 180;
    const dLng = ((KAABA_COORDS.lng - lng) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat * Math.PI) / 180) *
        Math.cos((KAABA_COORDS.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

/**
 * Updates Qibla calculations for the currently selected city or custom GPS coords
 */
function updateQiblaCalculations(customLat = null, customLng = null, locationName = '') {
    if (customLat !== null && customLng !== null) {
        qiblaState.userLat = customLat;
        qiblaState.userLng = customLng;
        qiblaState.locationSource = locationName || 'Koordinat GPS Presisi';
    } else {
        // Resolve from selected city
        let matched = null;
        const currentCity = (state.selectedCity && state.selectedCity.lokasi) ? state.selectedCity.lokasi.toUpperCase() : 'JAKARTA';
        
        for (const [key, coords] of Object.entries(CITY_COORDINATES)) {
            if (currentCity.includes(key)) {
                matched = coords;
                break;
            }
        }

        if (matched) {
            qiblaState.userLat = matched.lat;
            qiblaState.userLng = matched.lng;
            qiblaState.locationSource = state.selectedCity ? (state.selectedCity.displayName || state.selectedCity.lokasi) : matched.name;
        } else {
            // Smart coordinate fallback: Jakarta region default
            qiblaState.userLat = -6.2088;
            qiblaState.userLng = 106.8456;
            qiblaState.locationSource = state.selectedCity ? (state.selectedCity.displayName || state.selectedCity.lokasi) : 'KOTA JAKARTA';
        }
    }

    qiblaState.qiblaBearing = calculateQiblaBearing(qiblaState.userLat, qiblaState.userLng);
    qiblaState.distanceKm = calculateDistanceToKaaba(qiblaState.userLat, qiblaState.userLng);

    // Update main clock card meta pill
    const qiblaText = document.getElementById('qiblaText');
    if (qiblaText) {
        qiblaText.textContent = `Arah Kiblat: ${qiblaState.qiblaBearing.toFixed(1)}° (${getCardinalDirection(qiblaState.qiblaBearing)})`;
    }

    renderQiblaCompassUI();
}

function getCardinalDirection(angle) {
    const norm = (angle % 360 + 360) % 360;
    if (norm >= 337.5 || norm < 22.5) return 'Utara (U)';
    if (norm >= 22.5 && norm < 67.5) return 'Timur Laut (TL)';
    if (norm >= 67.5 && norm < 112.5) return 'Timur (T)';
    if (norm >= 112.5 && norm < 157.5) return 'Tenggara (TG)';
    if (norm >= 157.5 && norm < 202.5) return 'Selatan (S)';
    if (norm >= 202.5 && norm < 247.5) return 'Barat Daya (BD)';
    if (norm >= 247.5 && norm < 292.5) return 'Barat (B)';
    return 'Barat Laut (BL)';
}

/**
 * Creates 360 Degree Ticks on the Compass Dial
 */
function createCompassTicks() {
    const ticksContainer = document.getElementById('compassTicksGroup');
    if (!ticksContainer || ticksContainer.children.length > 0) return;

    ticksContainer.innerHTML = '';
    for (let i = 0; i < 360; i += 5) {
        const isMajor = i % 30 === 0;
        const isMedium = i % 15 === 0 && !isMajor;
        const tick = document.createElement('div');
        tick.className = `compass-tick ${isMajor ? 'major' : isMedium ? 'medium' : 'minor'}`;
        tick.style.transform = `translateX(-50%) rotate(${i}deg)`;
        ticksContainer.appendChild(tick);
    }
}

/**
 * Renders Compass Dial, Needle, Kaaba Pointer, and Alignment Status
 */
function renderQiblaCompassUI() {
    const qiblaAngleVal = document.getElementById('qiblaAngleVal');
    const qiblaDistVal = document.getElementById('qiblaDistVal');
    const qiblaLocationLabel = document.getElementById('qiblaLocationLabel');
    const compassHeadingVal = document.getElementById('compassHeadingVal');
    const compassDial = document.getElementById('compassDial');
    const qiblaNeedle = document.getElementById('qiblaNeedle');
    const qiblaStatusBadge = document.getElementById('qiblaStatusBadge');

    const targetAngle = qiblaState.qiblaBearing;
    const curHeading = (qiblaState.deviceHeading % 360 + 360) % 360;

    if (qiblaAngleVal) qiblaAngleVal.textContent = `${targetAngle.toFixed(1)}° (${getCardinalDirection(targetAngle)})`;
    if (qiblaDistVal) qiblaDistVal.textContent = `~${qiblaState.distanceKm.toLocaleString('id-ID')} km`;
    if (qiblaLocationLabel) qiblaLocationLabel.textContent = qiblaState.locationSource;
    if (compassHeadingVal) compassHeadingVal.textContent = `${Math.round(curHeading)}° (${getCardinalDirection(curHeading)})`;

    // Rotate Dial counter-clockwise by device heading
    if (compassDial) {
        compassDial.style.transform = `rotate(${-curHeading}deg)`;
    }

    // Needle inside the dial points directly to the Qibla Bearing angle from North
    if (qiblaNeedle) {
        qiblaNeedle.style.transform = `rotate(${targetAngle}deg)`;
    }

    // Relative angle between top lubber (0 deg / front of phone) and Qibla Kaaba needle
    const relativeAngle = ((targetAngle - curHeading) % 360 + 360) % 360;
    const isFacingQibla = (relativeAngle <= 4.5 || relativeAngle >= 355.5);

    if (qiblaStatusBadge) {
        if (isFacingQibla) {
            qiblaStatusBadge.className = 'qibla-status-badge aligned';
            qiblaStatusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Menghadap Kiblat Tepat! 🕋`;
            if (window.navigator && window.navigator.vibrate && qiblaState.isSensorActive) {
                window.navigator.vibrate(50);
            }
        } else {
            const diff = relativeAngle > 180 ? Math.round(360 - relativeAngle) : Math.round(relativeAngle);
            const dir = relativeAngle > 180 ? 'Kiri (CCW)' : 'Kanan (CW)';
            qiblaStatusBadge.className = 'qibla-status-badge calibrating';
            qiblaStatusBadge.innerHTML = `<i class="fa-solid fa-compass fa-spin"></i> Putar ${diff}° ke ${dir} untuk sejajar`;
        }
    }
}

/**
 * Interactive Drag to Rotate Compass Engine (Desktop & Touch)
 */
function setupCompassDragInteraction() {
    const compassBezel = document.getElementById('compassBezel');
    if (!compassBezel) return;

    function getAngleFromCenter(e) {
        const rect = compassBezel.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        let rad = Math.atan2(deltaY, deltaX);
        let deg = (rad * 180) / Math.PI;
        // Convert to compass degrees (0 = Top / North)
        return (deg + 90 + 360) % 360;
    }

    function onPointerDown(e) {
        qiblaState.isDragging = true;
        qiblaState.isSensorActive = false; // Override sensor when user manually drags
        qiblaState.dragStartAngle = getAngleFromCenter(e);
        qiblaState.dragStartHeading = qiblaState.deviceHeading;
        compassBezel.classList.add('dragging');
        e.preventDefault();
    }

    function onPointerMove(e) {
        if (!qiblaState.isDragging) return;
        const currentAngle = getAngleFromCenter(e);
        const delta = currentAngle - qiblaState.dragStartAngle;
        qiblaState.deviceHeading = (qiblaState.dragStartHeading - delta + 360) % 360;
        renderQiblaCompassUI();
        e.preventDefault();
    }

    function onPointerUp() {
        if (qiblaState.isDragging) {
            qiblaState.isDragging = false;
            compassBezel.classList.remove('dragging');
        }
    }

    compassBezel.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    compassBezel.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
}

/**
 * Smoothly Animates the Compass to Auto-Align with Ka'bah
 */
function autoAlignToQibla() {
    qiblaState.isSensorActive = false;
    const targetHeading = qiblaState.qiblaBearing;
    let startHeading = (qiblaState.deviceHeading % 360 + 360) % 360;
    
    // Shortest path interpolation
    let diff = (targetHeading - startHeading) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const startTime = performance.now();
    const duration = 650; // ms

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);

        qiblaState.deviceHeading = (startHeading + diff * ease + 360) % 360;
        renderQiblaCompassUI();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

/**
 * Resets Compass to North (0 deg)
 */
function resetCompassToNorth() {
    qiblaState.isSensorActive = false;
    const startTime = performance.now();
    const startHeading = (qiblaState.deviceHeading % 360 + 360) % 360;
    let diff = (0 - startHeading) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const duration = 500;
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        qiblaState.deviceHeading = (startHeading + diff * ease + 360) % 360;
        renderQiblaCompassUI();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

/**
 * Request Device Orientation Sensor (Gyroscope / Magnetometer on Mobile)
 */
function initDeviceOrientation() {
    if (typeof DeviceOrientationEvent !== 'undefined') {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iOS 13+ permission request
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        startOrientationListener();
                    } else {
                        console.warn('Izin sensor orientasi ditolak');
                    }
                })
                .catch(console.error);
        } else {
            // Android and standard mobile browsers
            startOrientationListener();
        }
    }
}

function startOrientationListener() {
    window.addEventListener('deviceorientationabsolute', handleOrientationEvent, true);
    window.addEventListener('deviceorientation', handleOrientationEvent, true);
}

function handleOrientationEvent(event) {
    if (qiblaState.isDragging) return; // Do not override during manual touch drag

    let heading = null;

    if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null) {
        // iOS Safari WebKit Heading
        heading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
        // Android Device Alpha
        heading = (360 - event.alpha) % 360;
    }

    if (heading !== null && !isNaN(heading)) {
        qiblaState.deviceHeading = heading;
        qiblaState.isSensorActive = true;
        renderQiblaCompassUI();
    }
}

/**
 * Accurate Geolocation GPS Locator
 */
function detectCurrentGPSLocation() {
    const btnDetectGPS = document.getElementById('btnDetectGPS');
    if (!navigator.geolocation) {
        showToast('Fitur Geolocation tidak didukung oleh browser Anda.', 'warning', 'GPS Tidak Tersedia');
        return;
    }

    if (btnDetectGPS) btnDetectGPS.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mendeteksi GPS...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            updateQiblaCalculations(lat, lng, 'Lokasi GPS Anda (Akurat)');
            if (btnDetectGPS) btnDetectGPS.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> GPS Terhubung';
            showToast('Lokasi GPS presisi berhasil terdeteksi!', 'success', 'GPS Terhubung');
        },
        (error) => {
            console.warn('GPS Error:', error);
            if (btnDetectGPS) btnDetectGPS.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Deteksi GPS';
            showToast('Tidak dapat mendeteksi GPS. Menggunakan estimasi kota terpilih.', 'warning', 'Info Lokasi');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

function openQiblaModal() {
    const modal = document.getElementById('qiblaModal');
    if (modal) {
        modal.classList.add('show');
        createCompassTicks();
        setupCompassDragInteraction();
        updateQiblaCalculations();
        initDeviceOrientation();
    }
}

function closeQiblaModal() {
    const modal = document.getElementById('qiblaModal');
    if (modal) modal.classList.remove('show');
    qiblaState.isDragging = false;
}
