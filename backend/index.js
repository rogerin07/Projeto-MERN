import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import UserRoutes from "./domains/users/routes.js";
import RequestRoutes from "./domains/requests/routes.js";
import { connectDb } from "./config/db.js"; // ✅

const app = express();
const { PORT } = process.env;

const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDb();


app.use("/users", UserRoutes);
app.use("/requests", RequestRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
