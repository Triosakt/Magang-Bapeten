import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });

  // Autentikasi socket memakai JWT yang sama
  io.use((socket, next) => {
    try {
      const payload = jwt.verify(socket.handshake.auth?.token, process.env.JWT_SECRET);
      socket.data.user = { id: payload.sub, role: payload.role };
      next();
    } catch {
      next(new Error("unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const { id, role } = socket.data.user;
    socket.join(`user:${id}`);
    if (role === "admin_ortala") socket.join("admins");
  });
  return io;
}

export const emitToAdmins = (event, payload) => io?.to("admins").emit(event, payload);
export const emitToUser = (userId, event, payload) => io?.to(`user:${userId}`).emit(event, payload);
