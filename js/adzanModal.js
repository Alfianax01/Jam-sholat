/**
 * ADZANMODAL.JS - Adzan Muazzin Selector Modal Logic
 */

function renderAdzanList() {
    const adzanList = document.getElementById('adzanList');
    if (!adzanList) return;

    const currentId = state.selectedAdzanId || 'makkah';

    const html = ADZAN_OPTIONS.map(opt => `
        <div class="adzan-card-item ${opt.id === currentId ? 'selected' : ''}" data-id="${opt.id}">
            <div class="adzan-item-left">
                <div class="adzan-radio-circle"></div>
                <div class="adzan-item-info">
                    <span class="adzan-item-name">${opt.name}</span>
                    <span class="adzan-item-muazzin"><i class="fa-solid fa-microphone"></i> ${opt.muazzin}</span>
                    <span class="adzan-item-tag">${opt.tag}</span>
                </div>
            </div>
            <button class="btn-preview-adzan" data-src="${opt.src}" data-name="${opt.name}" title="Dengarkan Contoh Suara">
                <i class="fa-solid fa-play"></i>
            </button>
        </div>
    `).join('');

    adzanList.innerHTML = html;

    // Selection handlers
    document.querySelectorAll('.adzan-card-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.btn-preview-adzan')) return;
            selectAdzan(item.dataset.id);
        });
    });

    // Preview play buttons
    document.querySelectorAll('.btn-preview-adzan').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const src = btn.dataset.src;
            const name = btn.dataset.name;
            playRealAdzan(`Tes ${name}`, false, src);
        });
    });
}

function selectAdzan(id) {
    state.selectedAdzanId = id;
    localStorage.setItem('clock_adzan_choice', id);

    const choice = getSelectedAdzan();
    const adzanChoiceLabel = document.getElementById('adzanChoiceLabel');
    const sidebarAdzanLabel = document.getElementById('sidebarAdzanLabel');

    if (adzanChoiceLabel) adzanChoiceLabel.textContent = choice.tag || choice.name;
    if (sidebarAdzanLabel) sidebarAdzanLabel.textContent = `${choice.tag || choice.name}`;

    renderAdzanList();
    closeAdzanModal();
}

function openAdzanModal() {
    const adzanModal = document.getElementById('adzanModal');
    if (adzanModal) adzanModal.classList.add('show');
    renderAdzanList();
}

function closeAdzanModal() {
    const adzanModal = document.getElementById('adzanModal');
    if (adzanModal) adzanModal.classList.remove('show');
}

