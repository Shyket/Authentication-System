const express = require("express");
const app = express();
const database = require("./Utils/database");
const dotenv = require("dotenv");
const path = require("path");
var cookieParser = require("cookie-parser");
const {isAuthenticated} = require("./Controller/auth.controller")
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
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"../AdminLTE-master")));

require("./Routes/index.route")(app);

module.exports = app;
