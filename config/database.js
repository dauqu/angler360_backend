const mongoose = require("mongoose");
mongoose.set("strictQuery", false)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(
      "Angler_360_Backend Database Connected Successfuly----------------------"
    );
  } catch (error) {
    console.log("(Angler_360_Backend Connection error) ", error);
  }
};
module.exports = connectDB;
