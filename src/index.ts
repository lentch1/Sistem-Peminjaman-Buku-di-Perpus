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
// ============================================================
// BLOK 2 - FUNGSI BERTIPE (PARAMETER DAN RETURN TYPE JELAS)
// ============================================================

// Fungsi (ada parameter + return number): menghitung denda keterlambatan
function hitungDenda(hariTerlambat: number, status: StatusPinjam): number {
  let denda: number = 0; // let karena nilainya berubah-ubah

  // Nested if tingkat 1: denda hanya dihitung jika buku masih dipinjam
  if (status === "Dipinjam") {
    // Nested if tingkat 2: cek apakah ada keterlambatan
    if (hariTerlambat > 0) {
      denda += hariTerlambat * TARIF_DENDA_PER_HARI; // compound += dan aritmatika *
      // Nested if tingkat 3: keterlambatan berat dikenai denda dua kali lipat
      if (hariTerlambat > BATAS_DENDA_BERAT) {
        denda *= 2; // compound *=
      }
    }
  }
  return denda;
}

// Fungsi (ada 2 parameter + return number): menghitung total hari buku berada di peminjam
// (disiapkan untuk fitur Read pada Progress 4)
function hitungTotalHariPinjam(lamaPinjam: number, hariTerlambat: number): number {
  return lamaPinjam + hariTerlambat; // aritmatika + (penjumlahan)
}

// Fungsi (ada parameter + return string): mengubah jumlah hari menjadi teks minggu dan hari
// (disiapkan untuk fitur Read pada Progress 4)
function formatKeterlambatan(hari: number): string {
  // Jika jumlah hari negatif, data dianggap tidak valid
  if (hari < 0) {
    return "Data tidak valid";
  }
  const minggu: number = Math.floor(hari / 7); // aritmatika / (pembagian)
  const sisaHari: number = hari % 7;           // aritmatika % (sisa bagi)
  return `${minggu} minggu ${sisaHari} hari`;
}

// Fungsi (ada parameter + return boolean): memeriksa apakah input menu valid
function validasiPilihan(input: string): boolean {
  // Jika input kosong (setelah spasi dibuang), pilihan tidak valid
  if (input.trim() === "") {
    return false;
  }

  const angka: number = Number(input); // ubah teks menjadi angka

  // Jika bukan angka (NaN) ATAU bukan bilangan bulat, pilihan tidak valid (operator || dan !)
  if (Number.isNaN(angka) || !Number.isInteger(angka)) {
    return false;
  }

  // Pilihan valid jika berada di rentang 0 sampai JUMLAH_MENU (if dengan 2 kondisi, operator &&)
  if (angka >= 0 && angka <= JUMLAH_MENU) {
    return true;
  }
  return false;
}

// Fungsi (ada parameter + return number): menghitung total denda seluruh data
function hitungTotalDenda(data: Peminjaman[]): number {
  let total: number = 0;
  // Perulangan for...of untuk menelusuri setiap data pada array
  for (const item of data) {
    total += hitungDenda(item.hariTerlambat, item.status); // compound +=
  }
  return total;
}

// Fungsi (tanpa parameter + tanpa return/void): menampilkan daftar menu utama
function tampilkanMenu(): void {
  console.log("\n==============================================");
  console.log("   PERPUSTAKAAN - SISTEM PEMINJAMAN BUKU");
  console.log("==============================================");
  console.log("1. Tambah Data Peminjaman  (Create)");
  console.log("2. Lihat Data Peminjaman   (Read)");
  console.log("3. Ubah Data Peminjaman    (Update)");
  console.log("4. Hapus Data Peminjaman   (Delete)");
  console.log("5. Cari Data Peminjaman    (Search)");
  console.log("0. Keluar");
  console.log("----------------------------------------------");
}

// Fungsi (ada parameter + return number): menghitung rata-rata denda per data
function hitungRataRataDenda(data: Peminjaman[]): number {
  let rata: number = hitungTotalDenda(data); // mulai dari total denda
  // Jika data tidak kosong (!== 0), bagi total dengan jumlah data
  if (data.length !== 0) {
    rata /= data.length; // compound /=
  }
  return rata;
}

// Fungsi (ada parameter + void): menampilkan ringkasan singkat data di atas menu
function tampilkanRingkasan(data: Peminjaman[]): void {
  let jumlahDipinjam: number = data.length; // anggap semua masih dipinjam dulu

  // Perulangan for...of: kurangi hitungan untuk setiap buku yang sudah dikembalikan
  for (const item of data) {
    if (item.status === "Dikembalikan") {
      jumlahDipinjam -= 1; // compound -=
    }
  }

  const sudahKembali: number = data.length - jumlahDipinjam; // aritmatika -
  console.log(`Total data: ${data.length} | Dipinjam: ${jumlahDipinjam} | Dikembalikan: ${sudahKembali}`);
  console.log(`Total denda berjalan: Rp${hitungTotalDenda(data)} | Rata-rata: Rp${hitungRataRataDenda(data).toFixed(0)}`);
}

// Fungsi (ada parameter + void): pesan sementara untuk fitur yang belum dibuat
function tampilkanFiturBelumTersedia(namaFitur: string, progressKe: number): void {
  console.log(`\n[INFO] Fitur ${namaFitur} akan diimplementasikan pada Progress ${progressKe}.`);}

  // ============================================================
// BLOK 3 - MENU UTAMA (PERULANGAN SAMPAI PENGGUNA MEMILIH KELUAR)
// ============================================================

async function main(): Promise<void> {
  // Membuat antarmuka untuk membaca input dari keyboard
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  let berjalan: boolean = true; // penanda perulangan menu; false = keluar program

  // Perulangan while: menu tampil terus sampai pengguna memilih 0 (Keluar)
  while (berjalan) {
    tampilkanRingkasan(daftarPeminjaman); // tampilkan ringkasan data
    tampilkanMenu();                      // tampilkan daftar menu

    const input: string = await rl.question("Pilih menu (0-5): "); // baca pilihan

    // Jika input tidak valid, tampilkan pesan lalu ulangi menu (tanpa menghentikan program)
    if (!validasiPilihan(input)) {
      console.log("\n[ERROR] Pilihan tidak valid! Masukkan angka 0 sampai 5.");
      continue; // lompat ke awal perulangan
    }

    const pilihan: number = Number(input); // ubah teks pilihan menjadi angka

    // Percabangan switch untuk menentukan fitur yang dijalankan
    switch (pilihan) {
      case 1:
        tampilkanFiturBelumTersedia("Tambah Data (Create)", 3);
        break;
      case 2:
        tampilkanFiturBelumTersedia("Lihat Data (Read)", 4);
        break;
      case 3:
        tampilkanFiturBelumTersedia("Ubah Data (Update)", 5);
        break;
      case 4:
        tampilkanFiturBelumTersedia("Hapus Data (Delete)", 5);
        break;
      case 5:
        tampilkanFiturBelumTersedia("Cari Data (Search)", 6);
        break;
      case 0:
        berjalan = false; // hentikan perulangan menu
        console.log("\nTerima kasih telah menggunakan aplikasi. Sampai jumpa!");
        break;
      default:
        // Cadangan: seharusnya tidak tercapai karena sudah divalidasi
        console.log("\n[ERROR] Menu tidak dikenali.");
    }
  }

  rl.close(); // tutup antarmuka input setelah perulangan selesai
}

// Menjalankan program utama
main();
 
console .log ("Test");