/* Packages Import */
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

/* Routes Import */
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const _dirname = path.resolve();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));

/* API Call */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "../client", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
