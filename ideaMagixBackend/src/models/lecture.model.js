import { Schema, model } from "mongoose";

const lectureSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (value) {
        const user = await model("User").findById(value);
        return user && user.role === "instructor";
      },
      message: "The refertenced user must have the role 'instructor'",
    },
  },
  date: {
    type: Date,
    required: true,
  },
});

lectureSchema.index(
  {
    course: 1,
    date: 1,
  },
  {
    unique: true,
  },
);

lectureSchema.index(
  {
    instructor: 1,
    date: 1,
  },
  {
    unique: true,
  },
);

export const LectureModel = model("Lecture", lectureSchema);
