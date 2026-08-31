/**
 * QIBLA.JS - Precision Islamic Qibla Compass & Geolocation Engine
 * Calculates Exact Kaaba Direction Angle, Distance, and Live Device Orientation
 */

// Coordinates of the Holy Ka'bah in Makkah Al-Mukarramah
const KAABA_COORDS = {
    lat: 21.422487,
    lng: 39.826206
};

// Default Indonesian Cities Coordinates Map (Fallback if GPS is unavailable)
const CITY_COORDINATES = {
    'JAKARTA': { lat: -6.2088, lng: 106.8456, name: 'DKI Jakarta' },
    'SURABAYA': { lat: -7.2575, lng: 112.7521, name: 'Surabaya' },
    'BANDUNG': { lat: -6.9175, lng: 107.6191, name: 'Bandung' },
    'SEMARANG': { lat: -6.9667, lng: 110.4167, name: 'Semarang' },
    'YOGYAKARTA': { lat: -7.7956, lng: 110.3695, name: 'Yogyakarta' },
    'MEDAN': { lat: 3.5952, lng: 98.6722, name: 'Medan' },
    'MAKASSAR': { lat: -5.1477, lng: 119.4327, name: 'Makassar' },
    'PALEMBANG': { lat: -2.9761, lng: 104.7754, name: 'Palembang' },
    'TANGERANG': { lat: -6.1783, lng: 106.6319, name: 'Tangerang' },
    'BEKASI': { lat: -6.2383, lng: 106.9756, name: 'Bekasi' },
    'DEPOK': { lat: -6.4025, lng: 106.7942, name: 'Depok' },
    'BOGOR': { lat: -6.5971, lng: 106.8060, name: 'Bogor' }
};

let qiblaState = {
    userLat: -6.2088,
    userLng: 106.8456,
    qiblaBearing: 295.14,
    distanceKm: 7925,
    deviceHeading: 0,
    isSensorActive: false,
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
            qiblaState.locationSource = state.selectedCity.displayName || state.selectedCity.lokasi;
        } else {
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
    if (angle >= 270 && angle < 315) return 'Barat Laut (NW)';
    if (angle >= 225 && angle < 270) return 'Barat Daya (SW)';
    if (angle >= 315 || angle < 45) return 'Utara (N)';
    if (angle >= 45 && angle < 135) return 'Timur (E)';
    if (angle >= 135 && angle < 225) return 'Selatan (S)';
    return 'Barat (W)';
}

/**
 * Renders Compass Dial, Needle, Kaaba Pointer, and Alignment Beacons
 */
function renderQiblaCompassUI() {
    const qiblaAngleVal = document.getElementById('qiblaAngleVal');
    const qiblaDistVal = document.getElementById('qiblaDistVal');
    const qiblaLocationLabel = document.getElementById('qiblaLocationLabel');
    const compassDial = document.getElementById('compassDial');
    const qiblaNeedle = document.getElementById('qiblaNeedle');
    const qiblaStatusBadge = document.getElementById('qiblaStatusBadge');

    if (qiblaAngleVal) qiblaAngleVal.textContent = `${qiblaState.qiblaBearing.toFixed(1)}°`;
    if (qiblaDistVal) qiblaDistVal.textContent = `${qiblaState.distanceKm.toLocaleString('id-ID')} km ke Ka'bah`;
    if (qiblaLocationLabel) qiblaLocationLabel.textContent = qiblaState.locationSource;

    const targetAngle = qiblaState.qiblaBearing;

    if (qiblaState.isSensorActive) {
        // If phone orientation sensor is active, rotate the dial according to phone heading
        const dialRotation = -qiblaState.deviceHeading;
        if (compassDial) compassDial.style.transform = `rotate(${dialRotation}deg)`;
        if (qiblaNeedle) qiblaNeedle.style.transform = `rotate(${targetAngle}deg)`;

        // Check if phone is directly facing Qibla within 4 degrees
        const relativeAngle = ((targetAngle - qiblaState.deviceHeading) % 360 + 360) % 360;
        const isFacingQibla = (relativeAngle <= 4 || relativeAngle >= 356);

        if (qiblaStatusBadge) {
            if (isFacingQibla) {
                qiblaStatusBadge.className = 'qibla-status-badge aligned';
                qiblaStatusBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Menghadap Kiblat Tepat!`;
            } else {
                qiblaStatusBadge.className = 'qibla-status-badge calibrating';
                qiblaStatusBadge.innerHTML = `<i class="fa-solid fa-compass fa-spin"></i> Putar perangkat ke arah tanda Ka'bah`;
            }
        }
    } else {
        // Desktop / Static view: Dial faces North, Needle points directly to Qibla angle
        if (compassDial) compassDial.style.transform = `rotate(0deg)`;
        if (qiblaNeedle) qiblaNeedle.style.transform = `rotate(${targetAngle}deg)`;

        if (qiblaStatusBadge) {
            qiblaStatusBadge.className = 'qibla-status-badge static';
            qiblaStatusBadge.innerHTML = `<i class="fa-solid fa-kaaba"></i> Arah Kiblat: ${targetAngle.toFixed(1)}° ${getCardinalDirection(targetAngle)}`;
        }
    }
}

/**
 * Request Device Orientation Sensor (Gyroscope / Magnetometer)
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
            // Android and standard browsers
            startOrientationListener();
        }
    }
}

function startOrientationListener() {
    window.addEventListener('deviceorientationabsolute', handleOrientationEvent, true);
    window.addEventListener('deviceorientation', handleOrientationEvent, true);
}

function handleOrientationEvent(event) {
    let heading = null;

    if (event.webkitCompassHeading) {
        // iOS
        heading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
        // Android (absolute or estimated compass)
        if (event.absolute) {
            heading = 360 - event.alpha;
        } else {
            heading = 360 - event.alpha;
        }
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
            showToast('Tidak dapat mendeteksi lokasi GPS. Menggunakan estimasi kota yang dipilih.', 'warning', 'Info Lokasi');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

function openQiblaModal() {
    const modal = document.getElementById('qiblaModal');
    if (modal) {
        modal.classList.add('show');
        updateQiblaCalculations();
        initDeviceOrientation();
    }
}

function closeQiblaModal() {
    const modal = document.getElementById('qiblaModal');
    if (modal) modal.classList.remove('show');
}

