import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DocumentDetailPage from "./pages/DocumentDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dokumen/:id"
          element={<DocumentDetailPage />}
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}