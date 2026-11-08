import { Release, Track } from '../types/music';
import { ARTICLES } from './articles';
import singleCoverImg from '../assets/images/cover_single_langkah_1794089459788.jpg';
import epCoverImg from '../assets/images/cover_ep_sudut_bayangan_1794089459341.jpg';
import singleHujanCoverImg from '../assets/images/cover_single_hujan_sore_1794156844086.jpg';
import albumRuangSunyiCoverImg from '../assets/images/cover_album_ruang_sunyi_1794156845512.jpg';
import epNadaAntaraCoverImg from '../assets/images/cover_ep_nada_antara_1794156844747.jpg';

export const RELEASES: Release[] = [
  {
    id: 'rel-skenario-dua-puluh-lima',
    title: 'Skenario Dua Puluh Lima',
    slug: 'skenario-dua-puluh-lima',
    releaseType: 'single',
    releaseDate: '2026-11-08',
    displayYear: '2026',
    status: 'released',
    description: 'Sebuah ode sindiran sosial tentang sengkarut dunia kerja, syarat yang absurd, calo orang dalam, dan beban kenyataan generasi usia dua puluh lima.',
    coverArtUrl: singleHujanCoverImg,
    coverArtAlt: 'Sampul single Skenario Dua Puluh Lima berupa sudut ruangan temaram dengan kertas naskah',
    trackIds: ['trk-skenario-dua-puluh-lima'],
    credits: [
      { role: 'Written & Performed by', name: 'Sor' },
      { role: 'Acoustic Guitar & Vocals', name: 'Sor' },
      { role: 'Mixing & Mastering', name: 'Studio Antara' },
    ],
    behindTheRelease: `Lagu ini lahir dari kejengkolan melihat syarat lowongan kerja yang tidak masuk akal dan fenomena calo serta nepotisme yang merajalela. 

Direkam secara lugas dengan vokal tegas dan petikan gitar akustik yang dinamis, menyuarakan rasa frustrasi banyak anak muda yang hanya ingin mendapat kesempatan yang adil.`,
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
      { platform: 'Bandcamp', url: 'https://bandcamp.com' },
    ],
    featured: true,
  },
  {
    id: 'rel-hujan-di-balik-jendela',
    title: 'Hujan di Balik Jendela',
    slug: 'hujan-di-balik-jendela',
    releaseType: 'single',
    releaseDate: '2026-11-04',
    displayYear: '2026',
    status: 'released',
    description: 'Sebuah nomor akustik lo-fi yang direkam saat hujan deras mengguyur atap seng kamar, menangkap suara rintik air dan petikan nilon yang pelan.',
    coverArtUrl: singleHujanCoverImg,
    coverArtAlt: 'Sampul single Hujan di Balik Jendela berupa jendela berembun dengan tetesan air hujan menghadap kota temaram',
    trackIds: ['trk-hujan-di-balik-jendela'],
    credits: [
      { role: 'Written & Performed by', name: 'Sor' },
      { role: 'Field Recording (Rain)', name: 'Sor' },
      { role: 'Mastering', name: 'Studio Kamar' },
    ],
    behindTheRelease: 'Direkam tanpa rencana ketika hujan tiba-tiba turun di sore hari. Mikrofon diletakkan tepat di ambang jendela kayu.',
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
      { platform: 'Bandcamp', url: 'https://bandcamp.com' },
    ],
    featured: true,
  },
  {
    id: 'rel-langkah-yang-tertinggal',
    title: 'Langkah yang Tertinggal',
    slug: 'langkah-yang-tertinggal',
    releaseType: 'single',
    releaseDate: '2026-11-01',
    displayYear: '2026',
    status: 'released',
    description: 'Sebuah lagu akustik tentang keraguan di ambang pintu, dan bagaimana kita sering kali menunggu keberanian yang tak kunjung tiba.',
    coverArtUrl: singleCoverImg,
    coverArtAlt: 'Sampul single Langkah yang Tertinggal berupa bayangan lembut di atas kain bertekstur',
    trackIds: ['trk-langkah-yang-tertinggal'],
    credits: [
      { role: 'Written & Composed by', name: 'Sor' },
      { role: 'Acoustic Guitar & Vocals', name: 'Sor' },
      { role: 'Produced by', name: 'Sor' },
      { role: 'Mixed & Mastered by', name: 'Studio Antara' },
      { role: 'Artwork by', name: 'sorside archive' },
    ],
    behindTheRelease: `
Lagu ini direkam dalam satu ruangan dengan dua mikrofon kondensor sederhana di larut malam. 

Tidak ada metronom kaku atau penyelarasan nada otomatis. Tujuannya adalah menangkap tarikan napas dan jeda alami di antara petikan senar nilon—seperti percakapan yang tidak buru-buru ingin disudahi.
    `.trim(),
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
      { platform: 'Bandcamp', url: 'https://bandcamp.com' },
    ],
    featured: true,
  },
  {
    id: 'rel-sudut-dan-bayangan',
    title: 'Sudut dan Bayangan',
    slug: 'sudut-dan-bayangan',
    releaseType: 'ep',
    releaseDate: '2026-10-15',
    displayYear: '2026',
    status: 'released',
    description: 'EP berisi tiga repertoar instrumental dan vokal yang merekam suara-suara kota, kesunyian ruang tengah, dan keraguan manusiawi.',
    coverArtUrl: epCoverImg,
    coverArtAlt: 'Sampul EP Sudut dan Bayangan berupa geometri tangga beton dan bayangan tajam monokrom',
    trackIds: [
      'trk-kota-dan-lampu-jalan',
      'trk-dialog-tengah-malam',
      'trk-di-balik-keraguan',
    ],
    credits: [
      { role: 'Produced & Arranged by', name: 'Sor' },
      { role: 'Instruments', name: 'Sor (Guitar, Piano, Ambient Tapes)' },
      { role: 'Recorded at', name: 'Kamar Sisi Selatan' },
      { role: 'Mastering', name: 'Kolektif Ruang Rekam' },
    ],
    behindTheRelease: `
EP ini disusun selama masa transisi ketika suara bising jalanan terasa begitu kontras dengan keheningan di dalam kamar. 

Tiap nomor di dalamnya merupakan respons sonik terhadap pengamatan personal tentang ruang kota, interaksi manusia yang berjarak, dan kelegaan saat kita akhirnya menerima ketidakpastian.
    `.trim(),
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
      { platform: 'YouTube Music', url: 'https://music.youtube.com' },
      { platform: 'Bandcamp', url: 'https://bandcamp.com' },
    ],
    featured: true,
  },
  {
    id: 'rel-gema-ruang-sunyi',
    title: 'Gema Ruang Sunyi',
    slug: 'gema-ruang-sunyi',
    releaseType: 'album',
    releaseDate: '2026-08-20',
    displayYear: '2026',
    status: 'released',
    description: 'Album penuh perdana yang mendokumentasikan akustik ruang berdinding beton, gema sunyi di tengah malam, dan dialog batin tentang arti pulang.',
    coverArtUrl: albumRuangSunyiCoverImg,
    coverArtAlt: 'Sampul Album Gema Ruang Sunyi berupa gitar akustik bersandar pada dinding beton dengan sorot sinar matahari diagonal',
    trackIds: [
      'trk-sebuah-awal-yang-ragu',
      'trk-lorong-dan-bayangan',
      'trk-gitar-tua-sudut-kamar',
    ],
    credits: [
      { role: 'Music & Concept', name: 'Sor' },
      { role: 'Acoustic Guitar, Ambient Synth', name: 'Sor' },
      { role: 'Location', name: 'Studio Beton Selatan' },
    ],
    behindTheRelease: 'Album penuh ini direkam di sebuah bangunan beton terbengkalai pada dini hari, memanfaatkan reverberasi alami dinding semen.',
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
      { platform: 'Bandcamp', url: 'https://bandcamp.com' },
    ],
    featured: true,
  },
  {
    id: 'rel-tahun-yang-tenang',
    title: 'Tahun-Tahun yang Tenang',
    slug: 'tahun-yang-tenang',
    releaseType: 'ep',
    releaseDate: '2026-05-12',
    displayYear: '2026',
    status: 'released',
    description: 'Kumpulan nomor akustik fingerstyle mentah dengan gitar senar baja tua, merefleksikan fase hidup yang melambat setelah badai kesibukan.',
    coverArtUrl: epNadaAntaraCoverImg,
    coverArtAlt: 'Sampul EP Tahun-Tahun yang Tenang berupa leher gitar akustik tua bersandar di dinding semen usang bertekstur',
    trackIds: [
      'trk-senar-berkarat',
      'trk-suara-kayu-dan-senja',
    ],
    credits: [
      { role: 'Guitar & Arrangement', name: 'Sor' },
      { role: 'Recording', name: 'Rumah Kayu Pinggir Kota' },
    ],
    behindTheRelease: 'Dua komposisi gitar instrumental yang dimainkan dengan tempo sangat lambat, direkam dengan tape recorder portabel.',
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Bandcamp', url: 'https://bandcamp.com' },
    ],
    featured: false,
  },
];

