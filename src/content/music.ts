import { Release, Track } from '../types/music';
import { ARTICLES } from './articles';
import singleCoverImg from '../assets/images/cover_single_langkah_1794089459788.jpg';
import epCoverImg from '../assets/images/cover_ep_sudut_bayangan_1794089459341.jpg';

export const RELEASES: Release[] = [
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
];

export const TRACKS: Track[] = [
  {
    id: 'trk-langkah-yang-tertinggal',
    title: 'Langkah yang Tertinggal',
    slug: 'langkah-yang-tertinggal',
    releaseId: 'rel-langkah-yang-tertinggal',
    trackNumber: 1,
    duration: '03:42',
    status: 'released',
    description: 'Petikan gitar solo dan vokal lirih mengenai momen ketika kita tahu harus beranjak namun tetap diam.',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg', // Sample preview stream
    lyrics: `
Kopi sudah mendingin di sudut meja
Buku-buku terbuka menatap tanpa kata
Kita tahu pintu keluar selalu ada
Namun kaki enggan melangkah ke luar sana

Berapa kali kita menunda hari esok?
Menunggu keberanian yang tak kunjung mengetuk
Di antara rencana dan bayang ketakutan
Kita memilih aman di balik keheningan

Mungkin bukan jalannya yang terlampau jauh
Hanya saja diri ini belum siap rapuh
Langkah yang tertinggal di ujung senja
Menunggu dijemput oleh yang bernama rela
    `.trim(),
    behindTheSong: `
Ditulis pada suatu pagi ketika menyadari betapa banyaknya hal penting yang saya tunda hanya karena takut hasilnya tidak seperti bayangan di kepala. Melodi gitar ini muncul pertama kali di nada dasar D mayor terbuka (open D), memberikan ruang dengar yang lega dan sedikit murung.
    `.trim(),
    credits: [
      { role: 'Vocals & Acoustic Guitar', name: 'Sor' },
      { role: 'Songwriter', name: 'Sor' },
      { role: 'Recording Engineer', name: 'Sor' },
    ],
    relatedWritingIds: ['tentang-hal-hal-yang-terus-kita-tunda'],
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
    ],
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

Aspal basah memantulkan jingga yang pecah
Kota menampung lelah tanpa pernah membantah
Kita adalah angka yang berjalan cepat
Mencari sudut sepi sebelum malam merapat
    `.trim(),
    behindTheSong: `
Trek pembuka EP ini menggabungkan rekaman suara lapangan (field recording) lalu lintas senja dengan progresi piano elektrik Rhodes. Saya ingin menghadirkan rasa keterasingan yang aneh tapi akrab saat berada di tengah kerumunan kota besar.
    `.trim(),
    credits: [
      { role: 'Piano & Rhodes', name: 'Sor' },
      { role: 'Field Recording', name: 'Sor' },
      { role: 'Mixer', name: 'Studio Antara' },
    ],
    relatedWritingIds: ['kita-dan-kota-ini'],
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Bandcamp', url: 'https://bandcamp.com' },
    ],
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
    behindTheSong: `
Komposisi murni instrumental. Direkam langsung tanpa jeda saat jarum jam menunjuk pukul 02.00 dini hari. Suara gesekan jari pada fret tembaga sengaja dipertahankan sebagai bagian dari kejujuran bunyi.
    `.trim(),
    credits: [
      { role: 'Fingerstyle Acoustic Guitar', name: 'Sor' },
      { role: 'Arrangement', name: 'Sor' },
    ],
    relatedWritingIds: ['catatan-dari-ruang-tengah'],
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'Apple Music', url: 'https://music.apple.com' },
    ],
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

Biar saja ragu duduk di sampingmu
Ia bukan musuh yang perlu kau buru
Di balik bimbang ada ruang untuk tumbuh
Menjadi manusia yang utuh dan teduh
    `.trim(),
    behindTheSong: `
Lagu ini terlahir dari perbincangan panjang tentang tekanan untuk selalu tampak yakin di mata masyarakat. Diciptakan dengan gitar akustik bernada rendah dan harmonisasi vokal ganda di bagian refrain.
    `.trim(),
    credits: [
      { role: 'Vocals & Acoustic Guitar', name: 'Sor' },
      { role: 'Bass', name: 'R. Ramadhan' },
      { role: 'Producer', name: 'Sor' },
    ],
    relatedWritingIds: ['merayakan-keraguan'],
    streamingLinks: [
      { platform: 'Spotify', url: 'https://spotify.com' },
      { platform: 'YouTube Music', url: 'https://music.youtube.com' },
    ],
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
