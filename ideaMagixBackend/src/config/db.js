import mongoose from "mongoose";

export const connectDb = async (startServerFn) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully.");
    startServerFn();
  } catch (error) {
    console.log(`Error in db connection: ${error}`);
  }
};
