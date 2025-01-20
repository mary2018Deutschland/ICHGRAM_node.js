import mongoose from "mongoose";
import "dotenv/config";
const uri = process.env.MONGO_URI;
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri || "");
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.error("Error connecting to database: ", {
      error: (error as Error).message,
    });
  }
};
export default connectDB;
