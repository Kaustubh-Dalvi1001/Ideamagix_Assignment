import cloudinary from "../config/cloudinary.js";
import { CourseModel } from "../models/course.model.js";

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
      res.status(409).json({ message: "A course with this name already exists." });
    }
    console.error(`Error in adding new course: ${error}`);
    res.status(400).json({ message: `Error in adding new course: ${error.message}` });
  }
};
