# Romantic Website

Website romantis berbasis HTML, CSS, dan JavaScript murni.

## Cara menjalankan

1. Extract folder.
2. Klik dua kali `index.html`.
3. Website langsung terbuka di browser.

## Cara mengganti nama dan tanggal

Buka `script.js`, lalu ubah bagian:

```js
const CONFIG = {
  partnerName: "Nama Pacar",
  senderName: "Nama Kamu",
  relationshipStart: "2024-01-01T00:00:00"
};
```

## Cara memasang musik

Masukkan file MP3 ke folder `assets`, lalu beri nama:

```text
music.mp3
```

## Cara memasang foto

Di `index.html`, ganti:

```html
<div class="photo-placeholder gradient-one">Foto Kita 1</div>
```

menjadi:

```html
<img class="photo-placeholder" src="assets/foto1.jpg" alt="Foto kita">
```

Lakukan hal yang sama untuk foto berikutnya.

## Upload ke GitHub Pages

1. Buat repository GitHub baru.
2. Upload seluruh isi folder ini.
3. Buka Settings > Pages.
4. Pilih Deploy from a branch.
5. Pilih branch `main` dan folder `/root`.
6. Simpan dan tunggu URL GitHub Pages muncul.
