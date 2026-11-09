/* =====================================================================
   DATA VISUALISASI KARTU TALK FOR TWO
   - Panduan Penggunaan & Spesifikasi Kartu (Total 50 Kartu)
   - Generator SVG Desain Kartu Presisi Sesuai Spesifikasi:
     1. Sampul Belakang Kartu (Holografik Pastel + 2 Beruang + Tipografi)
     2. Pertanyaan Khusus (Kartu Pink - 18 Kartu - Bingkai Marmer Pink, Tengah Pink, Bunga Biru)
     3. Pertanyaan Umum (Kartu Biru - 18 Kartu - Bingkai Marmer Biru, Tengah Biru, Bunga Pink)
     4. Visual Card & Action Card (14 Kartu - Total 50 Kartu):
        - 10 Kartu Visual: Pasangan, Pertemanan, Keluarga, Karier, Anak (Masing-masing 2 kartu / 5 tema)
        - 4 Kartu Aksi: 2 PASS Cards & 2 NEED TO DISCUSS Cards
   ===================================================================== */

const DAFTAR_INSTRUKSI = [
    {
        step: "1. Persiapkan Kartu (Total 50 Kartu)",
        points: [
            "Satu paket permainan terdiri dari 36 Question Cards (18 Kartu Biru UMUM & 18 Kartu Pink KHUSUS), 10 Visual Cards, 2 Pass Cards, dan 2 Discuss Cards (Total 50 kartu).",
            "Setiap pemain mendapatkan 5 Visual Cards, 1 Pass Card, dan 1 Discuss Card."
        ]
    },
    {
        step: "2. Mulai Permainan",
        points: [
            "Letakkan seluruh Question Cards di hadapan kalian dengan posisi tertutup.",
            "Ambil kartu pertanyaan secara bergantian dan bacakan dengan lantang."
        ]
    },
    {
        step: "3. Jawab Pertanyaan",
        points: [
            "Jawab pertanyaan sesuai dengan topik yang tertera pada kartu.",
            "Khusus untuk Question Cards berwarna pink (KHUSUS), gunakan Visual Cards untuk membantu menjawab pertanyaan melalui pemilihan atau pengurutan prioritas."
        ]
    },
    {
        step: "4. Discuss or Pass?",
        points: [
            "Gunakan Discuss Card apabila kalian ingin mendiskusikan topik tersebut lebih lanjut.",
            "Gunakan Pass Card apabila kalian memilih untuk melewati pertanyaan dan melanjutkan ke kartu berikutnya."
        ]
    },
    {
        step: "5. Enjoy the Conversation!",
        points: [
            "Berikan kesempatan satu sama lain untuk menyampaikan pendapat dan perspektif.",
            "Dengarkan tanpa menghakimi. Tidak ada jawaban benar atau salah dalam permainan ini.",
            "Nikmati proses mengenal satu sama lain lebih dalam!"
        ]
    }
];

// Daftar Tipe Desain Kartu untuk Showcase Visualisasi
const CARD_VISUAL_TYPES = [
    {
        id: 'khusus',
        category: 'khusus',
        title: 'Kartu Pertanyaan Khusus',
        subtitle: '18 Kartu • Kartu Pink Floral Biru',
        countLabel: '18 Kartu',
        badgeBg: '#FFE0EC',
        badgeText: '#C94A7C',
        borderColor: '#F48FB1',
        description: 'Kartu Pink untuk pertanyaan Khusus/Deep Talk dengan bingkai marmer lembut, area tengah merah muda pastel, logo 2 beruang di bagian bawah, dan aksen bunga biru di sudut kanan bawah.',
        svgType: 'khusus-front'
    },
    {
        id: 'umum',
        category: 'umum',
        title: 'Kartu Pertanyaan Umum',
        subtitle: '18 Kartu • Kartu Biru Floral Pink',
        countLabel: '18 Kartu',
        badgeBg: '#DCEBFA',
        badgeText: '#3A6B9C',
        borderColor: '#90CAF9',
        description: 'Kartu Biru untuk pertanyaan Umum dengan bingkai marmer sejuk, area tengah biru langit pastel, logo 2 beruang di bagian bawah, dan aksen bunga merah muda di sudut kanan bawah.',
        svgType: 'umum-front'
    },
    {
        id: 'visual-pasangan',
        category: 'visual',
        title: 'Visual Card — Pasangan',
        subtitle: 'Tema Obrolan Pasangan',
        countLabel: 'Visual Card',
        badgeBg: '#FCE4EC',
        badgeText: '#D85A88',
        borderColor: '#F48FB1',
        description: 'Visual Card — Pasangan',
        svgType: 'visual-pasangan'
    },
    {
        id: 'visual-pertemanan',
        category: 'visual',
        title: 'Visual Card — Pertemanan',
        subtitle: 'Tema Lingkar Pertemanan',
        countLabel: 'Visual Card',
        badgeBg: '#FFF3E0',
        badgeText: '#D86C50',
        borderColor: '#FFAB91',
        description: 'Visual Card — Pertemanan',
        svgType: 'visual-pertemanan'
    },
    {
        id: 'visual-keluarga',
        category: 'visual',
        title: 'Visual Card — Keluarga',
        subtitle: 'Tema Kehangatan Keluarga',
        countLabel: 'Visual Card',
        badgeBg: '#EFE5F7',
        badgeText: '#6E4F8E',
        borderColor: '#CE93D8',
        description: 'Visual Card — Keluarga',
        svgType: 'visual-keluarga'
    },
    {
        id: 'visual-karier',
        category: 'visual',
        title: 'Visual Card — Karier',
        subtitle: 'Tema Impian & Pekerjaan',
        countLabel: 'Visual Card',
        badgeBg: '#E8EAF6',
        badgeText: '#49599A',
        borderColor: '#9FA8DA',
        description: 'Visual Card — Karier',
        svgType: 'visual-karier'
    },
    {
        id: 'visual-anak',
        category: 'visual',
        title: 'Visual Card — Anak',
        subtitle: 'Tema Masa Depan & Anak',
        countLabel: 'Visual Card',
        badgeBg: '#E3F2FD',
        badgeText: '#3A6B9C',
        borderColor: '#90CAF9',
        description: 'Visual Card — Anak',
        svgType: 'visual-anak'
    },
    {
        id: 'action-pass',
        category: 'visual',
        title: 'Action Card — PASS',
        subtitle: 'Kartu Lewati Pertanyaan',
        countLabel: 'Action Card',
        badgeBg: '#FCE4EC',
        badgeText: '#D85A88',
        borderColor: '#CE93D8',
        description: 'Action Card — PASS',
        svgType: 'action-pass'
    },
    {
        id: 'action-discuss',
        category: 'visual',
        title: 'Action Card — NEED TO DISCUSS',
        subtitle: 'Kartu Diskusi Mendalam',
        countLabel: 'Action Card',
        badgeBg: '#E1F5FE',
        badgeText: '#0277BD',
        borderColor: '#F48FB1',
        description: 'Action Card — NEED TO DISCUSS',
        svgType: 'action-discuss'
    },
    {
        id: 'card-back',
        category: 'back',
        title: 'Sampul Belakang Kartu (Card Back)',
        subtitle: 'Desain Seragam Semua Kartu',
        countLabel: '50 Kartu',
        badgeBg: '#EFE5F7',
        badgeText: '#6A4C82',
        borderColor: '#CE93D8',
        description: 'Desain bagian belakang seluruh 50 kartu TALK for Two dengan gradasi holografik pastel dan logo 2 beruang berpelukan.',
        svgType: 'card-back'
    }
];

