/**
 * CITYMODAL.JS - Elegant Cascading Hierarchical Region & Subdistrict Selector
 * Security Hardened: All Dynamic User Inputs & Database Outputs are Sanitized via escapeHTML()
 */

let modalState = {
    view: 'root', // 'root' | 'district'
    selectedRegion: null,
    activeTab: 'all'
};

function renderModal() {
    const searchInput = document.getElementById('citySearchInput');
    const query = searchInput ? searchInput.value.trim() : '';

    if (query) {
        renderSearchResults(query);
    } else if (modalState.view === 'district' && modalState.selectedRegion) {
        renderDistrictView(modalState.selectedRegion);
    } else {
        renderRootView();
    }
}

// 1. ROOT VIEW: Major Cities & Provinces Grouping + Kemenag List
function renderRootView() {
    const breadcrumbBox = document.getElementById('modalBreadcrumb');
    const cityList = document.getElementById('cityList');
    const tabsContainer = document.getElementById('regionTabsRow');

    if (breadcrumbBox) breadcrumbBox.style.display = 'none';
    if (tabsContainer) tabsContainer.style.display = 'flex';

    if (!cityList) return;

    let filteredHierarchical = HIERARCHICAL_REGIONS;
    if (modalState.activeTab === 'jakarta') {
        filteredHierarchical = HIERARCHICAL_REGIONS.filter(r => r.group === 'DKI Jakarta');
    } else if (modalState.activeTab === 'bodetabek') {
        filteredHierarchical = HIERARCHICAL_REGIONS.filter(r => r.group === 'Banten' || (r.group === 'Jawa Barat' && (r.name.includes('Bekasi') || r.name.includes('Depok') || r.name.includes('Bogor'))));
    } else if (modalState.activeTab === 'jawa_luar') {
        filteredHierarchical = HIERARCHICAL_REGIONS.filter(r => r.group !== 'DKI Jakarta');
    }

    let html = `
        <div class="modal-section-title">
            <i class="fa-solid fa-layer-group"></i> WILAYAH DENGAN KECAMATAN / DAERAH LENGKAP:
        </div>
    `;

    html += filteredHierarchical.map(region => `
        <div class="city-card-drilldown" data-region-id="${escapeHTML(region.id)}">
            <div class="city-card-left">
                <div class="city-card-icon">
                    <i class="fa-solid ${escapeHTML(region.icon || 'fa-city')}"></i>
                </div>
                <div class="city-card-info">
                    <div class="city-card-title-row">
                        <span class="city-card-title">${escapeHTML(region.name)}</span>
                        <span class="city-card-badge">${escapeHTML(region.badge)}</span>
                    </div>
                    <span class="city-card-subtitle">${region.districts.length} Kecamatan / Daerah • ${escapeHTML(region.group)}</span>
                </div>
            </div>
            <div class="city-card-arrow">
                <span class="arrow-text">Pilih Daerah</span>
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    `).join('');

    // If 'all' tab is selected, also append other official Kemenag cities
    if (modalState.activeTab === 'all' && state.allCities && state.allCities.length > 0) {
        const otherCities = state.allCities.filter(c => 
            !c.lokasi.includes('JAKARTA') && 
            !c.lokasi.includes('TANGERANG') && 
            !c.lokasi.includes('BEKASI') && 
            !c.lokasi.includes('DEPOK') && 
            !c.lokasi.includes('BOGOR') && 
            !c.lokasi.includes('BANDUNG') && 
            !c.lokasi.includes('SURABAYA') && 
            !c.lokasi.includes('SEMARANG') && 
            !c.lokasi.includes('YOGYAKARTA') && 
            !c.lokasi.includes('MEDAN') && 
            !c.lokasi.includes('MAKASSAR')
        );

        if (otherCities.length > 0) {
            html += `
                <div class="modal-section-title" style="margin-top: 14px;">
                    <i class="fa-solid fa-landmark"></i> KOTA & KABUPATEN LAINNYA (KEMENAG RI):
                </div>
            `;

            html += otherCities.slice(0, 40).map(city => `
                <div class="city-card-simple" data-city-id="${escapeHTML(city.id)}" data-city-name="${escapeHTML(city.lokasi)}">
                    <div class="city-card-left">
                        <div class="city-card-icon simple">
                            <i class="fa-solid fa-city"></i>
                        </div>
                        <div class="city-card-info">
                            <span class="city-card-title">${escapeHTML(city.lokasi)}</span>
                            <span class="city-card-subtitle">Indonesia • Jadwal Kemenag RI</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-check-circle select-icon"></i>
                </div>
            `).join('');
        }
    }

    cityList.innerHTML = html;

    // Drilldown click handlers
    document.querySelectorAll('.city-card-drilldown').forEach(el => {
        el.addEventListener('click', () => {
            const regionId = el.dataset.regionId;
            const region = HIERARCHICAL_REGIONS.find(r => r.id === regionId);
            if (region) {
                openDistrictView(region);
            }
        });
    });

    // Simple city click handlers
    document.querySelectorAll('.city-card-simple').forEach(el => {
        el.addEventListener('click', () => {
            selectCity({
                id: el.dataset.cityId,
                lokasi: el.dataset.cityName,
                displayName: el.dataset.cityName,
                prov: ''
            });
        });
    });
}

