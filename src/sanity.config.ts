import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { markdownSchema } from 'sanity-plugin-markdown';

export default defineConfig({
  name: 'sorside-studio',
  title: 'sorside studio',
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'kv8my3fg',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), markdownSchema()],
  schema: {
    types: [
      {
        name: 'article',
        title: 'Tulisan & Esai',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Judul Tulisan',
            type: 'string',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required().error('Judul tulisan wajib diisi'),
          },
          {
            name: 'slug',
            title: 'Slug (Link URL)',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: {
              list: [
                { title: 'Refleksi', value: 'REFLECTION' },
                { title: 'Esai', value: 'ESSAY' },
                { title: 'Opini', value: 'OPINION' },
              ],
            },
            initialValue: 'REFLECTION',
          },
          {
            name: 'date',
            title: 'Tanggal Publikasi',
            type: 'date',
            options: {
              dateFormat: 'YYYY-MM-DD',
            },
            initialValue: () => new Date().toISOString().split('T')[0],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'excerpt',
            title: 'Ringkasan / Excerpt',
            type: 'text',
            rows: 3,
            description: '1-2 kalimat pengantar untuk kartu tulisan dan kutipan pembuka di halaman depan.',
          },
          {
            name: 'coverImage',
            title: 'Gambar Sampul (Opsional)',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'coverAlt',
            title: 'Deskripsi Gambar Sampul (Alt Text)',
            type: 'string',
          },
          {
            name: 'content',
            title: 'Isi Naskah Tulisan (Markdown / TipTap / ChatGPT Compatible)',
            type: 'markdown',
            description: 'Tulis atau paste langsung naskah tulisanmu di sini dari TipTap atau ChatGPT. Mendukung sintaks Markdown, **bold**, *italic*, ### sub-judul, dan > kutipan.',
          },
          {
            name: 'featured',
            title: 'Jadikan Sorotan Utama Beranda',
            type: 'boolean',
            description: 'Aktifkan jika tulisan ini ingin dipajang sebagai fokus utama di Beranda sorside',
            initialValue: false,
          },
          {
            name: 'status',
            title: 'Status Publikasi',
            type: 'string',
            options: {
              list: [
                { title: 'Terbit (Published)', value: 'published' },
                { title: 'Draf (Draft)', value: 'draft' },
              ],
              layout: 'radio',
            },
            initialValue: 'published',
          },
          {
            name: 'relatedTrackSlug',
            title: 'Lagu Terkait (Opsional)',
            type: 'string',
            description: 'Pilih karya nada/lagu sorside yang beririsan rasa dengan esai ini',
            options: {
              list: [
                { title: 'Skenario Dua Puluh Lima (Single)', value: 'skenario-dua-puluh-lima' },
                { title: 'Langkah yang Tertinggal (Sudut dan Bayangan EP)', value: 'langkah-yang-tertinggal' },
                { title: 'Kota dan Lampu Jalan (Sudut dan Bayangan EP)', value: 'kota-dan-lampu-jalan' },
                { title: 'Hujan di Balik Jendela (Single)', value: 'hujan-di-balik-jendela' },
                { title: 'Dialog Tanpa Kata (Sudut dan Bayangan EP)', value: 'dialog-tanpa-kata' },
                { title: 'Menembus Kabut Pagi (Sudut dan Bayangan EP)', value: 'menembus-kabut-pagi' },
              ],
            },
          },
        ],
      },
      {
        name: 'release',
        title: 'Rilisan Musik (Single / EP / Album)',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Judul Rilisan',
            type: 'string',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required().error('Judul rilisan wajib diisi'),
          },
          {
            name: 'slug',
            title: 'Slug (Link URL)',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'releaseType',
            title: 'Format Rilisan',
            type: 'string',
            options: {
              list: [
                { title: 'Single', value: 'single' },
                { title: 'EP (Mini Album)', value: 'ep' },
                { title: 'Album Penuh', value: 'album' },
              ],
              layout: 'radio',
            },
            initialValue: 'single',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'releaseDate',
            title: 'Tanggal Rilis',
            type: 'date',
            options: {
              dateFormat: 'YYYY-MM-DD',
            },
            initialValue: () => new Date().toISOString().split('T')[0],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'displayYear',
            title: 'Tahun Rilis (Label)',
            type: 'string',
            initialValue: () => new Date().getFullYear().toString(),
          },
          {
            name: 'status',
            title: 'Status Publikasi',
            type: 'string',
            options: {
              list: [
                { title: 'Rilis (Tampil di Publik)', value: 'released' },
                { title: 'Segera Datang (Upcoming)', value: 'upcoming' },
                { title: 'Draf (Sembunyikan)', value: 'draft' },
              ],
              layout: 'radio',
            },
            initialValue: 'released',
          },
          {
            name: 'description',
            title: 'Deskripsi / Sinopsis Rilisan',
            type: 'text',
            rows: 3,
            description: 'Penjelasan singkat tentang nuansa, cerita, dan konsep rilisan ini.',
          },
          {
            name: 'coverArt',
            title: 'Sampul Musik (Cover Art Vinyl)',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'coverArtAlt',
            title: 'Alt Text Sampul',
            type: 'string',
          },
          {
            name: 'audioFile',
            title: 'File Audio Master (MP3 / WAV / M4A)',
            type: 'file',
            options: {
              accept: 'audio/*',
            },
            description: 'Unggah file audio master untuk pemutar lagu (terutama bila berformat Single). Format MP3 direkomendasikan untuk pemutaran web cepat.',
          },
          {
            name: 'behindTheRelease',
            title: 'Di Balik Rilisan (Catatan Studio & Proses Kreatif)',
            type: 'text',
            rows: 6,
            description: 'Cerita mendalam tentang bagaimana karya ini tercipta di sudut kamar rekam.',
          },
          {
            name: 'streamingLinks',
            title: 'Tautan Layanan Streaming Musik',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'platform', title: 'Nama Platform (cth: Spotify, YouTube, Apple Music, Bandcamp)', type: 'string' },
                  { name: 'url', title: 'Tautan URL', type: 'url' },
                ],
              },
            ],
          },
          {
            name: 'credits',
            title: 'Kredit & Personel Produksi',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'role', title: 'Peran (cth: Vokal & Gitar Akustik, Tata Suara, Lokasi)', type: 'string' },
                  { name: 'name', title: 'Nama Personel / Lokasi', type: 'string' },
                ],
              },
            ],
          },
          {
            name: 'featured',
            title: 'Jadikan Koleksi Unggulan Beranda & Katalog',
            type: 'boolean',
            initialValue: false,
          },
        ],
      },
      {
        name: 'track',
        title: 'Trek Lagu (Untuk EP / Album)',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Judul Lagu',
            type: 'string',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required().error('Judul trek lagu wajib diisi'),
          },
          {
            name: 'slug',
            title: 'Slug (Link URL)',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'releaseId',
            title: 'Slug atau ID Rilisan Induk (EP / Album)',
            type: 'string',
            description: 'Isi dengan slug rilis induk, misalnya "sudut-dan-bayangan" atau "gema-ruang-sunyi"',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'trackNumber',
            title: 'Nomor Urutan Trek',
            type: 'number',
            initialValue: 1,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required().min(1),
          },
          {
            name: 'duration',
            title: 'Durasi Lagu (cth: 03:42)',
            type: 'string',
            initialValue: '03:30',
          },
          {
            name: 'audioFile',
            title: 'File Audio Master Lagu (MP3 / WAV)',
            type: 'file',
            options: {
              accept: 'audio/*',
            },
            description: 'Unggah file audio MP3 untuk diputar langsung di audio player situs web sorside.',
          },
          {
            name: 'description',
            title: 'Deskripsi Singkat',
            type: 'text',
            rows: 2,
          },
          {
            name: 'lyrics',
            title: 'Naskah Lirik Resmi (Markdown)',
            type: 'markdown',
            description: 'Tulis atau tempel lirik lagu. Pisahkan bait dengan satu baris kosong. Kamu bisa menambahkan [Bait 1], [Refrain], atau [Outro] di baris pertama tiap bait.',
          },
          {
            name: 'behindTheSong',
            title: 'Di Balik Lagu (Catatan Personal & Makna)',
            type: 'text',
            rows: 5,
          },
          {
            name: 'credits',
            title: 'Kredit Personel Lagu Ini',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'role', title: 'Peran', type: 'string' },
                  { name: 'name', title: 'Nama Personel', type: 'string' },
                ],
              },
            ],
          },
          {
            name: 'streamingLinks',
            title: 'Tautan Streaming Lagu Ini',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'platform', title: 'Platform', type: 'string' },
                  { name: 'url', title: 'Tautan URL', type: 'url' },
                ],
              },
            ],
          },
          {
            name: 'status',
            title: 'Status Publikasi',
            type: 'string',
            options: {
              list: [
                { title: 'Terbit (Published)', value: 'released' },
                { title: 'Draf (Draft)', value: 'draft' },
              ],
              layout: 'radio',
            },
            initialValue: 'released',
          },
        ],
      },
    ],
  },
});