// Path Vektor Asli 2 Beruang Berpelukan (diambil dari asset/logo-beruang.svg)
const BEARS_GROUP_PATHS = `
    <path d="M 294.4 184.8 C 293.6 188.2 291.5 190.6 288.1 191.9 C 276.9 196.3 270.9 191.2 265.1 186.3 C 264.6 185.8 264 185.4 263.5 185 C 257.2 179.9 244.9 150.4 244.7 150.1 L 243.7 147.6 L 244.6 174.5 C 244.6 175.5 244.6 176.5 244.6 177.4 L 245.6 179.3 C 247.2 182.4 250.2 189.5 247.7 196.1 C 245.9 201 241.5 204.7 234.5 207.1 C 234.8 206.8 235.2 206.5 235.5 206.3 L 234.5 207.1 L 232.9 207.1 C 232.9 207.1 232.9 207.1 232.8 207.2 C 232.5 207.5 232.1 207.8 231.8 208 C 225.9 213 217.9 214.2 205.5 215.8 C 198.8 216.6 192.7 216.2 187.8 215.4 L 181 214 C 180.4 213.9 179.9 213.8 179.4 213.7 C 179.3 213.7 179.1 213.6 179 213.6 C 178.8 213.6 178.7 213.5 178.5 213.5 L 176.1 213 C 175.1 212.9 174.1 212.7 173 212.6 C 170.1 212.3 166.8 212 162.7 210.7 C 156.6 208.9 145.3 197.5 144.3 196.5 L 141.3 196.9 L 133.2 191.3 L 147.3 131.6 L 165.4 108.2 L 153.8 87.7 C 153.8 87.7 153.7 87.7 153.7 87.7 L 153.7 87.7 C 152.9 86.4 152.3 85.2 151.6 83.9 L 151.6 83.9 L 151.6 83.9 C 149.1 78.6 147.6 73 146.8 68.5 L 146 69 L 133.2 32.4 L 140.3 15.6 L 141.3 16.2 C 141.3 15.9 141.3 15.6 141.3 15.5 C 144.7 6.5 152.9 -1.9 161.5 0.3 C 169.5 2.3 168.4 9.2 168.3 9.5 L 168.3 9.6 L 169.4 9.9 C 172.6 9.3 191.8 5.8 201.4 6.7 C 211.7 7.7 221.8 10.7 228.6 14.8 C 229.5 15.3 230.3 16 231.2 16.7 L 231.2 16.7 L 232.5 16.6 C 232.5 16.6 232.4 16.5 232.4 16.5 C 235.5 15.8 245.7 13.6 249 14.6 C 253.2 15.8 260.5 21.7 263 30.5 C 265.1 37.9 263.4 45.7 261.7 48.6 C 261.1 49.6 260.7 49.8 260.5 49.8 C 260.1 49.9 259.7 50 259.3 50.1 C 257 50.7 254.2 51.4 250.6 50.1 C 250.6 50.1 250.5 50 250.5 50 L 250.1 51.8 C 250.7 56 251.5 66.3 248.4 77.2 C 246.4 84.2 239.2 90.2 234 94.5 C 231.9 96.2 230.3 97.6 229.4 98.7 C 228.1 100.2 227.9 101.9 228.6 103.5 C 229.8 106 233.1 107.6 237.1 107.6 C 242.1 107.6 248.9 114.2 252.6 117.7 C 253.5 118.5 254.1 119.2 254.6 119.6 C 257.5 122.1 269.3 134.8 270.6 138.5 C 272 142.4 285.9 161 286.5 161.9 C 291.6 167.7 296.1 177.8 294.4 184.8 Z" fill="#E1A0C9"/>
    <path d="M 209.6 110.6 C 208.1 114.6 205.4 117.8 204.4 118.2 C 201.3 119.3 177.8 126.9 169.1 125.2 C 166.6 124.7 162.9 124.6 158.9 124.7 L 157.5 125.8 C 157.6 125.8 157.6 125.8 157.7 125.8 C 155.5 128.6 148.7 138.1 147.6 148.2 C 147.3 151.1 147 154 146.7 156.9 C 146.7 157.2 146.6 157.6 146.6 157.9 C 146.6 157.9 146.6 157.9 146.6 157.9 L 146.5 159.1 C 146.5 159.1 146.5 159.1 146.5 159.1 C 146.3 160.8 146.2 162.6 146 164.2 L 146 164.3 L 146 164.4 C 145.8 165.9 145.7 167.3 145.5 168.6 L 145.3 170.2 C 145.3 170.2 145.3 170.2 145.3 170.2 C 145.2 170.8 145.1 171.4 145 172 L 145 172.1 L 145 172.1 C 144.6 174.7 144.1 176.7 143.5 177.8 C 141.6 181.2 139.9 192.7 143.1 196.8 C 138.4 199.9 132.1 202.7 132.1 202.7 L 132 202.8 C 128 206.5 121.7 211.6 113 213.7 C 106.3 215.3 90.8 214.6 86 214.3 L 84.1 214.3 C 68.2 218.1 66.4 213.1 66.4 213 L 66.3 212.7 L 66.3 212.7 C 66.3 212.7 66.3 212.7 66.3 212.6 L 65.2 212.5 C 65.2 212.5 65.2 212.5 65.2 212.5 C 65.1 212.5 64.9 212.4 64.8 212.4 L 64.7 212.4 L 64.7 212.4 C 55.5 210.8 48.7 205.5 48.6 205.4 C 38.2 196.3 38.3 180.3 38.5 176.2 L 37.6 175 C 36.6 175.9 31.2 180.3 29.1 181.1 C 26.8 182 12.4 185.1 4.5 178.8 C -3.5 172.4 0.8 158.5 5.9 147.9 C 9.5 140.4 13.4 136.6 18.7 131.5 C 21.1 129.2 23.8 126.6 26.8 123.2 C 36.3 112.8 52.7 101.4 53.2 101 L 53.1 99.9 C 53.1 99.9 53 100 52.9 100 C 51.6 99.4 44.2 95.6 37.7 87.6 C 30.6 78.8 28.3 67.6 28.2 67.5 L 28.1 67.2 L 28 67.2 C 24.1 66.1 21.8 61 21.2 58.7 C 21 57.8 20.4 56.8 19.6 55.6 C 18.1 53.3 16 50 15.7 45.1 C 15.4 39.9 19.8 37.1 23.6 34.6 C 25.1 33.7 26.4 32.8 27.4 31.8 C 31.1 28.3 36.1 25.7 37.2 25.7 C 37.7 25.7 38.9 26 40.1 26.3 C 43 27.1 44.9 27.5 45.6 27 C 45.9 26.8 47 27.5 47.8 28.3 L 48.4 29.2 C 48.7 28.8 48.9 28.4 49.2 28.1 C 58.9 14.6 76.6 12.1 84.2 11.1 C 85 11 85.8 10.9 86.3 10.8 C 89.2 10.3 92.6 11.6 95.8 12.9 C 99.1 14.2 102.2 15.3 105 14.9 C 110.1 14.2 115 15.8 115.3 15.8 C 115.3 15.8 115.5 15.9 115.6 16 L 116 15.1 C 116 15.1 115.9 15.1 115.9 15.1 C 115.5 12.3 117.1 10.6 117.2 10.4 C 119.3 7.4 121.8 5.8 124.7 5.8 C 131.8 5.6 139.3 14.4 140.3 15.6 C 140.2 16.9 140 23.3 140.1 30.8 L 140.3 36.9 C 140.6 43.2 141.3 49.4 142.7 53.6 C 143.8 56.9 144.4 58.8 144.8 59.9 C 144.9 61 145.1 64.5 145.9 69 C 143.5 71.4 136.9 84.8 135.2 88.3 L 135.5 89.5 C 135.5 89.5 135.5 89.5 135.5 89.5 L 135.7 89.6 C 135.7 89.6 135.7 89.5 135.8 89.5 C 136.2 89.5 136.6 89.4 137 89.4 C 139 89.4 140.5 89.8 140.7 89.8 L 140.8 89.8 L 146.5 89.8 C 146.6 89.8 153.3 88.5 157.9 88.5 C 159.5 88.5 161.5 88.9 163.7 89.4 C 167.5 90.2 171.7 91.1 175 89.8 C 179.5 87.9 185.4 88.5 186.1 88.5 C 193.2 91.6 204.4 94.2 206.4 94.7 C 206.8 95.6 207.7 97.1 209.2 100 C 211.4 103.7 210.6 107.9 209.6 110.6 Z" fill="#282467"/>
`;

