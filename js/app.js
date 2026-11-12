/* =====================================================================
   KONTROL APLIKASI UTAMA (APP.JS)
   - Audio SFX Synthesizer (Web Audio API)
   - Navigasi 5 Halaman (dengan Persistensi SessionStorage)
   - Modal Preview Visualisasi Kategori Kartu (Tanpa Teks Pertanyaan)
   - Inisialisasi Tumpukan 4 Kartu Halaman 3 & Galeri Halaman 5
   ===================================================================== */

const PAGE_STATE_KEY = 'TALK_ACTIVE_PAGE_V1';
const SOUND_STATE_KEY = 'TALK_SOUND_ENABLED_V1';

// State Audio
let soundEnabled = true;
let audioCtx = null;

function loadSoundPreference() {
    try {
        const saved = localStorage.getItem(SOUND_STATE_KEY);
        if (saved !== null) {
            soundEnabled = saved === 'true';
        }
    } catch (e) {
        // Abaikan jika localStorage diblokir
    }
    updateSoundButtonUI();
}

function updateSoundButtonUI() {
    const btn = document.getElementById('sound-toggle-btn');
    if (!btn) return;
    btn.innerHTML = soundEnabled
        ? 'Suara: ON'
        : 'Suara: OFF';
    btn.setAttribute('aria-pressed', String(soundEnabled));
}

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    try {
        localStorage.setItem(SOUND_STATE_KEY, String(soundEnabled));
    } catch (e) {
        // Abaikan jika localStorage diblokir
    }
    updateSoundButtonUI();
    if (soundEnabled) playSfx('click');
}

// Efek Suara Prosedural Sintetis
function playSfx(type) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        if (type === 'click') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.07);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.07);
        } else if (type === 'deal') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(260, now);
            osc.frequency.exponentialRampToValueAtTime(540, now + 0.12);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.12);
        } else if (type === 'flip') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(360, now);
            osc.frequency.exponentialRampToValueAtTime(740, now + 0.16);
            gain.gain.setValueAtTime(0.22, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.16);
        }
    } catch (e) {
        // Audio menunggu interaksi pertama pengguna
    }
}

// Berpindah antar 5 halaman
function goToPage(pageNum, silent = false) {
    const validPage = [1, 2, 3, 4, 5].includes(Number(pageNum)) ? Number(pageNum) : 1;
    if (!silent && typeof playSfx === 'function') playSfx('click');

    document.body.dataset.page = String(validPage);
    try {
        sessionStorage.setItem(PAGE_STATE_KEY, String(validPage));
    } catch (e) {
        // Abaikan jika sessionStorage diblokir
    }

    for (let i = 1; i <= 5; i++) {
        const sec = document.getElementById(`page-${i}`);
        const btn = document.getElementById(`nav-btn-${i}`);
        if (!sec || !btn) continue;

        const isActive = i === validPage;
        sec.classList.toggle('active', isActive);

        btn.classList.toggle('bg-pink-200', isActive);
        btn.classList.toggle('text-pink-900', isActive);
        btn.classList.toggle('font-bold', isActive);
        btn.classList.toggle('hover:bg-pink-100', !isActive);
        btn.classList.toggle('text-[#5A3E5C]', !isActive);

        if (isActive) {
            btn.setAttribute('aria-current', 'page');
            const nav = btn.parentElement;
            if (nav && nav.scrollWidth > nav.clientWidth) {
                const offset = btn.getBoundingClientRect().left - nav.getBoundingClientRect().left;
                nav.scrollTo({
                    left: nav.scrollLeft + offset - (nav.clientWidth - btn.offsetWidth) / 2,
                    behavior: 'smooth'
                });
            }
        } else {
            btn.removeAttribute('aria-current');
        }
    }
    window.scrollTo({ top: 0, behavior: silent ? 'auto' : 'smooth' });
}

