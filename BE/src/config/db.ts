import mongoose from "mongoose";
const uri = process.env.MONGO_URI;
const connectDB = async (): Promise<void> => {
  try {
    console.log("hallo", uri);
    await mongoose.connect(uri || "mongodb://mongodb:27017", {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
      dbName: process.env.MONGO_INITDB_DATABASE,
    });
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.error("Error connecting to database: ", {
      error: (error as Error).message,
    });
  }
};
export default connectDB;
