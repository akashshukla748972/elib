import mongoose from "mongoose";
import { config } from "./config.js";

const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    mongoose.connection.on("error", () => {
      console.log("Error in connecting to database");
    });
    await mongoose.connect(config.databaseUrl);
  } catch (error) {
    console.error("Failed to connect database", error);
    process.exit(1);
  }
};

export default connectDb;