// 2. DISTRICT VIEW: Sub-districts under a selected Major City
function openDistrictView(region) {
    modalState.view = 'district';
    modalState.selectedRegion = region;
    renderDistrictView(region);
}

function renderDistrictView(region) {
    const breadcrumbBox = document.getElementById('modalBreadcrumb');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    const cityList = document.getElementById('cityList');
    const tabsContainer = document.getElementById('regionTabsRow');

    if (breadcrumbBox) breadcrumbBox.style.display = 'flex';
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = `${region.name} (${region.districts.length} Daerah)`;
    if (tabsContainer) tabsContainer.style.display = 'none';

    if (!cityList) return;

    let html = `
        <!-- Option 1: Choose entire city -->
        <div class="district-card-general" data-city-id="${escapeHTML(region.cityId)}" data-base-city="${escapeHTML(region.baseCity)}" data-display-name="${escapeHTML(region.name)}">
            <div class="district-card-left">
                <div class="district-icon general">
                    <i class="fa-solid fa-building-circle-check"></i>
                </div>
                <div class="district-info">
                    <div class="district-title-row">
                        <span class="district-title">Pilih Seluruh ${escapeHTML(region.name)}</span>
                        <span class="district-badge general">Kota Umum</span>
                    </div>
                    <span class="district-desc">Gunakan jadwal sholat umum wilayah ${escapeHTML(region.name)}</span>
                </div>
            </div>
            <i class="fa-solid fa-circle-arrow-right" style="color: var(--accent); font-size: 1.1rem;"></i>
        </div>

        <div class="modal-section-title" style="margin-top: 10px;">
            <i class="fa-solid fa-map-pin"></i> PILIH KECAMATAN / KELURAHAN SPESIFIK:
        </div>
    `;

    html += region.districts.map(dist => {
        const fullDisplay = `${dist.name} (${region.name})`;
        const isSelected = state.selectedCity && state.selectedCity.displayName === fullDisplay;

        return `
            <div class="district-card-item ${isSelected ? 'selected' : ''}" 
                 data-city-id="${escapeHTML(region.cityId)}" 
                 data-base-city="${escapeHTML(region.baseCity)}" 
                 data-district-name="${escapeHTML(dist.name)}" 
                 data-parent-region="${escapeHTML(region.name)}" 
                 data-display-name="${escapeHTML(fullDisplay)}">
                <div class="district-card-left">
                    <div class="district-icon">
                        <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <div class="district-info">
                        <div class="district-title-row">
                            <span class="district-title">${escapeHTML(dist.name)}</span>
                            <span class="district-badge">Kecamatan</span>
                        </div>
                        <span class="district-desc"><strong>Mencakup:</strong> ${escapeHTML(dist.alias)}</span>
                    </div>
                </div>
                <i class="fa-solid fa-chevron-right" style="font-size: 0.8rem; color: var(--text-muted);"></i>
            </div>
        `;
    }).join('');

    cityList.innerHTML = html;

    // General City Click Handler
    const generalCard = document.querySelector('.district-card-general');
    if (generalCard) {
        generalCard.addEventListener('click', () => {
            selectCity({
                id: generalCard.dataset.cityId,
                lokasi: generalCard.dataset.baseCity,
                displayName: generalCard.dataset.displayName,
                prov: region.group
            });
        });
    }

    // Specific District Click Handlers
    document.querySelectorAll('.district-card-item').forEach(el => {
        el.addEventListener('click', () => {
            selectCity({
                id: el.dataset.cityId,
                lokasi: el.dataset.baseCity,
                districtName: el.dataset.districtName,
                parentRegion: el.dataset.parentRegion,
                displayName: el.dataset.displayName,
                prov: region.group
            });
        });
    });
}

