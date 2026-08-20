import "dotenv/config";
import express from "express";
import { connectDb } from "./config/db.js";
import { authRouter } from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import { adminRouter } from "./routes/adminRouter.js";
import { instructorRouter } from "./routes/instructorRouter.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use("/", authRouter);
app.use("/", adminRouter);
app.use("/", instructorRouter);

const startServer = () => {
  app.listen(3000, () => {
    console.log("server running on port 3000");
  });
};

connectDb(startServer);
