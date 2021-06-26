const express = require("express");
const app = express();
const database = require("./Utils/database");

require("dotenv").config();
database();

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));

require("./Routes/index.route")(app);

module.exports = app;