function backToRootView() {
    modalState.view = 'root';
    modalState.selectedRegion = null;
    const searchInput = document.getElementById('citySearchInput');
    if (searchInput) searchInput.value = '';
    renderRootView();
}

// 3. GLOBAL SEARCH RESULTS: Matches either districts, alias (e.g. Buaran), or cities
function renderSearchResults(rawQuery) {
    const breadcrumbBox = document.getElementById('modalBreadcrumb');
    const cityList = document.getElementById('cityList');
    const tabsContainer = document.getElementById('regionTabsRow');

    if (breadcrumbBox) breadcrumbBox.style.display = 'none';
    if (tabsContainer) tabsContainer.style.display = 'none';

    if (!cityList) return;

    const query = rawQuery.trim().toUpperCase();
    let matchedDistricts = [];

    // Search inside hierarchical database
    HIERARCHICAL_REGIONS.forEach(region => {
        // Match city level
        if (region.name.toUpperCase().includes(query)) {
            matchedDistricts.push({
                type: 'city-group',
                title: region.name,
                subtitle: `${region.districts.length} Kecamatan • ${region.group}`,
                badge: 'Kota Utama',
                regionObj: region
            });
        }

        // Match individual districts & aliases
        region.districts.forEach(dist => {
            let matchType = '';
            if (dist.name.toUpperCase().includes(query)) {
                matchType = 'Kecamatan';
            } else if (dist.alias.toUpperCase().includes(query)) {
                const parts = dist.alias.split(',').map(s => s.trim());
                const found = parts.find(p => p.toUpperCase().includes(query));
                matchType = `Area: ${found || rawQuery}`;
            }

            if (matchType) {
                matchedDistricts.push({
                    type: 'district',
                    title: `${dist.name} (${region.name})`,
                    subtitle: `Kecamatan di ${region.name} • ${dist.alias}`,
                    badge: matchType,
                    cityId: region.cityId,
                    baseCity: region.baseCity,
                    displayName: `${dist.name} (${region.name})`,
                    prov: region.group
                });
            }
        });
    });

    // Search inside official Kemenag cities
    if (state.allCities && state.allCities.length > 0) {
        state.allCities.forEach(city => {
            if (city.lokasi.toUpperCase().includes(query)) {
                matchedDistricts.push({
                    type: 'kemenag-city',
                    title: city.lokasi,
                    subtitle: `Kabupaten / Kota • Kemenag RI`,
                    badge: city.lokasi.startsWith('KAB') ? 'Kabupaten' : 'Kota',
                    cityId: city.id,
                    baseCity: city.lokasi,
                    displayName: city.lokasi,
                    prov: ''
                });
            }
        });
    }

    if (matchedDistricts.length === 0) {
        cityList.innerHTML = `
            <div class="city-list-empty">
                <i class="fa-solid fa-magnifying-glass-location" style="font-size: 2.2rem; color: var(--accent); margin-bottom: 10px; opacity: 0.5;"></i>
                <p style="font-weight: 700;">Tidak ditemukan hasil untuk "${escapeHTML(rawQuery)}"</p>
                <span style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px; display: block;">
                    Coba cari nama daerah (cth: <strong>Buaran</strong>, <strong>Duren Sawit</strong>, <strong>Tebet</strong>, <strong>BSD</strong>, <strong>Margonda</strong>) atau nama kota.
                </span>
            </div>
        `;
        return;
    }

    const html = `
        <div class="modal-section-title">
            <i class="fa-solid fa-magnifying-glass"></i> HASIL PENCARIAN (${matchedDistricts.length} ditemukan):
        </div>
        ${matchedDistricts.slice(0, 50).map(item => `
            <div class="search-result-card" data-item-type="${escapeHTML(item.type)}" ${item.type === 'city-group' ? `data-region-id="${escapeHTML(item.regionObj.id)}"` : `data-city-id="${escapeHTML(item.cityId)}" data-base-city="${escapeHTML(item.baseCity)}" data-display-name="${escapeHTML(item.displayName)}" data-prov="${escapeHTML(item.prov || '')}"`}>
                <div class="search-card-left">
                    <div class="search-card-icon ${escapeHTML(item.type)}">
                        <i class="fa-solid ${item.type === 'district' ? 'fa-location-dot' : 'fa-city'}"></i>
                    </div>
                    <div class="search-card-info">
                        <div class="search-card-title-row">
                            <span class="search-card-title">${escapeHTML(item.title)}</span>
                            <span class="search-badge ${escapeHTML(item.type)}">${escapeHTML(item.badge)}</span>
                        </div>
                        <span class="search-card-subtitle">${escapeHTML(item.subtitle)}</span>
                    </div>
                </div>
                <i class="fa-solid fa-chevron-right" style="font-size: 0.8rem; color: var(--text-muted);"></i>
            </div>
        `).join('')}
    `;

    cityList.innerHTML = html;

    // Search Result Click Handlers
    document.querySelectorAll('.search-result-card').forEach(el => {
        el.addEventListener('click', () => {
            const itemType = el.dataset.itemType;
            if (itemType === 'city-group') {
                const region = HIERARCHICAL_REGIONS.find(r => r.id === el.dataset.regionId);
                if (region) openDistrictView(region);
            } else {
                selectCity({
                    id: el.dataset.cityId,
                    lokasi: el.dataset.baseCity,
                    displayName: el.dataset.displayName,
                    prov: el.dataset.prov
                });
            }
        });
    });
}

