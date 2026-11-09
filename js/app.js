/* =====================================================================
   KONTROL APLIKASI UTAMA (APP.JS)
   - Audio SFX Synthesizer (Web Audio API)
   - Navigasi 5 Halaman (dengan Persistensi SessionStorage)
   - Modal Preview Kategori Kartu & Upload Foto Terkompresi
   - Modal Sesi Selesai (End-Game & Konfeti)
   - Inisialisasi Saat Dimuat
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
    btn.textContent = soundEnabled ? '🔊 Suara: ON' : '🔇 Suara: OFF';
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

// Efek Suara Prosedural Sintetis (Bebas dari masalah koneksi / file hilang)
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
        } else if (type === 'fanfare') {
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.12);
                gain.gain.setValueAtTime(0.22, now + idx * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.12);
                osc.stop(now + idx * 0.12 + 0.35);
            });
        }
    } catch (e) {
        // Audio menunggu interaksi pertama pengguna
    }
}

// Berpindah antar 5 halaman
function goToPage(pageNum, silent = false) {
    const validPage = [1, 2, 3, 4, 5].includes(Number(pageNum)) ? Number(pageNum) : 1;
    if (!silent && typeof playSfx === 'function') playSfx('click');

    // Dipakai CSS (mis. sembunyikan logo beruang di halaman selain 1 pada HP)
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

        // Pakai classList.toggle agar class layout dasar tetap utuh
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

// Kunci scroll halaman di belakang modal (hanya buka kunci jika semua modal sudah tertutup)
function syncBodyScrollLock() {
    const catModal = document.getElementById('category-modal');
    const finModal = document.getElementById('finish-modal');
    const isAnyOpen =
        (catModal && !catModal.classList.contains('hidden')) ||
        (finModal && !finModal.classList.contains('hidden'));
    document.body.classList.toggle('overflow-hidden', Boolean(isAnyOpen));
}

// Buka Modal Daftar Kartu pada Halaman 3
function openCategoryModal(category, preserveScroll = false) {
    const validCat = ['all', 'umum', 'khusus', 'visual'].includes(category) ? category : 'all';
    if (!preserveScroll && typeof playSfx === 'function') playSfx('click');

    const modal = document.getElementById('category-modal');
    const titleEl = document.getElementById('modal-category-title');
    const bodyEl = document.getElementById('modal-category-body');
    const playBtn = document.getElementById('modal-play-category-btn');

    if (!modal || !titleEl || !bodyEl || !playBtn) return;

    const prevScrollTop = preserveScroll ? bodyEl.scrollTop : 0;

    const titles = {
        'all': 'Semua Isi Kartu (Total 46 Kartu)',
        'umum': 'Pertanyaan Umum (18 Kartu)',
        'khusus': 'Pertanyaan Khusus (18 Kartu)',
        'visual': 'Visual Card (10 Kartu)'
    };
    titleEl.textContent = titles[validCat] || 'Isi Kartu';

    const cards = buildAllCards(validCat);
    bodyEl.innerHTML = cards.map(c => {
        const safeLabel = typeof escapeXml === 'function' ? escapeXml(c.categoryLabel) : c.categoryLabel;
        const safeText = typeof escapeXml === 'function' ? escapeXml(c.text) : c.text;
        const safeTitle = typeof escapeXml === 'function' ? escapeXml(c.title || 'Visual Card') : (c.title || 'Visual Card');
        return `
        <div class="p-4 rounded-2xl border-2 bg-white shadow-sm flex flex-col justify-between gap-2" style="border-color:${c.colorBorder}">
            <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold" style="background:${c.colorBg}">${safeLabel}</span>
                <span class="font-hand text-lg text-[#D85A88]">${c.id}</span>
            </div>
            ${c.category === 'visual' ? `
                <div class="relative group my-1">
                    <img src="${c.image}" alt="${safeTitle}" data-fallback-title="${safeTitle}" class="modal-visual-img w-full h-36 object-cover rounded-xl border border-pink-200">
                    <label class="mt-1 inline-block cursor-pointer text-xs bg-pink-50 hover:bg-pink-100 text-[#D85A88] font-bold px-3 py-1.5 sm:py-0.5 sm:px-2 rounded-md border border-pink-200 transition">
                        📷 Ganti Foto
                        <input type="file" accept="image/*" class="hidden" onchange="uploadModalPhoto(event, ${c.visualIndex}, '${validCat}')">
                    </label>
                </div>
            ` : ''}
            <p class="text-sm font-medium text-[#5A3E5C]">${safeText}</p>
        </div>
        `;
    }).join('');

    // Pasang fallback gambar secara aman untuk seluruh kartu visual di dalam modal
    if (typeof getFallbackSvg === 'function') {
        bodyEl.querySelectorAll('.modal-visual-img').forEach(img => {
            img.onerror = function () {
                this.onerror = null;
                this.src = getFallbackSvg(this.getAttribute('data-fallback-title') || 'Visual Card');
            };
        });
    }

    playBtn.onclick = () => {
        closeCategoryModal();
        const filterEl = document.getElementById('deck-filter');
        if (filterEl) {
            filterEl.value = validCat;
        }
        shuffleAndDealUno();
        goToPage(5);
    };

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    syncBodyScrollLock();

    if (preserveScroll) {
        bodyEl.scrollTop = prevScrollTop;
    } else {
        bodyEl.scrollTop = 0;
    }
}

// Upload Foto dari dalam Modal Preview (dengan kompresi & sinkronisasi ke meja permainan)
function uploadModalPhoto(event, visualIndex, currentCategory) {
    const inputEl = event && event.target ? event.target : null;
    const file = inputEl && inputEl.files ? inputEl.files[0] : null;
    if (!file) return;

    const handleImageReady = (dataUrl) => {
        if (typeof saveCustomImage === 'function') {
            saveCustomImage(visualIndex, dataUrl);
        }
        if (typeof syncVisualCardImage === 'function') {
            syncVisualCardImage(visualIndex, dataUrl);
        }
        if (typeof renderUnoTable === 'function') {
            renderUnoTable(false);
        }
        playSfx('click');
        openCategoryModal(currentCategory, true);
    };

    if (typeof compressImageFile === 'function') {
        compressImageFile(file)
            .then(handleImageReady)
            .catch(() => {
                if (inputEl) inputEl.value = '';
            });
    } else {
        const reader = new FileReader();
        reader.onload = (e) => handleImageReady(e.target.result);
        reader.readAsDataURL(file);
    }
}

// Tutup Modal Daftar Kartu
function closeCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    syncBodyScrollLock();
}

// Modal Selesai Permainan & Konfeti
function openFinishModal() {
    playSfx('fanfare');
    triggerHeartConfetti();

    const finishModal = document.getElementById('finish-modal');
    if (finishModal) {
        finishModal.classList.remove('hidden');
        finishModal.classList.add('flex');
        syncBodyScrollLock();
    }
}

function closeFinishModal() {
    const finishModal = document.getElementById('finish-modal');
    if (finishModal) {
        finishModal.classList.add('hidden');
        finishModal.classList.remove('flex');
        syncBodyScrollLock();
    }
}

// Konfeti Hati & Pastel
function triggerHeartConfetti() {
    if (typeof confetti === 'function') {
        const count = 120;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#F48FB1', '#FFD6E4', '#CE93D8', '#BA68C8', '#FFF8FA']
        };

        confetti({
            ...defaults,
            particleCount: Math.floor(count * 0.6),
            spread: 60,
        });
        confetti({
            ...defaults,
            particleCount: Math.floor(count * 0.4),
            spread: 100,
            decay: 0.91,
            scalar: 1.2
        });
    }
}

// Inisialisasi Saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadSoundPreference();

    // Render daftar instruksi di Halaman 4
    const instList = document.getElementById('instruction-list');
    if (instList && Array.isArray(DAFTAR_INSTRUKSI)) {
        instList.innerHTML = DAFTAR_INSTRUKSI.map(item => {
            const safeItem = typeof escapeXml === 'function' ? escapeXml(item) : item;
            return `<li>${safeItem}</li>`;
        }).join('');
    }

    // Pulihkan sesi permainan jika halaman di-refresh, atau kocok baru jika sesi belum ada
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
    ['category-modal', 'finish-modal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                    syncBodyScrollLock();
                }
            });
        }
    });

    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCategoryModal();
            closeFinishModal();
        }
    });
});
