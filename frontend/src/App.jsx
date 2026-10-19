import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SopList from "./pages/SopList.jsx";
import UploadSop from "./pages/UploadSop.jsx";
import Approval from "./pages/Approval.jsx";
import StatistikPrint from "./pages/StatistikPrint.jsx";
import ProsesList from "./pages/ProsesList.jsx";
import ProsesDetail from "./pages/ProsesDetail.jsx";
import Users from "./pages/Users.jsx";
import Organisasi from "./pages/Organisasi.jsx";

const UNIT = "perwakilan_unit", ADMIN = "admin_ortala";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="sop" element={<SopList />} />
        <Route path="sop/upload" element={<ProtectedRoute roles={[UNIT, ADMIN]}><UploadSop /></ProtectedRoute>} />
        <Route path="approval" element={<ProtectedRoute roles={[ADMIN]}><Approval /></ProtectedRoute>} />
        <Route path="proses" element={<ProsesList />} />
        <Route path="proses/:id" element={<ProsesDetail />} />
        <Route path="users" element={<ProtectedRoute roles={[ADMIN]}><Users /></ProtectedRoute>} />
        <Route path="organisasi" element={<ProtectedRoute roles={[ADMIN]}><Organisasi /></ProtectedRoute>} />
        <Route path="statistik" element={<ProtectedRoute roles={[ADMIN, UNIT]}><StatistikPrint /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
