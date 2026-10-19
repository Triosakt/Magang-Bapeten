# Portal SOP Ortala - Frontend

```bash
npm install
cp .env.example .env     # dev: biarkan VITE_API_URL kosong (Vite proxy /api -> :5000)
npm run dev              # http://localhost:5173
npm run build            # build produksi + service worker PWA
```
Backend harus berjalan di :5000. Akun contoh dibuat oleh `npm run seed` di folder backend.
