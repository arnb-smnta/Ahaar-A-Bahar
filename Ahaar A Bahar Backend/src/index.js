import express from "express";
import { jokes } from "./utils/constants.js";
import { envport } from "./utils/envFiles.js";
import connectDb from "./db/index.js";
import { app } from "./app.js";

const port = envport;
connectDb();



app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
