const authRoute = require("./auth.route");
const deshboardRoute = require("./deshboard.route");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome to Authentication System</h1>");
  });
  
  app.use("/auth", authRoute);
  app.use("/deshboard", deshboardRoute);

  app.use((req, res) => {
    res.status(402).send("<p>Error!! Page not found</p>");
  });
};
