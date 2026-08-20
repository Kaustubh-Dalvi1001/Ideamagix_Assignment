import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { userName, password, role } = req.body;
    const newUser = new UserModel({ userName, password, role });
    const savedUser = await newUser.save();
    const token = savedUser.getJWT();
    res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({
      message: `Signed up successfully.`,
      user: {
        _id: savedUser._id,
        userName: savedUser.userName,
        role: savedUser.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "User name already exists." });
    }
    console.error(`Error in user sign-up: ${error}`);
    res.status(400).json({ message: `Error in user sign-up: ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid, credentials." });
    }

    const token = user.getJWT();

    res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ message: `${user.userName} logged in successfully.` });
  } catch (error) {
    console.error(`Error in login: ${error}`);
    res.status(500).json({ message: "Something went wrong during login." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.json({ message: "User logged out successfully." });
  } catch (error) {
    console.error(`Error in logging out: ${error}`);
    res.status(400).json({ message: `Error in logging out ${error.message}` });
  }
};
