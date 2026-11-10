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
            description: 'Tulis slug karya nada/lagu sorside yang beririsan rasa dengan esai ini (cth: "skenario-dua-puluh-lima", "langkah-yang-tertinggal")',
          },
        ],
      },
      {
        name: 'single',
        title: 'Single (Lagu Tunggal)',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Judul Single / Lagu',
            type: 'string',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required().error('Judul single wajib diisi'),
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
            name: 'coverArt',
            title: 'Sampul Musik (Cover Art)',
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
            title: 'File Audio Master Lagu (MP3 / WAV)',
            type: 'file',
            options: {
              accept: 'audio/*',
            },
            description: 'Unggah file MP3 untuk lagu single ini. File ini yang akan langsung diputar di audio player web.',
          },
          {
            name: 'duration',
            title: 'Durasi Lagu (cth: 03:45)',
            type: 'string',
            initialValue: '03:30',
          },
          {
            name: 'lyrics',
            title: 'Naskah Lirik Resmi (Markdown)',
            type: 'markdown',
            description: 'Tulis atau tempel naskah lirik lagu ini. Pisahkan bait dengan baris kosong. Mendukung tag [Bait 1], [Refrain], [Outro].',
          },
          {
            name: 'description',
            title: 'Deskripsi Singkat / Sinopsis Lagu',
            type: 'text',
            rows: 3,
            description: 'Penjelasan 1-2 paragraf mengenai esensi dan nuansa single ini.',
          },
          {
            name: 'behindTheSong',
            title: 'Di Balik Lagu (Catatan Studio & Personal)',
            type: 'text',
            rows: 6,
            description: 'Cerita bagaimana melodi tercipta di sudut kamar rekam.',
          },
          {
            name: 'spotifyUrl',
            title: 'Tautan Spotify',
            type: 'url',
            description: 'Link lagu ini di Spotify (cth: https://open.spotify.com/track/...)',
          },
          {
            name: 'youtubeUrl',
            title: 'Tautan YouTube / YouTube Music',
            type: 'url',
            description: 'Link lagu / video musik ini di YouTube (cth: https://www.youtube.com/watch?v=...)',
          },
          {
            name: 'appleMusicUrl',
            title: 'Tautan Apple Music (Opsional)',
            type: 'url',
          },
          {
            name: 'bandcampUrl',
            title: 'Tautan Bandcamp / Lainnya (Opsional)',
            type: 'url',
          },
          {
            name: 'credits',
            title: 'Kredit Personel & Produksi',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'role', title: 'Peran (cth: Vokal & Gitar Akustik, Tata Suara, Mastering)', type: 'string' },
                  { name: 'name', title: 'Nama Personel / Lokasi', type: 'string' },
                ],
              },
            ],
          },
          {
            name: 'featured',
            title: 'Jadikan Sorotan Utama Beranda',
            type: 'boolean',
            initialValue: false,
          },
        ],
      },
      {
        name: 'album',
        title: 'EP & Album (Koleksi Lagu)',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Judul EP / Album',
            type: 'string',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validation: (Rule: any) => Rule.required().error('Judul EP/Album wajib diisi'),
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
                { title: 'EP (Mini Album)', value: 'ep' },
                { title: 'Album Penuh (Full Album)', value: 'album' },
              ],
              layout: 'radio',
            },
            initialValue: 'ep',
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
            name: 'description',
            title: 'Sinopsis / Deskripsi Album',
            type: 'text',
            rows: 3,
            description: 'Pengantar tema dan konsep keseluruhan rilisan ini.',
          },
          {
            name: 'behindTheRelease',
            title: 'Di Balik Rilisan (Catatan Studio & Konsep Album)',
            type: 'text',
            rows: 6,
            description: 'Cerita mendalam tentang bagaimana rangkaian lagu dalam album ini dirajut bersama.',
          },
          {
            name: 'spotifyUrl',
            title: 'Tautan Album di Spotify',
            type: 'url',
            description: 'Link album/EP ini di Spotify',
          },
          {
            name: 'youtubeUrl',
            title: 'Tautan Album di YouTube / Playlist',
            type: 'url',
            description: 'Link playlist album ini di YouTube Music atau YouTube',
          },
          {
            name: 'appleMusicUrl',
            title: 'Tautan Album di Apple Music (Opsional)',
            type: 'url',
          },
          {
            name: 'credits',
            title: 'Kredit & Personel Album',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'role', title: 'Peran', type: 'string' },
                  { name: 'name', title: 'Nama Personel / Lokasi', type: 'string' },
                ],
              },
            ],
          },
          {
            name: 'featured',
            title: 'Jadikan Koleksi Unggulan Beranda',
            type: 'boolean',
            initialValue: false,
          },
          {
            name: 'tracks',
            title: 'Daftar Lagu (Tracks)',
            description: 'Tambahkan lagu-lagu dalam EP / Album ini secara berurutan. File audio dan lirik diatur di masing-masing lagu di bawah ini.',
            type: 'array',
            of: [
              {
                type: 'object',
                name: 'albumTrack',
                title: 'Lagu',
                fields: [
                  {
                    name: 'trackNumber',
                    title: 'Nomor Trek (Urutan)',
                    type: 'number',
                    initialValue: 1,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    validation: (Rule: any) => Rule.required().min(1),
                  },
                  {
                    name: 'title',
                    title: 'Judul Lagu',
                    type: 'string',
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    validation: (Rule: any) => Rule.required().error('Judul lagu wajib diisi'),
                  },
                  {
                    name: 'slug',
                    title: 'Slug Lagu (URL unik)',
                    type: 'string',
                    description: 'Tulis slug huruf kecil tanpa spasi (cth: langkah-yang-tertinggal)',
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    validation: (Rule: any) => Rule.required(),
                  },
                  {
                    name: 'duration',
                    title: 'Durasi Lagu (cth: 03:42)',
                    type: 'string',
                    initialValue: '03:30',
                  },
                  {
                    name: 'audioFile',
                    title: 'File Audio Master Lagu Ini (MP3 / WAV)',
                    type: 'file',
                    options: {
                      accept: 'audio/*',
                    },
                    description: 'Unggah file audio MP3 khusus lagu ini.',
                  },
                  {
                    name: 'lyrics',
                    title: 'Naskah Lirik Resmi (Markdown)',
                    type: 'markdown',
                    description: 'Tulis atau tempel lirik. Pisahkan bait dengan satu baris kosong.',
                  },
                  {
                    name: 'description',
                    title: 'Deskripsi Singkat',
                    type: 'text',
                    rows: 2,
                  },
                  {
                    name: 'behindTheSong',
                    title: 'Di Balik Lagu (Catatan Personal)',
                    type: 'text',
                    rows: 4,
                  },
                  {
                    name: 'spotifyUrl',
                    title: 'Tautan Spotify Lagu Ini (Opsional)',
                    type: 'url',
                  },
                  {
                    name: 'youtubeUrl',
                    title: 'Tautan YouTube Lagu Ini (Opsional)',
                    type: 'url',
                  },
                  {
                    name: 'credits',
                    title: 'Kredit Personel Khusus Lagu Ini (Opsional)',
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
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
