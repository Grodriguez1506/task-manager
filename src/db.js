import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://garj1706:RBmqWoSQmMr5m9s5@cluster0.0ydoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
