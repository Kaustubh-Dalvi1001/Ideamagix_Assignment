import "dotenv/config";
import express from "express";
import { connectDb } from "./config/db.js";
import { authRouter } from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/", authRouter);

const startServer = () => {
  app.listen(3000, () => {
    console.log("server running on port 3000");
  });
};

connectDb(startServer);
