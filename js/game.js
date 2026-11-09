/* =====================================================================
   LOGIKA PERMAINAN KARTU UNO / TALK FOR TWO
   - State Deck & Pemain (dengan Persistensi SessionStorage)
   - Mode Privasi (Pass & Play)
   - Shuffle & Deal
   - Play Card & Draw Card (Anti Spam-Click & Anti Deadlock Giliran)
   - Render Meja Permainan
   ===================================================================== */

const GAME_STATE_KEY = 'TALK_GAME_STATE_V1';
const MAX_HAND_SIZE = 10;

let drawDeck = [];
let player1Hand = [];
let player2Hand = [];
let currentTurn = 1; // 1 = Pemain 1, 2 = Pemain 2
let activePlayedCard = null;
let privacyMode = false;
let totalCardsPlayed = 0;
let isActionLocked = false;
let finishTimeoutId = null;

// Cooldown singkat untuk mencegah spam klik beruntun
function lockAction(durationMs = 220) {
    isActionLocked = true;
    setTimeout(() => {
        isActionLocked = false;
    }, durationMs);
}

// Sinkronisasi tampilan tombol Mode Privasi
function updatePrivacyButtonUI() {
    const btn = document.getElementById('privacy-toggle-btn');
    if (!btn) return;
    btn.textContent = privacyMode ? '🙈 Privasi: ON' : '👀 Privasi: OFF';
    const base = 'shrink-0 min-h-[40px] sm:min-h-0 px-2.5 py-1.5 rounded-xl text-xs shadow-sm transition';
    btn.className = privacyMode
        ? `${base} font-bold bg-[#E06D94] text-white border border-[#E06D94]`
        : `${base} font-semibold bg-white text-[#5A3E5C] border border-pink-300`;
    btn.setAttribute('aria-pressed', String(privacyMode));
}

// Mode Privasi untuk main di 1 layar smartphone berdua
function togglePrivacyMode() {
    privacyMode = !privacyMode;
    updatePrivacyButtonUI();
    if (typeof playSfx === 'function') playSfx('click');
    saveGameState();
    renderUnoTable(false);
}

// Simpan state permainan ke sessionStorage agar aman saat halaman di-refresh
function saveGameState() {
    try {
        const filterEl = document.getElementById('deck-filter');
        const state = {
            filterVal: filterEl ? filterEl.value : 'all',
            drawDeck,
            player1Hand,
            player2Hand,
            currentTurn,
            activePlayedCard,
            privacyMode,
            totalCardsPlayed
        };
        sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
    } catch (e) {
        // Abaikan jika sessionStorage tidak tersedia
    }
}

// Pulihkan state permainan saat halaman di-refresh di tengah jalan
function restoreGameState() {
    try {
        const raw = sessionStorage.getItem(GAME_STATE_KEY);
        if (!raw) return false;
        const state = JSON.parse(raw);
        if (!state || !Array.isArray(state.drawDeck) || !Array.isArray(state.player1Hand) || !Array.isArray(state.player2Hand)) {
            return false;
        }

        // Pastikan total kartu valid (tidak kosong total tanpa kartu aktif)
        const totalInGame = state.drawDeck.length + state.player1Hand.length + state.player2Hand.length + (state.activePlayedCard ? 1 : 0);
        if (totalInGame === 0) return false;

        drawDeck = state.drawDeck;
        player1Hand = state.player1Hand;
        player2Hand = state.player2Hand;
        currentTurn = state.currentTurn === 2 ? 2 : 1;
        activePlayedCard = state.activePlayedCard || null;
        privacyMode = Boolean(state.privacyMode);
        totalCardsPlayed = Number(state.totalCardsPlayed) || 0;

        const filterEl = document.getElementById('deck-filter');
        if (filterEl && state.filterVal) {
            filterEl.value = state.filterVal;
        }

        // Segarkan foto custom terbaru dari localStorage pada semua kartu visual
        refreshAllVisualImagesInState();
        updatePrivacyButtonUI();
        renderUnoTable(false);
        return true;
    } catch (e) {
        return false;
    }
}

// Segarkan gambar kartu visual di state aktif sesuai penyimpanan terbaru
function refreshAllVisualImagesInState() {
    if (typeof getVisualCardImage !== 'function') return;
    const updateCardImg = (card) => {
        if (card && card.category === 'visual' && typeof card.visualIndex === 'number') {
            card.image = getVisualCardImage(card.visualIndex);
        }
    };
    drawDeck.forEach(updateCardImg);
    player1Hand.forEach(updateCardImg);
    player2Hand.forEach(updateCardImg);
    if (activePlayedCard) updateCardImg(activePlayedCard);
}

