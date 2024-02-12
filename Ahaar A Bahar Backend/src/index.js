import express from "express";

import { envport } from "./utils/envFiles.js";
import connectDb from "./db/index.js";
import { app } from "./app.js";

connectDb()
  .then((result) => {
    app.on("error", (e) => {
      console.log("error in express mongo connection", e);
      throw Error;
    });

    app.listen(envport || 8000, () => {
      console.log(` Server is running at port `, envport);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed");
  });
