const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mongo:mongopractice@mongopractice.w1tkhg2.mongodb.net/devTinder"
  );
};

module.exports = connectDB;