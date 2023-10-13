import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) console.log("MONGO_URI must be defined");
  if (isConnected) console.log("Already connected to DB");

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
