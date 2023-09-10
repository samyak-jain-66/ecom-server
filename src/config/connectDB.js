const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected!"))
    .catch((err) => {
      console.log("Database Connection Error - " + err);
    });
};

module.exports = { connectToDB };
