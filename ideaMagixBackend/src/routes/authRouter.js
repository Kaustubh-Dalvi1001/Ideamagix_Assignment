import express from "express";
import { login, signUp } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/signUp", signUp);

authRouter.post("/login", login);
