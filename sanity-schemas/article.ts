/**
 * Skema Sanity Studio untuk Koleksi "Tulisan / Esai" sorside.
 * Anda dapat menyalin file ini ke direktori skema proyek Sanity Studio Anda.
 */
export const articleSchema = {
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
      title: 'Ringkasan / Cuplikan Pembuka (Excerpt)',
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hidden: ({ document }: any) => !document?.coverImage,
    },
    {
      name: 'content',
      title: 'Isi Naskah Tulisan (Markdown)',
      type: 'text',
      rows: 20,
      description: 'Tulis naskah lengkapmu di sini (mendukung Markdown, sub-judul ###, dan kutipan >)',
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
};
