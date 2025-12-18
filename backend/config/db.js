// Database connection
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err; // let server decide
  }
};

module.exports = connectDB;
