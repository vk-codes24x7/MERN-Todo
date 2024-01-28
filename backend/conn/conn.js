const mongoose = require("mongoose");
require("dotenv").config();

const conn = async (req, res) => {
  try {
    await mongoose.connect(process.env.DB_URI).then(() => {
      console.log("The Database is connected successfully!");
    });
  } catch (error) {
    res.status(400).json({
      message: "Error connecting to database",
    });
  }
};

conn();
