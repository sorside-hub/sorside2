import { Article } from '../types';
import heroArchitectureImg from '../assets/images/hero_architecture_1794072644735.jpg';
import aboutPortraitImg from '../assets/images/about_portrait_silhouette_1794072645904.jpg';
import delayedCupImg from '../assets/images/article_delayed_cup_1794072645473.jpg';
import minatoSunsetImg from '../assets/images/article_minato_sunset_1794072645509.jpg';
import cityPoleImg from '../assets/images/article_city_pole_1794072646227.jpg';

export const HERO_IMAGE = heroArchitectureImg;
export const ABOUT_PORTRAIT_IMAGE = aboutPortraitImg;

export const ARTICLES: Article[] = [
  {
    slug: 'tentang-hal-hal-yang-terus-kita-tunda',
    title: 'Tentang hal-hal yang terus kita tunda',
    category: 'REFLECTION',
    date: '2026-11-07',
    displayDate: 'NOV 7, 2026',
    readTime: '4 min read',
    excerpt: 'Sebuah catatan tentang mengetahui apa yang harus dilakukan, tetapi tetap tidak melakukannya.',
    coverImage: delayedCupImg,
    coverAlt: 'Secangkir kopi di meja kayu dengan berkas sinar matahari pagi',
    content: `
Ada jarak yang aneh antara mengetahui apa yang harus dilakukan dan benar-benar melangkah untuk melakukannya.

Sebagian besar dari kita tidak terhenti karena ketidaktahuan. Kita tahu persis draft mana yang belum diselesaikan, percakapan mana yang sengaja dihindari, atau keputusan mana yang sudah terlalu lama dibiarkan menggantung di benak. Kita menundanya bukan karena kita malas dalam arti sempit, melainkan karena di balik setiap tindakan ada kemungkinan gagal atau tuntutan untuk menghadapi realitas yang belum tentu ramah.

> "Menunda sering kali bukan soal waktu yang kurang, melainkan soal keberanian yang belum terkumpul."

### Jebakan Persiapan Tanpa Akhir

Kita sering menyamarkan penundaan dalam bentuk riset yang berlebihan, merapikan meja kerja berkali-kali, atau membaca satu buku lagi sebelum mulai menulis. Kita meyakinkan diri sendiri bahwa kita sedang bersiap, padahal sebenarnya kita hanya sedang membeli waktu agar tidak perlu dinilai.

Ketika kita duduk di depan halaman kosong atau kanvas yang belum tersentuh, kita berhadapan langsung dengan keterbatasan kita sendiri. Ide di kepala selalu tampak sempurna dan anggun; namun begitu ia dipaksa lahir ke dunia nyata melalui jari-jari kita, ia kehilangan kemilau idealnya. Ketakutan akan hilangnya kesempurnaan itulah yang membuat kita memilih menunggu besok.

### Memulai dari yang Tidak Sempurna

Langkah paling jujur yang bisa diambil adalah menerima bahwa permulaan hampir selalu kikuk. Tulisan pertama akan berantakan, nada pertama mungkin sumbang, dan keputusan pertama mungkin membutuhkan revisi berkali-kali.

Namun ada kelegaan yang luar biasa begitu kita melepaskan tuntutan untuk langsung menjadi hebat. Begitu kita meletakkan secangkir kopi di meja dan mengetik kalimat pertama, beban penundaan itu perlahan mencair. Hari ini bukan tentang menyelesaikan mahakarya, melainkan tentang menghormati niat kecil yang kita simpan sejak lama.
    `.trim(),
  },
  {
    slug: 'menjadi-minato',
    title: 'Menjadi Minato',
    category: 'OPINION',
    date: '2026-11-05',
    displayDate: 'NOV 5, 2026',
    readTime: '6 min read',
    excerpt: 'Tentang privilese, perjuangan, dan orang-orang yang membantu kita tumbuh.',
    coverImage: minatoSunsetImg,
    coverAlt: 'Siluet gedung pencakar langit kota saat senja',
    content: `
Dalam narasi populer tentang keberhasilan, kita kerap tergoda untuk memuja sosok yang tampak mampu menyelesaikan segalanya sendirian. Kita menyukai cerita tentang pahlawan yang muncul dari ketiadaan, bergerak dengan kecepatan kilat, dan menaklukkan segala rintangan tanpa cela.

Namun jika kita melihat lebih dekat pada karakter Minato—atau siapa pun yang menjadi simbol keunggulan dan kepemimpinan dalam cerita hidup kita—kita akan menyadari bahwa tidak ada seorang pun yang terbentuk di ruang hampa.

### Privilese yang Tak Selalu Kasat Mata

Kita sering membicarakan privilese hanya dalam parameter materi: modal uang, nama keluarga, atau jejaring sosial. Padahal ada bentuk privilese lain yang jauh lebih mendalam: memiliki seseorang yang percaya pada kemampuan kita sebelum kita sendiri mempercayainya.

Memiliki mentor yang sabar, lingkungan yang mengizinkan kita berbuat salah tanpa langsung menghakimi, atau kawan bicara yang bersedia mendengarkan keraguan kita di tengah malam—semua itu adalah landasan tempat seorang individu belajar berdiri tegak.

> "Kecepatan bukanlah segalanya jika kita tidak tahu ke arah mana rumah yang sedang kita tuju."

### Tanggung Jawab Setelah Menjadi Kuat

Pertanyaan sebenarnya bukanlah seberapa cepat kita bisa melangkah, melainkan apa yang kita lakukan ketika kita sudah memiliki kapasitas untuk memengaruhi orang lain. Apakah kita menggunakan keunggulan kita untuk menciptakan jarak, atau untuk membukakan pintu bagi mereka yang masih tertatih di belakang?

Menjadi sosok yang diandalkan menuntut kita untuk tidak hanya memikirkan pencapaian pribadi. Ia menuntut kepekaan untuk melihat bahwa di balik setiap orang yang sedang berjuang, ada cerita panjang yang tak selalu sempat mereka ceritakan.
    `.trim(),
  },
  {
    slug: 'kita-dan-kota-ini',
    title: 'Kita, dan Kota Ini',
    category: 'ESSAY',
    date: '2026-10-28',
    displayDate: 'OCT 28, 2026',
    readTime: '5 min read',
    excerpt: 'Sebuah esai pendek tentang kota, ruang, dan manusia di dalamnya.',
    coverImage: cityPoleImg,
    coverAlt: 'Tiang listrik kayu dengan kabel kusut di sudut kota berkabut',
    content: `
Kota tidak pernah benar-benar tidur, tetapi ia memiliki saat-saat ketika ia melambat dan membiarkan kita bernapas.

Jika kita berdiri di sudut jalan pada pukul lima sore, yang terlihat adalah deru mesin, klakson yang tak sabar, dan tatapan mata orang-orang yang tergesa-gesa mengejar kereta terakhir. Setiap orang tampak seperti titik koordinat yang bergerak lurus, saling berpapasan tanpa pernah bersinggungan.

### Ruang-Ruang Antara

Di sela-sela gedung pencakar langit dan jalan protokol, ada ruang-ruang kecil yang luput dari perhatian: warung kopi pojok jalan dengan bangku kayu rapuh, deretan tiang kabel yang saling silang bagai jaring laba-laba, atau trotoar sempit di mana seorang pedagang koran tua masih setia menata dagangannya.

Di sanalah denyut kota yang sebenarnya tersimpan. Bukan di kemilau kaca gedung perkantoran, melainkan di celah-celah tempat manusia biasa mencoba mencari jeda dari rutinitas yang menuntut.

> "Kota ini adalah akumulasi dari ribuan harapan kecil yang saling bertumpuk di bawah langit yang sama."

### Mengapa Kita Tetap Bertahan?

Kadang kita mengeluhkan debu, macet, dan dinginnya interaksi sosial di kota besar. Namun ada alasan mengapa banyak dari kita tetap memilih kembali ke sini setiap pagi. Kota ini, dengan segala kekurangannya, memberi kita ruang untuk menjadi siapa pun yang kita inginkan—atau setidaknya, memberi kita ilusi bahwa esok hari segalanya bisa menjadi sedikit lebih baik.
    `.trim(),
  },
  {
    slug: 'catatan-dari-ruang-tengah',
    title: 'Catatan dari Ruang Tengah',
    category: 'ESSAY',
    date: '2026-10-14',
    displayDate: 'OCT 14, 2026',
    readTime: '4 min read',
    excerpt: 'Bagaimana keheningan rumah di malam hari melahirkan kembali dialog-dialog yang sempat terputus.',
    content: `
Ketika semua lampu luar sudah dipadamkan dan hanya tersisa lampu meja di sudut ruang tengah, rumah mengambil wujudnya yang paling intim.

Sepanjang hari kita menghabiskan energi untuk merespons dunia luar: membalas pesan, menghadiri pertemuan, memenuhi ekspektasi orang lain. Di ruang tengah pada larut malam, tidak ada lagi peran yang perlu dimainkan.

Keheningan bukan ketiadaan suara, melainkan kehadiran ruang di mana pikiran kita akhirnya diperbolehkan berbicara tanpa perlu buru-buru dipotong oleh jadwal berikutnya.
    `.trim(),
  },
  {
    slug: 'merayakan-keraguan',
    title: 'Merayakan Keraguan',
    category: 'REFLECTION',
    date: '2026-09-29',
    displayDate: 'SEP 29, 2026',
    readTime: '5 min read',
    excerpt: 'Mungkin kepastian adalah ilusi yang paling melelahkan untuk terus dipertahankan.',
    content: `
Masyarakat kita memberi penghargaan tinggi pada orang-orang yang tampak seratus persen yakin akan setiap langkahnya. Kita diajarkan bahwa ragu adalah tanda kelemahan, bahwa bimbang berarti kita belum cukup matang.

Tetapi bagaimana jika keraguan justru adalah bukti bahwa kita masih memiliki rasa ingin tahu dan kerendahan hati untuk mengakui bahwa dunia ini terlalu kompleks untuk dirumuskan dalam satu jawaban mutlak?

Menerima keraguan bukan berarti menyerah pada kepasifan. Ia adalah keberanian untuk menatap kemungkinan-kemungkinan lain sebelum kita memutuskan untuk menutup pintu.
    `.trim(),
  },
];