// Helper: Escape karakter khusus XML/HTML
function escapeXml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Helper: Ilustrasi Bunga Sudut Kanan Bawah (untuk Kartu Umum & Khusus sesuai PDF)
function renderCornerFlowerSVG(colorTheme = 'blue') {
    const isBlue = colorTheme === 'blue';
    const petalMain = isBlue ? '#B8DCFA' : '#FAD0DF';
    const petalMid = isBlue ? '#82B9F0' : '#F49AB8';
    const petalVein = isBlue ? '#4B89CE' : '#D95B88';
    const centerColor = isBlue ? '#FFF3B0' : '#FFE082';
    const budColor = isBlue ? '#7FB5EC' : '#F08CAE';

    return `
        <g transform="translate(182, 224)">
            <!-- Batang Utama & Cabang -->
            <path d="M 28 156 C 28 128, 34 95, 29 54" stroke="#687D42" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            <path d="M 30 132 C 37 118, 45 104, 48 88" stroke="#687D42" stroke-width="2.2" fill="none" stroke-linecap="round"/>
            <path d="M 29 144 C 21 130, 17 118, 16 106" stroke="#687D42" stroke-width="2" fill="none" stroke-linecap="round"/>

            <!-- Daun-daun Ramping -->
            <path d="M 29 138 C 19 126, 15 114, 17 104 C 22 114, 26 125, 29 138 Z" fill="#7D9450"/>
            <path d="M 30 124 C 39 112, 44 102, 46 92 C 38 100, 33 112, 30 124 Z" fill="#5D7336"/>
            <path d="M 31 102 C 38 94, 42 86, 42 78 C 36 84, 33 92, 31 102 Z" fill="#7D9450"/>

            <!-- Kuncup Bunga Kecil di Kanan -->
            <g transform="translate(47, 85) rotate(22)">
                <ellipse cx="0" cy="-5" rx="4.2" ry="7.5" fill="${budColor}" stroke="#5D7336" stroke-width="1"/>
                <path d="M -3 0 Q 0 4 3 0 L 0 6 Z" fill="#5D7336"/>
            </g>

            <!-- Kelopak Bunga Mekar (5 Kelopak dengan Gurat Halus) -->
            <g transform="translate(27, 48)">
                <!-- Kelopak Atas -->
                <path d="M 0 0 C -14 -14, -18 -34, 0 -38 C 18 -34, 14 -14, 0 0 Z" fill="${petalMain}" stroke="${petalMid}" stroke-width="1"/>
                <path d="M 0 -4 L 0 -30 M 0 -10 L -6 -24 M 0 -10 L 6 -24" stroke="${petalVein}" stroke-width="0.9" opacity="0.65" stroke-linecap="round"/>

                <!-- Kelopak Kanan Atas -->
                <g transform="rotate(72)">
                    <path d="M 0 0 C -14 -14, -18 -34, 0 -38 C 18 -34, 14 -14, 0 0 Z" fill="${petalMain}" stroke="${petalMid}" stroke-width="1"/>
                    <path d="M 0 -4 L 0 -30 M 0 -10 L -6 -24 M 0 -10 L 6 -24" stroke="${petalVein}" stroke-width="0.9" opacity="0.65" stroke-linecap="round"/>
                </g>

                <!-- Kelopak Kanan Bawah -->
                <g transform="rotate(144)">
                    <path d="M 0 0 C -14 -14, -18 -34, 0 -38 C 18 -34, 14 -14, 0 0 Z" fill="${petalMain}" stroke="${petalMid}" stroke-width="1"/>
                    <path d="M 0 -4 L 0 -30 M 0 -10 L -6 -24 M 0 -10 L 6 -24" stroke="${petalVein}" stroke-width="0.9" opacity="0.65" stroke-linecap="round"/>
                </g>

                <!-- Kelopak Kiri Bawah -->
                <g transform="rotate(216)">
                    <path d="M 0 0 C -14 -14, -18 -34, 0 -38 C 18 -34, 14 -14, 0 0 Z" fill="${petalMain}" stroke="${petalMid}" stroke-width="1"/>
                    <path d="M 0 -4 L 0 -30 M 0 -10 L -6 -24 M 0 -10 L 6 -24" stroke="${petalVein}" stroke-width="0.9" opacity="0.65" stroke-linecap="round"/>
                </g>

                <!-- Kelopak Kiri Atas -->
                <g transform="rotate(288)">
                    <path d="M 0 0 C -14 -14, -18 -34, 0 -38 C 18 -34, 14 -14, 0 0 Z" fill="${petalMain}" stroke="${petalMid}" stroke-width="1"/>
                    <path d="M 0 -4 L 0 -30 M 0 -10 L -6 -24 M 0 -10 L 6 -24" stroke="${petalVein}" stroke-width="0.9" opacity="0.65" stroke-linecap="round"/>
                </g>

                <!-- Putik Tengah Bunga -->
                <circle cx="0" cy="0" r="6.5" fill="${centerColor}" stroke="${petalVein}" stroke-width="1"/>
                <circle cx="-2.5" cy="-2" r="1.2" fill="#D97706"/>
                <circle cx="2.5" cy="-2" r="1.2" fill="#D97706"/>
                <circle cx="0" cy="2.8" r="1.2" fill="#D97706"/>
            </g>
        </g>
    `;
}

