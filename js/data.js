/* =====================================================================
   DATA PERMAINAN TALK FOR TWO
   - Instruksi
   - 18 Pertanyaan Umum
   - 18 Pertanyaan Khusus
   - 10 Visual Card (Didukung Upload Foto Custom lewat LocalStorage)
   ===================================================================== */

const DAFTAR_INSTRUKSI = [
    "Siapkan 2 pemain (Pemain 1 dan Pemain 2) untuk bermain bersama.",
    "Kartu akan dikocok otomatis saat permainan dimulai, atau tekan tombol 'Kocok Ulang' kapan saja untuk mengacak ke-46 kartu.",
    "Setiap pemain akan dibagikan 5 kartu awal secara acak seperti permainan kartu UNO.",
    "Pemain secara bergantian sesuai gilirannya memilih 1 kartu dari tangannya untuk dibuka ke tengah meja, atau mengambil kartu baru dari tumpukan Deck.",
    "Jawab pertanyaan pada Pertanyaan Umum (18 kartu), Pertanyaan Khusus (18 kartu), atau ceritakan kenangan pada Visual Card (10 kartu) dengan jujur dan santai!",
    "Tips: Anda dapat mengunggah foto kenangan asli Anda berdua langsung ke dalam Visual Card melalui tombol 'Ganti Foto'!"
];

const PERTANYAAN_UMUM = [
    "Apa first impression kamu waktu pertama kali ngeliat atau kenal aku?",
    "Kapan momen paling bikin kamu ketawa ngakak bareng aku belakangan ini?",
    "Kalau kita punya waktu 24 jam bebas tanpa mikirin kerjaan/kuliah, kamu pengen kita ngapain aja seharian?",
    "Kebiasaan kecil apa dari aku yang menurut kamu lucu atau paling kamu inget?",
    "Lagu atau makanan apa yang kalau kamu denger/liat langsung otomatis inget sama aku?",
    "Apa hal paling random yang pernah kita lakuin bareng tapi ternyata seru banget?",
    "Kalau kamu lagi capek atau bad mood, perlakuan kayak apa yang paling bikin kamu ngerasa nyaman?",
    "Sebutin 3 hal yang paling kamu syukuri minggu ini!",
    "Menurut kamu, persamaan paling unik dan perbedaan paling mencolok di antara kita berdua itu apa?",
    "Tempat makan atau tempat nongkrong mana yang sejauh ini jadi favorit kita berdua?",
    "Kalau kita bisa liburan bareng ke tempat impian mana pun sekarang juga, kamu pilih ke mana?",
    "Apa candaan atau jokes receh di antara kita yang orang lain nggak bakal ngerti?",
    "Hal apa yang dulu kamu kira aneh atau beda dari aku, tapi sekarang kamu malah maklum atau suka?",
    "Siapa di antara kita yang menurut kamu lebih overthinking kalau ada masalah kecil?",
    "Film, series, atau tontonan apa yang paling berkesan waktu kita nonton bareng?",
    "Apa satu kebaikan kecil yang orang lain lakuin ke kamu minggu ini yang bikin hati kamu adem?",
    "Kalau hidup kita dibikin judul buku atau film komedi romantis, judulnya apa ya kira-kira?",
    "Apa impian masa kecil kamu yang sampai sekarang diam-diam masih pengen kamu wujudin?"
];

