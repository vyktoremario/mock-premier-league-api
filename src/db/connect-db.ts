import mongoose from "mongoose";

const message =
  process.env.NODE_ENV !== "production"
    ? "Successfully connected to MongoDB Atlas!"
    : "Successfully connected to MongoDB Local!";

export const connectDB = () => {
  const url: string = process.env.DATABASE_URL as string;
  mongoose
    .connect(url, {
      dbName: "mock-premier-league",
      user: "root",
      pass: "pass12345",
    })
    .then(() => {
      console.log("info", message);
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};
