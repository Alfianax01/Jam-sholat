/**
 * CONSTANTS.JS - API Endpoints, Default Values & Global Helpers
 * Includes Security Sanitization Utilities (XSS Prevention & Safe Parsing)
 */

const API_BASE = 'https://api.myquran.com/v3';

const DEFAULT_CITY = {
    id: '58a2fc6ed39fd083f55d4182bf88826d',
    lokasi: 'KOTA JAKARTA',
    prov: 'DKI JAKARTA'
};

const PRAYER_NAMES = [
    { key: 'imsak', label: 'Imsak', arabic: 'الإمساك' },
    { key: 'subuh', label: 'Subuh', arabic: 'الفجر' },
    { key: 'terbit', label: 'Terbit', arabic: 'الشروق' },
    { key: 'dhuha', label: 'Dhuha', arabic: 'الضحى' },
    { key: 'dzuhur', label: 'Dzuhur', arabic: 'الظهر' },
    { key: 'ashar', label: 'Ashar', arabic: 'العصر' },
    { key: 'maghrib', label: 'Maghrib', arabic: 'المغرب' },
    { key: 'isya', label: 'Isya', arabic: 'العشاء' }
];

const ARABIC_NUMERALS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

const HIJRI_MONTHS = [
    { num: 1, name: 'Muharram', days: 30 },
    { num: 2, name: 'Safar', days: 29 },
    { num: 3, name: "Rabi'ul Awwal", days: 30 },
    { num: 4, name: "Rabi'ul Akhir", days: 29 },
    { num: 5, name: 'Jumadil Awwal', days: 30 },
    { num: 6, name: 'Jumadil Akhir', days: 29 },
    { num: 7, name: 'Rajab', days: 30 },
    { num: 8, name: "Sya'ban", days: 29 },
    { num: 9, name: 'Ramadhan', days: 30 },
    { num: 10, name: 'Syawal', days: 29 },
    { num: 11, name: "Dzulqa'dah", days: 30 },
    { num: 12, name: 'Dzulhijjah', days: 29 }
];

// Koleksi Pilihan Suara Adzan Berbagai Muazin & Masjid
const ADZAN_OPTIONS = [
    {
        id: 'makkah',
        name: 'Adzan Makkah (Masjidil Haram)',
        muazzin: 'Syaikh Ali Ahmad Mulla',
        tag: 'Makkah Al-Mukarramah',
        src: 'audio/adzan-makkah.mp3',
        subuhSrc: 'audio/adzan-subuh.mp3'
    },
    {
        id: 'madinah',
        name: 'Adzan Madinah (Masjid Nabawi)',
        muazzin: 'Syaikh Assem Bukhari',
        tag: 'Madinah Al-Munawwarah',
        src: 'audio/adzan-madinah.mp3',
        subuhSrc: 'audio/adzan-subuh.mp3'
    },
    {
        id: 'mesir',
        name: 'Adzan Mesir (Kairo)',
        muazzin: 'Syaikh Muhammad Siddiq Al-Minshawi',
        tag: 'Langgam Mesir Klasik',
        src: 'audio/adzan-mesir.mp3',
        subuhSrc: 'audio/adzan-subuh.mp3'
    },
    {
        id: 'turki',
        name: 'Adzan Turki (Istanbul)',
        muazzin: 'Maqam Rast / Usysyaq',
        tag: 'Langgam Utsmani / Turki',
        src: 'audio/adzan-turki.mp3',
        subuhSrc: 'audio/adzan-subuh.mp3'
    }
];

const SPECIAL_SUBUH_ADZAN = {
    id: 'subuh_special',
    name: 'Adzan Khusus Subuh (Ash-Shalatu Khairum Minan-Naum)',
    muazzin: 'Syaikh Mishary Rashid Alafasy',
    tag: 'Tatswib Subuh (الصلاة خير من النوم)',
    src: 'audio/adzan-subuh.mp3'
};

const indonesianDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const indonesianMonths = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Security: Sanitizes user input before rendering into HTML to prevent DOM XSS
 */
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Security: Safe JSON parser with fallback to prevent runtime crashes from corrupted LocalStorage
 */
function safeJSONParse(rawStr, fallback = null) {
    try {
        if (!rawStr) return fallback;
        const parsed = JSON.parse(rawStr);
        return parsed !== null ? parsed : fallback;
    } catch (e) {
        console.warn('Corrupted JSON detected, using fallback:', e);
        return fallback;
    }
}

function toArabicDigits(numStr) {
    return String(numStr).split('').map(ch => {
        const d = parseInt(ch, 10);
        return isNaN(d) ? ch : ARABIC_NUMERALS[d];
    }).join('');
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

/**
 * In-App Sleek Toast Notification System (Replaces Browser Alert)
 */
function showToast(message, type = 'info', title = '') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-card toast-${type}`;

    let iconClass = 'fa-solid fa-circle-info';
    let defaultTitle = 'Pemberitahuan';
    if (type === 'warning') {
        iconClass = 'fa-solid fa-triangle-exclamation';
        defaultTitle = 'Info Lokasi';
    } else if (type === 'success') {
        iconClass = 'fa-solid fa-circle-check';
        defaultTitle = 'Berhasil';
    } else if (type === 'error') {
        iconClass = 'fa-solid fa-circle-xmark';
        defaultTitle = 'Peringatan';
    }

    const displayTitle = title || defaultTitle;

    toast.innerHTML = `
        <div class="toast-icon-box">
            <i class="${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${escapeHTML(displayTitle)}</div>
            <div class="toast-message">${escapeHTML(message)}</div>
        </div>
        <button class="toast-close" aria-label="Tutup">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    let isDismissed = false;
    const dismiss = () => {
        if (isDismissed) return;
        isDismissed = true;
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    };

    if (closeBtn) closeBtn.addEventListener('click', dismiss);

    container.appendChild(toast);

    // Auto dismiss after 4 seconds
    setTimeout(dismiss, 4000);
}

function getTimezoneAbbreviation() {
    const offset = -new Date().getTimezoneOffset() / 60;
    if (offset === 7) return 'WIB (GMT+7)';
    if (offset === 8) return 'WITA (GMT+8)';
    if (offset === 9) return 'WIT (GMT+9)';
    return `GMT${offset >= 0 ? '+' : ''}${offset}`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
