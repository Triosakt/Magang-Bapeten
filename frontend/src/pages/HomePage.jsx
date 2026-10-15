import { useEffect, useState } from "react";

import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import HeroSection from "../sections/HeroSection";
import DashboardSection from "../sections/DashboardSection";
import DocumentCatalogSection from "../components/documents/DocumentCatalogSection";
import AnnouncementSection from "../sections/AnnouncementSection";
import NewsSection from "../sections/NewsSection";
import CallToActionSection from "../sections/CallToActionSection";

import { getDocuments } from "../services/documentService";
import { getStatistics } from "../services/statisticsService";
import {
  mockAnnouncements,
  mockNews,
} from "../data/mockData";

export default function HomePage() {
  const [documents, setDocuments] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPageData() {
      setLoading(true);

      try {
        const [documentData, statisticData] = await Promise.all([
          getDocuments(),
          getStatistics(),
        ]);

        if (cancelled) return;

        setDocuments(Array.isArray(documentData) ? documentData : []);
        setStatistics(statisticData);
        setLoadError("");
      } catch {
        if (cancelled) return;

        setLoadError(
          "Data belum dapat dimuat. Silakan periksa koneksi API backend.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPageData();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleHeroSearch(query) {
    // Meneruskan kata kunci dari hero ke katalog lewat URL.
    const url = new URL(window.location.href);

    if (query.trim()) {
      url.hash = "katalog";
      url.searchParams.set("q", query.trim());
    } else {
      url.hash = "katalog";
      url.searchParams.delete("q");
    }

    window.history.replaceState({}, "", url);
    window.dispatchEvent(new CustomEvent("simpb-search", {
      detail: { query },
    }));
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Navbar />

      <main>
        <HeroSection onSearch={handleHeroSearch} />

        {loading && (
          <div className="mx-auto max-w-7xl px-5 pt-8 text-sm text-slate-500 lg:px-8">
            Memuat data portal...
          </div>
        )}

        {loadError && (
          <div
            role="alert"
            className="mx-auto mt-6 max-w-7xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900"
          >
            {loadError}
          </div>
        )}

        <DashboardSection
          documents={documents}
          statistics={statistics}
        />

        <DocumentCatalogSection documents={documents} />

       

        <AnnouncementSection announcements={mockAnnouncements} />

        <NewsSection news={mockNews} />

        <CallToActionSection />
      </main>

      <Footer />
    </div>
  );
}