// Sinkronkan perubahan foto custom pada kartu yang sedang aktif di meja/tangan/deck
function syncVisualCardImage(visualIndex, dataUrl) {
    const updateCard = (card) => {
        if (card && card.category === 'visual' && card.visualIndex === visualIndex) {
            card.image = dataUrl;
        }
    };
    drawDeck.forEach(updateCard);
    player1Hand.forEach(updateCard);
    player2Hand.forEach(updateCard);
    if (activePlayedCard) updateCard(activePlayedCard);
    saveGameState();
}

// Membangun daftar kartu berdasarkan filter dengan validasi integritas data
function buildAllCards(filterType = 'all') {
    const all = [];
    const validFilter = ['all', 'umum', 'khusus', 'visual'].includes(filterType) ? filterType : 'all';

    if ((validFilter === 'all' || validFilter === 'umum') && Array.isArray(PERTANYAAN_UMUM)) {
        PERTANYAAN_UMUM.forEach((text, i) => {
            if (!text) return;
            all.push({
                id: `U-${i + 1}`,
                number: i + 1,
                category: 'umum',
                categoryLabel: 'Pertanyaan Umum',
                colorBg: '#FFD6E4',
                colorBorder: '#F48FB1',
                text: String(text)
            });
        });
    }

    if ((validFilter === 'all' || validFilter === 'khusus') && Array.isArray(PERTANYAAN_KHUSUS)) {
        PERTANYAAN_KHUSUS.forEach((text, i) => {
            if (!text) return;
            all.push({
                id: `K-${i + 1}`,
                number: i + 1,
                category: 'khusus',
                categoryLabel: 'Pertanyaan Khusus',
                colorBg: '#EFE5F7',
                colorBorder: '#BA68C8',
                text: String(text)
            });
        });
    }

    if ((validFilter === 'all' || validFilter === 'visual') && Array.isArray(VISUAL_CARDS)) {
        VISUAL_CARDS.forEach((item, i) => {
            if (!item) return;
            const imgSrc = typeof getVisualCardImage === 'function' ? getVisualCardImage(i) : (item.defaultImage || '');
            all.push({
                id: `V-${i + 1}`,
                number: i + 1,
                visualIndex: i,
                category: 'visual',
                categoryLabel: 'Visual Card',
                colorBg: '#FCE4EC',
                colorBorder: '#E06D94',
                text: String(item.caption || ''),
                title: String(item.title || `Visual Card #${i + 1}`),
                image: imgSrc
            });
        });
    }

    return all;
}

// Algoritma Fisher-Yates Shuffle
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Menentukan giliran berikutnya dengan perlindungan anti-deadlock
// Jika pemain berikutnya kehabisan kartu di tangan DAN deck sudah habis,
// giliran otomatis tetap pada pemain yang masih memegang kartu.
function resolveNextTurn(preferredTurn) {
    const nextHand = preferredTurn === 1 ? player1Hand : player2Hand;
    const otherTurn = preferredTurn === 1 ? 2 : 1;
    const otherHand = otherTurn === 1 ? player1Hand : player2Hand;

    if (nextHand.length === 0 && drawDeck.length === 0 && otherHand.length > 0) {
        return otherTurn;
    }
    return preferredTurn;
}

// Tampilkan pesan status/peringatan (juga muncul di layar HP jika bersifat penting)
function showStatusMessage(message, forceMobileVisible = false) {
    const statusText = document.getElementById('turn-status-text');
    if (!statusText) return;
    statusText.textContent = message;
    if (forceMobileVisible) {
        statusText.classList.remove('hidden');
    } else {
        statusText.classList.add('hidden');
        statusText.classList.add('sm:block');
    }
}

// Kocok & Bagikan Kartu ala UNO (5 Kartu untuk masing-masing pemain)
function shuffleAndDealUno() {
    if (finishTimeoutId) {
        clearTimeout(finishTimeoutId);
        finishTimeoutId = null;
    }

    const filterEl = document.getElementById('deck-filter');
    const filterVal = filterEl ? filterEl.value : 'all';
    const rawCards = buildAllCards(filterVal);
    drawDeck = shuffleArray(rawCards);

    const handSize = Math.min(5, Math.floor(drawDeck.length / 2));
    player1Hand = drawDeck.splice(0, handSize);
    player2Hand = drawDeck.splice(0, handSize);
    currentTurn = 1;
    activePlayedCard = null;
    totalCardsPlayed = 0;

    if (typeof playSfx === 'function') playSfx('deal');
    saveGameState();
    renderUnoTable(true);
}

