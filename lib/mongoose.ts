import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.DATABASE_URL) console.log("DATABASE_URL must be defined");
  if (isConnected) console.log("Already connected to DB");

  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    isConnected = true;

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