function selectCity(cityObj) {
    state.selectedCity = cityObj;
    localStorage.setItem('clock_city', JSON.stringify(cityObj));

    const displayTitle = cityObj.displayName || cityObj.lokasi;
    
    const currentCityLabel = document.getElementById('currentCityLabel');
    const sidebarCityLabel = document.getElementById('sidebarCityLabel');
    const locationDetailText = document.getElementById('locationDetailText');

    if (currentCityLabel) currentCityLabel.textContent = displayTitle;
    if (sidebarCityLabel) sidebarCityLabel.textContent = displayTitle;
    if (locationDetailText) locationDetailText.textContent = displayTitle;

    closeCityModal();
    fetchPrayerSchedule();
    if (typeof updateQiblaCalculations === 'function') {
        updateQiblaCalculations();
    }
}

function openCityModal() {
    modalState.view = 'root';
    modalState.selectedRegion = null;
    modalState.activeTab = 'all';

    const cityModal = document.getElementById('cityModal');
    const searchInput = document.getElementById('citySearchInput');
    const tabBtns = document.querySelectorAll('.region-tab-btn');

    if (cityModal) cityModal.classList.add('show');
    if (searchInput) searchInput.value = '';
    if (tabBtns) {
        tabBtns.forEach(b => b.classList.remove('active'));
        if (tabBtns[0]) tabBtns[0].classList.add('active');
    }

    renderRootView();
}

function closeCityModal() {
    const cityModal = document.getElementById('cityModal');
    if (cityModal) cityModal.classList.remove('show');
    modalState.view = 'root';
    modalState.selectedRegion = null;
}
