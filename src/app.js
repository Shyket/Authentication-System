const express = require("express");
const app = express();

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));

require("./Routes/index.route")(app);

module.exports = app;