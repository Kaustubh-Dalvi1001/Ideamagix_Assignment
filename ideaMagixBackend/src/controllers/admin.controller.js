import cloudinary from "../config/cloudinary.js";
import { CourseModel } from "../models/course.model.js";
import { LectureModel } from "../models/lecture.model.js";
import { UserModel } from "../models/user.model.js";

export const addCourse = async (req, res) => {
  try {
    const { name, level, description } = req.body;
    if (!name || !level || !description) {
      return res.status(400).json({ message: "name, level and description is manditory." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Course photo is required." });
    }

    const uploadResult = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ideaMagix/coursePhotos",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        },
      );

      stream.end(req.file.buffer);
    });

    const uploadImage = await uploadResult;

    const course = await CourseModel.create({
      name,
      level,
      description,
      image: uploadImage.secure_url,
    });

    res.json({ message: `New course added: ${course.name}`, course });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A course with this name already exists." });
    }
    console.error(`Error in adding new course: ${error}`);
    res.status(500).json({ message: `Error in adding new course: ${error.message}` });
  }
};

export const addLecture = async (req, res) => {
  try {
    const { course, instructor, date } = req.body;
    if (!course || !instructor || !date) {
      return res.status(400).json({ message: "course, instructor and date is manditory." });
    }

    const lecture = await LectureModel.create({ course, instructor, date });

    await CourseModel.findByIdAndUpdate(course, {
      $push: { lectures: lecture._id },
    });

    const populateLecture = await lecture.populate([
      { path: "course", select: "name" },
      { path: "instructor", select: "userName" },
    ]);

    res.json({ message: "Lecture added successfully.", lecture: populateLecture });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This slot clashes with an existing lecture." });
    }
    console.error(`Error in adding a lecture: ${error}`);
    res.status(500).json({ message: `Error in adding a lecture ${error.message}` });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({});
    res.json({ courses });
  } catch (error) {
    console.error(`Error in getting courses: ${error}`);
    res.status(500).json({ message: `Error in getting courses ${error.message}` });
  }
};

export const getInstructors = async (req, res) => {
  try {
    const instructors = await UserModel.find({ role: "instructor" }).select("_id userName role");
    res.json({ instructors });
  } catch (error) {
    console.error(`Error in getting instructors: ${error}`);
    res.status(500).json({ message: `Error in getting instructors: ${error.message}` });
  }
};
