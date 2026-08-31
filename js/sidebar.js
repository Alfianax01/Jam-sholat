/**
 * SIDEBAR.JS - Mobile Off-Canvas Drawer & Synchronizer
 */

function openMobileSidebar() {
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
    if (mobileSidebar) mobileSidebar.classList.add('open');
    if (mobileSidebarOverlay) mobileSidebarOverlay.classList.add('open');
    syncSidebarUI();
}

function closeMobileSidebar() {
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
    if (mobileSidebar) mobileSidebar.classList.remove('open');
    if (mobileSidebarOverlay) mobileSidebarOverlay.classList.remove('open');
}

function syncSidebarUI() {
    const sidebarCityLabel = document.getElementById('sidebarCityLabel');
    const sidebarModeIcon = document.getElementById('sidebarModeIcon');
    const sidebarModeLabel = document.getElementById('sidebarModeLabel');
    const mobileModeIcon = document.getElementById('mobileModeIcon');
    const sidebarNumeralLabel = document.getElementById('sidebarNumeralLabel');
    const sidebarFormatLabel = document.getElementById('sidebarFormatLabel');
    const sidebarSmoothLabel = document.getElementById('sidebarSmoothLabel');
    const sidebarAudioIcon = document.getElementById('sidebarAudioIcon');
    const sidebarAudioLabel = document.getElementById('sidebarAudioLabel');

    const displayTitle = state.selectedCity ? (state.selectedCity.displayName || state.selectedCity.lokasi) : 'KOTA JAKARTA';
    if (sidebarCityLabel) sidebarCityLabel.textContent = displayTitle;
    
    const isLight = isThemeLight(state.currentTheme);
    if (sidebarModeIcon) sidebarModeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    if (sidebarModeLabel) sidebarModeLabel.textContent = isLight ? 'Ganti ke Dark Mode' : 'Ganti ke Light Mode';
    if (mobileModeIcon) mobileModeIcon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

    if (sidebarNumeralLabel) {
        sidebarNumeralLabel.textContent = state.isArabicNumerals ? 'Angka Arab (١, ٢, ٣)' : 'Angka Latin (1, 2, 3)';
    }

    if (sidebarFormatLabel) {
        sidebarFormatLabel.textContent = state.is24Hour ? 'Format 24 Jam (24H)' : 'Format 12 Jam (AM/PM)';
    }

    if (sidebarSmoothLabel) {
        sidebarSmoothLabel.textContent = state.isSmooth ? 'Gerakan Halus (Smooth)' : 'Gerakan Detak (Tick)';
    }

    if (sidebarAudioIcon && sidebarAudioLabel) {
        if (state.audioEnabled) {
            sidebarAudioIcon.className = 'fa-solid fa-bell';
            sidebarAudioLabel.textContent = 'Adzan Otomatis Aktif';
        } else {
            sidebarAudioIcon.className = 'fa-solid fa-bell-slash';
            sidebarAudioLabel.textContent = 'Pengingat Disenyapkan';
        }
    }

    const sidebarAdzanLabel = document.getElementById('sidebarAdzanLabel');
    if (sidebarAdzanLabel && typeof getSelectedAdzan === 'function') {
        const choice = getSelectedAdzan();
        sidebarAdzanLabel.textContent = `${choice.tag || choice.name}`;
    }
}