// Render Tampilan Meja UNO
function renderUnoTable(withDealAnimation = false) {
    const p1Container = document.getElementById('player1-hand');
    const p2Container = document.getElementById('player2-hand');
    const deckCountEl = document.getElementById('deck-count');
    const playedSlot = document.getElementById('played-card-slot');
    const badgeP1 = document.getElementById('badge-p1');
    const badgeP2 = document.getElementById('badge-p2');

    if (!p1Container || !p2Container || !playedSlot) return;

    if (deckCountEl) {
        deckCountEl.textContent = drawDeck.length;
    }

    const isAllCardsExhausted = totalCardsPlayed > 0 && player1Hand.length === 0 && player2Hand.length === 0 && drawDeck.length === 0;

    // Update indikator giliran
    if (badgeP1 && badgeP2) {
        if (currentTurn === 1) {
            badgeP1.className = "px-4 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#F48FB1] text-white shadow-sm ring-4 ring-pink-200";
            badgeP1.textContent = "👉 Giliran Pemain 1";
            badgeP2.className = "px-4 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#E8DAEF] text-[#5A3E5C]";
            badgeP2.textContent = "Pemain 2";
        } else {
            badgeP2.className = "px-4 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#BA68C8] text-white shadow-sm ring-4 ring-purple-200";
            badgeP2.textContent = "👉 Giliran Pemain 2";
            badgeP1.className = "px-4 py-1 rounded-full text-xs sm:text-sm font-bold bg-[#FFD6E4] text-[#5A3E5C]";
            badgeP1.textContent = "Pemain 1";
        }
    }

    const activePlayerHand = currentTurn === 1 ? player1Hand : player2Hand;
    if (isAllCardsExhausted) {
        showStatusMessage("Kartu terakhir telah dibuka! Setelah selesai menjawab, tekan 'Selesaikan Sesi'.", true);
    } else if (activePlayerHand.length === 0 && drawDeck.length > 0) {
        showStatusMessage(`Kartu di tangan Pemain ${currentTurn} habis! Klik '+ Ambil' pada tumpukan Deck.`, true);
    } else {
        showStatusMessage(
            `Giliran Pemain ${currentTurn}: Pilih kartu di tangan Pemain ${currentTurn} atau ambil dari Deck!`,
            false
        );
    }

    // Render Tangan Pemain 1
    p1Container.innerHTML = '';
    const hideP1 = privacyMode && currentTurn !== 1;
    if (player1Hand.length === 0) {
        p1Container.innerHTML = `<div class="my-auto text-xs font-semibold text-[#9C7A9E] italic py-4">Tangan Pemain 1 kosong</div>`;
    } else {
        player1Hand.forEach((card, idx) => {
            const cardEl = createHandCardElement(card, 1, idx, withDealAnimation, hideP1);
            p1Container.appendChild(cardEl);
        });
    }

    // Render Tangan Pemain 2
    p2Container.innerHTML = '';
    const hideP2 = privacyMode && currentTurn !== 2;
    if (player2Hand.length === 0) {
        p2Container.innerHTML = `<div class="my-auto text-xs font-semibold text-[#9C7A9E] italic py-4">Tangan Pemain 2 kosong</div>`;
    } else {
        player2Hand.forEach((card, idx) => {
            const cardEl = createHandCardElement(card, 2, idx, withDealAnimation, hideP2);
            p2Container.appendChild(cardEl);
        });
    }

    // Render Kartu yang Terbuka di Tengah Meja
    if (!activePlayedCard) {
        playedSlot.innerHTML = `
            <div class="my-auto flex flex-col items-center text-[#9C7A9E]">
                <span class="font-hand text-2xl sm:text-3xl text-[#E06D94] mb-1">Meja Permainan</span>
                <p class="text-xs sm:text-sm leading-snug">Belum ada kartu yang dibuka.<br>Sentuh salah satu kartu dari tangan Pemain ${currentTurn} untuk memulai!</p>
            </div>
        `;
    } else {
        const isVisual = activePlayedCard.category === 'visual';
        const safeCategoryLabel = typeof escapeXml === 'function' ? escapeXml(activePlayedCard.categoryLabel) : activePlayedCard.categoryLabel;
        const safeText = typeof escapeXml === 'function' ? escapeXml(activePlayedCard.text) : activePlayedCard.text;
        const safeTitle = typeof escapeXml === 'function' ? escapeXml(activePlayedCard.title || 'Visual Card') : (activePlayedCard.title || 'Visual Card');

        playedSlot.innerHTML = `
            <div class="animate-flip w-full flex flex-col items-center justify-between h-full">
                <div class="w-full flex items-center justify-between gap-2 border-b border-pink-200 pb-1.5 sm:pb-2 mb-2 sm:mb-3">
                    <span class="px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-bold truncate" style="background:${activePlayedCard.colorBg}; color:#5A3E5C;">
                        ${safeCategoryLabel}
                    </span>
                    <span class="shrink-0 font-hand text-lg text-[#D85A88]">#${activePlayedCard.number}</span>
                </div>

                ${isVisual ? `
                    <div class="w-full flex flex-col items-center my-1 relative group">
                        <img id="played-visual-img" src="${activePlayedCard.image}" alt="${safeTitle}" 
                             class="w-full max-w-[11rem] h-24 sm:h-32 object-cover rounded-xl border-2 border-pink-300 shadow-sm mb-1.5 sm:mb-2">
                        <label class="cursor-pointer text-[11px] bg-white/90 hover:bg-pink-100 text-[#D85A88] font-bold px-3 py-1.5 sm:py-1 rounded-full border border-pink-300 shadow-sm mb-1.5 sm:mb-2 transition">
                            📷 Ganti Foto
                            <input type="file" accept="image/*" class="hidden" onchange="uploadVisualPhoto(event, ${activePlayedCard.visualIndex})">
                        </label>
                        <p class="font-semibold text-sm text-[#5A3E5C] text-center leading-snug">${safeText}</p>
                    </div>
                ` : `
                    <div class="my-auto py-1 sm:py-3 px-1 sm:px-2">
                        <p class="font-semibold text-base sm:text-lg text-[#5A3E5C] leading-snug">
                            "${safeText}"
                        </p>
                    </div>
                `}

                ${isAllCardsExhausted ? `
                    <div class="w-full pt-2 mt-2 border-t border-pink-200 flex justify-center">
                        <button onclick="openFinishModal()" class="min-h-[38px] px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F48FB1] to-[#BA68C8] text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition animate-bounce">
                            🎉 Selesaikan Sesi Ini
                        </button>
                    </div>
                ` : `
                    <div class="hidden sm:block w-full pt-2 mt-2 border-t border-pink-100 text-[11px] text-[#8E6D94]">
                        TALK for Two • Dijawab bersama pasangan/teman
                    </div>
                `}
            </div>
        `;

        // Pasang fallback gambar secara aman tanpa resiko syntax error akibat tanda kutip pada title
        if (isVisual) {
            const imgEl = document.getElementById('played-visual-img');
            if (imgEl && typeof getFallbackSvg === 'function') {
                imgEl.onerror = function () {
                    this.onerror = null;
                    this.src = getFallbackSvg(activePlayedCard.title);
                };
            }
        }
    }
}

