/**
 * APP.JS - Main Application Entry Point & Event Orchestrator
 * Clean, Modular, and Hardened with Modern UI State Management
 */

// =========================================================
// 1. GLOBAL APPLICATION STATE
// =========================================================
const state = {
    isArabicNumerals: localStorage.getItem('clock_arabic_num') === 'true',
    is24Hour: localStorage.getItem('clock_format') !== '12h',
    isSmooth: localStorage.getItem('clock_smooth') !== 'false',
    audioEnabled: localStorage.getItem('clock_audio') !== 'false',
    currentTheme: localStorage.getItem('clock_theme') || 'green-white-light',
    selectedCity: safeJSONParse(localStorage.getItem('clock_city'), DEFAULT_CITY),
    allCities: [],
    prayerSchedule: null,
    hijriData: null,
    lastNotifiedPrayer: '',
    currentVerseIndex: 0,
    isPlayingAdzan: false,
    selectedAdzanId: localStorage.getItem('clock_adzan_choice') || 'makkah'
};

// =========================================================
// 2. THEME & DARK MODE CONTROLLER
// =========================================================
function isThemeLight(theme) {
    return theme === 'green-white-light';
}

function updateDarkModeButton(theme) {
    const isLight = isThemeLight(theme);
    const modeIcon = document.getElementById('modeIcon');
    const mobileModeIcon = document.getElementById('mobileModeIcon');
    const sidebarModeIcon = document.getElementById('sidebarModeIcon');
    const sidebarModeLabel = document.getElementById('sidebarModeLabel');

    if (modeIcon) {
        modeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
    if (mobileModeIcon) {
        mobileModeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
    if (sidebarModeIcon && sidebarModeLabel) {
        sidebarModeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
        sidebarModeLabel.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }
}

function applyTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    state.currentTheme = themeName;
    localStorage.setItem('clock_theme', themeName);
    updateDarkModeButton(themeName);
}

function toggleThemeAction() {
    if (isThemeLight(state.currentTheme)) {
        applyTheme('green-dark');
    } else {
        applyTheme('green-white-light');
    }
}

// =========================================================
// 3. SETTINGS & DISPLAY PREFERENCES CONTROLLER
// =========================================================
function syncSettingsUI() {
    // Format 24H vs 12H
    const btnFormat24 = document.getElementById('btnFormat24');
    const btnFormat12 = document.getElementById('btnFormat12');
    if (btnFormat24 && btnFormat12) {
        btnFormat24.classList.toggle('active', state.is24Hour);
        btnFormat12.classList.toggle('active', !state.is24Hour);
    }

    // Numerals Latin vs Arabic
    const btnNumeralLatin = document.getElementById('btnNumeralLatin');
    const btnNumeralArabic = document.getElementById('btnNumeralArabic');
    if (btnNumeralLatin && btnNumeralArabic) {
        btnNumeralLatin.classList.toggle('active', !state.isArabicNumerals);
        btnNumeralArabic.classList.toggle('active', state.isArabicNumerals);
    }

    // Smooth vs Detak
    const btnSmoothSweep = document.getElementById('btnSmoothSweep');
    const btnSmoothTick = document.getElementById('btnSmoothTick');
    if (btnSmoothSweep && btnSmoothTick) {
        btnSmoothSweep.classList.toggle('active', state.isSmooth);
        btnSmoothTick.classList.toggle('active', !state.isSmooth);
    }

    // Audio Bell
    const toggleAudioBtn = document.getElementById('toggleAudioBtn');
    const audioIcon = document.getElementById('audioIcon');
    if (toggleAudioBtn && audioIcon) {
        if (state.audioEnabled) {
            toggleAudioBtn.classList.add('active');
            audioIcon.className = 'fa-solid fa-bell';
        } else {
            toggleAudioBtn.classList.remove('active');
            audioIcon.className = 'fa-solid fa-bell-slash';
        }
    }
}

function setFormat(is24) {
    state.is24Hour = is24;
    localStorage.setItem('clock_format', is24 ? '24h' : '12h');
    syncSettingsUI();
    syncSidebarUI();
    lastSecond = -1;
}

function setArabicNumerals(isArabic) {
    state.isArabicNumerals = isArabic;
    localStorage.setItem('clock_arabic_num', isArabic ? 'true' : 'false');
    updateNumeralDisplay();
    calculateIslamicEventsCountdown(new Date());
    syncSettingsUI();
    syncSidebarUI();
    lastSecond = -1;
}

function setSmooth(isSmooth) {
    state.isSmooth = isSmooth;
    localStorage.setItem('clock_smooth', isSmooth ? 'true' : 'false');
    syncSettingsUI();
    syncSidebarUI();
}

function toggleAudioAction() {
    state.audioEnabled = !state.audioEnabled;
    localStorage.setItem('clock_audio', state.audioEnabled ? 'true' : 'false');
    if (!state.audioEnabled) {
        stopRealAdzan();
    }
    syncSettingsUI();
    syncSidebarUI();
}

function toggleFullscreenAction() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn(`Fullscreen error: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.classList.add('show');
        syncSettingsUI();
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.classList.remove('show');
}

// =========================================================
// 4. EVENT LISTENERS WIRING
// =========================================================
function setupEventListeners() {
    // Theme toggles
    const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');
    const mobileQuickDarkBtn = document.getElementById('mobileQuickDarkBtn');
    const sidebarDarkModeBtn = document.getElementById('sidebarDarkModeBtn');

    if (toggleDarkModeBtn) toggleDarkModeBtn.addEventListener('click', toggleThemeAction);
    if (mobileQuickDarkBtn) mobileQuickDarkBtn.addEventListener('click', toggleThemeAction);
    if (sidebarDarkModeBtn) sidebarDarkModeBtn.addEventListener('click', toggleThemeAction);

    // Audio toggle
    const toggleAudioBtn = document.getElementById('toggleAudioBtn');
    const sidebarAudioBtn = document.getElementById('sidebarAudioBtn');
    if (toggleAudioBtn) toggleAudioBtn.addEventListener('click', toggleAudioAction);
    if (sidebarAudioBtn) sidebarAudioBtn.addEventListener('click', toggleAudioAction);

    // Settings Modal
    const openSettingsBtn = document.getElementById('openSettingsBtn');
    const sidebarOpenSettingsBtn = document.getElementById('sidebarOpenSettingsBtn');
    const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');
    const settingsModal = document.getElementById('settingsModal');

    if (openSettingsBtn) openSettingsBtn.addEventListener('click', openSettingsModal);
    if (sidebarOpenSettingsBtn) {
        sidebarOpenSettingsBtn.addEventListener('click', () => {
            closeMobileSidebar();
            openSettingsModal();
        });
    }
    if (closeSettingsModalBtn) closeSettingsModalBtn.addEventListener('click', closeSettingsModal);
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) closeSettingsModal();
        });
    }

    // Segmented Switches in Settings Modal
    const btnFormat24 = document.getElementById('btnFormat24');
    const btnFormat12 = document.getElementById('btnFormat12');
    if (btnFormat24) btnFormat24.addEventListener('click', () => setFormat(true));
    if (btnFormat12) btnFormat12.addEventListener('click', () => setFormat(false));

    const btnNumeralLatin = document.getElementById('btnNumeralLatin');
    const btnNumeralArabic = document.getElementById('btnNumeralArabic');
    if (btnNumeralLatin) btnNumeralLatin.addEventListener('click', () => setArabicNumerals(false));
    if (btnNumeralArabic) btnNumeralArabic.addEventListener('click', () => setArabicNumerals(true));

    const btnSmoothSweep = document.getElementById('btnSmoothSweep');
    const btnSmoothTick = document.getElementById('btnSmoothTick');
    if (btnSmoothSweep) btnSmoothSweep.addEventListener('click', () => setSmooth(true));
    if (btnSmoothTick) btnSmoothTick.addEventListener('click', () => setSmooth(false));

    // Fullscreen toggles
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreenAction);

    document.addEventListener('fullscreenchange', () => {
        const fullscreenIcon = document.getElementById('fullscreenIcon');
        if (!fullscreenIcon) return;
        if (document.fullscreenElement) {
            fullscreenIcon.className = 'fa-solid fa-compress';
        } else {
            fullscreenIcon.className = 'fa-solid fa-expand';
        }
    });

    // Mobile Sidebar
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeMobileSidebar);
    if (mobileSidebarOverlay) mobileSidebarOverlay.addEventListener('click', closeMobileSidebar);

    // City & Region Selector
    const changeCityBtn = document.getElementById('changeCityBtn');
    const sidebarCityBtn = document.getElementById('sidebarCityBtn');
    const closeCityModalBtn = document.getElementById('closeCityModalBtn');
    const cityModal = document.getElementById('cityModal');
    const citySearchInput = document.getElementById('citySearchInput');
    const refreshPrayerBtn = document.getElementById('refreshPrayerBtn');

    if (changeCityBtn) changeCityBtn.addEventListener('click', openCityModal);
    if (sidebarCityBtn) {
        sidebarCityBtn.addEventListener('click', () => {
            closeMobileSidebar();
            openCityModal();
        });
    }
    if (closeCityModalBtn) closeCityModalBtn.addEventListener('click', closeCityModal);
    if (cityModal) {
        cityModal.addEventListener('click', (e) => {
            if (e.target === cityModal) closeCityModal();
        });
    }

    if (citySearchInput) {
        citySearchInput.addEventListener('input', () => {
            renderModal();
        });
    }

    // Breadcrumb back button
    const btnBreadcrumbBack = document.getElementById('btnBreadcrumbBack');
    if (btnBreadcrumbBack) {
        btnBreadcrumbBack.addEventListener('click', () => {
            backToRootView();
        });
    }

    // Region Tabs
    const regionTabBtns = document.querySelectorAll('.region-tab-btn');
    regionTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            regionTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            modalState.activeTab = btn.dataset.tab;
            renderModal();
        });
    });

    if (refreshPrayerBtn) {
        refreshPrayerBtn.addEventListener('click', () => {
            fetchPrayerSchedule();
            fetchHijriDate();
        });
    }

    // Audio test and stop
    const testAdzanBtn = document.getElementById('testAdzanBtn');
    const stopAdzanBtn = document.getElementById('stopAdzanBtn');
    const closeAdzanBannerBtn = document.getElementById('closeAdzanBannerBtn');

    if (testAdzanBtn) {
        testAdzanBtn.addEventListener('click', () => {
            if (state.isPlayingAdzan) {
                stopRealAdzan();
            } else {
                playRealAdzan('Tes Adzan Makkah');
            }
        });
    }

    if (stopAdzanBtn) stopAdzanBtn.addEventListener('click', stopRealAdzan);
    if (closeAdzanBannerBtn) closeAdzanBannerBtn.addEventListener('click', stopRealAdzan);

    // Daily quote shuffle
    const newVerseBtn = document.getElementById('newVerseBtn');
    if (newVerseBtn) newVerseBtn.addEventListener('click', shuffleMotivationalVerse);

    // Adzan Reciter Selector Modal
    const changeAdzanBtn = document.getElementById('changeAdzanBtn');
    const sidebarAdzanChoiceBtn = document.getElementById('sidebarAdzanChoiceBtn');
    const closeAdzanModalBtn = document.getElementById('closeAdzanModalBtn');
    const adzanModal = document.getElementById('adzanModal');
    const btnPreviewSubuh = document.getElementById('btnPreviewSubuh');

    if (changeAdzanBtn) changeAdzanBtn.addEventListener('click', openAdzanModal);
    if (sidebarAdzanChoiceBtn) {
        sidebarAdzanChoiceBtn.addEventListener('click', () => {
            closeMobileSidebar();
            openAdzanModal();
        });
    }
    if (closeAdzanModalBtn) closeAdzanModalBtn.addEventListener('click', closeAdzanModal);
    if (adzanModal) {
        adzanModal.addEventListener('click', (e) => {
            if (e.target === adzanModal) closeAdzanModal();
        });
    }
    if (btnPreviewSubuh) {
        btnPreviewSubuh.addEventListener('click', () => {
            playRealAdzan('Subuh (Ash-Shalatu Khairum Minan-Naum)', true, SPECIAL_SUBUH_ADZAN.src);
        });
    }

    // Qibla Compass Modal Triggers
    const openQiblaBtn = document.getElementById('openQiblaBtn');
    const sidebarQiblaBtn = document.getElementById('sidebarQiblaBtn');
    const settingsQiblaBtn = document.getElementById('settingsQiblaBtn');
    const closeQiblaModalBtn = document.getElementById('closeQiblaModalBtn');
    const qiblaModal = document.getElementById('qiblaModal');
    const btnDetectGPS = document.getElementById('btnDetectGPS');

    if (openQiblaBtn) openQiblaBtn.addEventListener('click', openQiblaModal);
    if (sidebarQiblaBtn) {
        sidebarQiblaBtn.addEventListener('click', () => {
            closeMobileSidebar();
            openQiblaModal();
        });
    }
    if (settingsQiblaBtn) {
        settingsQiblaBtn.addEventListener('click', () => {
            closeSettingsModal();
            openQiblaModal();
        });
    }
    if (closeQiblaModalBtn) closeQiblaModalBtn.addEventListener('click', closeQiblaModal);
    if (qiblaModal) {
        qiblaModal.addEventListener('click', (e) => {
            if (e.target === qiblaModal) closeQiblaModal();
        });
    }
    if (btnDetectGPS) btnDetectGPS.addEventListener('click', detectCurrentGPSLocation);
}

// =========================================================
// 5. APPLICATION INITIALIZATION
// =========================================================
async function init() {
    createClockTicks();
    setupAdzanAudio();
    applyTheme(state.currentTheme);
    setupEventListeners();
    syncSettingsUI();
    syncSidebarUI();

    if (typeof updateQiblaCalculations === 'function') {
        updateQiblaCalculations();
    }

    const adzanChoiceLabel = document.getElementById('adzanChoiceLabel');
    if (adzanChoiceLabel && typeof getSelectedAdzan === 'function') {
        const choice = getSelectedAdzan();
        adzanChoiceLabel.textContent = choice.tag || choice.name;
    }

    displayDailyMotivationalVerse(new Date());
    calculateIslamicEventsCountdown(new Date());
    requestAnimationFrame(updateClock);

    fetchHijriDate();
    fetchAllCities().then(() => {
        fetchPrayerSchedule();
    });

    let lastCheckedDay = new Date().getDate();
    setInterval(() => {
        const now = new Date();
        const currentDay = now.getDate();
        if (currentDay !== lastCheckedDay) {
            lastCheckedDay = currentDay;
            displayDailyMotivationalVerse(now);
            calculateIslamicEventsCountdown(now);
            fetchHijriDate();
            fetchPrayerSchedule();
        }
    }, 1000);
}

// Kickstart when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
