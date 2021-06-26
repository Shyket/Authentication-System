const mongoose = require("mongoose");

mongoose.promise = global.Promise;

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_LOCAL_CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

module.exports = connectDB;