// Membuat Elemen Kartu UNO di Tangan Pemain
function createHandCardElement(card, playerNum, index, animate, isHidden = false) {
    const btn = document.createElement('div');
    const rotation = (index - 2) * 3;
    const isCurrentPlayersTurn = playerNum === currentTurn;

    btn.style.setProperty('--card-rotate', `${rotation}deg`);
    btn.style.transform = `rotate(${rotation}deg)`;

    if (isHidden) {
        btn.className = `uno-card uno-card-hidden p-1.5 sm:p-2.5 flex flex-col items-center justify-center text-center text-white ${animate ? 'animate-deal' : ''}`;
        btn.setAttribute('aria-label', 'Kartu tertutup, tunggu giliran');
        btn.setAttribute('aria-disabled', 'true');
        btn.innerHTML = `
            <span class="font-hand text-base sm:text-lg text-[#5A3E5C]">TALK</span>
            <span class="text-[11px] text-[#5A3E5C] font-bold mt-1 leading-tight">Kartu Tertutup</span>
            <span class="text-[10px] sm:text-[11px] text-[#8E6D94] mt-0.5 leading-tight">Tunggu Giliran</span>
        `;
        return btn;
    }

    const inactiveClass = !isCurrentPlayersTurn ? 'uno-card-inactive' : '';
    btn.className = `uno-card ${inactiveClass} p-1.5 sm:p-2.5 flex flex-col justify-between border-[3px] sm:border-4 ${animate ? 'animate-deal' : ''}`;
    btn.style.backgroundColor = card.colorBg;
    btn.style.borderColor = card.colorBorder;
    if (animate) {
        btn.style.animationDelay = `${index * 0.07}s`;
    }
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', isCurrentPlayersTurn ? '0' : '-1');
    btn.setAttribute('aria-disabled', String(!isCurrentPlayersTurn));
    btn.setAttribute('aria-label', `Buka kartu ${card.categoryLabel} ${card.id}`);

    const iconSymbol = card.category === 'umum' ? '?' : (card.category === 'khusus' ? '♥' : '🖼️');
    const actionLabel = isCurrentPlayersTurn
        ? `<span class="sm:hidden">Ketuk buka</span><span class="hidden sm:inline">Klik Buka Kartu</span>`
        : `<span>Giliran P${currentTurn}</span>`;

    btn.innerHTML = `
        <div class="flex items-center justify-between w-full">
            <span class="font-bold text-[11px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded bg-white/80 text-[#5A3E5C]">${card.id}</span>
            <span class="text-xs sm:text-sm">${iconSymbol}</span>
        </div>
        <div class="my-auto flex flex-col items-center justify-center text-center px-1 py-1 sm:py-2 bg-white/75 rounded-lg sm:rounded-xl border border-white">
            <span class="font-hand text-sm sm:text-lg text-[#D85A88] leading-tight">${card.categoryLabel}</span>
        </div>
        <div class="text-[11px] font-bold text-center text-[#6E4F70] leading-tight">
            ${actionLabel}
        </div>
    `;

    btn.onclick = () => playCardFromHand(playerNum, index);
    btn.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playCardFromHand(playerNum, index);
        }
    };
    return btn;
}