const PERTANYAAN_KHUSUS = [
    "Kapan momen di mana kamu merasa paling disayang atau dihargai sama aku?",
    "Ada nggak hal yang selama ini pengen kamu ceritain ke aku tapi belum sempat atau nunggu momen yang pas?",
    "Apa hal yang paling kamu banggain dari diri aku belakangan ini?",
    "Waktu kita lagi ada salah paham atau argumen, cara penyelesaian seperti apa yang bikin kamu paling tenang?",
    "Love language apa yang menurut kamu paling kerasa dari aku ke kamu, dan sebaliknya?",
    "Ada nggak ketakutan atau kekhawatiran terbesar kamu tentang masa depan yang pengen kita hadapi bareng-bareng?",
    "Satu hal apa dari hubungan kita yang pengen banget kita jaga dan rawat sampai nanti?",
    "Pernah nggak aku tanpa sengaja bikin kamu sedih atau kepikiran? Ceritain yuk, aku mau dengar.",
    "Apa pelajaran hidup paling berharga yang kamu dapet selama kita saling mengenal?",
    "Kalau kamu lagi ngerasa overwhelmed atau insecure, apa yang bisa aku lakuin buat bantu kamu?",
    "Apa satu kenangan bareng aku yang kalau kamu inget-inget lagi selalu bikin kamu senyum sendiri?",
    "Bagian mana dari caraku memperlakukan kamu yang paling bikin kamu ngerasa aman jadi diri sendiri?",
    "Bagaimana kamu melihat kita berdua dalam 3 sampai 5 tahun ke depan?",
    "Apa hal baru yang pengen banget kita coba atau pelajari bareng di masa depan?",
    "Sebutkan satu sifat atau karakter aku yang paling bikin kamu kagum!",
    "Menurut kamu, apa tantangan terbesar yang pernah kita lewatin bareng dan bikin kita makin kuat?",
    "Di saat kamu lagi ragu sama diri sendiri, kata-kata atau dukungan seperti apa yang paling kamu butuhin dari aku?",
    "Apa pesan atau ungkapan terima kasih yang tulus yang pengen kamu sampaikan ke aku hari ini?"
];

const VISUAL_CARDS = [
    { title: "Visual Card #1 - Our Couple Portrait", defaultImage: "asset/couple.jpeg", caption: "Ceritain apa yang paling kamu suka dari foto ini dan vibe kita berdua di sini!" },
    { title: "Visual Card #2 - First Date Memory", defaultImage: "asset/firstdate.jpeg", caption: "Masih inget nggak deg-degannya pas first date ini? Apa yang kamu rasain waktu itu?" },
    { title: "Visual Card #3 - Ngelukis Date", defaultImage: "asset/ngelukis.jpeg", caption: "Waktu ngelukis bareng ini, bagian mana yang paling seru atau paling bikin berantakan?" },
    { title: "Visual Card #4 - Travelling Journey", defaultImage: "asset/travelling.jpeg", caption: "Momen perjalanan atau liburan ini: kejadian apa yang paling memorable buat kamu?" },
    { title: "Visual Card #5 - Silly Moments", defaultImage: "asset/silly.jpeg", caption: "Momen konyol tanpa jaim! Kenapa kita bisa sesantai dan sekonyol ini ya pas foto ini?" },
    { title: "Visual Card #6 - Fudgybro Sweet Treat", defaultImage: "asset/fudgybro.jpeg", caption: "Ngidam manis bareng! Dessert atau makanan apa lagi yang wajib kita explore bareng?" },
    { title: "Visual Card #7 - KIMMY Special Moment", defaultImage: "asset/KIMMY.jpeg", caption: "Momen spesial bareng Kimmy! Apa cerita lucu atau menggemaskan di balik foto ini?" },
    { title: "Visual Card #8 - Tetraaa Vibe", defaultImage: "asset/tetraaa.jpeg", caption: "Kapan pun momen ini diambil, suasana seperti apa yang paling kamu kangenin dari hari itu?" },
    { title: "Visual Card #9 - Momen Aneh & Random", defaultImage: "asset/aneh.jpeg", caption: "Foto paling random! Menurut kamu siapa yang idenya paling aneh di antara kita berdua?" },
    { title: "Visual Card #10 - UPN x UNDIP Chapter", defaultImage: "asset/UPNxUNDIP.jpeg", caption: "Perjalanan kampus & perjuangan kita masing-masing. Apa yang paling kamu apresiasi dari perjuangan ini?" }
];

// Fallback penyimpanan di memori jika localStorage penuh atau diblokir browser
const memoryCustomImages = {};

