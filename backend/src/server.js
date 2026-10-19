import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import { initSocket } from "./services/socket.js";
import { notFound, errorHandler } from "./middleware/error.js";

for (const k of ["JWT_SECRET", "DB_NAME", "CLIENT_URL"]) {
  if (!process.env[k]) { console.error(`ENV ${k} belum diset`); process.exit(1); }
}

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
initSocket(server);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`API berjalan di http://localhost:${port}`));