// Saat Pemain Mengklik Kartu di Tangannya
function playCardFromHand(playerNum, cardIndex) {
    if (isActionLocked) return;

    // Cegah pemain membuka kartu lawan di luar gilirannya (baik Privasi ON maupun OFF)
    if (playerNum !== currentTurn) {
        showStatusMessage(`Sekarang adalah giliran Pemain ${currentTurn}! Silakan pilih kartu milik Pemain ${currentTurn}.`, true);
        return;
    }

    const hand = playerNum === 1 ? player1Hand : player2Hand;
    if (cardIndex < 0 || cardIndex >= hand.length) return;

    lockAction(220);
    if (typeof playSfx === 'function') playSfx('flip');

    activePlayedCard = hand.splice(cardIndex, 1)[0];
    const preferredNextTurn = playerNum === 1 ? 2 : 1;
    currentTurn = resolveNextTurn(preferredNextTurn);
    totalCardsPlayed++;

    saveGameState();
    renderUnoTable(false);
}

// Saat Pemain Mengambil Kartu Baru dari Tumpukan Deck (Draw Pile)
function drawCardFromDeck() {
    if (isActionLocked) return;

    if (drawDeck.length === 0) {
        if (player1Hand.length === 0 && player2Hand.length === 0 && totalCardsPlayed > 0) {
            if (typeof openFinishModal === 'function') openFinishModal();
            return;
        }
        showStatusMessage("Tumpukan Deck habis! Silakan mainkan sisa kartu di tangan atau klik 'Kocok Ulang'.", true);
        return;
    }

    const activeHand = currentTurn === 1 ? player1Hand : player2Hand;
    if (activeHand.length >= MAX_HAND_SIZE) {
        showStatusMessage(`Tangan Pemain ${currentTurn} sudah penuh (maksimal ${MAX_HAND_SIZE} kartu). Buka salah satu kartu dulu!`, true);
        return;
    }

    lockAction(200);
    if (typeof playSfx === 'function') playSfx('deal');

    const drawn = drawDeck.shift();
    activeHand.push(drawn);

    saveGameState();
    renderUnoTable(false);
}

// Upload Foto Custom untuk Visual Card (dengan kompresi otomatis agar hemat LocalStorage)
function uploadVisualPhoto(event, visualIndex) {
    const inputEl = event && event.target ? event.target : null;
    const file = inputEl && inputEl.files ? inputEl.files[0] : null;
    if (!file) return;

    const handleImageReady = (dataUrl) => {
        if (typeof saveCustomImage === 'function') {
            saveCustomImage(visualIndex, dataUrl);
        }
        syncVisualCardImage(visualIndex, dataUrl);
        renderUnoTable(false);
        if (typeof playSfx === 'function') playSfx('click');
        if (inputEl) inputEl.value = '';
    };

    if (typeof compressImageFile === 'function') {
        compressImageFile(file)
            .then(handleImageReady)
            .catch((err) => {
                showStatusMessage(err.message || 'Gagal memproses gambar.', true);
                if (inputEl) inputEl.value = '';
            });
    } else {
        const reader = new FileReader();
        reader.onload = (e) => handleImageReady(e.target.result);
        reader.readAsDataURL(file);
    }
}
