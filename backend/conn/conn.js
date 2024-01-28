const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://vinayakrishna1001:ThisIsVinaya%409904@cluster0.w8yrg3z.mongodb.net/"
      )
      .then(() => {
        console.log("The Database is connected successfully!");
      });
  } catch (error) {
    res.status(400).json({
      message: "Error connecting to database",
    });
  }
};

conn();
