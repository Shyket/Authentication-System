const express = require("express");
const app = express();
const database = require("./Utils/database");
const dotenv = require("dotenv");


dotenv.config();

database()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((error) => {
    console.log("Database connection error. Error Message: -- " + error);
    process.exit();
  });

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));

require("./Routes/index.route")(app);

module.exports = app;
