import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";
import { addCourse } from "../controllers/course.controller.js";
import upload from "../config/multer.js";

export const courseRouter = express.Router();

courseRouter.post("/addCourse", userAuth, isAdmin, upload.single("photo"), addCourse);
