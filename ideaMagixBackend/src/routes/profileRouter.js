import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { userProfile } from "../controllers/profile.controller.js";

export const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, userProfile);
