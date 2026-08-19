import { UserModel } from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new UserModel(userData);
    const savedUser = await newUser.save();
    const token = savedUser.getJWT();
    res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({
      message: `${savedUser.role} created successfully.`,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "User name already exists." });
    }
    console.error(`Error in user sign-up: ${error}`);
    res.status(400).json({ message: `Error in user sign-up: ${error.message}` });
  }
};