// Generator Utama: Menghasilkan SVG Kartu sesuai tipe dari PDF Referensi
// Seluruh kartu memiliki viewBox standar 260 x 380 (proporsi kartu potret)
function generateCardSVG(svgType) {
    switch (svgType) {
        // =================================================================
        // 1. SAMPUL BELAKANG KARTU (COMING.pdf)
        // =================================================================
        case 'card-back':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <defs>
                    <linearGradient id="holoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#FDF8E8"/>
                        <stop offset="32%" stop-color="#DCEBFA"/>
                        <stop offset="68%" stop-color="#E8DFF7"/>
                        <stop offset="100%" stop-color="#FCE2EC"/>
                    </linearGradient>
                    <radialGradient id="holoGlow1" cx="85%" cy="18%" r="55%">
                        <stop offset="0%" stop-color="#C9E2FF" stop-opacity="0.75"/>
                        <stop offset="100%" stop-color="#C9E2FF" stop-opacity="0"/>
                    </radialGradient>
                    <radialGradient id="holoGlow2" cx="20%" cy="85%" r="55%">
                        <stop offset="0%" stop-color="#D9E8FF" stop-opacity="0.7"/>
                        <stop offset="100%" stop-color="#D9E8FF" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <rect width="260" height="380" rx="16" fill="url(#holoBg)"/>
                <rect width="260" height="380" rx="16" fill="url(#holoGlow1)"/>
                <rect width="260" height="380" rx="16" fill="url(#holoGlow2)"/>
                <rect x="1.5" y="1.5" width="257" height="377" rx="14.5" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.7"/>

                <!-- Logo 2 Beruang di Tengah -->
                <g transform="translate(88, 134) scale(0.28)">
                    ${BEARS_GROUP_PATHS}
                </g>

                <!-- Tipografi Talk For Two persis di bawah/depan beruang -->
                <text x="72" y="216" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="33" fill="#4E5B94" letter-spacing="-1" opacity="0.88">Talk</text>
                <text x="128" y="214" text-anchor="middle" font-family="'Caveat', cursive" font-weight="700" font-size="30" font-style="italic" fill="#9E3B5A">For</text>
                <text x="190" y="216" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="33" fill="#D687A8" letter-spacing="-1">Two</text>
            </svg>`;

        // =================================================================
        // 2. KARTU PERTANYAAN KHUSUS - KARTU PINK & BUNGA BIRU
        // =================================================================
        case 'khusus-front':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <!-- Latar Bingkai Putih Marmer Hangat -->
                <rect width="260" height="380" rx="14" fill="#FCF9FA"/>
                <!-- Bercak Halus Marmer Emas/Krem pada Bingkai -->
                <circle cx="72" cy="18" r="24" fill="#FDF0D5" opacity="0.55"/>
                <circle cx="235" cy="95" r="18" fill="#FDF0D5" opacity="0.45"/>
                <circle cx="18" cy="275" r="20" fill="#FDF0D5" opacity="0.45"/>
                <path d="M 120 0 Q 135 20 115 35" stroke="#EFE4DC" stroke-width="2" fill="none" opacity="0.7"/>
                <path d="M 110 350 Q 125 365 118 380" stroke="#EFE4DC" stroke-width="2.5" fill="none" opacity="0.7"/>

                <!-- Area Tengah Pink Pastel -->
                <rect x="20" y="26" width="220" height="328" rx="22" fill="#FDE4EC"/>

                <!-- Petunjuk Area Teks Pertanyaan (Halus) -->
                <g opacity="0.48">
                    <text x="130" y="158" text-anchor="middle" font-family="'Quicksand', sans-serif" font-weight="700" font-size="11" fill="#C95A82" letter-spacing="1.5">PERTANYAAN KHUSUS</text>
                    <line x1="85" y1="172" x2="175" y2="172" stroke="#E899B5" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 4"/>
                    <text x="130" y="190" text-anchor="middle" font-family="'Quicksand', sans-serif" font-weight="600" font-size="9.5" fill="#B86B88">(Area Cetak Teks Deep Talk)</text>
                </g>

                <!-- Logo 2 Beruang di Tengah Bawah -->
                <g transform="translate(107, 314) scale(0.155)">
                    ${BEARS_GROUP_PATHS}
                </g>

                <!-- Ilustrasi Bunga Biru di Kanan Bawah -->
                ${renderCornerFlowerSVG('blue')}
            </svg>`;

        // =================================================================
        // 3. KARTU PERTANYAAN UMUM - KARTU BIRU & BUNGA PINK
        // =================================================================
        case 'umum-front':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <!-- Latar Bingkai Putih Marmer Sejuk -->
                <rect width="260" height="380" rx="14" fill="#F7FAFC"/>
                <!-- Guratan Halus Marmer Biru/Abu pada Bingkai -->
                <path d="M 30 0 C 55 18, 95 8, 125 26" stroke="#DCE6EE" stroke-width="4" fill="none" opacity="0.65"/>
                <path d="M 190 0 C 210 15, 235 20, 260 40" stroke="#DCE6EE" stroke-width="3" fill="none" opacity="0.6"/>
                <path d="M 0 240 C 18 260, 12 295, 25 320" stroke="#DCE6EE" stroke-width="3.5" fill="none" opacity="0.65"/>
                <path d="M 85 354 C 115 366, 155 360, 185 380" stroke="#DCE6EE" stroke-width="4" fill="none" opacity="0.65"/>

                <!-- Area Tengah Biru Langit Pastel -->
                <rect x="20" y="26" width="220" height="328" rx="22" fill="#BDD7EE"/>

                <!-- Petunjuk Area Teks Pertanyaan (Halus) -->
                <g opacity="0.48">
                    <text x="130" y="158" text-anchor="middle" font-family="'Quicksand', sans-serif" font-weight="700" font-size="11" fill="#365F8A" letter-spacing="1.5">PERTANYAAN UMUM</text>
                    <line x1="85" y1="172" x2="175" y2="172" stroke="#6897C4" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 4"/>
                    <text x="130" y="190" text-anchor="middle" font-family="'Quicksand', sans-serif" font-weight="600" font-size="9.5" fill="#466E96">(Area Cetak Teks Pertanyaan)</text>
                </g>

                <!-- Logo 2 Beruang di Tengah Bawah -->
                <g transform="translate(107, 314) scale(0.155)">
                    ${BEARS_GROUP_PATHS}
                </g>

                <!-- Ilustrasi Bunga Pink di Kanan Bawah -->
                ${renderCornerFlowerSVG('pink')}
            </svg>`;

        // =================================================================
        // 4. KARTU AKSI: PASS (COMING (3).pdf - Kiri)
        // =================================================================
        case 'action-pass':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <rect width="260" height="380" rx="14" fill="#DDD6F0"/>
                <rect x="11" y="11" width="238" height="358" rx="10" fill="#F9E3EC"/>

                <!-- Tulisan PASS Besar di Tengah -->
                <g transform="translate(130, 198) rotate(-3)">
                    <text x="0" y="0" text-anchor="middle" font-family="'Fredoka', 'Quicksand', sans-serif" font-weight="700" font-size="60" fill="#DF6096" letter-spacing="3">PASS</text>
                </g>

                <!-- Logo 2 Beruang di Tengah Bawah -->
                <g transform="translate(108, 316) scale(0.145)">
                    ${BEARS_GROUP_PATHS}
                </g>
            </svg>`;

        // =================================================================
        // 5. KARTU AKSI: NEED TO DISCUSS (COMING (3).pdf - Kanan)
        // =================================================================
        case 'action-discuss':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <rect width="260" height="380" rx="14" fill="#F8DDE6"/>
                <rect x="11" y="11" width="238" height="358" rx="10" fill="#F6EFEA"/>

                <!-- Tulisan NEED TO DISCUSS 3 Baris -->
                <g transform="translate(130, 152)">
                    <text x="0" y="0" text-anchor="middle" font-family="'Fredoka', 'Quicksand', sans-serif" font-weight="700" font-size="36" fill="#42A5E6" letter-spacing="1.5">NEED</text>
                    <text x="0" y="38" text-anchor="middle" font-family="'Fredoka', 'Quicksand', sans-serif" font-weight="700" font-size="36" fill="#42A5E6" letter-spacing="1.5">TO</text>
                    <text x="0" y="76" text-anchor="middle" font-family="'Fredoka', 'Quicksand', sans-serif" font-weight="700" font-size="35" fill="#42A5E6" letter-spacing="1">DISCUSS</text>
                </g>

                <!-- Logo 2 Beruang di Tengah Bawah -->
                <g transform="translate(108, 316) scale(0.145)">
                    ${BEARS_GROUP_PATHS}
                </g>
            </svg>`;

        // =================================================================
        // 6. VISUAL CARD #1: PASANGAN (isi yg tengah kartu.pdf)
        // =================================================================
        case 'visual-pasangan':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <rect width="260" height="380" rx="16" fill="#FAD4E4"/>
                <rect x="11" y="11" width="238" height="358" rx="12" fill="#F4ECE9"/>

                <!-- Ikon Hati Tersenyum di Kiri Atas -->
                <g transform="translate(36, 44) rotate(-14)">
                    <path d="M 0 12 C 0 -6, -24 -6, -24 10 C -24 24, 0 36, 0 42 C 0 36, 24 24, 24 10 C 24 -6, 0 -6, 0 12 Z" fill="#F6A6C1" stroke="#3A2E39" stroke-width="2"/>
                    <ellipse cx="-6" cy="14" rx="2" ry="3.2" fill="#3A2E39"/>
                    <ellipse cx="6" cy="14" rx="2" ry="3.2" fill="#3A2E39"/>
                    <path d="M -5 21 Q 0 25 5 21" stroke="#3A2E39" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                </g>

                <!-- Judul PASANGAN -->
                <text x="134" y="64" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="18" fill="#D96B90" letter-spacing="1">PASANGAN</text>

                <!-- Ilustrasi Pasangan Duduk Bersila & Mengobrol -->
                <g transform="translate(46, 118)">
                    <!-- Bayangan Lantai -->
                    <ellipse cx="84" cy="128" rx="74" ry="8" fill="#E5DAD6"/>

                    <!-- Pria (Kiri - Kaos Kuning Pastel & Celana Biru) -->
                    <g transform="translate(8, 0)">
                        <!-- Kaki Bersila -->
                        <path d="M 14 96 Q 2 108 18 118 L 58 116 Q 68 108 52 96 Z" fill="#8CC0DE" stroke="#3A2E39" stroke-width="1.6"/>
                        <ellipse cx="14" cy="116" rx="8" ry="4.5" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.4"/>
                        <ellipse cx="58" cy="118" rx="8" ry="4.5" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.4"/>
                        <!-- Badan / Kaos -->
                        <path d="M 20 46 Q 38 42 54 46 L 60 98 L 14 98 Z" fill="#F9F1A5" stroke="#3A2E39" stroke-width="1.6"/>
                        <!-- Leher & Kepala -->
                        <rect x="33" y="34" width="10" height="14" fill="#F3C6B6"/>
                        <circle cx="39" cy="24" r="13" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.6"/>
                        <!-- Rambut Coklat -->
                        <path d="M 26 22 C 25 10, 42 6, 52 14 C 54 18, 52 24, 49 22 C 44 16, 32 16, 28 24 Z" fill="#5C3A28" stroke="#3A2E39" stroke-width="1.4"/>
                        <!-- Wajah Tersenyum -->
                        <circle cx="43" cy="22" r="1.4" fill="#3A2E39"/>
                        <path d="M 39 28 Q 43 31 46 28" stroke="#3A2E39" stroke-width="1.4" fill="none" stroke-linecap="round"/>
                        <!-- Tangan Memegang Burger/Snack -->
                        <path d="M 20 52 Q 10 72 28 74" stroke="#F3C6B6" stroke-width="6" fill="none" stroke-linecap="round"/>
                        <circle cx="34" cy="72" r="6" fill="#E6A15C" stroke="#3A2E39" stroke-width="1.3"/>
                    </g>

                    <!-- Wanita (Kanan - Sweater Coklat & Rok/Celana Gelap) -->
                    <g transform="translate(82, 4)">
                        <!-- Kaki Bersila -->
                        <path d="M 10 92 Q -2 104 14 114 L 54 112 Q 66 104 48 92 Z" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.6"/>
                        <rect x="16" y="88" width="34" height="18" rx="6" fill="#3B2E38" stroke="#3A2E39" stroke-width="1.5"/>
                        <!-- Badan / Sweater -->
                        <path d="M 14 44 Q 32 40 50 44 L 56 92 L 10 92 Z" fill="#634136" stroke="#3A2E39" stroke-width="1.6"/>
                        <!-- Kepala & Rambut Cepol (Bun) -->
                        <circle cx="45" cy="10" r="6.5" fill="#4A2E24" stroke="#3A2E39" stroke-width="1.4"/>
                        <circle cx="32" cy="22" r="12.5" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.6"/>
                        <path d="M 20 18 C 22 8, 38 6, 44 16 C 40 13, 26 14, 21 22 Z" fill="#4A2E24" stroke="#3A2E39" stroke-width="1.4"/>
                        <!-- Wajah -->
                        <circle cx="27" cy="21" r="1.4" fill="#3A2E39"/>
                        <path d="M 25 27 Q 28 29 31 27" stroke="#3A2E39" stroke-width="1.4" fill="none" stroke-linecap="round"/>
                        <!-- Cangkir Minuman Kuning -->
                        <rect x="16" y="62" width="9" height="12" rx="2" fill="#FCD34D" stroke="#3A2E39" stroke-width="1.3"/>
                    </g>
                </g>

                <!-- Ikon Ponsel Lipat (Flip Phone) Ungu di Kanan Bawah -->
                <g transform="translate(216, 294) rotate(24)">
                    <rect x="-12" y="-28" width="24" height="30" rx="5" fill="#D7BDE2" stroke="#5B3E69" stroke-width="1.6"/>
                    <rect x="-8" y="-23" width="16" height="18" rx="2" fill="#F5EEF8" stroke="#5B3E69" stroke-width="1.2"/>
                    <rect x="-12" y="2" width="24" height="30" rx="5" fill="#C39BD3" stroke="#5B3E69" stroke-width="1.6"/>
                    <!-- Keypad -->
                    <circle cx="-5" cy="10" r="1.6" fill="#5B3E69"/>
                    <circle cx="0" cy="10" r="1.6" fill="#5B3E69"/>
                    <circle cx="5" cy="10" r="1.6" fill="#5B3E69"/>
                    <circle cx="-5" cy="17" r="1.6" fill="#5B3E69"/>
                    <circle cx="0" cy="17" r="1.6" fill="#5B3E69"/>
                    <circle cx="5" cy="17" r="1.6" fill="#5B3E69"/>
                    <circle cx="-5" cy="24" r="1.6" fill="#5B3E69"/>
                    <circle cx="0" cy="24" r="1.6" fill="#5B3E69"/>
                    <circle cx="5" cy="24" r="1.6" fill="#5B3E69"/>
                </g>
            </svg>`;

        // =================================================================
        // 7. VISUAL CARD #2: PERTEMANAN (isi yg tengah kartu.pdf)
        // =================================================================
        case 'visual-pertemanan':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <rect width="260" height="380" rx="16" fill="#FADBD8"/>
                <rect x="11" y="11" width="238" height="358" rx="12" fill="#F6EFEA"/>

                <!-- Ikon Pelangi & Awan di Kiri Atas -->
                <g transform="translate(14, 18)">
                    <path d="M 6 38 A 24 24 0 0 1 54 38" stroke="#F28B82" stroke-width="4.5" fill="none"/>
                    <path d="M 10.5 38 A 19.5 19.5 0 0 1 49.5 38" stroke="#Fbbc04" stroke-width="4.5" fill="none"/>
                    <path d="M 15 38 A 15 15 0 0 1 45 38" stroke="#FFF475" stroke-width="4.5" fill="none"/>
                    <circle cx="14" cy="38" r="8" fill="#FFFFFF"/>
                    <circle cx="22" cy="39" r="7" fill="#FFFFFF"/>
                    <circle cx="42" cy="39" r="7" fill="#FFFFFF"/>
                    <circle cx="49" cy="38" r="8" fill="#FFFFFF"/>
                </g>

                <!-- Judul PERTEMANAN -->
                <text x="132" y="76" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="17.5" fill="#E57399" letter-spacing="0.8">PERTEMANAN</text>

                <!-- Ilustrasi Grup Sahabat Berdiri & Bersalaman -->
                <g transform="translate(42, 128)">
                    <ellipse cx="88" cy="116" rx="76" ry="7" fill="#E6DDD6"/>

                    <!-- 5 Karakter Sahabat Beragam Warna Pakaian -->
                    <!-- Sahabat 1 (Kiri - Biru) -->
                    <g transform="translate(8, 12)">
                        <path d="M 8 52 L 4 98 L 13 98 L 17 66 L 21 98 L 29 98 L 25 52 Z" fill="#3B5998" stroke="#3A2E39" stroke-width="1.3"/>
                        <path d="M 6 22 Q 16 18 26 22 L 29 54 L 5 54 Z" fill="#5BC0BE" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="17" cy="10" r="8.5" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.3"/>
                        <path d="M 9 8 Q 17 0 25 8" fill="#3A2E39"/>
                    </g>

                    <!-- Sahabat 2 (Kiri Tengah - Ungu) -->
                    <g transform="translate(36, 6)">
                        <path d="M 8 56 L 6 104 L 14 104 L 17 70 L 21 104 L 28 104 L 26 56 Z" fill="#6C5B7B" stroke="#3A2E39" stroke-width="1.3"/>
                        <path d="M 6 24 Q 17 20 28 24 L 30 56 L 4 56 Z" fill="#C06C84" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="17" cy="11" r="8.5" fill="#D9A17C" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="17" cy="5" r="6" fill="#2A2421"/>
                    </g>

                    <!-- Sahabat 3 (Tengah - Hijau Olive) -->
                    <g transform="translate(68, 4)">
                        <path d="M 8 58 L 6 106 L 15 106 L 18 72 L 21 106 L 29 106 L 27 58 Z" fill="#4A5568" stroke="#3A2E39" stroke-width="1.3"/>
                        <path d="M 5 24 Q 17 20 29 24 L 31 58 L 4 58 Z" fill="#A3B18A" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="17" cy="11" r="8.5" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.3"/>
                    </g>

                    <!-- Sahabat 4 (Kanan Tengah - Kuning/Oranye) -->
                    <g transform="translate(98, 8)">
                        <path d="M 8 54 L 6 102 L 14 102 L 17 68 L 21 102 L 28 102 L 26 54 Z" fill="#7F5539" stroke="#3A2E39" stroke-width="1.3"/>
                        <path d="M 6 24 Q 17 20 28 24 L 30 54 L 4 54 Z" fill="#F6BD60" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="17" cy="11" r="8.5" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.3"/>
                    </g>

                    <!-- Sahabat 5 (Kanan - Pink Cerah) -->
                    <g transform="translate(128, 10)">
                        <path d="M 8 54 L 5 100 L 14 100 L 18 68 L 22 100 L 30 100 L 27 54 Z" fill="#4A354F" stroke="#3A2E39" stroke-width="1.3"/>
                        <path d="M 5 22 Q 17 18 29 22 L 32 54 L 4 54 Z" fill="#F28482" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="17" cy="10" r="8.5" fill="#E0AC8B" stroke="#3A2E39" stroke-width="1.3"/>
                    </g>

                    <!-- Tangan Saling Berjabatan di Tengah -->
                    <path d="M 58 52 L 84 56 L 112 52" stroke="#F3C6B6" stroke-width="4.5" fill="none" stroke-linecap="round"/>
                </g>

                <!-- 2 Bintang Biru di Kanan Bawah -->
                <g transform="translate(216, 306)">
                    <polygon points="0,-16 4.5,-5 16,-4 7,4 9.5,15 0,9 -9.5,15 -7,4 -16,-4 -4.5,-5" fill="#8AB4F8"/>
                </g>
                <g transform="translate(192, 328) scale(0.78)">
                    <polygon points="0,-16 4.5,-5 16,-4 7,4 9.5,15 0,9 -9.5,15 -7,4 -16,-4 -4.5,-5" fill="#8AB4F8"/>
                </g>
            </svg>`;

        // =================================================================
        // 8. VISUAL CARD #3: KELUARGA (isi yg tengah kartu.pdf)
        // =================================================================
        case 'visual-keluarga':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <rect width="260" height="380" rx="16" fill="#E2DAF0"/>
                <rect x="11" y="11" width="238" height="358" rx="12" fill="#F5EFEA"/>

                <!-- Ornamen Kilau Kiri & Kanan Judul -->
                <g transform="translate(56, 56)" stroke="#5C6B73" stroke-width="1.3" fill="#B8D8EB">
                    <path d="M 0 -12 Q 2 -2 12 0 Q 2 2 0 12 Q -2 2 -12 0 Q -2 -2 0 -12 Z"/>
                    <circle cx="-10" cy="10" r="2" fill="#F4A261"/>
                    <circle cx="10" cy="-8" r="1.5" fill="#E76F51"/>
                </g>
                <g transform="translate(204, 56)" stroke="#5C6B73" stroke-width="1.3" fill="#B8D8EB">
                    <path d="M 0 -12 Q 2 -2 12 0 Q 2 2 0 12 Q -2 2 -12 0 Q -2 -2 0 -12 Z"/>
                    <circle cx="10" cy="10" r="2" fill="#F4A261"/>
                    <circle cx="-10" cy="-8" r="1.5" fill="#E76F51"/>
                </g>

                <!-- Judul KELUARGA -->
                <text x="130" y="62" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="17.5" fill="#7D6B91" letter-spacing="1">KELUARGA</text>

                <!-- Ilustrasi Keluarga Besar (Kakek, Nenek, Ayah, Ibu, Anak-anak) -->
                <g transform="translate(38, 126)">
                    <ellipse cx="92" cy="112" rx="80" ry="7" fill="#E5DDD5"/>

                    <!-- Anak Kecil Kiri -->
                    <g transform="translate(6, 44)">
                        <rect x="5" y="34" width="12" height="26" rx="3" fill="#6D8A96" stroke="#3A2E39" stroke-width="1.2"/>
                        <rect x="3" y="16" width="16" height="22" rx="4" fill="#A8DADC" stroke="#3A2E39" stroke-width="1.2"/>
                        <circle cx="11" cy="8" r="7" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.2"/>
                    </g>

                    <!-- Ayah & Anak di Bahu -->
                    <g transform="translate(30, 8)">
                        <rect x="8" y="54" width="18" height="46" rx="3" fill="#5C6B73" stroke="#3A2E39" stroke-width="1.3"/>
                        <rect x="5" y="24" width="24" height="34" rx="5" fill="#E9C46A" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="17" cy="14" r="8" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.3"/>
                        <!-- Anak kecil digendong di atas -->
                        <circle cx="17" cy="-2" r="6" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.2"/>
                    </g>

                    <!-- Ibu & Bayi (Tengah) -->
                    <g transform="translate(62, 16)">
                        <path d="M 4 50 L 24 50 L 28 92 L 0 92 Z" fill="#D8C3A5" stroke="#3A2E39" stroke-width="1.3"/>
                        <rect x="4" y="22" width="20" height="30" rx="5" fill="#F4A261" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="14" cy="11" r="8" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.3"/>
                        <!-- Bayi dalam gendongan -->
                        <ellipse cx="16" cy="34" rx="8" ry="5" fill="#FFF8F0" stroke="#3A2E39" stroke-width="1.1"/>
                    </g>

                    <!-- Nenek (Tengah Kanan) -->
                    <g transform="translate(94, 20)">
                        <path d="M 4 46 L 24 46 L 26 88 L 2 88 Z" fill="#B5838D" stroke="#3A2E39" stroke-width="1.3"/>
                        <rect x="4" y="22" width="20" height="28" rx="5" fill="#E5989B" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="14" cy="11" r="8" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="14" cy="4" r="5" fill="#D9D9D9" stroke="#3A2E39" stroke-width="1"/>
                    </g>

                    <!-- Kakek dengan Tongkat (Kanan) -->
                    <g transform="translate(126, 16)">
                        <rect x="6" y="48" width="18" height="44" rx="3" fill="#4A5759" stroke="#3A2E39" stroke-width="1.3"/>
                        <rect x="4" y="22" width="22" height="30" rx="5" fill="#A3B18A" stroke="#3A2E39" stroke-width="1.3"/>
                        <circle cx="15" cy="11" r="8" fill="#F3C6B6" stroke="#3A2E39" stroke-width="1.3"/>
                        <path d="M 7 8 Q 15 2 23 8" stroke="#D9D9D9" stroke-width="4" fill="none" stroke-linecap="round"/>
                        <!-- Tongkat Kakek -->
                        <path d="M 30 48 L 30 92" stroke="#8D5B4C" stroke-width="2.2" stroke-linecap="round"/>
                    </g>
                </g>

                <!-- Keranjang Bunga Pink di Kiri Bawah -->
                <g transform="translate(16, 294)">
                    <!-- Daun & Bunga -->
                    <circle cx="18" cy="24" r="8" fill="#F4A6C1"/>
                    <circle cx="32" cy="18" r="9" fill="#F7B7CE"/>
                    <circle cx="46" cy="24" r="8" fill="#F4A6C1"/>
                    <circle cx="25" cy="30" r="8" fill="#FAD2E1"/>
                    <circle cx="39" cy="30" r="8" fill="#FAD2E1"/>
                    <path d="M 10 34 Q 32 24 54 34" stroke="#687D42" stroke-width="4" fill="none"/>
                    <!-- Pot Keranjang Anyaman -->
                    <path d="M 12 36 L 52 36 L 46 66 L 18 66 Z" fill="#C68B59" stroke="#5C3A21" stroke-width="1.6"/>
                    <line x1="15" y1="46" x2="49" y2="46" stroke="#8C5830" stroke-width="1.4"/>
                    <line x1="17" y1="56" x2="47" y2="56" stroke="#8C5830" stroke-width="1.4"/>
                </g>
            </svg>`;

        // =================================================================
        // 9. VISUAL CARD #4: KARIER (isi yg tengah kartu.pdf)
        // =================================================================
        case 'visual-karier':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <rect width="260" height="380" rx="16" fill="#D6DCF2"/>
                <rect x="11" y="11" width="238" height="358" rx="12" fill="#F5EFEA"/>

                <!-- Dekorasi Kartu Gantung Pink di Kiri Atas -->
                <g transform="translate(12, 12)">
                    <line x1="14" y1="0" x2="14" y2="30" stroke="#E5989B" stroke-width="1.5"/>
                    <line x1="34" y1="0" x2="34" y2="24" stroke="#E5989B" stroke-width="1.5"/>
                    <rect x="4" y="24" width="42" height="32" rx="4" transform="rotate(-8 25 40)" fill="#F9C6D4" stroke="#E07A96" stroke-width="1.4"/>
                    <rect x="10" y="30" width="30" height="10" rx="2" transform="rotate(-8 25 40)" fill="#FFF5F7"/>
                </g>

                <!-- Dekorasi Bintang Jatuh di Kanan Atas -->
                <g transform="translate(216, 36)" stroke="#5C5366" stroke-width="1.4" fill="none">
                    <polygon points="0,-14 4,-4 14,-3 6,4 8,14 0,8 -8,14 -6,4 -14,-3 -4,-4" fill="#FFFDF9"/>
                    <path d="M 12 12 C 20 22, 24 34, 22 48" stroke-linecap="round"/>
                    <path d="M 6 16 C 14 26, 17 36, 16 48" stroke-linecap="round"/>
                </g>

                <!-- Judul KARIER -->
                <text x="130" y="78" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="18" fill="#D86C7A" letter-spacing="1.2">KARIER</text>

                <!-- Ilustrasi Meja Kerja (Laptop, Buku, Kopi, Ponsel, Alat Tulis) -->
                <g transform="translate(42, 126)">
                    <ellipse cx="90" cy="96" rx="76" ry="26" fill="#E6DDD6" opacity="0.65"/>

                    <!-- Tempat Pensil di Kiri -->
                    <g transform="translate(8, 38)">
                        <path d="M 6 0 L 10 -16 M 12 0 L 12 -18 M 18 0 L 16 -15" stroke="#E07A5F" stroke-width="3" stroke-linecap="round"/>
                        <rect x="2" y="0" width="20" height="26" rx="3" fill="#D4A373" stroke="#3A2E39" stroke-width="1.5"/>
                    </g>

                    <!-- Laptop Terbuka di Tengah -->
                    <g transform="translate(44, 6)">
                        <!-- Layar Laptop -->
                        <polygon points="4,0 92,0 86,52 10,52" fill="#3D405B" stroke="#2B2D42" stroke-width="2"/>
                        <polygon points="9,5 87,5 82,47 14,47" fill="#5C677D"/>
                        <!-- Bodi/Keyboard Laptop -->
                        <polygon points="10,52 86,52 102,84 -4,84" fill="#D8DBE2" stroke="#2B2D42" stroke-width="1.8"/>
                        <!-- Baris Keyboard -->
                        <polygon points="12,57 84,57 92,72 4,72" fill="#9AA5B1" stroke="#2B2D42" stroke-width="1"/>
                        <!-- Touchpad -->
                        <polygon points="40,74 56,74 58,81 38,81" fill="#BCCCDC" stroke="#2B2D42" stroke-width="1"/>
                    </g>

                    <!-- Buku Catatan / Sketsa di Kiri Bawah -->
                    <g transform="translate(14, 78) rotate(-28)">
                        <rect x="0" y="0" width="32" height="42" rx="3" fill="#FFFFFF" stroke="#3A2E39" stroke-width="1.6"/>
                        <circle cx="16" cy="20" r="8" fill="#E9ECEF" stroke="#3A2E39" stroke-width="1.2"/>
                    </g>

                    <!-- Cangkir Kopi di Tengah Bawah -->
                    <g transform="translate(66, 98)">
                        <ellipse cx="12" cy="12" rx="14" ry="10" fill="#B56576" stroke="#3A2E39" stroke-width="1.5"/>
                        <circle cx="12" cy="9" r="9" fill="#6F4E37" stroke="#3A2E39" stroke-width="1.4"/>
                    </g>

                    <!-- Smartphone Hitam di Kanan Bawah -->
                    <g transform="translate(96, 86) rotate(-32)">
                        <rect x="0" y="0" width="22" height="38" rx="4" fill="#2B2D42" stroke="#3A2E39" stroke-width="1.5"/>
                        <rect x="2" y="3" width="18" height="30" rx="2" fill="#4A4E69"/>
                    </g>
                </g>

                <!-- Ikon Folder Pink & Kursor Mouse di Kanan Bawah -->
                <g transform="translate(174, 304)">
                    <path d="M 0 8 L 18 8 L 23 14 L 54 14 L 54 44 L 0 44 Z" fill="#F9C6D4" stroke="#E07A96" stroke-width="1.5"/>
                    <rect x="4" y="18" width="46" height="24" rx="2" fill="#FADCE6"/>
                    <!-- Kursor Panah -->
                    <polygon points="46,36 49,54 54,48 60,55 63,52 57,45 64,43" fill="#E2DAF0" stroke="#4A3E56" stroke-width="1.5"/>
                </g>
            </svg>`;

        // =================================================================
        // 10. VISUAL CARD #5: ANAK (isi yg tengah kartu.pdf)
        // =================================================================
        case 'visual-anak':
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 380" class="w-full h-full select-none">
                <rect width="260" height="380" rx="16" fill="#C9DCF5"/>
                <rect x="11" y="11" width="238" height="358" rx="12" fill="#F3E5EC"/>

                <!-- Ikon Matahari Tersenyum di Kiri Atas -->
                <g transform="translate(36, 44)">
                    <circle cx="0" cy="0" r="15" fill="#Fbbc04"/>
                    <!-- Sinar Matahari -->
                    <g stroke="#Fbbc04" stroke-width="3" stroke-linecap="round">
                        <line x1="0" y1="-21" x2="0" y2="-25"/>
                        <line x1="0" y1="21" x2="0" y2="25"/>
                        <line x1="-21" y1="0" x2="-25" y2="0"/>
                        <line x1="21" y1="0" x2="25" y2="0"/>
                        <line x1="-15" y1="-15" x2="-18" y2="-18"/>
                        <line x1="15" y1="-15" x2="18" y2="-18"/>
                        <line x1="-15" y1="15" x2="-18" y2="18"/>
                        <line x1="15" y1="15" x2="18" y2="18"/>
                    </g>
                    <!-- Wajah Matahari -->
                    <circle cx="-5" cy="-2" r="1.6" fill="#3A2E39"/>
                    <circle cx="5" cy="-2" r="1.6" fill="#3A2E39"/>
                    <path d="M -4 4 Q 0 8 4 4" stroke="#3A2E39" stroke-width="1.6" fill="none" stroke-linecap="round"/>
                </g>

                <!-- Judul ANAK -->
                <text x="130" y="68" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="18.5" fill="#B6789E" letter-spacing="1.2">ANAK</text>

                <!-- Ilustrasi Tengah: Orang Tua & Anak di Dalam Bingkai Hati -->
                <g transform="translate(130, 196)">
                    <!-- Bayangan Hati -->
                    <path d="M 0 64 C -10 56, -74 18, -74 -26 C -74 -56, -42 -68, 0 -36 C 42 -68, 74 -56, 74 -26 C 74 18, 10 56, 0 64 Z" fill="#D5B8C8" transform="translate(3, 6)"/>
                    <!-- Bingkai Hati Pink Muda -->
                    <path d="M 0 64 C -10 56, -74 18, -74 -26 C -74 -56, -42 -68, 0 -36 C 42 -68, 74 -56, 74 -26 C 74 18, 10 56, 0 64 Z" fill="#FADCE6" stroke="#5A3E4C" stroke-width="2"/>

                    <!-- Ayah (Kiri) -->
                    <g transform="translate(-26, -18)">
                        <path d="M -22 46 C -22 18, 16 18, 16 46 Z" fill="#1D4E89" stroke="#3A2E39" stroke-width="1.8"/>
                        <circle cx="-2" cy="0" r="15" fill="#F9DC5C" stroke="#3A2E39" stroke-width="1.6"/>
                        <path d="M -16 -4 C -16 -18, 12 -18, 12 -4 C 6 -10, -8 -10, -16 -4 Z" fill="#2B2D42" stroke="#3A2E39" stroke-width="1.4"/>
                        <path d="M -6 0 Q -3 -3 0 0" stroke="#3A2E39" stroke-width="1.5" fill="none"/>
                        <path d="M -4 6 Q 0 9 4 6" stroke="#3A2E39" stroke-width="1.5" fill="none"/>
                    </g>

                    <!-- Ibu (Kanan) -->
                    <g transform="translate(26, -14)">
                        <path d="M -16 42 C -16 18, 22 18, 22 42 Z" fill="#CE93D8" stroke="#3A2E39" stroke-width="1.8"/>
                        <circle cx="2" cy="2" r="14" fill="#F9DC5C" stroke="#3A2E39" stroke-width="1.6"/>
                        <path d="M -11 -2 C -10 -16, 16 -16, 16 4 C 12 -6, -4 -6, -11 -2 Z" fill="#6D4C41" stroke="#3A2E39" stroke-width="1.4"/>
                        <path d="M -2 2 Q 1 -1 4 2" stroke="#3A2E39" stroke-width="1.5" fill="none"/>
                        <path d="M -2 8 Q 2 10 5 8" stroke="#3A2E39" stroke-width="1.5" fill="none"/>
                    </g>

                    <!-- Anak Kecil di Tengah -->
                    <g transform="translate(0, 6)">
                        <path d="M -14 34 C -14 16, 14 16, 14 34 Z" fill="#FFF3B0" stroke="#3A2E39" stroke-width="1.6"/>
                        <circle cx="0" cy="4" r="11" fill="#F9DC5C" stroke="#3A2E39" stroke-width="1.6"/>
                        <circle cx="-3.5" cy="3" r="1.4" fill="#3A2E39"/>
                        <circle cx="3.5" cy="3" r="1.4" fill="#3A2E39"/>
                        <path d="M -3 8 Q 0 11 3 8" stroke="#3A2E39" stroke-width="1.4" fill="none"/>
                    </g>

                    <!-- Lengan Memeluk -->
                    <path d="M -34 24 Q 0 38 34 24" stroke="#F9DC5C" stroke-width="8" fill="none" stroke-linecap="round"/>
                    <path d="M -34 24 Q 0 38 34 24" stroke="#3A2E39" stroke-width="1.6" fill="none" stroke-linecap="round"/>
                </g>

                <!-- Balok Huruf A-B-C di Kanan Bawah -->
                <g transform="translate(166, 294) rotate(8)">
                    <!-- Balok A (Atas) -->
                    <rect x="14" y="0" width="24" height="24" rx="3" fill="#B8D4F2" stroke="#3B4D6B" stroke-width="1.6"/>
                    <text x="26" y="18" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="16" fill="#3B4D6B">A</text>
                    <!-- Balok B (Kiri Bawah) -->
                    <rect x="0" y="24" width="24" height="24" rx="3" fill="#FDE68A" stroke="#92400E" stroke-width="1.6"/>
                    <text x="12" y="42" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="16" fill="#D97706">B</text>
                    <!-- Balok C (Kanan Bawah) -->
                    <rect x="24" y="24" width="24" height="24" rx="3" fill="#FDBA74" stroke="#9A3412" stroke-width="1.6"/>
                    <text x="36" y="42" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="700" font-size="16" fill="#C2410C">C</text>
                </g>
            </svg>`;

        default:
            return generateCardSVG('card-back');
    }
}
