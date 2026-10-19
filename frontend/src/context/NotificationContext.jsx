import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";
import api, { API_BASE } from "../api/client.js";
import { useAuth } from "./AuthContext.jsx";

const NotificationContext = createContext(null);
export const useNotifications = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [toast, setToast] = useState(null);

  const refresh = useCallback(async () => {
    const { data } = await api.get("/notifications");
    setItems(data.data);
    setUnread(data.unread);
  }, []);

  // Koneksi real-time: Admin menerima "SOP baru", pengunggah menerima hasil approval
  useEffect(() => {
    if (!user) { setItems([]); setUnread(0); return; }
    refresh().catch(() => {});

    const socket = io(API_BASE || window.location.origin, { auth: { token: localStorage.getItem("token") } });
    socket.on("notification:new", (n) => {
      setItems((prev) => [{ ...n, id: `live-${Date.now()}`, is_read: 0 }, ...prev].slice(0, 50));
      setUnread((c) => c + 1);
      setToast(n);
      setTimeout(() => setToast(null), 6000);
      refresh().catch(() => {}); // sinkronkan id asli dari server
    });
    return () => socket.disconnect();
  }, [user, refresh]);

  const markAllRead = async () => {
    await api.patch("/notifications/read-all");
    setItems((p) => p.map((n) => ({ ...n, is_read: 1 })));
    setUnread(0);
  };

  return (
    <NotificationContext.Provider value={{ items, unread, toast, setToast, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
}
