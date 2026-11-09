/* =====================================================================
   LOGIKA VISUALISASI KARTU INTERAKTIF (GAME.JS)
   - Menggantikan permainan kartu UNO menjadi Showcase / Visualisasi Desain
   - Tanpa menampilkan kalimat pertanyaan rahasia
   - Mendukung Filter Kategori (Semua, Umum, Khusus, Visual & Action, Sampul Belakang)
   - Mendukung Balik Sisi Kartu (Depan <-> Sampul Belakang) & Navigasi Kartu
   ===================================================================== */

const SHOWCASE_STATE_KEY = 'TALK_SHOWCASE_STATE_V1';

let activeCategoryFilter = 'all';
let filteredCardTypes = [];
let currentCardIndex = 0;
let isShowingBackSide = false;

// Simpan pilihan visualisasi agar tidak hilang saat refresh
function saveShowcaseState() {
    try {
        sessionStorage.setItem(
            SHOWCASE_STATE_KEY,
            JSON.stringify({
                activeCategoryFilter,
                currentCardIndex,
                isShowingBackSide
            })
        );
    } catch (e) {
        // Abaikan jika sessionStorage tidak tersedia
    }
}

// Pulihkan state visualisasi saat halaman dimuat
function restoreGameState() {
    try {
        const raw = sessionStorage.getItem(SHOWCASE_STATE_KEY);
        if (!raw) return false;
        const state = JSON.parse(raw);
        if (!state) return false;

        activeCategoryFilter = ['all', 'umum', 'khusus', 'visual', 'back'].includes(state.activeCategoryFilter)
            ? state.activeCategoryFilter
            : 'all';
        filteredCardTypes = getCardsByCategory(activeCategoryFilter);
        currentCardIndex =
            typeof state.currentCardIndex === 'number' &&
            state.currentCardIndex >= 0 &&
            state.currentCardIndex < filteredCardTypes.length
                ? state.currentCardIndex
                : 0;
        isShowingBackSide = Boolean(state.isShowingBackSide);

        const filterEl = document.getElementById('deck-filter');
        if (filterEl) filterEl.value = activeCategoryFilter;

        renderShowcaseView(false);
        return true;
    } catch (e) {
        return false;
    }
}

// Ambil daftar tipe kartu sesuai filter kategori
function getCardsByCategory(filterType = 'all') {
    if (!Array.isArray(CARD_VISUAL_TYPES)) return [];
    if (filterType === 'all') return [...CARD_VISUAL_TYPES];
    return CARD_VISUAL_TYPES.filter(item => item.category === filterType);
}

// Dipanggil saat dropdown filter berubah atau saat tombol reset/inisialisasi ditekan
function shuffleAndDealUno() {
    const filterEl = document.getElementById('deck-filter');
    activeCategoryFilter = filterEl ? filterEl.value : 'all';
    filteredCardTypes = getCardsByCategory(activeCategoryFilter);
    currentCardIndex = 0;
    isShowingBackSide = false;

    if (typeof playSfx === 'function') playSfx('deal');
    saveShowcaseState();
    renderShowcaseView(true);
}

// Balik tampilan kartu aktif antara Sisi Desain Depan <-> Sampul Belakang
function toggleCardSide() {
    isShowingBackSide = !isShowingBackSide;
    if (typeof playSfx === 'function') playSfx('flip');
    saveShowcaseState();
    renderShowcaseView(true);
}

// Pilih kartu tertentu dari deretan thumbnail bawah
function selectShowcaseCard(index) {
    if (index < 0 || index >= filteredCardTypes.length) return;
    currentCardIndex = index;
    isShowingBackSide = false;
    if (typeof playSfx === 'function') playSfx('flip');
    saveShowcaseState();
    renderShowcaseView(true);
}

// Navigasi kartu sebelumnya / berikutnya
function stepShowcaseCard(delta) {
    if (filteredCardTypes.length === 0) return;
    currentCardIndex = (currentCardIndex + delta + filteredCardTypes.length) % filteredCardTypes.length;
    isShowingBackSide = false;
    if (typeof playSfx === 'function') playSfx('click');
    saveShowcaseState();
    renderShowcaseView(true);
}

