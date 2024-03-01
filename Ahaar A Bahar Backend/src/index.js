import express from "express";

import { envport } from "./utils/envFiles.js";
import connectDb from "./db/index.js";
import { app } from "./app.js";
import getPgVersion from "./db/postgresindex.js";

connectDb()
  .then((result) => {
    app.on("error", (e) => {
      console.log("error in express mongo connection", e);
      throw e;
    });

    app.listen(envport || 8000, () => {
      console.log(` Server is running at port `, envport);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed");
  });
getPgVersion()
  .then(() => {
    console.log("succesfully connected Postgres");
  })
  .catch((error) => {
    console.error("PostgreSQL connection failed:", error);
    process.exit(1);
  });
