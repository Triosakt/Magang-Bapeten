
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DocumentDetailPage from "./pages/DocumentDetailPage";

import ViewerDashboard from "./pages/viewer/ViewerDashboard";

import UnitDashboard from "./pages/kepala-unit/UnitDashboard";
import DocumentSubmissionPage from "./pages/kepala-unit/DocumentSubmissionPage";

import OrtalaDashboard from "./pages/ortala/OrtalaDashboard";
import ApprovalPage from "./pages/ortala/ApprovalPage";

export default function App() {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<HomePage />} />

      {/* Detail dokumen */}
      <Route
        path="/documents/:id"
        element={<DocumentDetailPage />}
      />

      {/* Dashboard Viewer */}
      <Route
        path="/dashboard/viewer"
        element={<ViewerDashboard />}
      />

      {/* Dashboard Kepala Unit */}
      <Route
        path="/dashboard/kepala-unit"
        element={<UnitDashboard />}
      />

      {/* Pengajuan dokumen Kepala Unit */}
      <Route
        path="/dashboard/kepala-unit/pengajuan"
        element={<DocumentSubmissionPage />}
      />

      {/* Dashboard Ortala */}
      <Route
        path="/dashboard/ortala"
        element={<OrtalaDashboard />}
      />

      {/* Pemeriksaan dan persetujuan dokumen */}
      <Route
        path="/dashboard/ortala/approval"
        element={<ApprovalPage />}
      />

      {/* Halaman tidak ditemukan */}
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center p-6 text-center">
            <div>
              <h1 className="text-3xl font-bold">404</h1>
              <p className="mt-2 text-slate-500">
                Halaman yang kamu cari tidak ditemukan.
              </p>
              <a
                href="/"
                className="mt-4 inline-block font-semibold underline"
              >
                Kembali ke beranda
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
