import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Portal SOP Ortala BAPETEN",
        short_name: "SOP Ortala",
        description: "Pengelolaan dan approval dokumen SOP BAPETEN",
        theme_color: "#1E3A8A",
        background_color: "#F8FAFC",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      },
      workbox: {
        // aset statis di-cache; panggilan API selalu ke jaringan (data SOP harus terbaru)
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          { urlPattern: /\/img\/.*/, handler: "CacheFirst", options: { cacheName: "images", expiration: { maxEntries: 30 } } },
        ],
      },
    }),
  ],
  server: { port: 5173, proxy: { "/api": "http://localhost:5000" } },
});
