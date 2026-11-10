# Panduan Integrasi Sanity CMS untuk Tulisan sorside

Arsitektur sorside menggunakan sistem **Hybrid / Smart Fallback**:
- Jika Sanity belum dikonfigurasi atau belum diisi, website sorside otomatis 100% menggunakan data arsip lokal yang sudah ada tanpa error.
- Saat Anda menghubungkan `projectId` Sanity, web otomatis beralih menarik data artikel langsung dari Sanity Studio secara real-time!

---

## 3 Langkah Mudah Menghubungkan Sanity:

### 1. Buat Proyek di Sanity.io (Gratis)
1. Buka [sanity.io](https://www.sanity.io) dan login/daftar (bisa pakai GitHub atau Google).
2. Buat proyek baru (misal diberi nama `sorside`).
3. Catat **Project ID** Anda (kombinasi huruf/angka acak, misal `a1b2c3d4`).
4. Dataset default biasanya adalah `production`.

### 2. Pasang Skema Dokumen Tulisan
Salin skema dari file `sanity-schemas/article.ts` ke dalam direktori skema Studio Sanity Anda (`schemaTypes/article.ts` atau `schemas/article.js`).

Skema ini sudah menyediakan:
- Judul Tulisan
- Slug URL otomatis
- Kategori (Refleksi, Esai, Opini)
- Tanggal Publikasi
- Excerpt (Ringkasan pembuka)
- Gambar Sampul + Alt text
- Isi Naskah Markdown
- Toggle Sorotan Utama Beranda (Featured)
- Status Publikasi (Terbit vs Draf)
- Dropdown Lagu Terkait

### 3. Masukkan Project ID ke Environment Variable
Di file `.env` (atau Secrets konfigurasi):
```env
VITE_SANITY_PROJECT_ID="project_id_milikmu"
VITE_SANITY_DATASET="production"
VITE_SANITY_API_VERSION="2024-03-01"
```
Setelah itu, selesai! Web Anda langsung tersambung dan menampilkan tulisan yang Anda terbitkan dari dashboard Sanity.
