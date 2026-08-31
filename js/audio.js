/**
 * AUDIO.JS - Real Adzan MP3 Audio Engine & Multi-Muazzin Selector
 */

let audioElementInstance = null;

function getAudioElement() {
    if (audioElementInstance) return audioElementInstance;
    let el = document.getElementById('realAdzanAudio');
    if (!el) {
        el = new Audio();
        el.id = 'realAdzanAudio';
        document.body.appendChild(el);
    }
    audioElementInstance = el;
    return audioElementInstance;
}

function getSelectedAdzan() {
    const selectedId = state.selectedAdzanId || 'makkah';
    return ADZAN_OPTIONS.find(opt => opt.id === selectedId) || ADZAN_OPTIONS[0];
}

function setupAdzanAudio() {
    const audio = getAudioElement();
    if (!audio) return;
    
    const adzan = getSelectedAdzan();
    audio.src = adzan.src;
    audio.preload = 'auto';

    audio.onerror = (e) => {
        console.warn('Audio playback error:', e);
    };

    audio.onended = () => {
        stopRealAdzan();
    };
}

/**
 * Play Adzan with automatic Subuh detection
 * @param {string} title - Prayer name or test title
 * @param {boolean} isSubuh - Whether it is Subuh prayer (which has Tatswib)
 * @param {string} overrideSrc - Optional direct source (e.g. for preview)
 */
function playRealAdzan(title = 'Adzan', isSubuh = false, overrideSrc = null) {
    if (!state.audioEnabled) {
        state.audioEnabled = true;
        localStorage.setItem('clock_audio', 'true');
        const toggleAudioBtn = document.getElementById('toggleAudioBtn');
        const audioIcon = document.getElementById('audioIcon');
        const audioLabel = document.getElementById('audioLabel');
        if (toggleAudioBtn) toggleAudioBtn.classList.add('active');
        if (audioIcon) audioIcon.className = 'fa-solid fa-bell';
        if (audioLabel) audioLabel.textContent = 'Adzan On';
        syncSidebarUI();
    }

    state.isPlayingAdzan = true;

    const isSubuhPrayer = isSubuh || title.toLowerCase().includes('subuh');
    const adzanChoice = getSelectedAdzan();
    
    // Choose appropriate audio track: special Subuh vs regular Adzan
    let audioSrc = overrideSrc;
    if (!audioSrc) {
        if (isSubuhPrayer) {
            audioSrc = SPECIAL_SUBUH_ADZAN.src;
        } else {
            audioSrc = adzanChoice.src;
        }
    }

    const adzanBannerTitle = document.getElementById('adzanBannerTitle');
    const adzanBannerSub = document.querySelector('.adzan-banner-sub');
    const adzanBanner = document.getElementById('adzanBanner');
    const testAdzanBtn = document.getElementById('testAdzanBtn');
    const testAdzanIcon = document.getElementById('testAdzanIcon');
    const testAdzanLabel = document.getElementById('testAdzanLabel');
    const sidebarTestIcon = document.getElementById('sidebarTestIcon');
    const sidebarTestLabel = document.getElementById('sidebarTestLabel');

    if (adzanBannerTitle) {
        adzanBannerTitle.textContent = isSubuhPrayer ? 'Kumandang Adzan Subuh' : `Kumandang ${title}`;
    }
    if (adzanBannerSub) {
        if (isSubuhPrayer) {
            adzanBannerSub.textContent = 'الصلاة خير من النوم • SUBUH';
        } else {
            adzanBannerSub.textContent = `${adzanChoice.tag} • WAKTU SHOLAT`;
        }
    }
    if (adzanBanner) adzanBanner.classList.add('show');

    if (testAdzanBtn) {
        testAdzanBtn.classList.add('playing');
        if (testAdzanIcon) testAdzanIcon.className = 'fa-solid fa-circle-stop';
        if (testAdzanLabel) testAdzanLabel.textContent = 'Stop Adzan';
    }

    if (sidebarTestIcon && sidebarTestLabel) {
        sidebarTestIcon.className = 'fa-solid fa-circle-stop';
        sidebarTestLabel.textContent = 'Hentikan Adzan';
    }

    const audio = getAudioElement();
    if (audio) {
        audio.src = audioSrc;
        audio.currentTime = 0;
        audio.volume = 1.0;
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log(`Adzan playing: ${audioSrc}`);
            }).catch(err => {
                console.warn('Playback error, using chime synthesizer:', err);
                playSynthesizerChime();
            });
        }
    } else {
        playSynthesizerChime();
    }
}

function stopRealAdzan() {
    state.isPlayingAdzan = false;
    const audio = getAudioElement();
    const testAdzanBtn = document.getElementById('testAdzanBtn');
    const testAdzanIcon = document.getElementById('testAdzanIcon');
    const testAdzanLabel = document.getElementById('testAdzanLabel');
    const sidebarTestIcon = document.getElementById('sidebarTestIcon');
    const sidebarTestLabel = document.getElementById('sidebarTestLabel');
    const adzanBanner = document.getElementById('adzanBanner');

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    if (testAdzanBtn) {
        testAdzanBtn.classList.remove('playing');
        if (testAdzanIcon) testAdzanIcon.className = 'fa-solid fa-volume-high';
        if (testAdzanLabel) testAdzanLabel.textContent = 'Tes Adzan';
    }

    if (sidebarTestIcon && sidebarTestLabel) {
        sidebarTestIcon.className = 'fa-solid fa-play';
        sidebarTestLabel.textContent = 'Putar Adzan Makkah';
    }

    if (adzanBanner) adzanBanner.classList.remove('show');
}

function playSynthesizerChime() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const notes = [293.66, 311.13, 369.99, 392.00, 440.00];
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.28);
            gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.28);
            gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + idx * 0.28 + 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.28 + 0.9);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.28);
            osc.stop(ctx.currentTime + idx * 0.28 + 0.95);
        });
    } catch (e) {
        console.warn('Synth error:', e);
    }
}
