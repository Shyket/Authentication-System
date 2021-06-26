const mongoose = require("mongoose");

mongoose.promise = global.Promise;
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_LOCAL_CONN_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB --  database connection established successfully!");
    })
    .catch((error) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " +
          error
      );
      process.exit();
    });
};
module.exports = connectDB;
