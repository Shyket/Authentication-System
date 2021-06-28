const authRoute = require("./auth.route");
const deshboardRoute = require("./deshboard.route");
const { isAuthenticated } = require("../Controller/auth.controller");
const express = require("express");
var path = require("path");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome to Authentication System</h1>");
  });

  app.use("/auth", authRoute);
  app.use("/deshboard", isAuthenticated, deshboardRoute);


  app.use(express.static(path.join(__dirname, "../../AdminLTE-master")));

  app.use(
    "/secure/",
    isAuthenticated,
    express.static(path.join(__dirname, "../AdminLTE-master/pages/examples/secure/"))
  );

  app.use((req, res) => {
    res.status(402).send("<p>Error!! Page not found</p>");
  });
};
