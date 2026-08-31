/**
 * COUNTDOWN.JS - Ramadhan & Idul Fitri Countdown Engine
 * Calculates Remaining Days & Accurate Gregorian (Masehi) Calendar Estimates
 */

function calculateIslamicEventsCountdown(date = new Date()) {
    let hijriDay = 16;
    let hijriMonth = 3; // Rabiul Awwal 1448 H (Agustus 2026)
    let hijriYear = 1448;

    if (state.hijriData) {
        hijriDay = parseInt(state.hijriData.day, 10) || 16;
        hijriYear = parseInt(state.hijriData.year, 10) || 1448;
        if (state.hijriData.month) {
            hijriMonth = parseInt(state.hijriData.month, 10) || 3;
        } else if (state.hijriData.monthName) {
            const mIdx = HIJRI_MONTHS.findIndex(m => m.name.toLowerCase().includes(String(state.hijriData.monthName).toLowerCase()));
            if (mIdx !== -1) hijriMonth = mIdx + 1;
        }
    }

    function getDaysUntil(targetMonth, targetDay = 1) {
        let total = 0;
        let curM = hijriMonth;
        let curD = hijriDay;

        if (curM === targetMonth) {
            if (curD <= targetDay) {
                return targetDay - curD;
            }
        }

        const daysInCurMonth = HIJRI_MONTHS[curM - 1].days;
        total += Math.max(0, daysInCurMonth - curD);

        curM = (curM % 12) + 1;

        while (curM !== targetMonth) {
            total += HIJRI_MONTHS[curM - 1].days;
            curM = (curM % 12) + 1;
        }

        total += targetDay;
        return total;
    }

    const daysToRamadhan = getDaysUntil(9, 1);
    const daysToIdulFitri = getDaysUntil(10, 1);

    // Calculate Gregorian Dates
    const targetRamadhanDate = new Date(date.getTime() + daysToRamadhan * 86400000);
    const targetIdulFitriDate = new Date(date.getTime() + daysToIdulFitri * 86400000);

    const ramadhanMasehiStr = `${targetRamadhanDate.getDate()} ${indonesianMonths[targetRamadhanDate.getMonth()]} ${targetRamadhanDate.getFullYear()} M`;
    const idulFitriMasehiStr = `${targetIdulFitriDate.getDate()} ${indonesianMonths[targetIdulFitriDate.getMonth()]} ${targetIdulFitriDate.getFullYear()} M`;

    // DOM Elements
    const ramadhanDaysCount = document.getElementById('ramadhanDaysCount');
    const ramadhanTitle = document.getElementById('ramadhanTitle');
    const ramadhanMasehiDate = document.getElementById('ramadhanMasehiDate');
    const ramadhanEstimate = document.getElementById('ramadhanEstimate');

    const idulFitriDaysCount = document.getElementById('idulFitriDaysCount');
    const idulFitriTitle = document.getElementById('idulFitriTitle');
    const idulFitriMasehiDate = document.getElementById('idulFitriMasehiDate');
    const idulFitriEstimate = document.getElementById('idulFitriEstimate');

    // Ramadhan updates
    if (ramadhanDaysCount) {
        ramadhanDaysCount.textContent = state.isArabicNumerals ? toArabicDigits(daysToRamadhan) : daysToRamadhan;
    }
    if (ramadhanTitle) {
        ramadhanTitle.textContent = `1 Ramadhan ${hijriYear} H`;
    }
    if (ramadhanMasehiDate) {
        if (daysToRamadhan === 0) {
            ramadhanMasehiDate.textContent = `Hari ini (${ramadhanMasehiStr})`;
        } else {
            ramadhanMasehiDate.textContent = `Estimasi: ~${ramadhanMasehiStr}`;
        }
    }
    if (ramadhanEstimate) {
        ramadhanEstimate.textContent = daysToRamadhan === 0 
            ? "Marhaban ya Ramadhan! Selamat Menjalankan Ibadah Puasa."
            : `Estimasi: ~${ramadhanMasehiStr} (Sidang Isbat Kemenag RI)`;
    }

    // Idul Fitri updates
    if (idulFitriDaysCount) {
        idulFitriDaysCount.textContent = state.isArabicNumerals ? toArabicDigits(daysToIdulFitri) : daysToIdulFitri;
    }
    if (idulFitriTitle) {
        idulFitriTitle.textContent = `Idul Fitri (1 Syawal ${hijriYear} H)`;
    }
    if (idulFitriMasehiDate) {
        if (daysToIdulFitri === 0) {
            idulFitriMasehiDate.textContent = `Hari ini (${idulFitriMasehiStr})`;
        } else {
            idulFitriMasehiDate.textContent = `Estimasi: ~${idulFitriMasehiStr}`;
        }
    }
    if (idulFitriEstimate) {
        idulFitriEstimate.textContent = daysToIdulFitri === 0 
            ? "Taqabbalallahu Minna wa Minkum! Selamat Hari Raya Idul Fitri."
            : `Estimasi: ~${idulFitriMasehiStr} (Sidang Isbat Kemenag RI)`;
    }
}
