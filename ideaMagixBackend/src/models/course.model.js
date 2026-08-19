import { model, Schema } from "mongoose";
import validator from "validator";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
    unique: true,
  },
  level: {
    type: String,
    required: true,
    maxLength: 30,
    trim: true,
    lowercase: true,
    enum: ["beginner", "intermediate", "advanced"],
  },
  description: {
    type: String,
    required: true,
    maxLength: 200,
  },
  image: {
    type: String,
    required: true,
    validate(value) {
      if (value && !validator.isURL(value)) {
        throw new Error("Cloudinary image URL is invalid.");
      }
    },
  },
  lectures: {
    type: [Schema.Types.ObjectId],
    ref: "Lecture",
    default: [],
  },
});

export const courseModel = model("Course", courseSchema);
