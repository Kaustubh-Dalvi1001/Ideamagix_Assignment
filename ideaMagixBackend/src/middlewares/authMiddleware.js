import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No token found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decodedToken.id);

    if (!user) {
     return res.status(401).json({ message: "No user found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(`Error in validating the token: ${error}`);
    res.status(401).json({ message: `Error in validating the token ${error.message}` });
  }
};
