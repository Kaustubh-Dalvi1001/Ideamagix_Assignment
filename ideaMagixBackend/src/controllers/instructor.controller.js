import { LectureModel } from "../models/lecture.model.js";

export const getLectures = async (req, res) => {
  try {
    const instructor = req.user;
    const lectures = await LectureModel.find({ instructor: instructor._id })
      .populate("course", ["name", "level", "description", "image"])
      .sort({ date: 1 });

    if (lectures.length === 0) {
      return res.json({ message: "You have no scheduled lectures." });
    }
    res.json({ lectures });
  } catch (error) {
    console.error(`Error in getting the lecture for instructor ${error}`);
    res.status(500).json({ message: `Error in getting the lecture for instructor ${error.message}` });
  }
};
