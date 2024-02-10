import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { cors_origin } from "./utils/envFiles.js";
const app = express();

app.use(cors({ origin: cors_origin, credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "48kb" }));
app.use(express.static("public"));
app.use(cookieParser()); //for crud operations on cookies in browser

app.get("/api/jokes", (req, res) => {
  res.json(jokes);
});

export { app };
