import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect("mongodb+srv://rahulgp:opopop@cluster0.ofj5s.mongodb.net/");
  console.log("Connected to MongoDB");
};

export default connectDB;