// Render Utama Area Visualisasi Kartu di Halaman 5
function renderShowcaseView(animateFlip = false) {
    if (filteredCardTypes.length === 0) {
        filteredCardTypes = getCardsByCategory('all');
        currentCardIndex = 0;
    }

    const activeItem = filteredCardTypes[currentCardIndex] || filteredCardTypes[0];
    if (!activeItem) return;

    const stageMainSlot = document.getElementById('showcase-main-card');
    const stageTwinSlot = document.getElementById('showcase-twin-card');
    const titleEl = document.getElementById('showcase-card-title');
    const subtitleEl = document.getElementById('showcase-card-subtitle');
    const badgeEl = document.getElementById('showcase-card-badge');
    const descEl = document.getElementById('showcase-card-desc');
    const counterEl = document.getElementById('showcase-counter');
    const flipBtn = document.getElementById('flip-side-btn');
    const thumbsContainer = document.getElementById('showcase-thumbs');

    // Tentukan SVG mana yang ditampilkan di kartu utama & kartu pendamping belakangnya
    const mainSvgType = isShowingBackSide ? 'card-back' : activeItem.svgType;
    const twinSvgType = isShowingBackSide ? activeItem.svgType : 'card-back';

    if (stageMainSlot && typeof generateCardSVG === 'function') {
        stageMainSlot.className = `showcase-card-frame relative z-10 w-28 h-40 sm:w-52 sm:h-76 rounded-xl sm:rounded-2xl shadow-xl transform -translate-x-2 -rotate-2 cursor-pointer transition-transform duration-300 ${animateFlip ? 'animate-flip' : ''}`;
        stageMainSlot.innerHTML = generateCardSVG(mainSvgType);
    }

    if (stageTwinSlot && typeof generateCardSVG === 'function') {
        stageTwinSlot.innerHTML = generateCardSVG(twinSvgType);
    }

    if (titleEl) {
        titleEl.textContent = isShowingBackSide
            ? `Sampul Belakang — ${activeItem.title}`
            : activeItem.title;
    }

    if (subtitleEl) {
        subtitleEl.textContent = activeItem.subtitle;
    }

    if (badgeEl) {
        badgeEl.textContent = activeItem.countLabel;
        badgeEl.style.backgroundColor = activeItem.badgeBg;
        badgeEl.style.color = activeItem.badgeText;
    }

    if (descEl) {
        descEl.textContent = activeItem.description;
    }

    if (counterEl) {
        counterEl.textContent = `${currentCardIndex + 1} / ${filteredCardTypes.length}`;
    }

    if (flipBtn) {
        flipBtn.textContent = isShowingBackSide ? '🔄 Sisi Depan' : '🔄 Balik Kartu';
        flipBtn.setAttribute('aria-pressed', String(isShowingBackSide));
    }

    // Render deretan thumbnail kartu di bagian bawah agar mudah dipilih di HP maupun Desktop
    if (thumbsContainer && typeof generateCardSVG === 'function') {
        thumbsContainer.innerHTML = '';
        filteredCardTypes.forEach((item, idx) => {
            const isSelected = idx === currentCardIndex;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `thumb-card shrink-0 flex flex-col items-center p-1.5 rounded-xl border-2 transition ${
                isSelected
                    ? 'bg-[#FCE4EC] border-[#E06D94] shadow-md scale-105'
                    : 'bg-white/90 border-pink-200 opacity-80 hover:opacity-100'
            }`;
            btn.setAttribute('aria-label', `Pilih ${item.title}`);
            btn.setAttribute('aria-current', isSelected ? 'true' : 'false');

            btn.innerHTML = `
                <div class="w-11 h-16 sm:w-16 sm:h-24 rounded-md sm:rounded-lg overflow-hidden shadow-xs pointer-events-none">
                    ${generateCardSVG(item.svgType)}
                </div>
                <span class="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-bold text-[#5A3E5C] max-w-[60px] sm:max-w-[76px] truncate">
                    ${escapeXml(item.title.replace('Visual Card — ', '').replace('Action Card — ', '').replace('Kartu ', '').replace('Sampul Belakang (Card Back)', 'Sampul'))}
                </span>
            `;

            btn.onclick = () => selectShowcaseCard(idx);
            thumbsContainer.appendChild(btn);

            if (isSelected && thumbsContainer.scrollWidth > thumbsContainer.clientWidth) {
                setTimeout(() => {
                    const offset = btn.getBoundingClientRect().left - thumbsContainer.getBoundingClientRect().left;
                    thumbsContainer.scrollTo({
                        left: thumbsContainer.scrollLeft + offset - (thumbsContainer.clientWidth - btn.offsetWidth) / 2,
                        behavior: 'smooth'
                    });
                }, 30);
            }
        });
    }
}