// Helper: Escape karakter khusus XML/HTML agar aman di dalam SVG/atribut
function escapeXml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Helper: Buat placeholder SVG pastel jika file foto di folder asset/ belum tersedia
function getFallbackSvg(title = 'Visual Card') {
    const parts = String(title).split(' - ');
    const badgeText = escapeXml(parts[0] || 'Visual Card');
    const subText = escapeXml(parts[1] || 'Kenangan Manis Berdua');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" width="400" height="260">
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFE4EC"/>
                <stop offset="50%" stop-color="#F8EFFB"/>
                <stop offset="100%" stop-color="#FFD6E4"/>
            </linearGradient>
        </defs>
        <rect width="400" height="260" rx="18" fill="url(#bg)"/>
        <rect x="12" y="12" width="376" height="236" rx="14" fill="none" stroke="#F48FB1" stroke-width="2.5" stroke-dasharray="7 5"/>
        <circle cx="200" cy="95" r="36" fill="#FFF8FA" stroke="#E06D94" stroke-width="2.5"/>
        <path d="M200 112 C200 112 178 97 178 84 C178 76 185 71 192 71 C196 71 199 73 200 76 C201 73 204 71 208 71 C215 71 222 76 222 84 C222 97 200 112 200 112 Z" fill="#F48FB1"/>
        <text x="200" y="162" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="15" font-weight="700" fill="#D85A88">${badgeText}</text>
        <text x="200" y="186" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13" font-weight="600" fill="#5A3E5C">${subText}</text>
        <text x="200" y="216" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="11" fill="#8E6D94">Klik "Ganti Foto" untuk unggah foto asli</text>
    </svg>`;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Helper: Ambil data foto custom dari localStorage + memory fallback
function getCustomImages() {
    try {
        const stored = localStorage.getItem('TALK_CUSTOM_IMAGES');
        const parsed = stored ? JSON.parse(stored) : {};
        return { ...parsed, ...memoryCustomImages };
    } catch (e) {
        return { ...memoryCustomImages };
    }
}

// Helper: Dapatkan URL gambar visual card aktif dengan pengecekan batas index
function getVisualCardImage(index) {
    const customMap = getCustomImages();
    if (customMap && customMap[index]) {
        return customMap[index];
    }
    if (Array.isArray(VISUAL_CARDS) && VISUAL_CARDS[index] && VISUAL_CARDS[index].defaultImage) {
        return VISUAL_CARDS[index].defaultImage;
    }
    return getFallbackSvg('Visual Card');
}

// Helper: Simpan foto custom baru (dengan fallback memori jika localStorage penuh)
function saveCustomImage(index, dataUrl) {
    if (index === undefined || index === null || !dataUrl) return false;
    memoryCustomImages[index] = dataUrl;
    try {
        const stored = localStorage.getItem('TALK_CUSTOM_IMAGES');
        const customMap = stored ? JSON.parse(stored) : {};
        customMap[index] = dataUrl;
        localStorage.setItem('TALK_CUSTOM_IMAGES', JSON.stringify(customMap));
        return true;
    } catch (e) {
        console.warn('LocalStorage limit exceeded, using in-memory image fallback:', e);
        return false;
    }
}

// Helper: Kompres & resize gambar sebelum disimpan agar tidak melebihi kuota LocalStorage (5MB)
function compressImageFile(file, maxDimension = 800, quality = 0.78) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type || !file.type.startsWith('image/')) {
            reject(new Error('File bukan gambar yang valid.'));
            return;
        }
        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
        reader.onload = (e) => {
            const img = new Image();
            img.onerror = () => reject(new Error('Format gambar tidak didukung.'));
            img.onload = () => {
                try {
                    let { width, height } = img;
                    if (width > maxDimension || height > maxDimension) {
                        if (width >= height) {
                            height = Math.round((height * maxDimension) / width);
                            width = maxDimension;
                        } else {
                            width = Math.round((width * maxDimension) / height);
                            height = maxDimension;
                        }
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedDataUrl);
                } catch (err) {
                    // Fallback ke hasil asli jika canvas gagal
                    resolve(e.target.result);
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}
