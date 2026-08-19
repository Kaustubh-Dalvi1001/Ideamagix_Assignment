import "dotenv/config";
import express from "express";
import { connectDb } from "./config/db.js";

const app = express();

const startServer = () => {
  app.listen(3000, () => {
    console.log("server running on port 3000");
  });
};

connectDb(startServer);
