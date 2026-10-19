import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL || "";
const api = axios.create({ baseURL: `${API_BASE}/api` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Token kedaluwarsa -> kembali ke login
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && !err.config.url.includes("/auth/login")) {
      localStorage.removeItem("token");
      window.location.assign("/login");
    }
    return Promise.reject(err);
  }
);

export const errMsg = (e) => e.response?.data?.message || "Terjadi kesalahan, coba lagi";

// Unduh PDF dengan header Authorization lalu simpan sebagai file
export async function downloadSop(sop) {
  const res = await api.get(`/sop/${sop.id}/download`, { responseType: "blob" });
  const url = URL.createObjectURL(res.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sop.nomor_sop.replace(/[^\w-]/g, "_")}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

// Buka PDF referensi di tab baru. Tab dibuka lebih dulu agar tidak diblokir popup blocker.
export async function openPdf(path) {
  const tab = window.open("", "_blank");
  try {
    const res = await api.get(path, { responseType: "blob" });
    const url = URL.createObjectURL(res.data);
    if (tab) tab.location.href = url; else window.location.assign(url);
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (e) {
    tab?.close();
    // respons error berbentuk blob; ambil pesan JSON-nya
    if (e.response?.data instanceof Blob) {
      try { e.response.data = JSON.parse(await e.response.data.text()); } catch { /* abaikan */ }
    }
    throw e;
  }
}

export default api;
