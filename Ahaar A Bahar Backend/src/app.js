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

import userRouter from "./routes/user.route.js";
import commentRouter from "./routes/comment.route.js";
import reviewRouter from "./routes/review.route.js";
import restrauntRouter from "./routes/restraunt.route.js";
import orderRouter from "./routes/order.route.js";
import fooditemRouter from "./routes/fooditem.route.js";
import favouritelistRouter from "./routes/favouriteList.route.js";
import cartRouter from "./routes/cart.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/restraunt", restrauntRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/fooditem", fooditemRouter);
app.use("/api/v1/favouriteList", favouritelistRouter);
app.use("/api/v1/cart", cartRouter);

export { app };
