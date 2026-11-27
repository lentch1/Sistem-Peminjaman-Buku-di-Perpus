// ============================================================
// Aplikasi Console Peminjaman Buku Perpustakaan (TypeScript)
// UAS Pemrograman Dasar - Progress 2 (Kerangka Menu Utama)
// ============================================================

// Mengimpor modul readline bawaan Node.js untuk membaca input dari terminal
import * as readline from "readline/promises";

// ============================================================
// BLOK 1 - STRUKTUR DATA, KONSTANTA, DAN DATA AWAL (SEED)
// ============================================================

// Tipe khusus untuk status peminjaman (hanya boleh dua nilai ini)
type StatusPinjam = "Dipinjam" | "Dikembalikan";

// Struktur (entitas) data satu transaksi peminjaman buku
interface Peminjaman {
  id: number;            // id unik transaksi (number)
  judulBuku: string;     // judul buku yang dipinjam (string)
  penulis: string;       // nama penulis buku (string)
  kategori: string;      // kategori buku, mis. Fiksi / Teknologi (string)
  namaPeminjam: string;  // nama anggota yang meminjam (string)
  lamaPinjam: number;    // lama peminjaman dalam hari (number)
  hariTerlambat: number; // jumlah hari keterlambatan, 0 jika tepat waktu (number)
  status: StatusPinjam;  // status peminjaman saat ini
}

// Konstanta (const) untuk nilai tetap yang tidak berubah selama program berjalan
const TARIF_DENDA_PER_HARI: number = 1000; // denda Rp1.000 per hari terlambat
const BATAS_DENDA_BERAT: number = 7;       // lebih dari 7 hari dianggap terlambat berat
const JUMLAH_MENU: number = 5;             // jumlah fitur utama (1 sampai 5)

// Array penampung seluruh data peminjaman (disimpan di memori)
// Data awal (seed) berisi 5 data contoh
const daftarPeminjaman: Peminjaman[] = [
  { id: 1, judulBuku: "Laskar Pelangi", penulis: "Andrea Hirata", kategori: "Fiksi", namaPeminjam: "Rina", lamaPinjam: 7, hariTerlambat: 0, status: "Dikembalikan" },
  { id: 2, judulBuku: "Clean Code", penulis: "Robert C. Martin", kategori: "Teknologi", namaPeminjam: "Budi", lamaPinjam: 14, hariTerlambat: 3, status: "Dipinjam" },
  { id: 3, judulBuku: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", kategori: "Sastra", namaPeminjam: "Sari", lamaPinjam: 7, hariTerlambat: 10, status: "Dipinjam" },
  { id: 4, judulBuku: "Algoritma dan Pemrograman", penulis: "Rinaldi Munir", kategori: "Teknologi", namaPeminjam: "Dimas", lamaPinjam: 14, hariTerlambat: 0, status: "Dipinjam" },
  { id: 5, judulBuku: "Sapiens", penulis: "Yuval Noah Harari", kategori: "Sejarah", namaPeminjam: "Nadia", lamaPinjam: 10, hariTerlambat: 2, status: "Dikembalikan" },
];
