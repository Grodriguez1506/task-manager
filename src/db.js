import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/authusers");
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
