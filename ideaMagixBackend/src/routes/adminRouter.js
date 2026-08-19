import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";
import { addCourse, addLecture } from "../controllers/admin.controller.js";
import upload from "../config/multer.js";

export const adminRouter = express.Router();

adminRouter.post("/addCourse", userAuth, isAdmin, upload.single("photo"), addCourse);

adminRouter.post("/addLecture", userAuth, isAdmin, addLecture);