// Kunci scroll halaman di belakang modal
function syncBodyScrollLock() {
    const catModal = document.getElementById('category-modal');
    const isAnyOpen = catModal && !catModal.classList.contains('hidden');
    document.body.classList.toggle('overflow-hidden', Boolean(isAnyOpen));
}

// Buka Modal Visualisasi Desain Kartu pada Halaman 3 (Tanpa Teks Pertanyaan)
function openCategoryModal(category) {
    const validCat = ['all', 'umum', 'khusus', 'visual'].includes(category) ? category : 'all';
    if (typeof playSfx === 'function') playSfx('click');

    const modal = document.getElementById('category-modal');
    const titleEl = document.getElementById('modal-category-title');
    const bodyEl = document.getElementById('modal-category-body');
    const playBtn = document.getElementById('modal-play-category-btn');

    if (!modal || !titleEl || !bodyEl || !playBtn) return;

    const titles = {
        all: 'Visualisasi Seluruh Desain Kartu (50 Kartu)',
        khusus: 'Visualisasi Kartu Pertanyaan Khusus (16 Kartu)',
        umum: 'Visualisasi Kartu Pertanyaan Umum (20 Kartu)',
        visual: 'Visualisasi Visual Card & Action Card (14 Kartu)'
    };
    titleEl.textContent = titles[validCat] || 'Visualisasi Desain Kartu';

    const items = typeof getCardsByCategory === 'function' ? getCardsByCategory(validCat) : [];

    bodyEl.innerHTML = items
        .map(item => {
            const safeTitle = typeof escapeXml === 'function' ? escapeXml(item.title) : item.title;
            const safeSubtitle = typeof escapeXml === 'function' ? escapeXml(item.subtitle) : item.subtitle;
            const safeDesc = typeof escapeXml === 'function' ? escapeXml(item.description) : item.description;
            const safeCount = typeof escapeXml === 'function' ? escapeXml(item.countLabel) : item.countLabel;
            const frontSvg = typeof generateCardSVG === 'function' ? generateCardSVG(item.svgType) : '';
            const backSvg = typeof generateCardSVG === 'function' ? generateCardSVG('card-back') : '';

            return `
            <div class="p-4 rounded-2xl border-2 bg-white shadow-sm flex flex-col justify-between gap-3" style="border-color:${item.borderColor}">
                <div class="flex items-center justify-between gap-2">
                    <span class="px-3 py-0.5 rounded-full text-xs font-bold" style="background:${item.badgeBg}; color:${item.badgeText}">
                        ${safeCount}
                    </span>
                    <span class="text-xs font-semibold text-[#8E6D94]">${safeSubtitle}</span>
                </div>

                <!-- Pratinjau Desain Kartu (Depan & Sampul Belakang Berdampingan) -->
                <div class="relative flex items-center justify-center py-3 bg-[#FFF8FA] rounded-xl border border-pink-100 overflow-hidden">
                    ${
                        item.svgType !== 'card-back'
                            ? `
                        <div class="w-24 h-36 sm:w-28 sm:h-40 rounded-lg shadow-md transform -rotate-6 translate-x-2 opacity-90">
                            ${backSvg}
                        </div>
                        <div class="w-28 h-40 sm:w-32 sm:h-48 rounded-lg shadow-lg transform rotate-3 -translate-x-2 z-10">
                            ${frontSvg}
                        </div>
                    `
                            : `
                        <div class="w-32 h-48 rounded-lg shadow-lg">
                            ${frontSvg}
                        </div>
                    `
                    }
                </div>

                <div>
                    <h4 class="font-hand text-xl sm:text-2xl text-[#D85A88] leading-tight">${safeTitle}</h4>
                    <p class="text-xs sm:text-sm font-medium text-[#5A3E5C] mt-1 leading-relaxed">${safeDesc}</p>
                </div>
            </div>
            `;
        })
        .join('');

    playBtn.onclick = () => {
        closeCategoryModal();
        const filterEl = document.getElementById('deck-filter');
        if (filterEl) {
            filterEl.value = validCat;
        }
        if (typeof shuffleAndDealUno === 'function') {
            shuffleAndDealUno();
        }
        goToPage(5);
    };

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    syncBodyScrollLock();
    bodyEl.scrollTop = 0;
}

