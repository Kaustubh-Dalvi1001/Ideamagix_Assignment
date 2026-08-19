import { model, Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    lowercase: true,
    maxLength: 30,
    unique: true,
    required: true,
    validate(value) {
      if (!value) {
        throw new Error("User name is required.");
      }
      if (value.length > 30) {
        throw new Error("User name cannot be more than 30 characters.");
      }
    },
  },

  password: {
    type: String,
    minLength: 8,
    maxLength: 50,
    required: true,
    validate(value) {
      if (!value) {
        throw new Error("Password is required.");
      }

      if (value.length < 8) {
        throw new Error("Password must be atleast of 8 characters.");
      }

      if (value.length > 50) {
        throw new Error("The password must be less than 50 characters.");
      }

      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "The password is not strong. The password must contain minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1",
        );
      }
    },
  },

  role: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    enum: ["admin", "instructor"],
    validate(value) {
      if (!value) {
        throw new Error("Role is required.");
      }
    },
  },
});

export const userModel = model("User", userSchema);