export const TRACKS: Track[] = [
  {
    id: 'trk-skenario-dua-puluh-lima',
    title: 'Skenario Dua Puluh Lima',
    slug: 'skenario-dua-puluh-lima',
    releaseId: 'rel-skenario-dua-puluh-lima',
    trackNumber: 1,
    duration: '04:28',
    status: 'released',
    description: 'Sindiran sosial bernada tegas tentang sengkarut dunia kerja, syarat absurd, calo, dan nasib angkatan kerja.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    lyrics: `
[Intro]
Selamat datang...
Di gerbang neraka
Sebut saja Skenario dua puluh lima

[Verse 1]
Scroll lowongan cuma bikin trauma
Lempar syarat kerja gak kira-kira
Tapi upah dibawah uemka banjarnegara
Cuma bisa ketawa sambil ngelus dada

Umur maksimal dua puluh lima tahun
Wajib pengalaman dua puluh tahun
Harus siap bekerja dalam tekanan
Gak sekalian bisa belah lautan?

Penampilan menarik jadi acuan
Tinggi seratus enam puluh gak masuk hitungan
Cari karyawan atau model iklan?
Dikira jelek gak butuh makan?

[Chorus]
Skenario dua puluh lima
Syarat menyiksa, upah menghina
Diminta sempurna bagai dewa
Padahal cuma manusia biasa

[Verse 2]
Calo bertebaran, menawarkan jasa
"Lima belas juta, besok langsung kerja"
Cari upah, malah bayar di muka
Logika yang cuma ada di indonesia

Calo bukan aktor utama, cuma perantara
Yang bermain duduk di dalam sana
Siapa di balik meja...?
Kita semua tahu siapa...

[Chorus]
Skenario dua puluh lima
Gerbang saja sudah penuh dusta
Cari nafkah malah diperdaya
Padahal cuma pengen kerja

[Verse 3]
Meritokrasi cuma jadi slogan
Tutup mata sama titipan paman
Banyak ujian dan persyaratan
Padahal dari awal hasil sudah ditentukan

Katanya pengalaman yang jadi acuan
Tapi tetap kalah sama anak kenalan
Tes ujian cuma jadi hiasan laporan
Hasil akhir tetap milik garis keturunan

[Chorus]
Skenario dua puluh lima
Yang menang bukan yang paling bisa
Kenalan menentukan semua
Padahal cuma pengen adil saja

[Outro]
Skenario dua puluh lima...
Dua puluh lima...
    `.trim(),
    behindTheSong: 'Diciptakan sebagai respons dan sindiran tajam terhadap sistem rekrutmen kerja yang meresahkan.',
    credits: [
      { role: 'Written & Performed by', name: 'Sor' },
      { role: 'Acoustic Guitar & Vocals', name: 'Sor' },
    ],
    relatedWritingIds: ['tentang-hal-hal-yang-terus-kita-tunda', 'menjadi-minato'],
    streamingLinks: [{ platform: 'Spotify', url: 'https://spotify.com' }],
  },
  {
    id: 'trk-hujan-di-balik-jendela',
    title: 'Hujan di Balik Jendela',
    slug: 'hujan-di-balik-jendela',
    releaseId: 'rel-hujan-di-balik-jendela',
    trackNumber: 1,
    duration: '03:55',
    status: 'released',
    description: 'Petikan lambat gitar nilon diiringi rekaman rintik air hujan asli di luar kamar.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    lyrics: `
Rintik mengetuk kaca tanpa tergesa
Mengaburkan lampu jalan di bawah sana
Secangkir teh yang mengepul perlahan reda
Kita menunggu sesuatu yang tak tentu ada
    `.trim(),
    behindTheSong: 'Diciptakan secara spontan ketika hujan lebat turun mengguyur kaca jendela kamar kerja.',
    credits: [{ role: 'Vocals & Guitar', name: 'Sor' }],
    relatedWritingIds: ['catatan-dari-ruang-tengah'],
    streamingLinks: [{ platform: 'Spotify', url: 'https://spotify.com' }],
  },
  {
    id: 'trk-langkah-yang-tertinggal',
    title: 'Langkah yang Tertinggal',
    slug: 'langkah-yang-tertinggal',
    releaseId: 'rel-langkah-yang-tertinggal',
    trackNumber: 1,
    duration: '03:42',
    status: 'released',
    description: 'Petikan gitar solo dan vokal lirih mengenai momen ketika kita tahu harus beranjak namun tetap diam.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    lyrics: `
Kopi sudah mendingin di sudut meja
Buku-buku terbuka menatap tanpa kata
Kita tahu pintu keluar selalu ada
Namun kaki enggan melangkah ke luar sana

Draf setengah jadi menumpuk di atas kertas
Gagasan-gagasan yang kita anggap terlalu lekas
Kita selalu menunggu saat yang paling sempurna
Padahal waktu tak pernah peduli pada rencana

Dan di ambang pintu ini kita terus berdiri
Menghitung alasan untuk menunda lagi
Berapa banyak hari yang terlewat dalam ragu
Menatap bayangan sendiri yang membeku

Jam dinding berdetak mengikis malam
Lampu kamar temaram menyisakan diam
Mungkin keberanian bukan tentang kepastian
Melainkan kesediaan melangkah dalam ketidaktahuan

Esok saat fajar mulai mengetuk kaca
Kuharap pintu itu akhirnya terbuka
Tanpa beban kesempurnaan yang membelenggu
Cukup satu langkah kecil yang tak lagi menunggu
    `.trim(),
    behindTheSong: 'Ditulis pada suatu pagi ketika menyadari betapa banyaknya hal penting yang saya tunda hanya karena takut hasilnya tidak seperti bayangan di kepala.',
    credits: [{ role: 'Vocals & Acoustic Guitar', name: 'Sor' }],
    relatedWritingIds: ['tentang-hal-hal-yang-terus-kita-tunda'],
    streamingLinks: [{ platform: 'Spotify', url: 'https://spotify.com' }],
  },
  {
    id: 'trk-kota-dan-lampu-jalan',
    title: 'Kota dan Lampu Jalan',
    slug: 'kota-dan-lampu-jalan',
    releaseId: 'rel-sudut-dan-bayangan',
    trackNumber: 1,
    duration: '04:15',
    status: 'released',
    description: 'Lanskap suara ambient dengan piano elektrik bertekstur, merekam ritme kota di jam lima sore.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    lyrics: `
Kabel-kabel kusut di atas kepala
Menyambung ribuan suara yang tak bersua
Lampu merkuri mulai menyala satu demi satu
Di bawahnya kita bergegas tanpa tahu arah tuju

Deru klakson menelan derit rem di perempatan
Orang-orang menatap layar mencari kepastian
Ada aroma kopi hangat dari balik ruko tua
Tempat singgah bagi mereka yang lelah berpura-pura

Dan kota ini terus bernapas dalam bisingnya
Menyembunyikan rahasia di sela gedung-gedung tua
Kita saling berpapasan namun tak pernah saling tahu
Berapa banyak beban yang dipikul di balik mantel abu-abu

Langkah kaki beradu dengan aspal yang basah
Sisa gerimis sore meninggalkan resah
Setiap sudut jalanan punya ceritanya sendiri
Sebagian tertulis rapi, sebagian menguap sunyi

Malam merayap pelan di antara tiang listrik
Menyisakan pantulan cahaya di genangan air
Kita pulang membawa lelah yang tak sempat dibicarakan
Menunggu esok pagi datang untuk kembali diulang
    `.trim(),
    behindTheSong: 'Trek pembuka EP ini menggabungkan rekaman suara lapangan (field recording) lalu lintas senja dengan progresi piano elektrik Rhodes.',
    credits: [{ role: 'Piano & Rhodes', name: 'Sor' }],
    relatedWritingIds: ['kita-dan-kota-ini'],
    streamingLinks: [{ platform: 'Spotify', url: 'https://spotify.com' }],
  },
  {
    id: 'trk-dialog-tengah-malam',
    title: 'Dialog Tengah Malam',
    slug: 'dialog-tengah-malam',
    releaseId: 'rel-sudut-dan-bayangan',
    trackNumber: 2,
    duration: '03:18',
    status: 'released',
    description: 'Komposisi gitar akustik fingerstyle yang intim dalam suasana ruang tengah saat semua orang telah terlelap.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    behindTheSong: 'Komposisi murni instrumental. Direkam langsung tanpa jeda saat jarum jam menunjuk pukul 02.00 dini hari.',
    credits: [{ role: 'Fingerstyle Acoustic Guitar', name: 'Sor' }],
    relatedWritingIds: ['catatan-dari-ruang-tengah'],
    streamingLinks: [{ platform: 'Spotify', url: 'https://spotify.com' }],
  },
  {
    id: 'trk-di-balik-keraguan',
    title: 'Di Balik Keraguan',
    slug: 'di-balik-keraguan',
    releaseId: 'rel-sudut-dan-bayangan',
    trackNumber: 3,
    duration: '04:02',
    status: 'released',
    description: 'Nomor penutup bernuansa folk kontemplatif yang mengajak berdamai dengan ketidakpastian.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    lyrics: `
Siapa bilang harus tahu segalanya sekarang?
Bahkan ombak tak pernah berjanji kapan pulang
Kita menuntut peta di tengah kabut tebal
Padahal melangkah perlahan sudah cukup kekal
    `.trim(),
    behindTheSong: 'Lagu ini terlahir dari perbincangan panjang tentang tekanan untuk selalu tampak yakin di mata masyarakat.',
    credits: [{ role: 'Vocals & Acoustic Guitar', name: 'Sor' }],
    relatedWritingIds: ['merayakan-keraguan'],
    streamingLinks: [{ platform: 'Spotify', url: 'https://spotify.com' }],
  },
  {
    id: 'trk-sebuah-awal-yang-ragu',
    title: 'Sebuah Awal yang Ragu',
    slug: 'sebuah-awal-yang-ragu',
    releaseId: 'rel-gema-ruang-sunyi',
    trackNumber: 1,
    duration: '03:22',
    status: 'released',
    description: 'Pembuka album bernuansa ambient drone dengan petikan nilon tunggal.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    behindTheSong: 'Menangkap keheningan pertama sebelum nada-nada lain di album ini bermunculan.',
    credits: [{ role: 'Composer', name: 'Sor' }],
    streamingLinks: [{ platform: 'Spotify', url: 'https://spotify.com' }],
  },
  {
    id: 'trk-lorong-dan-bayangan',
    title: 'Lorong dan Bayangan Beton',
    slug: 'lorong-dan-bayangan',
    releaseId: 'rel-gema-ruang-sunyi',
    trackNumber: 2,
    duration: '04:40',
    status: 'released',
    description: 'Eksplorasi gema dan resonansi senar gitar di koridor semen kosong.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    behindTheSong: 'Direkam tengah malam di lantai basement studio.',
    credits: [{ role: 'Acoustic Guitar & Reverb', name: 'Sor' }],
    streamingLinks: [{ platform: 'Spotify', url: 'https://spotify.com' }],
  },
  {
    id: 'trk-gitar-tua-sudut-kamar',
    title: 'Gitar Tua di Sudut Kamar',
    slug: 'gitar-tua-sudut-kamar',
    releaseId: 'rel-gema-ruang-sunyi',
    trackNumber: 3,
    duration: '03:15',
    status: 'released',
    description: 'Melodi akustik hangat yang santai dan apa adanya.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    behindTheSong: 'Dimainkan santai sambil menatap langit senja dari jendela.',
    credits: [{ role: 'Solo Guitar', name: 'Sor' }],
    streamingLinks: [{ platform: 'Spotify', url: 'https://spotify.com' }],
  },
  {
    id: 'trk-senar-berkarat',
    title: 'Senar Berkarat',
    slug: 'senar-berkarat',
    releaseId: 'rel-tahun-yang-tenang',
    trackNumber: 1,
    duration: '03:30',
    status: 'released',
    description: 'Akustik bertempo lambat dengan nada-nada blues lembut dan gesekan jari yang khas.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    behindTheSong: 'Menggunakan gitar lama yang tidak pernah diganti senarnya selama setahun, menghasilkan nada yang tumpul tapi intim.',
    credits: [{ role: 'Guitar', name: 'Sor' }],
    streamingLinks: [{ platform: 'Bandcamp', url: 'https://bandcamp.com' }],
  },
  {
    id: 'trk-suara-kayu-dan-senja',
    title: 'Suara Kayu dan Senja',
    slug: 'suara-kayu-dan-senja',
    releaseId: 'rel-tahun-yang-tenang',
    trackNumber: 2,
    duration: '03:48',
    status: 'released',
    description: 'Penutup EP dengan harmoni lembut dan ketukan jari pada bodi kayu gitar.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    behindTheSong: 'Direkam saat senja di beranda rumah panggung tua.',
    credits: [{ role: 'Guitar & Percussion', name: 'Sor' }],
    streamingLinks: [{ platform: 'Bandcamp', url: 'https://bandcamp.com' }],
  },
];

// Query and helper functions
export const getVisibleReleases = (): Release[] => {
  return RELEASES.filter((r) => r.status === 'released' || r.status === 'upcoming');
};

export const getReleasesByType = (type: Release['releaseType']): Release[] => {
  return getVisibleReleases().filter((r) => r.releaseType === type);
};

export const getReleaseBySlug = (slug: string): Release | undefined => {
  return RELEASES.find((r) => r.slug === slug);
};

export const getReleaseById = (id: string): Release | undefined => {
  return RELEASES.find((r) => r.id === id);
};

export const getTrackBySlug = (slug: string): Track | undefined => {
  return TRACKS.find((t) => t.slug === slug);
};

export const getTracksForRelease = (release: Release): Track[] => {
  return release.trackIds
    .map((id) => TRACKS.find((t) => t.id === id))
    .filter((t): t is Track => Boolean(t));
};

export const getRelatedArticlesForTrack = (track: Track) => {
  if (!track.relatedWritingIds || track.relatedWritingIds.length === 0) {
    return [];
  }
  return ARTICLES.filter((a) => track.relatedWritingIds?.includes(a.slug));
};