// Tutup Modal Daftar Kartu
function closeCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    syncBodyScrollLock();
}

// Render Ilustrasi 4 Kartu Bertumpuk di Halaman 3 dengan SVG Asli
function initPage3StackedCards() {
    if (typeof generateCardSVG !== 'function') return;
    const slotKhusus = document.getElementById('stack-slot-khusus');
    const slotUmum = document.getElementById('stack-slot-umum');
    const slotVisual = document.getElementById('stack-slot-visual');
    const slotBack = document.getElementById('stack-slot-back');

    if (slotKhusus) slotKhusus.innerHTML = generateCardSVG('khusus-front');
    if (slotUmum) slotUmum.innerHTML = generateCardSVG('umum-front');
    if (slotVisual) slotVisual.innerHTML = generateCardSVG('visual-pasangan');
    if (slotBack) slotBack.innerHTML = generateCardSVG('card-back');
}

// Inisialisasi Saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadSoundPreference();
    initPage3StackedCards();

    // Render daftar instruksi di Halaman 4
    const instList = document.getElementById('instruction-list');
    if (instList && Array.isArray(DAFTAR_INSTRUKSI)) {
        instList.innerHTML = DAFTAR_INSTRUKSI.map(item => {
            if (item && typeof item === 'object' && Array.isArray(item.points)) {
                const safeStep = typeof escapeXml === 'function' ? escapeXml(item.step) : item.step;
                const pointsHtml = item.points
                    .map(pt => {
                        const safePt = typeof escapeXml === 'function' ? escapeXml(pt) : pt;
                        return `<li class="flex items-start gap-2"><span class="text-[#E06D94] font-bold leading-snug">•</span><span>${safePt}</span></li>`;
                    })
                    .join('');
                return `
                    <div class="bg-white/80 border border-pink-200 rounded-2xl p-3.5 sm:p-4 shadow-xs">
                        <h4 class="font-hand text-xl sm:text-2xl text-[#D85A88] tracking-wide mb-1.5">${safeStep}</h4>
                        <ul class="space-y-1 text-xs sm:text-base text-[#5A3E5C] leading-relaxed font-medium">
                            ${pointsHtml}
                        </ul>
                    </div>
                `;
            }
            const safeItem = typeof escapeXml === 'function' ? escapeXml(item) : item;
            return `<li>${safeItem}</li>`;
        }).join('');
    }

    // Pulihkan state showcase atau mulai dari semua kartu
    let restored = false;
    if (typeof restoreGameState === 'function') {
        restored = restoreGameState();
    }
    if (!restored && typeof shuffleAndDealUno === 'function') {
        shuffleAndDealUno();
    }

    // Pulihkan halaman aktif terakhir jika halaman di-refresh
    try {
        const savedPage = sessionStorage.getItem(PAGE_STATE_KEY);
        if (savedPage) {
            goToPage(Number(savedPage), true);
        }
    } catch (e) {
        // Tetap di halaman 1
    }

    // Tutup modal jika klik di luar kotak
    const modal = document.getElementById('category-modal');
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                closeCategoryModal();
            }
        });
    }

    // Navigasi keyboard (ESC untuk tutup modal, Panah Kiri/Kanan di Halaman 5)
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeCategoryModal();
        } else if (document.body.dataset.page === '5') {
            if (e.key === 'ArrowRight' && typeof stepShowcaseCard === 'function') {
                stepShowcaseCard(1);
            } else if (e.key === 'ArrowLeft' && typeof stepShowcaseCard === 'function') {
                stepShowcaseCard(-1);
            }
        }
    });
});
