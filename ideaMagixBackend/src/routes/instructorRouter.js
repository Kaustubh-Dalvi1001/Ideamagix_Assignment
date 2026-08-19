import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { isInstructor } from "../middlewares/roleMiddleware.js";
import { getLectures } from "../controllers/instructor.controller.js";

export const instructorRouter = express.Router();

instructorRouter.get("/assignedLectures", userAuth, isInstructor, getLectures);
