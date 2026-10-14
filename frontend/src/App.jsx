
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman login */}
        <Route path="/login" element={<Login />} />

        {/* Halaman lupa kata sandi */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Halaman utama diarahkan ke login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* URL tidak dikenal diarahkan ke login */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
