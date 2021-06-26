require('dotenv').config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`Server Running and listening at port ${process.env.port}`);
});
