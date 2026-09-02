# To-Do List Our Routine

Aplikasi to-do list modern, minimalis, responsive, dan cocok untuk GitHub Pages.

## Deploy ke GitHub Pages
1. Buat repository baru di GitHub.
2. Upload seluruh isi folder ini ke repository (bukan folder ZIP-nya).
3. Pastikan `index.html` berada di root repository.
4. Buka **Settings → Pages**.
5. Pada Source pilih **Deploy from a branch**, lalu pilih branch `main` dan folder `/root`.
6. Simpan dan tunggu GitHub Pages melakukan deployment.

## Catatan
Semua data task disimpan di `localStorage` browser. Tidak membutuhkan database, backend, API key, atau server.

## File
- `index.html` — struktur aplikasi
- `style.css` — desain responsive
- `app.js` — seluruh interaksi dan penyimpanan
- `config.json` — konfigurasi fitur
